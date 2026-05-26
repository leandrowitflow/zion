/** Answer-ready FAQs — distilled from existing site copy and contact details. */
export type FaqItem = {
  question: string;
  answer: string;
};

const faqWhatIs: FaqItem = {
  question: "What is ZION Creative Artisans?",
  answer:
    "ZION Creative Artisans is a Destination Alchemist Lab — a Portugal-based luxury destination management company that crafts bespoke journeys, immersive experiences, and legacy events rooted in simplicity, authenticity, and depth.",
};

const faqWhereBased: FaqItem = {
  question: "Where is ZION Creative Artisans based?",
  answer:
    "Headquarters are in Lisbon at Av. Defensores de Chaves, 15, 4ª D, 1000-109, Portugal. ZION also serves Porto, Algarve, Madeira, and the Azores.",
};

const faqServices: FaqItem = {
  question: "What services does ZION Creative Artisans offer?",
  answer:
    "ZION curates tailored destinations across Portugal, luxury experiences, corporate legacy programs (incentives, executive retreats, and grand affairs), artisan-led journeys, and sustainable travel — each designed as a deeply personal narrative.",
};

const faqContact: FaqItem = {
  question: "How can I contact ZION Creative Artisans?",
  answer:
    "Email ignite@zion-creativeartisans.com or call (+351) 210 188 406. Opening hours are weekdays 10:00–19:00 UTC Lisbon; closed on Saturdays, Sundays, and bank holidays.",
};

const faqRegions: FaqItem = {
  question: "Which regions of Portugal does ZION cover?",
  answer:
    "ZION designs journeys across Lisbon & Coast, Alentejo, the Algarve, the Center of Portugal, Porto & North, and the islands (Madeira and the Azores).",
};

const faqDifferent: FaqItem = {
  question: "What makes ZION different from a traditional DMC?",
  answer:
    "ZION defines itself as a Destination Alchemist Lab — evolving beyond itinerary logistics into crafted narratives where simplicity, authenticity, and artisan-led storytelling shape every journey.",
};

const faqCorporate: FaqItem = {
  question: "Does ZION offer corporate and incentive travel?",
  answer:
    "Yes. Through ZION Legacy, the team designs corporate incentives, executive retreats, and grand affairs — including Circle of Influence, Executive Sanctum, and Grand Affair programs.",
};

const faqSustainability: FaqItem = {
  question: "Is sustainability part of ZION's approach?",
  answer:
    "Yes. ZION is committed to responsible travel in Portugal — working with local communities and partners so journeys respect people, place, and long-term stewardship.",
};

const faqAfterEnquiry: FaqItem = {
  question: "What happens after I contact ZION?",
  answer:
    "A member of the ZION team responds during opening hours. Share your dates, group size, and vision — from there, ZION shapes a bespoke proposal for your journey, experience, or legacy event in Portugal.",
};

const faqWhoWorksWith: FaqItem = {
  question: "Who does ZION work with?",
  answer:
    "ZION partners with discerning travelers, luxury brands, and organizations worldwide — from private escapes and artisan-led experiences to corporate incentives, executive retreats, and grand celebrations.",
};

const faqLanguages: FaqItem = {
  question: "What languages does ZION work in?",
  answer:
    "ZION works in English and Portuguese, supporting international clients with on-the-ground expertise across mainland Portugal and the islands.",
};

const faqExperiencesTypes: FaqItem = {
  question: "What types of experiences does ZION curate in Portugal?",
  answer:
    "Experiences span The Art of Escape, Wild & Free, Timeless Traditions, Soul & Serenity, and The Essence of Taste — from coastal adventure and cultural immersion to serenity and Portuguese gastronomy.",
};

const faqDestinationsSpecialize: FaqItem = {
  question: "Which destinations in Portugal does ZION specialize in?",
  answer:
    "ZION tailors journeys across Lisbon & Coast, Alentejo, the Algarve, the Center of Portugal, Porto & North, and the islands — each shaped for luxury travelers seeking depth and authenticity.",
};

const faqLegacy: FaqItem = {
  question: "What is ZION Legacy?",
  answer:
    "ZION Legacy curates transformative programs for distinction — including The Circle of Influence, The Executive Sanctum, and The Grand Affair for corporate incentives, retreats, and celebrations.",
};

const faqSustainableApproach: FaqItem = {
  question: "How does ZION approach sustainable travel in Portugal?",
  answer:
    "ZION partners with responsible suppliers and local communities, designing journeys that honor Portugal's landscapes, culture, and people while delivering refined luxury without excess.",
};

/** Full registry — used for audits and as the source of truth. */
export const siteFaqs: FaqItem[] = [
  faqWhatIs,
  faqWhereBased,
  faqServices,
  faqContact,
  faqRegions,
  faqDifferent,
  faqCorporate,
  faqSustainability,
  faqAfterEnquiry,
  faqWhoWorksWith,
  faqLanguages,
];

/** Home — short discovery (identity + positioning). */
export const homeFaqs: FaqItem[] = [faqWhatIs, faqDifferent, faqServices];

/** Ignite Us — full pre-contact guidance (reach us, process, scope, clients). */
export const igniteFaqs: FaqItem[] = [
  faqContact,
  faqAfterEnquiry,
  faqWhereBased,
  faqRegions,
  faqServices,
  faqCorporate,
  faqWhoWorksWith,
  faqLanguages,
  faqSustainability,
];

export const experiencesFaqs: FaqItem[] = [faqWhatIs, faqServices, faqExperiencesTypes];

export const destinationFaqs: FaqItem[] = [faqWhatIs, faqRegions, faqDestinationsSpecialize];

export const legacyFaqs: FaqItem[] = [faqWhatIs, faqCorporate, faqLegacy];

export const sustainabilityFaqs: FaqItem[] = [faqWhatIs, faqSustainability, faqSustainableApproach];

const faqJournalWhat: FaqItem = {
  question: "What is The Journal of ZION?",
  answer:
    "The Journal of ZION is ZION Creative Artisans' curated editorial space — stories on destinations, craftsmanship, travel, and Portugal beyond the postcard, written from a luxury Destination Alchemist Lab.",
};

const faqJournalTopics: FaqItem = {
  question: "What does The Journal of ZION cover?",
  answer:
    "Articles explore quiet luxury, curated escapes, Portuguese culture and landscapes, artisan craftsmanship, and thoughtful travel — aligned with ZION's bespoke journeys and experiences across Portugal.",
};

const faqJournalContact: FaqItem = {
  question: "How do I plan a journey inspired by The Journal of ZION?",
  answer:
    "Contact ZION Creative Artisans at ignite@zion-creativeartisans.com or (+351) 210 188 406. Share your dates and vision — the team crafts bespoke luxury journeys, experiences, and legacy events across Portugal.",
};

export const journalFaqs: FaqItem[] = [faqWhatIs, faqJournalWhat, faqJournalTopics, faqJournalContact];
