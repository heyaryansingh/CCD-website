import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollFX } from "@/components/ScrollFX";

// Header and footer are NOT here — they live in components/SiteShell, below the
// route segment that carries the language, because their wording is translated.
// This layout renders above that, so it cannot know which language a page is in;
// lang/dir are set on the shell's wrapper instead.

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
  // Do not cap zoom: pinch-to-zoom is how people with low vision read a page,
  // and how anyone reads a language whose script renders small.
  maximumScale: 5,
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
        {/* The body font covers Latin only. These carry Arabic, Amharic, Chinese,
            Korean and Vietnamese, and only download when a page actually uses
            them, so English pages pay nothing for them. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&family=Noto+Sans+Ethiopic:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ScrollFX />
      </body>
    </html>
  );
}
