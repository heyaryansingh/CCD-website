# 03 — Page-by-Page Build Guide (sections, media, animations)

**Reference while building:** run the Next.js site (`cd ccd-website && npm run dev` → localhost:3000) side-by-side and match it. This doc maps each section to Wix Studio patterns; copy lives in `lib/siteData.ts` — paste from there, don't retype.

## Section-type → Wix Studio recipe (build each once, save to Library, reuse)

| Type | Studio recipe | Animation |
|---|---|---|
| **Hero (standard)** | Full-width section, background image + dark gradient overlay, left-aligned Ovo H1 with gold script accent word, body, gold CTA | Background: subtle **Ken Burns zoom** (Studio scroll effect: Zoom, slow). Text: Fade-up on load, 0.7s stagger |
| **Home hero slideshow** | Wix Slideshow (5 slides, 5.8s auto), same overlay/type treatment, slide kickers | Crossfade transition; dots + counter |
| **Stats band** | 4-col repeater, huge Ovo numbers | **Number counter** (Studio "Counter" animation on scroll into view) + staggered fade-up |
| **Cards grid** | Repeater 3-col (2/1 responsive), image top, meta tag, title, body | Scroll-in fade-up with 90ms stagger; hover: lift -6px + shadow + image scale 1.06 |
| **Split section** | 2-col grid (reversible), themed background (white/green-deep/dark) | Copy slides in from its side, media from the other (Studio scroll: Slide) |
| **Timeline** | Horizontal repeater with year markers | Sequential fade-in on scroll |
| **H.E.A.R.T. band** | 5-row list, giant gold letter + title + body | Letters pop in staggered |
| **Gallery** | 4-col media grid | Fade-in stagger; hover zoom |
| **CTA band** | Full-width themed band (gold/green/dark), H2 + body + button | Fade-up |
| **Steps (01/02/03)** | 3-col repeater, big gold step numbers | Staggered fade-up |
| **Membership tiers** | 5-col repeater (2/1 responsive), featured card raised with gold border + "Most popular" flag | Staggered fade-up; featured card pre-raised |
| **Impact map** | Deep-green section; container with grid-lines background + 4 positioned pin elements linking to project pages | Pins: pulse animation (Studio loop); labels appear on hover |
| **Partner wall** | Auto-scrolling **Marquee** strip (Studio marquee element) + card grid below with category tags | Marquee loops; cards stagger in; pause on hover |
| **Before/After** | Wix "Before & After" slider app (App Market) — install only when BeforeAfterPairs has rows | Drag handle |
| **Testimonials** | Repeater bound to Testimonials (isApproved); when empty show the "Share your story" CTA band instead | Fade-in |
| **FAQ** | Wix Accordion element, 5 Q&As from `MembershipFaq` | Expand/collapse |
| **Forms/panels** | See 04 | — |

**Global animation rules (match the Next.js build):** everything animates once on first scroll-into-view, 0.7s ease-out, translate-up 22px; respect "reduce motion" (Studio setting); no looping animations except marquee + map-pin pulse.

## Page stacks (sections top→bottom; media by filename from site-media)

**HOME /** — Slideshow hero (drone-1, drone-garden-1, drone-2, drone-3, event-coopway-2) → Stats (2020 · 5,000 · 9 · 4) → Programs cards ×6 (event-coopway-2, mural-marketplace-1, cleangreen-2, cleangreen-sidewalk, cleangreen-crew, drone-3) → H.E.A.R.T. → Dark split "beacon" (mural-marketplace-1) → Impact map → Gallery ×4 (drone-garden-1, community-together-2, drone-2, cleangreen-1) → Testimonials(empty-state CTA) → Partner wall → News cards ×3 (shoedrive-flyer, drone-garden-1, event-coopway-1)

**ABOUT /about** — Hero (community-citychill) → Split "Since 2020" (community-oasis) → Timeline ×5 → H.E.A.R.T. → Co-op cards ×3 → Team section (bound to Team+Interns CMS)

**WHAT IS A CO-OP /what-is-a-coop** — Hero (community-together-2) → Steps ×3 (green) → Principles cards ×6 → Gold CTA → membership

**TEAM /team** — Hero (memorial-garden) → Team grid (CMS) + Interns strip (CMS, capped 6 + expand) → Partner wall

**PARTNERS /partners** — Hero (drone-1) → Partner wall (CMS) → Green CTA "Become a partner" (mailto)

**PROGRAMS /programs** — Hero (cleangreen-garden-hero) → Split market (event-coopway-2 → /coop-market) → Split green Tool Bank (→ /tool-bank) → Split workforce (cleangreen-crew → /partners)

**CO-OP MARKET /coop-market** — Hero (event-coopway-2) → Split (event-coopway-1) → Cards ×3 (shop / vendor-registration link / contact Marquita) → Gallery (event-coopway-1/2/3)

**TOOL BANK /tool-bank** — Hero (cleangreen-sidewalk) → Steps ×3 → Split (cleangreen-2, mailto CTA) → Gold CTA → membership

**CENTER FOR SOCIAL IMPACT /center-for-social-impact** — Hero (mural-marketplace-1) → Split (mural-marketplace-3) → Green stats (5,000 · 4 · 2023) → Gold CTA → brick

**CLEAN & GREEN /clean-and-green** — Hero (cleangreen-garden-wide) → Services cards ×9 (real list) → [Before/After — only when CMS has rows] → Gallery ×4 (cleangreen-1, cleangreen-sidewalk, cleangreen-crew, cleangreen-2) → Estimate form (04)

**PROJECTS /projects** — Hero (drone-3) → Project cards (CMS, status badges) → Impact map → Dark split walking tour (irvington-tour map graphic) → Gallery ×3 → **Dynamic detail pages** from Projects CMS (hero + split + CTA per row)

**MEMBERSHIP /membership** — Hero (community-together-5) → Tiers (CMS ×5) → FAQ accordion

**BRICK CAMPAIGN /brick-campaign** — Hero (drone-2) → Split (mural-marketplace-3) → Gold CTA → fundraisingbrick link → Green CTA → PayPal link

**NEWS /news** — Hero (event-coopway-1) → Upcoming events list (CMS) + News grid (CMS) with detail lightboxes

**EVENTS /events** — Hero (event-coopway-3) → same events/news bound view

**DONATE /donate** — Hero (drone-garden-1) → Split (drone-3, PayPal CTA) → Donate amounts panel + Volunteer form (04)

**VOLUNTEER /volunteer** — Hero (community-barbershop) → Cards ×3 (where volunteers help) → Volunteer form (04)

**CONTACT /contact** — Hero (drone-2) → Contact cards ×4 (emails/phone) → Google Maps embed (4004 Frederick Ave) + contact form (04)
