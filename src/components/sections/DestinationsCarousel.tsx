"use client";

import Image from "next/image";

import { destinationCards } from "@/lib/assets/destination";
import {
  buildInfiniteSlides,
  isInfiniteSlideClone,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";

const SLIDE_GAP = 19;

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous destinations" : "Next destinations"}
      onClick={onClick}
      className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#D9D9D9] text-[#787774] transition hover:border-[#787774]"
    >
      <svg
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
        aria-hidden="true"
        className={direction === "prev" ? "rotate-180" : undefined}
      >
        <path
          d="M1 7.5H15M15 7.5L9.5 1.5M15 7.5L9.5 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** Figma "Tailored Destinations" (2337:194) — 417×500 cards, 19px gaps, infinite forward carousel */
export function DestinationsCarousel() {
  const { trackRef, scrollNext, scrollPrev } = useInfiniteCarousel(destinationCards.length, SLIDE_GAP);
  const slides = buildInfiniteSlides(destinationCards);

  return (
    <div>
      <div className="relative grid grid-cols-[108px_1fr_108px] items-start min-[1400px]:block">
        <div className="min-[1400px]:hidden" aria-hidden="true" />
        <h2 className="heading-section text-center text-[#2b2e2b]">
          Tailored <span className="text-[#ba7d7d]">Destinations</span>
        </h2>
        <div className="flex justify-end gap-2 min-[1400px]:absolute min-[1400px]:right-0 min-[1400px]:top-0">
          <CarouselArrow direction="prev" onClick={scrollPrev} />
          <CarouselArrow direction="next" onClick={scrollNext} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-[clamp(1.5rem,5.8vw,55px)] flex gap-[19px] overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            aria-hidden={isInfiniteSlideClone(index, destinationCards.length) || undefined}
            className="w-[min(92vw,417px)] shrink-0 min-[1400px]:w-[417px]"
          >
            <div className="relative aspect-[417/500] w-full overflow-hidden min-[1400px]:h-[500px] min-[1400px]:w-[417px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1399px) 85vw, 417px"
              />
            </div>
            <p className="font-card-title mt-3 text-center text-[clamp(11px,2.4vw,24.425px)] leading-none text-[#292725] min-[1400px]:text-[24.425px]">
              {item.title}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
