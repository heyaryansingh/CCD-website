# 02 — CMS Collections (staff-editable content)

Create in Wix Studio → CMS → Create Collection. Field names below are exact.
Seed rows come from `ccd-website/lib/siteData.ts` (the authoritative copies).
**This is what makes the site non-technical-friendly: staff add/edit rows; pages update automatically.**

## 1. `Team` (leadership — bind to Team page grid, sorted by `order`)
| Field | Type | Notes |
|---|---|---|
| name | Text | |
| role | Text | uppercase display |
| tagline | Text | one-liner on card |
| bio | Rich Text | modal/expander body |
| quote | Text | optional |
| email | Text | optional |
| photo | Image | optional — card falls back to initials avatar |
| order | Number | sort key |
| isActive | Boolean | uncheck to hide without deleting |

Seed 6 rows: Johnny Martin Jr. (CEO), Robert Morina IV (Operations), Tracy (Community Programs), Arianna (Engagement), Francis (Clean & Green), Marquita (Market & Events) — bios in `siteData.ts` `leadership`.

**Space management:** bind to a responsive repeater (3-col desktop / 2 tablet / 1 mobile) with no item cap — grid reflows as rows are added. Photos optional so new hires appear immediately.

## 2. `Interns` (same fields as Team + `cohort` Text)
Seed: Aryan (Strategy & Digital, summer 2026) + 5 open-role rows (name empty, role set: Programs, Marketing & Comms, Community Outreach, Design & Media, Clean & Green). Empty `name` renders "Open Position" style card.
**Space management:** repeater shows first 6, "Show all roles" expands (Studio interaction: collapse/expand strip). Adding 20 interns later never crowds the page.

## 3. `Projects` (drives /projects grid AND the dynamic detail pages)
| Field | Type |
|---|---|
| title | Text |
| slug | Text (URL) |
| status | Text: Completed / In Progress / Planned |
| location | Text |
| summary | Text |
| body | Rich Text |
| bullets | Tags |
| heroImage | Image |
| galleryImages | Media Gallery |
| order | Number |

Seed 4 rows from `siteData.ts` `projectDetails`: oasis-240, community-center, bus-stop, memorial-garden (copy + media filenames included there).
Create a **dynamic page** `/projects/{slug}` bound to this collection.

## 4. `News`
id/meta(Text)/title/thumb(Image)/excerpt/body(Rich Text)/photos(Gallery)/publishDate(Date). Seed 6 rows from `news` array.

## 5. `Events`
title/date(Date)/day/timeText/location/tag/tagColor/blurb/body/thumb(Image)/photos(Gallery)/registrationUrl(Text, optional). Seed 3 rows from `events` array. Bind to /events + /news upcoming strip, sorted by date, filter future-only for "upcoming".

## 6. `Partners`
name/description/url/category(Text: funder|design|community|program|member)/logo(Image, optional — falls back to name card). Seed 13 rows from `partners` array.

## 7. `MembershipTiers`
name/price/setup/eligibility/benefits(Tags)/vote(Boolean)/featured(Boolean)/order. Seed the 5 REAL tiers: Non-Resident $10, Resident $20 (featured, vote), Small Org $100 (vote), Medium Org $250 (vote), Large Org $400 (vote) — all "+$5 setup". Also mirrored in Pricing Plans (05); this collection drives the comparison display.

## 8. `Testimonials`
quote/name/role/photo(Image, optional)/isApproved(Boolean). Seed EMPTY — never invent quotes. Page section shows "Share your story" CTA when the collection has no approved rows (same behavior as the Next.js build).

## 9. `BeforeAfterPairs`
label/beforeImage/afterImage/jobType. Seed EMPTY — the current media library has no true pairs. Export the real before/after photos from the OLD Wix site (/work page, IMG_18xx/19xx series, via its Media Manager) into this collection; the Clean & Green slider section is set to collapse when empty.

## 10. `SiteLinks` (the Wix mirror of `lib/siteConfig.ts` — one place staff fix a link)
| Field | Type |
|---|---|
| key | Text (e.g. paypalDonate, brickCampaign, facilitiesBooking, cleanGreenEstimate, vendorRegistration, facebook, instagram, membershipSignup, privacyPolicy) |
| url | Text |
| label | Text |

Seed with the values in `lib/siteConfig.ts`. Buttons across the site bind to this collection (or, where binding is impractical, 04 lists every button that must be updated when a link changes).

## 11. Form submissions
Wix Forms auto-creates collections per form — no manual schema needed (04). Existing Supabase rows (if any collected pre-migration) can be exported CSV → imported into the matching Wix collections.
