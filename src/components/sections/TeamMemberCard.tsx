import Link from "next/link";
import type { TeamMember } from "@/lib/team";
import { TeamMemberPhoto } from "@/components/sections/TeamMemberPhoto";

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="flex flex-col">
      <Link href={`/the-artisans/${member.slug}`} className="group block">
        <TeamMemberPhoto
          primary={member.image}
          secondary={member.hoverImage}
          alt={member.name}
        />
        <div className="mt-2 mb-5 flex flex-col gap-1.5 text-left">
          <p className="font-card-title text-foreground transition-colors group-hover:text-accent">
            {member.name}
          </p>
          <p className="text-sm leading-[1.5] text-muted">{member.role}</p>
        </div>
      </Link>
    </article>
  );
}
