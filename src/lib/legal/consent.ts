export const CONSENT_STORAGE_KEY = "zion-cookie-consent";

export type ConsentChoice = "all" | "essential";

export const COOKIE_PREFERENCES_EVENT = "zion:cookie-preferences";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/** Push Google Consent Mode update — call after user choice or when restoring saved choice. */
export function applyConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;

  const granted = choice === "all";
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export function readStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "all" || raw === "essential") return raw;
  } catch {
    /* private browsing */
  }
  return null;
}

export function storeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* private browsing */
  }
  applyConsent(choice);
}

/** Re-open the cookie banner (e.g. from footer “Cookie settings”). */
export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
}
