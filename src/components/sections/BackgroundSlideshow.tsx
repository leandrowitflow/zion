"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_DURATION_MS = 5000;
const FADE_DURATION_MS = 500;

type BackgroundSlideshowProps = {
  images: readonly string[];
  sizes?: string;
  /** Describes the slideshow subject for the primary slide alt text. */
  subject?: string;
};

/** Fade slideshow — loads only the active slide (+ next) to cut mobile bandwidth. */
export function BackgroundSlideshow({
  images,
  sizes = "(max-width: 1023px) 100vw, 50vw",
  subject,
}: BackgroundSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));

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

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % images.length;
    setLoadedSlides((current) => {
      if (current.has(activeIndex) && current.has(nextIndex)) {
        return current;
      }
      const updated = new Set(current);
      updated.add(activeIndex);
      updated.add(nextIndex);
      return updated;
    });
  }, [activeIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

  const slideAlt = subject ? `${subject} — Portugal` : "";

  if (reduceMotion || images.length === 1) {
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src={images[0]}
          alt={slideAlt}
          fill
          className="object-cover"
          sizes={sizes}
          loading="lazy"
          aria-hidden={!slideAlt}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden={!!subject}>
      {images.map((src, index) => {
        if (!loadedSlides.has(index)) {
          return null;
        }

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
                alt={index === 0 && slideAlt ? slideAlt : ""}
                fill
                className="object-cover"
                sizes={sizes}
                loading="lazy"
                aria-hidden={index !== 0 || !slideAlt}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
