import Image from "next/image";
import { artisansAssets } from "@/lib/assets/artisans";

/** Figma 2551:20 — collage 630×578; sculpture 506×450; gallery 406×272 */
export function ArtisansCollage() {
  return (
    <div className="relative mx-auto aspect-[630/578] w-full max-w-[630px] lg:mx-0 lg:max-w-none">
      <div className="absolute right-0 top-0 h-[77.85%] w-[80.32%] overflow-hidden">
        <Image
          src={artisansAssets.sculpture}
          alt="Sculpture"
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 506px"
        />
      </div>
      <div className="absolute bottom-0 left-0 h-[47.06%] w-[64.44%] overflow-hidden shadow-xl">
        <Image
          src={artisansAssets.gallery}
          alt="Gallery visit"
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 80vw, 406px"
        />
      </div>
    </div>
  );
}
