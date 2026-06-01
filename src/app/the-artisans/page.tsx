import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArtisansCollage } from "@/components/sections/ArtisansCollage";
import { CtaBanner } from "@/components/sections/HeroSection";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { TeamMemberCard } from "@/components/sections/TeamMemberCard";
import { ListingStructuredData } from "@/components/seo/ListingStructuredData";
import { artisansAssets } from "@/lib/assets/artisans";
import { staticPageMetadata } from "@/lib/seo/pages";
import { teamMembers } from "@/lib/team";

export const metadata = staticPageMetadata.artisans;

export default function TheArtisansPage() {
  return (
    <PageShell>
      <ListingStructuredData
        pageTitle="The Artisans"
        path="/the-artisans"
        items={teamMembers.map((member) => ({
          name: member.name,
          path: `/the-artisans/${member.slug}`,
        }))}
      />
      {/* Hero — full bleed video (Figma 2324:283) */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)]">
        <HeroVideoBackground
          src={artisansAssets.heroVideoSrc}
          poster={artisansAssets.heroVideo}
        />
      </section>

      {/* The Art of Zion — title full width; body + collage aligned (Figma 2326:9) */}
      <SiteSection>
        <SiteContainer>
          <SectionHeading
            before="The Art of "
            accent="Zion"
            align="left"
            className="mb-8 lg:mb-10"
          />
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-8">
            <div className="max-w-[628px] space-y-6 text-body lg:max-w-none">
              <p>
                At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we
                redefine luxury as an experience rooted in simplicity, authenticity, and depth. As a{" "}
                <strong className="font-bold text-foreground">Destination Alchemist Lab</strong>, we
                craft highly personalized journeys that go beyond the ordinary, offering a unique blend
                of exclusivity and genuine connection.
              </p>
              <p>
                Our services range from private tour guides who immerse you in the rich culture and hidden
                gems of your destination, to classic car tours that allow you to explore in style, and VIP
                transfers that ensure a seamless, luxurious experience.
              </p>
              <p>
                We curate stays in both authentic boutique hotels and glamorous five-star properties,
                ensuring your accommodations reflect the elegance of your journey. At{" "}
                <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we also
                create moments that bridge the simple and the extraordinary.
              </p>
              <p>
                Imagine spending a morning making your own artisanal bread in a rustic setting, followed by
                an unforgettable fine dining experience. Whether you&apos;re seeking authenticity or glamour,
                our experiences connect you with the heart of a place, where every detail is carefully
                considered, and every moment holds meaning.
              </p>
              <p>
                This is luxury redefined, where the art of simplicity and sophistication come together,
                offering an experience that is both purposeful and profound with the blend of our local
                expertise.
              </p>
            </div>
            <ArtisansCollage />
          </div>
        </SiteContainer>
      </SiteSection>

      {/* Who we are — portrait top aligns with title (Figma 2326:10) */}
      <SiteSection>
        <SiteContainer>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
            <SectionHeading
              before="Who we "
              accent="are"
              align="left"
              className="lg:col-start-2 lg:row-start-1"
            />
            {/* Portrait — desktop only; on mobile it stacks under gallery in Art of Zion */}
            <div className="relative mx-auto hidden aspect-[521/780] w-full max-w-[521px] lg:col-start-1 lg:row-start-1 lg:mx-0 lg:block lg:row-span-3">
              <Image
                src={artisansAssets.portrait}
                alt="The team"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 521px"
              />
            </div>
            <div className="max-w-[628px] space-y-6 text-body lg:col-start-2 lg:row-start-2 lg:max-w-none">
              <p>
                We are a collective of visionary travel artisans, storytellers, and experience curators
                who believe in crafting more than just itineraries — we create deeply immersive journeys
                that resonate on a personal level.
              </p>
              <p>
                As a{" "}
                <strong className="font-bold text-foreground">Destination Alchemist Lab</strong>, we bring
                a wealth of expertise within the destination, cultural immersion, and personalized service,
                shaping each journey to be as unique as the traveler themselves.
              </p>
              <p>
                Rooted in creativity, innovation, and a deep appreciation for art, history, and refined
                living, we transform destinations into living narratives. Whether you seek the serenity of
                a beach, the tranquility of the countryside, or the vibrancy of an urban escape, we tailor
                every detail with care and purpose. Embracing the belief that simplicity is the new
                sophistication, we focus on what truly matters, crafting meaningful moments that evoke
                elegance without excess. Our approach goes beyond planning — we sculpt experiences that
                leave a lasting impression, stories that stay with you long after your journey has ended.
              </p>
            </div>
            <div className="relative aspect-[625/416] w-full overflow-hidden lg:col-start-2 lg:row-start-3 lg:max-w-[625px]">
              <Image
                src={artisansAssets.sunset}
                alt="Couple at sunset"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 625px"
              />
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)]">
        <HeroVideoBackground
          src={artisansAssets.videoSrc}
          poster={artisansAssets.video}
          objectPosition="object-bottom"
        />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </section>

      {/* Our Artisans (Figma 2326:39) */}
      <SiteSection>
        <SiteContainer>
          <SectionHeading before="Our " accent="Artisans" headingLevel="h1" className="mb-8 lg:mb-12" />
          <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.slug} member={member} />
            ))}
          </div>
        </SiteContainer>
      </SiteSection>

      <CtaBanner image={artisansAssets.cta} title="Ignite Us" buttonLabel="Contact Us" />
    </PageShell>
  );
}
