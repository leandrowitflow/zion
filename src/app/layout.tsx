import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { MouseHelper } from "@/components/ui/MouseHelper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZION Creative Artisans",
  description: "Redefining luxury through unique journeys in Portugal",
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
        <link rel="stylesheet" href="https://use.typekit.net/uyr3aws.css" />
      </head>
      <body className="flex min-h-full flex-col">
        <MouseHelper />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
