import Image from "next/image";

import { destinationAssets } from "@/lib/assets/destination";

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
  <h2 className="font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
    Why <span className="text-[#ba7d7d]">Portugal?</span>
  </h2>
);

/**
 * Figma "Why Portugal?" (2337:148) at 1920px
 * Title + pena top-aligned | monastery +91px, +137px | body 528px bottom-aligned with monastery
 */
export function WhyPortugalSection() {
  return (
    <div>
      {/* Mobile / tablet */}
      <div className="min-[1400px]:hidden">
        <div className="flex items-start justify-between gap-x-4">
          {heading}
          <div className="relative aspect-[531/708] w-[min(48%,531px)] shrink-0 overflow-hidden">
            <Image
              src={destinationAssets.penaPalace}
              alt="Pena Palace"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 48vw, 531px"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 items-end gap-8 md:grid-cols-[minmax(0,542px)_minmax(0,528px)] md:justify-between md:gap-x-8">
          <div className="relative aspect-[542/813] w-full max-w-[542px] overflow-hidden">
            <Image
              src={destinationAssets.monastery}
              alt="Jerónimos Monastery"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 85vw, 542px"
            />
          </div>
          <p className="w-full max-w-[528px] text-[16px] leading-[28px] text-[#787774]">{bodyCopy}</p>
        </div>
      </div>

      {/* Desktop — 2-col grid: title + pena share top; monastery + text share bottom */}
      <div className="hidden min-[1400px]:grid min-[1400px]:grid-cols-[628px_528px] min-[1400px]:gap-x-[128px]">
        <div className="col-start-1 row-start-1 self-start">{heading}</div>

        <div className="relative col-start-2 row-start-1 h-[708px] w-[531px] shrink-0 self-start justify-self-end overflow-hidden">
          <Image
            src={destinationAssets.penaPalace}
            alt="Pena Palace"
            fill
            className="object-cover"
            sizes="531px"
          />
        </div>

        <div className="relative col-start-1 row-start-1 ml-[91px] mt-[137px] h-[813px] w-[542px] overflow-hidden">
          <Image
            src={destinationAssets.monastery}
            alt="Jerónimos Monastery"
            fill
            className="object-cover"
            sizes="542px"
          />
        </div>

        <p className="col-start-2 row-start-1 w-[528px] self-end justify-self-end text-[16px] leading-[28px] text-[#787774]">
          {bodyCopy}
        </p>
      </div>
    </div>
  );
}
