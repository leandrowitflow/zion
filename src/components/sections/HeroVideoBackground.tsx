"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroVideoBackgroundProps = {
  src: string;
  poster: string;
};

/** Self-hosted hero — no YouTube overlay; poster hides only once frames are playing */
export function HeroVideoBackground({ src, poster }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.play().catch(() => {
      /* autoplay blocked — poster remains */
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setIsPlaying(true)}
      />

      <Image
        src={poster}
        alt=""
        fill
        className={`pointer-events-none object-cover object-center transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        sizes="100vw"
        priority
      />
    </div>
  );
}
