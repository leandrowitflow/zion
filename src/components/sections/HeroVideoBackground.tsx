"use client";

import { useEffect, useRef } from "react";

type HeroVideoBackgroundProps = {
  src: string;
  poster: string;
  objectPosition?: string;
};

/** Self-hosted background video — native poster, no overlay race conditions */
export function HeroVideoBackground({
  src,
  poster,
  objectPosition = "object-center",
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
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
  }, [src]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
