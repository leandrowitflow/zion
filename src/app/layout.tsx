import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { RootStructuredData } from "@/components/seo/RootStructuredData";
import { TypekitStylesheet } from "@/components/ui/TypekitStylesheet";
import { MouseHelper } from "@/components/ui/MouseHelper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Luxury Travel Portugal`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/Logos/ZION/Favicon-01.png",
    apple: "/Logos/ZION/Favicon-02.png",
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
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <TypekitStylesheet />
        <link rel="author" href="/llms.txt" />
      </head>
      <body className="flex min-h-full flex-col">
        <RootStructuredData />
        <MouseHelper />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
