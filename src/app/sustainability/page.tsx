import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { OurCommitmentSection } from "@/components/sections/OurCommitmentSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { SustainablePartnersSection } from "@/components/sections/SustainablePartnersSection";
import { SustainableTravelSection } from "@/components/sections/SustainableTravelSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { ListingStructuredData } from "@/components/seo/ListingStructuredData";
import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { sustainabilityFaqs } from "@/lib/seo/faqs";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.sustainability;

const sustainabilitySections = [
  { name: "Our Commitment", path: "/sustainability" },
  { name: "Sustainable Travel", path: "/sustainability" },
  { name: "Sustainable Partners", path: "/sustainability" },
];

export default function SustainabilityPage() {
  return (
    <PageShell>
      <ListingStructuredData
        pageTitle="Sustainability"
        path="/sustainability"
        items={sustainabilitySections}
        faqs={sustainabilityFaqs}
      />
      {/* Hero — Figma 2339:462, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <HeroVideoBackground
          src={sustainabilityAssets.heroVideoSrc}
          poster={sustainabilityAssets.heroVideo}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 hidden min-[1400px]:block">
          <h1 className="heading-section absolute left-1/2 top-[28.7%] -translate-x-1/2 whitespace-nowrap text-white">
            Sustainability
          </h1>
        </div>
      </section>

      {/* Our Commitment + Sustainable Travel — Figma 2341:9 / 2341:10 */}
      <SiteSection className="overflow-x-clip">
        <SiteContainer className="flex flex-col gap-[clamp(3rem,6.2vw,118px)]">
          <OurCommitmentSection />
          <SustainableTravelSection />
        </SiteContainer>
      </SiteSection>

      {/* Video band — mobile: after picnic (2552:34); desktop: Figma 2341:11 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.15vw,1078px)] lg:hidden">
        <HeroVideoBackground
          src={sustainabilityAssets.videoSrc}
          poster={sustainabilityAssets.video}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </section>

      <section className="site-full-bleed relative hidden w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.15vw,1078px)] lg:block">
        <HeroVideoBackground
          src={sustainabilityAssets.videoSrc}
          poster={sustainabilityAssets.video}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </section>

      {/* Sustainable Partners — Figma 2341:19 */}
      <SiteSection className="site-section-flush-bottom">
        <SiteContainer>
          <SustainablePartnersSection />
        </SiteContainer>
      </SiteSection>

      <PartnersCarousel />

      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <FaqSection faqs={sustainabilityFaqs} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
