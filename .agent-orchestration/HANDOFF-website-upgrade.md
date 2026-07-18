# CCD Website Upgrade — Orchestration Ledger (July 17, 2026)

## Goal
Phase 1: upgrade Next.js redesign (content truth, central link config, real forms, new pages, custom animations, honest media). Phase 2: Wix Studio migration kit. Phase 3: pair-build in Wix.

## Frozen contract
- Live ccdgroup.org untouched. Work on `ccd-website` branch `redesign-upgrade`.
- All external links/socials/contact flow through `lib/siteConfig.ts`; blank value = graceful fallback.
- No fabricated content: no fake before/after, no invented testimonials, no unfilled flyer templates.

## Dispatch log
- Main: audit, plan, data-layer rewrite, config, forms wiring, new pages/sections/CSS, build+smoke verification.
- Workflow `ccd-media-visual-audit` (11 agents, 51 images): visual inspection of every site media file + 20 Clean&Green pro-shoot candidates.

## Raw evidence (media audit verdicts applied)
- cleangreen-2/3/4 near-identical frames (one scene); before/after pairs were fake (two "during" scenes, no true pairs anywhere incl. MMZ shoot) → slider emptied (`beforeAfterPairs = []`, section auto-hides; real pairs exist on old Wix /work page — export later).
- project-oasis.jpg ≡ projects-camera.jpg exact dupes, quality 1 → deleted.
- event-coopway-4.jpg rotated 90°, near-dupe → deleted. community-group.jpg dupe of citychill → deleted. community-together-3.jpg = artist-signature closeup → deleted. cleangreen-3/4 dupes → deleted. contact-sheet.jpg internal grid → removed from public.
- shoedrive-flyer.png was an UNFILLED template → replaced with filled CCD_Sneaker_Drive_Slide_CCDEvent.png (real dates/locations).
- MMZ keepers resized to ≤2000px q82: cleangreen-garden-hero (8033), cleangreen-garden-wide (8043), cleangreen-crew (8037), cleangreen-sidewalk (8030).
- drone-garden-1/2/3 = memorial CEREMONY not market → market imagery now event-coopway-2; ceremony images reassigned to Memorial Garden contexts.
- memorial-garden.jpg shows a tour crowd, no garden → reassigned to tour/team contexts; garden pages use drone-garden-1/2.
- community-smile.jpg = Baltimore Heritage tour shot → removed from workforce slots (now cleangreen-crew).
- Hero de-dup: every page hero now distinct (home slideshow, about=citychill, coop=together-2, team=memorial-garden crowd, partners=drone-1, programs=garden-hero, coop-market=coopway-2, tool-bank=sidewalk, CSI=mural-1, C&G=garden-wide, projects=drone-3, membership=together-5, brick=drone-2*, news=coopway-1, events=coopway-3, donate=drone-garden-1, volunteer=barbershop, contact=drone-2*). *brick & contact share drone-2 — only remaining reuse, acceptable (HQ building fits both).

## Round 2 (user follow-up: links, block detail, real tool/section media)
- External links: all 17 verified live via HTTP (PayPal, brick, both MS Forms, vendor form, FB/IG, 9 partner sites; the4thbrew 503 was transient → 200 ×3).
- Internal: 596 links + anchors crawled across all 22 pages — ALL OK.
- Events/news blocks enriched: cost, "How to take part" step lists, Google-Maps directions link, per-item contact button (Marquita/Francis/info@). Verified live in-browser (modal opens, 4 instructions, maps link, mailto).
- Media scout: workflow over 122 unexplored stills (Camera 1–5 + Memorial Garden 2025) → 69 finds; I personally eyeballed all 11 imports, caught 2 scout misattributions (DSCF0026 "chainsaw" was a City Chill shot; DSCF0059 shot through car door) and REJECTED them; cropped timestamp burn-in off 5 DSCF keepers.
- New real media wired: toolbank-wheelbarrow (Tool Bank hero — gloves/wheelbarrow/trowel), market-beds-flag + market-compost (real Farmers Market), farm-team-beds (workforce), farm-youth-harvest (volunteer hero), ccd-hq-crew (contact hero — 4004 building w/ painted CCD logo), memorial-aerial (Memorial Garden hero), cleangreen-cart + cleangreen-crew-wide (C&G gallery). Hero reuse now ZERO.

## Round 3 (user follow-up: event imagery, modal position, copy verification)
- Event thumbs now depict the events: market → market-beds-flag (Farmers Market flag + beds); walking tour → community-oasis (tour at the meeting point); shoe drive → shoedrive-shoes.png (clean shoe graphic); crowded flyer slide + drop-off-boxes photo moved INTO the modal gallery.
- Modal fix: portal to document.body + body scroll-lock + Escape-close — opens centered in the current viewport (verified at scrollY=1200: modal top=40px, scroll preserved after close). Root cause: section entry animation transform could hijack position:fixed.
- Copy sweep: 5-agent review of all 22 rendered pages vs fact sheet → 13 findings; 6 confirmed and fixed (official H.E.A.R.T. expansions restored: Homeownership/Economic Independence/Agricultural Access/Retail Revitalization/Tranquil Spaces; 3932-3934 address normalized; "most compelling" superlative softened; Catonsville Cooperative Market full name; Large tier 101+ employees; shoe drive funds → Center for Social Impact per flyer). 7 were false positives against the fuller June audit (Tool Bank discounts, DeWalt/4th Brew, nonprofit status, Chanelle Austin, 5-Minute Histories, incubator framing, org-tier C&G discount) — all verified on the live site, kept.
- Shoe drive dates aligned to the real flyer: June 8 – July 24, 2026 (was fictional "Aug 15 / through August").
- Seed CSVs regenerated from corrected data.

## Round 4 (user: audit codebase + visual audit + finalize + commit + Vercel)
- Code review fleet (4 dimensions × adversarial verify, 26 agents): 22 confirmed findings — ALL FIXED: ScrollFX StrictMode re-entrancy; donate amount now carried to PayPal; nav active state derived from pages data (verified on /team); keyboard dropdown blur-close; copyright hydration; API hardening (field allowlist + length caps, no upstream error echo, Object.hasOwn guard verified via toString→400, per-IP rate limit, honeypot verified silently dropping); modal dialog semantics + focus trap + restore; eyebrow contrast (#8a6d00 on light, gold only on dark — verified computed styles); hero reduced-motion + pause control (verified toggle); ba-grid/touch-action mobile fixes; FAQ aria-expanded; 32px hero-dot targets (verified); form errors role=alert + required + submit-result consumption + mailto fallbacks; heroVideo dead field removed; hamburger aria-label.
- DOM visual audit (home, C&G, membership, team, contact, projects, events @ desktop + 375px): all images load, no overflow, tiers stack, 4 map pins with correct hrefs, video plays, marquee runs, forms complete.
- Committed: b7f2a3a on `redesign-upgrade`.
- Deployed: https://ccd-website-b7tn5v9xb-aryanolympiads-5635s-projects.vercel.app (generated vercel.app URL, Ready, all routes/media/API 200; ccdgroup.org untouched).

## Round 5 (live ccdgroup.org sync — real people + real media)
- Scraped all 14 live pages; found the /general-6 service directory (Marquita Fullard/Events Manager, Tracy Hill/Special Assistant tracy@, Alex Bull/Community Resource Coordinator, Andi Kennedy/ARTS Project, Robert Morina IV robert@) + PAST HEADLINES press section.
- Harvested all 98 live wixstatic images (132MB originals); 14-agent visual classification; every wiring keeper verified with my own eyes (55 imported: 14 photos/renderings + 41 logos).
- REAL before/after pairs (house #1902 + blue-house corner, same-location confirmed) → C&G slider LIVE, drag verified (231px→92px).
- New media wired: NDC facade rendering (CSI split + community-center gallery), CCC concept rendering, Memorial Garden watercolor concept, Oasis grand-opening aerial hero + ribbon-cutting + Arts Project fence, Historic Irvington 1874 mosaic (about hero), volunteers bed-build (about split), market vendor, Maryland Nonprofits footer badge, 29-logo supporter wall + logos on core partner cards (+Baltimore Heritage, BCYF entries).
- Data: 7-person leadership incl. real names/titles/emails; serviceDirectory section on /contact; 3 press/past-event news items; Mastermind Photography credits; 3932-3934 fixed in about bullets.
- Verified: build+lint clean, 90 referenced media 200, 630 internal links OK, slider/directory/team/wall confirmed rendering, committed (live-sync commit), redeployed: https://ccd-website-l3cubajqt-aryanolympiads-5635s-projects.vercel.app (all spot routes/media 200).
- Wix kit: 11 seed CSVs regenerated incl. SupporterLogos / ServiceDirectory / BeforeAfterPairs.

## Verification (final)
- `npm run build` clean (26 routes). `npm run lint` clean.
- All 37 referenced media files → HTTP 200; zero unreferenced files in bundle. All routes 200. 596 internal links OK. Event modal verified interactively.

## Verdict
Phase 1 media + content + forms accepted (build/lint/routes/media all verified).
Phase 2 accepted: `wix-migration-kit/` docs 00–06 complete (setup, CMS schemas, page guide, forms/automations/AI/mailing, members/payments, QA/cutover/rollback).
Phase 3 (pair-build) is user-interactive by design — blocked on Aryan opening Wix Studio; start at `wix-migration-kit/01-SETUP.md`.
