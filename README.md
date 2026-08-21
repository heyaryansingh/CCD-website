# CCD — Cooperative Community Development Inc.

A Baltimore member-owned cooperative building food access, green space, local
services, and community-owned infrastructure in Irvington (21229).

Founded 2020 · 4004 Frederick Ave, Baltimore MD 21229 · info@ccdgroup.org · (410) 205-2488

| | |
|---|---|
| **CCD staff — start here** | **[HANDOFF.md](HANDOFF.md)** |
| The live site (Wix, for now) | https://ccdgroup.org |
| The rebuilt site | https://ccdgroup.vercel.app |
| Edit the site, no code needed | `/admin` — guide: [docs/EDITING-THE-WEBSITE.md](docs/EDITING-THE-WEBSITE.md) |

> ⚠️ **Three things are unfinished** and each is written up for whoever picks it
> up: the contact forms reach nobody ([docs/CMS-SETUP.md](docs/CMS-SETUP.md) step
> 4), `ccdgroup.org` still points at Wix
> ([docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md)), and the code lives
> on a departing developer's personal GitHub account
> ([HANDOFF.md](HANDOFF.md), item 1). The last of those is the urgent one.

The rebuilt site targets **Cloudflare Workers**, not Vercel: Vercel's free plan
forbids asking for donations, and a paid plan is a bill that can lapse once the
developer is gone. That move — including what protects CCD's email when the
domain's DNS changes hands — is [docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md).
Its finished code is on the **`cloudflare-cutover`** branch, deliberately kept off
`main` until CCD is ready to switch.

## Start here

```bash
cd ccd-website
npm install
npm run dev      # http://localhost:3000
npm run check    # typecheck + tests + build; must pass before you push
```

That is the website. `ccd-website/README.md` explains how it is built — read it
before changing anything in there.

## What is in this repo

```
ccd-website/    THE WEBSITE — Next.js 16. Everything the public sees.
docs/           Editing guide, setup steps, the domain move, developer notes
assets/         CCD flyers, event slides, campaign graphics
scripts/        Media organiser, content audit, colour-contrast guard
```

Not in version control (61GB+ of originals, kept on CCD's shared drive):
`Cooperative Community Development Inc/`, `website-media-filebase/`, `Shoe Drive CCD/`.

Most of this repo's older commit history is Wix Studio work. The Wix migration kit
and an early HTML design prototype were removed at the 2026-08-21 handoff and are
recoverable from git history. The Next.js app was folded in on 2026-08-06; its
earlier history is preserved at `docs/ccd-website-git-history.txt`.

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
`#8a6d00`. The same applies to The 4th Brew tan `#c2b27f`. Run
`node scripts/contrast-check.js` for the measured table and the regression guard.

**Two addresses, both correct.** 4004 Frederick Ave is CCD's own address.
3932-3934 Frederick Ave is the Center for Social Impact. They are different
buildings — this is not a typo to fix.

**Shopify.** `siteConfig.links.brewShop` must point at Shopify's *primary* domain.
Shopify redirects every cart link to whatever that is, so retiring `the4thbrew.com`
before moving the primary domain to `shop.the4thbrew.com` would break every checkout.

More of this kind of thing: [docs/DEVELOPER-NOTES.md](docs/DEVELOPER-NOTES.md).

## Scripts

Run from the repo root; the Python script resolves paths relative to it.

| Script | Does |
|---|---|
| `scripts/contrast-check.js` | WCAG regression guard. Exits 1 if a prescribed colour fix is reverted. |
| `scripts/organize_ccd_media.py` | Builds `website-media-filebase/` + catalog from the shared drive. Copy-only, never moves originals. |
