"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { headerNavItems, homeAssets } from "@/lib/assets/home";

function MenuIcon() {
  return (
    <span className="flex flex-col gap-1.5" aria-hidden="true">
      <span className="block h-px w-6 bg-foreground" />
      <span className="block h-px w-6 bg-foreground" />
      <span className="block h-px w-6 bg-foreground" />
    </span>
  );
}

function CloseIcon() {
  return (
    <span className="relative block h-6 w-6" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
      <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
    </span>
  );
}

function LogoLink({
  inverted = false,
  onClick,
  className,
}: {
  inverted?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={
        className ??
        "absolute left-0 top-1/2 flex h-[68px] w-[min(167px,calc(100%-3.5rem))] max-w-[167px] -translate-y-1/2 items-center"
      }
      onClick={onClick}
    >
      {/* Static PNG — skip the image optimizer so this does not compete with LCP. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={homeAssets.logo}
        alt="ZION Creative Artisans"
        width={167}
        height={72}
        decoding="async"
        fetchPriority="low"
        className={`h-auto max-h-full w-full object-contain object-left ${inverted ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}

/** Figma header (2559:48) desktop nav | mobile hamburger + menu (2552:33) below xl */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="relative z-50 h-[111px] w-full bg-white">
        {/* Mobile — logo + menu icon aligned to desktop header gutters */}
        <div className="header-nav-mobile relative h-[111px]">
          <LogoLink className="absolute left-[var(--header-gutter-left)] top-1/2 flex h-[68px] w-[min(167px,calc(100%-var(--header-gutter-left)-var(--header-gutter-right)-2.75rem))] max-w-[167px] -translate-y-1/2 items-center" />

          {!menuOpen && (
            <button
              type="button"
              className="absolute right-[var(--header-gutter-right)] top-1/2 -translate-y-1/2 p-2"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          )}
        </div>

        {/* Desktop — logo 21px from left, nav 71px from right */}
        <div className="header-nav-desktop relative h-[111px] w-full">
          <LogoLink className="absolute left-[var(--header-gutter-left)] top-1/2 flex h-[68px] w-[167px] -translate-y-1/2 items-center" />

          <nav className="absolute right-[var(--header-gutter-right)] top-0 flex h-[111px] items-center gap-4 xl:gap-8">
            {headerNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
                className="header-nav-link shrink-0 whitespace-nowrap transition-opacity hover:opacity-70"
              />
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile menu — Figma 2552:33 */}
      {menuOpen && (
        <div className="header-menu-overlay fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#1a1815]">
          <div className="site-container relative h-[111px] shrink-0">
            <LogoLink inverted onClick={() => setMenuOpen(false)} />

            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="site-container flex flex-col gap-5 pb-10 pt-2 text-left">
            {headerNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={isActive}
                  className={`font-display font-light text-[clamp(1.625rem,6.5vw,2.75rem)] leading-[1.086] transition-opacity hover:opacity-70 ${
                    isActive ? "text-white" : "text-[#c4c4bc]"
                  }`}
                  underlineClassName="bg-white"
                  onClick={() => setMenuOpen(false)}
                />
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
