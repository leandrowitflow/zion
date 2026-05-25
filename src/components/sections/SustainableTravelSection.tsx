import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { FIGMA_GRID, LAPTOP_GRID, MOBILE_ONLY } from "@/lib/breakpoints";

const heading = (
  <h2 className="heading-section text-[#2b2e2b]">
    Sustainable <span className="text-[#ba7d7d]">Travel</span>
  </h2>
);

const bodyCopy = (
  <p className="mt-[25px] max-w-[543px] text-[16px] leading-[28px] text-[#787774]">
    At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we curate journeys that
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

function PicnicImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[620/413] w-full max-w-[620px] overflow-hidden ${className}`}>
      <Image
        src={sustainabilityAssets.picnic}
        alt="Orchard picnic"
        fill
        className="object-cover"
        sizes="(max-width: 1399px) 45vw, 620px"
      />
    </div>
  );
}

function HikingImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[530/795] w-full max-w-[530px] overflow-hidden ${className}`}>
      <Image
        src={sustainabilityAssets.hiking}
        alt="Sustainable hiking"
        fill
        className="object-cover"
        sizes="(max-width: 1399px) 42vw, 530px"
      />
    </div>
  );
}

/**
 * Figma mobile (2552:34) | laptop 2-col | desktop offset picnic (2341:10, 1400+)
 */
export function SustainableTravelSection() {
  return (
    <div>
      <div className={MOBILE_ONLY}>
        {heading}
        {bodyCopy}
        <PicnicImage className="mt-6" />
        <HikingImage className="mt-6" />
      </div>

      {/* Laptop — hiking left | content + picnic right */}
      <div className={`${LAPTOP_GRID} grid-cols-2 items-start gap-x-12`}>
        <HikingImage />
        <div>
          {heading}
          {bodyCopy}
          <PicnicImage className="mt-8" />
        </div>
      </div>

      {/* Desktop — Figma 2341:10 with picnic offset below text */}
      <div className={`${FIGMA_GRID} grid-cols-2 items-start gap-x-16`}>
        <div className="relative h-[795px] w-[530px] shrink-0 overflow-hidden">
          <Image
            src={sustainabilityAssets.hiking}
            alt="Sustainable hiking"
            fill
            className="object-cover"
            sizes="530px"
          />
        </div>
        <div className="pt-[3px]">
          {heading}
          {bodyCopy}
          <PicnicImage className="mt-[180px]" />
        </div>
      </div>
    </div>
  );
}
