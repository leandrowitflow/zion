"use client";

import { useEffect, useRef, useState } from "react";

import { BP_LG } from "@/lib/breakpoints";
import { mobileVideoSrc } from "@/lib/assets/video-src";

export type VideoLoadStrategy = "hero" | "visible";

type HeroVideoLayerProps = {
  src: string;
  mobileSrc?: string;
  objectPosition?: string;
  /** hero = delayed idle on mobile; visible = intersection only (below-fold). */
  loadStrategy?: VideoLoadStrategy;
};

function scheduleIdleLoad(onLoad: () => void, minDelayMs: number) {
  const run = () => {
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(onLoad, { timeout: 8000 });
      } else {
        setTimeout(onLoad, minDelayMs);
      }
    };
    setTimeout(start, minDelayMs);
  };

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
}

function shouldSkipBackgroundVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (!connection) {
    return false;
  }

  if (connection.saveData) {
    return true;
  }

  const slow = connection.effectiveType;
  return slow === "slow-2g" || slow === "2g" || slow === "3g";
}

function pickVideoSrc(desktop: string, mobile?: string): string {
  if (mobile && window.matchMedia(`(max-width: ${BP_LG - 1}px)`).matches) {
    return mobile;
  }
  return desktop;
}

export function HeroVideoLayer({
  src,
  mobileSrc,
  objectPosition = "object-center",
  loadStrategy = "hero",
}: HeroVideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || shouldSkipBackgroundVideo()) {
      return;
    }

    const startLoad = () => {
      setVideoSrc(pickVideoSrc(src, mobileSrc ?? mobileVideoSrc(src)));
    };

    const isMobile = window.matchMedia(`(max-width: ${BP_LG - 1}px)`).matches;

    if (loadStrategy === "visible") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            startLoad();
            observer.disconnect();
          }
        },
        { rootMargin: "80px 0px", threshold: 0.1 },
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    if (isMobile) {
      scheduleIdleLoad(startLoad, 10000);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [src, mobileSrc, loadStrategy]);

  useEffect(() => {
    if (!videoSrc) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, [videoSrc]);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden />
      {videoSrc ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 z-[1] h-full w-full object-cover ${objectPosition}`}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
      ) : null}
    </>
  );
}
