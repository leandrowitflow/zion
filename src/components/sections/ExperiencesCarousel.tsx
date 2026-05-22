"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { experienceCategories } from "@/lib/assets/experiences";

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous experiences" : "Next experiences"}
      disabled={disabled}
      onClick={onClick}
      className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#D9D9D9] text-[#787774] transition hover:border-[#787774] disabled:cursor-not-allowed disabled:opacity-40"
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

export function ExperiencesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBySlide = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector("article") as HTMLElement | null;
    const gap = 18;
    const amount = slide ? slide.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="mb-10 flex flex-col items-center gap-6 min-[1400px]:relative min-[1400px]:mb-[109px]">
        <h2 className="text-center font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
          Tailored <span className="text-[#ba7d7d]">Experiences</span>
        </h2>
        <div className="flex gap-2 min-[1400px]:absolute min-[1400px]:right-0 min-[1400px]:top-0">
          <CarouselArrow direction="prev" onClick={() => scrollBySlide("prev")} />
          <CarouselArrow direction="next" onClick={() => scrollBySlide("next")} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth [scrollbar-width:none] min-[1400px]:grid min-[1400px]:grid-cols-4 min-[1400px]:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {experienceCategories.map((item) => (
          <article
            key={item.title}
            className="w-[min(92vw,309px)] shrink-0 snap-start min-[1400px]:w-auto"
          >
            <div className="relative aspect-[309/369] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover ${item.objectPosition}`}
                sizes="309px"
              />
            </div>
            <p className="mt-3 text-center font-serif text-[clamp(11px,2.4vw,24.425px)] leading-none text-[#292725] min-[1400px]:text-[24.425px]">
              {item.title}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
