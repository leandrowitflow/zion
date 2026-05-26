import Image from "next/image";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type JournalMarkdownProps = {
  content: string;
};

function normalizeImageSrc(src: unknown): string | undefined {
  return typeof src === "string" ? src : undefined;
}

function isRemoteImageSrc(src?: string): src is string {
  return Boolean(src && /^https?:\/\//i.test(src) && !src.includes("COVER_IMAGE_PLACEHOLDER"));
}

export function JournalMarkdown({ content }: JournalMarkdownProps) {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ src, alt }) => {
          const imageSrc = normalizeImageSrc(src);
          if (!isRemoteImageSrc(imageSrc)) {
            return null;
          }

          return (
            <span className="journal-inline-media relative my-6 block w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={alt?.trim() || ""}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </span>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
