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

function parseDimension(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function isAvatarImage(width?: number, height?: number, className?: string): boolean {
  if (className?.includes("author-avatar") || className?.includes("author")) {
    return true;
  }

  if (width && height && width <= 80 && height <= 80) {
    return true;
  }

  return false;
}

export function JournalMarkdown({ content }: JournalMarkdownProps) {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ src, alt, width, height, className }) => {
          const imageSrc = normalizeImageSrc(src);
          if (!isRemoteImageSrc(imageSrc)) {
            return null;
          }

          const parsedWidth = parseDimension(width);
          const parsedHeight = parseDimension(height);

          if (isAvatarImage(parsedWidth, parsedHeight, className)) {
            const size = parsedWidth ?? parsedHeight ?? 56;

            return (
              <Image
                src={imageSrc}
                alt={alt?.trim() || ""}
                width={size}
                height={parsedHeight ?? size}
                className={className}
              />
            );
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
