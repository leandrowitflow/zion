export type LegalBlock = {
  paragraphs?: string[];
  listItems?: string[];
};

export type LegalSection = {
  id: string;
  title: string;
} & LegalBlock & {
  subsections?: Array<{ title: string } & LegalBlock>;
};

export type LegalDocument = {
  title: string;
  intro: string[];
  lastUpdated: string;
  sections: LegalSection[];
};
