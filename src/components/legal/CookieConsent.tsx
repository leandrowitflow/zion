"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_PREFERENCES_EVENT,
  type ConsentChoice,
  applyConsent,
  readStoredConsent,
  storeConsent,
} from "@/lib/legal/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  const dismissWithChoice = useCallback((choice: ConsentChoice) => {
    storeConsent(choice);
    setVisible(false);
  }, []);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      applyConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, reopen);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-black/10 bg-[#FAF8F6] shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="site-container flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-3xl">
          <p id="cookie-consent-title" className="font-[family-name:var(--font-display)] text-xl font-light text-foreground">
            Cookies on this site
          </p>
          <p id="cookie-consent-desc" className="text-body mb-0 mt-2">
            We use essential cookies so the site works, and optional analytics cookies to understand how visitors use
            our website — only if you accept. Read our{" "}
            <Link href="/privacy-policy#cookies" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="btn-outline order-2 sm:order-1"
            onClick={() => dismissWithChoice("essential")}
          >
            Essential only
          </button>
          <button
            type="button"
            className="btn-filled order-1 sm:order-2"
            onClick={() => dismissWithChoice("all")}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
