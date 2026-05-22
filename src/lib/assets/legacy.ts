import { experiencesAssets } from "@/lib/assets/experiences";

export const legacyAssets = {
  heroVideo: experiencesAssets.heroVideo,
  video: experiencesAssets.heroVideo,
  essence: "/images/legacy/essence.jpg",
  cta: "/images/experiences/cta.jpg",
  cards: {
    circle: "/images/legacy/circle.jpg",
    sanctum: "/images/legacy/sanctum.jpg",
    affair: "/images/legacy/affair.jpg",
  },
} as const;

export const legacyCards = [
  { image: legacyAssets.cards.circle, title: "The Circle of Influence" },
  { image: legacyAssets.cards.sanctum, title: "The Executive Sanctum" },
  { image: legacyAssets.cards.affair, title: "The Grand Affair" },
] as const;
