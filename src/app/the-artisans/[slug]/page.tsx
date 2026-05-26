import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SiteContainer, SiteSection } from "@/components/layout/SiteContainer";
import { TeamTraitBars } from "@/components/sections/TeamTraitBars";
import { getTeamMember, getTeamMemberSlugs } from "@/lib/team";

type TeamMemberPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTeamMemberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return { title: "Artisan — Zion" };
  }

  return {
    title: `${member.name} — Zion`,
    description: member.bio[0],
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  const midpoint = Math.ceil(member.bio.length / 2);
  const bioColumns = [member.bio.slice(0, midpoint), member.bio.slice(midpoint)];

  return (
    <PageShell>
      <SiteSection className="bg-[#FAF8F6]">
        <SiteContainer>
          <div className="mb-8 lg:mb-12">
            <p className="team-profile-role mb-4">
              {member.role}
            </p>
            <h1 className="heading-section text-left">{member.name}</h1>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(360px,640px)_minmax(0,1fr)] lg:items-stretch lg:gap-x-16 xl:gap-x-20">
            <div className="relative mx-auto aspect-[840/1260] w-full max-w-[560px] lg:mx-0 lg:max-w-none">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 560px, 40vw"
                priority
              />
            </div>

            <div className="flex flex-col lg:self-stretch lg:justify-between lg:pt-2 xl:pt-6">
              <TeamTraitBars traits={member.traits} />

              <div className="relative z-10 mt-10 bg-background px-6 py-10 lg:-ml-32 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:px-10 lg:py-16 xl:-ml-44">
                {bioColumns.map((column, index) => (
                  <div key={index} className="max-w-[260px] space-y-6">
                    {column.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="text-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SiteContainer>
      </SiteSection>

    </PageShell>
  );
}
