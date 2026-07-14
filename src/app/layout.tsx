import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import { SiteAnalyticsBody } from "@/components/analytics/SiteAnalyticsBody";
import { SiteAnalyticsHead } from "@/components/analytics/SiteAnalyticsHead";
import { ClientEnhancements } from "@/components/layout/ClientEnhancements";
import { LcpImagePreloads } from "@/components/seo/LcpImagePreloads";
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
        <LcpImagePreloads />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function loadTk(){var h="https://use.typekit.net/uyr3aws.css";var l=document.createElement("link");l.rel="stylesheet";l.href=h;l.media="print";l.onload=function(){this.media="all"};document.head.appendChild(l);}if(document.readyState==="complete"){loadTk();}else{window.addEventListener("load",loadTk,{once:true});}})();`,
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
