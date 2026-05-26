"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { BLOG_POSTS_PER_PAGE, blogPostPath, type BlogPost } from "@/lib/blog";

type BlogPostsGridProps = {
  posts: BlogPost[];
};

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="min-w-0">
      <Link href={blogPostPath(post.slug)} className="group block">
        {post.image ? (
          <div className="journal-card-media relative w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="journal-card-media bg-[#2a2826]/5" aria-hidden />
        )}
        <h3 className="blog-card-title mt-8 text-center transition group-hover:text-accent">
          {post.title}
        </h3>
      </Link>
    </article>
  );
}

function PaginationDots({ page, totalPages }: { page: number; totalPages: number }) {
  return (
    <div
      className="flex h-[7px] items-center gap-[11px]"
      role="tablist"
      aria-label="Journal pages"
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === page;

        return (
          <span
            key={pageNumber}
            role="tab"
            aria-selected={isActive}
            aria-label={`Page ${pageNumber}`}
            className={`size-[7px] shrink-0 rounded-full ${isActive ? "bg-[#787774]" : "bg-[#D9D9D9]"}`}
          />
        );
      })}
    </div>
  );
}

function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      disabled={disabled}
      onClick={onClick}
      className="flex size-[50px] items-center justify-center rounded-full border border-[#2a2826]/20 text-[#2a2826] transition hover:border-[#2a2826]/40 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M16 6H1M1 6L6 1M1 6L6 11" : "M1 6H16M16 6L11 1M16 6L11 11"}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** Figma 2624:59+ — 3-column journal grid with pagination when posts exist */
export function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_POSTS_PER_PAGE));
  const [page, setPage] = useState(1);

  const visiblePosts = useMemo(() => {
    const start = (page - 1) * BLOG_POSTS_PER_PAGE;
    return posts.slice(start, start + BLOG_POSTS_PER_PAGE);
  }, [page, posts]);

  if (posts.length === 0) {
    return (
      <div
        className="grid min-h-[120px] grid-cols-1 gap-x-[19px] gap-y-[clamp(3.5rem,7vw,118px)] sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Journal articles"
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-[19px] gap-y-[clamp(3.5rem,7vw,118px)] sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-[clamp(3rem,5vw,80px)] flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <PaginationDots page={page} totalPages={totalPages} />

        <div className="flex items-center gap-4">
          <PaginationArrow
            direction="prev"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          />
          <PaginationArrow
            direction="next"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          />
        </div>
      </div>
    </div>
  );
}
