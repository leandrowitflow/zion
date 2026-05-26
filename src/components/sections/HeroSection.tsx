import Image from "next/image";
import { OutlineButton } from "@/components/ui/SectionHeading";

type HeroSectionProps = {
  image: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  button?: { label: string; href: string };
  height?: string;
  objectPosition?: string;
};

export function HeroSection({
  image,
  imageAlt,
  title,
  subtitle,
  button,
  height = "min-h-[480px] h-[clamp(480px,56.25vw,1400px)]",
  objectPosition = "object-bottom",
}: HeroSectionProps) {
  return (
    <section className={`site-full-bleed relative w-full overflow-hidden ${height}`}>
      <Image
        src={image}
        alt={imageAlt ?? (title ? `${title} — hero` : "")}
        fill
        className={`object-cover ${objectPosition}`}
        sizes="100vw"
        priority
        aria-hidden={!imageAlt && !title}
      />
      <div className="absolute inset-0 bg-black/20" />
      {(title || button) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-medium)] px-6 text-center text-white">
          {title && (
            <h1 className="max-w-4xl heading-section mb-0 text-white">
              {title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
          )}
          {subtitle && (
            <p className="font-display text-2xl font-light md:text-4xl">{subtitle}</p>
          )}
          {button && (
            <OutlineButton href={button.href}>{button.label}</OutlineButton>
          )}
        </div>
      )}
    </section>
  );
}

type VideoBannerProps = {
  image: string;
  className?: string;
};

export function VideoBanner({ image, className = "" }: VideoBannerProps) {
  return (
    <section
      className={`site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,56.25vw,1400px)] ${className}`}
    >
      <Image src={image} alt="" fill className="object-cover object-bottom" sizes="100vw" aria-hidden />
      <div className="absolute inset-0 bg-black/10" />
    </section>
  );
}

type CtaBannerProps = {
  image: string;
  title: string;
  buttonLabel: string;
  buttonHref?: string;
};

export function CtaBanner({
  image,
  title,
  buttonLabel,
  buttonHref = "/ignite-us",
}: CtaBannerProps) {
  return (
    <section className="site-full-bleed relative w-full overflow-hidden min-h-[480px] h-[clamp(480px,33.39vw,641px)]">
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
      <Image
        src={image}
        alt={`${title} — background`}
        fill
        className="object-cover"
        sizes="100vw"
        priority
        unoptimized
      />
        </div>
      </div>
      {/* Figma 2339:368 — 641px band; title y=38.22%, button y=53.04% at 1920 */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-[38px] px-6 text-center text-white min-[1024px]:block">
        <h2 className="cta-banner-title pointer-events-auto whitespace-nowrap min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[38.22%] min-[1024px]:w-max min-[1024px]:max-w-[min(100%,464px)] min-[1024px]:-translate-x-1/2">
          {title}
        </h2>
        <OutlineButton
          href={buttonHref}
          className="btn-outline-fixed pointer-events-auto min-[1024px]:absolute min-[1024px]:left-1/2 min-[1024px]:top-[53.04%] min-[1024px]:-translate-x-1/2"
        >
          {buttonLabel}
        </OutlineButton>
      </div>
    </section>
  );
}

type SplitCtaProps = {
  image: string;
  title: string;
  buttonLabel?: string;
};

export function SplitCta({ image, title, buttonLabel = "Contact Us" }: SplitCtaProps) {
  return (
    <div className="group relative min-h-[500px] w-full overflow-hidden lg:min-h-[min(859px,45vw)]">
      <Image
        src={image}
        alt={`${title} — Portugal`}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width: 1920px) 50vw, 960px"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-medium)] px-6 text-center text-white">
        <h2 className="heading-section mb-0 text-white">{title}</h2>
        <div className="mt-8 opacity-0 transition group-hover:opacity-100">
          <OutlineButton href="/ignite-us">{buttonLabel}</OutlineButton>
        </div>
      </div>
    </div>
  );
}
