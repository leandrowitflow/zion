import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  contactPageSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/seo/schemas";

type ListingStructuredDataProps = {
  pageTitle: string;
  path: string;
  items: { name: string; path: string }[];
  faqs?: { question: string; answer: string }[];
  includeContact?: boolean;
};

export function ListingStructuredData({
  pageTitle,
  path,
  items,
  faqs,
  includeContact = false,
}: ListingStructuredDataProps) {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: pageTitle, path },
    ]),
    itemListSchema({ name: pageTitle, path, items }),
  ];

  if (faqs?.length) {
    schemas.push(faqSchema(faqs));
  }

  if (includeContact) {
    schemas.push(contactPageSchema());
  }

  return <JsonLd data={schemas} />;
}
