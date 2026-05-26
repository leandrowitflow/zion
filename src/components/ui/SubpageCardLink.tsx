"use client";

import Image from "next/image";
import Link from "next/link";

type SubpageCardLinkProps = {
  href: string;
  title: string;
  image: string;
  aspectClassName?: string;
  objectPosition?: string;
  sizes: string;
};

export function SubpageCardLink({
  href,
  title,
  image,
  aspectClassName = "aspect-[417/500]",
  objectPosition = "object-center",
  sizes,
}: SubpageCardLinkProps) {
  return (
    <Link href={href} className="subpage-card group block">
      <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition duration-500 group-hover:scale-105 ${objectPosition}`}
          sizes={sizes}
        />
      </div>
      <div className="subpage-card-meta mt-5 text-center">
        <p className="subpage-card-title">{title}</p>
        <span className="subpage-card-readmore">Read more</span>
      </div>
    </Link>
  );
}
