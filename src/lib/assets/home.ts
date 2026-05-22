export const homeAssets = {
  logo: "/images/home/logo.png",
  navUnderline: "/images/home/nav-underline.png",
  heroVideo: "/images/home/hero-video.jpg",
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

/** Figma Header (2265:250) nav item specs at 1920px */
export const headerNavItems = [
  { label: "Home", href: "/", fontSize: 15, lineHeight: 12, color: "#2b3433" },
  { label: "The Artisans", href: "/the-artisans", fontSize: 14, lineHeight: 13, color: "#302820" },
  { label: "Experiences", href: "/experiences", fontSize: 14, lineHeight: 17, color: "#272f2d" },
  { label: "Legacy", href: "/legacy", fontSize: 14, lineHeight: 17, color: "#242a2a" },
  { label: "Destination", href: "/destination", fontSize: 14, lineHeight: 19, color: "#262826" },
  { label: "Sustainability", href: "/sustainability", fontSize: 14, lineHeight: 19, color: "#262826" },
  { label: "Ignite Us", href: "/ignite-us", fontSize: 14, lineHeight: 19, color: "#262826" },
] as const;
