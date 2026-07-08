type HeroLcpPosterProps = {
  poster: string;
  mobilePoster?: string;
  objectPosition?: string;
};

/** Server-only LCP poster — inline layout so paint is not blocked on the CSS bundle. */
export function HeroLcpPoster({
  poster,
  mobilePoster,
  objectPosition = "object-center",
}: HeroLcpPosterProps) {
  const objectFitPosition =
    objectPosition === "object-center"
      ? "center"
      : objectPosition.replace("object-", "").replace("-", " ");

  return (
    <picture>
      {mobilePoster ? <source media="(max-width: 1023px)" srcSet={mobilePoster} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        width={640}
        height={960}
        sizes="100vw"
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: objectFitPosition,
        }}
        aria-hidden
      />
    </picture>
  );
}
