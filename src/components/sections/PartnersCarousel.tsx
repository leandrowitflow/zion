"use client";

import Image from "next/image";

import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import {
  buildInfiniteSlides,
  isInfiniteSlideClone,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";
import { partnerLogos } from "@/lib/assets/partners";

const LOGOS_PER_SLIDE = 3;

type PartnerLogo = (typeof partnerLogos)[number];

function buildPartnerPages(): PartnerLogo[][] {
  return Array.from({ length: partnerLogos.length }, (_, start) =>
    Array.from({ length: LOGOS_PER_SLIDE }, (_, offset) => {
      return partnerLogos[(start + offset) % partnerLogos.length];
    }),
  );
}

const partnerPages = buildPartnerPages();

const PARTNERS_AUTOPLAY_MS = 8000;
const PARTNERS_SCROLL_MS = 1600;

/** Partner logos — 3 visible, slides one logo at a time, infinite forward loop */
export function PartnersCarousel() {
  const { trackRef, scrollToIndex, activeIndex } = useInfiniteCarousel(
    partnerPages.length,
    0,
    PARTNERS_AUTOPLAY_MS,
    1,
    PARTNERS_SCROLL_MS,
  );
  const slides = buildInfiniteSlides(partnerPages);

  return (
    <SiteSection>
      <SiteContainer>
        <p className="text-center font-serif text-[19.957px] leading-[19px] text-[#2b2e2b]">
          Check Our Partners
        </p>

        <div className="mt-9 w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex overflow-x-auto scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-roledescription="carousel"
            aria-label="Partner logos"
          >
            {slides.map((page, index) => (
              <article
                key={`${page[0]?.id ?? "page"}-${index}`}
                aria-hidden={isInfiniteSlideClone(index, partnerPages.length) || undefined}
                className="flex min-w-full shrink-0 grow-0 basis-full items-end justify-center gap-[clamp(24px,4vw,72px)]"
              >
                {page.map((partner) => (
                  <Image
                    key={partner.id}
                    src={partner.image}
                    alt={partner.alt}
                    width={partner.width}
                    height={partner.height}
                    className="h-[clamp(56px,9vw,180px)] w-auto max-w-[min(28vw,233px)] object-contain object-bottom"
                    sizes="(max-width: 1400px) 28vw, 233px"
                  />
                ))}
              </article>
            ))}
          </div>
        </div>

        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Partner logos"
        >
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
                className={`h-[9px] w-[9px] rounded-full transition-colors ${
                  isActive ? "bg-[#2b2e2b]" : "bg-[#d9d9d9] hover:bg-[#b8b8b8]"
                }`}
              />
            );
          })}
        </div>
      </SiteContainer>
    </SiteSection>
  );
}
