"use client";

import Image from "next/image";

import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { partnerLogos } from "@/lib/assets/partners";

const marqueeLogos = [...partnerLogos, ...partnerLogos];

export function PartnersCarousel() {
  return (
    <SiteSection>
      <SiteContainer>
        <p className="text-center font-serif text-[19.957px] leading-[19px] text-[#2b2e2b]">
          Check Our Partners
        </p>

        <div className="partners-marquee mt-9 overflow-hidden">
          <div className="partners-marquee-track flex w-max items-end gap-[clamp(24px,4vw,72px)]">
            {marqueeLogos.map((partner, index) => (
              <Image
                key={`${partner.id}-${index}`}
                src={partner.image}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                aria-hidden={index >= partnerLogos.length}
                className="h-[clamp(72px,11vw,180px)] w-auto shrink-0 object-contain object-bottom"
                sizes="(max-width: 1400px) 20vw, 220px"
              />
            ))}
          </div>
        </div>
      </SiteContainer>
    </SiteSection>
  );
}
