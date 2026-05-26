const carouselBase = "/images/destination/carousel";

export type Destination = {
  slug: string;
  title: string;
  image: string;
  body: string[];
};

export const destinations: Destination[] = [
  {
    slug: "lisbon-coast",
    title: "Lisbon & Coast",
    image: `${carouselBase}/lisbon-coast.png`,
    body: [
      "Lisbon and its enchanting coastline beckon with a harmonious blend of rich history, vibrant culture, and natural beauty. Wander through the labyrinthine streets of Alfama, where the soulful strains of Fado music echo, and the scent of grilled sardines fills the air.",
      "Gaze upon the majestic Belém Tower, a testament to Portugal's seafaring past, and savor the sweet custard tarts of Pastéis de Belém. Just beyond the city, the Lisbon Coast unveils golden beaches kissed by the Atlantic, charming seaside towns like Cascais and Estoril, and the lush landscapes of Sintra, where fairy-tale palaces nestle amidst verdant hills. Here, every sunset paints the sky with hues of orange and pink, inviting you to pause and reflect. Lisbon and its coast offer a journey for the senses, a place where every corner tells a story, and every moment feels like a cherished memory in the making.",
    ],
  },
  {
    slug: "alentejo",
    title: "Alentejo",
    image: `${carouselBase}/alentejo.png`,
    body: [
      "Alentejo, Portugal's heartland, offers a peaceful escape where time slows and simplicity reigns. With its golden plains, olive groves, and charming whitewashed villages, the landscape invites you to breathe deeply and unwind.",
      "The region's rich wines and slow-cooked cuisine reflect a deep connection to tradition and the land, while the warmth of the locals adds to its allure. In Alentejo, life moves at a gentle pace, offering a chance to reconnect with nature, savor the present moment, and embrace a slower, more meaningful way of living.",
    ],
  },
  {
    slug: "islands",
    title: "Islands",
    image: `${carouselBase}/islands.jpg`,
    body: [
      "Madeira and the Azores are Portugal's islands of wonder, each offering a unique escape into nature's beauty. Madeira, with its lush green landscapes, towering cliffs, and fragrant gardens, feels like a paradise suspended in time. The island's rich culture, dramatic coastlines, and exquisite wines invite visitors to slow down and indulge in life's simple pleasures.",
      "The Azores, an archipelago of volcanic islands, is a sanctuary for adventure seekers and nature lovers alike. With its rugged coastlines, crystal-clear lakes, and geothermal hot springs, the Azores are a testament to the earth's raw power and beauty. Both destinations offer a harmonious blend of serene landscapes, local traditions, and the warmth of island life, creating an unforgettable journey for those seeking a deeper connection with nature and themselves.",
    ],
  },
  {
    slug: "algarve",
    title: "Algarve",
    image: `${carouselBase}/algarve.png`,
    body: [
      "The Algarve, Portugal's sun-drenched southern coast, is a sanctuary of golden cliffs, hidden coves, and endless Atlantic horizons. From the dramatic headlands of Sagres to the tranquil beaches of Tavira, every stretch of coastline invites you to slow down and savor the rhythm of seaside life.",
      "Fresh seafood, grilled sardines, and the iconic cataplana stew tell the story of a region shaped by the ocean. Charming whitewashed villages, world-class golf courses, and cliff-top trails offer a perfect balance of relaxation and discovery.",
      "Whether you're exploring sea caves by kayak, dining on a terrace overlooking the water, or watching the sunset paint the sky in shades of amber and rose, the Algarve offers a journey where nature, culture, and the simple pleasures of coastal living come together in perfect harmony.",
    ],
  },
  {
    slug: "center",
    title: "Center of Portugal",
    image: `${carouselBase}/center.png`,
    body: [
      "The unspoiled heart of Portugal is a hidden gem, where nature's beauty and rich tradition blend seamlessly. Rolling hills, ancient oak forests, and tranquil rivers create a serene backdrop, inviting you to unwind and reconnect with life's simplest pleasures. Timeless villages, steeped in history, reflect the soul of a region where every corner tells a story of resilience and warmth.",
      "This is also a treasure trove for wine lovers. The region's vineyards, nurtured by generations of passion, offer wines that embody the heart of Portugal: rich, bold, and full of character. Savoring a glass of locally crafted wine, paired with rustic gastronomy, brings a deep sense of connection to the land and its people.",
      "The heart of Portugal is more than a destination, it's a place that stirs the soul. Whether hiking through lush mountains, exploring medieval towns, or simply savoring the authenticity of the region's flavors, you're invited to experience a lifestyle that is as genuine as the land itself. It's a sanctuary where you can reconnect with nature, savor unforgettable wines, and embrace the quiet rhythm of a life well-lived.",
    ],
  },
  {
    slug: "north",
    title: "Porto & North",
    image: `${carouselBase}/north.jpg`,
    body: [
      "The Douro Valley, a UNESCO World Heritage site, is a timeless sanctuary where nature and tradition come together in perfect harmony. Terraced vineyards, carved over centuries into the rolling hills, cascade down to meet the winding Douro River. This is the heart of Portugal's wine country, where each bottle of Port carries with it the deep history and soul of the land, inviting you to taste the very essence of time and place.",
      "Just a short journey away, Porto emerges like a jewel on the riverbanks, a city where past and present meet in a vibrant, living tapestry. Its cobbled streets, majestic bridges, and colorful buildings tell the story of a city shaped by the sea and steeped in culture. Porto's energy is palpable, from the scent of the Atlantic breeze to the warm embrace of its people.",
      "Together, the Douro and Porto offer a holistic experience of the North of Portugal where the destination awaits to be explored. A region where nature's beauty, deep-rooted traditions, and genuine warmth create an emotional journey. It's a place where every moment feels connected to the land, to the history, and to the simple, soulful pleasures of life.",
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((item) => item.slug === slug);
}

export function getDestinationSlugs(): string[] {
  return destinations.map((item) => item.slug);
}
