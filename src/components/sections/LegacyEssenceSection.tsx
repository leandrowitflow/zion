import Image from "next/image";

import { legacyAssets } from "@/lib/assets/legacy";
import { MOBILE_ONLY, STAGGER_GRID } from "@/lib/breakpoints";
import { SectionHeading } from "@/components/ui/SectionHeading";

const bodyCopy = (
  <div className="space-y-6 text-body">
    <p>
      At <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, we craft
      events/Incentives that are more than just gatherings, they&apos;re transformative experiences.
      Imagine a corporate retreat at a serene farmhouse, where your team discusses quarterly results in
      an immersive, peaceful environment.
    </p>
    <p>
      Surrounded by nature, these moments of reflection and collaboration are complemented by local
      experiences designed to motivate the soul, whether it&apos;s exploring the landscape, connecting
      with the culture, or engaging in activities that inspire creativity and renewal.
    </p>
    <p>
      From corporate incentives that blend leisure and business to black-tie galas in historic settings,
      we meticulously curate each detail to ensure a holistic and meaningful experience. We harmonize
      sophistication with intention, crafting legacies that linger long after the event ends.
    </p>
    <p>
      With <strong className="font-bold text-foreground">ZION Creative Artisans</strong>, your incentive
      becomes a journey, one where every moment is thoughtfully curated to inspire, connect, and elevate.
      Let&apos;s create an experience that speaks to the heart of your vision and motivates everyone
      involved.
    </p>
    <p>
      <strong className="font-bold text-foreground">Legacy</strong> is where sophistication meets purpose,
      where indulgence harmonizes with intention, and where each meticulously curated detail tells a
      story of exclusivity and meaning.
    </p>
  </div>
);

const heading = (
  <SectionHeading before="The essence of " accent="Legacy" align="left" accentOnNewLine />
);

/**
 * Figma "The essence of Legacy" (2339:286)
 * Left: title + image (542×813, +91px inset) | Right: body text (528px)
 */
export function LegacyEssenceSection() {
  return (
    <div>
      {/* Mobile — title → image → text */}
      <div className={MOBILE_ONLY}>
        {heading}
        <div className="relative mt-8 aspect-[542/813] w-full overflow-hidden">
          <Image
            src={legacyAssets.essence}
            alt="Legacy experience"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 85vw, 542px"
          />
        </div>
        <div className="mt-8">{bodyCopy}</div>
      </div>

      {/* lg+ — Figma staggered columns; image stays in left column */}
      <div
        className={`${STAGGER_GRID} mt-[25px] grid-cols-2 items-start gap-x-[clamp(2rem,7vw,128px)]`}
      >
        <div>
          {heading}
          <div className="relative mt-[clamp(1rem,4vw,37px)] ml-[clamp(0px,4.7vw,91px)] aspect-[542/813] w-full max-w-[542px] overflow-hidden">
            <Image
              src={legacyAssets.essence}
              alt="Legacy experience"
              fill
              className="object-cover"
              sizes="(max-width: 1399px) 42vw, 542px"
            />
          </div>
        </div>

        <div className="max-w-[528px] pt-[clamp(1.5rem,3vw,32px)]">{bodyCopy}</div>
      </div>
    </div>
  );
}
