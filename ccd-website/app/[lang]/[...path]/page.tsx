import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { allPaths, languageAlternates, resolvePath } from "@/lib/routes.server";

// Every page except a language's home page: /about (rewritten from /en/about),
// /projects/oasis-240, /es/about, /es/projects/oasis-240, and the legacy
// addresses that redirect. See lib/routes.server.ts.

type Props = { params: Promise<{ lang: string; path: string[] }> };

// A URL that is not in the list below must not match, so an unknown path falls
// through to the fallback rewrite and then to a real 404 rather than rendering
// an empty page. This is also what stops /about being read as a language.
export const dynamicParams = false;

export async function generateStaticParams() {
  return allPaths().map(([lang, ...path]) => ({ lang, path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, path } = await params;
  const resolved = resolvePath([lang, ...path]);
  if (resolved?.kind !== "page") return {};
  return {
    title: resolved.page.seo.title,
    description: resolved.page.seo.description,
    alternates: { languages: languageAlternates([lang, ...path]) },
  };
}

export default async function SitePath({ params }: Props) {
  const { lang, path } = await params;
  const resolved = resolvePath([lang, ...path]);
  if (!resolved) notFound();
  if (resolved.kind === "redirect") redirect(resolved.to);
  return <SiteShell locale={resolved.locale} page={resolved.page} />;
}
