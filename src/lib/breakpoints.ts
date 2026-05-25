/**
 * Layout breakpoints aligned with Figma artboards.
 *
 * - Mobile frames (2552:*): ~449px wide → stack below `lg`
 * - Laptop / portable: `lg` (1024) – staggered 2-col, no absolute collages
 * - Figma desktop (1920): `figma` (1400) – proportional collages & exact offsets
 */
export const BP_LG = 1024;
export const BP_XL = 1280;
export const BP_FIGMA = 1400;

/** Tailwind class: show only below lg (mobile Figma) */
export const MOBILE_ONLY = "lg:hidden";

/** Tailwind class: laptop staggered layout lg–1399px (range, avoids lg vs min-[1400px] conflict) */
export const LAPTOP_UP = "hidden lg:max-[1399px]:block";

/** Tailwind class: full Figma layout at 1400px+ */
export const FIGMA_UP = "hidden min-[1400px]:block";

/** Tailwind class: grid variant for laptop lg–1399px */
export const LAPTOP_GRID = "hidden lg:max-[1399px]:grid";

/** Tailwind class: grid variant for Figma desktop 1400px+ */
export const FIGMA_GRID = "hidden min-[1400px]:grid";

/** Tailwind class: staggered 2-col from lg upward (Figma side-by-side, no overlap) */
export const STAGGER_GRID = "hidden lg:grid";
