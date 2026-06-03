import { buildConsentBootstrapScript } from "@/lib/analytics/gtm-inline-scripts";

/** Consent Mode only — kept minimal in <head>. */
export function SiteAnalyticsHead() {
  return <script dangerouslySetInnerHTML={{ __html: buildConsentBootstrapScript() }} />;
}
