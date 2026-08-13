import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { allPaths, languageAlternates, resolvePath } from "@/lib/routes.server";

// Every URL except the English home page, in every language. See
// lib/routes.server.ts for the shapes this covers.

type Props = { params: Promise<{ path: string[] }> };

export async function generateStaticParams() {
  return allPaths().map((path) => ({ path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const resolved = resolvePath(path);
  if (resolved?.kind !== "page") return {};
  // Every other language's home page has the same doubled-title problem as the
  // English one — see app/page.tsx.
  const isHome = resolved.page.slug === "";
  return {
    title: isHome ? { absolute: resolved.page.seo.title } : resolved.page.seo.title,
    description: resolved.page.seo.description,
    alternates: { languages: languageAlternates(path) },
  };
}

export default async function SitePath({ params }: Props) {
  const { path } = await params;
  const resolved = resolvePath(path);
  if (!resolved) notFound();
  if (resolved.kind === "redirect") redirect(resolved.to);
  return <SiteShell locale={resolved.locale} page={resolved.page} />;
}
