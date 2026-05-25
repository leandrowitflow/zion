import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { LegacyEssenceSection } from "@/components/sections/LegacyEssenceSection";
import { CtaBanner } from "@/components/sections/HeroSection";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { legacyAssets, legacyCards } from "@/lib/assets/legacy";

export default function LegacyPage() {
  return (
    <PageShell>
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
          <div className="mt-[clamp(1.5rem,5.8vw,55px)] grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-x-[19px] lg:gap-y-8">
            {legacyCards.map((item) => (
              <article key={item.title} className="min-w-0">
                <div className="relative aspect-[417/500] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 33vw, 417px"
                  />
                </div>
                <p className="font-card-title mt-3 text-center text-[clamp(11px,2.4vw,24.425px)] text-[#292725] lg:text-[24.425px]">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </SiteContainer>
      </SiteSection>

      {/* Create your Legacy — Figma 2339:368 */}
      <CtaBanner image={legacyAssets.cta} title="Create your Legacy" buttonLabel="Contact Us" />

      <PartnersCarousel />
    </PageShell>
  );
}
