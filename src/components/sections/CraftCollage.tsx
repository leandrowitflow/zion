import Image from "next/image";
import { homeAssets } from "@/lib/assets/home";

/**
 * Figma "Craft a Destination" collage (2306:56)
 * Bounding box 657×696 — pool 441×587, bust 410×450 with overlap.
 */
export function CraftCollage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-[657/696] w-full max-w-[657px] min-[1400px]:mx-0 min-[1400px]:max-w-none ${className}`.trim()}
    >
      <div className="absolute right-0 top-0 h-[84.34%] w-[67.12%] overflow-hidden">
        <Image
          src={homeAssets.craftPool}
          alt="Poolside luxury"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 67vw, 441px"
        />
      </div>
      <div className="absolute bottom-0 left-0 h-[64.66%] w-[62.41%] overflow-hidden">
        <Image
          src={homeAssets.craftBust}
          alt="Classical sculpture"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 62vw, 410px"
        />
      </div>
    </div>
  );
}
