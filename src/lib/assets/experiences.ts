const carouselBase = "/images/experiences/carousel";

export const experiencesAssets = {
  heroVideo: "/images/experiences/hero-video.jpg",
  video: "/images/experiences/hero-video.jpg",
  cta: "/images/experiences/cta.jpg",
  sculpture: "/images/experiences/sculpture.jpg",
  lounge: "/images/experiences/lounge.jpg",
  cards: {
    artOfEscape: `${carouselBase}/art-of-escape.png`,
    wild: `${carouselBase}/wild-free.jpg`,
    traditions: `${carouselBase}/timeless-traditions.jpg`,
    serenity: `${carouselBase}/soul-serenity.png`,
    taste: `${carouselBase}/essence-of-taste.jpg`,
  },
} as const;

/** Order and titles match zion-creativeartisans.com/?page_id=21335 */
export const experienceCategories = [
  {
    id: "art-of-escape",
    image: experiencesAssets.cards.artOfEscape,
    title: "The Art of Escape",
    objectPosition: "object-[center_35%]",
  },
  {
    id: "wild-free",
    image: experiencesAssets.cards.wild,
    title: "Wild & Free",
    objectPosition: "object-center",
  },
  {
    id: "timeless-traditions",
    image: experiencesAssets.cards.traditions,
    title: "Timeless Traditions",
    objectPosition: "object-left",
  },
  {
    id: "soul-serenity",
    image: experiencesAssets.cards.serenity,
    title: "Soul & Serenity",
    objectPosition: "object-[center_20%]",
  },
  {
    id: "essence-of-taste",
    image: experiencesAssets.cards.taste,
    title: "The Essence of Taste",
    objectPosition: "object-center",
  },
] as const;
