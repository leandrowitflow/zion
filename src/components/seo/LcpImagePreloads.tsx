import type { LinkHTMLAttributes } from "react";

type PreloadLinkProps = LinkHTMLAttributes<HTMLLinkElement> & {
  fetchpriority?: "high" | "low" | "auto";
};

/** LCP poster preloads — lowercase fetchpriority required for Lighthouse discovery audit. */
export function LcpImagePreloads() {
  const highPriority = { fetchpriority: "high" } as PreloadLinkProps;

  return (
    <>
      <link
        rel="preload"
        href="/images/home/hero-video-poster-sm.jpg"
        as="image"
        media="(max-width: 1023px)"
        {...highPriority}
      />
      <link
        rel="preload"
        href="/images/home/hero-video-poster.jpg"
        as="image"
        media="(min-width: 1024px)"
        {...highPriority}
      />
    </>
  );
}
