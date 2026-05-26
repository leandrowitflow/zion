import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ogImages } from "@/lib/seo/og";

/** Static route metadata registry — single source for pages and SEO audits. */
export const staticPageMetadata = {
  home: buildPageMetadata({
    title: "ZION Creative Artisans | Luxury Travel & Experiences in Portugal",
    description:
      "Bespoke luxury journeys across Portugal with ZION Creative Artisans — tailored destinations, experiences, and artisan travel in Lisbon, Porto, and the Algarve.",
    path: "/",
    image: ogImages.home,
  }),
  artisans: buildPageMetadata({
    title: "The Artisans",
    description:
      "Meet the destination alchemists of ZION Creative Artisans — experience curators crafting immersive, personalized luxury journeys across Portugal.",
    path: "/the-artisans",
    image: ogImages.artisans,
  }),
  experiences: buildPageMetadata({
    title: "Experiences",
    description:
      "Tailored luxury experiences in Portugal — from wild coastal adventures and timeless traditions to soulful serenity and the essence of Portuguese taste.",
    path: "/experiences",
    image: ogImages.experiences,
  }),
  legacy: buildPageMetadata({
    title: "Legacy",
    description:
      "Curated for distinction — ZION Creative Artisans designs transformative corporate incentives, executive retreats, and grand affairs across Portugal.",
    path: "/legacy",
    image: ogImages.legacy,
  }),
  destination: buildPageMetadata({
    title: "Destination",
    description:
      "Explore Portugal with ZION Creative Artisans — Lisbon & Coast, Alentejo, Algarve, the islands, the center, and Porto & North for luxury travelers.",
    path: "/destination",
    image: ogImages.destination,
  }),
  sustainability: buildPageMetadata({
    title: "Sustainability",
    description:
      "ZION Creative Artisans is committed to sustainable travel in Portugal — responsible partnerships, local communities, and journeys that respect people and place.",
    path: "/sustainability",
    image: ogImages.sustainability,
  }),
  ignite: buildPageMetadata({
    title: "Ignite Us",
    description:
      "Contact ZION Creative Artisans in Lisbon to craft your bespoke luxury journey, experience, or legacy event in Portugal. Weekdays 10:00–19:00 UTC Lisbon.",
    path: "/ignite-us",
    image: ogImages.ignite,
  }),
} satisfies Record<string, Metadata>;

export const staticRoutes = Object.entries(staticPageMetadata).map(([key, meta]) => ({
  key,
  path:
    key === "home"
      ? "/"
      : key === "ignite"
        ? "/ignite-us"
        : key === "artisans"
          ? "/the-artisans"
          : `/${key}`,
  title: typeof meta.title === "string" ? meta.title : String(meta.title),
  description: meta.description ?? "",
}));
