import Script from "next/script";

/** Consent Mode defaults — must run before GTM loads. */
const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  analytics_storage:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});`;

export function GoogleConsentDefaults() {
  return (
    <Script
      id="google-consent-defaults"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
    />
  );
}
