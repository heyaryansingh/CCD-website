// Extracts every piece of content out of lib/siteData.ts into content/*.json,
// which is what the CMS edits. Scripted rather than hand-transcribed: 1,800 lines
// copied by hand would introduce silent errors, whereas this reads the real live
// objects and can be verified by deep-equality afterwards (verify-content.mjs).
//
//   node --experimental-strip-types --import ./scripts/register-ts.mjs scripts/extract-content.mjs
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const data = await import("../lib/siteData.ts");
const conf = await import("../lib/siteConfig.ts");

// ONE-TIME MIGRATION TOOL. siteData.ts used to hold every page; it is now a
// loader that reads content/. Running this again would wipe content/ and rewrite
// it from data that no longer exists there, so refuse rather than destroy.
if (!data.pages || Object.keys(data.pages).length === 0) {
  console.error("refusing to run: lib/siteData.ts no longer contains pages.");
  console.error("This script only made sense before the CMS migration.");
  console.error("Content now lives in content/ and is edited at /admin.");
  process.exit(1);
}
// fileURLToPath, not URL.pathname — the repo path contains a space, which
// pathname leaves percent-encoded and silently writes to the wrong directory.
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT = join(ROOT, "content");

rmSync(CONTENT, { recursive: true, force: true });
for (const d of ["", "pages", "projects", "collections"]) {
  mkdirSync(join(CONTENT, d), { recursive: true });
}

let files = 0;
const write = (rel, value) => {
  writeFileSync(join(CONTENT, rel), `${JSON.stringify(value, null, 2)}\n`, "utf8");
  files += 1;
};

// --- Settings -------------------------------------------------------------
// siteConfig.contact.address is a getter derived from the two address lines;
// storing it would let the two drift apart, so it is recomputed in the loader.
const cfg = data.siteConfig;
write("settings.json", {
  org: { ...cfg.org },
  contact: {
    email: cfg.contact.email,
    cleanGreenEmail: cfg.contact.cleanGreenEmail,
    facilitiesEmail: cfg.contact.facilitiesEmail,
    phone: cfg.contact.phone,
    phoneHref: cfg.contact.phoneHref,
    addressLine1: cfg.contact.addressLine1,
    addressLine2: cfg.contact.addressLine2,
    mapQuery: cfg.contact.mapQuery,
  },
  social: { ...cfg.social },
  links: { ...cfg.links },
  analytics: { ...cfg.analytics },
});


// --- Tokenisation ---------------------------------------------------------
// 17 content values are COMPUTED from settings (the PayPal URL, mailto
// fallbacks, contact addresses). Freezing the computed result into JSON would
// mean editing the donate link in Settings no longer changes the donate button
// — exactly the promise the CMS is supposed to keep. So the computed strings are
// replaced with tokens that lib/content.ts resolves at load time.
const A = (url, subject, to) => conf.actionLink(url, subject, to);
const M = (subject, to) => conf.mailtoFallback(subject, to);
const c = cfg.contact;
const L = cfg.links;

const TOKENS = [
  [A(L.vendorRegistration, "Co-op Market vendor registration", c.facilitiesEmail),
   "{{action:links.vendorRegistration|Co-op Market vendor registration|contact.facilitiesEmail}}"],
  [A(L.brickCampaign, "Brick Campaign"), "{{action:links.brickCampaign|Brick Campaign}}"],
  [A(L.paypalDonate, "Donation to CCD"), "{{action:links.paypalDonate|Donation to CCD}}"],
  [M("Co-op Market", c.facilitiesEmail), "{{mailto:Co-op Market|contact.facilitiesEmail}}"],
  [M("Partnership with CCD"), "{{mailto:Partnership with CCD}}"],
  [M("Tool Bank request"), "{{mailto:Tool Bank request}}"],
  [c.facilitiesEmail, "{{contact.facilitiesEmail}}"],
  [c.cleanGreenEmail, "{{contact.cleanGreenEmail}}"],
  [c.email, "{{contact.email}}"],
// longest first so a mailto containing an email is not half-replaced
].sort((a, b) => b[0].length - a[0].length);

let tokenised = 0;
const tokenise = (value) => {
  if (typeof value === "string") {
    for (const [literal, token] of TOKENS) {
      if (literal && value === literal) {
        tokenised += 1;
        return token;
      }
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(tokenise);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, tokenise(v)]));
  }
  return value;
};

// --- Navigation -----------------------------------------------------------
// navGroups came from siteData; the simple links, footer columns and utility bar
// were hardcoded inside the components. Centralising them here makes the whole
// nav editable instead of only two thirds of it.
write("navigation.json", {
  groups: data.navGroups.map((g) => ({
    key: g.key,
    label: g.label,
    href: g.href,
    active: g.active,
    items: g.items.map((i) => ({ ...i })),
  })),
  simpleLinks: [
    { label: "Projects", href: "/projects", active: "projects" },
    { label: "News", href: "/news", active: "news" },
    { label: "Contact", href: "/contact", active: "contact" },
  ],
  utilityLinks: [
    { label: "Clean & Green Services", href: "/clean-and-green" },
    { label: "Tool Bank", href: "/tool-bank" },
    { label: "Facilities Booking", href: "/contact#booking" },
  ],
  donateCta: { label: "Donate", href: "/donate" },
  footerColumns: [
    {
      title: "Quick Links",
      links: [
        { label: "About", href: "/about" },
        { label: "Membership", href: "/membership" },
        { label: "Projects", href: "/projects" },
        { label: "News & Events", href: "/news" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "Center for Social Impact", href: "/center-for-social-impact" },
        { label: "Clean & Green", href: "/clean-and-green" },
        { label: "Co-op Market", href: "/coop-market" },
        { label: "Tool Bank", href: "/tool-bank" },
        { label: "4th Brew Coffee", href: "/shop" },
      ],
    },
  ],
  aliases: { ...data.aliases },
});

// --- Pages ----------------------------------------------------------------
// One file per page so the CMS can create and delete whole pages; the route's
// generateStaticParams reads the directory, so a new file becomes a new route.
for (const [key, page] of Object.entries(data.pages)) {
  write(join("pages", `${key}.json`), tokenise({ key, ...page }));
}
for (const [key, page] of Object.entries(data.projectDetails)) {
  write(join("projects", `${key}.json`), tokenise({ key, ...page }));
}

// --- Collections ----------------------------------------------------------
// Single file per collection (a list inside), so client components can import
// them statically — an fs read anywhere in ClientBits' import chain would break
// the browser bundle.
const collections = {
  news: data.news,
  events: data.events,
  team: data.leadership,
  interns: data.interns,
  partners: data.partners,
  supporters: data.supporterLogos,
  directory: data.serviceDirectory,
  "membership-tiers": data.membershipTiers,
  "cleangreen-services": data.cleanGreenServices,
  testimonials: data.testimonials,
  "project-pins": data.projectPins,
  "before-after": data.beforeAfterPairs,
  "home-hero": data.homeHeroSlides,
  "brew-products": data.brewProducts,
  "brewing-methods": data.brewingMethods,
};

for (const [name, items] of Object.entries(collections)) {
  write(join("collections", `${name}.json`), tokenise({ items }));
}

console.log(`extracted ${files} files ->  content/  (${tokenised} settings-derived values tokenised)`);
console.log(
  `  pages ${Object.keys(data.pages).length}` +
    `  projects ${Object.keys(data.projectDetails).length}` +
    `  collections ${Object.keys(collections).length}`,
);
