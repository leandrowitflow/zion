type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteContainer({ children, className = "" }: SiteContainerProps) {
  return <div className={`site-container ${className}`.trim()}>{children}</div>;
}

type SiteSectionProps = {
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "compact" | "none";
  as?: "section" | "div";
};

export function SiteSection({
  children,
  className = "",
  spacing = "default",
  as: Tag = "section",
}: SiteSectionProps) {
  const spacingClass =
    spacing === "none"
      ? ""
      : spacing === "compact"
        ? "site-section-compact"
        : "site-section";

  return <Tag className={`${spacingClass} ${className}`.trim()}>{children}</Tag>;
}
