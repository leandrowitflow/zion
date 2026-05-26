import { legacyAssets } from "@/lib/assets/legacy";

export type LegacyItem = {
  slug: string;
  title: string;
  image: string;
  body: string[];
};

export const legacyItems: LegacyItem[] = [
  {
    slug: "the-circle-of-influence",
    title: "The Circle of Influence",
    image: legacyAssets.cards.circle,
    body: [
      "The Circle of Influence is an exclusive gathering where high performers come together to share insights and experiences, blending both work and life in a holistic atmosphere. This unique space encourages growth and collaboration through a balanced approach to success, integrating mind, body, and spirit.",
      "Participants engage in transformative activities such as yoga, meditation, and other holistic practices, alongside adrenaline pumping challenges designed to push boundaries and ignite innovation. It's a place where personal well-being meets professional excellence, creating an environment that nurtures both inner peace and peak performance.",
      "The Circle of Influence is where individuals elevate each other, inspire new levels of success, and create lasting, meaningful connections.",
    ],
  },
  {
    slug: "the-executive-sanctum",
    title: "The Executive Sanctum",
    image: legacyAssets.cards.sanctum,
    body: [
      "The Executive Sanctum crafts holistic, immersive journeys for corporate or leisure groups seeking meaningful luxury. Every experience is thoughtfully tailored, blending exclusive stays in luxury hotels or unique, off the beaten path locations with seamless, stylish transfers or a vintage car.",
      "Rooted in wellness and connection, each journey nurtures mind, body, and spirit, offering transformative retreats, cultural immersions, and personal growth opportunities. Step into a world where luxury meets mindfulness, and every moment is designed to inspire, rejuvenate, and leave a lasting impact where simplicity meets sophistication.",
    ],
  },
  {
    slug: "the-grand-affair",
    title: "The Grand Affair",
    image: legacyAssets.cards.affair,
    body: [
      "The Grand Affair is a transformative celebration where sophistication, luxury, music, art, and holistic moments come together to create an unforgettable experience. Designed to nurture the mind, body, and spirit, this curated journey elevates every moment, offering a perfect balance of elegance and meaning. From immersive artistic expressions to soothing wellness practices, The Grand Affair invites you to connect deeply with yourself and others while celebrating legacy and creativity.",
      "Each carefully crafted detail serves a purpose, ensuring every experience leaves a lasting impact, whether it's through breathtaking music, inspiring art, or moments of reflection. This is more than just an event; it's a celebration of life, luxury, and the power of connection.",
      "The Grand Affair is where timeless elegance meets mindful luxury, creating an atmosphere that inspires, rejuvenates, and empowers all who participate. Step into a world where every moment is a reflection of beauty, purpose, and legacy.",
    ],
  },
];

export function getLegacyItem(slug: string): LegacyItem | undefined {
  return legacyItems.find((item) => item.slug === slug);
}

export function getLegacySlugs(): string[] {
  return legacyItems.map((item) => item.slug);
}
