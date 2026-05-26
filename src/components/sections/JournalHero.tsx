import Image from "next/image";

import { blogAssets } from "@/lib/assets/blog";

/** Figma 2624:72 / 2624:73 — hero image crop + title placement */
export function JournalHero() {
  return (
    <section className="site-full-bleed relative min-h-[480px] h-[clamp(480px,55.73vw,1070px)] w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={blogAssets.hero}
          alt="Couple on a motorcycle at dusk by the coast"
          width={1920}
          height={3060}
          className="absolute left-0 top-[-10.37%] h-[286.26%] w-full max-w-none object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <h1 className="heading-section absolute left-1/2 top-[42.15%] z-10 w-max max-w-[min(100%,720px)] -translate-x-1/2 px-4 whitespace-nowrap text-center text-white">
        The Journal of ZION
      </h1>
    </section>
  );
}
