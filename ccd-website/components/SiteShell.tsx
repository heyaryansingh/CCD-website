// =============================================================================
// SITE SHELL
//
// Header, page, footer — everything a visitor sees, wrapped in the active
// language. The header and footer sit here rather than in app/layout.tsx because
// they have words in them: they have to know which language they are in, and the
// root layout cannot, since it renders above the route that carries the language.
//
// The lang/dir attributes go on this wrapper for the same reason. That is enough
// for screen readers and for the [dir="rtl"] rules in globals.css; only the
// <html> element itself still says "en", which affects nothing but the browser's
// own "translate this page?" prompt.
// =============================================================================

import { LocaleProvider } from "@/components/LocaleProvider";
import { PageView } from "@/components/PageView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localeInfo } from "@/lib/i18n";
import { getClientDictionary, getDictionary } from "@/lib/i18n.server";
import { activeNavMap } from "@/lib/pages.server";
import type { SitePage } from "@/lib/types";

export function SiteShell({ locale, page }: { locale: string; page: SitePage }) {
  const info = localeInfo(locale);
  return (
    <LocaleProvider locale={locale} dict={getClientDictionary(locale)}>
      <div className="site-root" lang={info.tag} dir={info.dir}>
        <SiteHeader activeMap={activeNavMap()} />
        <PageView page={page} locale={locale} dict={getDictionary(locale)} />
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}
