import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import { SiteAnalyticsBody } from "@/components/analytics/SiteAnalyticsBody";
import { SiteAnalyticsHead } from "@/components/analytics/SiteAnalyticsHead";
import { ClientEnhancements } from "@/components/layout/ClientEnhancements";
import { RootStructuredData } from "@/components/seo/RootStructuredData";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Luxury Travel Portugal`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <SiteAnalyticsHead />
        <link rel="icon" href="/favicon-64x64.png" type="image/png" sizes="64x64" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link
          rel="preload"
          href="/images/home/hero-video-poster-sm.jpg"
          as="image"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/Ivy-Presto-font-Family/fonts/fonnts.com-Ivy-Presto-Display-Light.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="author" href="/llms.txt" />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <SiteAnalyticsBody />
        <GoogleTagManagerNoscript />
        <RootStructuredData />
        <ClientEnhancements />
        {children}
      </body>
    </html>
  );
}
