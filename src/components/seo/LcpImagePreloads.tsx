/** LCP poster preloads. HTTP Link headers in vercel.json also send fetchpriority=high. */
export function LcpImagePreloads() {
  return (
    <>
      <link
        rel="preload"
        href="/images/home/hero-video-poster-sm.jpg"
        as="image"
        type="image/jpeg"
        media="(max-width: 1023px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        href="/images/home/hero-video-poster.jpg"
        as="image"
        type="image/jpeg"
        media="(min-width: 1024px)"
        fetchPriority="high"
      />
    </>
  );
}
