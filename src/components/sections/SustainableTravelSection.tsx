import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { MOBILE_ONLY } from "@/lib/breakpoints";
import { SectionHeading } from "@/components/ui/SectionHeading";

const heading = (
  <SectionHeading before="Sustainable " accent="Travel" align="center" className="lg:text-left" />
);

const bodyCopy = (
  <p className="text-body mx-auto max-w-[543px] text-center lg:mx-0 lg:text-left">
    At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we curate journeys that
    marry elegance with responsibility, where every experience is thoughtfully designed to honor both the
    traveler and the destination.
    <br />
    <br />
    By choosing conscious luxury, you become part of a movement that values sustainability, preserving the
    beauty and authenticity of the world. Each carefully crafted journey reflects our commitment to creating
    meaningful, unforgettable moments while ensuring a lasting, positive impact on the environment and local
    communities.
  </p>
);

/**
 * Figma mobile (2552:34) | proportional 2-col grid (2341:10, lg+)
 *
 * Picnic sits at the bottom of the right column (mt-auto + 180px gap) so it stays
 * low on large screens and scales down with the column instead of jumping up early.
 */
export function SustainableTravelSection() {
  return (
    <div>
      <div className={MOBILE_ONLY}>
        {heading}
        <div className="mt-8">{bodyCopy}</div>
        <div className="relative mt-8 aspect-[620/413] w-full overflow-hidden">
          <Image
            src={sustainabilityAssets.picnic}
            alt="Orchard picnic"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 620px"
          />
        </div>
      </div>

      {/* lg+ — Figma 2341:10; 530:620 column ratio, picnic anchored to column bottom */}
      <div className="hidden lg:block min-[1300px]:relative min-[1300px]:left-1/2 min-[1300px]:w-screen min-[1300px]:max-w-[100vw] min-[1300px]:-translate-x-1/2">
        <div className="mx-auto w-full max-w-[1278px]">
          <div className="grid grid-cols-[530fr_620fr] items-stretch gap-x-[clamp(2rem,10vw,128px)]">
            <div className="relative aspect-[530/795] w-full self-start overflow-hidden">
              <Image
                src={sustainabilityAssets.hiking}
                alt="Sustainable hiking"
                fill
                className="object-cover"
                sizes="(max-width: 1299px) 38vw, 530px"
              />
            </div>

            <div className="flex min-h-0 flex-col pt-[3px]">
              {heading}
              {bodyCopy}
              <div className="flex min-h-0 flex-1 flex-col justify-end pt-[clamp(2rem,9.4vw,180px)]">
                <div className="relative aspect-[620/413] w-full overflow-hidden">
                  <Image
                    src={sustainabilityAssets.picnic}
                    alt="Orchard picnic"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1299px) 45vw, 620px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
