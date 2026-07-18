# CCD Website Rebuild - Orchestration Ledger

## Goal
Implement the public CCD website from `building-the-block-prototype/project/*.dc.html` in the live `ccd-website/` Next 16 app.

## Contract
- Scope: full public site only. Do not expose `WixHandoff.dc.html` as a public route.
- Source of truth: `About.dc.html` first, then shared header/footer and the remaining public prototype pages.
- App approach: static-first Next App Router, local seed data, copied real media under `public/media`.
- Integrations: keep payment, email automation, booking, CMS, and fundraising checkout as links or local success states until real credentials/URLs are provided.
- Google Stitch workaround: maintain `ccd-website/ccd-stitch-handoff.html` as a single uploadable file with route map, tokens, and embedded media thumbnails.

## Dispatch Log
- Main: read README, prototype inventory, shared header/footer, current Next app, local Next docs.
- Token scout: returned route/media/interaction inventory for all `.dc.html` public pages.
- Main: implemented static Next site components, routes, CSS, media copy, and Stitch handoff file.

## Acceptance Checks
- `npm run lint`
- `npm run build`
- Browser smoke on `/`, `/about`, `/news`, `/clean-and-green`, `/contact`
- Screenshot inspection against accepted prototype HTML design files

## Verdict
Accepted after local verification: lint/build passed, all public routes returned 200, media/video URLs returned 200, and Edge screenshots were inspected against the About prototype.
