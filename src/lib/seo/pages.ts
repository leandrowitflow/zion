import type { Metadata } from "next";
import { artisansAssets } from "@/lib/assets/artisans";
import { destinationAssets } from "@/lib/assets/destination";
import { experiencesAssets } from "@/lib/assets/experiences";
import { homeAssets } from "@/lib/assets/home";
import { legacyAssets } from "@/lib/assets/legacy";
import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const staticPageMetadata = {
  home: buildPageMetadata({
    title: "ZION Creative Artisans | Luxury Travel & Experiences in Portugal",
    description:
      "Discover bespoke luxury journeys across Portugal with ZION Creative Artisans — tailored destinations, immersive experiences, and artisan-led travel in Lisbon, Porto, Algarve, Madeira, and the Azores.",
    path: "/",
    image: homeAssets.heroVideo,
  }),
  artisans: buildPageMetadata({
    title: "The Artisans",
    description:
      "Meet the destination alchemists of ZION Creative Artisans — storytellers and experience curators crafting immersive, personalized luxury journeys across Portugal.",
    path: "/the-artisans",
    image: artisansAssets.heroVideo,
  }),
  experiences: buildPageMetadata({
    title: "Experiences",
    description:
      "Tailored luxury experiences in Portugal — from wild coastal adventures and timeless traditions to soulful serenity and the essence of Portuguese taste.",
    path: "/experiences",
    image: experiencesAssets.heroVideo,
  }),
  legacy: buildPageMetadata({
    title: "Legacy",
    description:
      "Curated for distinction — ZION Creative Artisans designs transformative corporate incentives, executive retreats, and grand affairs across Portugal.",
    path: "/legacy",
    image: legacyAssets.heroVideo,
  }),
  destination: buildPageMetadata({
    title: "Destination",
    description:
      "Explore Portugal with ZION Creative Artisans — Lisbon & Coast, Alentejo, Algarve, the islands, the center, and Porto & North tailored for luxury travelers.",
    path: "/destination",
    image: destinationAssets.heroVideo,
  }),
  sustainability: buildPageMetadata({
    title: "Sustainability",
    description:
      "ZION Creative Artisans is committed to sustainable travel in Portugal — responsible partnerships, local communities, and journeys that respect people and place.",
    path: "/sustainability",
    image: sustainabilityAssets.heroVideo,
  }),
  ignite: buildPageMetadata({
    title: "Ignite Us",
    description:
      "Contact ZION Creative Artisans in Lisbon to craft your bespoke luxury journey, experience, or legacy event in Portugal. Weekdays 10:00–19:00 UTC Lisbon.",
    path: "/ignite-us",
    image: destinationAssets.penaPalace,
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
