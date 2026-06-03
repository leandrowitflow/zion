"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDE_DURATION_MS = 5000;
const FADE_DURATION_MS = 500;

type BackgroundSlideshowProps = {
  images: readonly string[];
  sizes?: string;
  /** Describes the slideshow subject for the primary slide alt text. */
  subject?: string;
};

/** Fade slideshow — images load only when the panel is near the viewport. */
export function BackgroundSlideshow({
  images,
  sizes = "(max-width: 640px) 100vw, (max-width: 1023px) 100vw, 720px",
  subject,
}: BackgroundSlideshowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    setLoadedSlides((current) => {
      if (current.has(0)) {
        return current;
      }
      return new Set([0]);
    });
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || reduceMotion || images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [images.length, isVisible, reduceMotion]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

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
  }, [activeIndex, images.length, isVisible]);

  if (images.length === 0) {
    return null;
  }

  const slideAlt = subject ? `${subject} — Portugal` : "";

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-black" aria-hidden={!!subject}>
      {!isVisible ? null : reduceMotion || images.length === 1 ? (
        <Image
          src={images[0]}
          alt={slideAlt}
          fill
          className="object-cover"
          sizes={sizes}
          loading="lazy"
          quality={60}
          aria-hidden={!slideAlt}
        />
      ) : (
        images.map((src, index) => {
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
                  quality={60}
                  aria-hidden={index !== 0 || !slideAlt}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
