import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CtaBanner } from "@/components/sections/HeroSection";
import { legacyAssets } from "@/lib/assets/legacy";
import { getLegacyItem, getLegacySlugs } from "@/lib/legacy";

type LegacyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLegacySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getLegacyItem(slug);

  if (!item) {
    return { title: "Legacy — Zion" };
  }

  return {
    title: `${item.title} — Zion`,
    description: item.body[0],
  };
}

export default async function LegacyItemPage({ params }: LegacyPageProps) {
  const { slug } = await params;
  const item = getLegacyItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <PageShell>
      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">
            <div className="relative mx-auto aspect-[417/500] w-full max-w-[560px] overflow-hidden lg:mx-0 lg:max-w-none">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 560px, 50vw"
                priority
              />
            </div>

            <div className="lg:pt-4">
              <h1 className="heading-section text-left">{item.title}</h1>
              <div className="mt-8 space-y-6">
                {item.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <CtaBanner image={legacyAssets.cta} title="Create your Legacy" buttonLabel="Ignite Us" />
    </PageShell>
  );
}
