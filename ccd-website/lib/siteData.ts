import { siteConfig, actionLink, mailtoFallback } from "./siteConfig";

export { siteConfig } from "./siteConfig";

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

export type SitePage = {
  slug: string;
  title: string;
  description: string;
  active: ActiveNav;
  eyebrow?: string;
  heroTitle: string;
  heroAccent?: string;
  heroBody: string;
  heroImage?: string;
  // CSS object-position for the hero crop (e.g. "center top", "center 30%").
  // Use when the image's subject sits high/low so cover-cropping never cuts it.
  heroPosition?: string;
  heroAlt?: string;
  heroCta?: { label: string; href: string };
  // Scopes a sub-brand skin onto <main> (see `.brew` in globals.css). The CCD
  // header and footer sit outside <main> and stay CCD-branded.
  brand?: "brew";
  sections: Section[];
};

export const navGroups = [
  {
    key: "about",
    label: "About",
    href: "/about",
    active: "about",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Mission & H.E.A.R.T.", href: "/about#heart" },
      { label: "What is a Co-op?", href: "/what-is-a-coop" },
      { label: "Team & Partners", href: "/team" },
      { label: "Partners & Funders", href: "/partners" },
    ],
  },
  {
    key: "programs",
    label: "Programs",
    href: "/programs",
    active: "programs",
    items: [
      { label: "Center for Social Impact", href: "/center-for-social-impact" },
      { label: "Clean & Green Team", href: "/clean-and-green" },
      { label: "Community Co-op Market", href: "/coop-market" },
      { label: "Tool Bank", href: "/tool-bank" },
      { label: "Workforce Development", href: "/programs#workforce" },
    ],
  },
  {
    key: "involved",
    label: "Get Involved",
    href: "/membership",
    active: "involved",
    items: [
      { label: "Become a Member", href: "/membership" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Donate", href: "/donate" },
      { label: "Brick Campaign", href: "/brick-campaign" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    key: "brew",
    label: "4th Brew",
    href: "/4th-brew",
    active: "brew",
    items: [
      { label: "Shop Coffee", href: "/shop" },
      { label: "Our Story", href: "/4th-brew" },
      { label: "Brewing Methods", href: "/brewing" },
    ],
  },
] as const;

// REAL before/after pairs, harvested from ccdgroup.org's /work gallery and
// visually verified as the same location in two states (same house number,
// fence, siding, and meter placement confirmed).
export const beforeAfterPairs: { before: string; after: string; label: string }[] = [
  { before: "/media/ba1-before.jpg", after: "/media/ba1-after.jpg", label: "Full yard & exterior transformation" },
  { before: "/media/ba2-before.jpg", after: "/media/ba2-after.jpg", label: "Foundation beds & fresh planting" },
];

// =============================================================================
// THE 4TH BREW — CCD's coffee brand. Shopify is the catalog + checkout backend
// only; every page a customer reads lives here.
//
// Split of responsibility:
//   - This file owns the EDITORIAL: which coffees we sell, in what order, and
//     how they're described. Curated, stable, reviewable in a diff.
//   - Shopify owns the COMMERCE: current price, stock, and product photo.
//     `components/BrewProducts.tsx` fetches `{brewShop}/products.json` at build
//     time and merges live values in by handle.
//
// The variant IDs and prices below are the FALLBACK used when that fetch fails
// (offline build, store down, domain mid-migration) so a deploy never breaks.
// They were captured Aug 2026. If a variant is deleted in Shopify its cart link
// here goes stale — re-capture from `{brewShop}/products.json`.
//
// PRODUCT PHOTOS: the `image` on each product is now a LOCAL copy in
// `public/media/brew/` (captured from Shopify). BrewProducts.tsx still prefers
// the LIVE Shopify photo when the catalog fetch succeeds, so a non-technical
// teammate can swap a product photo in Shopify and it flows through automatically
// — the local file is only the fallback shown if Shopify is unreachable. This
// keeps the coffee visible even during a store outage or domain migration.
// =============================================================================

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

export const BREW_CDN = "https://cdn.shopify.com/s/files/1/0597/3993/0683/files";

export const brewProducts: BrewProduct[] = [
  {
    handle: "the-pawn",
    title: "The Pawn",
    roast: "Medium roast",
    notes:
      "Smooth. Strategic. Full of potential. Milk chocolate, balanced sweetness, and a subtle fruity brightness — the everyday cup that never gets in its own way.",
    image: "/media/brew/pawn-bag.png",
    alt: "The Pawn — 4th Brew medium roast coffee bag",
    variants: [
      { id: 43079751237691, title: "12oz / Whole bean", price: "18.99", available: true },
      { id: 43079751204923, title: "12oz / Ground", price: "18.99", available: true },
      { id: 43910647087163, title: "5lb / Whole bean", price: "94.99", available: true },
      { id: 43910647119931, title: "5lb / Ground", price: "94.99", available: true },
    ],
  },
  {
    handle: "the-knight",
    title: "The Knight",
    roast: "Medium-dark roast",
    notes:
      "Bold. Calculated. Unconventional. Layered with rich cocoa, smooth caramel sweetness, and a subtle turn you don't see coming.",
    image: "/media/brew/knight-bag.png",
    alt: "The Knight — 4th Brew medium-dark roast coffee bag",
    variants: [
      { id: 43079751008315, title: "12oz / Whole bean", price: "18.99", available: true },
      { id: 43079750975547, title: "12oz / Ground", price: "18.99", available: true },
      { id: 43910607863867, title: "5lb / Whole bean", price: "94.99", available: true },
      { id: 43910607896635, title: "5lb / Ground", price: "94.99", available: true },
    ],
  },
  {
    handle: "the_rook",
    title: "The Rook",
    roast: "Dark roast",
    notes:
      "Built with depth and structure. Bold dark chocolate, a full heavy body, and a pronounced smoky finish that lingers with authority.",
    image: "/media/brew/rook-bag.png",
    alt: "The Rook — 4th Brew dark roast coffee bag",
    variants: [
      { id: 43079750877243, title: "12oz / Whole bean", price: "18.99", available: true },
      { id: 43079750910011, title: "12oz / Ground", price: "18.99", available: true },
      { id: 43910564053051, title: "5lb / Whole bean", price: "94.99", available: true },
      { id: 43910564085819, title: "5lb / Ground", price: "94.99", available: true },
    ],
  },
];

// The eight brewing methods, carried over verbatim in substance from The 4th
// Brew's own guide. Rendered by the standard CardsSection.
export const brewingMethods: Card[] = [
  {
    title: "Drip / Automatic",
    image: "/media/brew/method-drip.png",
    alt: "Line icon of a drip coffee maker",
    meta: "BALANCED · RELIABLE · EVERYDAY",
    body: "Designed for consistency and ease. Produces a smooth, well-rounded cup with dependable flavor.",
    bullets: [
      "Grind: medium, like sea salt",
      "Water: 195-205°F, ratio about 1:16",
      "Filter, grounds, cold water in the reservoir, press start",
      "Done in 5-7 minutes",
      "Pre-wet the filter to lose the paper taste",
    ],
  },
  {
    title: "Pour-Over",
    image: "/media/brew/method-pour-over.png",
    alt: "Line icon of a pour-over dripper and kettle",
    meta: "SMOOTH · BOLD · BRIGHT",
    body: "A hands-on method that brings clarity and brightness to each cup. Ideal for highlighting subtle tasting notes.",
    bullets: [
      "Grind: medium-fine",
      "Water: 195-205°F, ratio about 1:16",
      "Rinse the filter and warm the dripper first",
      "Bloom with a little water for 30-45 seconds, then pour in steady circles",
      "Total brew 3-4 minutes — keep the flow even for even extraction",
    ],
  },
  {
    title: "French Press",
    image: "/media/brew/method-french-press.png",
    alt: "Line icon of a French press",
    meta: "BOLD · STRONG · RICH",
    body: "An immersion method that pulls deeper flavors and oils through, for a heavier mouthfeel and a robust finish.",
    bullets: [
      "Grind: coarse",
      "Water: 195-205°F, ratio about 1:16",
      "Saturate the grounds, stir, and steep about 4 minutes",
      "Press slowly and evenly",
      "Decant right away — coffee left on the grounds over-extracts",
    ],
  },
  {
    title: "Espresso",
    image: "/media/brew/method-espresso.png",
    alt: "Line icon of an espresso machine portafilter",
    meta: "INTENSE · STRONG · POWERFUL",
    body: "A fast, high-pressure method that delivers a rich, concentrated shot under a thick crema.",
    bullets: [
      "Grind: fine, table salt to powder",
      "Water: 190-196°F, yield about 1:2 (18g in, 36-40g out)",
      "Dose, distribute, tamp with even pressure",
      "Aim for a 25-30 second extraction",
      "Small grind and pressure changes move the taste a long way",
    ],
  },
  {
    title: "AeroPress",
    image: "/media/brew/method-aeropress.png",
    alt: "Line icon of an AeroPress",
    meta: "SMOOTH · VERSATILE · FAST",
    body: "A compact brewer that combines immersion and pressure for a clean, balanced cup in about two minutes.",
    bullets: [
      "Grind: medium-fine",
      "Water: about 200°F, ratio about 1:13",
      "Rinse the filter, add grounds, pour",
      "Stir 10 seconds, steep 1 minute, press gently",
      "Try the inverted method for more body",
    ],
  },
  {
    title: "Cold Brew",
    image: "/media/brew/method-cold-brew.png",
    alt: "Line icon of a cold brew jar",
    meta: "LOW-ACID · SMOOTH · REFRESHING",
    body: "Brewed slowly with cold water into a naturally smooth, mellow concentrate. Made ahead, poured all week.",
    bullets: [
      "Grind: extra-coarse, like peppercorns",
      "Cold water, ratio about 1:5",
      "Stir to saturate, cover, steep 12-24 hours in the fridge",
      "Strain through a fine filter or cloth",
      "Dilute to taste — longer steep means stronger concentrate",
    ],
  },
  {
    title: "Siphon / Vacuum",
    image: "/media/brew/method-siphon.png",
    alt: "Line icon of a siphon vacuum brewer",
    meta: "CLEAN · AROMATIC · REFINED",
    body: "A visually striking method that uses vapor pressure to produce an exceptionally clean cup.",
    bullets: [
      "Grind: medium-fine",
      "Water: 195-205°F, ratio about 1:16",
      "Heat the bottom chamber; add grounds once the water rises",
      "Stir gently and let it brew",
      "Pull the heat — the coffee draws back down. Serve immediately",
    ],
  },
  {
    title: "Moka Pot",
    image: "/media/brew/method-moka-pot.png",
    alt: "Line icon of a stovetop moka pot",
    meta: "RICH · STRONG · STOVETOP",
    body: "A stovetop brewer that makes a bold, espresso-adjacent coffee with real intensity.",
    bullets: [
      "Grind: fine-medium",
      "Pre-heated water to the valve line",
      "Fill the basket level — do not tamp",
      "Assemble and heat on medium; pull it at the first gurgle",
      "Run the base under cold water to stop extraction instantly",
    ],
  },
];

export const pages: Record<string, SitePage> = {
  home: {
    slug: "",
    title: "Cooperative Community Development",
    description:
      "CCD is building community-owned infrastructure in Irvington, Baltimore.",
    active: "home",
    heroTitle: "Building the block.",
    heroAccent: "Brick by brick.",
    heroBody:
      "A member-owned cooperative turning vacant spaces into markets, gardens, services, and neighborhood wealth in Baltimore's 21229.",
    heroCta: { label: "Become a member", href: "/membership" },
    sections: [
      {
        type: "stats",
        eyebrow: "IRVINGTON, BALTIMORE",
        title: "Community ownership, visible on the block.",
        body:
          "CCD connects green space, food access, cooperative enterprise, and local services into one neighborhood-owned model.",
        stats: [
          { value: "2020", label: "Founded by neighbors" },
          { value: "5,000", label: "Sq ft center underway" },
          { value: "9", label: "Clean & Green services" },
          { value: "4", label: "Active neighborhood projects" },
        ],
      },
      {
        type: "cards",
        title: "Programs built by neighbors, owned by members.",
        cards: [
          {
            title: "Community Co-op Market",
            body: "Seasonal markets and local food access on Frederick Avenue.",
            image: "/media/market-vendors-table.jpg",
            alt: "Vendors at a stocked co-op market table under the tents",
            href: "/coop-market",
          },
          {
            title: "Center for Social Impact",
            body: "A former storage building becoming a grocery, media center, and maker marketplace.",
            image: "/media/mural-marketplace-1.jpg",
            alt: "3932 Frederick Avenue mural",
            href: "/center-for-social-impact",
          },
          {
            title: "Clean & Green",
            body: "Nine outdoor services that keep the neighborhood clean while funding CCD programs.",
            image: "/media/cleangreen-2.jpg",
            alt: "Clean and Green crew member working",
            href: "/clean-and-green",
          },
          {
            title: "Tool Bank",
            body: "Resident members get free access to shared tools for home and block projects.",
            image: "/media/toolbank-wheelbarrow.jpg",
            alt: "Young gardener with wheelbarrow and trowel at the community beds",
            href: "/tool-bank",
          },
          {
            title: "Workforce Development",
            body: "Training and paid pathways connected to real neighborhood work.",
            image: "/media/farm-team-beds.jpg",
            alt: "Youth crew tending raised garden beds at the community farm",
            href: "/programs#workforce",
          },
          {
            title: "Projects in the 21229",
            body: "Gardens, murals, walking tours, and reclaimed spaces across Irvington.",
            image: "/media/drone-3.jpg",
            alt: "Aerial view of community garden path",
            href: "/projects",
          },
        ],
      },
      { type: "heart", id: "heart" },
      {
        type: "split",
        theme: "dark",
        title: "What was once abandoned can become a beacon.",
        body:
          "In 2023, CCD acquired the former Jarbo Brothers Storage facility at 3932-3934 Frederick Avenue. With partners and members, it is becoming one of Baltimore's most ambitious cooperative infrastructure projects: a co-op grocery, media center, maker stalls, and training space.",
        image: "/media/mural-marketplace-1.jpg",
        alt: "The Center for Social Impact mural",
        ctaText: "Support the brick campaign",
        ctaHref: "/brick-campaign",
      },
      { type: "projectMap", title: "Our work in the 21229." },
      {
        type: "gallery",
        title: "Four corners of one neighborhood.",
        images: [
          { src: "/media/drone-garden-1.jpg", alt: "Memorial Garden ceremony from above" },
          { src: "/media/community-together-2.jpg", alt: "Together We Can Do Great Things mural" },
          { src: "/media/drone-2.jpg", alt: "CCD headquarters and neighbors on Cooperative Way" },
          { src: "/media/cleangreen-1.jpg", alt: "Clean and Green crew repairing a sidewalk" },
        ],
      },
      { type: "testimonials", title: "Good work changes the block." },
      { type: "partnerWall", title: "Built with our partners." },
      {
        type: "cards",
        title: "What's happening at CCD",
        cards: [
          {
            meta: "JUN 2026",
            title: "Summer Shoe Drive",
            body: "Gently-worn shoes fund the Center for Social Impact and stay out of landfills.",
            image: "/media/shoedrive-shoes.png",
            alt: "Sneaker made of many donated shoes",
            href: "/news",
          },
          {
            meta: "MAY 2026",
            title: "Memorial Garden community day",
            body: "Neighbors gathered for planting, remembrance, and food.",
            image: "/media/drone-garden-1.jpg",
            alt: "Aerial of the Memorial Garden community ceremony",
            href: "/news",
          },
          {
            meta: "NOV 2024",
            title: "Cooperative Way celebration",
            body: "A new street sign marks the block's cooperative future.",
            image: "/media/event-coopway-1.jpg",
            alt: "Cooperative Way street celebration",
            href: "/news",
          },
        ],
      },
    ],
  },
  about: {
    slug: "about",
    title: "About CCD",
    description: "CCD's story, mission, co-op model, team, and partners.",
    active: "about",
    eyebrow: "OUR STORY",
    heroTitle: "We are Baltimore's cooperative future.",
    heroBody:
      "Cooperative Community Development started with one reclaimed lot and grew into a member-governed blueprint for food, housing, green space, and ownership.",
    heroImage: "/media/irvington-sign.jpg",
    heroAlt: "Welcome to Historic Irvington 1874 mosaic sign — where houses become homes and neighbors become friends",
    sections: [
      {
        type: "split",
        eyebrow: "SINCE 2020",
        title: "A co-op grown from the block up.",
        body:
          "CCD was founded by Johnny Martin Jr. after years of watching investment promises miss Irvington. The answer was not another outside rescue plan. It was ownership from within: neighbors pooling dues, decisions, work, and vision.",
        bullets: [
          "Started from the Oasis @ 240 and reclaimed vacant land.",
          "Acquired 3932-3934 Frederick Avenue for the Center for Social Impact.",
          "Built programs that turn dues into visible community benefit.",
        ],
        image: "/media/volunteers-bed-build.jpg",
        alt: "Volunteers beside a newly built raised garden bed between rowhouses",
      },
      {
        type: "timeline",
        title: "From one lot to a cooperative corridor.",
        items: [
          { year: "2019", title: "The first lot", body: "Neighbors began reclaiming neglected land and proving the model in public at Oasis @ 240." },
          { year: "2020", title: "CCD founded", body: "Cooperative Community Development formalized the work with member governance in January 2020." },
          { year: "2023", title: "3932-3934 acquired", body: "The former Jarbo Brothers facility at 3932-3934 Frederick Avenue became the future Center for Social Impact, with support from BRED." },
          { year: "2024", title: "Cooperative Way", body: "The block celebrated a new name and a visible cooperative identity." },
          { year: "Next", title: "The center opens", body: "A co-op grocery, media center, maker stalls, and training space come online." },
        ],
      },
      { type: "heart", id: "heart" },
      {
        type: "cards",
        id: "coop",
        theme: "gray",
        title: "What is a co-op?",
        body:
          "A cooperative is owned and governed by the people who use it. CCD keeps the benefits local and keeps decision-making in the hands of members.",
        cards: [
          { title: "Members join", body: "Residents, businesses, nonprofits, and supporters pay dues that fund the shared work.", href: "/what-is-a-coop" },
          { title: "Members govern", body: "One member gets one vote. Big decisions come back to the people closest to the work.", href: "/what-is-a-coop" },
          { title: "Members share benefits", body: "Tool access, service discounts, markets, events, and neighborhood improvements stay local.", href: "/membership" },
        ],
      },
      { type: "aboutTeam", id: "team" },
    ],
  },
  "what-is-a-coop": {
    slug: "what-is-a-coop",
    title: "What is a Co-op?",
    description: "How cooperatives work and why CCD is member-owned and governed.",
    active: "about",
    eyebrow: "THE MODEL",
    heroTitle: "A co-op is",
    heroAccent: "yours.",
    heroBody:
      "A cooperative is an autonomous association of people united voluntarily to meet common economic, social, and cultural needs through a jointly-owned, democratically-controlled enterprise.",
    heroImage: "/media/community-together-2.jpg",
    heroPosition: "center 35%",
    heroAlt: "Together We Can Do Great Things mural",
    sections: [
      {
        type: "steps",
        eyebrow: "HOW IT WORKS",
        title: "Members, governance, shared benefit.",
        theme: "green",
        steps: [
          { n: "01", title: "Members join", body: "Residents, businesses, and supporters pay dues that fund the shared work of the co-op." },
          { n: "02", title: "Members govern", body: "Voting members each get one vote. Major decisions come back to the membership." },
          { n: "03", title: "Members share benefits", body: "Tool access, service discounts, markets, and neighborhood improvements stay local." },
        ],
      },
      {
        type: "cards",
        title: "The cooperative principles.",
        body:
          "CCD follows the internationally recognized cooperative principles, adapted for Irvington and Baltimore's 21229.",
        cards: [
          { title: "Voluntary & open membership", body: "Open to all who can use the co-op's services and accept the responsibilities of membership." },
          { title: "Democratic member control", body: "One member, one vote. Members set direction and hold leadership accountable." },
          { title: "Member economic participation", body: "Members contribute dues and share in the benefits the co-op creates." },
          { title: "Autonomy & independence", body: "CCD is a self-help organization controlled by its members." },
          { title: "Education & training", body: "The co-op invests in members so they can contribute to its development." },
          { title: "Concern for community", body: "CCD works for the sustainable development of Irvington and the wider 21229." },
        ],
      },
      {
        type: "cta",
        theme: "gold",
        title: "This is your co-op. Own a piece of it.",
        body: "Membership turns support into governance, and dues into visible community benefit.",
        href: "/membership",
        label: "Become a member",
      },
    ],
  },
  team: {
    slug: "team",
    title: "Team & Partners",
    description: "The people and partner organizations moving CCD forward.",
    active: "about",
    eyebrow: "OUR PEOPLE",
    heroTitle: "The people moving",
    heroAccent: "CCD forward.",
    heroBody:
      "Leadership, interns, open roles, and partner organizations turn the cooperative model into daily work on the block.",
    heroImage: "/media/memorial-garden.jpg",
    heroAlt: "Neighbors and members gathered on an Irvington walking tour",
    sections: [
      { type: "teamFull", id: "team" },
      { type: "partnerWall", title: "Partners & funders." },
    ],
  },
  partners: {
    slug: "partners",
    title: "Partners & Funders",
    description: "The organizations that make CCD's cooperative work possible.",
    active: "about",
    eyebrow: "PARTNERS & FUNDERS",
    heroTitle: "Stronger",
    heroAccent: "together.",
    heroBody:
      "Every CCD program is strengthened by the vision, resources, and dedication of our partners and funders across Baltimore.",
    heroImage: "/media/drone-1.jpg",
    heroAlt: "Aerial view over the Irvington neighborhood",
    sections: [
      { type: "partnerWall", title: "Our partners & funders." },
      {
        type: "cta",
        theme: "green",
        title: "Become a partner.",
        body: "Businesses, funders, and organizations can invest in the cooperative corridor. Let's build together.",
        href: mailtoFallback("Partnership with CCD"),
        label: "Start a conversation",
      },
    ],
  },
  programs: {
    slug: "programs",
    title: "Programs",
    description: "CCD programs serving Irvington and Baltimore's 21229.",
    active: "programs",
    heroTitle: "Built by the block,",
    heroAccent: "for the block.",
    heroBody:
      "CCD programs turn cooperative dues and partner support into practical services, food access, tools, training, and neighborhood events.",
    heroImage: "/media/cleangreen-garden-hero.jpg",
    heroAlt: "Clean and Green crew member at work beside the We Can mural",
    sections: [
      {
        type: "split",
        id: "market",
        title: "Community Co-op Market",
        body:
          "The market brings produce, local vendors, music, membership sign-ups, and neighborhood energy to Frederick Avenue. It previews the year-round co-op grocery planned for the Center for Social Impact.",
        image: "/media/event-coopway-2.jpg",
        alt: "Street celebration on Cooperative Way",
        ctaText: "Explore the market",
        ctaHref: "/coop-market",
      },
      {
        type: "split",
        id: "toolbank",
        theme: "green",
        reverse: true,
        title: "The Tool Bank",
        body:
          "Resident members can borrow tools for home repairs, garden work, and block projects. It is a practical way to make ownership cheaper and collective.",
        bullets: ["Free for resident members", "Seasonal tools and basic equipment", "Built around neighbor-to-neighbor repair"],
        ctaText: "Visit the Tool Bank",
        ctaHref: "/tool-bank",
      },
      {
        type: "split",
        id: "workforce",
        title: "Workforce development",
        body:
          "CCD connects training to actual neighborhood work: landscaping, facilities, events, media, market operations, and cooperative business skills. The 4th Brew, CCD's own coffee brand, teaches the roasting and retail trades - and DeWalt backs the construction side.",
        image: "/media/farm-team-beds.jpg",
        alt: "Youth crew tending raised beds at the community farm training site",
        ctaText: "Meet our partners",
        ctaHref: "/partners",
      },
    ],
  },
  "coop-market": {
    slug: "coop-market",
    title: "Community Co-op Market",
    description: "CCD's seasonal community market and co-op grocery on Frederick Avenue.",
    active: "programs",
    heroTitle: "The Community",
    heroAccent: "Co-op Market.",
    heroBody:
      "Local produce, neighborhood makers, live music, and a preview of the year-round cooperative grocery coming to the Center for Social Impact.",
    heroImage: "/media/market-vendors-table.jpg",
    heroPosition: "center 35%",
    heroAlt: "Smiling vendors at their stocked co-op market table under the tents",
    sections: [
      {
        type: "split",
        title: "A market owned by the neighborhood.",
        body:
          "The Community Co-op Market brings fresh produce, local vendors, and community energy to Frederick Avenue through the season, with membership sign-ups and Tool Bank info on site. It is the visible preview of the community-owned grocery planned inside the Center for Social Impact.",
        bullets: [
          "Local fresh-cut flower and produce vendors",
          "Composting, permaculture, and pollinator learning",
          "Family-friendly, all ages, free to attend",
        ],
        image: "/media/market-mural.jpg",
        alt: "The Community Market mural with joined hands and hearts",
      },
      {
        type: "cards",
        theme: "gray",
        title: "Be part of the market.",
        cards: [
          { title: "Shop local", body: "Support neighborhood makers, growers, and food vendors every market day.", href: "/events" },
          { title: "Become a vendor", body: "Local vendors can register to sell at upcoming markets.", href: actionLink(siteConfig.links.vendorRegistration, "Co-op Market vendor registration", siteConfig.contact.facilitiesEmail) },
          { title: "Bring the family", body: "Music, food, and learning for all ages. Contact Marquita for details.", href: mailtoFallback("Co-op Market", siteConfig.contact.facilitiesEmail) },
        ],
      },
      {
        type: "gallery",
        title: "The market, in motion.",
        images: [
          { src: "/media/market-vendor.jpg", alt: "Vendor at her jewelry booth under a market tent" },
          { src: "/media/market-vendor-craft.jpg", alt: "Craft vendor showing handmade pieces to a father and child" },
          { src: "/media/market-beds-flag.jpg", alt: "Produce beds beside the Farmers Market flag" },
        ],
      },
    ],
  },
  "tool-bank": {
    slug: "tool-bank",
    title: "The Tool Bank",
    description: "Borrow tools instead of buying them — free for CCD resident members.",
    active: "programs",
    heroTitle: "Borrow it.",
    heroAccent: "Don't buy it.",
    heroBody:
      "The CCD Tool Bank lets resident members borrow tools for home repairs, garden work, and block projects — making ownership cheaper and collective.",
    heroImage: "/media/toolbank-wheelbarrow.jpg",
    heroAlt: "Young gardener with gloves, wheelbarrow, and trowel at the community beds",
    sections: [
      {
        type: "steps",
        eyebrow: "HOW IT WORKS",
        title: "Three steps to borrow.",
        theme: "green",
        steps: [
          { n: "01", title: "Become a member", body: "Resident members get free Tool Bank access; others get discounted access." },
          { n: "02", title: "Reserve a tool", body: "Request the tool you need for your home, garden, or block project." },
          { n: "03", title: "Pick up & return", body: "Grab it, do the work, and return it for the next neighbor." },
        ],
      },
      {
        type: "split",
        reverse: true,
        title: "Made for real neighborhood work.",
        body:
          "From lawn and garden equipment to basic home-repair tools, the Tool Bank is built around neighbor-to-neighbor repair. Full tool inventory is being catalogued — reach out and we'll tell you what's available.",
        bullets: ["Free for resident members", "Discounted for other members", "Seasonal and basic equipment"],
        image: "/media/cleangreen-sidewalk.jpg",
        alt: "CCD work truck loaded with rakes and tools on a job site",
        ctaText: "Ask about a tool",
        ctaHref: mailtoFallback("Tool Bank request"),
      },
      {
        type: "cta",
        theme: "gold",
        title: "Free for resident members.",
        body: "Join CCD as a resident member for free Tool Bank access and a vote in the co-op.",
        href: "/membership",
        label: "Become a member",
      },
    ],
  },
  "center-for-social-impact": {
    slug: "center-for-social-impact",
    title: "Center for Social Impact",
    description: "The 3932 Frederick Avenue cooperative infrastructure project.",
    active: "programs",
    heroTitle: "The Center for",
    heroAccent: "Social Impact.",
    heroBody:
      "A 5,000-square-foot former storage facility is becoming a cooperative grocery, multimedia center, maker marketplace, and flexible training space.",
    heroImage: "/media/mural-marketplace-1.jpg",
    heroAlt: "3932 Frederick Avenue with the community marketplace mural",
    sections: [
      {
        type: "split",
        title: "5,000 square feet of possibility.",
        body:
          "The former Jarbo Brothers Storage facility at 3932-3934 Frederick Avenue is becoming shared social infrastructure owned by the community it serves. CCD is working with BRED, ReGEN Consulting, and the Neighborhood Design Center to finalize the plans.",
        bullets: ["Co-op grocery store", "Multimedia center", "Retail stalls for local makers", "Training and gathering space"],
        image: "/media/rendering-csi-facade.jpg",
        alt: "Neighborhood Design Center facade rendering of the Center for Social Impact (March 2024)",
      },
      {
        type: "stats",
        theme: "green",
        title: "From storage facility to social infrastructure.",
        stats: [
          { value: "5,000", label: "Square feet" },
          { value: "4", label: "Core uses" },
          { value: "2023", label: "Year acquired" },
        ],
      },
      {
        type: "cta",
        theme: "gold",
        title: "Put your name into the wall.",
        body: "The brick campaign helps turn the building into a beacon for cooperative ownership.",
        href: "/brick-campaign",
        label: "Support the brick campaign",
      },
    ],
  },
  "clean-and-green": {
    slug: "clean-and-green",
    title: "Clean & Green",
    description: "Residential and commercial outdoor services from CCD's neighborhood crew.",
    active: "programs",
    heroTitle: "Your yard.",
    heroAccent: "Our pride.",
    heroBody:
      "Clean & Green handles residential and commercial outdoor work across Irvington and nearby communities, with every job funding CCD's broader mission.",
    heroImage: "/media/cleangreen-garden-wide.jpg",
    heroAlt: "Clean and Green crew transforming a community garden beside the Together We Can mural",
    sections: [
      {
        type: "cards",
        title: "Everything outside your four walls.",
        body: "Nine services, one crew from the neighborhood. Resident members save 15%.",
        cards: [
          { title: "Basic Cut & Trim", body: "Grass cutting, edging, and seasonal cleanup." },
          { title: "Hedging", body: "Shaping and trimming hedges and shrubs." },
          { title: "Flower Beds", body: "Bed prep, planting, mulching, and upkeep." },
          { title: "Tree Pruning", body: "Safe pruning for health and clearance." },
          { title: "Gutter Cleaning", body: "Clearing gutters and downspouts." },
          { title: "Hard Scaping", body: "Walkways, borders, and outdoor features." },
          { title: "Trash Removal", body: "Debris and junk hauling from lots and yards." },
          { title: "Snow Removal", body: "Seasonal snow clearing when available." },
          { title: "Shed / Basement Clean Out", body: "Full clear-outs for sheds and basements." },
        ],
      },
      {
        type: "beforeAfter",
        eyebrow: "OUR WORK",
        title: "Drag to see the difference.",
        body: "Real before-and-after from Clean & Green jobs across Irvington.",
        // Renders only when beforeAfterPairs has real pairs (see note at its definition).
        pairs: beforeAfterPairs,
      },
      {
        type: "gallery",
        title: "A crew from the community.",
        images: [
          { src: "/media/cleangreen-crew-wide.jpg", alt: "Five-person crew rebuilding a sidewalk with jackhammers and shovels" },
          { src: "/media/cleangreen-sidewalk.jpg", alt: "Crew and loaded work truck on a sidewalk job" },
          { src: "/media/cleangreen-cart.jpg", alt: "Crew member hauling rock by the Together We Can mural" },
          { src: "/media/cleangreen-crew.jpg", alt: "Crew member operating a demolition hammer" },
        ],
      },
      { type: "estimateForm", id: "estimate" },
    ],
  },
  projects: {
    slug: "projects",
    title: "Projects",
    description: "CCD projects across Irvington and Baltimore's 21229.",
    active: "projects",
    heroTitle: "Our work in",
    heroAccent: "the 21229.",
    heroBody:
      "Gardens, murals, markets, walking tours, and reclaimed spaces show what cooperative development looks like at street level.",
    heroImage: "/media/drone-3.jpg",
    heroAlt: "Aerial view of a reclaimed green path in Irvington",
    sections: [
      {
        type: "cards",
        title: "Projects with roots.",
        cards: [
          {
            title: "Oasis @ 240",
            body: "A reclaimed community space and anchor on the Irvington walking tour.",
            image: "/media/community-oasis.jpg",
            alt: "Walking tour group in the Oasis garden",
            meta: "COMPLETED",
            href: "/projects/oasis-240",
          },
          {
            title: "Community Center for Change",
            body: "The 3932 Frederick Avenue building becoming the Center for Social Impact.",
            image: "/media/mural-marketplace-1.jpg",
            alt: "Marketplace mural",
            meta: "IN PROGRESS",
            href: "/projects/community-center",
          },
          {
            title: "Botanical Bus Stop",
            body: "A future transit stop shaped by food access, beauty, and care.",
            image: "/media/cleangreen-1.jpg",
            alt: "Clean and Green crew maintaining a streetside site",
            meta: "PLANNED",
            href: "/projects/bus-stop",
          },
          {
            title: "Little Memorial Garden",
            body: "A space for remembrance, planting, food, and neighborhood gathering.",
            image: "/media/drone-garden-2.jpg",
            alt: "Community ceremony in the Memorial Garden",
            meta: "IN PROGRESS",
            href: "/projects/memorial-garden",
          },
        ],
      },
      { type: "projectMap", title: "Mapping the work." },
      {
        type: "split",
        theme: "dark",
        title: "Walk the block with us.",
        body:
          "The Irvington walking tour links murals, gardens, businesses, and neighborhood histories into a route that makes local memory visible.",
        image: "/media/irvington-tour.jpg",
        alt: "Irvington walking tour map",
        ctaText: "See events",
        ctaHref: "/events",
      },
      {
        type: "gallery",
        title: "The proof is the people.",
        credit: "Media by Mastermind Photography & Designs, unless otherwise noted.",
        images: [
          { src: "/media/community-together-5.jpg", alt: "Artist Latosha Maddox beside the Together We Can mural" },
          { src: "/media/community-barbershop.jpg", alt: "Tour group outside BMore Fresh Barbershop" },
          { src: "/media/memorial-garden.jpg", alt: "Walking tour gathering in Irvington" },
        ],
      },
    ],
  },
  membership: {
    slug: "membership",
    title: "Membership",
    description: "Join CCD as a resident, supporter, organization, or business member.",
    active: "involved",
    heroTitle: "This is your co-op.",
    heroAccent: "Own a piece of it.",
    heroBody:
      "Membership turns support into governance. Dues fund programs directly, and voting members help decide what CCD does next.",
    heroImage: "/media/community-together-5.jpg",
    heroPosition: "center 30%",
    heroAlt: "Artist beside the Together We Can Do Great Things mural",
    sections: [
      { type: "membershipTiers", id: "tiers" },
      { type: "membershipFaq" },
    ],
  },
  "brick-campaign": {
    slug: "brick-campaign",
    title: "Brick Campaign",
    description: "Support the Center for Social Impact brick campaign.",
    active: "involved",
    heroTitle: "What was once abandoned can become",
    heroAccent: "a beacon.",
    heroBody:
      "Help transform 3932 Frederick Avenue into a cooperative landmark by putting your name, family, or organization into the wall.",
    heroImage: "/media/drone-2.jpg",
    heroAlt: "Aerial view of the community gathered at a brick building",
    sections: [
      {
        type: "split",
        title: "One building. A thousand names.",
        body:
          "Every brick is a visible commitment to community ownership. The campaign funds the conversion of the Center for Social Impact from vacant storage into shared neighborhood infrastructure.",
        bullets: ["Individual, family, and business recognition", "Permanent placement in the wall", "Funds stay tied to the building campaign"],
        image: "/media/mural-marketplace-3.jpg",
        alt: "Community marketplace mural detail",
      },
      {
        type: "cta",
        theme: "gold",
        title: "Buy your brick.",
        body: "Named bricks are handled through CCD's fundraising partner. Every brick helps build the Center for Social Impact.",
        href: actionLink(siteConfig.links.brickCampaign, "Brick Campaign"),
        label: "Buy a brick",
      },
      {
        type: "cta",
        theme: "green",
        title: "Prefer to give directly?",
        body: "General donations support every CCD program, from green spaces to the Tool Bank.",
        href: actionLink(siteConfig.links.paypalDonate, "Donation to CCD"),
        label: "Make a donation",
      },
    ],
  },
  news: {
    slug: "news",
    title: "News & Events",
    description: "Upcoming events and latest CCD updates.",
    active: "news",
    heroTitle: "What's happening",
    heroAccent: "at CCD.",
    heroBody:
      "Markets, tours, drives, garden days, campaign updates, and public moments from the cooperative corridor.",
    heroImage: "/media/event-coopway-1.jpg",
    heroAlt: "The Cooperative Way street sign unveiling",
    sections: [{ type: "newsEvents", id: "events" }],
  },
  events: {
    slug: "events",
    title: "Events",
    description: "Upcoming CCD events, markets, tours, and community days.",
    active: "involved",
    heroTitle: "Events on",
    heroAccent: "the block.",
    heroBody:
      "Markets, walking tours, drives, and community days across Irvington. Come find us on Frederick Avenue.",
    heroImage: "/media/event-coopway-3.jpg",
    heroAlt: "Speaker at the CCD table during the Cooperative Way celebration",
    sections: [{ type: "eventsFull", id: "events" }],
  },
  donate: {
    slug: "donate",
    title: "Donate",
    description: "Invest in CCD's Irvington work or volunteer with the co-op.",
    active: "involved",
    heroTitle: "Invest in",
    heroAccent: "Irvington.",
    heroBody:
      "Every dollar supports community-owned programs, green spaces, markets, tools, and the Center for Social Impact.",
    heroImage: "/media/drone-garden-1.jpg",
    heroAlt: "Aerial view of a CCD community day",
    sections: [
      {
        type: "split",
        title: "Every dollar stays on the block.",
        body:
          "Donations help CCD maintain public spaces, run events, support the Tool Bank, and build the Center for Social Impact.",
        bullets: ["Program support", "Clean & Green operations", "Events and markets", "Building campaign support"],
        image: "/media/drone-3.jpg",
        alt: "Aerial of the reclaimed Oasis garden corridor",
        ctaText: "Donate now",
        ctaHref: actionLink(siteConfig.links.paypalDonate, "Donation to CCD"),
      },
      { type: "donatePanel", id: "volunteer" },
    ],
  },
  volunteer: {
    slug: "volunteer",
    title: "Volunteer",
    description: "Give time to CCD — garden days, markets, events, and block projects.",
    active: "involved",
    heroTitle: "Give time,",
    heroAccent: "not just money.",
    heroBody:
      "Not ready to become a member? Volunteering is the most direct way to help build the block — at markets, garden days, events, and clean-ups.",
    heroImage: "/media/farm-youth-harvest.jpg",
    heroPosition: "center 30%",
    heroAlt: "Smiling youth volunteer kneeling among the community garden beds",
    sections: [
      {
        type: "cards",
        theme: "gray",
        title: "Where volunteers help most.",
        cards: [
          { title: "Garden & green space days", body: "Planting, cleanup, and upkeep at the Oasis and Memorial Garden." },
          { title: "Markets & events", body: "Set up, welcome neighbors, and run the CCD table on market days." },
          { title: "Block projects & clean-ups", body: "Hands-on work reclaiming lots and beautifying the corridor." },
        ],
      },
      { type: "donatePanel", id: "signup" },
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact CCD",
    description: "Contact CCD, request facilities, or visit Frederick Avenue.",
    active: "contact",
    heroTitle: "Come find us",
    heroAccent: "on Frederick Ave.",
    heroBody:
      "Reach the team, ask about membership, book facilities, or start a conversation about bringing cooperative development to your block.",
    heroImage: "/media/ccd-hq-crew.jpg",
    heroAlt: "The CCD building at 4004 Frederick Avenue with its painted logo and crew outside",
    sections: [
      {
        type: "directory",
        id: "directory",
        title: "Start with the right door.",
        body:
          "Every CCD service area has a real person behind it. Reach out directly, or call (410) 205-2488 for anything else.",
      },
      { type: "contactPanel", id: "booking" },
    ],
  },

  // --- The 4th Brew ------------------------------------------------------
  // CCD's coffee brand, absorbed from its own Shopify storefront. These three
  // pages carry `brand: "brew"`, which swaps the color/type tokens inside
  // <main> only (see `.brew` in globals.css).
  "4th-brew": {
    slug: "4th-brew",
    title: "The 4th Brew",
    description:
      "The 4th Brew is CCD's coffee brand — sustainably sourced, roasted in small batches, and reinvested into Baltimore.",
    active: "brew",
    brand: "brew",
    eyebrow: "THE 4TH BREW",
    heroTitle: "Not just coffee.",
    heroAccent: "A starting point.",
    heroBody:
      "Freshly roasted, always. Sustainably sourced, exceptionally roasted, and built so that something people already do every day pays back into the block it came from.",
    heroImage: "/media/brew/brew-hero-beans.jpg",
    heroPosition: "center 55%",
    heroAlt: "A close bed of freshly roasted coffee beans",
    heroCta: { label: "Shop the coffee", href: "/shop" },
    sections: [
      {
        type: "values",
        id: "promises",
        items: [
          {
            title: "Freshly roasted, always",
            body:
              "Small batches, roasted for flavor rather than shelf life, and shipped straight from the roaster.",
          },
          {
            title: "Sustainably sourced",
            body:
              "Beans from Colombia, Central and South America — chosen for quality and the character of their origin.",
          },
          {
            title: "Every bag gives back",
            body:
              "Revenue is reinvested into green space, local partnerships, and community-owned spaces in Irvington.",
          },
        ],
      },
      {
        type: "split",
        id: "story",
        eyebrow: "ABOUT THE 4TH BREW",
        title: "More than coffee. A foundation for something bigger.",
        body:
          "The 4th Brew is a small-batch coffee brand built on quality, creativity, and purpose. It started in Baltimore from a simple observation: coffee is something people buy every day, yet most brands stop at the product and never connect it back to the community.",
        image: "/media/brew/brew-barista.jpg",
        alt: "A barista pulling a fresh espresso into two cups",
        bullets: [
          "Sustainably sourced and roasted to keep the natural flavor — no artificial anything.",
          "Revenue reinvested into green space, local partnerships, and community-centered spaces.",
          "Deliberate growth: quality and transparency before scale.",
        ],
      },
      {
        type: "band",
        id: "mission",
        eyebrow: "OUR MISSION",
        title: "Turn everyday coffee into a tool for community growth.",
        body:
          "Through quality products, intentional reinvestment, and long-term vision — not just a brand, but a starting point for something bigger.",
        image: "/media/brew/brew-hero-beans.jpg",
        alt: "Roasted coffee beans",
      },
      {
        type: "split",
        reverse: true,
        eyebrow: "WHY COFFEE?",
        title: "Coffee is the habit. The block is the point.",
        body:
          "Coffee is already part of people's daily lives — it brings them together at home, at work, and in the neighborhood. The 4th Brew uses that everyday habit as a foundation. Instead of stopping at the product, we build something bigger through it: every bag supports community growth, shared spaces, and local impact.",
        image: "/media/brew/brew-lifestyle-4.jpg",
        alt: "Friends sharing coffee around a table",
      },
      {
        type: "steps",
        id: "support",
        theme: "green",
        eyebrow: "WHERE EVERY BAG GOES",
        title: "Three ways your cup builds the block.",
        body:
          "The 4th Brew reinvests on purpose. Every purchase moves money into three places at once.",
        steps: [
          {
            n: "01",
            title: "Grow the brand",
            body:
              "Covers roasting, inventory, and day-to-day operations so the coffee stays small-batch and consistent.",
          },
          {
            n: "02",
            title: "Build partnerships",
            body:
              "Connects The 4th Brew with the local organizations and community initiatives across Baltimore it plans to support and collaborate with.",
          },
          {
            n: "03",
            title: "Create future spaces",
            body:
              "Moves toward community-centered spaces — starting with the counter planned into the Center for Social Impact — where people connect beyond just buying coffee.",
          },
        ],
      },
      {
        type: "split",
        theme: "green",
        eyebrow: "WHY IT LIVES WITH CCD",
        title: "A coffee brand is a workforce program in disguise.",
        body:
          "Roasting, packing, service, and retail are teachable trades. The 4th Brew is CCD's coffee-culture and entrepreneurship partner, and its counter is planned into the Center for Social Impact at 3932-3934 Frederick Avenue alongside the co-op grocery and maker stalls. Buying a bag funds the training, not just the roast.",
        image: "/media/brew/brew-lifestyle-1.jpg",
        alt: "A 4th Brew bag and a poured cup on a workbench",
        ctaText: "See the Center for Social Impact",
        ctaHref: "/center-for-social-impact",
      },
      {
        type: "products",
        id: "coffee",
        eyebrow: "THE ROASTS",
        title: "Three roasts. One board.",
        body:
          "Pawn, Knight, Rook — named for the pieces that do the real work. Pick a size and a grind; checkout is handled by The 4th Brew's own store.",
      },
      {
        type: "band",
        id: "start",
        theme: "dark",
        eyebrow: "START HERE",
        title: "It's a simple purchase — but it's part of something bigger.",
        body:
          "Take the 4th. Every bag pours back into Irvington.",
        image: "/media/brew/brew-lifestyle-2.jpg",
        alt: "A hand holding a bag of 4th Brew coffee",
        cta: { label: "Shop the coffee", href: "/shop" },
      },
      {
        type: "faq",
        id: "faq",
        eyebrow: "GOOD TO KNOW",
        title: "Frequently asked questions.",
        items: [
          {
            q: "What makes The 4th Brew different?",
            a: "The 4th Brew is built around a simple idea: coffee is something people already buy every day, so we use it as a starting point to build something bigger. Every purchase helps grow the brand, develop local partnerships, and work toward community-centered spaces — it's not just the coffee, but what it supports over time.",
          },
          {
            q: "How does buying coffee help the community?",
            a: "Every purchase contributes to the foundation we're building. Right now it helps The 4th Brew operate, grow, and connect with local initiatives. Over time the goal is to turn that support into real partnerships, community projects, and physical spaces on Frederick Avenue where people can gather — it starts with a cup of coffee and builds into something more.",
          },
          {
            q: "Where is your coffee sourced from?",
            a: "From regions in Colombia, Central America, and South America, where climate and elevation produce rich, balanced flavors. We focus on quality sourcing that lets the natural character of the bean come through.",
          },
          {
            q: "What payment methods do you accept?",
            a: "Major credit and debit cards, PayPal, and secure gateways. Checkout runs on The 4th Brew's own Shopify store, so paying is easy and familiar — your cart carries over automatically.",
          },
          {
            q: "Is my payment information secure?",
            a: "Yes. Checkout uses secured, encrypted transactions handled entirely by Shopify's PCI-compliant checkout, so your payment details stay safe.",
          },
        ],
      },
      {
        type: "cta",
        theme: "dark",
        title: "Life's too short for average brews.",
        body:
          "Take the 4th. Every bag pours back into Irvington — and if you want to know exactly how to brew it, we wrote that down too.",
        href: "/brewing",
        label: "Read the brewing guide",
      },
    ],
  },
  shop: {
    slug: "shop",
    title: "Shop 4th Brew Coffee",
    description:
      "Buy The 4th Brew's small-batch coffee — The Pawn, The Knight, and The Rook, in 12oz or 5lb, whole bean or ground.",
    active: "brew",
    brand: "brew",
    eyebrow: "SHOP THE COFFEE",
    heroTitle: "Pick your side",
    heroAccent: "of the board.",
    heroBody:
      "Small-batch coffee from The 4th Brew — The Pawn, The Knight, and The Rook. Roasted for flavor rather than shelf life, and shipped straight from the roaster.",
    heroImage: "/media/brew/brew-cup.jpg",
    heroPosition: "center 38%",
    heroAlt: "A hand holding a branded The 4th Brew coffee cup",
    sections: [
      {
        type: "products",
        id: "coffee",
        eyebrow: "THE ROASTS",
        title: "Pick your side of the board.",
        body:
          "Every bag comes in 12oz or 5lb, whole bean or ground. Checkout runs on The 4th Brew's own store — your cart carries over automatically.",
      },
      {
        type: "values",
        id: "promises",
        items: [
          {
            title: "Roasted in small batches",
            body:
              "Shipped straight from the roaster, so every bag arrives fresh rather than sitting on a shelf.",
          },
          {
            title: "Two sizes, two grinds",
            body:
              "12oz or 5lb, whole bean or ground — pick what fits your routine.",
          },
          {
            title: "Secure checkout",
            body:
              "Payment runs on The 4th Brew's own Shopify store — encrypted and PCI-compliant.",
          },
        ],
      },
      {
        type: "split",
        reverse: true,
        eyebrow: "WHERE THE MONEY GOES",
        title: "The margin has a job.",
        body:
          "Revenue from every bag is reinvested into brand growth, local partnerships, and the community-centered spaces CCD is building on Frederick Avenue — green space, the co-op market, and workforce training in the trades behind the counter.",
        image: "/media/cleangreen-garden-hero.jpg",
        alt: "CCD's Clean & Green crew working a restored garden bed",
        ctaText: "See what CCD builds with it",
        ctaHref: "/programs",
      },
      {
        type: "cta",
        theme: "green",
        title: "Not sure how to brew it?",
        body:
          "Grind, temperature, and ratio for eight methods — from a drip machine to a siphon. Written so it actually helps.",
        href: "/brewing",
        label: "Read the brewing guide",
      },
    ],
  },
  brewing: {
    slug: "brewing",
    title: "Coffee Brewing Methods",
    description:
      "A simple guide to eight brewing methods — grind, water temperature, ratio, and steps for each.",
    active: "brew",
    brand: "brew",
    eyebrow: "BREWING METHODS",
    heroTitle: "Brew it the way",
    heroAccent: "it was intended.",
    heroBody:
      "A simple guide to eight methods, with the grind, water temperature, and ratio that each one actually wants. Start anywhere.",
    heroImage: "/media/brew/brew-lifestyle-3.jpg",
    // Portrait source (896x1200) in a wide hero — bias the crop up to the cup.
    heroPosition: "center 38%",
    heroAlt: "A pour-over brewing in progress",
    sections: [
      {
        type: "cards",
        id: "methods",
        eyebrow: "EIGHT WAYS",
        title: "Find your method.",
        body:
          "Ratios are a starting point, not a rule — taste and adjust. If one number matters most, it's the grind.",
        cards: brewingMethods,
      },
      {
        type: "cta",
        theme: "dark",
        title: "Got the method. Need the beans.",
        body: "The Pawn, The Knight, and The Rook — 12oz or 5lb, whole bean or ground.",
        href: "/shop",
        label: "Shop the coffee",
      },
    ],
  },
};

// Project detail pages (rendered at /projects/<slug> via app/projects/[project]/page.tsx)
export const projectDetails: Record<string, SitePage> = {
  "oasis-240": {
    slug: "oasis-240",
    title: "Oasis @ 240",
    description: "A reclaimed community green space at 240 S Monastery Avenue.",
    active: "projects",
    eyebrow: "COMPLETED — 240 S MONASTERY AVE",
    heroTitle: "Oasis",
    heroAccent: "@ 240.",
    heroBody:
      "Once a poorly-maintained, illegally-dumped city lot, the Oasis @ 240 is now a reclaimed community space with native flowers, a rain-catchment system, seating, and original art.",
    heroImage: "/media/oasis-opening-aerial.jpg",
    heroAlt: "Aerial view of the Oasis @ 240 grand opening ceremony",
    sections: [
      {
        type: "split",
        title: "From dumping ground to green anchor.",
        body:
          "Owned by the City of Baltimore, the lot at 240 S Monastery Avenue was adopted in 2019 by former resident Chanelle Austin and Visionaries Development Cooperative, then developed in partnership with Civic Works Baltimore, the Chesapeake Bay Trust, and CCD. The space features native flowers, a rain catchment system, seating, and original art by Jasmine Martin-Wilson and the youth of T.A.P. Inc.",
        bullets: ["Native flowers and rain catchment", "Community seating and original art", "Anchor stop on the Irvington walking tour"],
        image: "/media/oasis-ribbon.jpg",
        alt: "Partners holding the carved Oasis @ 240 sign at the ribbon cutting",
      },
      {
        type: "gallery",
        title: "Opening day at the Oasis.",
        credit: "Media by Mastermind Photography & Designs",
        images: [
          { src: "/media/oasis-arts-fence.jpg", alt: "Youth art fence by The Arts Project with painted messages" },
          { src: "/media/drone-3.jpg", alt: "Aerial of the reclaimed Oasis garden corridor" },
          { src: "/media/community-oasis.jpg", alt: "Walking tour group in the Oasis garden" },
        ],
      },
      { type: "cta", theme: "green", title: "See it on the walking tour.", body: "The Oasis is a key stop on the Irvington 5-Minute Histories walking tour.", href: "/events", label: "See events" },
    ],
  },
  "community-center": {
    slug: "community-center",
    title: "Community Center for Change",
    description: "3932-3934 Frederick Ave — the future Center for Social Impact.",
    active: "projects",
    eyebrow: "IN PROGRESS — 3932-3934 FREDERICK AVE",
    heroTitle: "Community Center",
    heroAccent: "for Change.",
    heroBody:
      "Redeveloping a 5,000 sq ft former shipping company into an innovation hub for the 21229 — with a co-op grocery, multimedia center, and retail vending stalls.",
    heroImage: "/media/mural-marketplace-1.jpg",
    heroAlt: "3932 Frederick Avenue with community marketplace mural",
    sections: [
      {
        type: "split",
        title: "An innovation hub owned by the neighborhood.",
        body:
          "The Cooperative is redeveloping 3932-3934 Frederick Ave into the Community Center for Change: a 5,000-square-foot business-incubator hub where minority-owned businesses are welcomed. The space is envisioned as a community-owned co-op grocery, multimedia center, and retail vending stalls. CCD is finalizing plans with ReGEN Consulting and the Neighborhood Design Center.",
        bullets: ["Co-op grocery store", "Multimedia center", "Retail vending stalls", "Business incubator network"],
        image: "/media/rendering-ccc.jpg",
        alt: "Concept rendering of the Community Center for Change with its tagline banner",
      },
      {
        type: "gallery",
        title: "From concept to corner landmark.",
        images: [
          { src: "/media/rendering-csi-facade.jpg", alt: "Neighborhood Design Center facade rendering of the Center for Social Impact" },
          { src: "/media/csi-mural-panels.jpg", alt: "Marketplace mural panels taking shape on the building" },
          { src: "/media/mural-marketplace-3.jpg", alt: "Mural underdrawing detail" },
        ],
      },
      { type: "cta", theme: "gold", title: "Put your name in the wall.", body: "The brick campaign funds the transformation of this building.", href: "/brick-campaign", label: "Support the brick campaign" },
    ],
  },
  "bus-stop": {
    slug: "bus-stop",
    title: "Botanical Bus Stop",
    description: "A beautified transit stop at Old Frederick Rd & S Monastery Ave.",
    active: "projects",
    eyebrow: "PLANNED — OLD FREDERICK RD & S MONASTERY AVE",
    heroTitle: "Botanical",
    heroAccent: "Bus Stop.",
    heroBody:
      "Turning a constant eyesore and dumping target into a beautified, living transit space shaped by food access, beauty, and care.",
    heroImage: "/media/cleangreen-1.jpg",
    heroAlt: "Clean and Green crew working on a streetside site in Irvington",
    sections: [
      {
        type: "split",
        title: "A better place to wait.",
        body:
          "Located at the corner of Old Frederick Rd & S Monastery Ave, this bus stop has long been an eyesore and a target for illegal dumping. Since late 2019, CCD's Clean & Green team has maintained the lot while the co-op works to secure site control and support from the MTA. Community volunteerism and donations can help bring the concept to life.",
        bullets: ["Maintained by Clean & Green since 2019", "Site control and MTA support in progress", "Shaped by food access and beauty"],
        image: "/media/cleangreen-2.jpg",
        alt: "Clean and Green crew clearing a lot",
        ctaText: "Volunteer for this",
        ctaHref: "/volunteer",
      },
    ],
  },
  "memorial-garden": {
    slug: "memorial-garden",
    title: "Little Memorial Garden",
    description: "Restoring a garden honoring Mr. Little at Old Frederick Rd & Irving St.",
    active: "projects",
    eyebrow: "IN PROGRESS — OLD FREDERICK RD & IRVING ST",
    heroTitle: "Little",
    heroAccent: "Memorial Garden.",
    heroBody:
      "In honor of Mr. Little, who tirelessly gardened this plot, CCD is restoring the garden to its former glory with raised beds, native plants, fruit trees, and an original mural.",
    heroImage: "/media/memorial-aerial.jpg",
    heroAlt: "Drone aerial of the Memorial Garden dedication with canopy, tables, and speaker",
    sections: [
      {
        type: "split",
        title: "A living memorial.",
        body:
          "At the corner of Old Frederick Rd & Irving Street, CCD is restoring Mr. Little's garden in partnership with Spring Meadow Farms. The space will feature raised beds available to families, native plants, fruit trees, crape myrtles, and an original mural honoring Mr. Little's life and legacy.",
        bullets: ["Raised beds available to families", "Native plants and fruit trees", "Original mural honoring Mr. Little"],
        image: "/media/rendering-memorial-garden.jpg",
        alt: "Watercolor concept rendering of the restored Memorial Garden",
        ctaText: "Volunteer for this",
        ctaHref: "/volunteer",
      },
    ],
  },
};

export const aliases: Record<string, string> = {
  "social-impact": "center-for-social-impact",
  "clean-green": "clean-and-green",
  "news-events": "news",
  involved: "membership",
  "what-is-a-co-op": "what-is-a-coop",
  join: "membership",
  "coop-market-page": "coop-market",
  toolbank: "tool-bank",
  // The 4th Brew — covers its old Shopify paths and the obvious guesses.
  "the-4th-brew": "4th-brew",
  "fourth-brew": "4th-brew",
  coffee: "shop",
  collections: "shop",
  "brewing-methods": "brewing",
  "coffee-brewing-methods": "brewing",
};

export const homeHeroSlides = [
  { src: "/media/drone-1.jpg", alt: "Aerial of an Irvington intersection with kids on bikes", kicker: "IRVINGTON - BALTIMORE - EST. 2020" },
  { src: "/media/drone-garden-1.jpg", alt: "Aerial of the Memorial Garden dedication ceremony", kicker: "LITTLE MEMORIAL GARDEN - 2025" },
  { src: "/media/drone-2.jpg", alt: "CCD headquarters with the logo mural and neighbors outside", kicker: "COOPERATIVE WAY - IRVINGTON" },
  { src: "/media/drone-3.jpg", alt: "Aerial of the reclaimed Oasis garden corridor", kicker: "AGRICULTURAL ACCESS - FOOD SOVEREIGNTY" },
  { src: "/media/event-coopway-2.jpg", alt: "Crowd photographing the new Cooperative Way street sign", kicker: "COOPERATIVE WAY - CELEBRATION" },
];

// --- CMS-shaped collections (map 1:1 to Wix CMS collections in Phase 2) ---

export type TeamMember = {
  name: string | null;
  role: string;
  tagline?: string;
  bio?: string;
  quote?: string;
  email?: string;
  photo?: string; // empty -> initials/silhouette avatar
  order?: number;
};

export const leadership: TeamMember[] = [
  {
    name: "Johnny Martin Jr.",
    role: "CHIEF EXECUTIVE OFFICER",
    tagline: "Founder and visionary driving CCD's cooperative model.",
    bio:
      "Johnny Martin Jr. is an Irvington native who founded Cooperative Community Development in January 2020 after years of watching investment promises fail to materialize in his neighborhood. Starting with a single reclaimed vacant lot in 2019, he built a member-governed co-op that now owns a 5,000 sq ft building on Frederick Avenue and operates programs across housing, food, green space, and enterprise.",
    quote:
      '"The community does not need saving from outside. It needs ownership from within."',
    email: "johnny@ccdgroup.org",
    photo: "",
    order: 1,
  },
  {
    name: "Robert Morina IV",
    role: "OPERATIONS COORDINATOR",
    tagline: "Coordinates operations, partners, and CCD's green spaces.",
    bio:
      "Robert keeps CCD's day-to-day moving by managing partner relationships, coordinating operations, and leading the co-op's green space work across Irvington.",
    email: "robert@ccdgroup.org",
    photo: "",
    order: 2,
  },
  {
    name: "Tracy Hill",
    role: "SPECIAL ASSISTANT",
    tagline: "Supports CCD's programs and handles reasonable accommodations.",
    bio:
      "Tracy Hill supports CCD's leadership and programs, and is the point of contact for reasonable accommodations across CCD's spaces and events.",
    email: "tracy@ccdgroup.org",
    photo: "",
    order: 3,
  },
  {
    name: "Marquita Fullard",
    role: "EVENTS MANAGER",
    tagline: "Runs the Community Market and CCD's public events.",
    bio:
      "Marquita Fullard manages CCD's events program, from the Community Co-op Market to seasonal celebrations and facilities bookings.",
    email: siteConfig.contact.facilitiesEmail,
    photo: "",
    order: 4,
  },
  {
    name: "Alex Bull",
    role: "COMMUNITY RESOURCE COORDINATOR",
    tagline: "Connects neighbors to community resources.",
    bio:
      "Alex Bull coordinates community resources at CCD, helping neighbors find the programs, services, and support they need.",
    email: siteConfig.contact.email,
    photo: "",
    order: 5,
  },
  {
    name: "Francis",
    role: "CLEAN & GREEN LEAD",
    tagline: "Leads nine outdoor services across Irvington.",
    bio:
      "Francis leads the Clean & Green crew, delivering outdoor maintenance services across Irvington and nearby communities.",
    email: siteConfig.contact.cleanGreenEmail,
    photo: "",
    order: 6,
  },
  {
    name: "Arianna",
    role: "COMMUNITY ENGAGEMENT COORDINATOR",
    tagline: "Keeps members and neighbors connected to the co-op.",
    bio:
      "Arianna manages member relationships and outreach so people know what is happening, feel welcomed into the co-op, and have clear ways to get involved.",
    email: siteConfig.contact.email,
    photo: "",
    order: 7,
  },
];

// Real service directory from ccdgroup.org — the "right door" for each need.
export type DirectoryEntry = {
  area: string;
  person: string;
  title: string;
  email: string;
};

export const serviceDirectory: DirectoryEntry[] = [
  { area: "Community Market", person: "Marquita Fullard", title: "Events Manager", email: "theREC@ccdgroup.org" },
  { area: "Reasonable Accommodations", person: "Tracy Hill", title: "Special Assistant", email: "tracy@ccdgroup.org" },
  { area: "Community Resources", person: "Alex Bull", title: "Community Resource Coordinator", email: "info@ccdgroup.org" },
  { area: "ARTS", person: "Andi Kennedy", title: "Visionary — The ARTS Project Inc", email: "contact@theartsprojectinc.org" },
  { area: "Green Space", person: "Robert Morina IV", title: "Operations Coordinator", email: "robert@ccdgroup.org" },
  { area: "Clean & Green Services", person: "Francis", title: "Clean & Green Lead", email: "francis@ccdgroup.org" },
];

// Interns: real names when provided; `name: null` renders an open-role slot.
// Space is managed by the UI (see AboutTeam): the grid caps visible rows and
// paginates with "show all", so adding many interns never crowds the page.
export const interns: TeamMember[] = [
  {
    name: "Aryan",
    role: "STRATEGY & DIGITAL",
    bio:
      "Aryan joined CCD as a Strategy & Digital intern in summer 2026, translating community context, planning docs, and real media into the new website direction.",
    email: siteConfig.contact.email,
    photo: "",
    order: 1,
  },
  { name: null, role: "PROGRAMS" },
  { name: null, role: "MARKETING & COMMS" },
  { name: null, role: "COMMUNITY OUTREACH" },
  { name: null, role: "DESIGN & MEDIA" },
  { name: null, role: "CLEAN & GREEN" },
];

export type Partner = {
  name: string;
  description: string;
  url?: string;
  category: "funder" | "design" | "community" | "program" | "member";
  logo?: string; // real logo image; card falls back to name-only when empty
};

export const partners: Partner[] = [
  { name: "Baltimore Roundtable for Economic Democracy (BRED)", description: "Supported CCD's acquisition of the Jarbo Brothers facility and the co-op's economic-democracy work.", url: "https://www.baltimoreroundtable.org", category: "funder", logo: "/media/logo-bred.png" },
  { name: "Neighborhood Design Center", description: "Helps CCD finalize site plans and engage residents on the Center for Social Impact.", url: "https://ndc-md.org/", category: "design" },
  { name: "ReGEN Consulting Group", description: "Finalizing site plans and preliminary renderings for the Frederick Avenue development.", url: "https://www.instagram.com/regenconsultinggroup/", category: "design" },
  { name: "Civic Works Baltimore", description: "Partner on the Oasis @ 240 reclaimed green space.", url: "http://civicworks.com/", category: "community", logo: "/media/logo-civic-works.png" },
  { name: "Chesapeake Bay Trust", description: "Supported native plantings and green infrastructure at the Oasis.", url: "https://cbtrust.org/", category: "funder" },
  { name: "T.A.P. Inc. (The Arts Project)", description: "Youth arts partner led by visionary Andi Kennedy — original art at the Oasis @ 240 and CCD's ARTS programming.", url: "https://www.theartsprojectinc.org/", category: "community", logo: "/media/logo-arts-project.png" },
  { name: "Baltimore Heritage", description: "Walking-tour partner whose Five Minute Histories series features Irvington's landmarks.", url: "https://baltimoreheritage.org", category: "community", logo: "/media/logo-baltimore-heritage.png" },
  { name: "Baltimore Children & Youth Fund", description: "Funder supporting CCD's youth programming.", url: "https://www.bcyfund.org/", category: "funder", logo: "/media/logo-bcyf.png" },
  { name: "Spring Meadow Farms", description: "Partner on the Little Memorial Garden restoration.", url: "https://springmeadowfarms.com/", category: "program" },
  { name: "The 4th Brew", description: "CCD's coffee brand and its entrepreneurship arm — now hosted here, on this site.", url: "/4th-brew", category: "program", logo: "/media/logo-4th-brew.png" },
  { name: "DeWalt", description: "Tools and construction-trades support for workforce development.", url: "https://www.dewalt.com/", category: "program", logo: "/media/logo-dewalt.png" },
  { name: "Catonsville Cooperative Market", description: "Partner co-op supporting CCD's community market events and shoe drive drop-offs.", url: "", category: "community" },
  { name: "City Chill", description: "Neighborhood partner and mural site on the walking tour.", url: "", category: "community" },
  { name: "BMore Fresh", description: "Neighborhood barbershop partner on the walking tour.", url: "", category: "community" },
  { name: "Maryland Nonprofits", description: "CCD is a proud member of Maryland Nonprofits.", url: "https://www.marylandnonprofits.org/", category: "member", logo: "/media/logo-maryland-nonprofits.png" },
];

// The full friends-and-supporters logo wall harvested from ccdgroup.org's
// partner strip. Rendered as logos (alt text only, no captions) so a
// misidentified name can never be displayed.
export const supporterLogos: { src: string; alt: string }[] = [
  { src: "/media/logo-mt-st-joseph.png", alt: "Mount Saint Joseph High School" },
  { src: "/media/logo-bmore-beautiful.png", alt: "BMORE Beautiful" },
  { src: "/media/logo-dtlr.png", alt: "DTLR" },
  { src: "/media/logo-spartan-defense.png", alt: "Spartan Defense Security Solutions" },
  { src: "/media/logo-morina-enterprise.png", alt: "Morina Enterprise" },
  { src: "/media/logo-royal-event-center.png", alt: "Royal Event Center" },
  { src: "/media/logo-kingdom-nation.png", alt: "Kingdom Nation" },
  { src: "/media/logo-passionately-yours.png", alt: "Passionately Yours" },
  { src: "/media/logo-new-life.png", alt: "New Life Changing Christian Center" },
  { src: "/media/logo-friends-sw-parks.png", alt: "Friends of Southwest Parks" },
  { src: "/media/logo-nature-sacred.png", alt: "Nature Sacred" },
  { src: "/media/logo-pleasant-grove.png", alt: "Pleasant Grove Baptist Church" },
  { src: "/media/logo-umd-extension.png", alt: "University of Maryland Extension" },
  { src: "/media/logo-blue-water.png", alt: "Blue Water Baltimore" },
  { src: "/media/logo-nolita.png", alt: "The Nolita Project" },
  { src: "/media/logo-schreiber-brothers.png", alt: "Schreiber Brothers" },
  { src: "/media/logo-charismatic.png", alt: "Charismatic Consulting LLC" },
  { src: "/media/logo-aha.png", alt: "Angels Helping Angels" },
  { src: "/media/logo-plantation-park.png", alt: "Plantation Park Heights Urban Farm" },
  { src: "/media/logo-st-joseph-assoc.png", alt: "St. Joseph Baltimore Neighborhood Association" },
  { src: "/media/logo-jg-property.png", alt: "J&G Property Solutions" },
  { src: "/media/logo-shubie-doo.png", alt: "Shubie Doo Demo" },
  { src: "/media/logo-kre8ing.png", alt: "Kre8ing Your Ideas" },
  { src: "/media/logo-boardroom-chess.png", alt: "The Board Room Chess" },
  { src: "/media/logo-fmk.png", alt: "For My Kidz" },
  { src: "/media/logo-word4life.png", alt: "Word 4 Life Ministries" },
  { src: "/media/logo-uame.png", alt: "UAME Church" },
  { src: "/media/logo-equalyze.png", alt: "Equalyze" },
  { src: "/media/logo-francis-group.png", alt: "Francis Group" },
];

// Partner names for the auto-scrolling wall/marquee.
export const partnerNames = partners.map((p) => p.name);

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
export const membershipTiers: MembershipTier[] = [
  {
    name: "Non-Resident",
    price: "$10/mo",
    setup: "+$5 setup",
    eligibility: "Live outside the 21229",
    benefits: ["Event discounts", "Discounted Tool Bank access", "Access to green spaces"],
    vote: false,
  },
  {
    name: "Resident",
    price: "$20/mo",
    setup: "+$5 setup",
    eligibility: "Live, work, or worship in the 21229",
    benefits: ["FREE Tool Bank access", "15% off Clean & Green", "Government advocacy", "Access to green spaces"],
    vote: true,
    featured: true,
  },
  {
    name: "Small Org / Business",
    price: "$100/mo",
    setup: "+$5 setup",
    eligibility: "Business entity, 1–25 employees, Baltimore City",
    benefits: ["Advocacy", "Access to green spaces", "Discounted Tool Bank", "15% off Clean & Green"],
    vote: true,
  },
  {
    name: "Medium Org / Business",
    price: "$250/mo",
    setup: "+$5 setup",
    eligibility: "Business entity, 26–100 employees, Baltimore City",
    benefits: ["Advocacy", "Access to green spaces", "Discounted Tool Bank", "15% off Clean & Green"],
    vote: true,
  },
  {
    name: "Large Org / Business",
    price: "$400/mo",
    setup: "+$5 setup",
    eligibility: "Business entity, 101+ employees, Baltimore City",
    benefits: ["Advocacy", "Access to green spaces", "Discounted Tool Bank", "15% off Clean & Green"],
    vote: true,
  },
];

export const cleanGreenServices = [
  "Basic Cut and Trim",
  "Hedging",
  "Flower Beds",
  "Tree Pruning",
  "Gutter Cleaning",
  "Hard Scaping",
  "Trash Removal",
  "Snow Removal",
  "Shed/Basement Clean Out",
];

export type Testimonial = { quote: string; name: string; role?: string; photo?: string };

// No fabricated quotes. Add real member/resident stories here (or via the Wix
// CMS in Phase 2) and the testimonials section fills in automatically.
export const testimonials: Testimonial[] = [];

export const events = [
  {
    id: "ev1",
    date: "Jul 18",
    day: "SATURDAY",
    title: "Community Co-op Market",
    thumb: "/media/market-vendors-table.jpg",
    tag: "FREE - ALL AGES",
    tagColor: "#209765",
    blurb: "Local produce, neighborhood makers, and live music on the block.",
    time: "9:00 AM - 2:00 PM",
    location: "4004 Frederick Ave, Baltimore, MD 21229",
    cost: "Free to attend - no ticket needed",
    body:
      "Local produce, neighborhood makers, and live music on the block. CCD's table will have Tool Bank sign-ups and membership info on site.",
    instructions: [
      "Just show up - no registration needed to shop or browse.",
      "Bring a reusable bag for produce and goods.",
      "Vendors: register ahead through the vendor registration form (link on the Co-op Market page).",
      "Street parking on Frederick Ave; the market area is stroller and wheelchair accessible.",
    ],
    contactEmail: siteConfig.contact.facilitiesEmail,
    contactLabel: "Questions? Email Marquita",
    photos: ["/media/event-coopway-1.jpg", "/media/event-coopway-2.jpg", "/media/event-coopway-3.jpg"],
  },
  {
    id: "ev2",
    date: "Aug 1",
    day: "SATURDAY",
    title: "Irvington Walking Tour - 5-Minute Histories",
    thumb: "/media/community-oasis.jpg",
    tag: "FREE",
    tagColor: "#209765",
    blurb: "A guided walk through murals, gardens, and local landmarks.",
    time: "10:00 AM",
    location: "Meet at Oasis @ 240, 240 S Monastery Ave",
    cost: "Free - donations welcome",
    body:
      "An hour-long guided walk through murals, gardens, and local landmarks with the stories behind them, led by neighbors who lived it.",
    instructions: [
      "Meet at the Oasis @ 240 garden ten minutes before start.",
      "Wear comfortable walking shoes; the route is about one mile at an easy pace.",
      "Water and sunscreen recommended in summer.",
      "Groups of 6+ should email ahead so we can add a guide.",
    ],
    contactEmail: siteConfig.contact.email,
    contactLabel: "Questions? Email CCD",
    photos: ["/media/community-citychill.jpg", "/media/community-together-2.jpg", "/media/community-smile.jpg", "/media/community-barbershop.jpg"],
  },
  {
    id: "ev3",
    date: "Jul 24",
    day: "FRIDAY",
    title: "Shoe Drive - final collection week",
    thumb: "/media/shoedrive-shoes.png",
    tag: "DROP-OFF",
    tagColor: "#0797D4",
    blurb: "The summer drive wraps July 24 - last chance to donate gently-worn shoes.",
    time: "Tuesdays 12:00-3:00 PM (CCD) and 4:30-8:00 PM (Catonsville), through July 24",
    location: "4003 Frederick Ave, Baltimore 21229 · Catonsville Cooperative Market, 1905 Edmondson Ave, 21228",
    cost: "Free - every donated pair funds CCD programs",
    body:
      "Every pair funds CCD's Center for Social Impact and keeps usable shoes out of landfills. Gently worn, used, and new shoes all help.",
    instructions: [
      "Shoes should be wearable: pairs bound together (laces tied or rubber-banded), no single shoes.",
      "All types help: sneakers, boots, sandals, dress shoes, kids' sizes.",
      "Drop into the marked collection boxes at either location during the hours above.",
      "Want a collection box at your business or church? Email us and we'll set one up.",
    ],
    contactEmail: siteConfig.contact.email,
    contactLabel: "Host a box or ask a question",
    photos: ["/media/shoedrive-boxes.jpg", "/media/shoedrive-flyer.png"],
  },
];

export const news = [
  {
    id: "n0a",
    meta: "PRESS",
    title: "Making headlines: CCD's Community Marketplace",
    thumb: "/media/mural-marketplace-1.jpg",
    excerpt: "CCD's Community Marketplace and the transformation of Frederick Avenue draw press attention.",
    body:
      "CCD's Community Marketplace project and the broader transformation of the 21229 corridor have been featured in local coverage of Baltimore's cooperative movement.",
    photos: ["/media/mural-marketplace-1.jpg", "/media/mural-marketplace-3.jpg"],
  },
  {
    id: "n0b",
    meta: "PRESS - BALTIMORE HERITAGE",
    title: "Five Minute Histories features Irvington",
    thumb: "/media/irvington-sign.jpg",
    excerpt: "Baltimore Heritage's Five Minute Histories series walks the Irvington story.",
    body:
      "Baltimore Heritage's Five Minute Histories series highlighted Irvington's landmarks and CCD's walking tour, connecting the neighborhood's past to its cooperative future. Watch at baltimoreheritage.org.",
    photos: ["/media/irvington-sign.jpg", "/media/community-smile.jpg", "/media/community-barbershop.jpg"],
  },
  {
    id: "n0c",
    meta: "MAY 2026 - MARKET",
    title: "Seed & Plant Swap brings the market back",
    thumb: "/media/market-beds-flag.jpg",
    excerpt: "The Community Market returned May 17 with a Seed & Plant Swap hosted by Catonsville Cooperative Market.",
    body:
      "The market's return celebrated community green-space pioneers with a Seed & Plant Swap hosted by Catonsville Cooperative Market, a Fish Fry fundraiser, local flower and plant vendors, and expert talks on composting, permaculture, and pollinators.",
    photos: ["/media/market-beds-flag.jpg", "/media/market-compost.jpg"],
  },
  {
    id: "n1",
    meta: "JUN 2026 - CAMPAIGN",
    title: "Summer Shoe Drive: give your old pairs a second life",
    thumb: "/media/shoedrive-shoes.png",
    excerpt: "Gently-worn shoes fund the Center for Social Impact and stay out of landfills.",
    body:
      "Drop-off boxes are live through July 24. Every pair collected funds the Center for Social Impact and keeps usable shoes out of landfills.",
    instructions: [
      "Tuesdays 12:00-3:00 PM: CCD, 4003 Frederick Ave, Baltimore 21229.",
      "Tuesdays 4:30-8:00 PM: Catonsville Cooperative Market, 1905 Edmondson Ave, 21228.",
      "Tie or band pairs together; all styles and sizes accepted.",
      "Businesses and churches can host a collection box - email us to arrange it.",
    ],
    contactEmail: siteConfig.contact.email,
    contactLabel: "Ask about the shoe drive",
    photos: ["/media/shoedrive-boxes.jpg", "/media/shoedrive-flyer.png"],
  },
  {
    id: "n2",
    meta: "MAY 2026 - PROJECTS",
    title: "Memorial Garden community day draws the whole block",
    thumb: "/media/drone-garden-1.jpg",
    excerpt: "Neighbors gathered for planting, remembrance, and food.",
    body:
      "Neighbors gathered for a full day of planting, remembrance, and shared food at the Little Memorial Garden.",
    photos: ["/media/drone-garden-1.jpg", "/media/drone-garden-2.jpg", "/media/drone-garden-3.jpg"],
  },
  {
    id: "n3",
    meta: "NOV 2024 - COMMUNITY",
    title: "Cooperative Way - Irvington celebrates its new street name",
    thumb: "/media/event-coopway-1.jpg",
    excerpt: "Balloons, neighbors, and a new sign mark the block's cooperative future.",
    body:
      "The block officially bears the name of its cooperative future after a celebration with residents, partners, and city officials.",
    photos: ["/media/event-coopway-1.jpg", "/media/event-coopway-2.jpg", "/media/event-coopway-3.jpg"],
  },
  {
    id: "n4",
    meta: "2025 - MURALS",
    title: "Together We Can Do Great Things mural unveiled at City Chill",
    thumb: "/media/community-together-5.jpg",
    excerpt: "Artist Latosha Maddox's mural anchors a new stop on the walking tour.",
    body:
      "The mural transformed a once-blank wall at City Chill into a rallying message for the neighborhood.",
    photos: ["/media/community-together-2.jpg", "/media/community-together-5.jpg", "/media/community-citychill.jpg"],
  },
  {
    id: "n5",
    meta: "2025 - MURALS",
    title: "Community Marketplace mural takes shape on Frederick Ave",
    thumb: "/media/mural-marketplace-3.jpg",
    excerpt: "Artist Parris Ashley's design previews the marketplace coming to the Center.",
    body:
      "The mural wraps the building in a preview of the marketplace planned inside the Center for Social Impact.",
    photos: ["/media/mural-marketplace-1.jpg", "/media/mural-marketplace-3.jpg"],
  },
  {
    id: "n6",
    meta: "2025 - CLEAN & GREEN",
    title: "Clean & Green crews take on summer season bookings",
    thumb: "/media/cleangreen-crew.jpg",
    excerpt: "Nine services, one crew from the neighborhood - booking now.",
    body:
      "Clean & Green is booking for the season across Irvington and surrounding communities.",
    instructions: [
      "Request a free estimate with the form on the Clean & Green page - name, phone, address, and the service you need.",
      "The crew follows up within two business days to schedule a walkthrough.",
      "CCD resident members automatically get 15% off every service.",
    ],
    contactEmail: siteConfig.contact.cleanGreenEmail,
    contactLabel: "Email Francis directly",
    photos: ["/media/cleangreen-1.jpg", "/media/cleangreen-sidewalk.jpg", "/media/cleangreen-garden-wide.jpg", "/media/cleangreen-2.jpg"],
  },
];

// Project pins on the real Irvington basemap (/media/map-irvington.jpg,
// stitched from OpenStreetMap tiles). Percentages computed from geocoded
// lat/lon; bus stop + memorial corners are approximate street positions.
export const projectPins = [
  { name: "Oasis @ 240", status: "Completed", href: "/projects/oasis-240", x: 56.6, y: 51.8 },
  { name: "Center for Social Impact", status: "In Progress", href: "/projects/community-center", x: 52.2, y: 68.4 },
  { name: "Botanical Bus Stop", status: "Planned", href: "/projects/bus-stop", x: 62, y: 30 },
  { name: "Little Memorial Garden", status: "In Progress", href: "/projects/memorial-garden", x: 43.4, y: 43.4 },
  { name: "CCD Headquarters", status: "4004 Frederick Ave", href: "/contact", x: 47.1, y: 70.7 },
];
