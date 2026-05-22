import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";

const heading = (
  <h2 className="font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
    Sustainable <span className="text-[#ba7d7d]">Travel</span>
  </h2>
);

const bodyCopy = (
  <p className="mt-[25px] max-w-[543px] text-[16px] leading-[28px] text-[#787774]">
    At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we curate
    journeys that marry elegance with responsibility, where every experience is thoughtfully designed
    to honor both the traveler and the destination.
    <br />
    <br />
    By choosing conscious luxury, you become part of a movement that values sustainability,
    preserving the beauty and authenticity of the world. Each carefully crafted journey reflects our
    commitment to creating meaningful, unforgettable moments while ensuring a lasting, positive impact
    on the environment and local communities.
  </p>
);

function PicnicImage() {
  return (
    <div className="relative mt-6 aspect-[620/413] w-full max-w-[620px] overflow-hidden min-[1400px]:mt-[180px] min-[1400px]:h-[413px] min-[1400px]:w-[620px]">
      <Image
        src={sustainabilityAssets.picnic}
        alt="Orchard picnic"
        fill
        className="object-cover"
        sizes="(max-width: 1399px) 85vw, 620px"
      />
    </div>
  );
}

/**
 * Figma "Sustainable Travel" (2341:10) at 1920px
 * Hiking 530×795 top-aligned with title | text 543px + picnic 620×413 right | gap 128px
 */
export function SustainableTravelSection() {
  return (
    <div>
      {/* Mobile / tablet — title + hiking share top row */}
      <div className="min-[1400px]:hidden">
        <div className="flex items-start justify-between gap-x-4">
          {heading}
          <div className="relative aspect-[530/795] w-[min(48%,530px)] shrink-0 overflow-hidden">
            <Image
              src={sustainabilityAssets.hiking}
              alt="Sustainable hiking"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 48vw, 530px"
            />
          </div>
        </div>
        {bodyCopy}
        <PicnicImage />
      </div>

      {/* Desktop — hiking left, content right, top-aligned */}
      <div className="hidden min-[1400px]:grid min-[1400px]:grid-cols-[530px_1fr] min-[1400px]:items-start min-[1400px]:gap-x-[128px]">
        <div className="relative h-[795px] w-[530px] overflow-hidden">
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
          <PicnicImage />
        </div>
      </div>
    </div>
  );
}
