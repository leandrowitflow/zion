"use client";

import { experienceCategories } from "@/lib/assets/experiences";
import { SubpageCardLink } from "@/components/ui/SubpageCardLink";
import {
  buildInfiniteSlides,
  isInfiniteSlideClone,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SLIDE_GAP = 18;

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
      aria-label={direction === "prev" ? "Previous experiences" : "Next experiences"}
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

/** Figma "Tailored Experiences" — 309×369 cards, 18px gaps, infinite forward carousel */
export function ExperiencesCarousel() {
  const { trackRef, scrollNext, scrollPrev } = useInfiniteCarousel(
    experienceCategories.length,
    SLIDE_GAP,
  );
  const slides = buildInfiniteSlides(experienceCategories);

  return (
    <div>
      <div className="relative grid grid-cols-[108px_1fr_108px] items-start lg:block">
        <div className="lg:hidden" aria-hidden="true" />
        <SectionHeading before="Tailored " accent="Experiences" />
        <div className="flex justify-end gap-2 lg:absolute lg:right-0 lg:top-0">
          <CarouselArrow direction="prev" onClick={scrollPrev} />
          <CarouselArrow direction="next" onClick={scrollNext} />
        </div>
      </div>

      <div className="mt-[clamp(1.5rem,5.8vw,55px)] w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-[18px] overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              aria-hidden={isInfiniteSlideClone(index, experienceCategories.length) || undefined}
              className="w-[min(85vw,309px)] shrink-0 lg:w-[calc((100%-54px)/4)] lg:flex-[0_0_calc((100%-54px)/4)]"
            >
              <SubpageCardLink
                href={`/experiences/${item.id}`}
                title={item.title}
                image={item.image}
                aspectClassName="aspect-[309/369]"
                objectPosition={item.objectPosition}
                sizes="(max-width: 1023px) 85vw, 309px"
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
