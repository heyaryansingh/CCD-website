# Session 1 Log — CCD 2026 (staging) build

**Date:** 2026-07-18 · **Executed by:** Claude (Cowork) driving Chrome, Ary supervising.
**Site:** "CCD 2026 (staging)" · account aryan2739 · metaSiteId `9b1a54e1-856d-4848-8573-74bced9163e0` · **unpublished** (never published, no domain, no billing actions).
The live ccdgroup.org site was never opened.

## Completed

### 01 — Site + theme (doc 01 §A–B)
- New Studio site from Blank Canvas, renamed **CCD 2026 (staging)**.
- Site colors 1–10: `#FFFFFF, #F5F7F8, #EEF1F2, #5B6B72, #1A1A1A, #FEC630, #E6AC00, #209765, #124A34, #0797D4` (exact `globals.css` tokens; Color 6 = gold = accent slot).
- Fonts: **Ovo** (heading slot) + **Ropa Sans** (body slot). Wix's catalog did NOT have Ovo / Ropa Sans / Sue Ellen Francisco — uploaded official OFL TTFs from google/fonts (Ovo-Regular, RopaSans-Regular, RopaSans-Italic, SueEllenFrancisco-Regular) via Site Styles → font upload. **Sue Ellen Francisco is in the font library** ready for per-element use on hero accent words (doc 03).

### 03 — Media (doc 01 §C)
- Media Manager → folder **site-media** → all **95 files** (94 images + `memorial-garden.mp4`) uploaded by Ary via drag-drop, filenames unchanged, 52MB/10GB used.
- NOTE: the video sits flat in `site-media/` (not a `video/` subfolder). Doc 03 references it by filename — fine.

### 02 — CMS (doc 02) — 12 collections, 93 items
| Collection | Rows | Type notes |
|---|---|---|
| Team | 7 | bio **Rich Text**, order **Number**, isActive **Boolean**, photo **Image** (empty by design) |
| Interns | 6 | same typing as Team; 1 named + 5 open-role rows |
| Partners | 15 | url **URL**, logo **Image** (empty) |
| MembershipTiers | 5 | vote/featured **Boolean**, order **Number**; price/setup Text ("$10/mo", "+$5 setup") |
| News | 9 | title → built-in **Title** field, body **Rich Text** |
| Events | 3 | title → **Title**, body **Rich Text** |
| Projects | 4 | slugs: oasis-240, community-center, bus-stop, memorial-garden |
| SiteLinks | 7 | url **URL** — paypalDonate, brickCampaign, facilitiesBooking, cleanGreenEstimate, vendorRegistration, facebook, instagram |
| ServiceDirectory | 6 | all Text |
| SupporterLogos | 29 | src/alt Text |
| BeforeAfterPairs | 2 | ba1/ba2 pairs (kit doc 02 said "seed empty" but CSV had 2 real pairs — imported) |
| Testimonials | 0 | empty by design; fields: Title(name), Description(quote), Image(photo), **isApproved Boolean**, role Text |

**Collection IDs vs display names:** collections were created via CSV import which assigns IDs `Import1…Import11`; display names were then set correctly (Team, Interns, …). Editor binding UIs show display names, so Session 2 binding is unaffected. Only relevant if Velo code ever references IDs — Testimonials is the exception with clean ID `Testimonials`.

### Deviations from doc 02 (deliberate, all recoverable)
1. **Image-path columns imported as Text/URL** (photo columns were blank; thumb/heroImage/photos/src/beforeImage/afterImage contain `/media/<file>` strings). Wix CSV import can't link Media Manager files. → During Session 2 page-binding, attach the real images from `site-media/` (filename mapping is right there in each row). The `photo`/`logo` Image-typed fields exist and are empty, as the kit intends.
2. **Events.date stayed Text** ("Jul 18", "Aug 1") — source CSV has display strings, not ISO dates. The kit's "sort by date, future-only filter" needs a real Date field; add one in Session 2 or when staff enter events. day/timeText display fields are intact.
3. **MembershipTiers.benefits stayed Text** (`; `-separated) — Wix Tags import couldn't parse the `;` separator (red warning during import). Split into a Tags field in Session 2 if tag-chip rendering is wanted; the comparison table can also render from the text.

### 04 — Pages (doc 01 §F)
All 18 static pages exist (empty canvases): Home, About, What Is A Coop, Team, Partners, Programs, Coop Market, Tool Bank, Center For Social Impact, Clean And Green, Projects, Membership, Brick Campaign, News, Events, Donate, Volunteer, Contact.
**Dynamic page:** "Projects (Item)" created from the Projects collection (Item-page template), verified cycling through all 4 project rows in the editor preview.

**Slug check needed in Session 2:** page names were chosen so Wix's auto-slugs land close to the kit's (`/what-is-a-coop`, `/coop-market`, `/clean-and-green`, `/center-for-social-impact`). Verify each page's URL in Page Settings → SEO and correct any mismatch (e.g. if Wix generated `/what-is-a-coop-1` or similar), and confirm the dynamic page URL pattern is `/projects/{slug}` (rename the URL prefix from Wix's default `/projects-1/…` if it collided with the static Projects page).
Display names to prettify later (cosmetic only; nav labels are set manually in the header build anyway): "What Is A Coop" → "What is a Co-op?", "Coop Market" → "Co-op Market", "Clean And Green" → "Clean & Green".

## Not done (Session 2+)
- Header/footer builds (doc 01 §D–E), all canvas/section design (doc 03), text-style sizes (H1 clamp etc.), rectangular gold button style (per-element in Studio), attaching images to CMS rows, forms/automations/AI chat (doc 04), Members/Pricing Plans (doc 05).
- Renaming color labels (Color 6 → "Gold" etc.) — cosmetic, optional.

## Session 2 starting point
1. Open the staging site's editor (Sites list → **CCD 2026 (staging)** — NOT the "CCD" live site card).
2. `npm run dev` in `ccd-website/` for the localhost:3000 pixel reference.
3. Build global header + footer first (doc 01 §D–E), then pages one at a time per doc 03, binding repeaters to the seeded collections and attaching media as you go.

## Automation notes (for whoever drives next)
- Editor tab renderer intermittently times out on screenshots; DOM tools keep working. A tab reload fixes it. A stuck 250% browser zoom appeared twice; reload (or Ctrl+0 by hand) fixes it.
- Dashboard CMS (`/wix-cms/`) renders in the top document — file inputs reachable (CSV import automation works). Media Manager + editor wizards render in iframes — file uploads there need a human drag-drop or the editor-native dialogs.
- CSV import auto-creates collections named "Import N"; rename via the collection title, single click then type in a fresh action.
