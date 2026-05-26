export type Experience = {
  slug: string;
  title: string;
  hero: string;
  objectPosition?: string;
  body: string[];
};

export const experiences: Experience[] = [
  {
    slug: "the-art-of-escape",
    title: "The Art of Escape",
    hero: "/images/experiences/carousel/art-of-escape.png",
    objectPosition: "object-[center_35%]",
    body: [
      "Portugal offers an immersive escape where every experience connects you deeply with nature, tradition, and the timeless beauty of its landscapes. Begin your journey with a tranquil hot air balloon ride over the sweeping hills of Alentejo, where the land unfolds beneath you in serene beauty. In the heart of a vineyard, create your own wine, embracing the age-old craft and connecting with the land's rich history.",
      "In Madeira, explore the lush island on a Levada walk, where ancient irrigation channels guide you through verdant forests, stunning waterfalls, and panoramic views, allowing you to immerse yourself in nature's harmony. The Azores, with their volcanic landscapes and crater lakes, offer a soul-stirring experience, where every trail leads you deeper into the unspoiled beauty of this majestic archipelago.",
      "In the Algarve, embark on a unique oyster-picking adventure along its pristine coastline or wander through the ancient salt flats, where tradition and nature meet in perfect balance. Discover the art of olive oil production, learning how to harvest olives and craft rich, flavorful oils that embody the essence of Portugal's Mediterranean climate.",
      "For a truly authentic experience, take part in making your own bread, connecting with the timeless tradition that has sustained generations. Knead the dough, feel its warmth, and savor the simple yet profound pleasure of bread made by your own hands.",
      "A classic car tour through Portugal's inland lets you explore its quiet villages, olive groves, and rolling hills, offering a moment of peaceful reflection and connection to the land.",
      "In Portugal, the art of escape is a holistic experience, each moment designed to nourish the soul, awaken the senses, and invite you to slow down, savor the beauty around you, and rediscover life's true essence.",
    ],
  },
  {
    slug: "wild-free",
    title: "Wild & Free",
    hero: "/images/experiences/wild-free.jpg",
    objectPosition: "object-center",
    body: [
      "Unlock your inner adventurer with radical tours that defy the ordinary and immerse you in Portugal's untamed beauty. This is not just a journey, it's a call to break free and experience the raw energy of nature, from the soaring cliffs to the endless waves and beyond.",
      "Feel the rush of the wind on your face as you ride powerful motorcycles along Portugal's rugged coastline, exploring hidden spots that only the daring can discover. Take your heart to the ocean with surfing lessons in some of the most iconic waves in Europe, or test your limits in exhilarating outdoor adventures that let you connect with nature in its purest form.",
      "For those seeking a deeper escape, embark on a classic car tour through Portugal's wildest landscapes, where ancient roads wind through mountain ranges, timeless villages, and forgotten beaches. Or take to the water with a kayaking adventure, paddling through secret coves and untouched shores, where the beauty is wild, unfiltered, and all your own.",
      "Wild & Free doesn't just mean adrenaline, it means freedom, independence, and the courage to embrace the untamed spirit of Portugal. Whether you're chasing the thrill of a surfboard or feeling the earth beneath your feet in remote landscapes, these tours are for those who crave a journey that pushes boundaries and leaves you feeling more alive than ever.",
    ],
  },
  {
    slug: "timeless-traditions",
    title: "Timeless Traditions",
    hero: "/images/experiences/timeless-traditions.jpg",
    objectPosition: "object-left",
    body: [
      "Portugal's timeless traditions invite you to connect deeply with its rich cultural heritage, where every experience offers a sense of belonging and continuity. In Lisbon, the soulful echoes of fado carry you through the city's historic neighborhoods, filling the air with emotion and nostalgia. In Porto, the São João Festival becomes a shared moment of joy, where the streets come alive with dancing, laughter, and age-old customs that bring the community together.",
      "The Douro Valley, with its ancient winemaking traditions, welcomes you to walk alongside generations of vineyard workers, where the rhythm of foot treading grapes creates an intimate bond with the land. In Alentejo, the sustainable harvesting of cork allows you to witness a deep respect for nature, as you embrace the peaceful beauty of the countryside.",
      "In Madeira, vibrant festivals like the Festa da Flor and Wine Festival immerse you in the island's natural bounty and celebrate the harmony between people and the earth. And in Fátima, a sense of devotion and spiritual reflection invites you to slow down and connect with the deeper layers of faith and history.",
      "From the artistry of azulejos tiles to the pottery of Barcelos, each tradition in Portugal offers a holistic experience, connecting past and present, nature and culture, and soul and community, inviting you to rediscover the timeless essence of this beautiful country.",
    ],
  },
  {
    slug: "soul-serenity",
    title: "Soul & Serenity",
    hero: "/images/experiences/soul-serenity.jpg",
    objectPosition: "object-[center_20%]",
    body: [
      "Soul & Serenity experiences in Portugal are designed to reconnect you with yourself and the natural world, offering moments of pure stillness and renewal. These experiences immerse you in the country's diverse landscapes, local traditions, and soothing atmospheres, allowing you to embrace peace and harmony at every step.",
      "In the Douro Valley, a sunset cruise along the river takes you through the heart of wine country, surrounded by terraced vineyards and golden light. As you sip on world-class Port wine, the serene setting provides a deep sense of calm and connection with nature. Here, wine tastings in family-run estates, combined with meditation sessions overlooking the valleys, create a tranquil experience for both body and soul.",
      "In the Alentejo, slow-living comes naturally. The wide, open plains and ancient olive groves invite mindful walking tours or leisurely bike rides through the countryside, where time seems to pause. Stay in a traditional herdade (farmhouse), where you can engage in yoga at sunrise, experience farm-to-table meals under the stars, or simply unwind with a book while surrounded by the quiet beauty of this vast region. This region embodies a slower pace of life, perfect for deep relaxation.",
      "The Algarve, known for its stunning coastline, offers coastal retreats that combine ocean therapy with well-being. Imagine practicing yoga on the beach at dawn, meditating to the sound of the waves, or exploring hidden sea caves on a kayak. The Algarve's dramatic cliffs, golden sands, and crystal-clear waters are the ideal setting for immersive spa treatments, healing sea rituals, and peaceful retreats that help you restore inner balance.",
      "On the islands of the Azores, nature itself becomes the healer. From bathing in thermal springs surrounded by lush forests to taking meditative hikes along volcanic craters, every experience is infused with the raw, untouched beauty of the islands. The Azores are a sanctuary for eco-conscious travelers, offering opportunities for mindfulness practices in nature, whale watching, and sustainable farming tours that deepen your connection with the earth.",
      "In Madeira, you can experience serenity by walking along levadas (ancient irrigation channels), which guide you through the island's dense forests and flower-filled landscapes. The fresh mountain air and vibrant nature offer an energizing yet calming atmosphere. Wellness retreats here often combine outdoor activities like canyoning with therapeutic spa treatments using local ingredients, ensuring you feel rejuvenated both mentally and physically.",
    ],
  },
  {
    slug: "the-essence-of-taste",
    title: "The Essence of Taste",
    hero: "/images/experiences/essence-taste.jpg",
    objectPosition: "object-center",
    body: [
      "Portugal's rich and diverse gastronomy offers a holistic journey across its regions and islands, where each bite and sip tells a story deeply connected to the land, sea, and centuries of tradition. From the verdant north to the sun-kissed Algarve, and from the islands of the Azores and Madeira to the bustling streets of Lisbon, every region offers its own distinctive flavors, creating an immersive experience for food and wine lovers alike.",
      "In the North, the Douro Valley's terraced vineyards produce the world-famous Port wine alongside robust reds and elegant whites, perfectly paired with hearty local dishes like \"Francesinha\" do Porto. Moving south, the Alentejo, a land of wide horizons and golden plains, offers simple, rustic cuisine like \"migas\" and \"açorda\", matched with its bold, earthy wines that reflect the region's deep connection to the land.",
      "In the Algarve, the coastline provides a bounty of fresh seafood, from grilled sardines to seafood cataplana, a rich seafood stew cooked in copper pans. These dishes are best enjoyed with crisp, refreshing local wines, bringing together the essence of the Algarve's sun-soaked landscapes and Atlantic breeze.",
      "As you move towards Lisbon, the city's vibrant food scene is a blend of tradition and innovation. \"Bacalhau à brás\" and \"Amêijoas à Bulhão Pato\" are just a taste of what the capital has to offer. No visit to Lisbon is complete without indulging in the famous Pastéis de Belém, custard tarts with a flaky crust, served fresh from the ovens near the Jerónimos Monastery.",
      "On the islands, the flavors take on a distinctively local touch. In the Azores, volcanic soils yield wines with a vibrant minerality, best enjoyed alongside seafood and Furnas Stew, a unique dish slow-cooked in volcanic steam. Madeira offers a contrast of flavors with its fortified wines, pairing beautifully with local specialties like \"espada\" fish with banana and fresh seafood from the Atlantic.",
      "Across Portugal, from the rugged north to the laid-back Algarve, and from Lisbon's culinary streets to the breathtaking islands, the gastronomy and wine are a celebration of nature, culture, and tradition. Every region offers a sensory journey, where the simple pleasure of food and wine is an invitation to experience the heart and soul of Portugal.",
    ],
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getExperienceSlugs(): string[] {
  return experiences.map((e) => e.slug);
}
