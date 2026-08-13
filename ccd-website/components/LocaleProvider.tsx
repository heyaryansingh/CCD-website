"use client";

// =============================================================================
// LOCALE CONTEXT
//
// Client components cannot be handed a translated copy of everything the way a
// server-rendered page can, so they get the active language and its dictionary
// through context instead.
//
// The call site is always the same shape — `const t = useT()` then `t("Some
// English")` — because scripts/bundle-pages.mjs finds translatable UI strings by
// looking for exactly that. A string built at runtime (`t(label)`,
// `t(`Hi ${name}`)`) is invisible to it and will never be translated; use a
// literal with a {placeholder} in it and substitute afterwards.
// =============================================================================

import { createContext, useCallback, useContext, useMemo } from "react";
import {
  type Dictionary,
  defaultLocale,
  localePath,
  localize,
  t as lookup,
} from "@/lib/i18n";

type LocaleContextValue = { locale: string; dict: Dictionary | undefined };

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  dict: undefined,
});

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: string;
  dict: Dictionary | undefined;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): string {
  return useContext(LocaleContext).locale;
}

/** Translate one written-in-the-component string. */
export function useT(): (source: string) => string {
  const { dict } = useContext(LocaleContext);
  return useCallback((source: string) => lookup(dict, source), [dict]);
}

/** Translate a whole loaded collection — same walk the server uses on pages. */
export function useTranslated<T>(value: T): T {
  const { locale, dict } = useContext(LocaleContext);
  return useMemo(() => localize(value, locale, dict), [value, locale, dict]);
}

/** Rewrite an in-site link for the active language. */
export function useLocalePath(): (href: string) => string {
  const { locale } = useContext(LocaleContext);
  return useCallback((href: string) => localePath(href, locale), [locale]);
}
