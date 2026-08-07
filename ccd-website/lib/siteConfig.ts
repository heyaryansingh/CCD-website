// =============================================================================
// CCD SITE CONFIG
//
// The values now live in `content/settings.json` and are edited in the CMS at
// /admin -> Settings. This file only loads them and keeps the helper functions,
// so every consumer keeps importing `siteConfig` exactly as before.
//
// Editors never touch this file. If you are looking for the phone number or the
// donate link, they are in Settings.
// =============================================================================

import settings from "@/content/settings.json";

type Settings = {
  org: { name: string; shortName: string; legalName: string; tagline: string; founded: number };
  contact: {
    email: string;
    cleanGreenEmail: string;
    facilitiesEmail: string;
    phone: string;
    phoneHref: string;
    addressLine1: string;
    addressLine2: string;
    mapQuery: string;
  };
  social: { facebook: string; instagram: string; linkedin: string; youtube: string };
  links: Record<string, string>;
  analytics: { ga4: string };
};

const data = settings as Settings;

export const siteConfig = {
  ...data,
  contact: {
    ...data.contact,
    // Derived, never stored — otherwise the two address lines and the combined
    // string could drift apart when an editor updates only one of them.
    get address() {
      return `${data.contact.addressLine1}, ${data.contact.addressLine2}`;
    },
  },
};

// Return the first non-empty, non-placeholder link from the candidates.
export function firstLink(...candidates: (string | undefined | null)[]): string {
  for (const c of candidates) {
    if (c && c.trim() && !c.trim().toUpperCase().startsWith("TODO")) return c.trim();
  }
  return "";
}

// A safe email fallback so an unset action link still does something useful.
export function mailtoFallback(subject: string, to: string = siteConfig.contact.email): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
}

// Resolve an action link with a graceful email fallback.
export function actionLink(url: string, fallbackSubject: string, to?: string): string {
  return firstLink(url) || mailtoFallback(fallbackSubject, to);
}

export type SocialLink = { key: string; label: string; href: string };

// Only the social profiles that actually have a URL — used by header/footer.
export function activeSocials(): SocialLink[] {
  const out: SocialLink[] = [];
  const s = siteConfig.social;
  if (firstLink(s.facebook)) out.push({ key: "facebook", label: "Facebook", href: s.facebook });
  if (firstLink(s.instagram)) out.push({ key: "instagram", label: "Instagram", href: s.instagram });
  if (firstLink(s.linkedin)) out.push({ key: "linkedin", label: "LinkedIn", href: s.linkedin });
  if (firstLink(s.youtube)) out.push({ key: "youtube", label: "YouTube", href: s.youtube });
  return out;
}
