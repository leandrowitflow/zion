import { buildGtmDeferredScript } from "@/lib/analytics/gtm-inline-scripts";

/** Deferred GTM loader — first in <body>, after consent defaults in head. */
export function SiteAnalyticsBody() {
  return <script dangerouslySetInnerHTML={{ __html: buildGtmDeferredScript() }} />;
}
