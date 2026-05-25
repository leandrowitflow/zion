import Image from "next/image";

import { sustainabilityAssets } from "@/lib/assets/sustainability";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Figma "Our Commitment" (2341:9) at 1920px
 * Text 543px left | image 669×704 right, top 70px above title
 */
export function OurCommitmentSection() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="lg:pt-[70px]">
        <SectionHeading before="Our " accent="Commitment" align="left" />
        <div className="text-body space-y-6 lg:mt-0">
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
  );
}
