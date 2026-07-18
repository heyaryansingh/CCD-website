# CCD Baltimore — New Website Design Plan
**Prepared by:** Aryan (CCD Intern)  
**Date:** June 19, 2026  
**Purpose:** Comprehensive redesign blueprint for Cooperative Community Development Inc's website  
**Reference Sites:** ReBuild Metro (rebuildmetro.com), Awwwards nonprofit winners, Godly.website, Framer community templates

---

## EXECUTIVE SUMMARY

The current CCD website (ccdgroup.org) is a Wix template from approximately 2019-2020 that has never been systematically redesigned. It suffers from poor visual hierarchy, incomplete content, dead pages, no brand cohesion, and a user experience that fails to serve any of CCD's key audiences: residents seeking resources, potential members, donors, volunteers, or service seekers (Clean & Green).

The new CCD website should feel like **ReBuild Metro meets a modern community co-op** — grounded in the real Irvington/21229 community, warm and approachable, visually bold but not corporate, with clear pathways for every user type and a robust content foundation that tells CCD's story and demonstrates real impact.

**Recommended Platform:** Framer or Webflow (replaces Wix)
- Framer: Best for a designer-first build with animations; no developer needed
- Webflow: Best for long-term content management by non-technical staff (CMS)
- Alternative: WordPress with a custom Genesis/Elementor theme (mirrors ReBuild Metro's stack)

---

## BRAND DIRECTION

### Color Palette
CCD's existing gold/yellow is a genuine asset — it appears in the logo and is distinctive. The new site should expand from this into a full, intentional brand system.

```
PRIMARY:    Deep Forest Green  #2D5016  (community, growth, agriculture)
ACCENT:     CCD Gold           #C9A227  (existing brand color, CTAs, highlights)
WARM:       Terracotta/Clay    #C4632A  (warmth, humanity, Irvington brick)
LIGHT:      Cream/Off-White    #FAF7F2  (background, warmth vs. harsh white)
DARK:       Near-Black         #1A1A1A  (text, headers)
SURFACE:    Warm Gray          #F0EBE3  (section backgrounds)
```

*Rationale: Green ties to agricultural/sustainability mission and differentiates from ReBuild Metro's purple. Gold ties to existing brand. Terracotta echoes Baltimore rowhouse brick — real, local, warm.*

### Typography
```
DISPLAY:    "Fraunces" or "Playfair Display" — Serif for hero/impact statements
            (emotional, trustworthy, community-rooted)
BODY:       "DM Sans" or "Plus Jakarta Sans" — Clean sans-serif
            (readable, modern, accessible)
LABEL/NAV:  "DM Mono" — Monospace for small labels, stats, section tags
            (distinctive, slightly technical/purposeful feel)
```

### Visual Motifs
- **Hexagon grid** (cooperative = network of nodes) — used as photo masks and decorative elements, echoing the CCD logo's circular community symbol
- **Diagonal crop lines** on photo/text splits (borrowed from ReBuild Metro's geometric language)
- **Green leaf/plant micro-illustrations** — subtle, hand-drawn style (ties to agricultural mission)
- **Bold, full-width real photography** — aerial Irvington photos, community events, garden spaces

---

## FULL SITE ARCHITECTURE

```
HOME (/)
│
├── ABOUT (dropdown)
│   ├── Our Story (/about)
│   ├── Our Team (/team)
│   ├── Partners & Funders (/partners)
│   └── What is a Co-op? (/what-is-a-coop)
│
├── PROGRAMS (dropdown)
│   ├── Community Co-op Market (/coop-market)
│   ├── Center for Social Impact (/center-for-social-impact)
│   ├── Clean & Green Team (/clean-and-green)
│   ├── Tool Bank (/tool-bank)
│   └── Programs & Workforce Development (/programs)
│
├── GET INVOLVED (dropdown)
│   ├── Become a Member (/membership)
│   ├── Volunteer (/volunteer)
│   ├── Donate (/donate)
│   └── Events (/events)
│
├── PROJECTS (/projects)
│   ├── Oasis @ 240 (/projects/oasis-240)
│   ├── Community Center for Change (/projects/community-center)
│   ├── Botanical Bus Stop (/projects/bus-stop)
│   └── Little Memorial Garden (/projects/memorial-garden)
│
├── BRICK CAMPAIGN (/brick-campaign)  [standalone CTA in nav]
│
├── NEWS (/news)
│
└── CONTACT (/contact)

UTILITY (top bar or header button):
- Facilities Booking Request → Microsoft Forms link
- Resident Portal (future)
- Language selector
```

---

## PAGE-BY-PAGE SPECIFICATIONS

---

### PAGE 1: HOME (/)

**Goal:** Make an immediate emotional impression, communicate the CCD mission in 3 seconds, and route users to their most relevant pathway.

---

#### [SECTION 1] Hero — Full-bleed aerial photo
**Layout:** Full-viewport (100vh) aerial photograph of Frederick Ave / S Loudon Ave / Irvington neighborhood. Taken from a drone or from the roof of the Jarbo Brothers building. Crisp and clear (NOT blurred).

**Overlay:** Minimal. Bottom-left has a short headline. No full dark overlay — let the photo breathe.

**Headline:**
```
Building the Block.
Brick by Brick.
```
*Or alternative:*
```
Irvington's
Co-operative Future
Starts Here.
```

**Subhead (small, below headline):**  
> Cooperative Community Development is a Baltimore-based nonprofit building economic strength, agricultural access, and self-sustainability for the 21229 community.

**CTA Buttons (two, side by side):**
- [BECOME A MEMBER]  — gold filled
- [EXPLORE OUR WORK] — outlined

**Bottom strip (below photo):** Three icon+text quick-access cards:
| 🌿 Clean & Green | 🧰 Tool Bank | 🏪 Co-op Market |
| Schedule a service | Borrow tools | Shop & sell local |

---

#### [SECTION 2] Mission statement — Brand moment
**Layout:** Full-width section with deep green background (#2D5016). Large, centered display type.

**Text:**
```
To restore
H.E.A.R.T.
to the community.
```
Below in smaller body text:
> **H**omeownership & Affordable Housing · **E**conomic Independence · **A**gricultural Access · **R**etail Revitalization · **T**ranquil Community Spaces

**Visual element:** Large gold hexagon mesh pattern in background (low opacity)

---

#### [SECTION 3] Impact Numbers (animated on scroll)
**Layout:** Four stat cards in a row on cream background. Numbers animate up from 0 on scroll.

| Stat | Description |
|------|-------------|
| **2020** | Year CCD was founded |
| **4** | Active community projects |
| **5** | Membership tiers open to all |
| **9** | Services offered by Clean & Green |

*(Update these with real tracked numbers as they develop — members count, lots transformed, youth served, etc.)*

---

#### [SECTION 4] Programs Overview — "What We Do"
**Layout:** Horizontally scrollable card row (like ReBuild Metro's carousel), or 2×3 card grid.

Each card: photo (real) + program name + one-line description + [Learn More] link.

| Card | Photo | Description |
|------|-------|-------------|
| Co-op Market | Market event photo | Community-owned cooperative grocery & vendor market |
| Center for Social Impact | Building facade | Our future innovation hub at 3932 Frederick Ave |
| Clean & Green Team | Landscaping before/after | Residential & commercial outdoor maintenance services |
| Tool Bank | Tools image | Borrow tools so you don't have to buy them |
| Workforce Development | Training/workshop photo | Connecting residents to skills, partners & opportunity |
| Farming Pilot Program | Garden/lots photo | Community-managed agriculture on vacant city-owned lots |

---

#### [SECTION 5] Feature Story — Split-screen
**Layout:** 50/50 split. Left = photo of Oasis @ 240 or the Center for Social Impact building. Right = text.

**Headline:** *What was once abandoned can become a beacon.*

**Body:**
> In 2023, CCD acquired the former Jarbo Brothers Storage facility at 3932 Frederick Ave to begin building the Center for Social Impact — a community-owned innovation hub for the 21229 zip code. One brick at a time, we're turning decades of disinvestment into a future our community built.

**CTA:** [SEE THE BRICK CAMPAIGN →]

---

#### [SECTION 6] Testimonials
**Layout:** Quote carousel with resident/community member photos.

**3–4 testimonials from:**
- CCD member or resident (about the co-op market / community)
- A community partner (about working with CCD)
- A Clean & Green customer (about the service)
- A young person served by CCD programs

*(Actual quotes to be collected — this section is a content priority)*

---

#### [SECTION 7] Projects Map
**Layout:** Embedded Google Map (custom styled in dark green) with 4 pins for CCD projects in Irvington. Clicking each pin reveals a mini-card with project name + photo + link.

**Header:** *Our Work in the 21229*

---

#### [SECTION 8] Get Involved — Three pathways
**Layout:** Three large, equal-height panels in a row. Each has a background photo + overlay + button.

| Panel 1 | Panel 2 | Panel 3 |
|---------|---------|---------|
| Photo: community members | Photo: brick building | Photo: landscaping team |
| **Become a Member** | **Support the Brick Campaign** | **Book Clean & Green** |
| From $10/month | Donate a named brick | Free estimate |
| [JOIN NOW] | [DONATE A BRICK] | [BOOK NOW] |

---

#### [SECTION 9] Latest News
**Layout:** Three news cards in a row (most recent). Each: headline, date, one-line excerpt, [READ →] link.

**Header:** *What's Happening at CCD*

---

#### [SECTION 10] Partners Strip
**Layout:** Horizontal logo bar (auto-scrolling or static grid) of CCD's partner organizations.

Partners to include: MANO, BRED (Baltimore Roundtable for Economic Democracy), Civic Works Baltimore, Chesapeake Bay Trust, T.A.P. Inc., Spring Meadow Farms, Neighborhood Design Center, ReGEN Consulting Group, The 4th Brew, DeWalt

---

#### [SECTION 11] Newsletter + Social Footer
**Pre-footer CTA:**
> Stay connected. Subscribe to CCD updates.  
> [Email input] [SUBSCRIBE]

**Footer structure:**
```
[CCD Logo + Tagline]   [QUICK LINKS]      [PROGRAMS]      [CONTACT]
                        Home               Co-op Market    4004 Frederick Ave
                        About              Clean & Green   Baltimore, MD 21229
                        Events             Tool Bank       (410) 205-2488
                        Projects           Membership      info@ccdgroup.org
                        News               Brick Campaign  [Facebook] [Instagram]

Copyright © 2026 Cooperative Community Development Inc | Privacy Policy
```

---

### PAGE 2: ABOUT — OUR STORY (/about)

**Goal:** Tell CCD's story with emotion and clarity. Establish who the team is. Build trust.

**Sections:**
1. **Hero:** Full-width photo of the team or community event. Text: *"We are Irvington."*
2. **Our Story:** Full narrative, founder background, January 2020 founding context, Chanelle Austin, how CCD grew
3. **H.E.A.R.T.:** Visual infographic (5 hexagons in a honeycomb pattern, each representing one letter)
4. **C.L.E.A.R.:** Similar visual treatment for objectives
5. **Timeline:** Horizontal scroll timeline: 2019 (Oasis @ 240) → 2020 (CCD founded) → 2023 (Jarbo Brothers acquisition) → 2024 (Neighborhood Design Center partnership) → Future (Center for Social Impact opens)
6. **Our Team:** Staff/leadership bios with headshots and titles *(content to be supplied)*
7. **Partners & Funders:** Partner logos with descriptions

---

### PAGE 3: WHAT IS A CO-OP? (/what-is-a-coop)

**Goal:** Educate visitors unfamiliar with cooperatives; make joining feel accessible and meaningful.

**Sections:**
1. **Hero:** Bold typographic hero — just the words *"A co-op is yours."* on a green background
2. **Definition:** International Cooperative Alliance definition + CCD's interpretation
3. **How Co-ops Work:** Simple animated infographic: Members → Governance → Shared Benefits
4. **The 7 Cooperative Principles** (ICA): Democratic member control, member economic participation, etc.
5. **Why CCD is a Co-op:** Specific to CCD's structure and Baltimore context
6. **CTA:** [BECOME A MEMBER]

---

### PAGE 4: TEAM (/team)

**Goal:** Put faces to the organization. Build trust and accountability.

**Layout:** 
- Section intro paragraph
- Grid of team member cards (photo, name, title, short bio, LinkedIn if applicable)
- CTA to contact or join

*Content to be provided by CCD leadership.*

---

### PAGE 5: PARTNERS & FUNDERS (/partners)

**Goal:** Show institutional credibility and acknowledge support.

**Sections:**
1. Intro paragraph about CCD's approach to community partnerships
2. Grid of partner logos with names and brief descriptions
3. Media/press logos if CCD has been featured (Baltimore Sun, etc.)
4. "Become a Partner" CTA

---

### PAGE 6: COMMUNITY CO-OP MARKET (/coop-market)

**Goal:** Explain the Co-op Market, drive vendor registration and event attendance.

**Sections:**
1. **Hero:** Market event photo — vibrant, busy, community energy
2. **What is the Co-op Market?** — Annual/regular market event, community-owned grocery concept
3. **Upcoming Market Dates** — Events calendar integration
4. **Vendor Registration** → [REGISTER AS VENDOR] (link to Google Form)
5. **Photo Gallery** — Previous market events
6. **About Catonsville Co-op Market** — Partner mention
7. **Contact for market:** theREC@ccdgroup.org, Marquita

---

### PAGE 7: CENTER FOR SOCIAL IMPACT (/center-for-social-impact)

**Goal:** This is CCD's signature project. It needs a dedicated, beautifully designed page that conveys vision and urgency.

**Sections:**
1. **Hero:** Architectural rendering of the facade + the real current building photo (before/after slider)
2. **The Vision:** Full text about the 3932-3934 Frederick Ave development — 5,000 sq ft, innovation hub, grocery store, multimedia center, retail stalls
3. **The History:** Jarbo Brothers Storage → CCD's acquisition → BRED partnership → 2023 onwards
4. **Key Partners:** BRED, ReGEN Consulting, Neighborhood Design Center (with logos)
5. **Timeline:** Construction/development milestones and target dates
6. **Brick Campaign CTA:** [BUY A BRICK AND JOIN THE MOVEMENT →]
7. **Photo/Renderings Gallery**
8. **Contact / Volunteer / Donate for this project**

---

### PAGE 8: BRICK CAMPAIGN (/brick-campaign)

**Goal:** Drive donations through an emotional, story-driven fundraising page.

**Design Inspiration:** The current page has the right content but wrong execution. Look at charity: water, Pencils of Promise, and similar organizations' donation campaign pages.

**Sections:**
1. **Hero (Video):** Embed a short 60-second video about the Jarbo Brothers building and CCD's vision. *If no video exists, commission one — this is the #1 content priority.* Use the description from the meta tag: *"What was once abandoned can become a beacon."*
2. **The Story:** Detailed narrative about acquisition and transformation vision
3. **Your Brick = Your Legacy:** Explain the fundraisingbrick.com integration. Photos of what named bricks will look like.
4. **Impact of Your Gift:**
   - $50 = 1 named brick
   - $250 = Cornerstone recognition
   - $1,000 = Wall of Impact plaque
   - (tiers to be defined)
5. **Brick Campaign Progress Bar:** Visual fundraising thermometer
6. **Buy a Brick CTA:** [BUY YOUR BRICK NOW →] → fundraisingbrick.com/online-orders/ccd/
7. **General Donate CTA:** [MAKE A DONATION →] → PayPal

---

### PAGE 9: CLEAN & GREEN TEAM (/clean-and-green)

**Goal:** Drive service bookings. This is a revenue-generating page.

**Design inspiration:** Service business landing pages — clear pricing, clear social proof, clear CTA above the fold.

**Sections:**
1. **Hero:** Bold photo collage of before/after work. Text: *"Your yard. Our pride."*
2. **Services grid** (icon + name + one-liner for each of the 9 services):
   - Basic Cut and Trim
   - Hedging
   - Flower Beds
   - Tree Pruning
   - Gutter Cleaning
   - Hard Scaping
   - Trash Removal
   - Snow Removal
   - Shed/Basement Clean Out
3. **Member Discount callout box:** "CCD Resident Members get 15% off all services"
4. **Before/After gallery** (slideshow of work photos, properly labeled)
5. **Free Estimate CTA:** [GET A FREE ESTIMATE →] → Microsoft Forms
6. **Contact:** (410) 205-2488 | info@ccdgroup.org | francis@ccdgroup.org for direct bookings
7. **Service area map** (Irvington/21229 and surrounding)

---

### PAGE 10: TOOL BANK (/tool-bank)

**Goal:** NEW PAGE — dedicated to the Tool Bank program (currently only mentioned as a membership bullet point).

**Sections:**
1. **Hero:** Photo of tools + community members
2. **What is the Tool Bank?** — Explain the concept (borrow tools instead of buying)
3. **How It Works:** 3-step process with icons: (1) Become a member → (2) Reserve a tool → (3) Pick up and return
4. **Available Tools:** List or category grid of tools available (to be populated)
5. **Membership pricing reminder:** "FREE for Resident Members · Discounted for others"
6. **Booking/Reservation form** (Calendly or similar)
7. **Contact:** info@ccdgroup.org / (410) 205-2488

---

### PAGE 11: PROGRAMS & WORKFORCE DEVELOPMENT (/programs)

**Goal:** Showcase partner programs and workforce training offerings.

**Current state:** Only The 4th Brew and DeWalt are listed. This page needs MUCH more content.

**Sections:**
1. **Intro:** "Every program CCD launches is strengthened by our partner network and our commitment to creating real economic opportunity."
2. **Program Cards** for each active program/partner:
   - The 4th Brew (coffee culture / entrepreneurship)
   - DeWalt (tools / construction trades training)
   - *(Additional programs to be added)*
3. **Become a Program Partner:** CTA for businesses/orgs to partner with CCD

---

### PAGE 12: MEMBERSHIP (/membership)

**Goal:** Convert visitors to members. This page should feel like a benefit-forward offer, not a form.

**Redesign approach:** Lead with benefits and community value, then reveal pricing.

**Sections:**
1. **Hero:** Photo of community members + bold headline: *"This is your co-op. Own a piece of it."*
2. **What being a member means:** 3–4 key values (vote on governance, access green spaces, build community, support local)
3. **Membership Tiers** (redesigned as clean, modern pricing table):

```
┌─────────────────┬──────────────┬──────────────┬─────────────┬──────────────┐
│ NON-RESIDENT    │ RESIDENT ⭐  │ SMALL BIZ    │ MEDIUM BIZ  │ LARGE BIZ    │
│ $10/month       │ $20/month    │ $100/month   │ $250/month  │ $400/month   │
│ +$5 setup       │ +$5 setup    │ +$5 setup    │ +$5 setup   │ +$5 setup    │
├─────────────────┼──────────────┼──────────────┼─────────────┼──────────────┤
│ ✓ Event discounts│ ✓ Free Toolbank│ ✓ Advocacy  │ ✓ Advocacy  │ ✓ Advocacy   │
│ ✓ Toolbank disc.│ ✓ 15% C&G   │ ✓ 15% C&G   │ ✓ 15% C&G  │ ✓ 15% C&G   │
│ ✓ Green spaces  │ ✓ Advocacy  │ ✓ Green spaces│✓ Green spaces│✓ Green spaces│
│ ✗ No vote       │ ✓ 1 VOTE    │ ✓ 1 VOTE    │ ✓ 1 VOTE   │ ✓ 1 VOTE    │
└─────────────────┴──────────────┴──────────────┴─────────────┴──────────────┘
```
*(⭐ = Recommended / most popular)*

4. **FAQ section** about membership
5. **[CHOOSE YOUR MEMBERSHIP →]** CTA that opens Wix/new platform's membership signup

---

### PAGE 13: VOLUNTEER (/volunteer)

**Goal:** NEW PAGE — give people who aren't ready to pay a clear way to contribute.

**Sections:**
1. **Current volunteer needs** (list updated regularly)
2. **Volunteer sign-up form** (name, email, skills/interests, availability)
3. **What to expect** as a CCD volunteer

---

### PAGE 14: DONATE (/donate)

**Goal:** Drive donations with emotional storytelling, not just a PayPal button.

**Sections:**
1. **Hero:** Real community photo + headline *"Invest in Irvington"*
2. **What your donation does** (impact tiers):
   - $25 = Seeds for the community garden
   - $50 = One named brick in the Center for Social Impact
   - $100 = Supplies for a Clean & Green service day
   - $500 = One month of Tool Bank operations
   - Custom amount
3. **Donate button → PayPal** (existing integration)
4. **Brick Campaign cross-link**
5. **Tax-exemption status note** (501(c)(3) if applicable)

---

### PAGE 15: EVENTS (/events)

**Goal:** Replace the empty Wix calendar with an actually useful events hub.

**Sections:**
1. **Upcoming Events** — Card grid with date, name, location, registration link
2. **Past Events** — Archive / gallery
3. **Co-op Market schedule** integration
4. **Subscribe to email list** for event updates

*Platform: Eventbrite embed, Google Calendar embed, or native CMS events*

---

### PAGE 16: PROJECTS (/projects)

**Goal:** Showcase all CCD's community development work in one organized hub.

**Layout:** Four large project cards with real photography:

1. **OASIS @ 240** — 240 S Monastery Ave | *Completed* | Native garden, rain catchment, community art
2. **Community Center for Change** — 3932-3934 Frederick Ave | *In Progress* | Innovation hub
3. **Botanical Bus Stop** — Old Frederick Rd & S Monastery Ave | *Planned* | Community-beautified transit space
4. **Little Memorial Garden** — Old Frederick Rd & Irving St | *In Progress* | Memorial garden with raised beds

Each card: hero photo, project number, name, status badge (Completed / In Progress / Planned), 2-line description, [LEARN MORE] link

---

### PAGE 17: NEWS (/news)

**Goal:** Show CCD is active and growing. Replace the non-existent blog.

**Layout:** Standard blog/news grid. Each post: date, headline, excerpt, photo, [READ MORE].

**Content strategy:** Aim for 1–2 posts per month covering:
- Project milestones
- Event recaps
- Partner spotlights
- Community impact stories
- CCD leadership commentary on local issues

---

### PAGE 18: CONTACT (/contact)

**Goal:** Clear, friendly, functional contact page.

**Sections:**
1. **Contact Info:**
   - Address: 4004 Frederick Ave, Baltimore, MD 21229
   - Phone: (410) 205-2488
   - Email: info@ccdgroup.org
   - Clean & Green specifically: francis@ccdgroup.org
   - Co-op Market / Events: theREC@ccdgroup.org
2. **Embedded Google Map** (custom styled, showing 4004 Frederick Ave)
3. **Contact Form** (First Name, Last Name, Email, Topic dropdown, Message, Submit)
4. **Social links**: Facebook, Instagram
5. **Facilities Booking Request:** [REQUEST FORM] → Microsoft Forms link
6. **Hours** if applicable

---

## NAVIGATION DESIGN

### Header (Desktop)
```
[CCD Logo — left aligned]    ABOUT ▾   PROGRAMS ▾   GET INVOLVED ▾   PROJECTS   NEWS   [DONATE]
                                                                                    [gold CTA button]
```

### Utility Bar (above header, very thin — like ReBuild Metro)
```
Clean & Green Services ▸   Tool Bank ▸   Facilities Booking ▸   [Language EN ▾]
```

### Mobile Header
```
[CCD Logo]         [≡ MENU]
```
Hamburger opens full-screen overlay menu with all sections organized clearly.

### Key UX Rules
- **Sticky header** — always visible on scroll (never disappear)
- **Active state** on current page nav item
- **Dropdown menus** with a brief description under each item (not just a list of links)
- **Donate button** in header at all times — gold, distinct from nav links
- **No centered logo in header** — logo always top-left

---

## DESIGN PATTERNS & COMPONENTS

### 1. Section Headers
```
[SMALL CAPS LABEL IN GREEN]     ← e.g., "OUR MISSION" or "WHAT WE DO"
Big, Bold Display Headline
Supporting body text below
```

### 2. Program/Project Cards
```
┌──────────────────────────┐
│   [Full-width photo]     │
│                          │
├──────────────────────────┤
│ [TAG] e.g., "PROGRAM"   │
│ Program Name             │
│ One-line description     │
│ [Learn More →]           │
└──────────────────────────┘
```

### 3. Split Section (text + photo)
```
┌──────────────┬──────────────┐
│ Headline     │              │
│              │  [Photo]     │
│ Body text    │              │
│              │              │
│ [CTA button] │              │
└──────────────┴──────────────┘
```
*(Alternate L/R on adjacent sections)*

### 4. Impact Stat Block
```
  247          3,400 sq ft        4              $125K+
Members       Green space       Projects       Invested
              maintained
```
*(Animated on scroll; numbers are illustrative — replace with real data)*

### 5. Testimonial Cards
```
┌─────────────────────────────────────┐
│ [Photo]  "Quote text..."            │
│          — Name, Title/Role         │
│          [Organization logo]        │
└─────────────────────────────────────┘
```

### 6. Membership Pricing Table
See Page 12 spec above. Mobile: vertical stack, Desktop: horizontal comparison.

### 7. Before/After Slider
For Clean & Green Our Work page and project pages. Drag handle reveals before/after image.

---

## ANIMATIONS & INTERACTIONS (Inspired by Awwwards/Godly)

**Keep subtle — this is a community org, not a design agency. Animations serve clarity, not showmanship.**

1. **Scroll-triggered number counters** — impact stats animate up on scroll (like ReBuild Metro)
2. **Staggered card reveals** — cards fade in from bottom with slight delay between each
3. **Parallax hero** — hero photo scrolls at a slightly different speed than text (depth effect)
4. **Smooth page transitions** — subtle fade between pages (Framer handles this natively)
5. **Hover states on cards** — scale up 3%, shadow deepens, accent color border appears
6. **Logo mark animation** — on first load, the CCD logo circular element rotates once slowly
7. **Before/after drag slider** — for Clean & Green work gallery
8. **Map pins** — bounce animation on hover/tap for project map

---

## CONTENT PRIORITIES (What CCD Needs to Produce)

The best website design fails without content. Here's what CCD needs to gather/create:

### Immediate (before any site launch)
| # | Content Item | Owner | Notes |
|---|-------------|-------|-------|
| 1 | **Aerial drone photo of Irvington/Frederick Ave** | CCD | Single most important asset. Hire a local drone photographer for $200-400. |
| 2 | **Staff/team headshots and bios** | All staff | Professional photo day, or good natural light photos |
| 3 | **Resident testimonials** (3–5 quotes with names) | Tracy/outreach | Handwritten or voice-recorded and transcribed |
| 4 | **Real impact numbers** (members, sq ft, youth served) | CCD leadership | Even rough numbers are better than nothing |
| 5 | **Clean & Green before/after photos** (organized, labeled) | Francis | Already exists, just needs organization |
| 6 | **Partner logos** (all organizations mentioned in site) | CCD | Collect hi-res logos from each partner |

### High Priority (within 1 month of launch)
| # | Content Item | Notes |
|---|-------------|-------|
| 7 | **60-second Brick Campaign video** | Voiceover + b-roll of building + rendering animation. Can be done with iPhone + editing. |
| 8 | **Co-op Market event photos** (organized gallery) | From past events |
| 9 | **Tool Bank photo and available tools list** | Photos of actual tools |
| 10 | **Project pages** — full narratives for all 4 projects | Expand existing content |
| 11 | **Annual report or impact one-pager** | PDF for donors |
| 12 | **Center for Social Impact floor plan / renderings** | From Neighborhood Design Center partnership |

### Ongoing
| # | Content Item | Notes |
|---|-------------|-------|
| 13 | News/blog posts (1–2/month) | Can start by repurposing Instagram captions |
| 14 | Events calendar updates | |
| 15 | Instagram embed (live) | Already using @ccd_group — keep posting |

---

## PLATFORM RECOMMENDATION

### Option A: Framer ⭐ (Recommended for a fast, impressive launch)
- **Cost:** ~$16–30/month
- **Best for:** Beautiful animations, modern look, no-code designer control
- **CMS:** Basic — good for blog/news but not complex data
- **Learning curve:** Moderate for non-designers
- **Why:** Framer community templates for nonprofits are available at godly.website and framer.com/marketplace. Can be set up and look stunning in 2–3 weeks.

### Option B: Webflow (Best for long-term CMS management)
- **Cost:** ~$23–39/month
- **Best for:** Non-technical staff updating content long-term
- **CMS:** Excellent — structured content types for projects, news, events
- **Learning curve:** Steep for visual design, moderate for content updates
- **Why:** The most professional-grade no-code option. ReBuild Metro uses WordPress, but Webflow achieves the same quality with less technical overhead.

### Option C: WordPress + Custom Theme (Mirror ReBuild Metro's Stack)
- **Cost:** $10–20/month hosting + theme + plugins
- **Best for:** If CCD has a developer or technical volunteer
- **CMS:** Excellent and widely understood
- **Why:** Most control, most flexibility, most widely supported

### Option D: Squarespace (Accessible but limited)
- **Cost:** ~$23–33/month
- **Best for:** A quick refresh that still looks modern
- **Why:** Modern templates, easy to update, but less customizable than Framer/Webflow

**My recommendation: Start with Framer for the visual redesign, then migrate to Webflow if/when Tracy or staff want to manage content independently.**

---

## DESIGN INSPIRATION REFERENCE SITES

### Community/Nonprofit Sites with Great Design (Awwwards + Godly)
1. **ReBUILD Metro** (rebuildmetro.com) — *Primary reference. Two-tone typography, aerial photography, stat counters, testimonial carousel.*
2. **Big Thought** (bigthought.org) — Youth-focused nonprofit; warm color palette, human photography, impact-forward layout
3. **TraffickWatch** (traffickwatch.org) — Community advocacy; clean, high-contrast, mobile-first
4. **Civic Works Baltimore** (civicworks.com) — Local Baltimore nonprofit; community-centered photography
5. **Habitat for Humanity** (habitat.org) — Master class in "join/donate/volunteer" pathways from hero

### Design Patterns Worth Borrowing
- **The diagonal cut / geometric section break** (ReBuild Metro) — Use with CCD's own geometry
- **Two-tone headline** ("Building **Together**" — first word light, second word bold) — Highly effective typographic pattern
- **Full-page brand color section** between content sections (ReBuild's purple A-mark moment) — CCD could do this with the H.E.A.R.T. acronym
- **Auto-scrolling partner logo strip** (used by many nonprofits to show institutional credibility)
- **Interactive impact map** (ReBuild's /our-impact/) — Mapbox or Google Maps with custom styling
- **Sticky "Book Now" / "Get Involved" floating button** on mobile — extremely effective for Clean & Green service bookings

### Framer Templates Worth Adapting
- Search "community", "nonprofit", "agency" at framer.com/marketplace
- Look for templates with: large hero typography, card-based programs, testimonial sections
- $20–80 range; can be adapted in a few days

---

## SEO & TECHNICAL REQUIREMENTS

### Domain
- Keep `ccdgroup.org` — it has existing history and backlinks
- Set up proper SSL (https)

### Meta Tags (per page)
Each page needs:
- Unique `<title>` (50–60 chars)
- Unique `<meta description>` (120–155 chars)
- Open Graph image for social sharing

### Suggested Page Titles
| Page | Title |
|------|-------|
| Home | CCD Baltimore — Building Self-Sustainable Communities in Irvington |
| About | Our Story — Cooperative Community Development, Baltimore |
| Co-op Market | Community Co-op Market — CCD Baltimore |
| Center for Social Impact | The Center for Social Impact — CCD's 21229 Innovation Hub |
| Brick Campaign | The Brick Campaign — Help Build the Center for Social Impact |
| Clean & Green | Clean & Green Team — Landscaping & Lawn Services, Baltimore |
| Tool Bank | The Tool Bank — Borrow Tools in Irvington | CCD |
| Membership | Become a Member — Cooperative Community Development Baltimore |
| Contact | Contact CCD — (410) 205-2488 \| Baltimore, MD 21229 |

### Google Analytics + Search Console
- Set up GA4 and Google Search Console on launch day
- Track: page views, membership signups, Clean & Green form submissions, donations click-throughs, Brick Campaign clicks

### Accessibility
- All images need alt text
- WCAG 2.1 AA color contrast ratios (especially gold on green)
- Keyboard navigable
- Language selector functional (Spanish at minimum, given community demographics)

---

## LAUNCH CHECKLIST

- [ ] Domain stays at ccdgroup.org — redirect old Wix to new site
- [ ] SSL certificate active
- [ ] All CCD content copied from old Wix site (this audit serves as the record)
- [ ] Drone/aerial photography obtained
- [ ] Staff team photos and bios collected
- [ ] Partner logos gathered (all hi-res)
- [ ] All 4 membership tiers tested (payment processing works)
- [ ] Clean & Green booking form live (Microsoft Forms or upgraded to Typeform/JotForm)
- [ ] Tool Bank reservation process defined
- [ ] Events page synced to actual CCD event calendar
- [ ] PayPal donate link tested
- [ ] fundraisingbrick.com link tested
- [ ] Instagram feed embedded (live @ccd_group)
- [ ] Contact form sends to info@ccdgroup.org (+ CRM if used)
- [ ] Google Analytics tracking confirmed
- [ ] Google Search Console verified
- [ ] Mobile tested on iPhone + Android (Chrome, Safari)
- [ ] All 6 required feature areas per Tracy's email are addressed:
  - [x] Learn about CCD and its mission → Home + About pages
  - [x] Become a member → /membership
  - [x] Community info and resources → Programs, Projects, News
  - [x] Make donations → /donate + PayPal integration
  - [x] Register for events → /events
  - [x] Brick Capital Campaign → /brick-campaign (dedicated page)
  - [x] Upcoming Co-op → /coop-market + /center-for-social-impact
  - [x] Center for Social Impact → /center-for-social-impact (dedicated page)
  - [x] Tool Bank → /tool-bank (new dedicated page)
  - [x] Schedule Clean & Green services → /clean-and-green with booking form

---

## QUESTIONS FOR FRIDAY JUNE 19 MEETING WITH TRACY

1. **Platform preference:** Does CCD have a developer/technical resource, or do we need a no-code solution that staff can manage independently?
2. **Budget:** What is the approximate budget for (a) platform/hosting, (b) photography, (c) design/development work?
3. **Team page:** Who are all the current staff/team members and their roles? Can we schedule a team photo day?
4. **Impact numbers:** What are CCD's current membership count, number of lots/green spaces maintained, and youth served?
5. **Tool Bank:** What tools are currently available? How is the lending process managed today?
6. **Center for Social Impact:** Do we have architectural renderings or floor plans from the Neighborhood Design Center we can use on the website?
7. **Video:** Is there any existing video footage of CCD's work, events, or the Jarbo Brothers building? Is there budget to commission a 60-second video?
8. **Partners:** Who is CCD's primary contact at each partner organization (BRED, Neighborhood Design Center, ReGEN, etc.)?
9. **Content management:** After the new site launches, who at CCD will be responsible for updating the content (news, events, etc.)?
10. **Timeline:** What is the target launch date for the new website?

---

## JULY 2026 MEDIA FILEBASE + GOOGLE STITCH ADDENDUM

**Source folder reviewed:** `Cooperative Community Development Inc`  
**Generated filebase:** `website-media-filebase/`  
**Catalog:** `website-media-filebase/media-catalog.csv`  
**Stitch prompt pack:** `website-media-filebase/google-stitch-prompt-pack.md`
**Stitch upload kit:** `website-media-filebase/stitch-upload-files/`

### Media Inventory Result

The shared folder contains 933 original files, roughly 61 GB total. The organizer cataloged those files plus the existing local Shoe Drive package, for **986 catalog rows** and **262 curated copied assets**. Originals were not moved, renamed, or deleted.

Recommendation counts:
- **Website-ready:** 34
- **Supporting:** 145
- **Review-needed:** 607
- **Archive:** 200

Use this as a strict shortlist, not a dump. `Website-ready` assets are the first pass for Stitch and page mocks. `Supporting` assets are for cards, galleries, proof sections, social/news, and internal context. `Review-needed` assets are mostly HEIC/photo dumps that need visual review or conversion before they should drive design.

### Organized Media Folders

```
website-media-filebase/
|-- 01-home-hero-neighborhood-drone
|-- 02-about-team-community
|-- 03-center-for-social-impact-3932-frederick
|-- 04-brick-campaign
|-- 05-clean-green
|-- 06-coop-market-events
|-- 07-projects-oasis-gardens-bus-stop
|-- 08-history-walking-tour-murals
|-- 09-partner-logos-brand
|-- 10-shoe-drive-campaign
|-- 90-source-docs
`-- 99-review-needed
```

### Page-by-Page Media Assignments

| Page | Primary media source | Usage |
|------|----------------------|-------|
| Home | `01-home-hero-neighborhood-drone` | Full-bleed video/still hero, ReBUILD-style first impression, neighborhood motion background |
| About | `08-history-walking-tour-murals`, `06-coop-market-events` | Community story, Irvington walking tour proof, real people/community activity |
| Center for Social Impact | `99-review-needed/center-social-impact-3932-heic` | Review/convert best 3932 Frederick HEICs for before/current state gallery |
| Brick Campaign | `01-home-hero-neighborhood-drone`, 3932 HEIC review set | Fundraising story, transformation proof, named-brick donor page |
| Clean & Green | `05-clean-green` | Service hero, work proof, before/after and estimate CTA support |
| Co-op Market / Events | `06-coop-market-events`, `10-shoe-drive-campaign` | Event cards, Shoe Drive/news content, community activity proof |
| Projects | `07-projects-oasis-gardens-bus-stop`, `08-history-walking-tour-murals` | Oasis, Memorial Garden, murals, walking tour, impact map |
| Membership | `08-history-walking-tour-murals`, `06-coop-market-events` | Human/community proof behind the co-op value proposition |
| Donate | `01-home-hero-neighborhood-drone`, `07-projects-oasis-gardens-bus-stop` | Impact tiers, project credibility, Brick Campaign cross-link |
| Contact | `09-partner-logos-brand` | Brand-consistent utility page; avoid heavy media |

### Google Stitch Experiment Workflow

Use `website-media-filebase/google-stitch-prompt-pack.md` as the design launch kit. Run one Stitch experiment per page instead of one giant prompt. This keeps each page easier to compare, regenerate, and revise.

Stitch limitation workaround:
- Stitch cannot see local folders or infer media from folder paths.
- Use `website-media-filebase/stitch-upload-files/00-upload-guide.md`.
- For each page, upload the matching `*-visual-board.png` file and paste the matching `*-prompt.txt`.
- Each visual board is a single uploadable PNG that embeds the real CCD media, palette, nav, ReBUILD-inspired design rules, and page direction.
- Start with `00-master-visual-board.png` to establish the global visual system, then run page boards.

Experiment order:
1. **Home** - lock the ReBUILD-inspired visual system: full-bleed real media, strong mission section, program cards, impact counters, map teaser, donate/member/book CTAs.
2. **Center for Social Impact** - test the 3932 Frederick story page using reviewed HEICs plus a rendering placeholder.
3. **Clean & Green** - prove the service-business landing page can convert with real work media.
4. **Projects** - build the impact-map/project-card model.
5. **Donate / Brick Campaign** - test emotional fundraising pages after the core visual system is stable.

### ReBUILD Metro Inspiration, Adapted for CCD

Borrow:
- Full-bleed real neighborhood imagery before heavy copy.
- Sticky utility bar plus main nav.
- Program carousel/card row on the homepage.
- Animated impact counters.
- Impact map teaser.
- Testimonial/story carousel.
- Strong donate CTA in the header and footer.

Do not copy:
- ReBUILD's purple identity.
- Its buyer/renter/resident-portal hierarchy.
- Its housing-only language.

CCD-specific structure:
- **Utility links:** Clean & Green Services, Tool Bank, Facilities Booking.
- **Main nav:** About, Programs, Projects, Get Involved, News, Contact, Donate.
- **Programs:** Co-op Market, Center for Social Impact, Clean & Green, Tool Bank, Workforce Development.
- **Get Involved:** Membership, Volunteer, Donate, Brick Campaign, Events.

### Updated Content Gaps

Now solved or partially solved:
- Real aerial/drone media exists.
- Real community/history media exists.
- Clean & Green action media exists.
- 3932 Frederick inventory media exists but needs HEIC conversion/review.
- Brand guidelines exist.
- Shoe Drive campaign media exists.

Still needed:
- Staff/team headshots and bios.
- Tool Bank photos and tool inventory.
- Partner logos in clean transparent formats.
- Clean & Green polished before/after pairs.
- Resident testimonials with permission to publish.
- Current impact numbers.
- Center for Social Impact renderings/floor plans in web-ready image format.
