# CCD → Wix Studio Migration Kit

**Purpose:** rebuild the polished Next.js redesign (`ccd-website/`, branch `redesign-upgrade`) as CCD's real, staff-run website in **Wix Studio** — without ever touching the live ccdgroup.org Wix site until final cutover.

**How to use this kit:** work through the numbered docs in order, in a pair-build session (I direct, you click in your Wix Studio account). Every doc is self-contained: exact values, copy, media filenames, and settings are pre-baked.

| Doc | What it covers |
|---|---|
| 01-SETUP.md | New Studio site creation, design system (colors/fonts), global settings |
| 02-CMS-COLLECTIONS.md | Every CMS collection schema + seed rows (team, projects, news, events…) |
| 03-PAGES-BUILD-GUIDE.md | Page-by-page sections, media, and Studio animations |
| 04-FORMS-AUTOMATIONS-AI.md | Forms, auto-replies, AI chat, mailing list |
| 05-MEMBERS-PAYMENTS.md | Members Area + Pricing Plans for the 5 real tiers |
| 06-LAUNCH-CUTOVER.md | QA checklist, domain cutover, 301 redirects, rollback |

**Source of truth during the build:**
- Design + copy: the running Next.js site (`npm run dev` in `ccd-website/` → localhost:3000)
- Data: `ccd-website/lib/siteData.ts` (collections) + `lib/siteConfig.ts` (links/contact)
- Media: `ccd-website/public/media/` (28 audited, web-sized files — upload this exact folder to the Wix Media Manager; do NOT re-pull from the raw shared drive)

**Safety rules:**
1. Create a **NEW site** in Wix Studio. Never open the editor of the existing live site.
2. The live site keeps serving ccdgroup.org until 06's cutover checklist passes.
3. All account actions (billing, domain, payments) are performed by you; the kit only tells you where to click.

**Known gaps to fill when available (site works without them):**
- Team roster + headshots → add rows/photos in the Team CMS collection
- Real before/after photos → export from old Wix /work page → BeforeAfterPairs collection
- Real impact numbers (members, youth served, funds) → Stats fields
- Testimonials with permission → Testimonials collection
- Verify carried-over links still work: PayPal button, fundraisingbrick store, both Microsoft Forms, vendor Google Form
