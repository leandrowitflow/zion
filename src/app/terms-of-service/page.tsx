import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { termsOfService } from "@/lib/legal/terms-of-service";
import { staticPageMetadata } from "@/lib/seo/pages";

export const metadata = staticPageMetadata.terms;

export default function TermsOfServicePage() {
  return (
    <PageShell>
      <SiteSection>
        <SiteContainer className="max-w-3xl py-4">
          <h1 className="heading-section mb-10 text-center text-foreground">{termsOfService.title}</h1>
          <LegalDocumentView document={termsOfService} />
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
