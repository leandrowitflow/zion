import { buildConsentBootstrapScript, buildGtmHeadScript } from "@/lib/analytics/gtm-inline-scripts";

/**
 * Plain inline scripts in document order (consent → GTM).
 * Avoids Next.js Script scheduling issues that can cause GTM / Tag Assistant timeouts.
 */
export function SiteAnalyticsHead() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: buildConsentBootstrapScript() }} />
      <script dangerouslySetInnerHTML={{ __html: buildGtmHeadScript() }} />
    </>
  );
}
