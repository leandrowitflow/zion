"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { homeAssets } from "@/lib/assets/home";

const PARTNERS = [
  { image: homeAssets.asta, alt: "ASTA", className: "h-[180px] w-[180px] md:h-[227px] md:w-[227px]" },
  {
    image: homeAssets.savoy,
    alt: "Savoy Signature",
    className: "h-[180px] w-[180px] md:h-[233px] md:w-[233px]",
  },
  {
    image: homeAssets.vilaVitaParc,
    alt: "Vila Vita Parc",
    className: "h-[180px] w-[180px] md:h-[224px] md:w-[224px]",
  },
] as const;

/** Figma scroller 2306:58 — 18 dots, 7px, 277px wide, 18px spacing */
const SCROLLER_DOTS = 18;
const SCROLLER_ACTIVE_PER_SLIDE = 6;

function PartnerScroller({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const activeDot = activeIndex * SCROLLER_ACTIVE_PER_SLIDE;

  return (
    <div
      className="relative mx-auto mt-8 h-[7px] w-[277px]"
      role="tablist"
      aria-label="Partner carousel pagination"
    >
      {Array.from({ length: SCROLLER_DOTS }, (_, i) => {
        const slideIndex = Math.floor(i / SCROLLER_ACTIVE_PER_SLIDE);
        const isActive = i === activeDot;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Partner slide ${slideIndex + 1}`}
            onClick={() => onSelect(slideIndex)}
            className={`absolute top-0 h-[7px] w-[7px] -translate-x-1/2 rounded-full transition-colors ${
              isActive ? "bg-[#787774]" : "bg-[#D9D9D9] hover:bg-[#787774]/40"
            }`}
            style={{ left: `${((3.5 + i * 18) / 277) * 100}%` }}
          />
        );
      })}
    </div>
  );
}

export function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - slideCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActiveIndex(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => track.removeEventListener("scroll", syncActiveFromScroll);
  }, [syncActiveFromScroll]);

  return (
    <SiteSection spacing="compact">
      <SiteContainer className="text-center">
        <p className="font-serif text-[19.957px] leading-[19px] text-[#2b2e2b]">Check Our Partners</p>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth md:justify-center md:gap-[72px] md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner.alt}
              className="relative mx-auto w-full max-w-[280px] shrink-0 snap-center md:mx-0 md:w-auto md:max-w-none md:shrink"
            >
              <div className={`relative mx-auto ${partner.className}`}>
                <Image src={partner.image} alt={partner.alt} fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>

        <PartnerScroller activeIndex={activeIndex} onSelect={scrollToSlide} />
      </SiteContainer>
    </SiteSection>
  );
}
