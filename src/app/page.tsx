import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { BackgroundSlideshow } from "@/components/sections/BackgroundSlideshow";
import { CraftCollage } from "@/components/sections/CraftCollage";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeDestinationsSlideshow } from "@/lib/assets/destinations-slideshow";
import { homeExperiencesSlideshow } from "@/lib/assets/experiences-slideshow";
import { homeAssets } from "@/lib/assets/home";
import { staticPageMetadata } from "@/lib/seo/pages";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/lib/seo/faqs";
import { faqSchema } from "@/lib/seo/schemas";

export const metadata = staticPageMetadata.home;

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn-outline-light max-lg:mx-auto max-lg:block max-lg:w-fit lg:mx-0">
      {children}
    </Link>
  );
}

function FilledButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="btn-filled max-lg:mx-auto max-lg:block max-lg:w-fit lg:mx-0">
      {children}
    </Link>
  );
}

function SplitPanel({
  image,
  images,
  title,
  href = "/ignite-us",
  buttonLabel = "Contact Us",
}: {
  image?: string;
  images?: readonly string[];
  title: string;
  href?: string;
  buttonLabel?: string;
}) {
  const slides = images ?? (image ? [image] : []);

  return (
    <div className="relative min-h-[500px] flex-1 overflow-hidden lg:min-h-[min(859px,45vw)]">
      {slides.length > 1 ? (
        <BackgroundSlideshow images={slides} subject={title} />
      ) : slides.length === 1 ? (
        <Image
          src={slides[0]}
          alt={`${title} — Portugal`}
          fill
          className="object-cover"
          sizes="(max-width: 1920px) 50vw, 960px"
        />
      ) : null}
      <div className="absolute inset-0 z-10 bg-black/20" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-[var(--space-medium)] px-6 text-center">
        <h2 className="heading-section mb-0 text-white">
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
      <JsonLd data={faqSchema(homeFaqs)} />
      <Header />
      <main className="site-main bg-white">
        {/* Hero — full bleed */}
        <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)]">
          <HeroVideoBackground src={homeAssets.heroVideoSrc} poster={homeAssets.heroVideo} />
          {/* Figma desktop (1400+): title top 25.07%, button top 39.04% within 1081px hero */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[var(--space-medium)] px-6 text-center min-[1400px]:block">
            <h1 className="heading-section mb-0 text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[25.07%] min-[1400px]:w-max min-[1400px]:max-w-[min(100%,720px)] min-[1400px]:-translate-x-1/2">
              Where true sophistication
              <br />
              embraces effortless luxury
            </h1>
            <div className="min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[39.04%] min-[1400px]:-translate-x-1/2">
              <OutlineButton href="/ignite-us">Contact Us</OutlineButton>
            </div>
          </div>
        </section>

        {/* The Art of Zion — Figma 2292:99: window & people share bottom edge (524×870 / 634×426) */}
        <SiteSection>
          <SiteContainer>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch"
              style={{ gap: "var(--site-column-gap)" }}
            >
              <div className="flex flex-col justify-end">
                <div className="relative aspect-[524/870] w-full max-w-[524px] overflow-hidden">
                  <Image src={homeAssets.window} alt="Elegant interior" fill className="object-cover" sizes="524px" />
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <SectionHeading before="The Art of " accent="Zion" align="left" />

                  <p className="text-body max-w-[628px]">
                    At <strong className="font-bold text-foreground">ZION CREATIVE ARTISANS</strong>, we redefine luxury as
                    an experience rooted in simplicity, authenticity, and depth.
                    <br />
                    We define ourselves as a{" "}
                    <strong className="font-bold text-foreground">DESTINATION ALCHEMIST LAB</strong>, a visionary approach
                    that redefines tourism as an alchemical process, where each experience is crafted from
                    its purest essence. The traditional concept of a &ldquo;Destination Management
                    Company&rdquo; (DMC) must evolve beyond organizing itineraries and service into a new
                    era of sophistication.
                  </p>

                  <FilledButton href="/the-artisans">About Zion</FilledButton>
                </div>

                <div className="relative mt-[var(--space-medium)] aspect-[634/426] w-full max-w-[634px] overflow-hidden lg:mt-auto lg:pt-[var(--space-medium)]">
                  <Image src={homeAssets.people} alt="Family journey" fill className="object-cover" sizes="634px" />
                </div>
              </div>
            </div>
          </SiteContainer>
        </SiteSection>

        {/* Destinations & Experiences — stack on mobile/tablet (Figma 2552:28) */}
        <section className="site-full-bleed flex w-full flex-col lg:flex-row">
          <SplitPanel
            images={homeDestinationsSlideshow}
            title="Destinations"
            href="/destination"
            buttonLabel="View More"
          />
          <SplitPanel
            images={homeExperiencesSlideshow}
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
              <div className="flex flex-col lg:pt-[clamp(1.5rem,11vw,212px)]">
                <SectionHeading before="Craft a " accent="Destination" align="left" />

                <p className="text-body max-w-[540px]">
                  At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we curate indulgent
                  journeys that seamlessly combine simplicity with refined elegance.
                  <br />
                  Whether you&apos;re craving cultural immersion, serene escapes, or bespoke adventures,
                  each experience is tailored to your desires. With a focus on luxury and authenticity,
                  we create unforgettable moments that indulge your senses and elevate your travel to
                  extraordinary heights.
                </p>

                <FilledButton href="/ignite-us">Ignite Us</FilledButton>
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
          {/* Match home hero overlay — Figma title 25.07%, button 39.04%; +1lh title offset for single line */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[var(--space-medium)] px-6 text-center min-[1400px]:block">
            <h2 className="heading-section mb-0 text-white min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[calc(25.07%+1lh)] min-[1400px]:w-max min-[1400px]:max-w-[min(100%,720px)] min-[1400px]:-translate-x-1/2">
              Sustainability
            </h2>
            <div className="min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:top-[39.04%] min-[1400px]:-translate-x-1/2">
              <OutlineButton href="/ignite-us">Contact Us</OutlineButton>
            </div>
          </div>
        </section>
      </main>

      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <FaqSection faqs={homeFaqs} />
        </SiteContainer>
      </SiteSection>

      <Footer />
    </>
  );
}
