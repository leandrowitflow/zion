import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CraftedExtraordinarySection } from "@/components/sections/CraftedExtraordinarySection";
import { ExperiencesCarousel } from "@/components/sections/ExperiencesCarousel";
import { CtaBanner, VideoBanner } from "@/components/sections/HeroSection";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { experiencesAssets } from "@/lib/assets/experiences";

export default function ExperiencesPage() {
  return (
    <PageShell>
      {/* Hero — Figma 2335:88, 1070px at 1920 */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,55.73vw,1070px)]">
        <Image
          src={experiencesAssets.heroVideo}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center min-[1400px]:block">
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
      <VideoBanner
        image={experiencesAssets.video}
        className="min-h-[480px] h-[clamp(480px,56.25vw,1080px)]"
      />

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
    </PageShell>
  );
}
