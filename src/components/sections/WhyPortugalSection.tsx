import Image from "next/image";

import { destinationAssets } from "@/lib/assets/destination";
import { MOBILE_ONLY } from "@/lib/breakpoints";
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

/**
 * Figma mobile (2552:24) | proportional 2-col grid (2337:148, lg+)
 *
 * Single grid layout — images scale with column width (763:531 Figma ratio).
 * At 1300px+ breaks out of site-container gutters like the live site.
 */
export function WhyPortugalSection() {
  return (
    <div>
      {/* Mobile — title → pena → text */}
      <div className={MOBILE_ONLY}>
        {heading}
        <div className="relative mt-8 aspect-[531/708] w-full overflow-hidden">
          <Image
            src={destinationAssets.penaPalace}
            alt="Pena Palace"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 92vw, 531px"
          />
        </div>
        <BodyText className="mt-8" />
      </div>

      {/* lg+ — proportional grid; images shrink with columns, not just the gutter */}
      <div className="hidden lg:block min-[1300px]:relative min-[1300px]:left-1/2 min-[1300px]:w-screen min-[1300px]:max-w-[100vw] min-[1300px]:-translate-x-1/2">
        <div className="mx-auto w-full max-w-[1294px]">
          <div className="grid grid-cols-[763fr_531fr] items-stretch">
            <div>
              {heading}
              <div className="relative ml-[12.06%] mt-[clamp(1.5rem,5vw,80px)] aspect-[542/813] w-[71.04%] overflow-hidden">
                <Image
                  src={destinationAssets.monastery}
                  alt="Jerónimos Monastery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1299px) 38vw, 542px"
                />
              </div>
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="relative aspect-[531/708] w-full shrink-0 overflow-hidden">
                <Image
                  src={destinationAssets.penaPalace}
                  alt="Pena Palace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1299px) 38vw, 531px"
                />
              </div>
              <div className="flex min-h-0 flex-1 flex-col justify-end pt-[clamp(1.5rem,3.5vw,67px)]">
                <BodyText tight className="w-full max-w-[528px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
