"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BP_LG } from "@/lib/breakpoints";
import { mobileVideoSrc } from "@/lib/assets/video-src";

type HeroVideoBackgroundProps = {
  src: string;
  /** Smaller encode for viewports below lg — same framing, less bandwidth. */
  mobileSrc?: string;
  poster: string;
  objectPosition?: string;
  /** Above-the-fold hero — optimized poster becomes LCP. */
  priority?: boolean;
};

function scheduleMobileVideoLoad(onLoad: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(onLoad, { timeout: 5000 });
    } else {
      setTimeout(onLoad, 3000);
    }
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

  return connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

function pickVideoSrc(desktop: string, mobile?: string): string {
  if (mobile && window.matchMedia(`(max-width: ${BP_LG - 1}px)`).matches) {
    return mobile;
  }
  return desktop;
}

/** Poster via Next/Image for LCP; mobile gets a lighter MP4 after idle. */
export function HeroVideoBackground({
  src,
  mobileSrc,
  poster,
  objectPosition = "object-center",
  priority = false,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldSkipBackgroundVideo()) {
      return;
    }

    const startLoad = () => {
      setVideoSrc(pickVideoSrc(src, mobileSrc ?? mobileVideoSrc(src)));
    };

    const isMobile = window.matchMedia(`(max-width: ${BP_LG - 1}px)`).matches;

    if (isMobile) {
      scheduleMobileVideoLoad(startLoad);
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

    observer.observe(container);
    return () => observer.disconnect();
  }, [src, mobileSrc]);

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
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-black">
      <Image
        src={poster}
        alt=""
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        className={`object-cover ${objectPosition}`}
        aria-hidden
      />
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
    </div>
  );
}
