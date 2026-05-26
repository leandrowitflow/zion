#!/usr/bin/env node
/**
 * SEO / AEO / GEO audit — Google Lighthouse (live SEO) + live HTTP checks + code review.
 *
 * Requires a production build. Starts `next start` automatically if port 3000 is free.
 *
 * Usage:
 *   npm run build && npm run audit:seo
 *   AUDIT_SKIP_LIGHTHOUSE=1 npm run audit:seo   # code + live checks only
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import net from "node:net";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const PORT = Number(process.env.AUDIT_PORT ?? 3000);
let baseUrl = process.env.AUDIT_BASE_URL ?? `http://127.0.0.1:${PORT}`;
const SKIP_LIGHTHOUSE = process.env.AUDIT_SKIP_LIGHTHOUSE === "1";

const LIGHTHOUSE_PATHS = ["/", "/ignite-us", "/experiences", "/destination", "/the-artisans", "/journal"];

/** @typedef {{ category: 'SEO'|'AEO'|'GEO', severity: 'pass'|'warn'|'fail'|'info', message: string, points?: number }} Finding */

/** @type {Finding[]} */
const findings = [];

/** @type {{ path: string, score: number }[]} */
const lighthouseScores = [];

function add(category, severity, message, points) {
  findings.push({ category, severity, message, points });
}

function read(path) {
  const full = join(ROOT, path);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

function walk(dir, ext = ".tsx") {
  /** @type {string[]} */
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules") out.push(...walk(p, ext));
    else if (entry.isFile() && entry.name.endsWith(ext)) out.push(p);
  }
  return out;
}

function extractSlugs(filePath, arrayName) {
  const content = read(filePath);
  if (!content) return [];
  const block = content.match(
    new RegExp(`export const ${arrayName}[\\s\\S]*?=\\s*\\[[\\s\\S]*?\\];`),
  );
  if (!block) return [];
  return [...block[0].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function extractDescriptionsFromPages() {
  const content = read("src/lib/seo/pages.ts");
  if (!content) return [];
  return [...content.matchAll(/description:\s*\n?\s*"([^"]+)"/g)].map((m) => m[1]);
}

function scoreCategory(category) {
  const items = findings.filter((f) => f.category === category && f.severity !== "info");
  const earned = items.reduce((sum, f) => sum + (f.points ?? 0), 0);
  const max = items.length;
  if (max === 0) return 0;
  return Math.round((earned / max) * 100);
}

function portOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect(port, "127.0.0.1");
    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

async function waitForServer(timeoutMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) return true;
    } catch {
      // keep waiting
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function probeServer(url) {
  try {
    const res = await fetch(`${url}/`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return false;
    const html = await res.text();
    return html.includes("ZION") || html.includes("Destination Alchemist");
  } catch {
    return false;
  }
}

/** @returns {import('node:child_process').ChildProcess | null} */
async function ensureServer() {
  if (process.env.AUDIT_BASE_URL) {
    if (!(await probeServer(baseUrl))) {
      throw new Error(`AUDIT_BASE_URL not reachable: ${baseUrl}`);
    }
    return null;
  }

  const primary = `http://127.0.0.1:${PORT}`;
  if (await probeServer(primary)) {
    baseUrl = primary;
    return null;
  }

  if (!existsSync(join(ROOT, ".next", "BUILD_ID"))) {
    throw new Error("No production build found. Run: npm run build");
  }

  let startPort = PORT;
  if (await portOpen(PORT)) {
    console.log(`  ⚠ Port ${PORT} in use by another app — starting ZION on ${PORT + 1}`);
    startPort = PORT + 1;
  }

  baseUrl = `http://127.0.0.1:${startPort}`;
  const proc = spawn("npm", ["run", "start", "--", "-p", String(startPort)], {
    cwd: ROOT,
    stdio: "ignore",
    shell: true,
    detached: process.platform !== "win32",
  });

  const ready = await waitForServer();
  if (!ready) {
    proc.kill();
    throw new Error(`Server did not start on ${baseUrl} within 90s`);
  }

  return proc;
}

function flattenJsonLd(node) {
  if (!node) return [];
  if (Array.isArray(node)) return node.flatMap(flattenJsonLd);
  if (typeof node === "object" && "@graph" in node && Array.isArray(node["@graph"])) {
    return node["@graph"].flatMap(flattenJsonLd);
  }
  return [node];
}

function extractJsonLd(html) {
  /** @type {unknown[]} */
  const nodes = [];
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      nodes.push(JSON.parse(match[1]));
    } catch {
      // skip invalid blocks
    }
  }
  return nodes.flatMap(flattenJsonLd);
}

function jsonLdTypes(nodes) {
  /** @type {string[]} */
  const types = [];
  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;
    const t = node["@type"];
    if (typeof t === "string") types.push(t);
    else if (Array.isArray(t)) types.push(...t.filter((x) => typeof x === "string"));
  }
  return types;
}

async function fetchText(path) {
  const res = await fetch(`${baseUrl}${path}`, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.text();
}

async function runLiveChecks() {
  try {
    const llms = await fetchText("/llms.txt");
    if (llms.includes("Destination Alchemist Lab")) {
      add("AEO", "pass", "Live /llms.txt serves entity summary", 1);
    } else {
      add("AEO", "fail", "Live /llms.txt missing entity summary", 0);
    }
  } catch (err) {
    add("AEO", "fail", `Live /llms.txt unreachable (${err.message})`, 0);
  }

  try {
    const robots = await fetchText("/robots.txt");
    if (robots.includes("GPTBot") && robots.includes("ClaudeBot")) {
      add("AEO", "pass", "Live /robots.txt allows AI crawlers", 1);
    } else {
      add("AEO", "warn", "Live /robots.txt missing AI crawler rules", 0.5);
    }
  } catch (err) {
    add("AEO", "fail", `Live /robots.txt unreachable (${err.message})`, 0);
  }

  try {
    const homeHtml = await fetchText("/");
    if (homeHtml.includes('id="faq-heading"') || homeHtml.includes("Good to")) {
      add("AEO", "pass", "Live home page renders visible FAQ section", 1);
    } else {
      add("AEO", "fail", "Live home page missing visible FAQ content", 0);
    }

    const homeTypes = jsonLdTypes(extractJsonLd(homeHtml));
    if (homeTypes.includes("FAQPage")) {
      add("GEO", "pass", "Live home page serves FAQPage JSON-LD", 1);
    } else {
      add("GEO", "fail", "Live home page missing FAQPage JSON-LD", 0);
    }
  } catch (err) {
    add("AEO", "fail", `Live home page unreachable (${err.message})`, 0);
    add("GEO", "fail", `Live home JSON-LD not verified (${err.message})`, 0);
  }

  try {
    const igniteHtml = await fetchText("/ignite-us");
    const igniteTypes = jsonLdTypes(extractJsonLd(igniteHtml));
    if (igniteTypes.includes("ContactPage") && igniteTypes.includes("FAQPage")) {
      add("GEO", "pass", "Live /ignite-us serves ContactPage + FAQPage JSON-LD", 1);
    } else {
      add("GEO", "fail", "Live /ignite-us missing ContactPage or FAQPage JSON-LD", 0);
    }
    if (igniteHtml.includes('id="faq-heading"') || igniteHtml.includes("Good to")) {
      add("AEO", "pass", "Live Ignite Us renders FAQ section", 1);
    } else {
      add("AEO", "fail", "Live Ignite Us missing FAQ section", 0);
    }
  } catch (err) {
    add("GEO", "fail", `Live /ignite-us JSON-LD not verified (${err.message})`, 0);
    add("AEO", "fail", `Live Ignite Us unreachable (${err.message})`, 0);
  }

  try {
    const journalHtml = await fetchText("/journal");
    const journalTypes = jsonLdTypes(extractJsonLd(journalHtml));
    if (journalTypes.includes("FAQPage") && journalTypes.includes("Blog")) {
      add("GEO", "pass", "Live /journal serves Blog + FAQPage JSON-LD", 1);
    } else {
      add("GEO", "fail", "Live /journal missing Blog or FAQPage JSON-LD", 0);
    }
    if (journalHtml.includes('id="faq-heading"') || journalHtml.includes("Good to")) {
      add("AEO", "pass", "Live /journal renders FAQ section", 1);
    } else {
      add("AEO", "fail", "Live /journal missing FAQ section", 0);
    }
    if (journalHtml.includes("<h1") && journalHtml.includes("The Journal of ZION")) {
      add("SEO", "pass", "Live /journal has visible H1", 1);
    } else {
      add("SEO", "fail", "Live /journal missing H1", 0);
    }
  } catch (err) {
    add("GEO", "fail", `Live /journal JSON-LD not verified (${err.message})`, 0);
    add("AEO", "fail", `Live /journal unreachable (${err.message})`, 0);
    add("SEO", "fail", `Live /journal not verified (${err.message})`, 0);
  }

  try {
    const sitemap = await fetchText("/sitemap.xml");
    if (sitemap.includes("<loc>") && sitemap.includes("/experiences/") && sitemap.includes("/journal")) {
      add("SEO", "info", "Live /sitemap.xml includes dynamic routes and /journal", 1);
    } else {
      add("SEO", "info", "Live /sitemap.xml may be incomplete", 0);
    }
  } catch (err) {
    add("SEO", "info", `Live sitemap not verified (${err.message})`, 0);
  }
}

async function runLighthouse() {
  const lighthouse = (await import("lighthouse")).default;
  const chromeLauncher = await import("chrome-launcher");

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  try {
    for (const path of LIGHTHOUSE_PATHS) {
      const url = `${baseUrl}${path}`;
      const result = await lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: ["seo"],
      });
      const score = Math.round((result?.lhr?.categories?.seo?.score ?? 0) * 100);
      lighthouseScores.push({ path, score });
    }
  } finally {
    await chrome.kill();
  }
}

function runCodeChecks() {
  const metadataLib = read("src/lib/seo/metadata.ts");
  const layout = read("src/app/layout.tsx");
  const pagesTs = read("src/lib/seo/pages.ts");

  if (metadataLib?.includes("alternates: { canonical:")) {
    add("SEO", "pass", "Canonical URLs generated for all metadata", 1);
  } else {
    add("SEO", "fail", "Missing canonical URL generation", 0);
  }

  if (metadataLib?.includes("openGraph") && metadataLib.includes("twitter:")) {
    add("SEO", "pass", "Open Graph + Twitter metadata present", 1);
  } else {
    add("SEO", "fail", "Incomplete social metadata", 0);
  }

  if (metadataLib?.includes("width:") && metadataLib.includes("height:")) {
    add("SEO", "pass", "OG images declare width/height", 1);
  } else {
    add("SEO", "fail", "OG images missing width/height", 0);
  }

  if (existsSync(join(ROOT, "public/og"))) {
    add("SEO", "pass", "Dedicated /public/og social share assets exist", 1);
  } else {
    add("SEO", "fail", "No dedicated OG images in public/og/", 0);
  }

  const descriptions = extractDescriptionsFromPages();
  const descIssues = descriptions.filter((d) => d.length < 120 || d.length > 160);
  if (descriptions.length >= 8 && descIssues.length === 0) {
    add("SEO", "pass", "All static meta descriptions are 120–160 characters", 1);
  } else if (descIssues.length > 0) {
    add("SEO", "fail", `${descIssues.length} meta description(s) outside 120–160 chars`, 0);
  } else {
    add("SEO", "fail", "Static page descriptions not verified", 0);
  }

  if (read("src/app/sitemap.ts") && read("src/app/robots.ts")) {
    add("SEO", "pass", "sitemap.ts + robots.ts configured", 1);
  } else {
    add("SEO", "fail", "Missing sitemap or robots", 0);
  }

  const expectedSlugs =
    extractSlugs("src/lib/destinations.ts", "destinations").length +
    extractSlugs("src/lib/experiences.ts", "experiences").length +
    extractSlugs("src/lib/legacy.ts", "legacyItems").length +
    extractSlugs("src/lib/team.ts", "teamMembers").length;
  if (read("src/app/sitemap.ts") && expectedSlugs >= 22) {
    add("SEO", "pass", `Sitemap generator covers ${expectedSlugs} dynamic slug routes`, 1);
  } else {
    add("SEO", "fail", "Sitemap may not cover all slug routes", 0);
  }

  if (read("src/app/manifest.ts") && read("src/app/not-found.tsx")) {
    add("SEO", "pass", "Web manifest + custom 404 present", 1);
  } else {
    add("SEO", "warn", "Missing manifest or custom 404", 0.4);
  }

  if (layout?.includes("metadataBase")) {
    add("SEO", "pass", "metadataBase set for absolute URLs", 1);
  } else {
    add("SEO", "fail", "metadataBase not configured", 0);
  }

  if (layout?.includes("TypekitStylesheet") || !layout?.includes('href="https://use.typekit.net')) {
    add("SEO", "pass", "Adobe Typekit loaded non-blocking", 1);
  } else if (layout?.includes("use.typekit.net")) {
    add("SEO", "warn", "Render-blocking Adobe Typekit font", 0.35);
  } else {
    add("SEO", "pass", "No render-blocking font CDN in layout", 1);
  }

  const tsxFiles = walk(join(ROOT, "src"));
  const heroComponent = read("src/components/sections/HeroVideoBackground.tsx");
  const lazyHero =
    heroComponent?.includes("IntersectionObserver") && heroComponent.includes('preload="none"');

  if (lazyHero) {
    add("SEO", "pass", "Hero videos lazy-load via IntersectionObserver", 1);
  } else {
    add("SEO", "fail", "Hero videos not lazy-loaded", 0);
  }

  let badAlts = 0;
  for (const file of tsxFiles) {
    const content = readFileSync(file, "utf8");
    for (const line of content.split("\n")) {
      if (!line.includes('alt=""')) continue;
      if (line.includes("aria-hidden")) continue;
      badAlts++;
    }
  }
  if (badAlts === 0) {
    add("SEO", "pass", "Decorative images use aria-hidden with empty alt", 1);
  } else {
    add("SEO", "fail", `${badAlts} image(s) with alt="" missing aria-hidden`, 0);
  }

  if (layout?.includes('lang="en"')) {
    add("SEO", "pass", "Document lang attribute set", 1);
  } else {
    add("SEO", "fail", "Missing html lang", 0);
  }

  if (pagesTs?.includes("ogImages.")) {
    add("SEO", "pass", "Static pages use dedicated OG image paths", 1);
  } else {
    add("SEO", "fail", "Static pages missing dedicated OG images", 0);
  }

  // AEO code checks
  if (read("public/llms.txt")?.includes("/journal")) {
    add("AEO", "pass", "llms.txt lists The Journal of ZION", 1);
  } else {
    add("AEO", "warn", "llms.txt missing /journal", 0.5);
  }

  if (read("public/llms.txt")?.includes("Destination Alchemist Lab")) {
    add("AEO", "pass", "llms.txt file includes entity summary", 1);
  } else {
    add("AEO", "fail", "llms.txt missing or incomplete", 0);
  }

  const robotsTs = read("src/app/robots.ts");
  if (robotsTs?.includes("GPTBot") && robotsTs.includes("ClaudeBot")) {
    add("AEO", "pass", "robots.ts defines AI crawler allow rules", 1);
  } else {
    add("AEO", "warn", "robots.ts missing AI crawler rules", 0.5);
  }

  const home = read("src/app/page.tsx");
  if (home?.includes("faqSchema")) {
    add("AEO", "pass", "Home page FAQ JSON-LD in source", 1);
  } else {
    add("AEO", "fail", "Home missing FAQ structured data", 0);
  }

  if (home?.includes('className="sr-only"') && home.includes("FaqSection")) {
    add("AEO", "fail", "Home FAQ is sr-only in source", 0);
  } else if (home?.includes("FaqSection")) {
    add("AEO", "pass", "Home FAQ section present in source", 1);
  }

  const ignite = read("src/app/ignite-us/page.tsx");
  if (ignite?.includes("FaqSection") && !ignite.includes("sr-only")) {
    add("AEO", "pass", "Ignite Us FAQ section in source", 1);
  } else {
    add("AEO", "fail", "Ignite Us missing FAQ in source", 0);
  }

  const faqCount = read("src/lib/seo/faqs.ts")?.match(/question:/g)?.length ?? 0;
  if (faqCount >= 8) {
    add("AEO", "pass", `${faqCount} FAQs in registry`, 1);
  } else {
    add("AEO", "fail", `Insufficient FAQ registry (${faqCount})`, 0);
  }

  const artisansPage = read("src/app/the-artisans/page.tsx");
  if (
    artisansPage?.includes('headingLevel="h1"') ||
    (artisansPage?.includes("<h1") && !artisansPage.includes('className="sr-only"'))
  ) {
    add("AEO", "pass", "/the-artisans has visible H1 in source", 1);
  } else {
    add("AEO", "fail", "/the-artisans missing visible H1", 0);
  }

  const listingPages = ["experiences", "destination", "legacy", "sustainability"];
  const missingVisibleFaq = listingPages.filter((p) => !read(`src/app/${p}/page.tsx`)?.includes("FaqSection"));
  if (missingVisibleFaq.length === 0) {
    add("AEO", "pass", "Listing pages include FAQ sections in source", 1);
  } else {
    add("AEO", "warn", `Missing FAQ in source: ${missingVisibleFaq.join(", ")}`, 0.4);
  }

  if (home?.includes("Destination Alchemist Lab") || home?.includes("DESTINATION ALCHEMIST LAB")) {
    add("AEO", "pass", "Home copy states brand positioning", 1);
  } else {
    add("AEO", "fail", "Home missing entity positioning phrase", 0);
  }

  const igniteContact = read("src/components/sections/IgniteContactSection.tsx");
  if (
    igniteContact?.includes("ignite@zion-creativeartisans.com") &&
    igniteContact?.includes("210 188 406")
  ) {
    add("AEO", "pass", "Contact facts in Ignite Us source", 1);
  } else {
    add("AEO", "fail", "Contact facts not in source", 0);
  }

  if (read("src/lib/seo/site.ts")?.includes("SITE_ENTITY_SUMMARY")) {
    add("AEO", "pass", "Central entity summary defined", 1);
  } else {
    add("AEO", "fail", "Missing SITE_ENTITY_SUMMARY", 0);
  }

  // GEO code checks
  const schemas = read("src/lib/seo/schemas.ts");
  if (schemas?.includes("sameAs") && schemas.includes("GeoCoordinates")) {
    add("GEO", "pass", "Organization schema: sameAs + geo", 1);
  } else {
    add("GEO", "fail", "Organization missing sameAs or geo", 0);
  }

  if (schemas?.includes("OpeningHoursSpecification")) {
    add("GEO", "pass", "OpeningHoursSpecification in schema builder", 1);
  } else {
    add("GEO", "fail", "Opening hours not OpeningHoursSpecification", 0);
  }

  if (schemas?.includes("logo:")) {
    add("GEO", "pass", "Organization schema includes logo", 1);
  } else {
    add("GEO", "fail", "Organization schema missing logo", 0);
  }

  if (schemas?.match(/organizationSchema[\s\S]*?image:/)) {
    add("GEO", "pass", "Organization schema includes image", 1);
  } else {
    add("GEO", "fail", "Organization schema missing image", 0);
  }

  if (layout?.includes("RootStructuredData")) {
    add("GEO", "pass", "Root TravelAgency + WebSite JSON-LD in layout", 1);
  } else {
    add("GEO", "fail", "Missing root structured data", 0);
  }

  const slugRoutes = [
    "src/app/destination/[slug]/page.tsx",
    "src/app/experiences/[slug]/page.tsx",
    "src/app/legacy/[slug]/page.tsx",
    "src/app/the-artisans/[slug]/page.tsx",
  ];
  if (slugRoutes.every((f) => read(f)?.includes("JsonLd") && read(f)?.includes("breadcrumbSchema"))) {
    add("GEO", "pass", "All slug pages: JSON-LD + breadcrumbs in source", 1);
  } else {
    add("GEO", "fail", "Slug page structured data incomplete in source", 0);
  }

  if (read("src/app/journal/page.tsx")?.includes("JournalStructuredData")) {
    add("GEO", "pass", "Journal page uses Blog + CollectionPage structured data", 1);
  } else {
    add("GEO", "fail", "Journal page missing structured data component", 0);
  }

  if (read("src/app/journal/page.tsx")?.includes("journalFaqs")) {
    add("GEO", "pass", "Journal page wires FAQ schema in source", 1);
  } else {
    add("GEO", "warn", "Journal page lacks FAQ schema in source", 0.5);
  }

  if (["experiences", "destination", "legacy", "the-artisans"].every((p) =>
    read(`src/app/${p}/page.tsx`)?.includes("ListingStructuredData"),
  )) {
    add("GEO", "pass", "Listing pages use ItemList in source", 1);
  } else {
    add("GEO", "fail", "Listing pages missing ItemList", 0);
  }

  if (read("src/app/sustainability/page.tsx")?.includes("ListingStructuredData")) {
    add("GEO", "pass", "Sustainability page has ItemList in source", 1);
  } else {
    add("GEO", "warn", "Sustainability page missing ItemList in source", 0.5);
  }

  if (ignite?.includes("contactPageSchema") && ignite.includes("faqSchema")) {
    add("GEO", "pass", "Ignite Us: ContactPage + FAQPage in source", 1);
  } else {
    add("GEO", "fail", "Ignite Us missing ContactPage or FAQ schema in source", 0);
  }

  if (["experiences", "destination", "legacy", "journal"].every(
    (p) => read(`src/app/${p}/page.tsx`)?.includes("faqs"),
  )) {
    add("GEO", "pass", "Listing pages wire FAQ schema in source", 1);
  } else {
    add("GEO", "warn", "Some listing pages lack FAQ schema in source", 0.45);
  }

  if (schemas?.includes("@id")) {
    add("GEO", "pass", "Entity @id linking in schema builders", 1);
  } else {
    add("GEO", "fail", "Missing @id entity graph linking", 0);
  }

  if (read("src/app/the-artisans/[slug]/page.tsx")?.includes("hoverImage")) {
    add("GEO", "pass", "Person schema uses profile photo source", 1);
  } else {
    add("GEO", "warn", "Person schema image may not match profile photo", 0.5);
  }

  if (schemas?.includes("FAQPage")) {
    add("GEO", "pass", "FAQPage schema builder available", 1);
  } else {
    add("GEO", "fail", "FAQPage schema not implemented", 0);
  }
}

function lighthouseSeoScore() {
  if (lighthouseScores.length === 0) return null;
  return Math.round(lighthouseScores.reduce((s, x) => s + x.score, 0) / lighthouseScores.length);
}

async function main() {
  console.log("\n  ZION — SEO / AEO / GEO Audit");
  console.log("  Google Lighthouse + live site + code checks");
  console.log("  ═══════════════════════════════════════════\n");

  runCodeChecks();

  /** @type {import('node:child_process').ChildProcess | null} */
  let serverProc = null;

  try {
    serverProc = await ensureServer();
    if (serverProc) {
      console.log(`  ✓ Started production server at ${baseUrl}\n`);
    } else {
      console.log(`  ✓ Using server at ${baseUrl}\n`);
    }

    await runLiveChecks();

    if (!SKIP_LIGHTHOUSE) {
      console.log("  Running Google Lighthouse (SEO)…");
      await runLighthouse();
      console.log("");
    } else {
      console.log("  ⚠ Lighthouse skipped (AUDIT_SKIP_LIGHTHOUSE=1)\n");
    }
  } catch (err) {
    console.error(`  ✗ ${err.message}\n`);
    if (String(err.message).includes("production build")) {
      console.error("  Run: npm run build && npm run audit:seo\n");
    }
    process.exit(1);
  } finally {
    if (serverProc) {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(serverProc.pid), "/f", "/t"], { shell: true, stdio: "ignore" });
      } else {
        process.kill(-serverProc.pid);
      }
    }
  }

  const seoLighthouse = lighthouseSeoScore();
  const seoInfra = scoreCategory("SEO");
  const aeo = scoreCategory("AEO");
  const geo = scoreCategory("GEO");
  const seo = seoLighthouse ?? seoInfra;
  const overall = Math.round((seo + aeo + geo) / 3);

  if (lighthouseScores.length > 0) {
    console.log("  SEO — Google Lighthouse (live browser audit)");
    for (const { path, score } of lighthouseScores) {
      console.log(`    ${path.padEnd(18)} ${score}/100`);
    }
    console.log(`    ${"Average".padEnd(18)} ${seoLighthouse}/100\n`);
  }

  for (const cat of ["SEO", "AEO", "GEO"]) {
    const items = findings.filter((f) => f.category === cat && f.severity !== "info");
    const p = items.filter((f) => f.severity === "pass").length;
    const w = items.filter((f) => f.severity === "warn").length;
    const f = items.filter((f) => f.severity === "fail").length;
    const label =
      cat === "SEO" && seoLighthouse != null
        ? `infra ${seoInfra}/100 (Lighthouse used for score)`
        : `${scoreCategory(cat)}/100`;
    console.log(`  ${cat}: ${p} pass · ${w} warn · ${f} fail  →  ${label}`);
  }

  const fails = findings.filter((f) => f.severity === "fail");
  const warns = findings.filter((f) => f.severity === "warn");

  if (fails.length) {
    console.log("\n  Failures:");
    for (const x of fails) console.log(`    ✗  [${x.category}] ${x.message}`);
  }

  if (warns.length) {
    console.log("\n  Warnings:");
    for (const x of warns) console.log(`    ⚠  [${x.category}] ${x.message}`);
  }

  console.log("\n  ───────────────────────────────────");
  console.log(`  SCORES          SEO ${seo}  ·  AEO ${aeo}  ·  GEO ${geo}`);
  console.log(`  OVERALL         ${overall}/100`);
  if (seoLighthouse != null) {
    console.log("  SEO score = Google Lighthouse average (Chrome headless)");
  } else {
    console.log("  SEO score = infrastructure checks (Lighthouse unavailable)");
  }
  console.log("  ───────────────────────────────────\n");

  process.exit(fails.length > 0 ? 1 : 0);
}

main();
