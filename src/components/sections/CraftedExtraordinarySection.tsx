import Image from "next/image";

import { experiencesAssets } from "@/lib/assets/experiences";
import { FIGMA_UP, LAPTOP_GRID, MOBILE_ONLY } from "@/lib/breakpoints";
import { SectionHeading } from "@/components/ui/SectionHeading";

const bodyCopy = (
  <p className="text-body">
    At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we don&apos;t offer
    ordinary travel experiences, we create immersive, bespoke journeys that awaken the senses, inspire the
    soul, and redefine luxury. From the hidden corners of Portugal to the most exclusive venues, our curated
    experiences are designed to reflect sophistication, authenticity, and pure indulgence.
  </p>
);

const heading = (
  <SectionHeading
    before="Crafted for the"
    accent="Extraordinary"
    align="left"
    accentOnNewLine
    className="lg:text-left"
  />
);

/**
 * Figma mobile (2552:25) | laptop stagger (lg–1399) | desktop collage (2337:44, 1400+)
 */
export function CraftedExtraordinarySection() {
  return (
    <div>
      {/* Mobile — Figma 2552:25 */}
      <div className={MOBILE_ONLY}>
        <SectionHeading
          before="Crafted for the"
          accent="Extraordinary"
          accentOnNewLine
        />
        <div className="relative mx-auto mt-8 aspect-[520/630] w-full max-w-[520px] overflow-hidden">
          <Image
            src={experiencesAssets.sculpture}
            alt="Sculpture in gallery"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 92vw, 520px"
          />
        </div>
        <div className="mt-8">{bodyCopy}</div>
      </div>

      {/* Laptop — title + lounge | sculpture + text */}
      <div className={`${LAPTOP_GRID} grid-cols-2 items-start gap-x-10 gap-y-8`}>
        <div className="flex flex-col gap-8">
          {heading}
          <div className="relative ml-[clamp(0px,9vw,91px)] aspect-[410/568] w-full max-w-[410px] overflow-hidden">
            <Image
              src={experiencesAssets.lounge}
              alt="Luxury lounge experience"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 40vw, 410px"
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="relative ml-auto aspect-[520/630] w-full max-w-[520px] overflow-hidden">
            <Image
              src={experiencesAssets.sculpture}
              alt="Sculpture in gallery"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 40vw, 520px"
            />
          </div>
          {bodyCopy}
        </div>
      </div>

      {/* Desktop — Figma 2337:44; right column stacks sculpture + text aligned */}
      <div
        className={`relative mx-auto w-full max-w-[1289px] min-h-[clamp(620px,64.6vw,833px)] overflow-hidden ${FIGMA_UP}`}
      >
        <SectionHeading
          before="Crafted for the"
          accent="Extraordinary"
          align="left"
          accentOnNewLine
          className="absolute left-0 top-0 z-10 max-w-[401px]"
        />

        <div className="absolute left-[17.2%] top-[31.8%] h-[68.2%] w-[31.8%] max-h-[568px] max-w-[410px] overflow-hidden">
          <Image
            src={experiencesAssets.lounge}
            alt="Luxury lounge experience"
            fill
            className="object-cover"
            sizes="410px"
          />
        </div>

        <div className="absolute right-0 top-0 flex w-full max-w-[520px] flex-col gap-6">
          <div className="relative aspect-[520/630] w-full overflow-hidden">
            <Image
              src={experiencesAssets.sculpture}
              alt="Sculpture in gallery"
              fill
              className="object-cover"
              sizes="520px"
            />
          </div>
          {bodyCopy}
        </div>
      </div>
    </div>
  );
}
