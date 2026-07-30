# CCD CMS Schema Reference

Authoritative reference for every Wix CMS collection on the CCD site: what each field holds, which fields are required, and what still needs to change before launch.

## Part 1 — How to read this

**Field values are safe to edit; field names are not.** Renaming a field silently breaks every page element bound to it — the breakage shows up as blank space on the live site, not as an error.

---

## Part 2 — Collections

### Team (7 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `name` | Text | Yes | Full name of the team member | `Johnny Martin Jr.` |
| `role` | Text | Yes | Job title, shown in caps on the site | `CHIEF EXECUTIVE OFFICER` |
| `tagline` | Text | Yes | One-line summary shown under the role | `Founder and visionary driving CCD's cooperative model.` |
| `bio` | Rich Text | Yes | Full biography paragraph | `Johnny Martin Jr. is an Irvington native who founded...` |
| `quote` | Text | No | Optional pull-quote from the person | `"The community does not need saving from outside..."` |
| `email` | Text | No | Public contact email | `johnny@ccdgroup.org` |
| `photo` | Image | No | Headshot | (currently blank for all rows) |
| `order` | Number | Yes | Display order, ascending | `1` |
| `isActive` | Boolean | Yes | Whether the person shows on the live site | `TRUE` |

### Interns (6 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `name` | Text | Yes | Full name | `Aryan` |
| `role` | Text | Yes | Program track/title, shown in caps | `STRATEGY & DIGITAL` |
| `bio` | Rich Text | Yes | Short bio paragraph | `Aryan joined CCD as a Strategy & Digital intern...` |
| `email` | Text | No | Contact email | `info@ccdgroup.org` |
| `photo` | Image | No | Headshot | (currently blank for all rows) |
| `order` | Number | Yes | Display order, ascending | `1` |
| `cohort` | Text | Yes | Which internship cohort/season | `Summer 2026` |
| `isActive` | Boolean | Yes | Whether the person shows on the live site | `TRUE` |

### Partners (15 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `name` | Text | Yes | Partner organization name | `Baltimore Roundtable for Economic Democracy (BRED)` |
| `description` | Text | Yes | One-line description of the relationship | `Supported CCD's acquisition of the Jarbo Brothers facility...` |
| `url` | URL | No | Partner's website | `https://www.baltimoreroundtable.org` |
| `category` | Text | Yes | Grouping label used to filter/sort logos on the page | `funder` |
| `logo` | Image | No | Partner logo | (currently blank for all rows) |

### MembershipTiers (5 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `name` | Text | Yes | Tier name | `Resident` |
| `price` | Text | Yes | Recurring price, kept as text to allow `$20/mo` formatting | `$20/mo` |
| `setup` | Text | No | One-time setup fee text | `+$5 setup` |
| `eligibility` | Text | Yes | Who qualifies for this tier | `Live, work, or worship in the 21229` |
| `benefits` | Text | Yes | Semicolon-separated list of benefits rendered as a bullet list | `FREE Tool Bank access; 15% off Clean & Green; ...` |
| `vote` | Boolean | Yes | Whether this tier gets a governance vote | `TRUE` |
| `featured` | Boolean | Yes | Whether this tier is visually highlighted as the recommended option | `TRUE` |
| `order` | Number | Yes | Display order, ascending | `2` |

### News (9 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `meta` | Text | Yes | Category/kicker label shown above the title. `> VERIFY: confirm this is a free-text category tag and not meant to double as a publish date — current values look like source/section labels (e.g. "PRESS", "PRESS - BALTIMORE HERITAGE"), not dates.` | `PRESS - BALTIMORE HERITAGE` |
| `title` | Text | Yes | Headline | `Making headlines: CCD's Community Marketplace` |
| `thumb` | Image | Yes | Thumbnail/hero image path | `/media/mural-marketplace-1.jpg` |
| `excerpt` | Text | Yes | Short summary shown in list/preview view | `CCD's Community Marketplace and the transformation of Frederick Avenue draw press attention.` |
| `body` | Rich Text | Yes | Full article text | `CCD's Community Marketplace project and the broader transformation...` |
| `photos` | Gallery | No | Semicolon-separated list of additional image paths | `/media/mural-marketplace-1.jpg; /media/mural-marketplace-3.jpg` |
| `instructions` | Text | No | Optional semicolon-separated list of reader instructions (currently empty on all rows) | (blank) |
| `contactEmail` | Text | No | Contact for questions about the story (currently empty on all rows) | (blank) |

### Events (3 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `title` | Text | Yes | Event name | `Community Co-op Market` |
| `date` | Text | Yes | Short date shown on the card. `> VERIFY: confirm this stays free-text ("Jul 18") rather than a Date/Time field — free-text avoids year ambiguity for recurring events but won't sort chronologically.` | `Jul 18` |
| `day` | Text | Yes | Day of week, shown in caps | `SATURDAY` |
| `timeText` | Text | Yes | Time range as displayed text, not a machine time value. `> VERIFY: confirm this is intentionally free-text and not meant to feed a calendar/reminder integration.` | `9:00 AM - 2:00 PM` |
| `location` | Text | Yes | Address or meeting point | `4004 Frederick Ave, Baltimore, MD 21229` |
| `cost` | Text | Yes | Cost/admission text | `Free to attend - no ticket needed` |
| `tag` | Text | Yes | Badge label shown on the card. `> VERIFY: confirm this is a display badge (e.g. "FREE - ALL AGES") and not meant to be a filter/category field like Partners' `category`.` | `FREE - ALL AGES` |
| `blurb` | Text | Yes | Short summary for list view | `Local produce, neighborhood makers, and live music on the block.` |
| `body` | Rich Text | Yes | Full event description | `Local produce, neighborhood makers, and live music on the block. CCD's table will have...` |
| `thumb` | Image | Yes | Thumbnail/hero image path | `/media/market-vendors-table.jpg` |
| `photos` | Gallery | No | Semicolon-separated list of additional image paths | `/media/event-coopway-1.jpg; /media/event-coopway-2.jpg; ...` |
| `instructions` | Text | No | Semicolon-separated list of attendee instructions | `Just show up - no registration needed to shop or browse.; Bring a reusable bag...` |
| `contactEmail` | Text | No | Contact for questions about the event | `theREC@ccdgroup.org` |

### Projects (4 rows)

Drives the "Projects (Item)" dynamic page. `slug` must stay unique and URL-safe — changing a slug breaks any existing link to that project. Current slugs: `oasis-240`, `community-center`, `bus-stop`, `memorial-garden`.

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `title` | Text | Yes | Project name | `Oasis @ 240` |
| `slug` | Text | Yes | URL segment for the dynamic page — must be unique, lowercase, hyphenated, no spaces | `oasis-240` |
| `status` | Text | Yes | Project status badge | `COMPLETED` |
| `location` | Text | Yes | Address | `240 S MONASTERY AVE` |
| `summary` | Rich Text | Yes | Project description | `Once a poorly-maintained, illegally-dumped city lot...` |
| `heroImage` | Image | Yes | Main project image | `/media/oasis-opening-aerial.jpg` |
| `order` | Number | Yes | Display order, ascending | `1` |

### SiteLinks (7 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `key` | Text | Yes | Internal identifier code referenced by site elements — do not change once wired to a button/link | `paypalDonate` |
| `url` | URL | Yes | Destination URL | `https://www.paypal.com/donate/?hosted_button_id=D4UMVJ4YRXDQE` |
| `label` | Text | Yes | Human-readable link text shown on the site | `PayPal donate` |

### ServiceDirectory (6 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `area` | Text | Yes | Program/service area name | `Community Market` |
| `person` | Text | Yes | Staff contact's name | `Marquita Fullard` |
| `title` | Text | Yes | Staff contact's job title | `Events Manager` |
| `email` | Text | Yes | Staff contact's email | `theREC@ccdgroup.org` |

### SupporterLogos (29 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `src` | Image | Yes | Logo image path | `/media/logo-mt-st-joseph.png` |
| `alt` | Text | Yes | Alt text describing the logo, for screen readers | `Mount Saint Joseph High School` |

### BeforeAfterPairs (2 rows)

| Field | Type | Required | What goes in it | Example |
|---|---|---|---|---|
| `label` | Text | Yes | Caption describing the transformation shown | `Full yard & exterior transformation` |
| `beforeImage` | Image | Yes | "Before" photo | `/media/ba1-before.jpg` |
| `afterImage` | Image | Yes | "After" photo | `/media/ba1-after.jpg` |

### Testimonials (0 rows, no fields defined yet)

See Part 3.2 for the proposed schema.

---

## Part 3 — Changes to apply before launch

### 3.1 Add `altText` to every collection holding an image

Required for WCAG 2.1 AA. A required CMS field beats a reminder to set alt text in the Media Manager because a required column gets filled — a reminder gets skipped.

| Collection | Image field(s) | New field(s) to add |
|---|---|---|
| Team | `photo` | `altText` (Text, required) |
| Interns | `photo` | `altText` (Text, required) |
| Partners | `logo` | `altText` (Text, required) |
| Projects | `heroImage` | `altText` (Text, required) |
| News | `thumb`, `photos` | `thumbAltText` (Text, required), `photosAltText` (Text, required) |
| BeforeAfterPairs | `beforeImage`, `afterImage` | `beforeAltText` (Text, required), `afterAltText` (Text, required) |

News and BeforeAfterPairs each hold two separate pictures, so one description can't serve both — that's why each gets its own alt field rather than a single shared `altText`.

SupporterLogos already has `alt` — this is the model to copy for naming/behavior on the collections above.

> VERIFY: should SupporterLogos' `alt` be renamed to `altText` for naming consistency with the new fields above? Only do this if nothing on the live site is currently bound to `alt` — otherwise leave it as `alt` (see 3.3 on renaming live fields).

### 3.2 Define the Testimonials schema

| Field | Type | Required | Why |
|---|---|---|---|
| `quote` | Rich Text | Yes | The testimonial text — the core content |
| `personName` | Text | Yes | Who said it — needed for credibility |
| `personRole` | Text | No | Their relationship to CCD (member, resident, partner) — adds context, not always known |
| `photo` | Image | No | Optional headshot |
| `altText` | Text | Required if `photo` is set | Alt text for the photo, same reasoning as 3.1 |
| `order` | Number | Yes | Display order, ascending |
| `isActive` | Boolean | Yes | Show/hide without deleting |

`order` and `isActive` intentionally match Team's convention so staff learn one pattern for sorting and visibility, not a different one per collection.

### 3.3 Consistency notes

The existing collections disagree with each other in naming and visibility conventions. Recommendation for all of these: **leave it alone unless nothing is bound yet.** Consistency is not worth a broken page — renaming a live field is the single easiest way for a nontechnical team to break the site.

| Disagreement | Detail | Recommendation |
|---|---|---|
| Image field naming | Team/Interns use `photo`, News uses `thumb`, Projects uses `heroImage`, Partners uses `logo` | Leave — these names likely aren't accidental (thumbnail vs. hero vs. logo semantics), and renaming risks breaking bound repeaters. `> VERIFY: confirm none of these are bound to page elements yet before considering a rename.` |
| Visibility handling | Team/Interns use `isActive` + `order`; Partners and MembershipTiers have no `isActive` field | Leave — Partners/MembershipTiers currently rely on deleting a row to hide it (see Part 4 for why this is riskier). Adding `isActive` to those collections is a safe *addition*, not a rename, so it can be done without breaking anything. |
| Category/date-ish fields | News uses `meta`, Events uses `date`/`day`/`timeText` for similar "when/what kind" purposes | Leave — these fields serve different data models by design (News is chronology-agnostic, Events is schedule-driven). Do not try to unify them. |

---

## Part 4 — Sort order and visibility conventions

- `order` (ascending) controls display order on the page.
- `isActive` = `FALSE` hides a row without deleting it.

**Default to hiding over deleting.** Site History does not restore CMS rows — unchecking `isActive` is recoverable at any time; a deleted row may not be.

---

## Part 5 — Backups

Automatic weekly CMS backups run by Wix, plus a manual backup before any bulk change or deletion. Reference: [Wix — CMS: Restoring a Deleted Collection](https://support.wix.com/en/article/cms-formerly-content-manager-restoring-a-deleted-collection)
