import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { BlogEssenceSection } from "@/components/sections/BlogEssenceSection";
import { BlogPostsGrid } from "@/components/sections/BlogPostsGrid";
import { JournalHero } from "@/components/sections/JournalHero";
import { CtaBanner } from "@/components/sections/HeroSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { FaqSection } from "@/components/seo/FaqSection";
import { JournalStructuredData } from "@/components/seo/JournalStructuredData";
import { legacyAssets } from "@/lib/assets/legacy";
import { getJournalPosts } from "@/lib/blog";
import { journalFaqs } from "@/lib/seo/faqs";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.journal;
export const revalidate = 3600;

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <PageShell>
      <JournalStructuredData faqs={journalFaqs} posts={posts} />

      <JournalHero />

      <SiteSection>
        <SiteContainer>
          <BlogEssenceSection />
        </SiteContainer>
      </SiteSection>

      <SiteSection className="site-section-compact">
        <SiteContainer>
          <section aria-labelledby="journal-articles-heading">
            <h2 id="journal-articles-heading" className="sr-only">
              Articles from The Journal of ZION
            </h2>
            <BlogPostsGrid posts={posts} />
          </section>
        </SiteContainer>
      </SiteSection>

      <CtaBanner
        image={legacyAssets.cta}
        title="Create your Legacy"
        buttonLabel="Contact Us"
        buttonHref="/ignite-us"
      />

      <PartnersCarousel />

      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <FaqSection faqs={journalFaqs} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
