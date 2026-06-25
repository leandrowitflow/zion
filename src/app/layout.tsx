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
  weight: ["400", "600", "700"],
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
          media="(max-width: 1023px)"
        />
        <link
          rel="preload"
          href="/images/home/hero-video-poster.jpg"
          as="image"
          fetchPriority="high"
          media="(min-width: 1024px)"
        />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h="https://use.typekit.net/uyr3aws.css";var l=document.createElement("link");l.rel="stylesheet";l.href=h;l.media="print";l.onload=function(){this.media="all"};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/uyr3aws.css" />
        </noscript>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-oriented site summary" />
        <link rel="alternate" type="application/json" href="/agents.json" title="Agent manifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
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
