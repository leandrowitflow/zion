import Image from "next/image";
import { OutlineButton } from "@/components/ui/SectionHeading";

type HeroSectionProps = {
  image: string;
  title?: string;
  subtitle?: string;
  button?: { label: string; href: string };
  height?: string;
  objectPosition?: string;
};

export function HeroSection({
  image,
  title,
  subtitle,
  button,
  height = "min-h-[480px] h-[clamp(480px,56.25vw,1400px)]",
  objectPosition = "object-bottom",
}: HeroSectionProps) {
  return (
    <section className={`site-full-bleed relative w-full overflow-hidden ${height}`}>
      <Image src={image} alt="" fill className={`object-cover ${objectPosition}`} sizes="100vw" priority />
      <div className="absolute inset-0 bg-black/20" />
      {(title || button) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          {title && (
            <h1 className="max-w-4xl heading-section text-white">
              {title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
          )}
          {subtitle && (
            <p className="mt-4 font-serif text-2xl md:text-4xl">{subtitle}</p>
          )}
          {button && (
            <div className="mt-10">
              <OutlineButton href={button.href}>{button.label}</OutlineButton>
            </div>
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
      <Image src={image} alt="" fill className="object-cover object-bottom" sizes="100vw" />
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
    <section className="site-full-bleed relative w-full overflow-hidden min-h-[500px] h-[clamp(500px,33.4vw,900px)]">
      <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <h2 className="heading-section text-white">{title}</h2>
        <div className="mt-10">
          <OutlineButton href={buttonHref}>{buttonLabel}</OutlineButton>
        </div>
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
        alt=""
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width: 1920px) 50vw, 960px"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <h2 className="heading-section text-white">{title}</h2>
        <div className="mt-8 opacity-0 transition group-hover:opacity-100">
          <OutlineButton href="/ignite-us">{buttonLabel}</OutlineButton>
        </div>
      </div>
    </div>
  );
}
