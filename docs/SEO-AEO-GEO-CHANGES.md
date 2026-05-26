# SEO / AEO / GEO Optimization Changelog

All changes were made to maximize search, answer-engine, and generative-engine readiness **without altering the visual design, layout structure, or brand voice**. New user-facing copy is limited to factual FAQs distilled from existing site language.

**Audit result:** `npm run audit:seo` → SEO **100/100**, AEO **100/100**, GEO **100/100**

---

## New files

| File | Purpose |
|------|---------|
| `public/llms.txt` | AI crawler guidance — entity facts, services, pages, social profiles, citation guidance |
| `src/lib/seo/faqs.ts` | Central FAQ registry (5 questions) for AEO/GEO structured answers |
| `src/components/seo/FaqSection.tsx` | Reusable FAQ block using existing `contact-page-title` and `text-body` styles |
| `src/components/seo/ListingStructuredData.tsx` | Breadcrumb + ItemList JSON-LD for listing pages |
| `src/app/manifest.ts` | Web app manifest (name, icons, theme colors) |
| `src/app/not-found.tsx` | Branded 404 page with `noIndex` metadata |
| `docs/SEO-AEO-GEO-CHANGES.md` | This changelog |

---

## SEO changes

### Metadata & sharing
- **`src/lib/seo/pages.ts`** — Each static page now uses a **page-specific Open Graph image** (hero poster from that section) instead of the logo default.
- **`src/lib/seo/metadata.ts`** — Metadata exports now include **`keywords`** from `SITE_KEYWORDS`.
- **`src/app/manifest.ts`** — PWA manifest at `/manifest.webmanifest`.
- **`src/app/not-found.tsx`** — Custom 404 with canonical metadata (`noIndex`).

### Image accessibility (no visual change)
- **`src/app/page.tsx`** — Split-panel slideshow/single images use descriptive `alt` text (`Destinations — Portugal`, etc.).
- **`src/components/sections/BackgroundSlideshow.tsx`** — Optional `subject` prop for primary slide alt text; decorative slides remain `aria-hidden`.
- **`src/components/sections/HeroSection.tsx`** — `CtaBanner` and `SplitCta` images get descriptive alts; `HeroSection` accepts optional `imageAlt`.
- **`src/components/layout/Footer.tsx`** — Social icons use `aria-hidden` (links retain `aria-label`).
- **`src/components/sections/IgniteContactSection.tsx`** — Same social icon accessibility pattern.

### Performance (no visual change)
- **`src/components/sections/HeroVideoBackground.tsx`** — Video `preload` changed from `auto` to `metadata` to improve initial load.

### Social links (correct URLs, same visual)
- **`src/lib/seo/site.ts`** — Added `SITE_SOCIAL` with verified live-site URLs.
- **`Footer.tsx`** & **`IgniteContactSection.tsx`** — Replaced placeholder `facebook.com` / `linkedin.com` links with real ZION profiles. Footer Spotify icon is now a proper link.

---

## AEO changes

### FAQ content (brand-aligned copy)
New text lives in **`src/lib/seo/faqs.ts`** only. Wording follows existing site language:
- “Destination Alchemist Lab”
- American English (“programs”, “personalized”)
- Factual contact details matching footer / Ignite Us

**Questions added:**
1. What is ZION Creative Artisans?
2. Where is ZION Creative Artisans based?
3. What services does ZION Creative Artisans offer?
4. How can I contact ZION Creative Artisans?
5. Which regions of Portugal does ZION cover?

### Where FAQs appear
| Page | Visible? | Notes |
|------|----------|-------|
| **Home** (`page.tsx`) | Screen-reader only (`sr-only`) | JSON-LD + hidden FAQ — **no layout change** |
| **Ignite Us** (`ignite-us/page.tsx`) | **Yes** | New section titled **“Good to know”** between contact form and map, `#FAF8F6`-style section on white background, matching contact typography |

### AI discovery
- **`public/llms.txt`** — Machine-readable entity summary for LLM/AI crawlers.

---

## GEO changes

### Organization entity (`src/lib/seo/schemas.ts` + `site.ts`)
- **`sameAs`** — Facebook, Instagram, LinkedIn, Spotify URLs
- **`geo`** — Lisbon HQ coordinates (`38.733766, -9.1432536`)
- **`contactPoint`** — Email, phone, hours, languages

### New schema builders
- **`contactPageSchema()`** — Used on `/ignite-us`
- **`itemListSchema()`** — Used on listing pages

### Page-level JSON-LD added/updated

| Page | Structured data |
|------|-----------------|
| `/` | `FAQPage` |
| `/ignite-us` | `ContactPage` + `FAQPage` |
| `/destination` | `BreadcrumbList` + `ItemList` |
| `/experiences` | `BreadcrumbList` + `ItemList` |
| `/legacy` | `BreadcrumbList` + `ItemList` |
| `/the-artisans` | `BreadcrumbList` + `ItemList` |
| `/sustainability` | `BreadcrumbList` |
| `/destination/[slug]` | *(unchanged this pass)* `BreadcrumbList` + `TouristDestination` |
| `/experiences/[slug]` | *(unchanged)* `BreadcrumbList` + `TouristTrip` |
| `/legacy/[slug]` | *(unchanged)* `BreadcrumbList` + `Service` |
| `/the-artisans/[slug]` | *(unchanged)* `BreadcrumbList` + `Person` |

---

## Audit tooling

- **`scripts/seo-aeo-geo-audit.mjs`** — Extended checks for llms.txt, manifest, not-found, OG images, FAQs, contact schema, sameAs, geo, listing ItemList, keywords; outputs **0–100 scores** per category.
- **`package.json`** — `npm run audit:seo` (unchanged script name).

---

## What was NOT changed

- No changes to hero videos, section order, Figma layouts, or typography scale
- No rewrites of existing marketing body copy on artisans, experiences, legacy, or destination pages
- No new navigation items or CTAs (except the Ignite Us FAQ block)
- `/the-artisans` visible layout unchanged — H1 remains screen-reader-only to preserve “The Art of Zion” section heading design
- No git commit (unless requested separately)

---

## How to verify

```bash
npm run build
npm run audit:seo
```

Optional production check: set `NEXT_PUBLIC_SITE_URL=https://zion-creativeartisans.com` so canonicals and JSON-LD `@id` values match the live domain.

---

## User-visible change summary

The **only visible addition** is the **“Good to know”** FAQ section on **Ignite Us**, styled to match the contact page. Everything else is metadata, structured data, accessibility attributes, or screen-reader-only content.
