// =============================================================================
// PAGE LOADER
//
// Pages are one JSON file each in `content/pages/`, so the CMS can create and
// delete whole pages. Those files are bundled into `content/generated/` by
// `scripts/bundle-pages.mjs`, which runs automatically before every build.
//
// The bundle is imported statically rather than read with fs at request time.
// That is not a style preference: Cloudflare Workers has no runtime filesystem,
// so an fs read here makes every page 500. Importing the bundle keeps the app
// host-agnostic — it runs the same on Node and on Workers.
//
// `generateStaticParams` reads this, so a page the CMS adds becomes a route on
// the next build with no code change.
//
// The file keeps its `.server` name because the route files and layout are the
// only things that should need it; nothing here touches the filesystem now, so
// importing it from a client component would merely be pointless, not fatal.
// =============================================================================

import pagesData from "@/content/generated/pages.json";
import projectsData from "@/content/generated/projects.json";
import { resolve } from "./content";
import type { ActiveNav, SitePage } from "./types";

// Tokens like {{contact.email}} become real values here — see lib/content.ts.
export const pages = resolve(pagesData) as unknown as Record<string, SitePage>;
export const projectDetails = resolve(projectsData) as unknown as Record<string, SitePage>;

/**
 * slug -> which top-level nav item should be highlighted.
 *
 * SiteHeader is a client component, so the layout builds this map and passes it
 * down. That keeps the nav derived from the pages themselves — it can never
 * drift out of sync with what each page declares.
 */
export function activeNavMap(): Record<string, ActiveNav> {
  const map: Record<string, ActiveNav> = {};
  for (const [key, page] of Object.entries(pages)) {
    map[key] = page.active;
  }
  return map;
}
