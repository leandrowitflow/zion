import Image from "next/image";

import { HeroVideoLayer, type VideoLoadStrategy } from "@/components/sections/HeroVideoLayer";

type HeroVideoBackgroundProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  /** Smaller poster for mobile LCP — same crop, lower payload. */
  mobilePoster?: string;
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
  mobilePoster,
  objectPosition = "object-center",
  lcp = false,
  loadStrategy = "hero",
}: HeroVideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {lcp ? (
        // Native picture for home LCP — mobile gets a smaller encode; desktop keeps full poster.
        // eslint-disable-next-line @next/next/no-img-element
        <picture>
          {mobilePoster ? (
            <source media="(max-width: 1023px)" srcSet={mobilePoster} />
          ) : null}
          <img
            src={poster}
            alt=""
            width={640}
            height={960}
            sizes="100vw"
            decoding="sync"
            fetchPriority="high"
            loading="eager"
            className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
            aria-hidden
          />
        </picture>
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
