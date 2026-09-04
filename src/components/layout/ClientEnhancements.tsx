"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MouseHelper = dynamic(
  () => import("@/components/ui/MouseHelper").then((mod) => mod.MouseHelper),
  { ssr: false },
);

const ScrollReveal = dynamic(
  () => import("@/components/ui/ScrollReveal").then((mod) => mod.ScrollReveal),
  { ssr: false },
);

const CookieConsent = dynamic(
  () => import("@/components/legal/CookieConsent").then((mod) => mod.CookieConsent),
  { ssr: false },
);

const MarkdownDownload = dynamic(
  () => import("@/components/seo/MarkdownDownload").then((mod) => mod.MarkdownDownload),
  { ssr: false },
);

function scheduleAfterLoad(callback: () => void) {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(callback, { timeout: 2500 });
    } else {
      window.setTimeout(callback, 1500);
    }
  };

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
}

/** Non-critical UI — deferred until after load so mobile LCP is not competing with hydration. */
export function ClientEnhancements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterLoad(() => setReady(true));
  }, []);

  return (
    <>
      <MarkdownDownload />
      {ready ? (
        <>
          <MouseHelper />
          <ScrollReveal />
          <CookieConsent />
        </>
      ) : null}
    </>
  );
}
