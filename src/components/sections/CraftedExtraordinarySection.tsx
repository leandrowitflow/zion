import Image from "next/image";

import { experiencesAssets } from "@/lib/assets/experiences";

/**
 * Figma "Crafted for the Extraordinary" (2337:44) at 1920px
 * Canvas 1289×833 — title x=0 | lounge 17.2% / 31.8% | sculpture top-right | body aligned under sculpture
 */
export function CraftedExtraordinarySection() {
  return (
    <div className="relative mx-auto w-full max-w-[1289px] min-h-[clamp(620px,64.6vw,833px)]">
      <h2 className="absolute left-0 top-0 z-10 max-w-[401px] font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
        <span className="block">Crafted for the</span>
        <span className="block text-[#ba7d7d]">Extraordinary</span>
      </h2>

      <div className="absolute right-0 top-0 h-[75.6%] w-[40.3%] max-h-[630px] max-w-[520px] overflow-hidden">
        <Image
          src={experiencesAssets.sculpture}
          alt="Sculpture in gallery"
          fill
          className="object-cover"
          sizes="(max-width: 1399px) 40vw, 520px"
        />
      </div>

      <div className="absolute left-[17.2%] top-[31.8%] h-[68.2%] w-[31.8%] max-h-[568px] max-w-[410px] overflow-hidden">
        <Image
          src={experiencesAssets.lounge}
          alt="Luxury lounge experience"
          fill
          className="object-cover"
          sizes="(max-width: 1399px) 32vw, 410px"
        />
      </div>

      <p className="absolute right-0 top-[83%] w-full max-w-[528px] text-[16px] leading-[28px] text-[#787774] min-[900px]:w-[41%]">
        At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we don&apos;t offer
        ordinary travel experiences, we create immersive, bespoke journeys that awaken the senses, inspire the
        soul, and redefine luxury. From the hidden corners of Portugal to the most exclusive venues, our curated
        experiences are designed to reflect sophistication, authenticity, and pure indulgence.
      </p>
    </div>
  );
}
