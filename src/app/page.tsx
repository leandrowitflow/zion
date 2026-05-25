import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CraftCollage } from "@/components/sections/CraftCollage";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { homeAssets } from "@/lib/assets/home";

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-[57px] w-[189px] items-center justify-center border-2 border-white font-button text-white transition hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

function FilledButton({
  href,
  children,
  width = 189,
}: {
  href: string;
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-[57px] items-center justify-center bg-[#383e2a] font-button text-white transition hover:bg-[#383e2a]/90"
      style={{ width }}
    >
      {children}
    </Link>
  );
}

function SplitPanel({
  image,
  title,
  href = "/ignite-us",
  buttonLabel = "Contact Us",
}: {
  image: string;
  title: string;
  href?: string;
  buttonLabel?: string;
}) {
  return (
    <div className="relative min-h-[500px] flex-1 overflow-hidden lg:min-h-[min(859px,45vw)]">
      <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 1920px) 50vw, 960px" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
        <h2 className="heading-section text-white">
          {title}
        </h2>
        <OutlineButton href={href}>{buttonLabel}</OutlineButton>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="site-main bg-white">
        {/* Hero — full bleed */}
        <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)]">
          <HeroVideoBackground src={homeAssets.heroVideoSrc} poster={homeAssets.heroVideo} />
          {/* Figma desktop (1400+): title top 25.07%, button top 39.04% within 1081px hero */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-6 text-center min-[1400px]:block">
            <h1 className="heading-section text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[25.07%] min-[1400px]:w-max min-[1400px]:max-w-[min(100%,720px)] min-[1400px]:-translate-x-1/2 min-[1400px]:leading-[60px]">
              <span className="block min-[1400px]:whitespace-nowrap">Where true sophistication</span>
              <span className="block min-[1400px]:whitespace-nowrap">embraces effortless luxury</span>
            </h1>
            <div className="min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[39.04%] min-[1400px]:-translate-x-1/2">
              <OutlineButton href="/ignite-us">Contact Us</OutlineButton>
            </div>
          </div>
        </section>

        {/* The Art of Zion — Figma 2292:99: window & people share bottom edge (870px / 426px) */}
        <SiteSection>
          <SiteContainer>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 lg:items-end"
              style={{ gap: "var(--site-column-gap)" }}
            >
              <div className="relative aspect-[524/870] w-full max-w-[524px] overflow-hidden lg:max-w-none">
                <Image src={homeAssets.window} alt="Elegant interior" fill className="object-cover" sizes="524px" />
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-8">
                  <h2 className="heading-section text-[#2b2e2b]">
                    The Art of <span className="text-[#ba7d7d]">Zion</span>
                  </h2>

                  <p className="max-w-[628px] text-[16px] leading-[28px] text-[#787774]">
                    At <strong className="font-bold">ZION CREATIVE ARTISANS</strong>, we redefine luxury as
                    an experience rooted in simplicity, authenticity, and depth.
                    <br />
                    <br />
                    We define ourselves as a{" "}
                    <strong className="font-bold">DESTINATION ALCHEMIST LAB</strong>, a visionary approach
                    that redefines tourism as an alchemical process, where each experience is crafted from
                    its purest essence. The traditional concept of a &ldquo;Destination Management
                    Company&rdquo; (DMC) must evolve beyond organizing itineraries and service into a new
                    era of sophistication.
                  </p>

                  <div>
                    <FilledButton href="/the-artisans">About Zion</FilledButton>
                  </div>
                </div>

                <div className="relative aspect-[634/426] w-full max-w-[634px] overflow-hidden">
                  <Image src={homeAssets.people} alt="Family journey" fill className="object-cover" sizes="634px" />
                </div>
              </div>
            </div>
          </SiteContainer>
        </SiteSection>

        {/* Destinations & Experiences — stack on mobile/tablet (Figma 2552:28) */}
        <section className="site-full-bleed flex w-full flex-col lg:flex-row">
          <SplitPanel
            image={homeAssets.destinations}
            title="Destinations"
            href="/destination"
            buttonLabel="View More"
          />
          <SplitPanel
            image={homeAssets.experiences}
            title="Experiences"
            href="/experiences"
            buttonLabel="View More"
          />
        </section>

        {/* Craft a Destination — text left, collage right (Figma 2306:56) */}
        <SiteSection>
          <SiteContainer>
            <div
              className="grid grid-cols-1 items-start lg:grid-cols-2"
              style={{ gap: "var(--site-column-gap)" }}
            >
              {/* Figma: title starts ~212px below collage top — offset text when side-by-side */}
              <div className="flex flex-col gap-8 lg:pt-[clamp(1.5rem,11vw,212px)]">
                <h2 className="heading-section text-[#2b2e2b]">
                  Craft a <span className="text-[#ba7d7d]">Destination</span>
                </h2>

                <p className="max-w-[540px] text-[16px] leading-[28px] text-[#787774]">
                  At <strong className="font-bold">ZION Creative Artisans</strong>, we curate indulgent
                  journeys that seamlessly combine simplicity with refined elegance.
                  <br />
                  Whether you&apos;re craving cultural immersion, serene escapes, or bespoke adventures,
                  each experience is tailored to your desires. With a focus on luxury and authenticity,
                  we create unforgettable moments that indulge your senses and elevate your travel to
                  extraordinary heights.
                </p>

                <div>
                  <FilledButton href="/ignite-us" width={173}>
                    Ignite Us
                  </FilledButton>
                </div>
              </div>

              <CraftCollage />
            </div>
          </SiteContainer>
        </SiteSection>

        {/* Partners */}
        <PartnersCarousel />

        {/* Sustainability — full bleed */}
        <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)]">
          <HeroVideoBackground
            src={homeAssets.sustainabilityVideoSrc}
            poster={homeAssets.sustainability}
            objectPosition="object-bottom"
          />
          <div className="absolute inset-0 z-10 bg-black/25" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-10 px-6 text-center">
            <h2 className="heading-section text-white">
              Sustainability
            </h2>
            <OutlineButton href="/ignite-us">Contact Us</OutlineButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
