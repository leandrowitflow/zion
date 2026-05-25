const carouselBase = "/images/destination/carousel";

export const destinationAssets = {
  heroVideo: "/images/destination/hero-poster.jpg",
  heroVideoSrc: "/videos/destination-hero.mp4?v=1080",
  video: "/images/destination/video-poster.jpg",
  videoSrc: "/videos/destination-video-band.mp4?v=1080",
  cta: "/images/destination/cta.jpg",
  monastery: "/images/destination/monastery.jpg",
  penaPalace: "/images/destination/pena-palace.jpg",
  cards: {
    algarve: `${carouselBase}/algarve.png`,
    center: `${carouselBase}/center.png`,
    north: `${carouselBase}/north.jpg`,
  },
} as const;

/** Order and titles match zion-creativeartisans.com/?page_id=17920 */
export const destinationCards = [
  { id: "lisbon-coast", image: `${carouselBase}/lisbon-coast.png`, title: "Lisbon & Coast" },
  { id: "alentejo", image: `${carouselBase}/alentejo.png`, title: "Alentejo" },
  { id: "islands", image: `${carouselBase}/islands.jpg`, title: "Islands" },
  { id: "algarve", image: `${carouselBase}/algarve.png`, title: "Algarve" },
  { id: "center", image: `${carouselBase}/center.png`, title: "Center of Portugal" },
  { id: "north", image: `${carouselBase}/north.jpg`, title: "Porto & North" },
] as const;
