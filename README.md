# CCD — Cooperative Community Development Inc.

A Baltimore member-owned cooperative building food access, green space, local
services, and community-owned infrastructure in Irvington (21229).

Founded 2020 · 4004 Frederick Ave, Baltimore MD 21229 · info@ccdgroup.org · (410) 205-2488

| | |
|---|---|
| **The site** | https://ccdgroup.org |
| **Edit the site (CCD staff)** | https://ccdgroup.org/admin — guide: [docs/EDITING-THE-WEBSITE.md](docs/EDITING-THE-WEBSITE.md) |

> ⚠️ **The CMS needs two setup steps before editors can use it** — see
> [docs/CMS-SETUP.md](docs/CMS-SETUP.md). Until they are done, saves will not reach the site.

The site runs on **Cloudflare Workers**, not Vercel: Vercel's free plan forbids
asking for donations, and a paid plan is a bill that can lapse once the developer
is gone. The move, including what happens to CCD's email when the domain's DNS
changes hands, is written up in [docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md).

## Start here

```bash
cd ccd-website
npm install
npm run dev      # http://localhost:3000
```

That is the website. `ccd-website/README.md` explains how it is built — read it
before changing anything in there.

## What is in this repo

```
ccd-website/       THE WEBSITE — Next.js 16, deployed to Vercel
wix-migration-kit/ The Wix Studio build: guide, CMS seed CSVs, and the handoff
                   kit written for non-technical CCD staff
docs/              Plans, content audits, the shoe-drive posting guide, meeting notes
assets/            Flyers, event slides, campaign graphics
scripts/           Media organizer + content/link/contrast audit tooling
building-the-block-prototype/  Early static HTML design prototype
.agent-orchestration/          Working logs — read HANDOFF.md before picking up
                               anything half-finished
```

Not in version control (61GB+ of originals, kept locally):
`Cooperative Community Development Inc/`, `website-media-filebase/`, `Shoe Drive CCD/`.

### Two sites, one repo

There are two builds of the CCD site here, and they are not the same thing:

- **`ccd-website/`** — the Next.js rebuild. This is where new work goes.
- **`wix-migration-kit/`** — everything for the Wix Studio site that currently
  serves `ccdgroup.org`, including a handbook so staff can edit it without a
  developer.

Most of this repo's commit history is Wix work. The Next.js app was folded in on
2026-08-06; its earlier history is preserved at
`.agent-orchestration/ccd-website-git-history.txt`.

## The site at a glance

**21 pages**, all generated through four route files from JSON content in
`ccd-website/content/`. CCD staff edit that content at **/admin** — pages, blocks,
photos, menus, and contact details — with no code and no git. Every save is a commit,
so anything can be reverted. Runtime dependencies are exactly three: `next`, `react`,
`react-dom`.

Sections include the CCD programs — Center for Social Impact, Clean & Green, Co-op
Market, Tool Bank — plus projects, membership, events, and **The 4th Brew**, CCD's
coffee brand, whose store, story, and brewing guide now live on this site with
Shopify acting only as the checkout backend.

## Rules worth knowing before you edit

**Colour.** Gold `#fec630` on white is 1.57:1 and fails WCAG AA. Gold is a fill behind
dark text, or text on dark — never text on a light background. Eyebrows on light use
`#8a6d00`. The same applies to The 4th Brew tan `#c2b27f`. Measured table for every
token pair: `.agent-orchestration/HANDOFF.md`.

**Two addresses, both correct.** 4004 Frederick Ave is CCD's own address.
3932-3934 Frederick Ave is the Center for Social Impact. They are different
buildings — this is not a typo to fix.

**Shopify.** `siteConfig.links.brewShop` must point at Shopify's *primary* domain.
Shopify redirects every cart link to whatever that is, so retiring `the4thbrew.com`
before moving the primary domain to `shop.the4thbrew.com` would break every checkout.

## Scripts

Run from the repo root; the Python scripts resolve paths relative to it.

| Script | Does |
|---|---|
| `scripts/organize_ccd_media.py` | Builds `website-media-filebase/` + catalog from the shared drive. Copy-only, never moves originals. |
| `scripts/create_stitch_upload_files.py` | Generates Google Stitch upload boards from the catalog. |
| `scripts/export_page_copy.mjs` | Turns `wix-migration-kit/velo/siteData.js` into paste-ready copy packets. |
| `scripts/audit_content.mjs` | Heading outlines + link-text audit. |
| `scripts/check_handoff_links.mjs` | Validates every relative link in the handoff kit. |
| `wix-migration-kit/handoff/contrast-check.js` | WCAG regression guard. Exits 1 if a prescribed colour fix is reverted. |
