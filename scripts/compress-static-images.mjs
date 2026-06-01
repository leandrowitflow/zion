import { renameSync, statSync, unlinkSync } from "node:fs";
import sharp from "sharp";

/** Recompress JPEGs in place — same dimensions, smaller files. */
const targets = [
  { path: "public/images/home/hero-video-poster.jpg", quality: 80 },
  { path: "public/images/home/sustainability-poster.jpg", quality: 80 },
  { path: "public/images/home/window.jpg", quality: 82 },
  { path: "public/images/home/people.jpg", quality: 82 },
  { path: "public/images/home/craft-bust.jpg", quality: 82 },
];

for (const { path, quality } of targets) {
  const meta = await sharp(path).metadata();
  if (meta.format !== "jpeg") {
    console.log(`Skip ${path} (${meta.format})`);
    continue;
  }

  const before = statSync(path).size;
  const temp = `${path}.tmp`;
  await sharp(path).jpeg({ quality, mozjpeg: true }).toFile(temp);
  unlinkSync(path);
  renameSync(temp, path);
  const after = statSync(path).size;
  console.log(`${path}: ${before} → ${after} bytes`);
}

console.log("Done.");
