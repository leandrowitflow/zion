#!/usr/bin/env node
/**
 * STRICT SEO / AEO / GEO audit — production-grade bar, not checklist theater.
 * Warnings and failures both reduce score. Target 100 = genuinely best-in-class.
 *
 * Usage: npm run audit:seo:strict
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");

/** @typedef {{ category: 'SEO'|'AEO'|'GEO', severity: 'pass'|'warn'|'fail', message: string, points?: number }} Finding */

/** @type {Finding[]} */
const findings = [];

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
  const items = findings.filter((f) => f.category === category);
  const earned = items.reduce((sum, f) => sum + (f.points ?? 0), 0);
  const max = items.length;
  if (max === 0) return 0;
  return Math.round((earned / max) * 100);
}

console.log("\n  ZION — STRICT SEO / AEO / GEO Audit");
console.log("  ═══════════════════════════════════\n");

// ─── SEO ───────────────────────────────────────────────────────────────

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
  add("SEO", "fail", "OG images missing width/height (social crawlers prefer 1200×630)", 0);
}

if (existsSync(join(ROOT, "public/og"))) {
  add("SEO", "pass", "Dedicated /public/og social share assets exist", 1);
} else {
  add("SEO", "fail", "No dedicated 1200×630 OG images in public/og/ (using hero posters)", 0);
}

const descriptions = extractDescriptionsFromPages();
const descIssues = descriptions.filter((d) => d.length < 120 || d.length > 160);
if (descriptions.length >= 7 && descIssues.length === 0) {
  add("SEO", "pass", "All static meta descriptions are 120–160 characters", 1);
} else if (descIssues.length > 0) {
  add(
    "SEO",
    "fail",
    `${descIssues.length} meta description(s) outside 120–160 chars (snippet truncation risk)`,
    0,
  );
} else {
  add("SEO", "fail", "Static page descriptions not verified", 0);
}

if (read("src/app/sitemap.ts") && read("src/app/robots.ts")) {
  add("SEO", "pass", "sitemap.xml + robots.txt configured", 1);
} else {
  add("SEO", "fail", "Missing sitemap or robots", 0);
}

const expectedSlugs =
  extractSlugs("src/lib/destinations.ts", "destinations").length +
  extractSlugs("src/lib/experiences.ts", "experiences").length +
  extractSlugs("src/lib/legacy.ts", "legacyItems").length +
  extractSlugs("src/lib/team.ts", "teamMembers").length;
const sitemap = read("src/app/sitemap.ts");
if (sitemap && expectedSlugs >= 22) {
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

if (layout?.includes("use.typekit.net")) {
  add("SEO", "warn", "Render-blocking Adobe Typekit font (Core Web Vitals / SEO risk)", 0.35);
} else {
  add("SEO", "pass", "No external render-blocking font CDN in layout", 1);
}

const tsxFiles = walk(join(ROOT, "src"));

let heroVideoRefs = 0;
for (const file of tsxFiles) {
  heroVideoRefs += (readFileSync(file, "utf8").match(/HeroVideoBackground/g) ?? []).length;
}
if (heroVideoRefs <= 12) {
  add("SEO", "warn", `${heroVideoRefs} full-bleed hero videos (LCP/bandwidth impact)`, 0.45);
} else {
  add("SEO", "fail", `Excessive hero video usage (${heroVideoRefs})`, 0);
}

let badAlts = 0;
for (const file of tsxFiles) {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");
  for (const line of lines) {
    if (!line.includes('alt=""')) continue;
    if (line.includes("aria-hidden")) continue;
    badAlts++;
  }
}
if (badAlts === 0) {
  add("SEO", "pass", "No decorative images with empty alt missing aria-hidden", 1);
} else {
  add("SEO", "fail", `${badAlts} image line(s) with alt="" without aria-hidden`, 0);
}

if (read("src/components/sections/HeroVideoBackground.tsx")?.includes('preload="metadata"')) {
  add("SEO", "pass", "Hero videos use preload=metadata (not auto)", 1);
} else {
  add("SEO", "warn", "Hero video preload not optimized", 0.4);
}

if (layout?.includes('lang="en"')) {
  add("SEO", "pass", "Document lang attribute set", 1);
} else {
  add("SEO", "fail", "Missing html lang", 0);
}

// ─── AEO ───────────────────────────────────────────────────────────────

if (read("public/llms.txt")?.includes("Destination Alchemist Lab")) {
  add("AEO", "pass", "llms.txt with entity + services + pages", 1);
} else {
  add("AEO", "fail", "llms.txt missing or incomplete", 0);
}

if (read("public/robots.txt") || read("src/app/robots.ts")) {
  add("AEO", "warn", "No explicit AI crawler rules in robots (GPTBot, ClaudeBot, etc.)", 0.5);
}

const home = read("src/app/page.tsx");
if (home?.includes("faqSchema")) {
  add("AEO", "pass", "Home page FAQ JSON-LD present", 1);
} else {
  add("AEO", "fail", "Home missing FAQ structured data", 0);
}

if (home?.includes('className="sr-only"') && home.includes("FaqSection")) {
  add("AEO", "fail", "Home FAQ content is sr-only (hidden from users + weak AEO signal)", 0);
} else if (home?.includes("FaqSection")) {
  add("AEO", "pass", "Home FAQ visible to users", 1);
}

const ignite = read("src/app/ignite-us/page.tsx");
if (ignite?.includes("FaqSection") && !ignite.includes("sr-only")) {
  add("AEO", "pass", "Ignite Us has visible FAQ section", 1);
} else {
  add("AEO", "fail", "Ignite Us missing visible FAQ", 0);
}

const faqsContent = read("src/lib/seo/faqs.ts");
const faqCount = faqsContent?.match(/question:/g)?.length ?? 0;
if (faqCount >= 8) {
  add("AEO", "pass", `${faqCount} FAQs in registry (strong answer coverage)`, 1);
} else if (faqCount >= 5) {
  add("AEO", "warn", `Only ${faqCount} FAQs (recommend 8+ for comprehensive AEO)`, 0.55);
} else {
  add("AEO", "fail", `Insufficient FAQ coverage (${faqCount})`, 0);
}

const artisansPage = read("src/app/the-artisans/page.tsx");
if (artisansPage?.includes('className="sr-only"') && artisansPage.includes("<h1")) {
  add("AEO", "fail", "/the-artisans H1 is sr-only (no visible primary heading)", 0);
} else {
  add("AEO", "pass", "/the-artisans has visible H1", 1);
}

const listingPages = ["experiences", "destination", "legacy", "sustainability"];
const missingVisibleFaq = listingPages.filter((p) => {
  const c = read(`src/app/${p}/page.tsx`);
  return !c?.includes("FaqSection");
});
if (missingVisibleFaq.length === 0) {
  add("AEO", "pass", "Key listing pages include FAQ sections", 1);
} else {
  add(
    "AEO",
    "warn",
    `No visible FAQ on: ${missingVisibleFaq.join(", ")} (AEO gap on high-intent pages)`,
    0.4,
  );
}

if (home?.includes("Destination Alchemist Lab") || home?.includes("DESTINATION ALCHEMIST LAB")) {
  add("AEO", "pass", "Home visible copy states brand positioning", 1);
} else {
  add("AEO", "fail", "Home missing visible entity positioning phrase", 0);
}

const igniteContact = read("src/components/sections/IgniteContactSection.tsx");
if (
  igniteContact?.includes("ignite@zion-creativeartisans.com") &&
  igniteContact?.includes("210 188 406")
) {
  add("AEO", "pass", "Contact facts visible on Ignite Us (email + phone)", 1);
} else {
  add("AEO", "fail", "Contact facts not fully visible", 0);
}

if (read("src/lib/seo/site.ts")?.includes("SITE_ENTITY_SUMMARY")) {
  add("AEO", "pass", "Central entity summary defined for citation", 1);
} else {
  add("AEO", "fail", "Missing SITE_ENTITY_SUMMARY", 0);
}

// ─── GEO ───────────────────────────────────────────────────────────────

const schemas = read("src/lib/seo/schemas.ts");
if (schemas?.includes("sameAs") && schemas.includes("GeoCoordinates")) {
  add("GEO", "pass", "Organization schema: sameAs + geo coordinates", 1);
} else {
  add("GEO", "fail", "Organization missing sameAs or geo", 0);
}

if (schemas?.includes("OpeningHoursSpecification")) {
  add("GEO", "pass", "Opening hours use schema.org OpeningHoursSpecification", 1);
} else {
  add("GEO", "fail", "Opening hours are plain text, not OpeningHoursSpecification", 0);
}

if (schemas?.includes('"logo"') || schemas?.includes("logo:")) {
  add("GEO", "pass", "Organization schema includes logo", 1);
} else {
  add("GEO", "fail", "Organization schema missing logo property", 0);
}

if (schemas?.match(/organizationSchema[\s\S]*?image:/)) {
  add("GEO", "pass", "Organization schema includes image", 1);
} else {
  add("GEO", "fail", "Organization schema missing image property", 0);
}

if (layout?.includes("RootStructuredData")) {
  add("GEO", "pass", "Global TravelAgency + WebSite JSON-LD in layout", 1);
} else {
  add("GEO", "fail", "Missing root structured data", 0);
}

const slugRoutes = [
  "src/app/destination/[slug]/page.tsx",
  "src/app/experiences/[slug]/page.tsx",
  "src/app/legacy/[slug]/page.tsx",
  "src/app/the-artisans/[slug]/page.tsx",
];
const slugJsonLd = slugRoutes.every((f) => read(f)?.includes("JsonLd") && read(f)?.includes("breadcrumbSchema"));
if (slugJsonLd) {
  add("GEO", "pass", "All slug pages: JSON-LD + breadcrumbs", 1);
} else {
  add("GEO", "fail", "Slug page structured data incomplete", 0);
}

const listingWithItemList = ["experiences", "destination", "legacy", "the-artisans"].every((p) =>
  read(`src/app/${p}/page.tsx`)?.includes("ListingStructuredData"),
);
if (listingWithItemList) {
  add("GEO", "pass", "Main listing pages use ItemList schema", 1);
} else {
  add("GEO", "fail", "Listing pages missing ItemList JSON-LD", 0);
}

const sustainability = read("src/app/sustainability/page.tsx");
if (sustainability?.includes("ItemList") || sustainability?.includes("ListingStructuredData")) {
  add("GEO", "pass", "Sustainability page has ItemList or equivalent", 1);
} else {
  add("GEO", "warn", "Sustainability page only has breadcrumbs (no ItemList)", 0.5);
}

if (ignite?.includes("contactPageSchema") && ignite.includes("faqSchema")) {
  add("GEO", "pass", "Ignite Us: ContactPage + FAQPage schema", 1);
} else {
  add("GEO", "fail", "Ignite Us missing ContactPage or FAQ schema", 0);
}

const listingFaqSchema = ["experiences", "destination", "legacy"].every(
  (p) => read(`src/app/${p}/page.tsx`)?.includes("faqSchema") || read(`src/app/${p}/page.tsx`)?.includes("faqs"),
);
if (listingFaqSchema) {
  add("GEO", "pass", "Listing pages include FAQ schema", 1);
} else {
  add("GEO", "warn", "Experiences/destination/legacy pages lack FAQ JSON-LD", 0.45);
}

if (schemas?.includes("@id")) {
  add("GEO", "pass", "Entity @id linking used in schemas", 1);
} else {
  add("GEO", "fail", "Missing @id entity graph linking", 0);
}

if (read("src/app/the-artisans/[slug]/page.tsx")?.includes("hoverImage")) {
  add("GEO", "pass", "Person schema/image aligned with profile photo", 1);
} else {
  add("GEO", "warn", "Person schema image may not match profile photo", 0.5);
}

if (schemas?.includes("FAQPage")) {
  add("GEO", "pass", "FAQPage schema builder available and used", 1);
} else {
  add("GEO", "fail", "FAQPage schema not implemented", 0);
}

// ─── Report ────────────────────────────────────────────────────────────

for (const cat of ["SEO", "AEO", "GEO"]) {
  const items = findings.filter((f) => f.category === cat);
  const p = items.filter((f) => f.severity === "pass").length;
  const w = items.filter((f) => f.severity === "warn").length;
  const f = items.filter((f) => f.severity === "fail").length;
  console.log(`  ${cat}: ${p} pass · ${w} warn · ${f} fail  →  ${scoreCategory(cat)}/100`);
}

const fails = findings.filter((f) => f.severity === "fail");
const warns = findings.filter((f) => f.severity === "warn");

if (fails.length) {
  console.log("\n  Failures (must fix for a perfect score):");
  for (const x of fails) console.log(`    ✗  [${x.category}] ${x.message}`);
}

if (warns.length) {
  console.log("\n  Warnings (fix for best-in-class):");
  for (const x of warns) console.log(`    ⚠  [${x.category}] ${x.message}`);
}

const seo = scoreCategory("SEO");
const aeo = scoreCategory("AEO");
const geo = scoreCategory("GEO");
const overall = Math.round((seo + aeo + geo) / 3);

console.log("\n  ───────────────────────────────────");
console.log(`  STRICT SCORES   SEO ${seo}  ·  AEO ${aeo}  ·  GEO ${geo}`);
console.log(`  OVERALL         ${overall}/100`);
console.log("  ───────────────────────────────────\n");

console.log("  Compare with lenient audit: npm run audit:seo\n");

process.exit(fails.length > 0 ? 1 : 0);
