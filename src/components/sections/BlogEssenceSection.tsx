import Image from "next/image";

import { blogAssets } from "@/lib/assets/blog";
import { MOBILE_ONLY, STAGGER_GRID } from "@/lib/breakpoints";

const bodyCopy = (
  <div className="space-y-6 text-body">
    <p>
      At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we believe
      that true luxury lives in depth, silence, culture, and human connection.
    </p>
    <p>
      The Journal of ZION is a curated space where destinations become narratives, where
      craftsmanship meets travel, and where Portugal reveals itself beyond the postcard.
    </p>
  </div>
);

function EssenceHeading() {
  return (
    <h2 className="heading-section text-left text-[#2b2e2b] lg:whitespace-nowrap">
      The essence of the <span className="text-accent">Journal</span>
    </h2>
  );
}

/** Figma 2624:68 — The essence of the Journal */
export function BlogEssenceSection() {
  return (
    <div>
      <div className={MOBILE_ONLY}>
        <EssenceHeading />
        <div className="relative mt-[clamp(2rem,4.6vw,88px)] aspect-[521/586] w-full max-w-[521px] overflow-hidden">
          <Image
            src={blogAssets.essenceFlowers}
            alt="Delicate botanical still life"
            fill
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1023px) 85vw, 521px"
          />
        </div>
        <div className="mt-8">{bodyCopy}</div>
        <div className="relative mt-8 aspect-[591/393] w-full overflow-hidden">
          <Image
            src={blogAssets.essencePicnic}
            alt="Couple relaxing under a tree in Portugal"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 591px"
          />
        </div>
      </div>

      <div className={`${STAGGER_GRID} grid-cols-2 items-stretch gap-x-[clamp(2rem,7vw,128px)]`}>
        <div className="col-span-2 mb-[clamp(2rem,4.6vw,88px)]">
          <EssenceHeading />
        </div>

        <div className="relative ml-[clamp(0px,4.7vw,91px)] aspect-[521/586] w-full max-w-[521px] overflow-hidden">
          <Image
            src={blogAssets.essenceFlowers}
            alt="Delicate botanical still life"
            fill
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1399px) 42vw, 521px"
          />
        </div>

        <div className="flex max-w-[553px] flex-col pt-[clamp(1.5rem,3vw,32px)]">
          <div>{bodyCopy}</div>
          <div className="relative mt-auto aspect-[591/393] w-full max-w-[591px] overflow-hidden">
            <Image
              src={blogAssets.essencePicnic}
              alt="Couple relaxing under a tree in Portugal"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 42vw, 591px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
