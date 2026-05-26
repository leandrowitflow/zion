import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CtaBanner } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { destinationAssets } from "@/lib/assets/destination";
import { getDestination, getDestinationSlugs } from "@/lib/destinations";
import { buildSlugMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, touristDestinationSchema } from "@/lib/seo/schemas";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    return { title: "Destination — Zion" };
  }

  return buildSlugMetadata(
    destination.title,
    destination.body[0],
    `/destination/${slug}`,
    destination.image,
  );
}

export default async function DestinationItemPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  const path = `/destination/${slug}`;

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destination", path: "/destination" },
            { name: destination.title, path },
          ]),
          touristDestinationSchema({
            name: destination.title,
            description: destination.body[0],
            path,
            image: destination.image,
          }),
        ]}
      />
      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">
            <div className="relative mx-auto aspect-[417/500] w-full max-w-[560px] overflow-hidden lg:mx-0 lg:max-w-none">
              <Image
                src={destination.image}
                alt={destination.title}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 560px, 50vw"
                priority
              />
            </div>

            <div className="lg:pt-4">
              <h1 className="heading-section text-left">{destination.title}</h1>
              <div className="mt-8 space-y-6">
                {destination.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      <CtaBanner
        image={destinationAssets.cta}
        title="Craft With Us"
        buttonLabel="Ignite Us"
      />
    </PageShell>
  );
}
