import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CtaBanner, HeroSection, VideoBanner } from "@/components/sections/HeroSection";
import { CardGrid, PartnersSection } from "@/components/sections/PartnersSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sharedAssets } from "@/lib/assets/shared";

const assets = {
  hero: "https://www.figma.com/api/mcp/asset/81cdf795-3b54-4d24-9731-60aebe6f168e",
  video: "https://www.figma.com/api/mcp/asset/81cdf795-3b54-4d24-9731-60aebe6f168e",
  monastery: "https://www.figma.com/api/mcp/asset/55ab11ac-646a-4021-a248-f571189be59f",
  pena: "https://www.figma.com/api/mcp/asset/2a684c43-bba6-4f97-aec3-05ad872ebdd7",
  algarve: "https://www.figma.com/api/mcp/asset/cbea50cb-ee33-400f-8b60-336c737c9f67",
  center: "https://www.figma.com/api/mcp/asset/79564b84-dfc5-40f1-b697-bf864bfa54b2",
  north: "https://www.figma.com/api/mcp/asset/4a6476fd-6e47-4d52-af9e-8c4caaa3d627",
};

export default function DestinationPage() {
  return (
    <PageShell>
      <HeroSection image={assets.hero} title="Portugal" />

      <SiteSection>
        <SiteContainer>
          <SectionHeading before="Why " accent="Portugal?" className="mb-12" />
          <div className="grid gap-8 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div className="relative aspect-[542/813] overflow-hidden">
              <Image src={assets.monastery} alt="Jerónimos Monastery" fill className="object-cover" />
            </div>
            <div>
              <div className="relative mb-8 aspect-[531/708] overflow-hidden">
                <Image src={assets.pena} alt="Pena Palace" fill className="object-cover" />
              </div>
              <p className="text-base leading-7 text-muted">
                A country of captivating contrasts, Portugal is where history meets modern
                sophistication, where ancient traditions blend seamlessly with contemporary luxury. At{" "}
                <strong className="text-foreground">ZION Creative Artisans</strong>, we unveil
                Portugal through a curated lens, offering bespoke experiences that immerse you in its
                culture, heritage, and refined beauty.
              </p>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <VideoBanner image={assets.video} />

      <SiteSection>
        <SiteContainer>
          <SectionHeading before="Tailored " accent="Destinations" className="mb-12" />
          <CardGrid
            items={[
              { image: assets.algarve, title: "Algarve" },
              { image: assets.center, title: "Center of Portugal" },
              { image: assets.north, title: "Porto & North" },
            ]}
          />
        </SiteContainer>
      </SiteSection>

      <CtaBanner image={sharedAssets.ctaImage} title="Ignite Us" buttonLabel="Contact Us" />

      <PartnersSection />
    </PageShell>
  );
}
