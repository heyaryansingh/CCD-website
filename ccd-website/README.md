# ccd-website

The Next.js rebuild of [ccdgroup.org](https://ccdgroup.org) for Cooperative Community Development Inc.

**Live:** https://ccdgroup.vercel.app
**Editing (CCD staff):** https://ccdgroup.vercel.app/admin — see
[docs/EDITING-THE-WEBSITE.md](../docs/EDITING-THE-WEBSITE.md)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before you push
```

> **Read `AGENTS.md` first if you are an AI agent.** This is Next.js 16 — its
> conventions differ from most training data. Check `node_modules/next/dist/docs/`
> before writing routing or config code.

## How this site is built

**There are only four route files.** Everything else is data.

| File | Serves |
|---|---|
| `app/page.tsx` | `/` |
| `app/[slug]/page.tsx` | **all 20 inner pages**, from `generateStaticParams()` |
| `app/projects/[project]/page.tsx` | the 4 project detail pages |
| `app/api/submit/route.ts` | form intake (the only dynamic route) |

**Content is not in the code.** It lives as JSON in `content/` and is edited by
CCD staff at **/admin** (Sveltia CMS). Adding a page means adding a file in
`content/pages/` — which the CMS does for you — and it appears: routed,
statically generated, with its own metadata.

```
content/settings.json      contact details, socials, every external + payment URL
content/navigation.json    menus, footer columns, legacy URL aliases
content/pages/*.json       one file per page (hero + the list of blocks)
content/projects/*.json    project detail pages
content/collections/*.json news, events, team, partners, tiers, brew products…

lib/types.ts          the shapes content must match (Section union lives here)
lib/siteData.ts       loads the collections — CLIENT-SAFE, no fs
lib/pages.server.ts   loads pages via fs — SERVER ONLY, never import from a client component
lib/content.ts        resolves {{settings}} tokens inside content
lib/siteConfig.ts     loads settings.json, keeps the link helpers
components/PageView.tsx   RenderSection(): maps a section `type` to a component
components/ClientBits.tsx every "use client" island (forms, carousels, cart)
app/globals.css       the entire stylesheet, hand-written
public/admin/         the CMS itself (index.html + config.yml)
```

**The one rule that will bite you:** `lib/siteData.ts` is imported by
`ClientBits.tsx` (`"use client"`), so nothing in its import chain may touch the
filesystem. That is why pages live in `pages.server.ts` and reach client
components as props — see `activeMap` in `app/layout.tsx`.

### Sections

A page is a list of typed sections. `Section` in `lib/types.ts` is a discriminated
union of ~26 kinds — `split`, `cards`, `stats`, `steps`, `band`, `values`, `faq`,
`products`, `gallery`, `cta`, and so on. `RenderSection()` in `PageView.tsx` is the
switch that renders each one. Adding a section kind means **four** edits:

1. the union in `lib/types.ts`
2. a `case` in `RenderSection()`
3. the CSS in `app/globals.css`
4. an entry under `sections` → `types:` in `public/admin/config.yml`

Miss step 4 and the section works but editors cannot create one. TypeScript
catches the first two; nothing catches the fourth, so do not skip it.

### Styling

Hand-written CSS in `app/globals.css`. **No Tailwind, no CSS modules, no UI library.**
Tailwind was removed after we verified it was a no-op — if you write
`className="flex gap-4"` it will do nothing. Use the semantic classes and the design
tokens in `:root`.

Runtime dependencies are exactly three: `next`, `react`, `react-dom`. Keep it that way
unless there is a real reason not to.

#### Colour rule — do not break this

Gold `#fec630` on white is **1.57:1** and fails WCAG AA. **Gold is a fill behind dark
text, or text on a dark background — never text on a light one.** Eyebrows on light
backgrounds use `#8a6d00`. The same rule applies to The 4th Brew's tan `#c2b27f`
(2.11:1). The measured table for every token pair is in
`../.agent-orchestration/HANDOFF.md`.

### Sub-brand skin

A page with `brand: "brew"` gets `class="brew"` on `<main>`, which reassigns the CSS
custom properties inside it (teal/tan, Inknut Antiqua + Libre Baskerville). The site
header and footer sit outside `<main>` and stay CCD-branded. See `.brew` in
`globals.css`. This is token reassignment — not a second set of components.

## The 4th Brew storefront

`/4th-brew`, `/shop`, and `/brewing` are CCD's coffee brand. Shopify is the catalog
and checkout backend; every page a customer reads lives here.

- `components/BrewProducts.tsx` fetches `{brewShop}/products.json` at build time
  (public, no token, revalidated hourly). If that fetch fails it falls back to the
  captured data in `brewProducts` so a deploy never breaks.
- The cart lives in the browser (`lib/brewCart.ts`, a module store read through
  `useSyncExternalStore`, persisted to localStorage). At checkout it becomes ONE
  Shopify **multi-line cart permalink** — `{brewShop}/cart/{id}:{qty},{id}:{qty}` —
  so a shopper can buy three coffees in a single handoff. No SDK, no access token,
  no server-side cart. Shopify's JS Buy SDK was deprecated Jan 2025 and lost support
  Jan 2026; this is smaller than the SDK ever was. `npm test` covers the logic.
- `siteData` owns the editorial (which coffees, described how). Shopify owns the
  commerce (price, stock, photo). Merged by handle.

> ⚠️ **`siteConfig.links.brewShop` must point at Shopify's PRIMARY domain.** Shopify
> 301s every cart link to whatever that currently is. Before retiring
> `the4thbrew.com`, move Shopify's primary domain to `shop.the4thbrew.com` and update
> this value — otherwise every checkout breaks.

## Forms

`app/api/submit/route.ts` takes contact / estimate / volunteer / newsletter
submissions. Per-type field allowlist, honeypot, per-IP rate limit, 4000-char caps.

It writes to Supabase **only if** `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set;
otherwise it returns `{ok: true, stored: false}` so local development and previews
work with no credentials. Schema: `supabase/schema.sql`.

## Deploying

```bash
npx vercel --prod --yes
```

That is the whole deploy. **`ccdgroup.vercel.app` updates automatically** — it is the
Vercel project's own domain (the project is named `ccdgroup`, and Vercel assigns
`<project>.vercel.app` to whatever is in production).

It did not always work that way. It used to be a manual alias pinned to one specific
build with `vercel alias set`, so production deploys silently did not move it and the
site appeared not to update. If you ever see stale content there again, check:

```bash
npx vercel projects ls          # "Latest Production URL" must read ccdgroup.vercel.app
```

Do **not** run `vercel alias set ccdgroup.vercel.app` — that re-pins it and reintroduces
the bug.

`ccdgroup.org` itself still points at the old Wix site and is untouched.

⚠️ **The project is not yet connected to GitHub**, so CMS saves commit but do not
deploy. Connecting it also requires changing Root Directory to `ccd-website` —
the CLI deploys run from inside that folder, so it is currently `.`. See
[docs/CMS-SETUP.md](../docs/CMS-SETUP.md).

## Content scripts

```bash
npm run content:verify   # proves the JSON content still matches the baseline
```

`content:extract` was the one-time migration from the old `siteData.ts`. It now
refuses to run — content lives in `content/` and is edited at `/admin`.

`scripts/ts-resolve.mjs` is what lets these plain-Node scripts import the app's
real `.ts` modules (extensionless imports, the `@/` alias, and JSON without an
import attribute). Next handles all three natively; bare Node does not.

## Before you push

```bash
npm run check   # tsc + tests + build
```

Check any colour you add against the rule above, and confirm new images are sized for
the web — `public/media/` is served as-is, with no image optimization pipeline
(`next/image` is deliberately not used).
