import { existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename, join } from "node:path";

const VIDEOS_DIR = join(import.meta.dirname, "../public/videos");

/** 720p H.264, no audio — same look on phone screens, much smaller files. */
function encodeMobile(inputPath, outputPath) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      inputPath,
      "-vf",
      "scale='min(720,iw)':-2",
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "medium",
      "-movflags",
      "+faststart",
      "-an",
      outputPath,
    ],
    { stdio: "inherit" },
  );
}

const sources = [
  "home-hero.mp4",
  "home-sustainability.mp4",
  "destination-hero.mp4",
  "experiences-hero.mp4",
  "legacy-hero.mp4",
  "sustainability-hero.mp4",
  "artisans-hero.mp4",
  "destination-video-band.mp4",
  "experiences-video-band.mp4",
  "legacy-video-band.mp4",
  "sustainability-video-band.mp4",
  "artisans-video-band.mp4",
];

for (const file of sources) {
  const input = join(VIDEOS_DIR, file);
  if (!existsSync(input)) {
    console.warn(`Skip missing: ${file}`);
    continue;
  }

  const mobileName = file.replace(/\.mp4$/, "-mobile.mp4");
  const output = join(VIDEOS_DIR, mobileName);
  const before = statSync(input).size;

  console.log(`\nEncoding ${file} → ${mobileName}`);
  encodeMobile(input, output);

  const after = statSync(output).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${basename(mobileName)}: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (${pct}% smaller)`);
}

console.log("\nMobile videos ready.");
