import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { MOBILE_ONLY } from "@/lib/breakpoints";
import { SectionHeading } from "@/components/ui/SectionHeading";

const heading = <SectionHeading before="Our " accent="Commitment" align="center" className="lg:text-left" />;

const bodyCopy = (
  <div className="text-body space-y-6 text-center lg:text-left">
    <p>
      We create unforgettable experiences while respecting and preserving the world that
      inspires us.
    </p>
    <p>
      At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we
      believe that true luxury is found in the balance between authenticity and
      responsibility. With simplicity as the new sophistication, we are committed to crafting
      extraordinary journeys that honor the places we explore and the people who call them
      Home. Our approach is rooted in sustainable practices, from partnering with responsible
      local providers to supporting communities in meaningful ways.
    </p>
    <p>
      Every detail is thoughtfully designed to ensure that your experience not only leaves a
      lasting impression but also leaves the destination better for future generations. At{" "}
      <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we are
      redefining luxury travel with purpose, ensuring that elegance, mindfulness, and
      consciousness guide every step of the way.
    </p>
  </div>
);

/**
 * Figma mobile (2552:34) | desktop 2-col (2341:9, lg+)
 */
export function OurCommitmentSection() {
  return (
    <div>
      {/* Mobile — heading → centered text → hiking image (2552:34) */}
      <div className={MOBILE_ONLY}>
        {heading}
        <div className="mt-8">{bodyCopy}</div>
        <div className="relative mt-8 aspect-[530/795] w-full overflow-hidden">
          <Image
            src={sustainabilityAssets.hiking}
            alt="Sustainable hiking"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 530px"
          />
        </div>
      </div>

      {/* lg+ — Figma 2341:9 */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="lg:pt-[70px]">
          <SectionHeading before="Our " accent="Commitment" align="left" />
          <div className="text-body space-y-6 lg:mt-0">{bodyCopy}</div>
        </div>

        <div className="relative aspect-[669/704] w-full max-w-[669px] lg:max-w-none lg:justify-self-end">
          <Image
            src={sustainabilityAssets.commitment}
            alt="Fashion editorial"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 85vw, 669px"
          />
        </div>
      </div>
    </div>
  );
}
