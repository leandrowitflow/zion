import Image from "next/image";
import { PartnersCarousel } from "@/components/sections/PartnersCarousel";

export function PartnersSection() {
  return <PartnersCarousel />;
}

type CardItem = {
  image: string;
  title: string;
  href?: string;
};

type CardGridProps = {
  items: CardItem[];
  columns?: 3 | 4;
};

export function CardGrid({ items, columns = 3 }: CardGridProps) {
  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-8 ${gridClass}`}>
      {items.map((item) => (
        <article key={item.title} className="group">
          <div className="relative aspect-[417/500] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-card-title mt-4 block text-center text-foreground hover:text-accent"
            >
              {item.title}
            </a>
          ) : (
            <p className="font-card-title mt-4 text-center text-foreground">{item.title}</p>
          )}
        </article>
      ))}
    </div>
  );
}

type TeamMember = {
  image: string;
  name: string;
  role: string;
  href?: string;
};

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <article key={member.name}>
          <div className="relative aspect-[411/502] overflow-hidden">
            <Image src={member.image} alt={member.name} fill className="object-cover" />
          </div>
          {member.href ? (
            <a
              href={member.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-card-title mt-4 block text-foreground hover:text-accent"
            >
              {member.name}
            </a>
          ) : (
            <p className="font-card-title mt-4 text-foreground">{member.name}</p>
          )}
          <p className="mt-1 text-base text-muted">{member.role}</p>
        </article>
      ))}
    </div>
  );
}
