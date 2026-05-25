import Image from "next/image";

import { destinationAssets } from "@/lib/assets/destination";
import { FIGMA_GRID, LAPTOP_GRID, MOBILE_ONLY } from "@/lib/breakpoints";
import { SectionHeading } from "@/components/ui/SectionHeading";

function BodyText({ className = "", tight = false }: { className?: string; tight?: boolean }) {
  return (
    <div
      className={`text-body mb-0 flex flex-col ${tight ? "gap-3" : "gap-7"} ${className}`.trim()}
    >
      <p className="mb-0">
        A country of captivating contrasts, Portugal is where history meets modern sophistication,
        where ancient traditions blend seamlessly with contemporary luxury.
      </p>
      <p className="mb-0">
        At{" "}
        <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we unveil
        Portugal through a curated lens, offering bespoke experiences that immerse you in its culture,
        heritage, and refined beauty.
      </p>
    </div>
  );
}

const heading = <SectionHeading before="Why " accent="Portugal?" align="left" />;

function MonasteryImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[542/813] w-full max-w-[542px] overflow-hidden ${className}`}>
      <Image
        src={destinationAssets.monastery}
        alt="Jerónimos Monastery"
        fill
        className="object-cover"
        sizes="(max-width: 1399px) 42vw, 542px"
      />
    </div>
  );
}

function PenaImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[531/708] w-full max-w-[531px] overflow-hidden ${className}`}>
      <Image
        src={destinationAssets.penaPalace}
        alt="Pena Palace"
        fill
        className="object-cover"
        sizes="(max-width: 1399px) 42vw, 531px"
      />
    </div>
  );
}

/**
 * Figma mobile (2552:24) | laptop 2-col | desktop (2337:148, 1400+)
 */
export function WhyPortugalSection() {
  return (
    <div>
      {/* Mobile — title → pena → text */}
      <div className={MOBILE_ONLY}>
        {heading}
        <PenaImage className="mt-8" />
        <BodyText className="mt-8" />
      </div>

      {/* Laptop — staggered columns with generous gutter */}
      <div className={`${LAPTOP_GRID} grid-cols-2 items-start gap-x-[clamp(2.5rem,8vw,129px)]`}>
        <div>
          {heading}
          <MonasteryImage className="mt-12 ml-[clamp(0px,7vw,92px)]" />
        </div>
        <div className="-mt-1">
          <PenaImage className="ml-auto" />
          <BodyText className="ml-auto mt-[clamp(2.5rem,5vw,67px)] max-w-[528px]" />
        </div>
      </div>

      {/* Desktop — Figma 2337:148; text bottom aligns with monastery bottom */}
      <div className={`${FIGMA_GRID} mx-auto w-full max-w-[1294px] grid-cols-[763fr_531fr] items-stretch`}>
        <div className="flex h-full flex-col">
          {heading}
          <div className="relative mt-[80px] ml-[12.06%] aspect-[542/813] w-[71.04%] overflow-hidden">
            <Image
              src={destinationAssets.monastery}
              alt="Jerónimos Monastery"
              fill
              className="object-cover"
              sizes="542px"
            />
          </div>
        </div>

        <div className="flex h-full min-h-0 flex-col">
          <div className="relative aspect-[531/708] w-full shrink-0 overflow-hidden">
            <Image
              src={destinationAssets.penaPalace}
              alt="Pena Palace"
              fill
              className="object-cover"
              sizes="531px"
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-end pt-[clamp(2rem,3.5vw,67px)]">
            <BodyText tight className="max-w-[528px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
