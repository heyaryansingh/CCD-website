import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollFX } from "@/components/ScrollFX";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { activeNavMap } from "@/lib/pages.server";

export const metadata: Metadata = {
  title: {
    default: "Cooperative Community Development",
    template: "%s | Cooperative Community Development",
  },
  description:
    "CCD is building community-owned infrastructure in Irvington, Baltimore.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ovo&family=Ropa+Sans&family=Sue+Ellen+Francisco&family=Inknut+Antiqua:wght@500;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader activeMap={activeNavMap()} />
        {children}
        <SiteFooter />
        <ScrollFX />
      </body>
    </html>
  );
}
