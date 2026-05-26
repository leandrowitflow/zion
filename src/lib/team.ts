export type TeamTrait = {
  label: string;
  value: number;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  hoverImage: string;
  traits: TeamTrait[];
  bio: string[];
};

const teamBase = "/Team";

export const teamMembers: TeamMember[] = [
  {
    slug: "carlos-bras",
    name: "Carlos Brás",
    role: "The Alchemist",
    image: `${teamBase}/Carlos_01@0.25x.jpg`,
    hoverImage: `${teamBase}/Carlos_02@0.25x.jpg`,
    traits: [
      { label: "Passionate", value: 80 },
      { label: "Resilient", value: 90 },
      { label: "Laid-Back", value: 88 },
    ],
    bio: [
      "What I truly love is the rhythm of life that slows down on the weekends, when I can spend precious time with my family.",
      "There's something about the ocean that calls to me, surfing with my son in Sagres – Algarve, brings peace, clarity, and a sense of freedom that washes away the stresses of everyday life. It's in those moments, feeling the waves beneath us, that I reconnect with what really matters.",
      "But it's not just the thrill of the surf. It's also about embracing the simple, meaningful pleasures that life offers. Like sitting down at the end of the day with a glass of really good Portuguese wine in hand, savoring the taste of perfectly cooked red prawns or a fresh fish, sharing laughter, and making memories.",
      "Those are the moments that make me feel alive, grounded, and grateful. For me, life is about these small, soulful joys that carry so much meaning.",
    ],
  },
  {
    slug: "andre-oliveira",
    name: "André Oliveira",
    role: "Chief Alchemist Officer",
    image: `${teamBase}/Andre.png`,
    hoverImage: `${teamBase}/Andre_03.png`,
    traits: [
      { label: "Creative", value: 92 },
      { label: "Cool", value: 85 },
      { label: "Strategic", value: 88 },
    ],
    bio: [
      "André lives for the simple joys like cracking open a bottle of wine and pretending he's a sommelier, even though he's just a geek wine lover at heart.",
      "He's got a serious case of wanderlust, always on the hunt for the next adventure. When he's not exploring new corners of the world, you'll find him zooming through the countryside on his motorcycle, living out his wild, free-spirited dreams.",
      "Family time is sacred — he's all about making memories with his wife and son. He's got a love for pop art, because who wouldn't want to surround themselves with bold colors and cool vibes? On weekends, he's cheering for Sporting FC with the kind of passion that could rival a rock concert.",
      "And while he might fancy himself a Michelin star chef in his dreams, the reality usually ends up with a takeout menu in hand or cooking a delicious homemade meal.",
    ],
  },
  {
    slug: "vitor-almeida",
    name: "Vítor Almeida",
    role: "Chief Operating Officer",
    image: `${teamBase}/Vitor_01.png`,
    hoverImage: `${teamBase}/Vitor_02.png`,
    traits: [
      { label: "Graceful Mediator", value: 90 },
      { label: "Bold Voyager", value: 86 },
      { label: "Unwavering Believer", value: 92 },
    ],
    bio: [
      "Passionate about Portugal, captivated by its timeless charm, golden sunlight, and the endless embrace of the ocean. A true connoisseur of life's finest pleasures, he finds joy in exquisite experiences and the art of living well. His adventurous spirit leads him to explore the unknown on his motorcycle, embracing the thrill of discovery. But above all, his greatest treasures are his family and friends, the foundation of his journey.",
      "Refined mediator and negotiator, effortlessly navigating complex landscapes with poise and precision. His empathetic nature allows him to connect and understanding nuances that others may overlook. A meticulously professional, he upholds the highest standards of excellence, ensuring every detail is flawlessly executed. A leader, inspiring confidence and setting a benchmark for sophistication and success.",
      "Firmly believe in the transformative power of tourism as the ultimate industry of peace, bridging cultures and fostering understanding across borders.",
    ],
  },
  {
    slug: "jessica-campos",
    name: "Jéssica Campos",
    role: "Brand Alchemist",
    image: `${teamBase}/Jéssica_02.png`,
    hoverImage: `${teamBase}/Jéssica.png`,
    traits: [
      { label: "Bookworm", value: 94 },
      { label: "Master Planner", value: 90 },
      { label: "Passionate", value: 88 },
    ],
    bio: [
      "Jessica is the kind of person who always has a book in hand, ready to dive into a new world or gain fresh insights. A true bookworm at heart, she lives by the motto that there's always something new to learn. As a proud Excel addict and planner enthusiast, no detail is too small, whether it's coordinating a big family gathering or mapping out her next adventure.",
      "Family is at the heart of everything — gathering with loved ones from her big family is a cherished tradition, and there's nothing better than a homemade meal paired with a fine bottle of wine among friends. Whether indulging in comfort food from her mother's Minho roots or savoring hearty Italian dishes, the joy of food is always enhanced by great company. And when it's Formula 1 season, GP weekends are sacred in her household, often spent cheering with friends around the TV.",
    ],
  },
  {
    slug: "anabela-santos",
    name: "Anabela Santos",
    role: "Brand Alchemist",
    image: `${teamBase}/Anabela_02.png`,
    hoverImage: `${teamBase}/Anabela_01.png`,
    traits: [
      { label: "Passionate", value: 90 },
      { label: "Optimist", value: 88 },
      { label: "Friendly", value: 92 },
    ],
    bio: [
      "With a lifelong connection to tourism, Anabela has turned her passion into a career dedicated to sharing the best of Portugal with those eager to explore it. As a child, she dreamed of becoming a flight attendant to explore the world; today, she brings the country's most enchanting places to life through her expertise and experiences.",
      "Her curiosity and adventurous spirit keep her constantly seeking new experiences, whether by exploring Portugal or discovering new cultures and flavours. Family always comes first, and they are her favourite travel companions.",
      "When not traveling, she finds joy in cooking, relaxing by experimenting with new flavours and culinary creations. For her traveling isn't just about covering distances—it's about feeling, living, and sharing unforgettable stories.",
    ],
  },
  {
    slug: "ana-gomes",
    name: "Ana Gomes",
    role: "Brand Alchemist",
    image: `${teamBase}/Ana.jpg`,
    hoverImage: `${teamBase}/Ana_02.jpg`,
    traits: [
      { label: "Story-Driven", value: 92 },
      { label: "Versatile", value: 86 },
      { label: "Open-Hearted", value: 90 },
    ],
    bio: [
      "Ana is passionate about stories, music, and shared moments. Music has always been a constant in her life, with rock and metal forming the backbone of her playlist. She has a particular love for Sleep Token, turning to their music no matter how she feels: a soundscape where she can fully feel, reflect, or simply drift away. That combined with a good book, allows her to slow down, escape into new worlds, and let her imagination roam free.",
      "Some of her happiest memories are rooted in Beira Baixa, at her grandmother's house. She still remember observing her grandmother's every move while she prepared \"Pastéis de Bacalhau\" from scratch: a simple, comforting ritual that deepened her love for food, patience, and the joy of being together.",
      "Football, deep conversations, and weekly karaoke nights with friends are all part of her routine, even just when standing on the sidelines. Ana loves salty foods and unexpected flavor pairings, approaching them with the same curiosity and openness she brings to life. For her, the most meaningful experiences are always the ones shared with others.",
    ],
  },
  {
    slug: "margarida-duarte",
    name: "Margarida Duarte",
    role: "Brand Alchemist",
    image: `${teamBase}/Margarida_02.jpg`,
    hoverImage: `${teamBase}/Margarida.jpg`,
    traits: [
      { label: "Detail-oriented", value: 92 },
      { label: "Travel lover", value: 88 },
      { label: "Passionate", value: 90 },
    ],
    bio: [
      "Travel is a big part of Margarida's life. She enjoys frequent getaways in Portugal to explore new places and reset her routine, while Iceland and Japan top her list for once-in-a-lifetime trips, drawn by the Northern Lights and unique cultures.",
      "She also values cosy moments at home, reading, watching films and spending long evenings playing board games with friends. Good food is a passion, especially Portuguese cuisine. She can never resist octopus \"à lagareiro\" with extra olive oil or a \"pastel de nata\" with extra cinnamon on top.",
      "In terms of music, she likes the opposite, from Portuguese hip hop to the rhythms of a Brazilian samba. Family, friends, and her cat Petúnia are her daily constants, the pillars that ground her and give meaning to the moments she shares.",
    ],
  },
  {
    slug: "goncalo-quelhas",
    name: "Gonçalo Quelhas",
    role: "Brand Alchemist",
    image: `${teamBase}/Gonçalo_01.jpeg`,
    hoverImage: `${teamBase}/Gonçalo_02.jpeg`,
    traits: [
      { label: "Heritage Curator", value: 90 },
      { label: "Vibrant", value: 86 },
      { label: "Curious Wanderer", value: 92 },
    ],
    bio: [
      "Gonçalo feels a quiet, instinctive pull toward nature, something deeply personal beyond admiration. The landscapes of the southwest coast of Alentejo as the hills of Serra da Estrela give him focus and inspiration. More than destinations, he is drawn to wandering through Lisbon's downtown or the hidden corners of small villages where life feels slower and rooted. He gravitates toward places where traditions are still lived, crafts are handmade, and stories pass between generations. The horizon, especially in places like Porto Covo or Peniche, grounds him in something simple and real, strengthened by barefoot beach walks or quiet meals on terraces overlooking the sea.",
      "He is equally drawn to the city's vibrant energy, in open-air spaces where day turns into night. Rooftops, terraces, and atmospheric places become settings for connection, where jazzy music and local wine set the tone.",
      "He moves between social energy and stillness, often extending the moment into late beach walks or long dinners where everything slows down. At his core, he carries a quiet pride in Portugal, rooted in coastal food culture, grilled fish by the sea, and long meals that stretch into the evening. He is drawn to fishing towns, inland villages, and historic places where authenticity defines daily life. Through food, wine, landscapes, and traditions, he shares a Portugal that is experienced rather than explained, honest and quintessential.",
    ],
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}

export function getTeamMemberSlugs(): string[] {
  return teamMembers.map((member) => member.slug);
}
