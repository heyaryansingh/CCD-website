// =============================================================================
// ROUTING
//
// Two route files serve the whole site, so every URL shape is resolved here
// instead of being spread across page files that each had their own copy of the
// lookup:
//
//   /                           English home  (rewritten to /en)
//   /about                      English page  (rewritten to /en/about)
//   /projects/oasis-240         English project detail
//   /es                         Spanish home
//   /es/about                   Spanish page
//   /es/projects/oasis-240      Spanish project detail
//   /join                       alias -> redirect to /membership
//   /es/join                    alias -> redirect to /es/membership
//
// Every language is a real segment under app/[lang], because <html lang> has to
// be correct and only a layout below the language segment can set it. English's
// prefix is then hidden by the rewrites in next.config.ts, so its URLs stay bare
// and no existing link, printed flyer or search result changes.
//
// EVERY reachable URL has to appear in allPaths(). The route files set
// `dynamicParams = false`, so anything missing here is a 404 rather than a page
// rendered from a guess — including the legacy aliases, which is why they are
// listed too.
// =============================================================================

import { localePath, locales, localize, splitLocale } from "./i18n";
import { getDictionary } from "./i18n.server";
import { pages, projectDetails } from "./pages.server";
import { aliases } from "./siteData";
import type { SitePage } from "./types";

export type Resolved =
  | { kind: "page"; locale: string; page: SitePage }
  | { kind: "redirect"; to: string };

/** The page a project slug points at. Projects are keyed by their file name. */
function projectBySlug(slug: string): SitePage | undefined {
  return Object.values(projectDetails).find((page) => page.slug === slug);
}

/**
 * Turn URL segments into what should be rendered, or undefined for a 404.
 * Returns the page already translated into the requested language.
 */
export function resolvePath(segments: string[]): Resolved | undefined {
  const { locale, rest } = splitLocale(segments);
  const dict = getDictionary(locale);
  const found = (page: SitePage): Resolved => ({
    kind: "page",
    locale,
    page: localize(page, locale, dict),
  });

  if (rest.length === 0) return found(pages.home);

  if (rest[0] === "projects" && rest.length === 2) {
    const project = projectBySlug(rest[1]);
    return project ? found(project) : undefined;
  }

  if (rest.length !== 1) return undefined;

  const alias = aliases[rest[0]];
  if (alias) return { kind: "redirect", to: localePath(`/${alias}`, locale) };

  const page = pages[rest[0]];
  return page ? found(page) : undefined;
}

/**
 * Every path the site should be built as, language segment first.
 *
 * The English entries are built at /en/… and served at /… by the rewrite; the
 * redirect in next.config.ts keeps /en/… from being a second address for the
 * same page.
 */
export function allPaths(): string[][] {
  const bare: string[][] = [];
  for (const page of Object.values(pages)) {
    // The home page has an empty slug and is served by app/[lang]/page.tsx.
    if (page.slug) bare.push([page.slug]);
  }
  for (const page of Object.values(projectDetails)) {
    bare.push(["projects", page.slug]);
  }
  // Legacy addresses redirect rather than render, but they still have to be
  // routes or they would 404 before the redirect could happen.
  for (const from of Object.keys(aliases)) bare.push([from]);

  const out: string[][] = [];
  for (const { code } of locales) {
    for (const path of bare) out.push([code, ...path]);
  }
  return out;
}

/** hreflang map for a page, so search engines pair the translations up. */
export function languageAlternates(segments: string[]): Record<string, string> {
  const { rest } = splitLocale(segments);
  const base = rest.length ? `/${rest.join("/")}` : "/";
  const out: Record<string, string> = {};
  for (const { code, tag } of locales) out[tag] = localePath(base, code);
  return out;
}
