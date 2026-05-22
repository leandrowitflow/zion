import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CtaBanner, HeroSection, VideoBanner } from "@/components/sections/HeroSection";
import { CardGrid, PartnersSection } from "@/components/sections/PartnersSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sharedAssets } from "@/lib/assets/shared";

const assets = {
  hero: "https://www.figma.com/api/mcp/asset/34662c40-0e8c-4786-8354-3d1754ba30dd",
  video: "https://www.figma.com/api/mcp/asset/34662c40-0e8c-4786-8354-3d1754ba30dd",
  wild: "https://www.figma.com/api/mcp/asset/f8e84f84-6bd2-4097-abb1-963f8347aac4",
  traditions: "https://www.figma.com/api/mcp/asset/c0422184-23ac-4b52-b78d-423f2658ceaa",
  serenity: "https://www.figma.com/api/mcp/asset/f7c2bb2c-c4e5-469d-ae09-0c9fd1bea934",
  taste: "https://www.figma.com/api/mcp/asset/9654acf6-5e42-458f-b014-132fd44ed15e",
  extraordinary: "https://www.figma.com/api/mcp/asset/a7778f28-6005-4f60-9f10-2690e96cedd3",
  gallery: "https://www.figma.com/api/mcp/asset/c590b24d-144c-48b6-bd7c-0daedd1efebf",
};

export default function ExperiencesPage() {
  return (
    <PageShell>
      <HeroSection image={assets.hero} title="Experience Portugal" />

      <SiteSection>
        <SiteContainer>
          <SectionHeading before="Tailored " accent="Experiences" className="mb-12" />
          <CardGrid
            columns={4}
            items={[
              { image: assets.wild, title: "Wild & Free" },
              { image: assets.traditions, title: "Timeless Traditions" },
              { image: assets.serenity, title: "Soul & Serenity" },
              { image: assets.taste, title: "The Essence of Taste" },
            ]}
          />
        </SiteContainer>
      </SiteSection>

      <VideoBanner image={assets.video} />

      <SiteSection>
        <SiteContainer>
          <div className="grid gap-12 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div>
              <SectionHeading
                before="Crafted for the "
                accent="Extraordinary"
                align="left"
                className="mb-8"
              />
            </div>
            <div className="relative min-h-[500px]">
              <div className="absolute right-0 top-0 h-[630px] w-[85%] overflow-hidden">
                <Image
                  src={assets.extraordinary}
                  alt="Luxury experience"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[568px] w-[65%] overflow-hidden shadow-xl">
                <Image src={assets.gallery} alt="Art gallery" fill className="object-cover" />
              </div>
            </div>
          </div>
          <p className="mt-12 max-w-2xl text-base leading-7 text-muted lg:ml-auto">
            At <strong className="text-foreground">ZION Creative Artisans</strong>, we don&apos;t
            offer ordinary travel experiences — we create immersive, bespoke journeys that awaken the
            senses, inspire the soul, and redefine luxury.
          </p>
        </SiteContainer>
      </SiteSection>

      <CtaBanner
        image={sharedAssets.ctaImage}
        title="Curate an Experience"
        buttonLabel="Ignite Us"
      />

      <PartnersSection />
    </PageShell>
  );
}
