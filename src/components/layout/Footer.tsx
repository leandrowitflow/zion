"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/layout/NavLink";
import { navItems } from "@/lib/navigation";
import { sharedAssets } from "@/lib/assets/shared";
import { SITE_SOCIAL } from "@/lib/seo/site";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[#1a1815] text-[#c4c4bc]">
      <div className="site-container min-h-[560px] pb-10 pt-[115px]">
        {/* Main columns — Figma 2326:46 (401 | 267 | 267 at 1920) */}
        <div className="flex flex-col items-center gap-12 text-center xl:grid xl:grid-cols-[401px_267px_267px] xl:items-start xl:justify-between xl:gap-y-0 xl:text-left">
          {/* Column 1 — tagline + certification logos (2326:50, 2326:53) */}
          <div className="w-full xl:w-[401px]">
            <p className="footer-tagline mx-auto max-w-[401px] text-white xl:mx-0">
              Redefining luxury through Unique Journeys
            </p>
            <div className="relative mx-auto mt-10 h-[57px] w-[373px] max-w-full overflow-hidden xl:mx-0">
              <Image
                src={sharedAssets.footerLogos}
                alt="Partner certifications"
                width={398}
                height={153}
                className="absolute left-[-6.52%] top-[-86.84%] h-[268.42%] w-[106.62%] max-w-none"
              />
            </div>
          </div>

          {/* Column 2 — headquarters + social (2326:48, 2326:64) */}
          <div className="w-full xl:w-[267px]">
            <p className="footer-body font-bold">
              Headquarters :
              <br />
              <span className="font-normal leading-[27px]">
                Av. Defensores de Chaves, 15
                <br />
                4ª D, 1000-109, Lisbon, Portugal
                <br />
              </span>
              <span className="leading-[27px]">Branch :</span>
              <span className="font-normal leading-[27px]">
                <br />
                Porto | Algarve | Madeira | Azores
              </span>
            </p>

            <div className="mt-[22px] flex justify-center gap-2 xl:justify-start">
              <a href={SITE_SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Image src={sharedAssets.facebook} alt="" width={47} height={47} aria-hidden />
              </a>
              <a href={SITE_SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Image src={sharedAssets.linkedin} alt="" width={47} height={47} aria-hidden />
              </a>
              <a href={SITE_SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Image src={sharedAssets.instagram} alt="" width={47} height={47} aria-hidden />
              </a>
              <a
                href={SITE_SOCIAL.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="relative block h-[47px] w-[47px]"
              >
                <Image src={sharedAssets.spotifyBg} alt="" fill className="object-cover" aria-hidden />
                <Image
                  src={sharedAssets.spotifyIcon}
                  alt=""
                  width={17}
                  height={15}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  aria-hidden
                />
              </a>
            </div>
          </div>

          {/* Column 3 — contact (2326:51, 2326:49, 2326:52) */}
          <div className="w-full xl:w-[267px]">
            <p className="footer-label text-white">Say Hello</p>
            <div className="footer-body-tight mt-2 font-bold">
              <a
                href="mailto:ignite@zion-creativeartisans.com"
                className="block font-normal underline decoration-solid underline-offset-2 hover:text-white"
              >
                ignite@zion-creativeartisans.com
              </a>
              <p className="h-[26px]" aria-hidden="true" />
              <p>
                <a
                  href="tel:+351210188406"
                  className="font-normal underline decoration-solid underline-offset-2 hover:text-white"
                >
                  (+351) 210 188 406
                </a>
                <br />
                Opening Hours :{" "}
                <span className="font-normal">
                  Weekdays
                  <br />
                  10:00AM – 7:00PM
                </span>
                &nbsp;UTC Lisbon
                <br />
                Closed&nbsp;
                <span className="font-normal">on Saturdays, Sundays and Bank Holidays</span>
              </p>
            </div>
            <Link
              href="/ignite-us"
              className="footer-label mt-3 inline-block text-white hover:underline"
            >
              Careers
            </Link>
          </div>
        </div>

        {/* Bottom bar — Figma 2326:54 */}
        <div className="mt-[72px] border-t border-[#c4c4bc]/30 pt-[17px]">
          <div className="flex flex-col items-center gap-6 xl:flex-row xl:items-end xl:justify-between">
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:justify-start">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                  className="footer-nav-link text-white transition-opacity hover:opacity-80"
                  underlineClassName="bg-white"
                />
              ))}
            </nav>
            <p className="shrink-0 text-center text-[16px] leading-[26px] text-[#c4c4bc] xl:text-right">
              ® ZION CREATIVE ARTISANS 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
