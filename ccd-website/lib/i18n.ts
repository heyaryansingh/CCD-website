// =============================================================================
// LANGUAGES
//
// The site is written in English and translated into the languages Baltimore
// City publishes vital documents in. Translation is a LOOKUP, not a parallel set
// of content files: every translatable string in `content/` is a key in
// `content/translations/<code>.json`, and anything with no entry falls back to
// the English it was written in. That means:
//
//   * editors keep editing one set of content, in English, exactly as before;
//   * a half-translated language is safe to ship — it is English where it is
//     not translated yet, never blank;
//   * `npm run i18n` reports the gaps and hands them to a translator agent;
//
//     see scripts/i18n.mjs and the /translate command.
//
// ADDING A LANGUAGE is one entry in `locales` below; the JSON file is created
// for you the first time a batch is applied.
//
// This file is imported by client components, so it must stay free of the
// dictionaries themselves — those are big, and shipping all of them to every
// browser would cost more than the page. lib/i18n.server.ts loads them and hands
// the active one down. See components/LocaleProvider.tsx.
// =============================================================================

export type Dir = "ltr" | "rtl";

export type LocaleInfo = {
  /** URL prefix and file name: /es/about reads content/translations/es.json. */
  code: string;
  /** What the language calls itself — what goes in the language menu. */
  label: string;
  /** English name, for aria-labels and for the translate script's prompt. */
  english: string;
  /** BCP-47 tag for lang="" — not always the same as `code` (zh -> zh-Hans). */
  tag: string;
  dir: Dir;
};

// English first; the rest in the order they appear in the language menu.
export const locales: LocaleInfo[] = [
  { code: "en", label: "English", english: "English", tag: "en", dir: "ltr" },
  { code: "es", label: "Español", english: "Spanish", tag: "es", dir: "ltr" },
  { code: "fr", label: "Français", english: "French", tag: "fr", dir: "ltr" },
  { code: "ht", label: "Kreyòl Ayisyen", english: "Haitian Creole", tag: "ht", dir: "ltr" },
  { code: "am", label: "አማርኛ", english: "Amharic", tag: "am", dir: "ltr" },
  { code: "ar", label: "العربية", english: "Arabic", tag: "ar", dir: "rtl" },
  { code: "zh", label: "简体中文", english: "Simplified Chinese", tag: "zh-Hans", dir: "ltr" },
  { code: "ko", label: "한국어", english: "Korean", tag: "ko", dir: "ltr" },
  { code: "vi", label: "Tiếng Việt", english: "Vietnamese", tag: "vi", dir: "ltr" },
];

export const defaultLocale = "en";

export const localeCodes = locales.map((l) => l.code);

/** Every language except the one the site is written in. */
export const translatedLocales = locales.filter((l) => l.code !== defaultLocale);

export function isLocale(value: string | undefined): boolean {
  return value !== undefined && localeCodes.includes(value);
}

export function localeInfo(code: string): LocaleInfo {
  return locales.find((l) => l.code === code) ?? locales[0];
}

/** A dictionary maps an English source string to its translation. */
export type Dictionary = Record<string, string>;

/**
 * Split path segments into [language, rest].
 *
 * Handles both forms, because both exist: the PUBLIC url of an English page has
 * no prefix (/about), while INTERNALLY every page lives under one (/en/about) so
 * that app/[lang]/layout.tsx can set <html lang>. A missing prefix means English.
 *
 * This does assume no page slug is ever two letters matching a language code —
 * `about`, `team`, `shop` and the rest are safe, but a page called `es` would be
 * read as Spanish.
 */
export function splitLocale(segments: string[]): { locale: string; rest: string[] } {
  const [first, ...rest] = segments;
  if (isLocale(first)) return { locale: first, rest };
  return { locale: defaultLocale, rest: segments };
}

/**
 * Rewrite an in-site link for the current language. Anything that leaves the
 * site — mailto:, tel:, http(s):, a bare #anchor — is returned untouched.
 */
export function localePath(href: string, locale: string): string {
  if (locale === defaultLocale) return href;
  if (!href.startsWith("/")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** The same page in another language, given the current path. */
export function switchLocalePath(pathname: string, next: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const { rest } = splitLocale(segments);
  const base = rest.length ? `/${rest.join("/")}` : "/";
  return localePath(base, next);
}

/** One string. Untranslated (or English) returns the source unchanged. */
export function t(dict: Dictionary | undefined, source: string): string {
  if (!dict || !source) return source;
  return dict[source] || source;
}

/**
 * A bound `t` for server components, so every call site in the codebase reads
 * `t("Some English")` whether it is server- or client-rendered. The build's
 * string extractor looks for exactly that shape.
 */
export function makeT(dict: Dictionary | undefined): (source: string) => string {
  return (source: string) => t(dict, source);
}

// Keys whose values are never prose: links, file paths, identifiers, enum
// choices and layout numbers. Translating any of these would break the page —
// a translated `href` is a dead link, a translated `theme` is an unstyled block.
//
// Kept here rather than only in the translate script so that the render-time
// walk and the extract-time walk can never disagree about what is translatable.
// `alt` is NOT here: alt text is prose and is translated like any other string.
export const NON_TEXT_KEYS = new Set([
  "active",
  "brand",
  "card",
  "category",
  "contactEmail",
  "email",
  "ga4",
  "handle",
  "href",
  "id",
  "image",
  "key",
  "logo",
  "mapQuery",
  // Step numbers ("01") and the block's own kind ("cta") — layout, not language.
  "n",
  "order",
  "phoneHref",
  "photo",
  "photos",
  "position",
  "slug",
  "src",
  "tagColor",
  "theme",
  "thumb",
  "type",
  "url",
  "x",
  "y",
]);

/**
 * Whether a value under `key` should be looked up in the dictionary.
 *
 * Both the render walk and the extract script call this, so they can never
 * disagree about what counts as translatable — a string the script never
 * collected would otherwise be permanently stuck in English with no way to see
 * that it was missing.
 */
export function translatable(key: string | undefined, value: string): boolean {
  if (!value.trim()) return false;
  // A token like {{contact.email}} is resolved into a real value elsewhere.
  if (value.startsWith("{{") && value.endsWith("}}")) return false;
  if (key !== undefined && NON_TEXT_KEYS.has(key)) return false;
  // Nothing to translate in "$40,000", "15%" or "02" — no letters, no language.
  if (!/\p{L}/u.test(value)) return false;
  // Bare URLs, paths and addresses, whatever key they sit under.
  return !/^(\/|https?:|mailto:|tel:|#)/.test(value);
}

// Keys holding a link that should point at this language's copy of a page. An
// in-site path under one of these becomes /es/… on the Spanish site; anything
// external, or a mailto:/tel:/#anchor, is left exactly as it is.
const LINK_KEYS = new Set(["href", "ctaHref", "url"]);

/**
 * Walk any loaded content, swapping translatable strings for their translation
 * and pointing in-site links at the current language.
 *
 * Deliberately the same shape as `resolve()` in lib/content.ts — content on this
 * site is a tree of plain JSON, and every pass over it is "walk it, replace some
 * strings". Doing the links in the same walk is why no component has to know
 * about languages to link correctly: a card, a hero button and a map pin all
 * store their link the same way, so all three are handled once, here.
 */
export function localize<T>(
  value: T,
  locale: string,
  dict: Dictionary | undefined,
  key?: string,
): T {
  if (typeof value === "string") {
    if (key !== undefined && LINK_KEYS.has(key)) return localePath(value, locale) as T;
    return (translatable(key, value) ? t(dict, value) : value) as T;
  }
  if (Array.isArray(value)) return value.map((item) => localize(item, locale, dict, key)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        localize(v, locale, dict, k),
      ]),
    ) as T;
  }
  return value;
}
