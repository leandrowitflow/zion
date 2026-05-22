import Link from "next/link";

type SectionHeadingProps = {
  before: string;
  accent: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  before,
  accent,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <h2
      className={`font-serif text-4xl leading-tight text-foreground md:text-[61.5px] md:leading-[56px] ${alignClass} ${className}`}
    >
      {before}
      <span className="text-accent">{accent}</span>
    </h2>
  );
}

type OutlineButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function OutlineButton({ href, children, className = "" }: OutlineButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[57px] min-w-[189px] items-center justify-center border-2 border-white px-8 font-serif text-[17px] font-semibold text-white transition hover:bg-white/10 ${className}`}
    >
      {children}
    </Link>
  );
}

type FilledButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function FilledButton({ href, children, className = "" }: FilledButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[57px] min-w-[173px] items-center justify-center bg-button px-8 font-serif text-[17px] font-semibold text-white transition hover:bg-button/90 ${className}`}
    >
      {children}
    </Link>
  );
}
