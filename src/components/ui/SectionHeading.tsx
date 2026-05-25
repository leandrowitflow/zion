import Link from "next/link";

type SectionHeadingProps = {
  before: string;
  accent: string;
  align?: "left" | "center";
  className?: string;
  /** White text on dark/image backgrounds */
  inverted?: boolean;
  /** Stack accent word on its own line (e.g. Crafted for the / Extraordinary) */
  accentOnNewLine?: boolean;
};

/** Section h2 — ivypresto-display 57/60 via .heading-section + theme color tokens */
export function SectionHeading({
  before,
  accent,
  align = "center",
  className = "",
  inverted = false,
  accentOnNewLine = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const colorClass = inverted ? "text-white" : "text-foreground";

  if (accentOnNewLine) {
    return (
      <h2 className={`heading-section ${colorClass} ${alignClass} ${className}`.trim()}>
        <span className="block">{before}</span>
        <span className="block text-accent">{accent}</span>
      </h2>
    );
  }

  return (
    <h2 className={`heading-section ${colorClass} ${alignClass} ${className}`.trim()}>
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
      className={`btn-outline-light max-lg:mx-auto max-lg:block max-lg:w-fit lg:mx-0 ${className}`.trim()}
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
      className={`btn-filled max-lg:mx-auto max-lg:block max-lg:w-fit lg:mx-0 ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
