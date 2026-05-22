export const experiencesAssets = {
  heroVideo: "/images/experiences/hero-video.jpg",
  video: "/images/experiences/hero-video.jpg",
  cta: "/images/experiences/cta.jpg",
  sculpture: "/images/experiences/sculpture.jpg",
  lounge: "/images/experiences/lounge.jpg",
  cards: {
    wild: "/images/experiences/wild-free.jpg",
    traditions: "/images/experiences/timeless-traditions.jpg",
    serenity: "/images/experiences/soul-serenity.jpg",
    taste: "/images/experiences/essence-taste.jpg",
  },
} as const;

export const experienceCategories = [
  { image: experiencesAssets.cards.wild, title: "Wild & Free", objectPosition: "object-center" },
  {
    image: experiencesAssets.cards.traditions,
    title: "Timeless Traditions",
    objectPosition: "object-left",
  },
  {
    image: experiencesAssets.cards.serenity,
    title: "Soul & Serenity",
    objectPosition: "object-[center_20%]",
  },
  { image: experiencesAssets.cards.taste, title: "The Essence of Taste", objectPosition: "object-center" },
] as const;
