/** Canonical site identity — used by metadata, JSON-LD, sitemap, and audits. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zion-creativeartisans.com";

export const SITE_NAME = "ZION Creative Artisans";

export const SITE_TAGLINE = "Redefining luxury through unique journeys in Portugal";

export const DEFAULT_DESCRIPTION =
  "ZION Creative Artisans is a Destination Alchemist Lab crafting bespoke luxury travel, experiences, and legacy events across Portugal — Lisbon, Porto, Algarve, Madeira, and the Azores.";

export const SITE_EMAIL = "ignite@zion-creativeartisans.com";

export const SITE_PHONE = "+351 210 188 406";

export const SITE_ADDRESS = {
  streetAddress: "Av. Defensores de Chaves, 15, 4ª D",
  addressLocality: "Lisbon",
  postalCode: "1000-109",
  addressCountry: "PT",
} as const;

export const SITE_GEO = {
  latitude: 38.733766,
  longitude: -9.1432536,
} as const;

export const SITE_BRANCHES = ["Porto", "Algarve", "Madeira", "Azores"] as const;

export const SITE_OPENING_HOURS = {
  weekdays: "Weekdays 10:00–19:00 UTC Lisbon",
  closed: "Closed on Saturdays, Sundays and Bank Holidays",
} as const;

export const SITE_SOCIAL = {
  facebook: "https://www.facebook.com/people/ZION-Creative-Artisans/61573884781076/",
  instagram: "https://www.instagram.com/zion.creativeartisans",
  linkedin: "https://www.linkedin.com/company/zion-creative-artisans/",
  spotify: "https://open.spotify.com/user/31gzi7oymgkqdctv6flf23yqxmou",
} as const;

export const DEFAULT_OG_IMAGE = "/Logos/ZION/Logo-01.png";

/** Factual entity summary for AEO / GEO citation surfaces. */
export const SITE_ENTITY_SUMMARY =
  "ZION Creative Artisans is a Portugal-based luxury destination management company (Destination Alchemist Lab) offering tailored experiences, artisan-led journeys, legacy events, and sustainable travel across mainland Portugal and the islands.";

export const SITE_KEYWORDS = [
  "luxury travel Portugal",
  "destination management Portugal",
  "bespoke experiences Portugal",
  "Portugal DMC",
  "ZION Creative Artisans",
  "Lisbon luxury tours",
  "Algarve experiences",
  "corporate incentives Portugal",
] as const;
