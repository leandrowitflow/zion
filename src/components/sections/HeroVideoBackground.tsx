import Image from "next/image";

import { HeroLcpPoster } from "@/components/sections/HeroLcpPoster";
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
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-black"
      style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#000" }}
    >
      {lcp ? (
        <HeroLcpPoster poster={poster} mobilePoster={mobilePoster} objectPosition={objectPosition} />
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
