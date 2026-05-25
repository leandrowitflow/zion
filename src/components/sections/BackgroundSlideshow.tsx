"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_DURATION_MS = 5000;
const FADE_DURATION_MS = 500;

type BackgroundSlideshowProps = {
  images: readonly string[];
  sizes?: string;
};

/** Fade slideshow with Ken Burns zoom — matches Elementor background_slideshow on live site */
export function BackgroundSlideshow({
  images,
  sizes = "(max-width: 1920px) 50vw, 960px",
}: BackgroundSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [images.length, reduceMotion]);

  if (images.length === 0) {
    return null;
  }

  if (reduceMotion || images.length === 1) {
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover"
          sizes={sizes}
          priority
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {images.map((src, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              isActive ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
          >
            <div
              key={isActive ? `ken-burns-${activeIndex}` : undefined}
              className={`absolute inset-0 origin-center ${
                isActive ? "animate-ken-burns-in" : ""
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes={sizes}
                priority={index === 0}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
