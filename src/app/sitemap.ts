import type { MetadataRoute } from "next";
import { getDestinationSlugs } from "@/lib/destinations";
import { getExperienceSlugs } from "@/lib/experiences";
import { getLegacySlugs } from "@/lib/legacy";
import { staticRoutes } from "@/lib/seo/pages";
import { SITE_URL } from "@/lib/seo/site";
import { getTeamMemberSlugs } from "@/lib/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const dynamicEntries = (
    [
      ...getDestinationSlugs().map((slug) => `/destination/${slug}`),
      ...getExperienceSlugs().map((slug) => `/experiences/${slug}`),
      ...getLegacySlugs().map((slug) => `/legacy/${slug}`),
      ...getTeamMemberSlugs().map((slug) => `/the-artisans/${slug}`),
    ] as const
  ).map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...dynamicEntries];
}
