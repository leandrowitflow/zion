"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
  underlineClassName?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

/** Nav link with active underline matching footer — width of label, line below text */
export function NavLink({
  href,
  label,
  isActive,
  className = "",
  underlineClassName = "bg-current",
  style,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      style={style}
      className={`inline-flex w-fit flex-col gap-0 ${className}`.trim()}
      onClick={onClick}
    >
      <span className="block leading-none">{label}</span>
      {isActive && (
        <span className={`h-px w-full ${underlineClassName}`} aria-hidden="true" />
      )}
    </Link>
  );
}
