// =============================================================================
// SITE SHELL
//
// Header, page, footer — everything a visitor sees. The header and footer sit
// here rather than in the layout because they have words in them, so they need
// the language and the client-side dictionary.
//
// lang/dir are NOT set here: app/[lang]/layout.tsx puts them on <html>, where
// they belong, and the [dir="rtl"] rules in globals.css match from there.
// =============================================================================

import { LocaleProvider } from "@/components/LocaleProvider";
import { PageView } from "@/components/PageView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getClientDictionary, getDictionary } from "@/lib/i18n.server";
import { activeNavMap } from "@/lib/pages.server";
import type { SitePage } from "@/lib/types";

export function SiteShell({ locale, page }: { locale: string; page: SitePage }) {
  return (
    <LocaleProvider locale={locale} dict={getClientDictionary(locale)}>
      <div className="site-root">
        <SiteHeader activeMap={activeNavMap()} />
        <PageView page={page} locale={locale} dict={getDictionary(locale)} />
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}
