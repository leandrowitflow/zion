import { experiencesAssets } from "@/lib/assets/experiences";

export const destinationAssets = {
  heroVideo: experiencesAssets.heroVideo,
  video: experiencesAssets.heroVideo,
  cta: experiencesAssets.cta,
  monastery: "/images/destination/monastery.jpg",
  penaPalace: "/images/destination/pena-palace.jpg",
  cards: {
    algarve: "/images/destination/algarve.jpg",
    center: "/images/destination/center.jpg",
    north: "/images/destination/north.jpg",
  },
} as const;

export const destinationCards = [
  { image: destinationAssets.cards.algarve, title: "Algarve" },
  { image: destinationAssets.cards.center, title: "Center of Portugal" },
  { image: destinationAssets.cards.north, title: "Porto & North" },
] as const;
