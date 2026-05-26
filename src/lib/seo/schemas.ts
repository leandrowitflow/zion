import {
  SITE_ADDRESS,
  SITE_BRANCHES,
  SITE_EMAIL,
  SITE_ENTITY_SUMMARY,
  SITE_GEO,
  SITE_NAME,
  SITE_PHONE,
  SITE_SOCIAL,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/seo/site";
import { OG_LOGO, ogImages } from "@/lib/seo/og";

type JsonLd = Record<string, unknown>;

function absoluteAsset(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function openingHoursSpecification(): JsonLd {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  };
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_ENTITY_SUMMARY,
    slogan: SITE_TAGLINE,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    logo: absoluteAsset(OG_LOGO),
    image: absoluteAsset(ogImages.home),
    areaServed: ["PT", ...SITE_BRANCHES],
    sameAs: Object.values(SITE_SOCIAL),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      postalCode: SITE_ADDRESS.postalCode,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_GEO.latitude,
      longitude: SITE_GEO.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      areaServed: "PT",
      availableLanguage: ["English", "Portuguese"],
      hoursAvailable: openingHoursSpecification(),
    },
    knowsAbout: [
      "Luxury travel Portugal",
      "Destination management",
      "Bespoke experiences",
      "Corporate incentives",
      "Sustainable tourism",
    ],
  };
}

export function webSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_ENTITY_SUMMARY,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function personSchema(input: {
  name: string;
  role: string;
  description: string;
  path: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.role,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}` } : {}),
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}

export function touristDestinationSchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    containedInPlace: { "@type": "Country", name: "Portugal" },
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}` } : {}),
  };
}

export function touristTripSchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    touristType: "Luxury traveler",
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}` } : {}),
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    areaServed: "Portugal",
    provider: { "@id": `${SITE_URL}/#organization` },
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}` } : {}),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function contactPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ZION Creative Artisans",
    url: `${SITE_URL}/ignite-us`,
    description:
      "Contact ZION Creative Artisans in Lisbon to craft your bespoke luxury journey, experience, or legacy event in Portugal.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };
}

export function itemListSchema(input: {
  name: string;
  path: string;
  items: { name: string; path: string }[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    url: `${SITE_URL}${input.path}`,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}
