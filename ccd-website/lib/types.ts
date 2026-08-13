// =============================================================================
// SITE TYPES
//
// The shapes every page and collection must match. Content itself lives in
// `content/` and is edited in the CMS; these types are what the code relies on.
//
// If you add a new section kind here you must also:
//   1. add a `case` for it in components/PageView.tsx -> RenderSection()
//   2. add it to the `sections` list `types:` in public/admin/config.yml
//      (otherwise editors cannot create one)
//   3. style it in app/globals.css
// =============================================================================

export type ActiveNav =
  | "home"
  | "about"
  | "programs"
  | "involved"
  | "projects"
  | "news"
  | "contact"
  | "brew";

export type Card = {
  title: string;
  body: string;
  image?: string;
  alt?: string;
  href?: string;
  meta?: string;
  // Optional detail lines rendered as a list under the card body — used by the
  // brewing guide, where each method has a spec (grind, temp, ratio) worth
  // scanning rather than burying in a paragraph.
  bullets?: string[];
};

export type Section =
  | {
      type: "split";
      id?: string;
      eyebrow?: string;
      title: string;
      body: string;
      image?: string;
      alt?: string;
      bullets?: string[];
      reverse?: boolean;
      theme?: "light" | "green" | "dark" | "blue";
      ctaText?: string;
      ctaHref?: string;
    }
  | {
      type: "cards";
      id?: string;
      eyebrow?: string;
      title: string;
      body?: string;
      cards: Card[];
      theme?: "light" | "gray" | "dark";
    }
  | {
      type: "stats";
      eyebrow?: string;
      title: string;
      body?: string;
      stats: { value: string; label: string }[];
      theme?: "green" | "dark" | "light";
    }
  | {
      type: "timeline";
      title: string;
      items: { year: string; title: string; body: string }[];
    }
  | {
      type: "heart";
      id?: string;
    }
  | {
      type: "gallery";
      title: string;
      images: { src: string; alt: string }[];
      theme?: "light" | "dark";
      credit?: string;
    }
  | {
      type: "cta";
      title: string;
      body: string;
      href: string;
      label: string;
      theme?: "green" | "dark" | "gold";
    }
  | {
      // Full-bleed centered statement over an optional photo (dark by default).
      type: "band";
      id?: string;
      eyebrow?: string;
      title: string;
      body?: string;
      image?: string;
      alt?: string;
      cta?: { label: string; href: string };
      theme?: "light" | "dark";
    }
  | {
      // A clean 3-up of brand promises / value props (icon-free).
      type: "values";
      id?: string;
      eyebrow?: string;
      title?: string;
      body?: string;
      items: { title: string; body: string }[];
      theme?: "light";
    }
  | {
      // Native <details> accordion of question/answer pairs.
      type: "faq";
      id?: string;
      eyebrow?: string;
      title: string;
      body?: string;
      items: { q: string; a: string }[];
      theme?: "light";
    }
  | {
      type: "beforeAfter";
      id?: string;
      eyebrow?: string;
      title: string;
      body?: string;
      pairs: { before: string; after: string; label: string }[];
    }
  | {
      type: "testimonials";
      id?: string;
      title: string;
      body?: string;
    }
  | {
      type: "projectMap";
      id?: string;
      title: string;
      body?: string;
    }
  | {
      type: "partnerWall";
      id?: string;
      title: string;
      body?: string;
    }
  | {
      type: "steps";
      id?: string;
      eyebrow?: string;
      title: string;
      body?: string;
      steps: { n: string; title: string; body: string }[];
      theme?: "light" | "green" | "dark";
    }
  | {
      type: "directory";
      id?: string;
      title: string;
      body?: string;
    }
  | {
      type: "membershipTiers";
      id?: string;
    }
  | {
      type: "aboutTeam";
      id?: string;
    }
  | {
      type: "teamFull";
      id?: string;
    }
  | {
      type: "membershipFaq";
      id?: string;
    }
  | {
      type: "estimateForm";
      id?: string;
    }
  | {
      type: "donatePanel";
      id?: string;
    }
  | {
      type: "contactPanel";
      id?: string;
    }
  | {
      type: "newsEvents";
      id?: string;
    }
  | {
      type: "eventsFull";
      id?: string;
    }
  | {
      type: "products";
      id?: string;
      eyebrow?: string;
      title: string;
      body?: string;
    };

/** Title and blurb used for the browser tab and search results. Grouped so the
 *  CMS can collapse them into one row instead of two loose fields. */
export type PageSeo = {
  title: string;
  description: string;
};

/** Everything above the first section. Grouped for the same reason as PageSeo —
 *  eight loose hero fields buried the "Page blocks" list in the editor. */
export type PageHero = {
  eyebrow?: string;
  title: string;
  accent?: string;
  // Written and stored, but no hero layout renders it. Kept so the copy is not
  // lost; delete the field here, in config.yml and in content/ if it stays unused.
  body: string;
  image?: string;
  alt?: string;
  // CSS object-position for the hero crop (e.g. "center top", "center 30%").
  // Use when the image's subject sits high/low so cover-cropping never cuts it.
  position?: string;
  cta?: { label: string; href: string };
};

export type SitePage = {
  // Stays flat: routing and the nav highlight read these directly, and the CMS
  // builds the filename from `key` via `slug: '{{fields.key}}'`.
  slug: string;
  active: ActiveNav;
  // Scopes a sub-brand skin onto <main> (see `.brew` in globals.css). The CCD
  // header and footer sit outside <main> and stay CCD-branded.
  brand?: "brew";
  seo: PageSeo;
  hero: PageHero;
  sections: Section[];
};

export type BrewVariant = {
  id: number;
  // Must match Shopify's variant title exactly ("<size> / <grind>") — the buy
  // picker rebuilds this string from its two dropdowns to find the variant.
  title: string;
  price: string;
  available: boolean;
};

export type BrewProduct = {
  handle: string;
  title: string;
  roast: string;
  notes: string;
  image: string;
  alt: string;
  variants: BrewVariant[];
};

export type TeamMember = {
  name: string | null;
  role: string;
  tagline?: string;
  bio?: string;
  quote?: string;
  email?: string;
  photo?: string; // empty -> initials/silhouette avatar
  // The full designed intro card a person was announced with (interns have one).
  // Shown in their bio panel; the text still lives in `bio` so it stays readable
  // to screen readers and translatable.
  card?: string;
  order?: number;
};

export type DirectoryEntry = {
  area: string;
  person: string;
  title: string;
  email: string;
};

export type Partner = {
  name: string;
  description: string;
  url?: string;
  category: "funder" | "design" | "community" | "program" | "member";
  logo?: string; // real logo image; card falls back to name-only when empty
};

export type MembershipTier = {
  name: string;
  price: string;
  setup: string;
  eligibility: string;
  benefits: string[];
  vote: boolean;
  featured?: boolean;
};

// Real tiers from CCD's June 2026 site audit.

export type Testimonial = { quote: string; name: string; role?: string; photo?: string };

// No fabricated quotes. Add real member/resident stories here (or via the Wix
// CMS in Phase 2) and the testimonials section fills in automatically.

/** A news article or an event. Both render through the same feed component, so
 *  they share one shape; the event-only fields are optional. */
export type FeedEntry = {
  id: string;
  title: string;
  thumb: string;
  body: string;
  photos: string[];
  meta?: string;
  date?: string;
  day?: string;
  tag?: string;
  tagColor?: string;
  blurb?: string;
  excerpt?: string;
  time?: string;
  location?: string;
  cost?: string;
  instructions?: string[];
  contactEmail?: string;
  contactLabel?: string;
};

export type HomeHeroSlide = { src: string; alt: string; kicker: string };

export type SupporterLogo = { src: string; alt: string };

export type BeforeAfterPair = { before: string; after: string; label: string };

/** Percentage coordinates on the Irvington basemap image. */
export type ProjectPin = { name: string; status: string; href: string; x: number; y: number };
