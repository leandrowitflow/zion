import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { privacyPolicy } from "@/lib/legal/privacy-policy";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.privacy;

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <SiteSection>
        <SiteContainer className="max-w-3xl py-4">
          <h1 className="heading-section mb-10 text-center text-foreground">{privacyPolicy.title}</h1>
          <LegalDocumentView document={privacyPolicy} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
