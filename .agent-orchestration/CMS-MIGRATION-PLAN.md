# Plan — git-based CMS for the CCD site

## Context

CCD staff can currently edit nothing. Every word on the site lives in
`ccd-website/lib/siteData.ts`, a 1,800-line TypeScript file where one stray comma
breaks the build. `HANDOFF.md` assumes the developer leaves; "email Aryan to change
the hours" is not a handover.

Goal: staff add, edit, delete, reorder, and restructure pages and media through a web
UI, with no git, no code, and no ability to break the build. Payments and contact
forms keep working. Mobile works for both visitors and editors.

## Decision: Sveltia CMS

Git-based, so every edit is a commit — free history, diffs, and one-click revert,
which matters when editors are volunteers and interns.

Chosen over Decap (its config-compatible predecessor) because Sveltia is actively
developed, has a 5× smaller bundle, and explicitly supports mobile browsers — Decap's
long-standing gaps are the reason Sveltia exists. Chosen over Sanity/Contentful
because it adds no vendor, no account, and no monthly cost, and content stays in the
repo.

**Restructuring is the feature that makes this work.** Sveltia's `list` field with
`types` renders a mixed list where each item picks its own shape, with drag-to-reorder,
duplicate, and insert-above/below. Its `typeKey` defaults to `"type"` — already the
discriminant of our `Section` union. Page sections map across with no renaming.

## Architecture

### Why the content splits two ways

`lib/siteData.ts` is imported by `ClientBits.tsx`, which is `"use client"`. Any `fs`
call in that import chain breaks the client bundle. So:

| Content | Storage | Loaded by |
|---|---|---|
| **Pages** (21) + project pages (4) | one JSON file each, `content/pages/*.json` | `fs` in a server-only module |
| **Collections** (news, events, team, …) | one JSON file per collection, holding a list | static `import` — safe in client components |
| **Settings** (links, contact, social) | `content/settings.json` | static `import` |
| **Navigation** | `content/navigation.json` | static `import` |

Pages get a folder collection so staff can **create and delete whole pages** —
`generateStaticParams` reads the directory, so a new file becomes a new route on the
next build. Collections stay single-file so client components can import them.

`SiteHeader` is a client component that currently derives active nav from `pages`.
`app/layout.tsx` is a server component, so it will read the page list and pass a
`slug → activeNav` map down as a prop. No `fs` crosses the client boundary.

### File layout

```
ccd-website/
  content/
    settings.json              external links, contact details, socials
    navigation.json            nav groups, simple links, footer columns
    pages/<slug>.json          21 pages: hero + sections[]
    projects/<slug>.json       4 project detail pages
    collections/
      news.json  events.json  team.json  interns.json  partners.json
      supporters.json  directory.json  membership-tiers.json
      cleangreen-services.json  testimonials.json  project-pins.json
      before-after.json  home-hero.json
      brew-products.json  brewing-methods.json
  lib/
    siteData.ts                types + collections (client-safe imports)
    pages.server.ts            fs page loading (server only)
  public/admin/
    index.html                 Sveltia CMS shell
    config.yml                 the CMS schema
  app/api/auth/route.ts        OAuth start
  app/api/auth/callback/route.ts  OAuth callback
```

### Migration is scripted, not typed by hand

`scripts/extract-content.mjs` imports the current `siteData.ts` via
`node --experimental-strip-types` and writes every JSON file from the live objects.
Transcribing 1,800 lines by hand would introduce silent errors; a script is
verifiable — the check is that the rebuilt data deep-equals the original.

## Auth — no new vendor

Sveltia's GitHub backend needs an OAuth handshake. Its reference implementation is a
Cloudflare Worker, but the protocol is small and we already deploy a Next app, so it
becomes two route handlers on the same domain. No Cloudflare account.

Ported faithfully from `sveltia/sveltia-cms-auth`, including the parts that are easy
to get wrong:

- CSRF token in an `HttpOnly; SameSite=Lax; Secure` cookie, 10-minute expiry,
  compared against GitHub's `state` on callback.
- The **two-step postMessage handshake** Sveltia requires. The callback page posts
  `authorizing:github` to the opener, waits to receive the same message back, and only
  then posts `authorization:github:success:{...}` to the confirmed origin. Sending the
  token in one message does not work.
- Client ID and secret as Vercel env vars — never in the repo.

Editors sign in with their GitHub account. Repo write access is the permission model:
add someone as a collaborator to grant editing, remove them to revoke.

## Editor experience

- **Pages** — list of all pages; create, rename, delete. Inside a page: hero fields,
  then a section list they can reorder by dragging, with a type picker per section.
- **Collections** — News, Events, Team, Partners, etc. as their own list editors.
- **Settings** — one screen for phone, email, address, socials, and every external
  link including the donate and shop URLs.
- **Media** — upload, browse, and pick images from `public/media/`. Sveltia's asset
  library handles the folder; editors never see a path.
- **Safety** — everything is a commit. A bad edit is one revert away, and required
  fields plus typed widgets stop most breakage before it is saved.

## Payments and contacts must not regress

These are the parts where a mistake costs real money or real enquiries:

- `siteConfig.links.brewShop` moves into `settings.json` but keeps its exact meaning.
  The **Shopify primary-domain warning** moves into the field's CMS help text, so an
  editor cannot silently break checkout.
- PayPal donate URL, brick campaign, facilities booking, Clean & Green estimate, and
  vendor registration links all move to Settings with help text.
- `app/api/submit/route.ts` and its Supabase wiring are **not touched**. The form
  allowlist, honeypot, and rate limit stay exactly as they are.
- The 4th Brew cart is unaffected — it reads `settings.json` through the same
  `siteConfig` export.

Verification below tests each of these against the deployed site, not just the build.

## Mobile

- Visitor: re-check the three brew pages plus a content page at 390px after the
  migration, confirming no horizontal overflow and 44px+ touch targets.
- Editor: Sveltia supports mobile browsers; confirm login and one edit on a phone
  viewport, since staff will realistically post an event from a phone.

## Verification

1. **Content is identical.** `scripts/verify-content.mjs` deep-equals the JSON-loaded
   data against the original `siteData.ts` snapshot. Zero diffs required.
2. `npx tsc --noEmit`, `npm run build` — 29 static pages as now, `npm test` green.
3. Every `/media/` reference resolves; no orphans.
4. All 25 routes 200 on the deploy; aliases still redirect.
5. Shop: 3 products, live prices, cart permalink still reaches Shopify checkout.
6. Contact form: POST `/api/submit` returns `{ok:true}`.
7. `/admin` loads, GitHub login completes, an edit commits and redeploys.
8. 390px pass on visitor pages.

## Human steps (cannot be done from here)

1. Create a GitHub OAuth App — callback `https://ccdgroup.vercel.app/api/auth/callback`.
2. Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to Vercel env vars.
3. Invite editors as repo collaborators with write access.
4. Decide whether this replaces the Wix site, and retire one of them.

## Explicitly not doing

- Not converting page *layout* to CMS-editable beyond section order and type. Editors
  reorder and swap sections; they do not restyle them. That boundary is what keeps the
  site looking like CCD.
- Not adding a preview deployment workflow yet. Worth doing later; not needed to make
  the site editable.
