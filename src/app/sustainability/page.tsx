import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { OurCommitmentSection } from "@/components/sections/OurCommitmentSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { SustainablePartnersSection } from "@/components/sections/SustainablePartnersSection";
import { SustainableTravelSection } from "@/components/sections/SustainableTravelSection";
import { sustainabilityAssets } from "@/lib/assets/sustainability";

export default function SustainabilityPage() {
  return (
    <PageShell>
      {/* Hero — Figma 2339:462, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <HeroVideoBackground
          src={sustainabilityAssets.heroVideoSrc}
          poster={sustainabilityAssets.heroVideo}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center min-[1400px]:block">
          <h1 className="heading-section text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[28.7%] min-[1400px]:-translate-x-1/2 min-[1400px]:whitespace-nowrap">
            Sustainability
          </h1>
        </div>
      </section>

      {/* Our Commitment + Sustainable Travel — Figma 2341:9 / 2341:10 */}
      <SiteSection>
        <SiteContainer className="flex flex-col gap-[clamp(3rem,6.2vw,118px)]">
          <OurCommitmentSection />
          <SustainableTravelSection />
        </SiteContainer>
      </SiteSection>

      {/* Video band — Figma 2341:11, 1078px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.15vw,1078px)]">
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
    </PageShell>
  );
}
