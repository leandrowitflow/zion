import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { OurCommitmentSection } from "@/components/sections/OurCommitmentSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { SustainablePartnersSection } from "@/components/sections/SustainablePartnersSection";
import { SustainableTravelSection } from "@/components/sections/SustainableTravelSection";
import { VideoBanner } from "@/components/sections/HeroSection";
import { sustainabilityAssets } from "@/lib/assets/sustainability";

export default function SustainabilityPage() {
  return (
    <PageShell>
      {/* Hero — Figma 2339:462, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <Image
          src={sustainabilityAssets.heroVideo}
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 px-6 text-center">
          <h1 className="absolute left-1/2 top-[28.7%] -translate-x-1/2 whitespace-nowrap font-serif text-4xl font-light leading-tight text-white md:text-[61.5px] md:leading-[56.033px]">
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
      <VideoBanner
        image={sustainabilityAssets.video}
        className="min-h-[480px] h-[clamp(480px,56.15vw,1078px)]"
      />

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
