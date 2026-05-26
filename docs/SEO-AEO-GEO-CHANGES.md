# SEO / AEO / GEO Optimization Changelog

Comprehensive search, answer-engine, and generative-engine optimization for ZION Creative Artisans. Visual design and brand voice are preserved; new user-facing copy is limited to factual FAQ blocks styled to match existing contact typography.

**Audit:** `npm run build && npm run audit:seo` → SEO via **Google Lighthouse**, AEO/GEO via live + code checks

---

## New files

| File | Purpose |
|------|---------|
| `public/llms.txt` | AI crawler guidance — entity facts, services, pages, social profiles |
| `public/og/*` | Dedicated 1200×630 Open Graph share images per main section |
| `src/lib/seo/og.ts` | OG image paths, dimensions (1200×630), logo path |
| `src/lib/seo/faqs.ts` | Central FAQ registry (8 site-wide + page-specific sets) |
| `src/components/seo/FaqSection.tsx` | Reusable “Good to know” FAQ block |
| `src/components/seo/ListingStructuredData.tsx` | Breadcrumb + ItemList + optional FAQ JSON-LD |
| `src/components/ui/TypekitStylesheet.tsx` | Non-blocking Adobe Typekit load |
| `src/app/manifest.ts` | Web app manifest |
| `src/app/not-found.tsx` | Branded 404 with `noIndex` metadata |
| `scripts/audit-seo-aeo-geo.mjs` | Google Lighthouse + live HTTP + code checks (single audit) |
| `docs/SEO-AEO-GEO-CHANGES.md` | This changelog |

---

## SEO changes

### Metadata & Open Graph
- **`src/lib/seo/pages.ts`** — Each static route uses a **dedicated `/og/` image** (1200×630) instead of hero posters or logo-only defaults. All meta descriptions trimmed to **120–160 characters**.
- **`src/lib/seo/metadata.ts`** — Open Graph images declare **`width: 1200`** and **`height: 630`**; canonical URLs, keywords, Twitter cards unchanged.
- **`src/lib/seo/og.ts`** — Single source for OG asset paths and dimensions.

### Crawling & discovery
- **`src/app/sitemap.ts`** — Dynamic slug routes for destinations, experiences, legacy, artisans.
- **`src/app/robots.ts`** — Explicit **allow** rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) plus sitemap/host.
- **`src/app/layout.tsx`** — `metadataBase`, `lang="en"`, `rel="author"` → `/llms.txt`.

### Performance (no visual change)
- **`src/components/sections/HeroVideoBackground.tsx`** — Videos **lazy-load** via `IntersectionObserver`; `preload="none"` until near viewport; poster always shown first.
- **`src/components/ui/TypekitStylesheet.tsx`** — Typekit CSS loaded with `media="print"` + `onLoad` swap (non render-blocking).

### Image accessibility
- Decorative images with `alt=""` now include **`aria-hidden`** on the same attribute line (Footer Spotify icon, team hover photo).
- Slideshow, CTA, and social icons retain descriptive alts or `aria-hidden` + link labels.

---

## AEO changes

### FAQ registry (`src/lib/seo/faqs.ts`)
**8 site-wide questions** plus page-specific sets for experiences, destination, legacy, and sustainability. Wording follows existing brand language (“Destination Alchemist Lab”, American English, factual contact details).

### Visible FAQ sections

| Page | Visible FAQ | JSON-LD |
|------|-------------|---------|
| **Home** | Yes — `#FAF8F6` section before footer | `FAQPage` |
| **Ignite Us** | Yes — “Good to know” (existing) | `ContactPage` + `FAQPage` |
| **Experiences** | Yes | `FAQPage` via `ListingStructuredData` |
| **Destination** | Yes | `FAQPage` via `ListingStructuredData` |
| **Legacy** | Yes | `FAQPage` via `ListingStructuredData` |
| **Sustainability** | Yes | `FAQPage` via `ListingStructuredData` |

### Headings
- **`/the-artisans`** — Visible **H1** on “Our Artisans” (`SectionHeading` with `headingLevel="h1"`); removed sr-only H1.
- **`SectionHeading.tsx`** — Optional `headingLevel` prop (`h1` | `h2`, default `h2`).

### AI discovery
- **`public/llms.txt`** — Machine-readable entity summary.
- **`src/app/robots.ts`** — AI crawler allow rules.

---

## GEO changes

### Organization entity (`src/lib/seo/schemas.ts`)
- **`logo`** — `/Logos/ZION/Logo-01.png`
- **`image`** — `/og/home.jpg`
- **`openingHoursSpecification`** — Schema.org object (Mon–Fri 10:00–19:00) on organization and contactPoint
- **`sameAs`**, **`geo`**, **`@id`** — unchanged from prior pass

### Listing & page JSON-LD

| Page | Structured data |
|------|-----------------|
| `/` | `FAQPage` |
| `/ignite-us` | `ContactPage` + `FAQPage` |
| `/destination` | `BreadcrumbList` + `ItemList` + `FAQPage` |
| `/experiences` | `BreadcrumbList` + `ItemList` + `FAQPage` |
| `/legacy` | `BreadcrumbList` + `ItemList` + `FAQPage` |
| `/the-artisans` | `BreadcrumbList` + `ItemList` |
| `/sustainability` | `BreadcrumbList` + `ItemList` + `FAQPage` |
| Slug pages | Breadcrumbs + type-specific schema (TouristDestination, TouristTrip, Service, Person) |

### Root graph
- **`RootStructuredData`** in layout — global `TravelAgency` + `WebSite` JSON-LD.

---

## UI changes (related, same release)

These were completed alongside SEO work and are documented here for a single reference:

| Area | Change |
|------|--------|
| **Artisan subpages** | Profile hero uses **hover image** from main grid (`src/lib/team.ts`, `[slug]/page.tsx`) |
| **Team card hover** | Overlay fade **0.55s**; base photo stays opaque (`TeamMemberPhoto.tsx`, `globals.css`) |
| **Subpage cards** | `mt-5` image→title spacing; ivypresto title/read-more styles; reserved “Read more” space (`SubpageCardLink.tsx`, `globals.css`) |
| **Experiences carousel** | Extra bottom padding on carousel section |

---

## Audit tooling

Uses **Google Lighthouse** (real Chrome headless audit) for the **SEO score**, plus **live HTTP checks** against the production server and **source-code review** for AEO and GEO.

```bash
npm run build
npm run audit:seo
```

The script starts `next start` automatically if nothing is listening on port 3000. Set `AUDIT_SKIP_LIGHTHOUSE=1` to skip Lighthouse (infra-only SEO score). Set `AUDIT_PORT` or `AUDIT_BASE_URL` to target a different server.

---

## How to verify

```bash
npm run build
npm run audit:seo
```

Set `NEXT_PUBLIC_SITE_URL=https://zion-creativeartisans.com` in production so canonicals and JSON-LD `@id` values match the live domain.

---

## User-visible additions

1. **“Good to know” FAQ sections** on Home, Experiences, Destination, Legacy, Sustainability (and Ignite Us) — `#FAF8F6` background, contact-page typography.
2. **Visible H1** “Our Artisans” on `/the-artisans`.

Everything else is metadata, structured data, performance, or accessibility — no changes to hero layouts, section order, or marketing body copy on slug pages.
