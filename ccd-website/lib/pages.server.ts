// =============================================================================
// PAGE LOADER — SERVER ONLY
//
// Pages are one JSON file each in `content/pages/`, so the CMS can create and
// delete whole pages: `generateStaticParams` reads this directory, which means a
// new file becomes a new route on the next build with no code change.
//
// ⚠️ Never import this from a "use client" component. It reads the filesystem,
// which cannot be bundled for the browser. Client components that need page data
// receive it as props — see how app/layout.tsx passes `activeMap` to SiteHeader.
// =============================================================================

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { resolve } from "./content";
import type { ActiveNav, SitePage } from "./types";

const dir = (name: string) => join(process.cwd(), "content", name);

function loadDir(name: string): Record<string, SitePage> {
  const out: Record<string, SitePage> = {};
  let files: string[] = [];
  try {
    files = readdirSync(dir(name)).filter((f) => f.endsWith(".json"));
  } catch {
    return out;
  }
  for (const file of files) {
    // `key` identifies the page in the CMS and as the record key; it is not part
    // of the page's own data, so it is peeled off rather than passed through.
    const { key: rawKey, ...page } = JSON.parse(
      readFileSync(join(dir(name), file), "utf8"),
    ) as SitePage & { key?: string };
    const key = rawKey ?? file.replace(/\.json$/, "");
    // Tokens like {{contact.email}} become real values here — see lib/content.ts.
    out[key] = resolve(page) as SitePage;
  }
  return out;
}

// Read once per build rather than per page render.
export const pages = loadDir("pages");
export const projectDetails = loadDir("projects");

/**
 * slug -> which top-level nav item should be highlighted.
 *
 * SiteHeader is a client component and cannot read the filesystem, so the
 * layout builds this map on the server and passes it down. That keeps the nav
 * derived from the pages themselves — it can never drift out of sync.
 */
export function activeNavMap(): Record<string, ActiveNav> {
  const map: Record<string, ActiveNav> = {};
  for (const [key, page] of Object.entries(pages)) {
    map[key] = page.active;
  }
  return map;
}
