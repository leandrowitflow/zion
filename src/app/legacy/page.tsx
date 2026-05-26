import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { LegacyEssenceSection } from "@/components/sections/LegacyEssenceSection";
import { LegacyCardsGrid } from "@/components/sections/LegacyCardsGrid";
import { CtaBanner } from "@/components/sections/HeroSection";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection } from "@/components/seo/FaqSection";
import { ListingStructuredData } from "@/components/seo/ListingStructuredData";
import { legacyAssets } from "@/lib/assets/legacy";
import { legacyItems } from "@/lib/legacy";
import { legacyFaqs } from "@/lib/seo/faqs";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.legacy;

export default function LegacyPage() {
  return (
    <PageShell>
      <ListingStructuredData
        pageTitle="Legacy"
        path="/legacy"
        items={legacyItems.map((item) => ({
          name: item.title,
          path: `/legacy/${item.slug}`,
        }))}
        faqs={legacyFaqs}
      />
      {/* Hero — Figma 2337:285, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <HeroVideoBackground
          src={legacyAssets.heroVideoSrc}
          poster={legacyAssets.heroVideo}
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center min-[1400px]:block">
          <h1 className="heading-section text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[32.2%] min-[1400px]:w-max min-[1400px]:max-w-[min(100%,720px)] min-[1400px]:-translate-x-1/2 min-[1400px]:px-4 min-[1400px]:whitespace-nowrap">
            Curated for Distinction
          </h1>
        </div>
      </section>

      {/* The essence of Legacy — Figma 2339:286 */}
      <SiteSection>
        <SiteContainer>
          <LegacyEssenceSection />
        </SiteContainer>
      </SiteSection>

      {/* Video band — Figma 2339:294, 1078px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.15vw,1078px)]">
        <HeroVideoBackground
          src={legacyAssets.videoSrc}
          poster={legacyAssets.video}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </section>

      {/* Crafting your Legacy — Figma 2339:296 */}
      <SiteSection>
        <SiteContainer>
          <SectionHeading before="Crafting your " accent="Legacy" />
          <LegacyCardsGrid items={[...legacyItems]} />
        </SiteContainer>
      </SiteSection>

      {/* Create your Legacy — Figma 2339:368 */}
      <CtaBanner image={legacyAssets.cta} title="Create your Legacy" buttonLabel="Contact Us" />

      <PartnersCarousel />

      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <FaqSection faqs={legacyFaqs} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
