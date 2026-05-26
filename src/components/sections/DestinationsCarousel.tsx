"use client";

import { destinationCards } from "@/lib/assets/destination";
import { SubpageCardLink } from "@/components/ui/SubpageCardLink";
import {
  buildInfiniteSlides,
  isInfiniteSlideClone,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
      className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#D9D9D9] text-muted transition hover:border-muted"
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
      <div className="relative grid grid-cols-[108px_1fr_108px] items-start lg:block">
        <div className="lg:hidden" aria-hidden="true" />
        <SectionHeading before="Tailored " accent="Destinations" />
        <div className="flex justify-end gap-2 lg:absolute lg:right-0 lg:top-0">
          <CarouselArrow direction="prev" onClick={scrollPrev} />
          <CarouselArrow direction="next" onClick={scrollNext} />
        </div>
      </div>

      <div className="mt-[clamp(1.5rem,5.8vw,55px)] w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-[19px] overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              aria-hidden={isInfiniteSlideClone(index, destinationCards.length) || undefined}
              className="w-[min(92vw,417px)] shrink-0 lg:w-[calc((100%-38px)/3)] lg:flex-[0_0_calc((100%-38px)/3)]"
            >
              <SubpageCardLink
                href={`/destination/${item.id}`}
                title={item.title}
                image={item.image}
                sizes="(max-width: 1023px) 92vw, 33vw"
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
