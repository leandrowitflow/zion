import Image from "next/image";

import { HeroVideoLayer, type VideoLoadStrategy } from "@/components/sections/HeroVideoLayer";

type HeroVideoBackgroundProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  objectPosition?: string;
  /** Above-the-fold hero — poster is LCP (server-rendered). */
  priority?: boolean;
  /** visible = load video only when section enters viewport (below-fold bands). */
  loadStrategy?: VideoLoadStrategy;
};

/** Server-rendered poster for fast LCP; client layer loads MP4 when appropriate. */
export function HeroVideoBackground({
  src,
  mobileSrc,
  poster,
  objectPosition = "object-center",
  priority = false,
  loadStrategy = "hero",
}: HeroVideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <Image
        src={poster}
        alt=""
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={priority ? 68 : 75}
        sizes="100vw"
        className={`object-cover ${objectPosition}`}
        aria-hidden
      />
      <HeroVideoLayer
        src={src}
        mobileSrc={mobileSrc}
        objectPosition={objectPosition}
        loadStrategy={loadStrategy}
      />
    </div>
  );
}
