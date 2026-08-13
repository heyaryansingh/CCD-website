import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { languageAlternates, resolvePath } from "@/lib/routes.server";

// The English home page. Every other URL — including every other language's home
// page — goes through app/[...path], which a required catch-all cannot match at
// the site root.

const home = resolvePath([]);

export const metadata: Metadata =
  home?.kind === "page"
    ? {
        // The template in app/layout.tsx appends the organisation's name to
        // every title. The home page's title already IS that name, so without
        // `absolute` the tab reads it twice.
        title: { absolute: home.page.seo.title },
        description: home.page.seo.description,
        alternates: { languages: languageAlternates([]) },
      }
    : {};

export default function Home() {
  if (home?.kind !== "page") throw new Error("content/pages/home.json is missing");
  return <SiteShell locale={home.locale} page={home.page} />;
}
