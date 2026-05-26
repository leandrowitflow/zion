import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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

      <div className="journal-prose mt-10 max-w-3xl">
        <Markdown rehypePlugins={[rehypeRaw]}>{article.content}</Markdown>
      </div>
    </article>
  );
}
