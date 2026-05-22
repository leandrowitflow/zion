import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";

/**
 * Figma "Sustainable Partners" (2341:19) at 1920px
 * Text 542px left | collage 655×697 right (magnolia top-right, hands bottom-left)
 */
export function SustainablePartnersSection() {
  return (
    <div className="grid grid-cols-1 gap-8 min-[1400px]:grid-cols-[542px_655px] min-[1400px]:items-start min-[1400px]:justify-between min-[1400px]:gap-0">
      <div className="min-[1400px]:pt-[103px]">
        <h2 className="font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
          Sustainable <span className="text-[#ba7d7d]">Partners</span>
        </h2>
        <div className="mt-[25px] space-y-6 text-[16px] leading-[28px] text-[#787774]">
          <p>
            <strong className="font-bold text-[#787774]">
              &ldquo;We collaborate with those who share our vision for a more sustainable
              world.&rdquo;
            </strong>
          </p>
          <p>
            At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we
            partner with tourism suppliers who share our commitment to sustainability and responsible
            travel. We seek those who honor the environment, local communities, and ethical
            practices, from boutique hotels with sustainability certifications to restaurants that
            embrace local, organic sourcing and transportation providers offering low-emission
            travel.
            <br />
            <br />
            Every detail of our curated experiences is designed to harmonize with the world around
            us, ensuring that your journey is not only enriching but also mindful, leaving a positive
            impact on both you and the destinations you explore.
          </p>
        </div>
      </div>

      {/* Collage canvas — Figma 655×697 bounding box */}
      <div className="relative mx-auto aspect-[655/697] w-full max-w-[655px] min-[1400px]:mx-0 min-[1400px]:h-[697px] min-[1400px]:w-[655px] min-[1400px]:max-w-none min-[1400px]:justify-self-end">
        <div className="absolute left-[32.8%] top-0 h-[84.1%] w-[67.2%] overflow-hidden">
          <Image
            src={sustainabilityAssets.magnolia}
            alt="Magnolia flowers"
            fill
            className="object-cover"
            sizes="440px"
          />
        </div>
        <div className="absolute left-0 top-[35.4%] h-[64.6%] w-[62.6%] overflow-hidden">
          <Image
            src={sustainabilityAssets.hands}
            alt="Hands in wheat field"
            fill
            className="object-cover"
            sizes="410px"
          />
        </div>
      </div>
    </div>
  );
}
