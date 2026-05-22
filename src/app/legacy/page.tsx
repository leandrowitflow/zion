import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CtaBanner, HeroSection, VideoBanner } from "@/components/sections/HeroSection";
import { CardGrid, PartnersSection } from "@/components/sections/PartnersSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sharedAssets } from "@/lib/assets/shared";

const assets = {
  hero: "https://www.figma.com/api/mcp/asset/53b33f1b-e20f-4aa2-94ec-a2304766f6ba",
  video: "https://www.figma.com/api/mcp/asset/53b33f1b-e20f-4aa2-94ec-a2304766f6ba",
  essence: "https://www.figma.com/api/mcp/asset/fe34cd3b-c0a9-4c11-a53c-bd9cf98e1456",
  circle: "https://www.figma.com/api/mcp/asset/47872f73-1dde-4bf6-8272-0d8728bdf405",
  sanctum: "https://www.figma.com/api/mcp/asset/66c5496a-4e35-4acd-ac6c-93f74a31d5ec",
  affair: "https://www.figma.com/api/mcp/asset/5f4af423-f3d6-47c3-b869-b48e0987dbed",
};

export default function LegacyPage() {
  return (
    <PageShell>
      <HeroSection image={assets.hero} title="Curated for Distinction" />

      <SiteSection>
        <SiteContainer>
          <div className="grid gap-12 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div className="relative aspect-[542/813] overflow-hidden">
              <Image src={assets.essence} alt="Legacy experience" fill className="object-cover" />
            </div>
            <div>
              <SectionHeading before="The essence of " accent="Legacy" align="left" className="mb-8" />
              <div className="space-y-6 text-base leading-7 text-muted">
                <p>
                  At <strong className="text-foreground">ZION Creative Artisans</strong>, we craft
                  events and incentives that are more than just gatherings — they&apos;re
                  transformative experiences.
                </p>
                <p>
                  From corporate incentives that blend leisure and business to black-tie galas in
                  historic settings, we meticulously curate each detail to ensure a holistic and
                  meaningful experience.
                </p>
                <p>
                  <strong className="text-foreground">Legacy</strong> is where sophistication meets
                  purpose, where indulgence harmonizes with intention, and where each meticulously
                  curated detail tells a story of exclusivity and meaning.
                </p>
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <VideoBanner image={assets.video} />

      <SiteSection>
        <SiteContainer>
          <SectionHeading before="Crafting your " accent="Legacy" className="mb-12" />
          <CardGrid
            items={[
              { image: assets.circle, title: "The Circle of Influence" },
              { image: assets.sanctum, title: "The Executive Sanctum" },
              { image: assets.affair, title: "The Grand Affair" },
            ]}
          />
        </SiteContainer>
      </SiteSection>

      <CtaBanner
        image={sharedAssets.ctaImage}
        title="Create your Legacy"
        buttonLabel="Contact Us"
      />

      <PartnersSection />
    </PageShell>
  );
}
