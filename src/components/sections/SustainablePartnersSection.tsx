import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { FIGMA_GRID, LAPTOP_GRID, MOBILE_ONLY } from "@/lib/breakpoints";
import { SectionHeading } from "@/components/ui/SectionHeading";

const partnersHeading = (
  <SectionHeading before="Sustainable " accent="Partners" align="left" />
);

const partnersCopy = (
  <div className="text-body space-y-6">
    <p>
      <strong className="font-bold text-foreground">
        &ldquo;We collaborate with those who share our vision for a more sustainable world.&rdquo;
      </strong>
    </p>
    <p>
      At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we partner with
      tourism suppliers who share our commitment to sustainability and responsible travel. We seek those who
      honor the environment, local communities, and ethical practices, from boutique hotels with sustainability
      certifications to restaurants that embrace local, organic sourcing and transportation providers offering
      low-emission travel.
      <br />
      <br />
      Every detail of our curated experiences is designed to harmonize with the world around us, ensuring that
      your journey is not only enriching but also mindful, leaving a positive impact on both you and the
      destinations you explore.
    </p>
  </div>
);

/**
 * Figma mobile (2552:34) | laptop text + single image | desktop collage (2341:19, 1400+)
 */
export function SustainablePartnersSection() {
  return (
    <div>
      <div className={MOBILE_ONLY}>
        {partnersHeading}
        {partnersCopy}
        <div className="relative mt-8 aspect-[410/450] w-full overflow-hidden">
          <Image
            src={sustainabilityAssets.hands}
            alt="Hands in wheat field"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 92vw, 410px"
          />
        </div>
      </div>

      {/* Laptop — text + hands only (no overlapping collage) */}
      <div className={`${LAPTOP_GRID} grid-cols-2 items-start gap-x-12`}>
        <div className="pt-[clamp(0px,5vw,103px)]">
          {partnersHeading}
          {partnersCopy}
        </div>
        <div className="relative aspect-[410/450] w-full max-w-[410px] justify-self-end overflow-hidden">
          <Image
            src={sustainabilityAssets.hands}
            alt="Hands in wheat field"
            fill
            className="object-cover"
            sizes="(max-width: 1399px) 40vw, 410px"
          />
        </div>
      </div>

      {/* Desktop — Figma 2341:19 collage */}
      <div className={`${FIGMA_GRID} grid-cols-[542px_655px] items-start justify-between gap-0`}>
        <div className="pt-[103px]">
          {partnersHeading}
          {partnersCopy}
        </div>

        <div className="relative h-[697px] w-[655px] shrink-0 justify-self-end">
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
