// =============================================================================
// CCD SITE CONFIG — single source of truth for every external link, social,
// contact detail, and payment URL on the site.
//
// HOW THIS WORKS (for non-technical editors):
//   - Every link the site uses lives in ONE place, below.
//   - To turn a button on, paste the real URL next to its name and save.
//   - Leave a value as "" (empty) to keep that button/icon HIDDEN or falling
//     back to email — the site never shows a broken link.
//   - Anything marked `VERIFY:` was carried over from CCD's June 2026 site audit
//     and should be double-checked that it still points to the right place.
// =============================================================================

export const siteConfig = {
  org: {
    name: "Cooperative Community Development",
    shortName: "CCD",
    legalName: "Cooperative Community Development Inc.",
    tagline:
      "A Baltimore cooperative building food access, green space, local services, and community-owned infrastructure in Irvington.",
    founded: 2020,
  },

  contact: {
    email: "info@ccdgroup.org",
    cleanGreenEmail: "francis@ccdgroup.org",
    facilitiesEmail: "theREC@ccdgroup.org",
    phone: "(410) 205-2488",
    phoneHref: "tel:+14102052488",
    addressLine1: "4004 Frederick Ave",
    addressLine2: "Baltimore, MD 21229",
    get address() {
      return `${this.addressLine1}, ${this.addressLine2}`;
    },
    mapQuery: "4004 Frederick Ave, Baltimore, MD 21229",
  },

  // Social profiles. Blank = icon hidden. Confirmed live July 2026.
  social: {
    facebook: "https://www.facebook.com/CCDGroupInc",
    instagram: "https://www.instagram.com/ccdgroupinc/",
    linkedin: "", // not published yet — leave blank to hide
    youtube: "",
  },

  // Action links. Blank = the button falls back to emailing CCD instead.
  links: {
    // VERIFY: PayPal hosted donate button from the current site.
    paypalDonate:
      "https://www.paypal.com/donate/?hosted_button_id=D4UMVJ4YRXDQE",
    // VERIFY: external named-brick fundraising store.
    brickCampaign: "https://www.fundraisingbrick.com/online-orders/ccd/",
    // VERIFY: Microsoft Forms — facilities/room booking request.
    facilitiesBooking: "https://forms.cloud.microsoft/r/Z7RnPBQuim",
    // VERIFY: Microsoft Forms — Clean & Green free estimate request.
    cleanGreenEstimate: "https://forms.cloud.microsoft/r/Zc3eJk1sZj",
    // VERIFY: Google Form — co-op market vendor registration.
    vendorRegistration: "https://forms.gle/mfhVo1yEZbZwre5r8",
    // The 4th Brew's Shopify store. CCD hosts every page a customer reads;
    // Shopify is only the catalog + checkout backend behind this one URL.
    // Used for two things: reading `{brewShop}/products.json` at build time,
    // and the `{brewShop}/cart/{variantId}:1` links that open checkout.
    //
    // ⚠️ This MUST stay pointed at Shopify's PRIMARY domain. Shopify 301s every
    //    cart link to whatever its primary domain currently is (verified: the
    //    raw nxvrcp-ea.myshopify.com handle redirects here), so:
    //
    //    BEFORE retiring the4thbrew.com — move Shopify's primary domain to
    //    `shop.the4thbrew.com` (CNAME shop → shops.myshopify.com, then Shopify
    //    admin → Settings → Domains → set primary) and change this line to
    //    match. Redirecting the4thbrew.com to CCD while it is still Shopify's
    //    primary domain breaks every checkout on the site.
    brewShop: "https://the4thbrew.com",
    // Fill these when the new platform is live:
    membershipSignup: "", // Wix Pricing Plan / signup URL
    privacyPolicy: "", // re-hosted privacy policy PDF/page
    instagramFeedEmbed: "", // live IG feed embed URL, if any
  },

  analytics: {
    ga4: "", // e.g. "G-XXXXXXX" — enable once measured
  },
} as const;

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
