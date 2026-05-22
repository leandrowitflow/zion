"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNavItems, homeAssets } from "@/lib/assets/home";

function MenuIcon() {
  return (
    <span className="flex flex-col gap-1.5" aria-hidden="true">
      <span className="block h-px w-6 bg-[#2b2e2b]" />
      <span className="block h-px w-6 bg-[#2b2e2b]" />
      <span className="block h-px w-6 bg-[#2b2e2b]" />
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
        <div className="relative mx-auto h-[111px] w-full max-w-[1920px]">
          <Link
            href="/"
            className="absolute left-[max(1.25rem,21px)] top-[9px] h-[93px] w-[min(230px,40vw)] max-w-[230px]"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={homeAssets.logo}
                alt="ZION Creative Artisans"
                width={230}
                height={228}
                className="absolute left-0 top-[-72.07%] h-[245.05%] w-full max-w-none"
                priority
              />
            </div>
          </Link>

          {!menuOpen && (
            <button
              type="button"
              className="absolute right-[var(--site-gutter)] top-1/2 -translate-y-1/2 p-2 min-[1400px]:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          )}

          <nav className="absolute right-[var(--site-gutter)] top-0 hidden h-[111px] items-center justify-end gap-[clamp(0.75rem,1.2vw,1.75rem)] min-[1400px]:flex">
            {headerNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative shrink-0 whitespace-nowrap font-serif not-italic transition-opacity hover:opacity-70"
                  style={{
                    fontSize: item.fontSize,
                    lineHeight: `${item.lineHeight}px`,
                    color: item.color,
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute left-1/2 top-[calc(100%+7px)] block h-px w-[40px] -translate-x-1/2">
                      <Image
                        src={homeAssets.navUnderline}
                        alt=""
                        width={40}
                        height={1}
                        className="h-px w-[40px]"
                      />
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile menu — Figma 2552:33 */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#1a1815] min-[1400px]:hidden">
          <div className="relative mx-auto h-[111px] w-full max-w-[1920px] shrink-0">
            <Link
              href="/"
              className="absolute left-[max(1.25rem,21px)] top-[9px] h-[93px] w-[min(230px,40vw)] max-w-[230px]"
              onClick={() => setMenuOpen(false)}
            >
              <div className="relative h-full w-full overflow-hidden brightness-0 invert">
                <Image
                  src={homeAssets.logo}
                  alt="ZION Creative Artisans"
                  width={230}
                  height={228}
                  className="absolute left-0 top-[-72.07%] h-[245.05%] w-full max-w-none"
                />
              </div>
            </Link>

            <button
              type="button"
              className="absolute right-[var(--site-gutter)] top-1/2 -translate-y-1/2 p-2"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-col gap-5 px-[var(--site-gutter)] pb-10 pt-2 text-left">
            {headerNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-serif text-[clamp(1.625rem,6.5vw,2.75rem)] leading-[1.2] transition-opacity hover:opacity-70 ${
                    isActive ? "text-white" : "text-[#c4c4bc]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
