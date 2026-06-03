import Image from "next/image";

import { HeroVideoLayer, type VideoLoadStrategy } from "@/components/sections/HeroVideoLayer";

type HeroVideoBackgroundProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  objectPosition?: string;
  /** Above-the-fold hero — poster is LCP (server-rendered). */
  lcp?: boolean;
  /** visible = load video only when section enters viewport (below-fold bands). */
  loadStrategy?: VideoLoadStrategy;
};

/** Server-rendered poster for fast LCP; client layer loads MP4 when appropriate. */
export function HeroVideoBackground({
  src,
  mobileSrc,
  poster,
  objectPosition = "object-center",
  lcp = false,
  loadStrategy = "hero",
}: HeroVideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {lcp ? (
        // Native img for home LCP — avoids /_next/image pipeline latency in lab & field.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          decoding="async"
          fetchPriority="high"
          loading="eager"
          className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
          aria-hidden
        />
      ) : (
        <Image
          src={poster}
          alt=""
          fill
          loading="lazy"
          quality={75}
          sizes="100vw"
          className={`object-cover ${objectPosition}`}
          aria-hidden
        />
      )}
      <HeroVideoLayer
        src={src}
        mobileSrc={mobileSrc}
        objectPosition={objectPosition}
        loadStrategy={loadStrategy}
      />
    </div>
  );
}
