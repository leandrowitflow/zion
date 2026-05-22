import { useCallback, useEffect, useRef } from "react";

const CAROUSEL_SETS = 3;

export function buildInfiniteSlides<T>(items: readonly T[]): T[] {
  return Array.from({ length: CAROUSEL_SETS }, () => items).flat();
}

export function isInfiniteSlideClone(index: number, itemCount: number): boolean {
  const middleStart = itemCount;
  const middleEnd = itemCount * 2;
  return index < middleStart || index >= middleEnd;
}

export function useInfiniteCarousel(itemCount: number, gap: number, autoplayMs = 5000) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const isResettingRef = useRef(false);

  const getSlideWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const slide = track.querySelector("article") as HTMLElement | null;
    return slide ? slide.offsetWidth + gap : 0;
  }, [gap]);

  const getLoopWidth = useCallback(() => getSlideWidth() * itemCount, [getSlideWidth, itemCount]);

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

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({ left: getSlideWidth(), behavior: "smooth" });
  }, [getSlideWidth]);

  const scrollPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({ left: -getSlideWidth(), behavior: "smooth" });
  }, [getSlideWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const initScroll = () => {
      const loopWidth = getLoopWidth();
      if (loopWidth > 0) {
        jumpScroll(loopWidth);
      }
    };

    initScroll();

    const observer = new ResizeObserver(initScroll);
    observer.observe(track);

    return () => observer.disconnect();
  }, [getLoopWidth, itemCount, jumpScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollEndTimer: number;

    const onScrollEnd = () => normalizeScroll();

    const onScroll = () => {
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
  }, [normalizeScroll]);

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

  return { trackRef, scrollNext, scrollPrev };
}
