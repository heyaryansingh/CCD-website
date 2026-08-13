import type { Metadata, Viewport } from "next";
import "../globals.css";
import { ScrollFX } from "@/components/ScrollFX";
import { localeInfo, locales } from "@/lib/i18n";

// THE root layout. It lives under [lang] rather than at app/layout.tsx because
// <html lang> and <html dir> have to be right, and a layout above the language
// segment cannot know the language without making every page render on demand.
//
// English keeps its bare URLs — /about, not /en/about. next.config.ts rewrites
// those onto this tree and redirects /en/* back to the bare form, so there is
// exactly one address for every page. See the comments there.

export async function generateStaticParams() {
  return locales.map(({ code }) => ({ lang: code }));
}

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const info = localeInfo(lang);

  return (
    <html lang={info.tag} dir={info.dir}>
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
