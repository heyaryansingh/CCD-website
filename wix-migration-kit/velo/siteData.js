// CCD siteData for Wix (generated from ccd-website/lib/siteData.ts — do not hand-edit copy here first; edit the source and regenerate)
export const siteConfig = {
  org: { name: "Cooperative Community Development", shortName: "CCD", legalName: "Cooperative Community Development Inc.", tagline: "A Baltimore cooperative building food access, green space, local services, and community-owned infrastructure in Irvington.", founded: 2020 },
  contact: { email: "info@ccdgroup.org", cleanGreenEmail: "francis@ccdgroup.org", facilitiesEmail: "theREC@ccdgroup.org", phone: "(410) 205-2488", phoneHref: "tel:+14102052488", addressLine1: "4004 Frederick Ave", addressLine2: "Baltimore, MD 21229", mapQuery: "4004 Frederick Ave, Baltimore, MD 21229" },
  social: { facebook: "https://www.facebook.com/CoopCommunity", instagram: "https://www.instagram.com/ccd_group/", linkedin: "", youtube: "" },
  links: { paypalDonate: "https://www.paypal.com/donate/?hosted_button_id=D4UMVJ4YRXDQE", brickCampaign: "https://www.fundraisingbrick.com/online-orders/ccd/", facilitiesBooking: "https://forms.cloud.microsoft/r/Z7RnPBQuim", cleanGreenEstimate: "https://forms.cloud.microsoft/r/Zc3eJk1sZj", vendorRegistration: "https://forms.gle/mfhVo1yEZbZwre5r8", membershipSignup: "", privacyPolicy: "" }
};
export function firstLink(...c){ for (const x of c){ if (x && x.trim() && !x.trim().toUpperCase().startsWith("TODO")) return x.trim(); } return ""; }
export function mailtoFallback(subject, to = siteConfig.contact.email){ return "mailto:"+to+"?subject="+encodeURIComponent(subject); }
export function actionLink(url, fallbackSubject, to){ return firstLink(url) || mailtoFallback(fallbackSubject, to); }
export const beforeAfterPairs = [
  { before: "/media/ba1-before.jpg", after: "/media/ba1-after.jpg", label: "Full yard & exterior transformation" },
  { before: "/media/ba2-before.jpg", after: "/media/ba2-after.jpg", label: "Foundation beds & fresh planting" },
];

export const pages = {
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
  href: "/coop-market",
  },
  {
  title: "Center for Social Impact",
  body: "A former storage building becoming a grocery, media center, and maker marketplace.",
  href: "/center-for-social-impact",
  },
  {
  title: "Clean & Green",
  body: "Nine outdoor services that keep the neighborhood clean while funding CCD programs.",
  href: "/clean-and-green",
  },
  {
  title: "Tool Bank",
  body: "Resident members get free access to shared tools for home and block projects.",
  href: "/tool-bank",
  },
  {
  title: "Workforce Development",
  body: "Training and paid pathways connected to real neighborhood work.",
  href: "/programs#workforce",
  },
  {
  title: "Projects in the 21229",
  body: "Gardens, murals, walking tours, and reclaimed spaces across Irvington.",
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
  href: "/news",
  },
  {
  meta: "MAY 2026",
  title: "Memorial Garden community day",
  body: "Neighbors gathered for planting, remembrance, and food.",
  href: "/news",
  },
  {
  meta: "NOV 2024",
  title: "Cooperative Way celebration",
  body: "A new street sign marks the block's cooperative future.",
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
  "CCD connects training to actual neighborhood work: landscaping, facilities, events, media, market operations, and cooperative business skills. Partners like The 4th Brew and DeWalt help connect residents to skills and opportunity.",
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
  meta: "COMPLETED",
  href: "/projects/oasis-240",
  },
  {
  title: "Community Center for Change",
  body: "The 3932 Frederick Avenue building becoming the Center for Social Impact.",
  meta: "IN PROGRESS",
  href: "/projects/community-center",
  },
  {
  title: "Botanical Bus Stop",
  body: "A future transit stop shaped by food access, beauty, and care.",
  meta: "PLANNED",
  href: "/projects/bus-stop",
  },
  {
  title: "Little Memorial Garden",
  body: "A space for remembrance, planting, food, and neighborhood gathering.",
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
};

// Project detail pages (rendered at /projects/<slug> via app/projects/[project]/page.tsx)
