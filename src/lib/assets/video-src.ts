/** Pairing desktop MP4 with its -mobile.mp4 encode (scripts/generate-mobile-videos.mjs). */
export function mobileVideoSrc(src: string): string {
  const [path, query = ""] = src.split("?");
  return `${path.replace(/\.mp4$/, "-mobile.mp4")}${query ? `?${query}` : ""}`;
}
