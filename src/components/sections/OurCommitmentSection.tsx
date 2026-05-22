import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";

/**
 * Figma "Our Commitment" (2341:9) at 1920px
 * Text 543px left | image 669×704 right, top 70px above title
 */
export function OurCommitmentSection() {
  return (
    <div className="grid grid-cols-1 gap-8 min-[1400px]:grid-cols-[543px_669px] min-[1400px]:items-start min-[1400px]:justify-between min-[1400px]:gap-0">
      <div className="min-[1400px]:pt-[70px]">
        <h2 className="font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
          Our <span className="text-[#ba7d7d]">Commitment</span>
        </h2>
        <div className="mt-[25px] space-y-6 text-[16px] leading-[28px] text-[#787774] min-[1400px]:mt-[25px]">
          <p>
            We create unforgettable experiences while respecting and preserving the world that
            inspires us.
          </p>
          <p>
            At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we
            believe that true luxury is found in the balance between authenticity and
            responsibility. With simplicity as the new sophistication, we are committed to crafting
            extraordinary journeys that honor the places we explore and the people who call them
            Home. Our approach is rooted in sustainable practices, from partnering with responsible
            local providers to supporting communities in meaningful ways.
          </p>
          <p>
            Every detail is thoughtfully designed to ensure that your experience not only leaves a
            lasting impression but also leaves the destination better for future generations. At{" "}
            <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we are
            redefining luxury travel with purpose, ensuring that elegance, mindfulness, and
            consciousness guide every step of the way.
          </p>
        </div>
      </div>

      <div className="relative aspect-[669/704] w-full min-[1400px]:h-[704px] min-[1400px]:w-[669px] min-[1400px]:max-w-none min-[1400px]:justify-self-end">
        <Image
          src={sustainabilityAssets.commitment}
          alt="Fashion editorial"
          fill
          className="object-cover"
          sizes="(max-width: 1399px) 85vw, 669px"
        />
      </div>
    </div>
  );
}
