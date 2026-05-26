import type { FaqItem } from "@/lib/seo/faqs";

type FaqSectionProps = {
  faqs: FaqItem[];
  /** Visually hidden heading for minimal layout impact (e.g. home page). */
  visuallyHiddenTitle?: boolean;
};

/**
 * Answer-ready FAQ block — typography matches contact and body copy.
 * Placed on Ignite Us; optional sr-only title elsewhere.
 */
export function FaqSection({ faqs, visuallyHiddenTitle = false }: FaqSectionProps) {
  const titleClass = visuallyHiddenTitle
    ? "sr-only"
    : "contact-page-title text-black mb-8 lg:mb-10";

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={titleClass}>
        Good to know
      </h2>
      <dl className="space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="text-body font-bold text-foreground">{faq.question}</dt>
            <dd className="text-body mt-2 text-[#696866]">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
