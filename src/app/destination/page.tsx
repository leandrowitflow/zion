import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { DestinationsCarousel } from "@/components/sections/DestinationsCarousel";
import { CtaBanner, VideoBanner } from "@/components/sections/HeroSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { WhyPortugalSection } from "@/components/sections/WhyPortugalSection";
import { destinationAssets } from "@/lib/assets/destination";

export default function DestinationPage() {
  return (
    <PageShell>
      {/* Hero — Figma 2337:133, 1080px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1080px)]">
        <Image
          src={destinationAssets.heroVideo}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center min-[1400px]:block">
          <h1 className="font-serif text-4xl font-light leading-tight text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[32.4%] min-[1400px]:-translate-x-1/2 min-[1400px]:whitespace-nowrap min-[1400px]:text-[61.5px] min-[1400px]:leading-[56.033px]">
            Portugal
          </h1>
        </div>
      </section>

      {/* Why Portugal? — Figma 2337:148 */}
      <SiteSection>
        <SiteContainer>
          <WhyPortugalSection />
        </SiteContainer>
      </SiteSection>

      {/* Video band — Figma 2337:149, 1080px at 1920 */}
      <VideoBanner
        image={destinationAssets.video}
        className="min-h-[480px] h-[clamp(480px,56.25vw,1080px)]"
      />

      {/* Tailored Destinations — Figma 2337:194 */}
      <SiteSection>
        <SiteContainer>
          <DestinationsCarousel />
        </SiteContainer>
      </SiteSection>

      {/* Ignite Us — Figma 2337:163 */}
      <CtaBanner image={destinationAssets.cta} title="Ignite Us" buttonLabel="Contact Us" />

      <PartnersCarousel />
    </PageShell>
  );
}
