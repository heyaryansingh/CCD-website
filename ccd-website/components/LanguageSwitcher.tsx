"use client";

// A <details> menu rather than a custom popup: it opens on click and on Enter,
// closes on Escape, and is announced correctly, all without a line of JS. The
// entries are real links to the same page in another language, so they work with
// scripting off and search engines can follow them.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeInfo, switchLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/components/LocaleProvider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useT();
  const current = localeInfo(locale);

  return (
    <details className="lang-switch">
      <summary aria-label={t("Choose a language")}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        <span>{current.label}</span>
      </summary>
      <div className="lang-menu">
        {locales.map((option) => (
          <Link
            key={option.code}
            href={switchLocalePath(pathname, option.code)}
            lang={option.tag}
            hrefLang={option.tag}
            // Deliberately no dir here. The PAGE mirrors for a right-to-left
            // language, but this row is one word inside a menu that does not:
            // dir="rtl" pushed the Arabic entry to the opposite edge of the list
            // while the other eight stayed left. The bidi algorithm renders the
            // word correctly on its own.
            className={option.code === locale ? "current" : undefined}
            aria-current={option.code === locale ? "true" : undefined}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
