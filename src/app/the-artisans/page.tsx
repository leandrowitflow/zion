import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { ArtisansCollage } from "@/components/sections/ArtisansCollage";
import { CtaBanner, VideoBanner } from "@/components/sections/HeroSection";
import { homeAssets } from "@/lib/assets/home";
import { artisansAssets } from "@/lib/assets/artisans";

const teamMembers = [
  { image: artisansAssets.team.carlos, name: "Carlos Brás", role: "The Alchemist" },
  { image: artisansAssets.team.andre, name: "André Oliveira", role: "Chief Alchemist Officer" },
  { image: artisansAssets.team.vitor, name: "Vítor Almeida", role: "Chief of Prestige Projects" },
  {
    image: artisansAssets.team.jessica,
    name: "Jéssica Campos",
    role: "Brand Alchemist",
    href: "https://zion-creativeartisans.com/?cpt_team=jessica-campos",
  },
  { image: artisansAssets.team.anabela, name: "Anabela Santos", role: "Brand Alchemist" },
  {
    image: artisansAssets.team.ana,
    name: "Ana Gomes",
    role: "Brand Alchemist",
    href: "https://zion-creativeartisans.com/?cpt_team=ana-gomes",
  },
  { image: artisansAssets.team.margarida, name: "Margarida Duarte", role: "Brand Alchemist" },
] as const;

export default function TheArtisansPage() {
  return (
    <PageShell>
      {/* Hero — video placeholder; same image + size as home hero (Figma 2324:283) */}
      <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)]">
        <Image
          src={homeAssets.heroVideo}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </section>

      {/* The Art of Zion — title full width; body + collage aligned (Figma 2326:9) */}
      <SiteSection>
        <SiteContainer>
          <h2 className="mb-8 font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:mb-10 md:text-[61.5px] md:leading-[56.033px]">
            The Art of <span className="text-[#ba7d7d]">Zion</span>
          </h2>
          <div className="grid grid-cols-1 items-start min-[1400px]:grid-cols-[628px_630px] min-[1400px]:gap-[29px]">
            <div className="max-w-[628px] space-y-6 text-[16px] leading-[28px] text-[#787774]">
              <p>
                At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we
                redefine luxury as an experience rooted in simplicity, authenticity, and depth. As a{" "}
                <strong className="font-bold text-[#787774]">Destination Alchemist Lab</strong>, we
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
                <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we also
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
          <div className="grid grid-cols-1 items-start gap-8 min-[1400px]:grid-cols-[521px_628px] min-[1400px]:gap-x-[141px] min-[1400px]:gap-y-8">
            <h2 className="font-serif text-4xl font-light leading-tight text-[#2b2e2b] min-[1400px]:col-start-2 min-[1400px]:row-start-1 md:text-[61.5px] md:leading-[56.033px]">
              Who we <span className="text-[#ba7d7d]">are</span>
            </h2>
            <div className="relative mx-auto aspect-[521/780] w-full max-w-[521px] min-[1400px]:col-start-1 min-[1400px]:row-start-1 min-[1400px]:mx-0 min-[1400px]:h-[780px] min-[1400px]:w-[521px] min-[1400px]:row-span-3">
              <Image
                src={artisansAssets.portrait}
                alt="The team"
                fill
                className="object-cover"
                sizes="(max-width: 1399px) 100vw, 521px"
              />
            </div>
            <div className="max-w-[628px] space-y-6 text-[16px] leading-[28px] text-[#787774] min-[1400px]:col-start-2 min-[1400px]:row-start-2">
              <p>
                We are a collective of visionary travel artisans, storytellers, and experience curators
                who believe in crafting more than just itineraries — we create deeply immersive journeys
                that resonate on a personal level.
              </p>
              <p>
                As a{" "}
                <strong className="font-bold text-[#787774]">Destination Alchemist Lab</strong>, we bring
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
            <div className="relative aspect-[625/416] w-full max-w-[625px] min-[1400px]:col-start-2 min-[1400px]:row-start-3 min-[1400px]:h-[416px] min-[1400px]:w-[625px] overflow-hidden">
              <Image
                src={artisansAssets.sunset}
                alt="Couple at sunset"
                fill
                className="object-cover"
                sizes="(max-width: 1399px) 100vw, 625px"
              />
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <VideoBanner image={artisansAssets.video} />

      {/* Our Artisans (Figma 2326:39) */}
      <SiteSection>
        <SiteContainer>
          <h2 className="mb-12 text-center font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
            Our <span className="text-[#ba7d7d]">Artisans</span>
          </h2>
          <div className="grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="flex flex-col">
                <div className="relative aspect-[411/502] overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" sizes="411px" />
                </div>
                <div className="mt-6 flex flex-col gap-2 text-left">
                  {"href" in member && member.href ? (
                    <Link
                      href={member.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-card-title text-[24.425px] leading-none text-[#292725] hover:text-[#ba7d7d]"
                    >
                      {member.name}
                    </Link>
                  ) : (
                    <p className="font-card-title text-[24.425px] leading-none text-[#292725]">{member.name}</p>
                  )}
                  <p className="text-[16px] leading-[28px] text-[#787774]">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </SiteContainer>
      </SiteSection>

      <CtaBanner image={artisansAssets.cta} title="Ignite Us" buttonLabel="Contact Us" />
    </PageShell>
  );
}
