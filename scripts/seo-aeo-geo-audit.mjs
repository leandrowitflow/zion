#!/usr/bin/env node
/**
 * SEO / AEO / GEO audit for ZION Creative Artisans.
 *
 * SEO  — metadata, canonicals, sitemap, robots, OG/Twitter
 * AEO  — answer-ready headings, descriptions, factual entity copy
 * GEO  — JSON-LD structured data, organization identity, breadcrumbs
 *
 * Usage: npm run audit:seo
 */

import { readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const SRC = join(ROOT, "src");

const results = { pass: [], warn: [], fail: [] };

function read(path) {
  const full = join(ROOT, path);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

function pass(category, message) {
  results.pass.push({ category, message });
}

function warn(category, message) {
  results.warn.push({ category, message });
}

function fail(category, message) {
  results.fail.push({ category, message });
}

function extractSlugs(filePath, arrayName) {
  const content = read(filePath);
  if (!content) return [];
  const block = content.match(new RegExp(`export const ${arrayName}[\\s\\S]*?=\\s*\\[[\\s\\S]*?\\];`));
  if (!block) return [];
  return [...block[0].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function hasMetadata(content) {
  return (
    /export const metadata\s*=/.test(content) ||
    /export async function generateMetadata/.test(content)
  );
}

function hasH1(content) {
  return /<h1[\s>]/.test(content);
}

function countH1(content) {
  return (content.match(/<h1[\s>]/g) ?? []).length;
}

function usesBuildSlugMetadata(content) {
  return content.includes("buildSlugMetadata");
}

function hasJsonLd(content) {
  return content.includes("<JsonLd") || content.includes("application/ld+json");
}

/** --- Static routes --- */
const STATIC_PAGES = [
  { path: "/", file: "src/app/page.tsx", label: "Home" },
  { path: "/the-artisans", file: "src/app/the-artisans/page.tsx", label: "The Artisans" },
  { path: "/experiences", file: "src/app/experiences/page.tsx", label: "Experiences" },
  { path: "/legacy", file: "src/app/legacy/page.tsx", label: "Legacy" },
  { path: "/destination", file: "src/app/destination/page.tsx", label: "Destination" },
  { path: "/sustainability", file: "src/app/sustainability/page.tsx", label: "Sustainability" },
  { path: "/ignite-us", file: "src/app/ignite-us/page.tsx", label: "Ignite Us" },
];

const H1_FALLBACK = {
  "src/app/ignite-us/page.tsx": "src/components/sections/IgniteContactSection.tsx",
};

const DYNAMIC_ROUTES = [
  {
    prefix: "/destination",
    file: "src/app/destination/[slug]/page.tsx",
    slugs: extractSlugs("src/lib/destinations.ts", "destinations"),
  },
  {
    prefix: "/experiences",
    file: "src/app/experiences/[slug]/page.tsx",
    slugs: extractSlugs("src/lib/experiences.ts", "experiences"),
  },
  {
    prefix: "/legacy",
    file: "src/app/legacy/[slug]/page.tsx",
    slugs: extractSlugs("src/lib/legacy.ts", "legacyItems"),
  },
  {
    prefix: "/the-artisans",
    file: "src/app/the-artisans/[slug]/page.tsx",
    slugs: extractSlugs("src/lib/team.ts", "teamMembers"),
  },
];

/** --- SEO infrastructure --- */
const SEO_FILES = [
  "src/lib/seo/site.ts",
  "src/lib/seo/metadata.ts",
  "src/lib/seo/schemas.ts",
  "src/lib/seo/pages.ts",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/components/seo/JsonLd.tsx",
  "src/components/seo/RootStructuredData.tsx",
];

console.log("\n  ZION — SEO / AEO / GEO Audit\n  ─────────────────────────────\n");

for (const file of SEO_FILES) {
  if (read(file)) {
    pass("SEO", `Infrastructure file present: ${relative(ROOT, join(ROOT, file))}`);
  } else {
    fail("SEO", `Missing infrastructure file: ${file}`);
  }
}

const layout = read("src/app/layout.tsx");
if (layout) {
  if (layout.includes("metadataBase")) pass("SEO", "Root layout sets metadataBase");
  else fail("SEO", "Root layout missing metadataBase");

  if (layout.includes('lang="en"')) pass("AEO", "Document language set to en");
  else fail("AEO", 'Root layout missing lang="en"');

  if (layout.includes("RootStructuredData")) pass("GEO", "Root layout injects organization + WebSite JSON-LD");
  else fail("GEO", "Root layout missing RootStructuredData");
}

const metadataLib = read("src/lib/seo/metadata.ts");
if (metadataLib?.includes("alternates: { canonical:")) {
  pass("SEO", "buildPageMetadata generates canonical URLs");
} else {
  fail("SEO", "buildPageMetadata missing canonical alternates");
}

const robots = read("src/app/robots.ts");
if (robots?.includes("sitemap:")) pass("SEO", "robots.ts references sitemap.xml");
else fail("SEO", "robots.ts missing sitemap reference");

const sitemap = read("src/app/sitemap.ts");
if (sitemap?.includes("staticRoutes")) pass("SEO", "sitemap.ts includes static routes registry");
else fail("SEO", "sitemap.ts missing staticRoutes");

/** --- Static pages --- */
for (const page of STATIC_PAGES) {
  const content = read(page.file);
  if (!content) {
    fail("SEO", `${page.label}: page file missing (${page.file})`);
    continue;
  }

  if (hasMetadata(content)) pass("SEO", `${page.label}: metadata export present`);
  else fail("SEO", `${page.label}: missing metadata export`);

  const h1Source = H1_FALLBACK[page.file] ? read(H1_FALLBACK[page.file]) : content;
  const h1Count = countH1(h1Source ?? "");
  if (h1Count === 1) pass("AEO", `${page.label}: exactly one H1`);
  else if (h1Count === 0) fail("AEO", `${page.label}: no H1 found`);
  else warn("AEO", `${page.label}: multiple H1 elements (${h1Count})`);
}

/** --- Dynamic slug templates --- */
for (const route of DYNAMIC_ROUTES) {
  const content = read(route.file);
  if (!content) {
    fail("SEO", `${route.prefix}/[slug]: template missing`);
    continue;
  }

  if (content.includes("generateMetadata")) pass("SEO", `${route.prefix}/[slug]: generateMetadata defined`);
  else fail("SEO", `${route.prefix}/[slug]: missing generateMetadata`);

  if (usesBuildSlugMetadata(content)) pass("SEO", `${route.prefix}/[slug]: uses buildSlugMetadata (canonical + OG)`);
  else warn("SEO", `${route.prefix}/[slug]: not using buildSlugMetadata`);

  if (hasJsonLd(content)) pass("GEO", `${route.prefix}/[slug]: page-level JSON-LD present`);
  else fail("GEO", `${route.prefix}/[slug]: missing JSON-LD`);

  if (content.includes("breadcrumbSchema")) pass("GEO", `${route.prefix}/[slug]: breadcrumb schema included`);
  else warn("GEO", `${route.prefix}/[slug]: missing breadcrumb schema`);

  if (hasH1(content)) pass("AEO", `${route.prefix}/[slug]: H1 in template`);
  else fail("AEO", `${route.prefix}/[slug]: no H1 in template`);

  if (route.slugs.length === 0) {
    fail("SEO", `${route.prefix}: no slugs found in data module`);
  } else {
    pass("SEO", `${route.prefix}: ${route.slugs.length} slug(s) registered for static generation`);
  }
}

/** --- Sitemap coverage --- */
if (sitemap) {
  for (const page of STATIC_PAGES) {
    const needle = page.path === "/" ? 'path === "/"' : page.path;
    if (sitemap.includes(page.path.slice(1)) || page.path === "/") {
      pass("SEO", `Sitemap covers ${page.path}`);
    }
  }

  for (const route of DYNAMIC_ROUTES) {
    for (const slug of route.slugs) {
      const segment = `${route.prefix}/${slug}`;
      if (sitemap.includes(route.prefix)) {
        pass("SEO", `Sitemap generator includes ${route.prefix}/* routes`);
        break;
      }
    }
  }
}

/** --- AEO / GEO entity facts --- */
const site = read("src/lib/seo/site.ts");
if (site) {
  const entityFields = ["SITE_NAME", "SITE_EMAIL", "SITE_PHONE", "SITE_ADDRESS", "SITE_ENTITY_SUMMARY"];
  for (const field of entityFields) {
    if (site.includes(field)) pass("GEO", `Entity fact defined: ${field}`);
    else fail("GEO", `Missing entity fact: ${field}`);
  }

  if (site.includes("Destination Alchemist Lab")) {
    pass("AEO", "Entity summary includes brand positioning phrase");
  } else {
    warn("AEO", "SITE_ENTITY_SUMMARY missing distinctive brand phrase");
  }
}

const schemas = read("src/lib/seo/schemas.ts");
if (schemas) {
  for (const type of ["TravelAgency", "WebSite", "Person", "TouristDestination", "TouristTrip", "Service", "BreadcrumbList"]) {
    if (schemas.includes(type)) pass("GEO", `Schema builder supports ${type}`);
    else fail("GEO", `Schema builder missing ${type}`);
  }
}

const pagesRegistry = read("src/lib/seo/pages.ts");
if (pagesRegistry) {
  const descMatches = pagesRegistry.match(/description:\s*\n?\s*"([^"]{50,})"/g) ?? [];
  if (descMatches.length >= 7) pass("AEO", "Static pages have substantive meta descriptions");
  else warn("AEO", "Some static pages may have thin meta descriptions");

  const ogImageCount = (pagesRegistry.match(/image:\s*\w+Assets\./g) ?? []).length;
  if (ogImageCount >= 7) pass("SEO", "Static pages use page-specific Open Graph images");
  else fail("SEO", "Static pages missing page-specific Open Graph images");
}

if (read("public/llms.txt")) pass("AEO", "llms.txt present for AI crawlers");
else fail("AEO", "Missing public/llms.txt");

if (read("src/app/manifest.ts")) pass("SEO", "Web app manifest configured");
else fail("SEO", "Missing src/app/manifest.ts");

if (read("src/app/not-found.tsx")) pass("SEO", "Custom not-found page configured");
else fail("SEO", "Missing src/app/not-found.tsx");

if (read("src/lib/seo/faqs.ts")) pass("AEO", "FAQ content registry present");
else fail("AEO", "Missing src/lib/seo/faqs.ts");

const home = read("src/app/page.tsx");
if (home?.includes("faqSchema")) pass("AEO", "Home page includes FAQ structured data");
else fail("AEO", "Home page missing FAQ structured data");

const ignite = read("src/app/ignite-us/page.tsx");
if (ignite?.includes("FaqSection")) pass("AEO", "Ignite Us page includes visible FAQ section");
else fail("AEO", "Ignite Us page missing visible FAQ section");
if (ignite?.includes("contactPageSchema")) pass("GEO", "Ignite Us page includes ContactPage schema");
else fail("GEO", "Ignite Us page missing ContactPage schema");

if (site?.includes("SITE_SOCIAL")) pass("GEO", "Social profile URLs defined (sameAs)");
else fail("GEO", "Missing SITE_SOCIAL for sameAs");
if (site?.includes("SITE_GEO")) pass("GEO", "Geo coordinates defined");
else fail("GEO", "Missing SITE_GEO coordinates");

if (schemas?.includes("sameAs")) pass("GEO", "Organization schema includes sameAs");
else fail("GEO", "Organization schema missing sameAs");
if (schemas?.includes("GeoCoordinates")) pass("GEO", "Organization schema includes GeoCoordinates");
else fail("GEO", "Organization schema missing GeoCoordinates");
if (schemas?.includes("ContactPage")) pass("GEO", "Schema builder supports ContactPage");
else fail("GEO", "Schema builder missing ContactPage");
if (schemas?.includes("ItemList")) pass("GEO", "Schema builder supports ItemList");
else fail("GEO", "Schema builder missing ItemList");

if (metadataLib?.includes("keywords:")) pass("SEO", "Metadata includes keywords");
else fail("SEO", "Metadata missing keywords");

const listingPages = [
  "src/app/experiences/page.tsx",
  "src/app/destination/page.tsx",
  "src/app/legacy/page.tsx",
  "src/app/the-artisans/page.tsx",
];
for (const file of listingPages) {
  const content = read(file);
  const label = file.split("/").slice(-2, -1)[0];
  if (content?.includes("ListingStructuredData")) {
    pass("GEO", `${label}: listing page ItemList JSON-LD present`);
  } else {
    fail("GEO", `${label}: listing page missing ItemList JSON-LD`);
  }
}

/** --- Score --- */
function categoryScore(category) {
  const p = results.pass.filter((r) => r.category === category).length;
  const w = results.warn.filter((r) => r.category === category).length;
  const f = results.fail.filter((r) => r.category === category).length;
  const total = p + w + f;
  if (total === 0) return 0;
  return Math.round(((p + w * 0.5) / total) * 100);
}

/** --- Report --- */
const categories = ["SEO", "AEO", "GEO"];
for (const cat of categories) {
  const p = results.pass.filter((r) => r.category === cat).length;
  const w = results.warn.filter((r) => r.category === cat).length;
  const f = results.fail.filter((r) => r.category === cat).length;
  console.log(`  ${cat}: ${p} passed, ${w} warnings, ${f} failed`);
}

if (results.warn.length) {
  console.log("\n  Warnings:");
  for (const w of results.warn) console.log(`    ⚠  [${w.category}] ${w.message}`);
}

if (results.fail.length) {
  console.log("\n  Failures:");
  for (const f of results.fail) console.log(`    ✗  [${f.category}] ${f.message}`);
  console.log(`\n  Result: FAIL (${results.fail.length} issue(s))\n`);
  process.exit(1);
}

console.log(`\n  Result: PASS (${results.pass.length} checks, ${results.warn.length} warning(s))`);
console.log("\n  Scores:");
console.log(`    SEO: ${categoryScore("SEO")}/100`);
console.log(`    AEO: ${categoryScore("AEO")}/100`);
console.log(`    GEO: ${categoryScore("GEO")}/100\n`);
