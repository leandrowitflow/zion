export const homeAssets = {
  logo: "/images/home/logo.png",
  navUnderline: "/images/home/nav-underline.png",
  heroVideo: "/images/experiences/hero-video.jpg",
  heroVideoSrc: "/videos/home-hero.mp4",
  window: "/images/home/window.jpg",
  people: "/images/home/people.jpg",
  destinations: "/images/home/destinations.jpg",
  experiences: "/images/home/experiences.jpg",
  craftPool: "/images/home/craft-pool.jpg",
  craftBust: "/images/home/craft-bust.jpg",
  sustainability: "/images/home/sustainability.jpg",
  asta: "/images/home/asta.png",
  savoy: "/images/home/savoy.png",
  vilaVitaParc: "/images/home/vila-vita-parc.png",
  scroller: "/images/home/scroller.png",
} as const;

/** Header + footer navigation labels */
export const headerNavItems = [
  { label: "Home", href: "/" },
  { label: "The Artisans", href: "/the-artisans" },
  { label: "Experiences", href: "/experiences" },
  { label: "Legacy", href: "/legacy" },
  { label: "Destination", href: "/destination" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Ignite Us", href: "/ignite-us" },
] as const;
