"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import {
  buildInfiniteSlides,
  isInfiniteSlideClone,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";
import { BP_LG } from "@/lib/breakpoints";
import { partnerLogos } from "@/lib/assets/partners";

type PartnerLogo = (typeof partnerLogos)[number];

type PartnersCarouselProps = {
  /** Pairs with adjacent flush sections (e.g. Craft → Partners → Sustainability on home) */
  edgeToEdge?: boolean;
};

function buildPartnerPages(logosPerSlide: number): PartnerLogo[][] {
  return Array.from({ length: partnerLogos.length }, (_, start) =>
    Array.from({ length: logosPerSlide }, (_, offset) => {
      return partnerLogos[(start + offset) % partnerLogos.length];
    }),
  );
}

function useLogosPerSlide() {
  const [logosPerSlide, setLogosPerSlide] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BP_LG}px)`);
    const update = () => setLogosPerSlide(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return logosPerSlide;
}

function partnerLogoClassName(logosPerSlide: number) {
  return logosPerSlide === 1
    ? "h-[clamp(80px,22vw,180px)] w-auto max-w-[min(72vw,280px)] object-contain object-bottom"
    : "h-[clamp(56px,9vw,180px)] w-auto max-w-[min(28vw,233px)] object-contain object-bottom";
}

const PARTNERS_AUTOPLAY_MS = 8000;
const PARTNERS_SCROLL_MS = 1600;

const PARTNERS_DOTS_ROW_CLASS =
  "mt-[var(--space-small)] flex h-[6px] flex-wrap items-center justify-center gap-[11px]";
const PARTNER_DOT_BUTTON_CLASS =
  "relative size-[6px] shrink-0 border-0 bg-transparent p-0 before:absolute before:-inset-5 before:content-['']";
const PARTNER_DOT_VISUAL_CLASS = "block size-[6px] rounded-full";

function PartnersSection({
  children,
  edgeToEdge,
}: {
  children: React.ReactNode;
  edgeToEdge?: boolean;
}) {
  const sectionClass = edgeToEdge
    ? "site-section-flush-top site-section-flush-bottom"
    : "";

  return (
    <SiteSection spacing="none" className={sectionClass}>
      <SiteContainer className="partners-section-inner">{children}</SiteContainer>
    </SiteSection>
  );
}

function PartnersCarouselStatic({ edgeToEdge }: PartnersCarouselProps) {
  const partner = partnerLogos[0];

  return (
    <PartnersSection edgeToEdge={edgeToEdge}>
      <p className="font-partners-heading text-center text-foreground">
        Check Our Partners
      </p>

      <div className="mt-[var(--space-small)] w-full overflow-hidden">
        <div
          className="flex items-end justify-center"
          aria-roledescription="carousel"
          aria-label="Partner logos"
        >
          <Image
            src={partner.image}
            alt={partner.alt}
            width={partner.width}
            height={partner.height}
            className={partnerLogoClassName(1)}
            sizes="(max-width: 1023px) 72vw, 233px"
          />
        </div>
      </div>

      <div className={PARTNERS_DOTS_ROW_CLASS} role="tablist" aria-label="Partner logos">
        {partnerLogos.map((item, index) => (
          <span
            key={item.id}
            role="tab"
            aria-selected={index === 0}
            aria-label={`Show ${item.alt}`}
            className={`${PARTNER_DOT_VISUAL_CLASS} ${
              index === 0 ? "bg-foreground" : "bg-[#d9d9d9]"
            }`}
          />
        ))}
      </div>
    </PartnersSection>
  );
}

function PartnersCarouselInteractive({ edgeToEdge }: PartnersCarouselProps) {
  const logosPerSlide = useLogosPerSlide();
  const partnerPages = useMemo(() => buildPartnerPages(logosPerSlide), [logosPerSlide]);
  const { trackRef, scrollToIndex, activeIndex } = useInfiniteCarousel(
    partnerPages.length,
    0,
    PARTNERS_AUTOPLAY_MS,
    1,
    PARTNERS_SCROLL_MS,
  );
  const slides = useMemo(() => buildInfiniteSlides(partnerPages), [partnerPages]);
  const logoClassName = partnerLogoClassName(logosPerSlide);

  return (
    <PartnersSection edgeToEdge={edgeToEdge}>
      <p className="font-partners-heading text-center text-foreground">
        Check Our Partners
      </p>

      <div className="mt-[var(--space-small)] w-full overflow-hidden">
        <div
          key={logosPerSlide}
          ref={trackRef}
          className="flex overflow-x-auto scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Partner logos"
        >
          {slides.map((page, index) => (
            <article
              key={`${page[0]?.id ?? "page"}-${index}`}
              aria-hidden={isInfiniteSlideClone(index, partnerPages.length) ? true : undefined}
              className="flex min-w-full shrink-0 grow-0 basis-full items-end justify-center gap-[clamp(24px,4vw,72px)]"
            >
              {page.map((partner) => (
                <Image
                  key={partner.id}
                  src={partner.image}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className={logoClassName}
                  sizes={
                    logosPerSlide === 1
                      ? "(max-width: 1023px) 72vw, 233px"
                      : "(max-width: 1023px) 28vw, 233px"
                  }
                />
              ))}
            </article>
          ))}
        </div>
      </div>

      <div className={PARTNERS_DOTS_ROW_CLASS} role="tablist" aria-label="Partner logos">
        {partnerLogos.map((partner, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={partner.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show ${partner.alt}`}
              onClick={() => scrollToIndex(index)}
              className={PARTNER_DOT_BUTTON_CLASS}
            >
              <span
                className={`${PARTNER_DOT_VISUAL_CLASS} transition-colors ${
                  isActive ? "bg-foreground" : "bg-[#d9d9d9]"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </PartnersSection>
  );
}

/** Partner logos — 1 on mobile (2552:34), 3 on desktop; slides one logo at a time */
export function PartnersCarousel({ edgeToEdge }: PartnersCarouselProps = {}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <PartnersCarouselStatic edgeToEdge={edgeToEdge} />;
  }

  return <PartnersCarouselInteractive edgeToEdge={edgeToEdge} />;
}
