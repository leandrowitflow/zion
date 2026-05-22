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
 * Figma desktop (2337:148) | mobile (2552:24) title → pena → text
 */
export function WhyPortugalSection() {
  return (
    <div>
      {/* Mobile / tablet — Figma 2552:24 */}
      <div className="min-[1400px]:hidden">
        {heading}
        <div className="relative mt-8 aspect-[531/708] w-full overflow-hidden">
          <Image
            src={destinationAssets.penaPalace}
            alt="Pena Palace"
            fill
            className="object-cover"
            sizes="(max-width: 1399px) 92vw, 531px"
          />
        </div>
        <p className="mt-8 text-[16px] leading-[28px] text-[#787774]">{bodyCopy}</p>
      </div>

      {/* Desktop — Figma 2337:148 */}
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
