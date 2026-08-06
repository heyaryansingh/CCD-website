# ccd-website

The Next.js rebuild of [ccdgroup.org](https://ccdgroup.org) for Cooperative Community Development Inc.

**Live:** https://ccdgroup.vercel.app

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

**To add a page you do not create a file.** You add a key to `pages` in
`lib/siteData.ts` and it appears — routed, statically generated, in the nav,
with its own metadata.

```
lib/siteData.ts       every page, section, and collection on the site (~1800 lines)
lib/siteConfig.ts     every external URL, social, and contact detail — one place
components/PageView.tsx   RenderSection(): maps a section `type` to a component
components/ClientBits.tsx every "use client" island (forms, carousels, pickers)
components/BrewProducts.tsx  build-time Shopify catalog fetch
app/globals.css       the entire stylesheet, hand-written
```

### Sections

A page is a list of typed sections. `Section` in `siteData.ts` is a discriminated
union of ~25 kinds — `split`, `cards`, `stats`, `steps`, `band`, `values`, `faq`,
`products`, `gallery`, `cta`, and so on. `RenderSection()` in `PageView.tsx` is the
switch that renders each one. Adding a section kind means: add to the union, add a
case, add the CSS. TypeScript will tell you if you miss the case.

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
- "Add to cart" is a plain `<a>` to a Shopify **cart permalink**
  (`{brewShop}/cart/{variantId}:1`). There is no cart state and no SDK. Shopify's JS
  Buy SDK was deprecated in Jan 2025 and lost support Jan 2026; with three products
  this is smaller than the SDK ever was.
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

`ccd-website-gamma.vercel.app` is a project domain and updates automatically.
**`ccdgroup.vercel.app` is a manually pinned alias** and does *not* follow production
deploys — re-point it after each one, or add it under Project Settings → Domains so
it stops needing this:

```bash
npx vercel alias set <new-deployment-url> ccdgroup.vercel.app
```

`ccdgroup.org` itself still points at the old Wix site and is untouched.

## Before you push

```bash
npx tsc --noEmit
npm run build
```

Check any colour you add against the rule above, and confirm new images are sized for
the web — `public/media/` is served as-is, with no image optimization pipeline
(`next/image` is deliberately not used).
