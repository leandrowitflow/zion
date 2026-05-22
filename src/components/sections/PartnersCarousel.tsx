"use client";

import Image from "next/image";
import { useState } from "react";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { homeAssets } from "@/lib/assets/home";

/** Figma 2337:23 — 227 + 72 + 233 + 72 + 224 = 828px row at 1920 */
const PARTNERS = [
  { image: homeAssets.asta, alt: "ASTA", width: 227, height: 227 },
  { image: homeAssets.savoy, alt: "Savoy Signature", width: 233, height: 233 },
  { image: homeAssets.vilaVitaParc, alt: "Vila Vita Parc", width: 224, height: 224 },
] as const;

const ROW_WIDTH = 828;
const GAP = 72;

/** Figma scroller — 18 dots, 7px, 277px wide, 18px spacing */
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
      className="relative mx-auto mt-5 h-[7px] w-[277px]"
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SiteSection>
      <SiteContainer>
        <p className="text-center font-serif text-[19.957px] leading-[19px] text-[#2b2e2b]">
          Check Our Partners
        </p>

        {/* Centered logo row — Figma x=547, gap=72px, total width 828px */}
        <div className="mx-auto mt-9 w-full max-w-[828px]">
          <div
            className="flex items-end justify-between"
            style={{ gap: `clamp(12px, ${(GAP / ROW_WIDTH) * 100}%, ${GAP}px)` }}
          >
            {PARTNERS.map((partner) => (
              <div
                key={partner.alt}
                className="relative shrink-0"
                style={{
                  width: `clamp(72px, ${(partner.width / ROW_WIDTH) * 100}%, ${partner.width}px)`,
                  aspectRatio: `${partner.width} / ${partner.height}`,
                }}
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  fill
                  className="object-contain object-bottom"
                  sizes={`(max-width: 828px) ${Math.round((partner.width / ROW_WIDTH) * 100)}vw, ${partner.width}px`}
                />
              </div>
            ))}
          </div>
        </div>

        <PartnerScroller activeIndex={activeIndex} onSelect={setActiveIndex} />
      </SiteContainer>
    </SiteSection>
  );
}
