import type { LegalBlock, LegalDocument, LegalSection } from "@/lib/legal/types";

function LegalBlockContent({ paragraphs, listItems }: LegalBlock) {
  return (
    <>
      {paragraphs?.map((text) => (
        <p key={text.slice(0, 48)} className="text-body">
          {text}
        </p>
      ))}
      {listItems && listItems.length > 0 ? (
        <ul className="text-body list-disc pl-6">
          {listItems.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function LegalSectionView({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} className="scroll-mt-28">
      <h2 className="heading-section mb-6 text-left text-foreground">{section.title}</h2>
      <LegalBlockContent paragraphs={section.paragraphs} listItems={section.listItems} />
      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mt-6">
          <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl font-light text-foreground">
            {sub.title}
          </h3>
          <LegalBlockContent paragraphs={sub.paragraphs} listItems={sub.listItems} />
        </div>
      ))}
    </section>
  );
}

type LegalDocumentViewProps = {
  document: LegalDocument;
};

export function LegalDocumentView({ document }: LegalDocumentViewProps) {
  return (
    <article className="legal-document">
      <p className="text-body text-sm uppercase tracking-wide text-[#696866]/80">
        Last updated: {document.lastUpdated}
      </p>
      {document.intro.map((text) => (
        <p key={text.slice(0, 48)} className="text-body">
          {text}
        </p>
      ))}
      <div className="mt-12 flex flex-col gap-12">
        {document.sections.map((section) => (
          <LegalSectionView key={section.id} section={section} />
        ))}
      </div>
    </article>
  );
}
