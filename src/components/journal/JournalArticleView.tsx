import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

import type { JournalArticle } from "@/lib/blog";

type JournalArticleViewProps = {
  article: JournalArticle;
};

function formatDate(iso?: string): string | null {
  if (!iso) {
    return null;
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function JournalAuthor({ author }: { author: NonNullable<JournalArticle["author"]> }) {
  return (
    <div className="mt-10 flex items-start gap-4 border-t border-[#2a2826]/10 pt-8">
      {author.avatarUrl ? (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : null}
      <div>
        <p className="font-display text-lg text-[#2a2826]">{author.name}</p>
        {author.jobTitle ? (
          <p className="mt-1 text-sm text-[#2a2826]/70">{author.jobTitle}</p>
        ) : null}
        {author.bio ? <p className="mt-3 text-body">{author.bio}</p> : null}
      </div>
    </div>
  );
}

export function JournalArticleView({ article }: JournalArticleViewProps) {
  const publishedLabel = formatDate(article.datePublished);

  return (
    <article>
      <Link
        href="/journal"
        className="mb-8 inline-flex items-center gap-2 font-display text-sm text-[#2a2826]/70 transition hover:text-[#2a2826]"
      >
        ← Back to The Journal
      </Link>

      <header className="max-w-3xl">
        {publishedLabel ? (
          <time dateTime={article.datePublished} className="text-sm text-[#2a2826]/60">
            {publishedLabel}
          </time>
        ) : null}
        <h1 className="heading-section mt-4 text-left">{article.title}</h1>
        {article.description ? (
          <p className="mt-6 text-body text-lg">{article.description}</p>
        ) : null}
      </header>

      {article.image ? (
        <div className="relative mt-10 aspect-[16/10] w-full max-w-4xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 896px"
            priority
          />
        </div>
      ) : null}

      <div className="journal-prose mt-10 max-w-3xl">
        <Markdown>{article.content}</Markdown>
      </div>

      {article.author ? <JournalAuthor author={article.author} /> : null}
    </article>
  );
}
