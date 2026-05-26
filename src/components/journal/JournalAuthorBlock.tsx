import Image from "next/image";

import type { JournalAuthor } from "@/lib/blog";

type JournalAuthorBlockProps = {
  author: JournalAuthor;
};

function authorInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
}

export function JournalAuthorBlock({ author }: JournalAuthorBlockProps) {
  return (
    <div id="author-block" className="author-block">
      <div className="author-block-header">
        <div className="author-avatar">
          {author.avatarUrl ? (
            <Image src={author.avatarUrl} alt={author.name} width={56} height={56} />
          ) : (
            <span className="author-initial" aria-hidden="true">
              {authorInitial(author.name)}
            </span>
          )}
        </div>
        <div className="author-block-titles">
          <p className="author-name">{author.name}</p>
          {author.jobTitle ? <p className="author-job">{author.jobTitle}</p> : null}
        </div>
      </div>
      {author.bio ? <p className="author-bio">{author.bio}</p> : null}
    </div>
  );
}
