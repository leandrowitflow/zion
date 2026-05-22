import Image from "next/image";

import { legacyAssets } from "@/lib/assets/legacy";

/**
 * Figma "The essence of Legacy" (2339:286) at 1920px
 * Title x=315 | image 542×813 at x=406 (+91px) | body 528px at x=1076 | gap 128px
 */
export function LegacyEssenceSection() {
  return (
    <div>
      <h2 className="font-serif text-4xl font-light leading-tight text-[#2b2e2b] md:text-[61.5px] md:leading-[56.033px]">
        The essence of <span className="text-[#ba7d7d]">Legacy</span>
      </h2>

      <div className="mt-[37px] grid grid-cols-1 items-start gap-12 min-[1400px]:mt-[25px] min-[1400px]:grid-cols-[628px_528px] min-[1400px]:gap-x-[128px]">
        <div className="relative ml-[clamp(2rem,17vw,91px)] aspect-[542/813] w-full max-w-[542px] min-[1400px]:ml-[91px] min-[1400px]:h-[813px] min-[1400px]:w-[542px]">
          <Image
            src={legacyAssets.essence}
            alt="Legacy experience"
            fill
            className="object-cover"
            sizes="(max-width: 1399px) 85vw, 542px"
          />
        </div>

        <div className="max-w-[528px] space-y-6 text-[16px] leading-[28px] text-[#787774] min-[1400px]:pt-8">
          <p>
            At <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, we craft
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
            With <strong className="font-bold text-[#787774]">ZION Creative Artisans</strong>, your incentive
            becomes a journey, one where every moment is thoughtfully curated to inspire, connect, and elevate.
            Let&apos;s create an experience that speaks to the heart of your vision and motivates everyone
            involved.
          </p>
          <p>
            <strong className="font-bold text-[#787774]">Legacy</strong> is where sophistication meets purpose,
            where indulgence harmonizes with intention, and where each meticulously curated detail tells a
            story of exclusivity and meaning.
          </p>
        </div>
      </div>
    </div>
  );
}
