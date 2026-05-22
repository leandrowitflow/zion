import { useCallback, useEffect, useRef, useState } from "react";

const CAROUSEL_SETS = 3;

function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function buildInfiniteSlides<T>(items: readonly T[]): T[] {
  return Array.from({ length: CAROUSEL_SETS }, () => items).flat();
}

export function isInfiniteSlideClone(index: number, itemCount: number): boolean {
  const middleStart = itemCount;
  const middleEnd = itemCount * 2;
  return index < middleStart || index >= middleEnd;
}

export function useInfiniteCarousel(
  itemCount: number,
  gap: number,
  autoplayMs = 5000,
  step = 1,
  scrollDurationMs?: number,
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const isResettingRef = useRef(false);
  const animateScrollRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlideWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const slide = track.querySelector("article") as HTMLElement | null;
    if (!slide) return 0;

    const style = getComputedStyle(track);
    const flexGap = parseFloat(style.columnGap || style.gap || "0") || gap;
    return slide.offsetWidth + flexGap;
  }, [gap]);

  const getLoopWidth = useCallback(() => getSlideWidth() * itemCount, [getSlideWidth, itemCount]);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || isResettingRef.current) return;

    const slideWidth = getSlideWidth();
    const loopWidth = slideWidth * itemCount;
    if (slideWidth <= 0 || loopWidth <= 0) return;

    const offset = track.scrollLeft - loopWidth;
    const index = Math.round(offset / slideWidth);
    setActiveIndex(((index % itemCount) + itemCount) % itemCount);
  }, [getSlideWidth, itemCount]);

  const jumpScroll = useCallback((position: number) => {
    const track = trackRef.current;
    if (!track) return;

    isResettingRef.current = true;
    track.style.scrollBehavior = "auto";
    track.scrollLeft = position;
    track.style.scrollBehavior = "";
    isResettingRef.current = false;
  }, []);

  const normalizeScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || isResettingRef.current) return;

    const loopWidth = getLoopWidth();
    if (loopWidth <= 0) return;

    if (track.scrollLeft >= loopWidth * 2 - 2) {
      jumpScroll(track.scrollLeft - loopWidth);
    } else if (track.scrollLeft <= 2) {
      jumpScroll(track.scrollLeft + loopWidth);
    }
  }, [getLoopWidth, jumpScroll]);

  const animateScrollTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track || !scrollDurationMs || scrollDurationMs <= 0) return false;

      const duration =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : scrollDurationMs;

      if (duration === 0) {
        track.scrollLeft = target;
        normalizeScroll();
        updateActiveIndex();
        return true;
      }

      if (animateScrollRef.current !== null) {
        cancelAnimationFrame(animateScrollRef.current);
        animateScrollRef.current = null;
      }

      const start = track.scrollLeft;
      const distance = target - start;
      if (Math.abs(distance) < 1) return true;

      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        track.scrollLeft = start + distance * easeInOutCubic(progress);

        if (progress < 1) {
          animateScrollRef.current = requestAnimationFrame(tick);
          return;
        }

        animateScrollRef.current = null;
        normalizeScroll();
        updateActiveIndex();
      };

      animateScrollRef.current = requestAnimationFrame(tick);
      return true;
    },
    [normalizeScroll, scrollDurationMs, updateActiveIndex],
  );

  const scrollToPosition = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;

      if (!animateScrollTo(target)) {
        track.scrollTo({ left: target, behavior: "smooth" });
      }
    },
    [animateScrollTo],
  );

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    scrollToPosition(track.scrollLeft + getSlideWidth() * step);
  }, [getSlideWidth, scrollToPosition, step]);

  const scrollPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    scrollToPosition(track.scrollLeft - getSlideWidth() * step);
  }, [getSlideWidth, scrollToPosition, step]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const slideWidth = getSlideWidth();
      const loopWidth = slideWidth * itemCount;
      if (slideWidth <= 0 || loopWidth <= 0) return;

      const normalizedIndex = ((index % itemCount) + itemCount) % itemCount;
      scrollToPosition(loopWidth + normalizedIndex * slideWidth);
    },
    [getSlideWidth, itemCount, scrollToPosition],
  );

  useEffect(() => {
    return () => {
      if (animateScrollRef.current !== null) {
        cancelAnimationFrame(animateScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const initScroll = () => {
      const loopWidth = getLoopWidth();
      if (loopWidth > 0) {
        jumpScroll(loopWidth);
        updateActiveIndex();
      }
    };

    initScroll();

    const observer = new ResizeObserver(initScroll);
    observer.observe(track);
    if (track.parentElement) {
      observer.observe(track.parentElement);
    }

    return () => observer.disconnect();
  }, [getLoopWidth, itemCount, jumpScroll, updateActiveIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollEndTimer: number;

    const onScrollEnd = () => {
      normalizeScroll();
      updateActiveIndex();
    };

    const onScroll = () => {
      updateActiveIndex();
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(onScrollEnd, 120);
    };

    track.addEventListener("scrollend", onScrollEnd);
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("scrollend", onScrollEnd);
      track.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollEndTimer);
    };
  }, [normalizeScroll, updateActiveIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) {
        scrollNext();
      }
    }, autoplayMs);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    return () => {
      window.clearInterval(timer);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, [scrollNext, autoplayMs]);

  return { trackRef, scrollNext, scrollPrev, scrollToIndex, activeIndex };
}
