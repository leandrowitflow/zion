import Image from "next/image";

import { destinationAssets } from "@/lib/assets/destination";
import { MOBILE_ONLY, STAGGER_GRID } from "@/lib/breakpoints";

const bodyCopy = (
  <>
    A country of captivating contrasts, Portugal is where history meets modern sophistication,
    where ancient traditions blend seamlessly with contemporary luxury. At{" "}
    <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we unveil
    Portugal through a curated lens, offering bespoke experiences that immerse you in its culture,
    heritage, and refined beauty.
  </>
);

const heading = (
  <h2 className="heading-section text-[#2b2e2b]">
    Why <span className="text-[#ba7d7d]">Portugal?</span>
  </h2>
);

/**
 * Figma mobile (2552:24) stacked | desktop (2337:148) staggered 2-col — not overlapping.
 * Pena sits higher in the right column; monastery drops below the title on the left.
 */
export function WhyPortugalSection() {
  return (
    <div>
      {/* Mobile — title → pena → text */}
      <div className={MOBILE_ONLY}>
        {heading}
        <div className="relative mt-8 aspect-[531/708] w-full overflow-hidden">
          <Image
            src={destinationAssets.penaPalace}
            alt="Pena Palace"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 92vw, 531px"
          />
        </div>
        <p className="mt-8 text-[16px] leading-[28px] text-[#787774]">{bodyCopy}</p>
      </div>

      {/* lg+ — Figma 2337:148 staggered columns (fluid, no grid overlap) */}
      <div
        className={`${STAGGER_GRID} grid-cols-2 items-start gap-x-[clamp(2rem,7vw,128px)]`}
      >
        <div>
          {heading}
          <div className="relative mt-[clamp(1.5rem,7vw,137px)] ml-[clamp(0px,4.7vw,91px)] aspect-[542/813] w-full max-w-[542px] overflow-hidden">
            <Image
              src={destinationAssets.monastery}
              alt="Jerónimos Monastery"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 42vw, 542px"
            />
          </div>
        </div>

        <div>
          <div className="relative ml-auto aspect-[531/708] w-full max-w-[531px] overflow-hidden">
            <Image
              src={destinationAssets.penaPalace}
              alt="Pena Palace"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 42vw, 531px"
            />
          </div>
          <p className="ml-auto mt-8 max-w-[528px] text-[16px] leading-[28px] text-[#787774]">
            {bodyCopy}
          </p>
        </div>
      </div>
    </div>
  );
}
