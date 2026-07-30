# Alt Text Drafts — Ready to Paste

## 1. How to use this

Paste the "Draft alt text" cell verbatim into the `altText` field for that row (see `CMS-SCHEMA.md` Part 3.1/3.2 for the field-per-collection schema). Rows marked `[CHECK IMAGE]` are a best-guess draft from the row data (name/role/title) — a human must open the actual photo in the Wix Media Manager and confirm it matches before publishing; edit the draft if it doesn't. Rows marked **decorative** get an empty `altText` value, not a description — do not delete the field, just leave it blank and note it's intentional.

## 2. Why alt text is a CMS field here

`CMS-SCHEMA.md` Part 3.1 requires a `altText` text field on every image-bearing collection because a required field gets filled in by non-technical staff, where a Media Manager reminder gets skipped — this is what keeps WCAG 2.1 AA compliance from degrading as new content is added. `ACCESSIBILITY.md` Section 4.2/4.3 explains the writing rules applied below (function over file description, no redundancy with adjacent captions, decorative images get empty alt).

## 3. The rules applied (brief)

- Describe function and content, never "image/picture/photo of."
- People: name + role, plus the action if it matters.
- Logos: the org name is the alt text, because the logo's job is to identify the org — unless the org name is already visible as adjacent text, in which case the logo is decorative (empty alt).
- Before/after pairs: two separate, state-describing alt texts — never "before" and "after" alone, never one shared caption.
- Decorative: empty alt, no description.
- No repeating what an adjacent caption/heading already says.
- Aim under ~125 characters.
- No image files were available — drafts built from row data are marked `[CHECK IMAGE]` where the correct alt depends on what's actually in the photo.

---

## 4. Team (7 rows — matches Team.csv rows 2–8)

All Team photos are empty (`photo` column blank) in the current CSV — no image is attached yet. Drafts below are pre-written for when photos are added, since every row is a headshot/portrait of a named, active staff member and the pattern is fixed.

| Row (name) | Image field | Draft alt text | Notes |
|---|---|---|---|
| Johnny Martin Jr. | photo | Johnny Martin Jr., Chief Executive Officer, CCD | `[CHECK IMAGE]` — adjust if photo shows him doing something specific (e.g. speaking, on-site) rather than a plain headshot |
| Robert Morina IV | photo | Robert Morina IV, Operations Coordinator, CCD | `[CHECK IMAGE]` |
| Tracy Hill | photo | Tracy Hill, Special Assistant, CCD | `[CHECK IMAGE]` |
| Marquita Fullard | photo | Marquita Fullard, Events Manager, CCD | `[CHECK IMAGE]` |
| Alex Bull | photo | Alex Bull, Community Resource Coordinator, CCD | `[CHECK IMAGE]` |
| Francis | photo | Francis, Clean & Green Lead, CCD | `[CHECK IMAGE]` |
| Arianna | photo | Arianna, Community Engagement Coordinator, CCD | `[CHECK IMAGE]` |

## 5. Interns (6 rows — matches Interns.csv rows 2–7)

Only one row (Aryan) has a name; rows 2–6 have blank `name` fields (placeholder role-only slots) and no photos on any row. Cannot write a person-identifying alt text for the blank rows — noted below instead of padding with a vague guess.

| Row (identifying field) | Image field | Draft alt text | Notes |
|---|---|---|---|
| Aryan — Strategy & Digital | photo | Aryan, Strategy & Digital intern, Summer 2026 cohort, CCD | `[CHECK IMAGE]` — no photo attached yet |
| (unnamed) — Programs | photo | — | Cannot draft: name field is blank in the CSV. Write when the intern is named and a photo is added — use pattern "[Name], Programs intern, Summer 2026 cohort, CCD" |
| (unnamed) — Marketing & Comms | photo | — | Cannot draft: name field is blank. Same pattern as above with "Marketing & Comms intern" |
| (unnamed) — Community Outreach | photo | — | Cannot draft: name field is blank. Same pattern with "Community Outreach intern" |
| (unnamed) — Design & Media | photo | — | Cannot draft: name field is blank. Same pattern with "Design & Media intern" |
| (unnamed) — Clean & Green | photo | — | Cannot draft: name field is blank. Same pattern with "Clean & Green intern" |

## 6. Partners (15 rows — matches Partners.csv rows 2–16)

All `logo` fields are currently blank. Per the rule: a partner logo's alt text is the org name, since its function is to identify the org, UNLESS the org name is already shown as adjacent visible text on the partner wall (a logo grid) — in that case mark decorative. The Partners page is a wall of logos with **no visible name label per logo** based on the current schema (name is a separate CSV field, not confirmed rendered as on-page caption text) — so drafts below give the name-as-alt-text version. If the live partner wall renders the org name directly under/beside each logo, switch every row to decorative (empty alt) instead.

| Row (name) | Image field | Draft alt text | Notes |
|---|---|---|---|
| Baltimore Roundtable for Economic Democracy (BRED) | logo | Baltimore Roundtable for Economic Democracy | `[CHECK IMAGE]` for whether name is already a visible caption on the wall — if so, use empty/decorative instead |
| Neighborhood Design Center | logo | Neighborhood Design Center | same caveat |
| ReGEN Consulting Group | logo | ReGEN Consulting Group | same caveat |
| Civic Works Baltimore | logo | Civic Works Baltimore | same caveat |
| Chesapeake Bay Trust | logo | Chesapeake Bay Trust | same caveat |
| T.A.P. Inc. (The Arts Project) | logo | T.A.P. Inc. (The Arts Project) | same caveat |
| Baltimore Heritage | logo | Baltimore Heritage | same caveat |
| Baltimore Children & Youth Fund | logo | Baltimore Children & Youth Fund | same caveat |
| Spring Meadow Farms | logo | Spring Meadow Farms | same caveat |
| The 4th Brew | logo | The 4th Brew | same caveat |
| DeWalt | logo | DeWalt | same caveat |
| Catonsville Cooperative Market | logo | Catonsville Cooperative Market | same caveat |
| City Chill | logo | City Chill | same caveat |
| BMore Fresh | logo | BMore Fresh | same caveat |
| Maryland Nonprofits | logo | Maryland Nonprofits | same caveat |

## 7. Projects (4 rows — matches Projects.csv rows 2–5)

Each `heroImage` is the lead photo on a project detail page, where the project title is already the page heading directly above it — so the alt text should describe what the image actually shows rather than repeat the title (which would be redundant with the adjacent `<h1>`).

| Row (title) | Image field | Draft alt text | Notes |
|---|---|---|---|
| Oasis @ 240 | heroImage (`/media/oasis-opening-aerial.jpg`) | Aerial view of the Oasis @ 240 reclaimed lot, with native plantings and seating around the rain-catchment area | `[CHECK IMAGE]` — filename suggests an opening-day aerial; confirm framing matches |
| Community Center for Change | heroImage (`/media/mural-marketplace-1.jpg`) | Mural on the Community Marketplace building at 3932 Frederick Avenue | `[CHECK IMAGE]` — reused elsewhere (News row 1, hero for center-for-social-impact page); confirm same crop works here |
| Botanical Bus Stop | heroImage (`/media/cleangreen-1.jpg`) | Clean & Green crew member working at the future Botanical Bus Stop site | `[CHECK IMAGE]` — filename is a generic Clean & Green photo, not obviously the bus-stop site; confirm this is the right image for a "planned" project or swap for an actual site photo |
| Little Memorial Garden | heroImage (`/media/memorial-aerial.jpg`) | Aerial view of the Little Memorial Garden restoration, with raised beds and mural | `[CHECK IMAGE]` |

## 8. News (10 image slots across 8 rows — matches News.csv rows 2–9, thumb + photos gallery)

Each News row has one `thumb` plus a `photos` gallery (semicolon-separated). The article title sits directly above the thumb as the card heading, so alt text describes the photo's content, not a restatement of the headline. Gallery images get their own row each since they can differ in content from the thumb.

| Row (title) | Image field | Draft alt text | Notes |
|---|---|---|---|
| Making headlines: CCD's Community Marketplace | thumb (`/media/mural-marketplace-1.jpg`) | Mural on the Community Marketplace building at 3932 Frederick Avenue | `[CHECK IMAGE]` |
| Making headlines: CCD's Community Marketplace | photos: `/media/mural-marketplace-1.jpg` | Mural on the Community Marketplace building at 3932 Frederick Avenue | duplicate of thumb — same alt |
| Making headlines: CCD's Community Marketplace | photos: `/media/mural-marketplace-3.jpg` | Marketplace mural in progress on the Frederick Avenue building | `[CHECK IMAGE]` — distinct from the first image per filename ("3" vs "1"), confirm it shows a different stage/angle |
| Five Minute Histories features Irvington | thumb (`/media/irvington-sign.jpg`) | "Welcome to Historic Irvington 1874" mosaic sign | matches existing `heroAlt` used for the about page, reused here |
| Five Minute Histories features Irvington | photos: `/media/irvington-sign.jpg` | "Welcome to Historic Irvington 1874" mosaic sign | duplicate of thumb |
| Five Minute Histories features Irvington | photos: `/media/community-smile.jpg` | Neighbor smiling on the Irvington walking tour | `[CHECK IMAGE]` |
| Five Minute Histories features Irvington | photos: `/media/community-barbershop.jpg` | Tour group outside BMore Fresh Barbershop | matches existing gallery alt already used on the projects page for the same file |
| Seed & Plant Swap brings the market back | thumb (`/media/market-beds-flag.jpg`) | Produce beds beside the Farmers Market flag | matches existing gallery alt already used on the coop-market page for the same file |
| Seed & Plant Swap brings the market back | photos: `/media/market-beds-flag.jpg` | Produce beds beside the Farmers Market flag | duplicate of thumb |
| Seed & Plant Swap brings the market back | photos: `/media/market-compost.jpg` | Composting demonstration table at the Community Co-op Market | `[CHECK IMAGE]` |
| Summer Shoe Drive: give your old pairs a second life | thumb (`/media/shoedrive-shoes.png`) | Pairs of gently-worn shoes collected for the Summer Shoe Drive | `[CHECK IMAGE]` |
| Summer Shoe Drive: give your old pairs a second life | photos: `/media/shoedrive-boxes.jpg` | Shoe donation drop-off boxes at a collection site | `[CHECK IMAGE]` |
| Summer Shoe Drive: give your old pairs a second life | photos: `/media/shoedrive-flyer.png` | Summer Shoe Drive flyer with drop-off dates and locations | this is a flyer/graphic — if the drop-off details are already given as page text nearby, mark decorative instead; `[CHECK IMAGE]` |
| Memorial Garden community day draws the whole block | thumb (`/media/drone-garden-1.jpg`) | Aerial view of neighbors gathered at the Little Memorial Garden community day | matches existing `heroAlt` phrasing used for the donate page hero, adapted for this context |
| Memorial Garden community day draws the whole block | photos: `/media/drone-garden-1.jpg` | Aerial view of neighbors gathered at the Little Memorial Garden community day | duplicate of thumb |
| Memorial Garden community day draws the whole block | photos: `/media/drone-garden-2.jpg` | Aerial view of planting activity at the Little Memorial Garden | `[CHECK IMAGE]` |
| Memorial Garden community day draws the whole block | photos: `/media/drone-garden-3.jpg` | Aerial view of neighbors sharing food at the Little Memorial Garden | `[CHECK IMAGE]` |
| Cooperative Way — Irvington celebrates its new street name | thumb (`/media/event-coopway-1.jpg`) | The Cooperative Way street sign unveiling | matches existing `heroAlt` used for the news page hero, same file |
| Cooperative Way — Irvington celebrates its new street name | photos: `/media/event-coopway-1.jpg` | The Cooperative Way street sign unveiling | duplicate of thumb |
| Cooperative Way — Irvington celebrates its new street name | photos: `/media/event-coopway-2.jpg` | Neighbors and city officials at the Cooperative Way sign celebration | `[CHECK IMAGE]` |
| Cooperative Way — Irvington celebrates its new street name | photos: `/media/event-coopway-3.jpg` | Speaker at the CCD table during the Cooperative Way celebration | matches existing `heroAlt` used for the events page hero, same file |
| Together We Can Do Great Things mural unveiled at City Chill | thumb (`/media/community-together-5.jpg`) | Artist Latosha Maddox beside the "Together We Can Do Great Things" mural | matches existing gallery alt already used on the projects page for the same file |
| Together We Can Do Great Things mural unveiled at City Chill | photos: `/media/community-together-2.jpg` | "Together We Can Do Great Things" mural on the City Chill wall | matches existing `heroAlt` used for the what-is-a-coop page hero, same file |
| Together We Can Do Great Things mural unveiled at City Chill | photos: `/media/community-together-5.jpg` | Artist Latosha Maddox beside the "Together We Can Do Great Things" mural | duplicate of thumb |
| Together We Can Do Great Things mural unveiled at City Chill | photos: `/media/community-citychill.jpg` | The mural-painted exterior wall at City Chill | `[CHECK IMAGE]` |
| Community Marketplace mural takes shape on Frederick Ave | thumb (`/media/mural-marketplace-3.jpg`) | Marketplace mural in progress on the Frederick Avenue building | duplicate alt of the earlier `mural-marketplace-3.jpg` use |
| Community Marketplace mural takes shape on Frederick Ave | photos: `/media/mural-marketplace-1.jpg` | Mural on the Community Marketplace building at 3932 Frederick Avenue | reused alt, same file as above |
| Community Marketplace mural takes shape on Frederick Ave | photos: `/media/mural-marketplace-3.jpg` | Marketplace mural in progress on the Frederick Avenue building | duplicate of thumb |
| Clean & Green crews take on summer season bookings | thumb (`/media/cleangreen-crew.jpg`) | Clean & Green crew member operating a demolition hammer | matches existing gallery alt already used on the clean-and-green page for the same file |
| Clean & Green crews take on summer season bookings | photos: `/media/cleangreen-1.jpg` | Clean & Green crew at a job site | `[CHECK IMAGE]` — generic filename, confirm actual content |
| Clean & Green crews take on summer season bookings | photos: `/media/cleangreen-sidewalk.jpg` | Clean & Green crew and loaded work truck on a sidewalk job | matches existing gallery alt already used on the clean-and-green page for the same file |
| Clean & Green crews take on summer season bookings | photos: `/media/cleangreen-garden-wide.jpg` | Clean & Green crew transforming a community garden beside the "Together We Can" mural | matches existing `heroAlt` used for the clean-and-green page hero, same file |
| Clean & Green crews take on summer season bookings | photos: `/media/cleangreen-2.jpg` | Clean & Green crew member at outdoor maintenance work | `[CHECK IMAGE]` — generic filename, confirm actual content |

News row count: 8 titles, matching News.csv rows 2–9. Image slots covered: 8 thumbs + 25 gallery entries (photos column parsed by splitting on `;`) = 33 image references total, all listed above.

## 9. BeforeAfterPairs (2 rows × 2 images = 4 drafts — matches BeforeAfterPairs.csv rows 2–3)

Per the rule, before and after images each carry distinct information — no shared "before"/"after" label alone.

| Row (label) | Image field | Draft alt text | Notes |
|---|---|---|---|
| Full yard & exterior transformation | beforeImage (`/media/ba1-before.jpg`) | Overgrown, cluttered yard and exterior before the Clean & Green job | `[CHECK IMAGE]` — describes the implied "before" state from the label; confirm specifics (weeds, debris, etc.) match the photo |
| Full yard & exterior transformation | afterImage (`/media/ba1-after.jpg`) | Cleared, landscaped yard and tidy exterior after the Clean & Green job | `[CHECK IMAGE]` |
| Foundation beds & fresh planting | beforeImage (`/media/ba2-before.jpg`) | Bare, weed-covered foundation beds before planting | `[CHECK IMAGE]` |
| Foundation beds & fresh planting | afterImage (`/media/ba2-after.jpg`) | Freshly planted foundation beds with new mulch and greenery | `[CHECK IMAGE]` |

## 10. Hero images (17 — from `velo/siteData.js`, `heroAlt` field)

**These 17 alt texts already exist in the codebase and are pre-approved copy — nobody wrote anything new here. The old renderer never read `heroAlt`, so none of this text has ever reached a screen-reader user.** The only work needed is re-typing/pasting each value into the corresponding hero image's `altText` field in the Wix Editor. Do not treat these as drafts needing review — treat them as a data-entry task, except where "Verdict" below flags one for improvement.

| Page (slug) | Existing `heroAlt` value | Verdict |
|---|---|---|
| about | Welcome to Historic Irvington 1874 mosaic sign — where houses become homes and neighbors become friends | Good as-is |
| what-is-a-coop | Together We Can Do Great Things mural | Good as-is |
| team | Neighbors and members gathered on an Irvington walking tour | Good as-is |
| partners | Aerial view over the Irvington neighborhood | Good as-is |
| programs | Clean and Green crew member at work beside the We Can mural | Good as-is |
| coop-market | Smiling vendors at their stocked co-op market table under the tents | Good as-is |
| tool-bank | Young gardener with gloves, wheelbarrow, and trowel at the community beds | Good as-is |
| center-for-social-impact | 3932 Frederick Avenue with the community marketplace mural | Good as-is |
| clean-and-green | Clean and Green crew transforming a community garden beside the Together We Can mural | Good as-is |
| projects | Aerial view of a reclaimed green path in Irvington | Good as-is |
| membership | Artist beside the Together We Can Do Great Things mural | Good as-is |
| brick-campaign | Aerial view of the community gathered at a brick building | Needs improving — "a brick building" is vague and doesn't say which building or why it matters. Better: "Aerial view of the community gathered at 3932 Frederick Avenue, future Center for Social Impact" |
| news | The Cooperative Way street sign unveiling | Good as-is |
| events | Speaker at the CCD table during the Cooperative Way celebration | Good as-is |
| donate | Aerial view of a CCD community day | Needs improving — too generic to distinguish from the other three aerial-drone hero alts on this list. Better: "Aerial view of neighbors gathered at the Little Memorial Garden community day" (matches the actual file, `drone-garden-1.jpg`, used identically in News) |
| volunteer | Smiling youth volunteer kneeling among the community garden beds | Good as-is |
| contact | The CCD building at 4004 Frederick Avenue with its painted logo and crew outside | **Correct as-is — do not change.** Verified: CCD has two Frederick Avenue addresses. **4004** is CCD's own address (the contact address in `siteConfig`), and **3932-3934** is the separate Center for Social Impact project building. Both are right; they are different buildings. |

## 11. SupporterLogos review (29 rows — matches SupporterLogos.csv rows 2–30)

Context: SupporterLogos already has an `alt` column (not `altText`) with 29 entries — CMS-SCHEMA.md Part 3.3 flags a naming-consistency question about renaming this to `altText`; leave that decision to the schema owner, not addressed here. All 29 existing values are the plain organization name, e.g. "Baltimore Heritage," "DTLR," "Mount Saint Joseph High School" — these are already correct in form per the logo rule (name = alt text) and none read as weak, vague, or filler ("logo," "image," "graphic"). None are flagged as weak.

The open question is the decorative exception: if the SupporterLogos wall renders each org's name as visible on-page text next to its logo (a captioned logo grid), every one of these 29 should switch to empty/decorative alt instead, per the redundancy rule in `ACCESSIBILITY.md` Section 4.3. This can't be determined from the CSV alone — `[CHECK IMAGE]` applies to the page layout, not the individual images.

| Verdict | Count | Rows |
|---|---|---|
| Fine as-is (assuming no adjacent name caption on the wall) | 29 | All rows: Mount Saint Joseph High School, BMORE Beautiful, DTLR, Spartan Defense Security Solutions, Morina Enterprise, Royal Event Center, Kingdom Nation, Passionately Yours, New Life Changing Christian Center, Friends of Southwest Parks, Nature Sacred, Pleasant Grove Baptist Church, University of Maryland Extension, Blue Water Baltimore, The Nolita Project, Schreiber Brothers, Charismatic Consulting LLC, Angels Helping Angels, Plantation Park Heights Urban Farm, St. Joseph Baltimore Neighborhood Association, J&G Property Solutions, Shubie Doo Demo, Kre8ing Your Ideas, The Board Room Chess, For My Kidz, Word 4 Life Ministries, UAME Church, Equalyze, Francis Group |
| Weak | 0 | none |
| Should be empty/decorative if names are shown as visible captions | 29 (conditional — check the live wall layout) | same 29, `[CHECK IMAGE]` on page layout only |

## 12. Patterns to reuse (for new images going forward)

| Image type | Pattern | Example |
|---|---|---|
| Staff/team headshot | `[Name], [Role], CCD` | "Johnny Martin Jr., Chief Executive Officer, CCD" |
| Staff/team photo, doing something | `[Name], [Role], [action]` | "Francis, Clean & Green Lead, leading a crew at a sidewalk job" |
| Partner/funder logo, no adjacent name text | `[Org name]` | "Baltimore Heritage" |
| Partner/funder logo, name already shown as caption | Empty alt, marked decorative | — |
| Project hero image | Describe what's shown, not the project title again (title is the adjacent heading) | "Aerial view of the Oasis @ 240 reclaimed lot with native plantings" |
| News thumb/gallery photo | Describe the specific scene, not the headline again | "Composting demonstration table at the Community Co-op Market" |
| Before/after pair | Two separate alts, each describing the actual visible state | "Overgrown yard before cleanup" / "Cleared, landscaped yard after cleanup" |
| Purely decorative image (background texture, spacer) | Empty alt, marked decorative | — |
| Flyer/graphic whose text is repeated elsewhere on the page | Empty alt, marked decorative; if not repeated, describe what the flyer communicates | "Summer Shoe Drive flyer with drop-off dates and locations" |

---

## One real inconsistency found while drafting these

The Center for Social Impact building is written **both** ways across the site copy:

- `3932 Frederick Avenue` — 4 occurrences
- `3932-3934 Frederick Avenue` — 5 occurrences

Both refer to the same building. Pick one and use it everywhere, including in alt text. `3932-3934 Frederick Avenue` is the more complete and appears slightly more often, so it is the better default — but this is CCD's call, since the deed or signage may favour one.

Separately, and **not** an error: CCD's own address is **4004 Frederick Ave** (in `siteConfig.contact`). That is a different building from 3932-3934. Do not "correct" one to the other.

Add the chosen form to `CONTENT-STYLE-GUIDE.md` Part 5 so it stays consistent as staff write new copy.
