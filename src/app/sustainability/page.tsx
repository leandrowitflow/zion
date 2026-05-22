import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { HeroSection, VideoBanner } from "@/components/sections/HeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const assets = {
  hero: "https://www.figma.com/api/mcp/asset/c8e4f4fb-06e0-4946-a616-402192f81ec7",
  video: "https://www.figma.com/api/mcp/asset/f7ae3ddd-ac69-46f5-90fe-e4cbbed5295b",
  commitment: "https://www.figma.com/api/mcp/asset/44005bcd-cb85-4d76-8e43-5bdf6e147af1",
  hiking: "https://www.figma.com/api/mcp/asset/f7b55462-3ef7-4fb5-9064-8d6078d955cb",
  picnic: "https://www.figma.com/api/mcp/asset/7c5bf788-040c-4b5d-8e86-5085bec1c898",
  magnolia: "https://www.figma.com/api/mcp/asset/4d1ce791-e3fc-4c6b-9776-6ff534dc8614",
  hands: "https://www.figma.com/api/mcp/asset/2d065d5d-c3af-4547-9020-c339d544fac0",
};

export default function SustainabilityPage() {
  return (
    <PageShell>
      <HeroSection image={assets.hero} title="Sustainability" />

      <SiteSection>
        <SiteContainer>
          <div className="grid gap-12 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div>
              <SectionHeading before="Our " accent="Commitment" align="left" className="mb-8" />
              <div className="space-y-6 text-base leading-7 text-muted">
                <p>
                  We create unforgettable experiences while respecting and preserving the world that
                  inspires us.
                </p>
                <p>
                  At <strong className="text-foreground">ZION Creative Artisans</strong>, we believe
                  that true luxury is found in the balance between authenticity and responsibility.
                  With simplicity as the new sophistication, we are committed to crafting
                  extraordinary journeys that honor the places we explore.
                </p>
              </div>
            </div>
            <div className="relative aspect-[669/704] overflow-hidden">
              <Image src={assets.commitment} alt="Fashion editorial" fill className="object-cover" />
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <SiteSection>
        <SiteContainer>
          <div className="grid gap-12 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div className="relative aspect-[530/795] overflow-hidden">
              <Image src={assets.hiking} alt="Sustainable hiking" fill className="object-cover" />
            </div>
            <div>
              <SectionHeading before="Sustainable " accent="Travel" align="left" className="mb-8" />
              <p className="text-base leading-7 text-muted">
                At <strong className="text-foreground">ZION Creative Artisans</strong>, we curate
                journeys that marry elegance with responsibility, where every experience is
                thoughtfully designed to honor both the traveler and the destination.
              </p>
              <div className="relative mt-10 aspect-[620/413] overflow-hidden">
                <Image src={assets.picnic} alt="Orchard picnic" fill className="object-cover" />
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <VideoBanner image={assets.video} />

      <SiteSection>
        <SiteContainer>
          <div className="grid gap-12 lg:grid-cols-2" style={{ columnGap: "var(--site-column-gap)" }}>
            <div>
              <SectionHeading before="Sustainable " accent="Partners" align="left" className="mb-8" />
              <div className="space-y-6 text-base leading-7 text-muted">
                <p>
                  <strong className="text-foreground">
                    &ldquo;We collaborate with those who share our vision for a more sustainable
                    world.&rdquo;
                  </strong>
                </p>
                <p>
                  At <strong className="text-foreground">ZION Creative Artisans</strong>, we partner
                  with tourism suppliers who share our commitment to sustainability and responsible
                  travel.
                </p>
              </div>
            </div>
            <div className="relative min-h-[450px]">
              <div className="absolute right-0 top-0 h-[586px] w-[85%] overflow-hidden">
                <Image src={assets.magnolia} alt="Magnolia flowers" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 h-[450px] w-[70%] overflow-hidden shadow-xl">
                <Image src={assets.hands} alt="Hands in wheat field" fill className="object-cover" />
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <PartnersSection />
    </PageShell>
  );
}
