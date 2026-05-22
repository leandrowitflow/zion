"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNavItems, homeAssets } from "@/lib/assets/home";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-50 h-[111px] w-full bg-white">
      <div className="relative mx-auto h-[111px] w-full max-w-[1920px]">
        {/* Logo — Figma: 230×93 at left 21px, top 9px */}
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

        {/* Nav — fluid flex aligned to content gutter, scales on all large viewports */}
        <nav className="absolute right-[var(--site-gutter)] top-0 flex h-[111px] max-w-[calc(100%-max(1.25rem,21px)-240px)] items-center justify-end gap-[clamp(0.75rem,1.2vw,1.75rem)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
  );
}
