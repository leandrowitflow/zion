import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { JournalArticleView } from "@/components/journal/JournalArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostPath, getJournalArticle, getJournalPostSlugs } from "@/lib/blog";
import { buildSlugMetadata } from "@/lib/seo/metadata";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo/schemas";

type JournalArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getJournalPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getJournalArticle(slug);

  if (!article) {
    return { title: "Journal — ZION Creative Artisans" };
  }

  return buildSlugMetadata(
    article.seoTitle ?? article.title,
    article.seoDescription ?? article.description ?? article.title,
    blogPostPath(slug),
    article.image,
  );
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article = await getJournalArticle(slug);

  if (!article) {
    notFound();
  }

  const path = blogPostPath(slug);
  const cmsStructuredData =
    article.structuredData &&
    typeof article.structuredData === "object" &&
    article.structuredData !== null
      ? (article.structuredData as Record<string, unknown>)
      : null;

  const structuredData = cmsStructuredData
    ? [cmsStructuredData]
    : [
        blogPostingSchema({
          title: article.title,
          description: article.seoDescription ?? article.description ?? article.title,
          path,
          image: article.image,
          datePublished: article.datePublished,
        }),
      ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The Journal of ZION", path: "/journal" },
            { name: article.title, path },
          ]),
          ...structuredData,
        ]}
      />

      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <JournalArticleView article={article} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
