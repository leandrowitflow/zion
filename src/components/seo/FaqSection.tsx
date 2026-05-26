import type { FaqItem } from "@/lib/seo/faqs";

type FaqSectionProps = {
  faqs: FaqItem[];
  /** Visually hidden heading for minimal layout impact. */
  visuallyHiddenTitle?: boolean;
};

function FaqIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Editorial FAQ accordion — ivypresto questions, expandable answers, sticky section title on desktop.
 */
export function FaqSection({ faqs, visuallyHiddenTitle = false }: FaqSectionProps) {
  const openFirstByDefault = faqs.length >= 4;

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-section-layout">
        <div className={visuallyHiddenTitle ? "sr-only" : "faq-section-intro"}>
          <h2 id="faq-heading" className="faq-section-title">
            Good to <span className="text-accent">know</span>
          </h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="faq-item"
              open={openFirstByDefault && index === 0}
            >
              <summary className="faq-item-summary">
                <span className="faq-item-question">{faq.question}</span>
                <span className="faq-item-icon">
                  <FaqIcon />
                </span>
              </summary>
              <div className="faq-item-answer">
                <p className="text-body">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
