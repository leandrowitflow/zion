import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Page not found",
  description: "The page you are looking for could not be found. Return to ZION Creative Artisans to explore luxury travel in Portugal.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <PageShell>
      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <div className="mx-auto max-w-xl py-24 text-center">
            <h1 className="heading-section">Page not found</h1>
            <p className="text-body mt-6">
              The journey you were looking for may have moved. Let us guide you back to ZION Creative
              Artisans.
            </p>
            <Link
              href="/"
              className="btn-filled mt-10 inline-flex h-[55px] min-w-[188px] items-center justify-center px-8"
            >
              Return Home
            </Link>
          </div>
        </SiteContainer>
      </SiteSection>
    </PageShell>
  );
}
