import sharp from "sharp";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SOURCE = join(ROOT, "public/Logos/ZION/Favicon-01.png");
const PUBLIC = join(ROOT, "public");

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Detect non-background logo bounds. */
async function findLogoBounds(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const [br, bg, bb] = [data[0], data[1], data[2]];

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (
        Math.abs(r - br) > 25 ||
        Math.abs(g - bg) > 25 ||
        Math.abs(b - bb) > 25
      ) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return { minX, minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function sampleCornerColor(data, width, channels, x, y) {
  const i = (y * width + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
}

function makeBackgroundTransparent(data, info, threshold = 28) {
  const { width, height, channels } = info;
  const corners = [
    sampleCornerColor(data, width, channels, 0, 0),
    sampleCornerColor(data, width, channels, width - 1, 0),
    sampleCornerColor(data, width, channels, 0, height - 1),
    sampleCornerColor(data, width, channels, width - 1, height - 1),
  ];

  const bg = corners.reduce(
    (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
    [0, 0, 0],
  ).map((v) => Math.round(v / corners.length));

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (
      Math.abs(r - bg[0]) <= threshold &&
      Math.abs(g - bg[1]) <= threshold &&
      Math.abs(b - bg[2]) <= threshold
    ) {
      data[i + 3] = 0;
    }
  }
}

async function buildSquareLogoBuffer(input, paddingRatio = 0.08) {
  const bounds = await findLogoBounds(input);
  const padX = Math.round(bounds.width * paddingRatio);
  const padY = Math.round(bounds.height * paddingRatio);

  let left = bounds.minX - padX;
  let top = bounds.minY - padY;
  let cropW = bounds.width + padX * 2;
  let cropH = bounds.height + padY * 2;

  const square = Math.max(cropW, cropH);
  left = Math.round(left - (square - cropW) / 2);
  top = Math.round(top - (square - cropH) / 2);

  const meta = await sharp(input).metadata();
  left = Math.max(0, left);
  top = Math.max(0, top);
  cropW = Math.min(square, meta.width - left);
  cropH = Math.min(square, meta.height - top);

  const cropped = await sharp(input)
    .extract({ left, top, width: cropW, height: cropH })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = cropped;
  makeBackgroundTransparent(data, info);

  const side = Math.max(info.width, info.height);
  return sharp(data, { raw: info })
    .resize(side, side, {
      fit: "contain",
      background: TRANSPARENT,
    })
    .png()
    .toBuffer();
}

async function writeFavicons(source, prefix = "") {
  const logo = await buildSquareLogoBuffer(source);
  const sizes = [
    { file: `${prefix}favicon-16x16.png`, size: 16 },
    { file: `${prefix}favicon-32x32.png`, size: 32 },
    { file: `${prefix}favicon-48x48.png`, size: 48 },
    { file: `${prefix}favicon-64x64.png`, size: 64 },
    { file: `${prefix}apple-touch-icon.png`, size: 180 },
  ];

  for (const { file, size } of sizes) {
    await sharp(logo)
      .resize(size, size, {
        fit: "contain",
        background: TRANSPARENT,
      })
      .png()
      .toFile(join(PUBLIC, file));
  }

  await sharp(logo)
    .resize(32, 32, {
      fit: "contain",
      background: TRANSPARENT,
    })
    .png()
    .toFile(join(PUBLIC, `${prefix}favicon.ico`));
}

await writeFavicons(SOURCE);
console.log("Favicons generated in public/");
