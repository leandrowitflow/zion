export const legacyAssets = {
  heroVideo: "/images/legacy/hero-poster.jpg",
  heroVideoSrc: "/videos/legacy-hero.mp4?v=1080",
  video: "/images/legacy/video-poster.jpg",
  videoSrc: "/videos/legacy-video-band.mp4?v=1080",
  essence: "/images/legacy/essence.jpg",
  cta: "/images/legacy/cta.png",
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
