import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { locales } from "@/lib/i18n";
import { languageAlternates, resolvePath } from "@/lib/routes.server";

// Each language's home page: / (rewritten from /en) and /es, /fr, …

type Props = { params: Promise<{ lang: string }> };

// Only the nine languages are real routes here. Anything else — /about, /join,
// /nonsense — must NOT match, so that next.config.ts's fallback rewrite can send
// it to /en/… instead. Leaving this on would make /about render as a language.
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map(({ code }) => ({ lang: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const resolved = resolvePath([lang]);
  if (resolved?.kind !== "page") return {};
  return {
    // The layout's template appends the organisation's name to every title. The
    // home page's title already IS that name, so without `absolute` it doubles.
    title: { absolute: resolved.page.seo.title },
    description: resolved.page.seo.description,
    alternates: { languages: languageAlternates([lang]) },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { lang } = await params;
  const resolved = resolvePath([lang]);
  if (resolved?.kind !== "page") notFound();
  return <SiteShell locale={resolved.locale} page={resolved.page} />;
}
