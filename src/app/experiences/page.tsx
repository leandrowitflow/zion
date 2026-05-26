import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CraftedExtraordinarySection } from "@/components/sections/CraftedExtraordinarySection";
import { ExperiencesCarousel } from "@/components/sections/ExperiencesCarousel";
import { CtaBanner } from "@/components/sections/HeroSection";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { FaqSection } from "@/components/seo/FaqSection";
import { ListingStructuredData } from "@/components/seo/ListingStructuredData";
import { experiencesAssets } from "@/lib/assets/experiences";
import { experiences } from "@/lib/experiences";
import { experiencesFaqs } from "@/lib/seo/faqs";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.experiences;

export default function ExperiencesPage() {
  return (
    <PageShell>
      <ListingStructuredData
        pageTitle="Experiences"
        path="/experiences"
        items={experiences.map((item) => ({
          name: item.title,
          path: `/experiences/${item.slug}`,
        }))}
        faqs={experiencesFaqs}
      />
      {/* Hero — Figma 2335:88, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <HeroVideoBackground
          src={experiencesAssets.heroVideoSrc}
          poster={experiencesAssets.heroVideo}
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center min-[1400px]:block">
          <h1 className="heading-section text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[31.77%] min-[1400px]:w-max min-[1400px]:max-w-[min(100%,720px)] min-[1400px]:-translate-x-1/2 min-[1400px]:px-4 min-[1400px]:whitespace-nowrap">
            <span className="block min-[1400px]:inline">Experience </span>
            <span className="block min-[1400px]:inline">Portugal</span>
          </h1>
        </div>
      </section>

      {/* Tailored Experiences — Figma 2337:7 */}
      <SiteSection>
        <SiteContainer>
          <ExperiencesCarousel />
        </SiteContainer>
      </SiteSection>

      {/* Video band — Figma 2337:8, 1080px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1080px)]">
        <HeroVideoBackground
          src={experiencesAssets.videoSrc}
          poster={experiencesAssets.video}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </section>

      {/* Crafted for the Extraordinary — Figma 2337:44 */}
      <SiteSection>
        <SiteContainer>
          <CraftedExtraordinarySection />
        </SiteContainer>
      </SiteSection>

      {/* Curate an Experience — Figma 2337:14 */}
      <CtaBanner
        image={experiencesAssets.cta}
        title="Curate an Experience"
        buttonLabel="Ignite Us"
      />

      <PartnersCarousel />

      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <FaqSection faqs={experiencesFaqs} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
