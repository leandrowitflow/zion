import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { CtaBanner } from "@/components/sections/HeroSection";
import { experiencesAssets } from "@/lib/assets/experiences";
import { getExperience, getExperienceSlugs } from "@/lib/experiences";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    return { title: "Experience — Zion" };
  }

  return {
    title: `${experience.title} — Zion`,
    description: experience.body[0],
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  return (
    <PageShell>
      {/* Image + text side by side */}
      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">
            {/* Image */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[560px] overflow-hidden lg:mx-0 lg:max-w-none">
              <Image
                src={experience.hero}
                alt={experience.title}
                fill
                className={`object-cover ${experience.objectPosition ?? "object-center"}`}
                sizes="(max-width: 1023px) 560px, 50vw"
                priority
              />
            </div>

            {/* Title + body */}
            <div className="lg:pt-4">
              <h1 className="heading-section text-left">{experience.title}</h1>
              <div className="mt-8 space-y-6">
                {experience.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

      {/* CTA */}
      <CtaBanner
        image={experiencesAssets.cta}
        title="Craft With Us"
        buttonLabel="Ignite Us"
      />
    </PageShell>
  );
}
