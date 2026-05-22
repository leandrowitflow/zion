import Image from "next/image";

import { experiencesAssets } from "@/lib/assets/experiences";

const bodyCopy = (
  <p className="text-[16px] leading-[28px] text-[#787774]">
    At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we don&apos;t offer
    ordinary travel experiences, we create immersive, bespoke journeys that awaken the senses, inspire the
    soul, and redefine luxury. From the hidden corners of Portugal to the most exclusive venues, our curated
    experiences are designed to reflect sophistication, authenticity, and pure indulgence.
  </p>
);

/**
 * Figma desktop (2337:44) canvas 1289×833 | mobile (2552:25) stacked title + sculpture + body
 */
export function CraftedExtraordinarySection() {
  return (
    <div>
      {/* Mobile / tablet — Figma 2552:25 */}
      <div className="min-[1400px]:hidden">
        <h2 className="text-center font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
          <span className="block">Crafted for the</span>
          <span className="block text-[#ba7d7d]">Extraordinary</span>
        </h2>
        <div className="relative mx-auto mt-8 aspect-[520/630] w-full max-w-[520px] overflow-hidden">
          <Image
            src={experiencesAssets.sculpture}
            alt="Sculpture in gallery"
            fill
            className="object-cover"
            sizes="(max-width: 1399px) 92vw, 520px"
          />
        </div>
        <div className="mt-8">{bodyCopy}</div>
      </div>

      {/* Desktop — Figma 2337:44 */}
      <div className="relative mx-auto hidden w-full max-w-[1289px] min-h-[clamp(620px,64.6vw,833px)] min-[1400px]:block">
        <h2 className="absolute left-0 top-0 z-10 max-w-[401px] font-serif text-[61.5px] font-light leading-[56.033px] text-[#2b2e2b]">
          <span className="block">Crafted for the</span>
          <span className="block text-[#ba7d7d]">Extraordinary</span>
        </h2>

        <div className="absolute right-0 top-0 h-[75.6%] w-[40.3%] max-h-[630px] max-w-[520px] overflow-hidden">
          <Image
            src={experiencesAssets.sculpture}
            alt="Sculpture in gallery"
            fill
            className="object-cover"
            sizes="520px"
          />
        </div>

        <div className="absolute left-[17.2%] top-[31.8%] h-[68.2%] w-[31.8%] max-h-[568px] max-w-[410px] overflow-hidden">
          <Image
            src={experiencesAssets.lounge}
            alt="Luxury lounge experience"
            fill
            className="object-cover"
            sizes="410px"
          />
        </div>

        <div className="absolute right-0 top-[83%] w-[528px]">{bodyCopy}</div>
      </div>
    </div>
  );
}
