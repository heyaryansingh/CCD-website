// =============================================================================
// DICTIONARY LOADING
//
// Every language's dictionary is imported here — all of them, statically. That
// is fine on the server (this module never reaches the browser) and it is the
// only option on Cloudflare Workers, which has no runtime filesystem, exactly as
// lib/pages.server.ts explains for pages.
//
// What the BROWSER gets is a subset. Page content is translated on the server
// before it is rendered, so the only strings a client component still has to
// look up are the ones written into the components themselves and the ones in
// the collections that client components import directly. Sending the whole
// dictionary instead would put every word of all 22 pages into the payload of
// every page, in a language the visitor is already reading.
// =============================================================================

import { type Dictionary, SKIP_SUBTREES, translatable } from "./i18n";

import am from "@/content/translations/am.json";
import ar from "@/content/translations/ar.json";
import es from "@/content/translations/es.json";
import fr from "@/content/translations/fr.json";
import ht from "@/content/translations/ht.json";
import ko from "@/content/translations/ko.json";
import vi from "@/content/translations/vi.json";
import zh from "@/content/translations/zh.json";

// Strings written into components, extracted from their t("…") calls at build
// time by scripts/bundle-pages.mjs.
import uiStrings from "@/content/generated/ui-strings.json";

import beforeAfterData from "@/content/collections/before-after.json";
import brewProductsData from "@/content/collections/brew-products.json";
import brewingMethodsData from "@/content/collections/brewing-methods.json";
import cleanGreenData from "@/content/collections/cleangreen-services.json";
import directoryData from "@/content/collections/directory.json";
import eventsData from "@/content/collections/events.json";
import homeHeroData from "@/content/collections/home-hero.json";
import internsData from "@/content/collections/interns.json";
import membershipTiersData from "@/content/collections/membership-tiers.json";
import navigationData from "@/content/navigation.json";
import newsData from "@/content/collections/news.json";
import partnersData from "@/content/collections/partners.json";
import projectPinsData from "@/content/collections/project-pins.json";
import settingsData from "@/content/settings.json";
import supportersData from "@/content/collections/supporters.json";
import teamData from "@/content/collections/team.json";
import testimonialsData from "@/content/collections/testimonials.json";

const dictionaries: Record<string, Dictionary> = { am, ar, es, fr, ht, ko, vi, zh };

export function getDictionary(locale: string): Dictionary | undefined {
  return dictionaries[locale];
}

/** Every translatable string in a loaded JSON tree. */
function collect(value: unknown, into: Set<string>, key?: string): void {
  if (key !== undefined && SKIP_SUBTREES.has(key)) return;
  if (typeof value === "string") {
    if (translatable(key, value)) into.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collect(item, into, key);
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) collect(v, into, k);
  }
}

// Anything a client component can render without the server having translated it
// first: the collections it imports straight from lib/siteData, plus the strings
// written into the components.
const clientKeys = (() => {
  const keys = new Set<string>(uiStrings as string[]);
  for (const data of [
    beforeAfterData,
    brewProductsData,
    brewingMethodsData,
    cleanGreenData,
    directoryData,
    eventsData,
    homeHeroData,
    internsData,
    membershipTiersData,
    navigationData,
    newsData,
    partnersData,
    projectPinsData,
    settingsData,
    supportersData,
    teamData,
    testimonialsData,
  ]) {
    collect(data, keys);
  }
  return keys;
})();

const clientCache = new Map<string, Dictionary>();

/** The slice of a language's dictionary the browser actually needs. */
export function getClientDictionary(locale: string): Dictionary | undefined {
  const full = dictionaries[locale];
  if (!full) return undefined;
  const cached = clientCache.get(locale);
  if (cached) return cached;
  const subset: Dictionary = {};
  for (const key of clientKeys) {
    const value = full[key];
    if (value) subset[key] = value;
  }
  clientCache.set(locale, subset);
  return subset;
}
