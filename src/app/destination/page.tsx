import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { DestinationsCarousel } from "@/components/sections/DestinationsCarousel";
import { CtaBanner } from "@/components/sections/HeroSection";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { WhyPortugalSection } from "@/components/sections/WhyPortugalSection";
import { ListingStructuredData } from "@/components/seo/ListingStructuredData";
import { destinationAssets } from "@/lib/assets/destination";
import { destinations } from "@/lib/destinations";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.destination;

export default function DestinationPage() {
  return (
    <PageShell>
      <ListingStructuredData
        pageTitle="Destination"
        path="/destination"
        items={destinations.map((item) => ({
          name: item.title,
          path: `/destination/${item.slug}`,
        }))}
      />
      {/* Hero — Figma 2337:133, 1080px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1080px)]">
        <HeroVideoBackground
          src={destinationAssets.heroVideoSrc}
          poster={destinationAssets.heroVideo}
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center min-[1400px]:block">
          <h1 className="heading-section text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[32.4%] min-[1400px]:-translate-x-1/2 min-[1400px]:whitespace-nowrap">
            Portugal
          </h1>
        </div>
      </section>

      {/* Why Portugal? — Figma 2337:148 (desktop artboard breaks out of container) */}
      <SiteSection className="overflow-x-clip">
        <SiteContainer>
          <WhyPortugalSection />
        </SiteContainer>
      </SiteSection>

      {/* Video band — Figma 2337:149, 1080px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1080px)]">
        <HeroVideoBackground
          src={destinationAssets.videoSrc}
          poster={destinationAssets.video}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </section>

      {/* Tailored Destinations — Figma 2337:194 */}
      <SiteSection>
        <SiteContainer>
          <DestinationsCarousel />
        </SiteContainer>
      </SiteSection>

      {/* Craft a Destination — Figma 2339:368 */}
      <CtaBanner image={destinationAssets.cta} title="Craft a Destination" buttonLabel="Contact Us" />

      <PartnersCarousel />
    </PageShell>
  );
}
