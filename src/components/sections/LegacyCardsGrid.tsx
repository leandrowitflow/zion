"use client";

import { SubpageCardLink } from "@/components/ui/SubpageCardLink";
import type { LegacyItem } from "@/lib/legacy";

type LegacyCardsGridProps = {
  items: LegacyItem[];
};

export function LegacyCardsGrid({ items }: LegacyCardsGridProps) {
  return (
    <div className="mt-[clamp(1.5rem,5.8vw,55px)] grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-x-[19px] lg:gap-y-8">
      {items.map((item) => (
        <article key={item.slug} className="min-w-0">
          <SubpageCardLink
            href={`/legacy/${item.slug}`}
            title={item.title}
            image={item.image}
            sizes="(max-width: 1023px) 33vw, 417px"
          />
        </article>
      ))}
    </div>
  );
}
