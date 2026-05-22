import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";

/**
 * Figma desktop (2341:19) collage | mobile (2552:34) title → text → hands image
 */
export function SustainablePartnersSection() {
  return (
    <div>
      <div className="min-[1400px]:hidden">
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
        <div className="relative mt-8 aspect-[410/450] w-full overflow-hidden">
          <Image
            src={sustainabilityAssets.hands}
            alt="Hands in wheat field"
            fill
            className="object-cover"
            sizes="(max-width: 1399px) 92vw, 410px"
          />
        </div>
      </div>

      <div className="hidden min-[1400px]:grid min-[1400px]:grid-cols-[542px_655px] min-[1400px]:items-start min-[1400px]:justify-between min-[1400px]:gap-0">
        <div className="min-[1400px]:pt-[103px]">
          <h2 className="font-serif text-[61.5px] font-light leading-[56.033px] text-[#2b2e2b]">
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
              partner with tourism suppliers who share our commitment to sustainability and
              responsible travel. We seek those who honor the environment, local communities, and
              ethical practices, from boutique hotels with sustainability certifications to
              restaurants that embrace local, organic sourcing and transportation providers offering
              low-emission travel.
              <br />
              <br />
              Every detail of our curated experiences is designed to harmonize with the world around
              us, ensuring that your journey is not only enriching but also mindful, leaving a
              positive impact on both you and the destinations you explore.
            </p>
          </div>
        </div>

        <div className="relative h-[697px] w-[655px] justify-self-end">
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
    </div>
  );
}
