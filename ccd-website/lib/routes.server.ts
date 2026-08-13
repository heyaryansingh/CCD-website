// =============================================================================
// ROUTING
//
// One route file serves the whole site (app/[...path]), so every URL shape is
// resolved here instead of being spread across three page files that each had
// their own copy of the lookup:
//
//   /about                      English page
//   /projects/oasis-240         English project detail
//   /es                         Spanish home
//   /es/about                   Spanish page
//   /es/projects/oasis-240      Spanish project detail
//   /join                       alias -> redirect to /membership
//   /es/join                    alias -> redirect to /es/membership
//
// English keeps its bare URLs. Only the other languages carry a prefix, so no
// existing link, printed flyer or search result changes.
// =============================================================================

import { defaultLocale, localePath, locales, localize, splitLocale } from "./i18n";
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
  // /en/about is the same page as /about. Send it to the canonical one rather
  // than serving the same content at two addresses.
  if (segments[0] === defaultLocale) {
    return { kind: "redirect", to: `/${segments.slice(1).join("/")}` };
  }

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

/** Every path the site should be built as, in every language. */
export function allPaths(): string[][] {
  const bare: string[][] = [];
  for (const page of Object.values(pages)) {
    // The home page has an empty slug and is served by app/page.tsx.
    if (page.slug) bare.push([page.slug]);
  }
  for (const page of Object.values(projectDetails)) {
    bare.push(["projects", page.slug]);
  }

  const out: string[][] = [...bare];
  for (const { code } of locales) {
    if (code === defaultLocale) continue;
    out.push([code]); // that language's home page
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
