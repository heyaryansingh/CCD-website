# 07 — Audit & Completion Plan (post-Session 3)

**State basis:** SESSION-3-LOG.md (verified 2026-07-18). Staging site "CCD 2026" only — live site, publish, domain, billing remain untouchable (doc 06 is Ary-only).

---

## A. What is DONE (verified on the staging site)
- **Header**: green utility bar (4 linked texts + IG/FB icons), Ovo wordmark, menu with About/Programs/Get Involved dropdowns + Projects/News/Contact, gold DONATE (→ Donate page), sticky (Freeze). Grid rows 34/76.
- **Footer shell**: 480px, #1A1A1A, styled copyright bar.
- **Design system**: `src/styles/global.css` live — tokens + 10 `.ccd-*` classes.
- **Code engine (synced)**: `renderPage.js` (placeholder-ID renderer), `masterPage.js` (auto copyright year), all 18 page files wired `renderPage($w, pages["<key>"])`.
- **Content module**: full 18-page copy generated → `wix-migration-kit/velo/siteData.js` (site currently holds a safe placeholder with `pages={}`).
- **CMS**: collections seeded (Session 1). Dynamic “Projects (Item)” page exists.

## B. What REMAINS

### B1. One-step content activation
1. Replace `src/public/siteData.js` with `velo/siteData.js` (paste in editor code panel / IDE, or the documented paste-event injection). → every wired page gains its copy the moment placeholders exist.

### B2. Header/nav polish (editor, ~15 min visible-window)
2. Manage Menu: drag the 14 flat items under their dropdowns; rename per script §B4 (Our Story, What is a Co-op?, Team & Partners, Partners & Funders; CSI, Clean & Green Team, Community Co-op Market, Tool Bank, Workforce Development; Become a Member, Volunteer, Donate, Brick Campaign, Events).
3. Menu W≈330 at X750 (clears DONATE).
4. Logo → Media Manager `site-media/ccd-logo.png`, 44px h.
5. Social icons → white variants (Set Social Links → Replace Icon ×2).
6. Delete stray empty paragraph (Layers: bare “P” row in header container).
7. Mobile breakpoint pass on header.

### B3. Footer completion (script §C)
8. Newsletter band: `.ccd-h-ovo-white` H3 “Get the block report.” + email input + gold SUBSCRIBE (mailto fallback until B6).
9. Four columns using `.ccd-footer-text` / links per §C3 (brand+tagline+socials · Quick Links · Programs · Contact).
10. Save header+footer to Library (§D).

### B4. Page scaffolds — the main block (editor)
Per page: **Add designed sections matching the doc-03 stack → assign renderer IDs (`#pageTitle`, `#pageBody`, `#sec{i}Title`…, via Properties panel) → assign `.ccd-*` classes → set section media from site-media → Preview (copy auto-fills).**
11. Home (slideshow hero, stats, cards×6, HEART, dark split, map, gallery, partner wall, news cards)
12. About · What Is A Coop · Team · Partners
13. Programs · Coop Market · Tool Bank · Center for Social Impact · Clean & Green
14. Projects (+ confirm dynamic item bindings)
15. Membership (tiers repeater) · Brick Campaign
16. News · Events (repeaters → CMS)
17. Donate · Volunteer · Contact (+ Google Maps embed 4004 Frederick Ave)

### B5. CMS/data finishing
18. Attach images to CMS rows (Team, Partner logos, Projects, News) — dashboard CMS is fully automatable.
19. Bind repeaters/datasets: partner wall, team grid, interns strip, projects grid, news/events, tiers, FAQ accordion.

### B6. Forms & automations (doc 04)
20. Clean & Green estimate form, contact form, volunteer form, newsletter → Wix Forms + email automations (external form links already flow from siteData).

### B7. Members/payments (doc 05)
21. Pricing plans for 5 tiers; set `membershipSignup` link in siteData when live.

### B8. QA (doc 06 — prep automatable; publish Ary-only)
22. Link sweep, mobile breakpoints all pages, SEO title/description per page (values are in siteData → copy into Page Settings), reduce-motion honored, image alts.
23. **Ary-only:** publish, domain, cutover.

---

## C. AUDIT plan (run at the START of the next visible-window session, ~10 min)
Purpose: verify assumptions before building; catch anything the Beta IDE/container churn lost.

| # | Check | How (automated) | Pass condition |
|---|---|---|---|
| A1 | Window visible | JS `document.visibilityState` on session tab | "visible" — else stop and fix first |
| A2 | Code files intact | IDE terminal: `wc -l src/styles/global.css src/public/*.js src/pages/*.js` | global.css=27ish, renderPage=49, 18 stubs=4 lines each |
| A3 | siteData active | terminal `node --input-type=module` import → `Object.keys(pages).length` | 18 (placeholder shows 0 → do B1 first) |
| A4 | Sync freshness | IDE status bar "synced just now" after touch+Sync | yes |
| A5 | Header integrity | Editor preview DOM: utility texts/links, DONATE href, menu items count | matches SESSION-3-LOG values |
| A6 | Renderer smoke test | On Home: add one text, ID `#pageTitle`, Preview | shows "Building the block." |
| A7 | CMS rows | Dashboard CMS: row counts per collection; images present? | counts per 02-CMS doc; flag missing images |
| A8 | Media inventory | Media Manager: site-media files listed vs doc-03 filenames | all present; note gaps |
| A9 | Pages exist w/ correct slugs | Editor pages panel vs doc 03 slugs | 18 + dynamic |
| A10 | Console clean | Preview → browser console via extension | no errors from masterPage/renderPage |

A6 is the keystone: it proves the whole content engine end-to-end before investing in 18 scaffolds.

## D. Session plan
- **Session 4** (visible window kept front the whole time): Audit C → B1 → A6 smoke test → B2 header polish → B3 footer → start B4 with Home.
- **Session 5:** B4 About+Programs clusters (8 pages).
- **Session 6:** B4 remaining 6 pages + B5 CMS bindings/images.
- **Session 7:** B6 forms + B7 members + B8 QA prep.
- **Ary:** doc 06 launch steps.

**Standing rules for every session:** window visible before any interaction; act→wait→DOM-verify; screenshots only at milestones; never Ctrl+D while text-editing; big file transfers via the paste-event method (SESSION-3-LOG); log exact resume state before stopping.

## E. Acceptance criteria ("actually done", pre-launch)
Every page renders its full doc-03 stack with real copy (from siteData) and real images; nav tree matches §B4 with working dropdowns; footer complete; forms submit and notify; membership tiers purchasable or explicitly deferred; mobile clean on all pages; zero console errors; SEO fields set; doc 06 checklist handed to Ary un-run.
