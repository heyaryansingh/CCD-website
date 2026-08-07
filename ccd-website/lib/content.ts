// =============================================================================
// TOKEN RESOLUTION
//
// Some content is derived from Settings rather than typed literally — the donate
// button's URL, the "email us" fallbacks, the contact addresses in the service
// directory. If those were frozen into the content files, changing the donate
// link in Settings would stop changing the donate button, which is the whole
// point of having a Settings screen.
//
// So content stores a token and this resolves it at load time:
//
//   {{contact.email}}                          -> info@ccdgroup.org
//   {{mailto:Tool Bank request}}               -> mailto:...?subject=...
//   {{mailto:Co-op Market|contact.facilitiesEmail}}
//   {{action:links.paypalDonate|Donation to CCD}}
//        -> the PayPal URL, or a mailto fallback if that link is blank
//
// Editors see these in a few CTA fields with help text telling them to leave the
// token alone unless they are replacing it with a real URL. Everything else in
// the CMS is plain text.
// =============================================================================

import { actionLink, mailtoFallback, siteConfig } from "./siteConfig";

const TOKEN = /^\{\{(.+?)\}\}$/;

function lookup(path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), siteConfig);
  return typeof value === "string" ? value : "";
}

function resolveToken(body: string): string {
  if (body.startsWith("action:")) {
    const [linkPath, subject, toPath] = body.slice(7).split("|");
    return actionLink(lookup(linkPath), subject ?? "", toPath ? lookup(toPath) : undefined);
  }
  if (body.startsWith("mailto:")) {
    const [subject, toPath] = body.slice(7).split("|");
    return mailtoFallback(subject ?? "", toPath ? lookup(toPath) : undefined);
  }
  return lookup(body);
}

/**
 * Walk any loaded content and replace whole-string tokens. Only full-string
 * matches are substituted, so ordinary prose that happens to contain braces is
 * left alone.
 */
export function resolve<T>(value: T): T {
  if (typeof value === "string") {
    const match = value.match(TOKEN);
    return (match ? resolveToken(match[1]) : value) as T;
  }
  if (Array.isArray(value)) return value.map(resolve) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, resolve(v)]),
    ) as T;
  }
  return value;
}
