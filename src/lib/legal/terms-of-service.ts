import type { LegalDocument } from "@/lib/legal/types";
import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_GOVERNING_LAW,
  LEGAL_WEBSITE,
} from "@/lib/legal/site";

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  lastUpdated: "26 May 2026",
  intro: [
    `These Terms of Service (“Terms”) govern your access to and use of ${LEGAL_WEBSITE} (the “Site”) operated by ${LEGAL_COMPANY_NAME} (“ZION”, “we”, “us”). By using the Site, you agree to these Terms. If you do not agree, please do not use the Site.`,
    "Separate written agreements govern commissioned travel, experiences, events, and other services we deliver. Where those agreements conflict with these Terms regarding a specific booking or project, the written agreement prevails.",
  ],
  sections: [
    {
      id: "use",
      title: "1. Use of the website",
      paragraphs: [
        "You may use the Site for lawful purposes only. You must not attempt to gain unauthorised access to our systems, interfere with the Site’s operation, scrape content in violation of these Terms or applicable law, transmit malware, or use the Site in any way that could harm ZION, our partners, or other users.",
        "We may suspend or restrict access if we reasonably believe you have breached these Terms or pose a security risk.",
      ],
    },
    {
      id: "content",
      title: "2. Content and intellectual property",
      paragraphs: [
        "Text, images, video, logos, design, and other materials on the Site are owned by ZION or our licensors and are protected by copyright, trademark, and other intellectual property laws.",
        "You may view and share links to pages for personal, non-commercial reference. You may not copy, modify, distribute, publicly display, or create derivative works from Site content without our prior written consent, except as permitted by mandatory law.",
      ],
    },
    {
      id: "enquiries",
      title: "3. Enquiries and proposals",
      paragraphs: [
        "Information on the Site is provided for general inspiration and orientation. Descriptions of destinations, experiences, and services are indicative and subject to availability, season, and bespoke tailoring.",
        "Submitting a contact form or email does not create a binding contract. Any engagement becomes binding only when confirmed in writing under our commercial terms, including scope, fees, and cancellation conditions.",
      ],
    },
    {
      id: "third-party",
      title: "4. Third-party links and partners",
      paragraphs: [
        "The Site may link to third-party websites or social platforms. We are not responsible for their content, policies, or practices. Your use of third-party services is at your own risk and subject to their terms.",
        "Where we introduce you to artisans, venues, or suppliers, their services may be subject to separate terms and safety requirements communicated during your journey planning.",
      ],
    },
    {
      id: "disclaimer",
      title: "5. Disclaimers",
      paragraphs: [
        "The Site is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components.",
        "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including mandatory consumer rights where you qualify as a consumer.",
      ],
    },
    {
      id: "liability",
      title: "6. Limitation of liability",
      paragraphs: [
        "To the extent permitted by law, ZION shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, goodwill, or business opportunity arising from your use of the Site.",
        "Our aggregate liability for claims relating solely to your use of the Site (excluding services delivered under a separate contract) shall not exceed one hundred euros (€100), except where a higher minimum liability is required by law.",
      ],
    },
    {
      id: "privacy",
      title: "7. Privacy and cookies",
      paragraphs: [
        "Our collection and use of personal data is described in our Privacy Policy, including how we use cookies and how you can manage consent. By using the Site, you acknowledge that you have read our Privacy Policy.",
      ],
    },
    {
      id: "changes",
      title: "8. Changes to the Site and Terms",
      paragraphs: [
        "We may update the Site and these Terms at any time. The “Last updated” date will reflect revisions. Continued use after changes constitutes acceptance of the revised Terms where permitted by law.",
      ],
    },
    {
      id: "law",
      title: "9. Governing law and jurisdiction",
      paragraphs: [
        `These Terms are governed by ${LEGAL_GOVERNING_LAW}. Courts in Lisbon, Portugal shall have exclusive jurisdiction over disputes arising from or relating to these Terms and use of the Site, without prejudice to mandatory consumer protections that may apply in your country of residence.`,
      ],
    },
    {
      id: "contact",
      title: "10. Contact",
      paragraphs: [
        `Questions about these Terms: ${LEGAL_CONTACT_EMAIL}.`,
        `${LEGAL_COMPANY_NAME}, Av. Defensores de Chaves, 15, 4ª D, 1000-109 Lisbon, Portugal.`,
      ],
    },
  ],
};
