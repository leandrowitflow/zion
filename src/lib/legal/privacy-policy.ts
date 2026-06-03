import type { LegalDocument } from "@/lib/legal/types";
import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_GOVERNING_LAW,
  LEGAL_WEBSITE,
} from "@/lib/legal/site";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "26 May 2026",
  intro: [
    `${LEGAL_COMPANY_NAME} (“ZION”, “we”, “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect information when you visit ${LEGAL_WEBSITE}, contact us, or engage with our services.`,
    "This policy is written for visitors and clients in the European Economic Area and elsewhere. Where applicable, we process personal data in accordance with the General Data Protection Regulation (EU) 2016/679 (“GDPR”) and Portuguese data protection law.",
  ],
  sections: [
    {
      id: "controller",
      title: "1. Who we are",
      paragraphs: [
        `${LEGAL_COMPANY_NAME} is the data controller for personal data collected through this website and related enquiry channels, unless we inform you otherwise in writing for a specific project or contract.`,
        `Registered office: Av. Defensores de Chaves, 15, 4ª D, 1000-109 Lisbon, Portugal.`,
        `Privacy enquiries: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Personal data we collect",
      paragraphs: ["We may collect the following categories of information depending on how you interact with us:"],
      listItems: [
        "Identity and contact details (name, email address, phone number, company).",
        "Enquiry and project information you provide via forms, email, or phone.",
        "Technical data (IP address, browser type, device identifiers, approximate location derived from IP).",
        "Usage data (pages viewed, referral source, time on site) where analytics cookies are accepted.",
        "Marketing preferences where you opt in to receive updates.",
      ],
    },
    {
      id: "how-we-use",
      title: "3. How we use your data",
      paragraphs: ["We use personal data for purposes including:"],
      listItems: [
        "Responding to enquiries and preparing bespoke travel, experience, or event proposals.",
        "Delivering services you request and managing our relationship with you.",
        "Operating, securing, and improving our website.",
        "Complying with legal, tax, and regulatory obligations.",
        "Sending marketing communications only where you have given consent or where another lawful basis applies.",
      ],
      subsections: [
        {
          title: "Lawful bases (GDPR)",
          paragraphs: ["Depending on the activity, we rely on one or more of the following lawful bases:"],
          listItems: [
            "Consent (e.g. non-essential cookies, marketing emails).",
            "Contract or pre-contractual steps (e.g. preparing a proposal you requested).",
            "Legitimate interests (e.g. website security, fraud prevention, B2B relationship management), balanced against your rights.",
            "Legal obligation (e.g. record-keeping required by law).",
          ],
        },
      ],
    },
    {
      id: "sharing",
      title: "4. Sharing your data",
      paragraphs: [
        "We do not sell your personal data. We may share information with trusted processors who help us operate our business, such as hosting providers, email delivery services, analytics providers (only if you accept analytics cookies), and professional advisers. These parties process data only on our instructions and under appropriate safeguards.",
        "We may disclose information where required by law, court order, or to protect our rights, users, or the public.",
      ],
    },
    {
      id: "international",
      title: "5. International transfers",
      paragraphs: [
        "Some service providers may process data outside the European Economic Area. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission or an adequacy decision.",
      ],
    },
    {
      id: "retention",
      title: "6. How long we keep data",
      paragraphs: [
        "We retain personal data only for as long as necessary for the purposes described in this policy, including to satisfy legal, accounting, or reporting requirements. Enquiry records are typically kept for a limited period unless a business relationship continues. You may contact us for more detail about retention for a specific category of data.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies and similar technologies",
      paragraphs: [
        "Our website uses cookies and similar technologies. Some cookies are strictly necessary for the site to function; others help us understand how visitors use the site or support marketing measurement.",
        "When you first visit, you can accept all cookies or continue with essential cookies only. You can change your choice at any time via Cookie settings in the site footer.",
      ],
      subsections: [
        {
          title: "Essential cookies",
          paragraphs: [
            "These cookies are required for basic operation and security. They cannot be switched off through our cookie banner. They do not require consent under applicable ePrivacy rules.",
          ],
          listItems: [
            "Session and security cookies that keep the site working safely.",
            "Cookie consent preference storage (to remember your choice).",
          ],
        },
        {
          title: "Analytics and marketing cookies",
          paragraphs: [
            "These cookies are set only if you choose Accept all. We use Google Tag Manager (container GTM-TVGLWGDJ) which may load tags such as Google Analytics or advertising pixels configured in our tag management account. Tags respect Google Consent Mode signals until you grant analytics and advertising storage.",
          ],
          listItems: [
            "Analytics — to understand traffic, page performance, and aggregated usage.",
            "Marketing — where configured in GTM, to measure campaign effectiveness.",
          ],
        },
        {
          title: "Managing cookies in your browser",
          paragraphs: [
            "You can also block or delete cookies through your browser settings. Blocking essential cookies may affect site functionality.",
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "8. Your rights",
      paragraphs: [
        "Under GDPR, you may have the right to access, rectify, erase, restrict processing, object to processing, and data portability, where applicable. Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of processing before withdrawal.",
        `To exercise your rights, email ${LEGAL_CONTACT_EMAIL}. You also have the right to lodge a complaint with the Portuguese supervisory authority, Comissão Nacional de Proteção de Dados (CNPD), at cnpd.pt.`,
      ],
    },
    {
      id: "security",
      title: "9. Security",
      paragraphs: [
        "We implement appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction. No method of transmission over the internet is completely secure; we encourage you to use strong passwords and protect your own devices.",
      ],
    },
    {
      id: "children",
      title: "10. Children",
      paragraphs: [
        "Our website and services are not directed at children under 16. We do not knowingly collect personal data from children. If you believe we have received such data, please contact us so we can delete it.",
      ],
    },
    {
      id: "changes",
      title: "11. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Material changes may also be highlighted on the website where appropriate.",
      ],
    },
    {
      id: "contact",
      title: "12. Contact",
      paragraphs: [
        `For privacy questions or requests relating to your personal data, contact ${LEGAL_CONTACT_EMAIL} or write to ${LEGAL_COMPANY_NAME}, Av. Defensores de Chaves, 15, 4ª D, 1000-109 Lisbon, Portugal.`,
        `This policy should be read together with our Terms of Service. Disputes are governed by ${LEGAL_GOVERNING_LAW} as described there.`,
      ],
    },
  ],
};
