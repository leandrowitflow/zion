import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { LegacyEssenceSection } from "@/components/sections/LegacyEssenceSection";
import { CtaBanner, VideoBanner } from "@/components/sections/HeroSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { legacyAssets, legacyCards } from "@/lib/assets/legacy";

export default function LegacyPage() {
  return (
    <PageShell>
      {/* Hero — Figma 2337:285, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <Image
          src={legacyAssets.heroVideo}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 px-6 text-center">
          <h1 className="absolute left-1/2 top-[32.2%] -translate-x-1/2 whitespace-nowrap font-serif text-4xl font-light leading-tight text-white md:text-[61.5px] md:leading-[56.033px]">
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
      <VideoBanner
        image={legacyAssets.video}
        className="min-h-[480px] h-[clamp(480px,56.15vw,1078px)]"
      />

      {/* Crafting your Legacy — Figma 2339:296 */}
      <SiteSection>
        <SiteContainer>
          <h2 className="mb-10 text-center font-serif text-4xl font-light leading-tight text-[#2b2e2b] min-[1400px]:mb-[111px] md:text-[61.5px] md:leading-[56.033px]">
            Crafting your <span className="text-[#ba7d7d]">Legacy</span>
          </h2>
          <div className="grid grid-cols-3 gap-x-[19px] gap-y-8">
            {legacyCards.map((item) => (
              <article key={item.title} className="min-w-0">
                <div className="relative aspect-[417/500] w-full overflow-hidden min-[1400px]:h-[500px] min-[1400px]:w-[417px] min-[1400px]:max-w-none">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1399px) 33vw, 417px"
                  />
                </div>
                <p className="mt-3 text-center font-serif text-[clamp(11px,2.4vw,24.425px)] leading-none text-[#292725] min-[1400px]:text-[24.425px]">
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
