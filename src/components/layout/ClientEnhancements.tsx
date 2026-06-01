"use client";

import dynamic from "next/dynamic";

const MouseHelper = dynamic(
  () => import("@/components/ui/MouseHelper").then((mod) => mod.MouseHelper),
  { ssr: false },
);

const ScrollReveal = dynamic(
  () => import("@/components/ui/ScrollReveal").then((mod) => mod.ScrollReveal),
  { ssr: false },
);

/** Non-critical UI enhancements — loaded after hydration. */
export function ClientEnhancements() {
  return (
    <>
      <MouseHelper />
      <ScrollReveal />
    </>
  );
}
