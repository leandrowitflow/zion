import type { MetadataRoute } from "next";
import { getDestinationSlugs } from "@/lib/destinations";
import { getExperienceSlugs } from "@/lib/experiences";
import { getJournalPostSlugs } from "@/lib/blog";
import { getLegacySlugs } from "@/lib/legacy";
import { staticRoutes } from "@/lib/seo/pages";
import { SITE_URL } from "@/lib/seo/site";
import { getTeamMemberSlugs } from "@/lib/team";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const journalSlugs = await getJournalPostSlugs();

  const dynamicEntries = (
    [
      ...getDestinationSlugs().map((slug) => `/destination/${slug}`),
      ...getExperienceSlugs().map((slug) => `/experiences/${slug}`),
      ...getLegacySlugs().map((slug) => `/legacy/${slug}`),
      ...getTeamMemberSlugs().map((slug) => `/the-artisans/${slug}`),
      ...journalSlugs.map((slug) => `/journal/${slug}`),
    ] as const
  ).map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path.startsWith("/journal/") ? 0.75 : 0.7,
  }));

  return [...staticEntries, ...dynamicEntries];
}
