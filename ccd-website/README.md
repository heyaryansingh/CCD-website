# ccd-website

The Next.js rebuild of [ccdgroup.org](https://ccdgroup.org) for Cooperative Community Development Inc.

**Live:** https://ccdgroup.org — on Cloudflare Workers
**Editing (CCD staff):** https://ccdgroup.org/admin — see
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

**There are only three route files.** Everything else is data.

| File | Serves |
|---|---|
| `app/page.tsx` | `/` — the English home page |
| `app/[...path]/page.tsx` | **everything else, in every language**, from `generateStaticParams()` — 228 pages |
| `app/api/submit/route.ts` | form intake (the only dynamic route) |

One catch-all resolves `/about`, `/projects/oasis-240`, `/es`, `/es/about` and
`/es/projects/oasis-240` through the same lookup — see `lib/routes.server.ts`.
A required catch-all cannot match the site root, which is the only reason
`app/page.tsx` still exists.

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
lib/i18n.ts           languages, the translate/link walk — CLIENT-SAFE
lib/i18n.server.ts    loads the dictionaries — SERVER ONLY
lib/routes.server.ts  turns a URL into a page (one catch-all route serves all)
lib/siteConfig.ts     loads settings.json, keeps the link helpers
components/PageView.tsx   RenderSection(): maps a section `type` to a component
components/ClientBits.tsx every "use client" island (forms, carousels, cart)
app/globals.css       the entire stylesheet, hand-written
content/translations/*.json  one dictionary per language, English -> translation
public/admin/         the CMS (index.html + config.yml + collections/*.yml)
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
4. an entry under `sections` → `types:` in `public/admin/collections/pages.yml`

Miss step 4 and the section works but editors cannot create one. TypeScript
catches the first two; nothing catches the fourth, so do not skip it.

### Languages

The site is written in English and served in nine languages. English keeps its
bare URLs (`/about`); every other language is prefixed (`/es/about`), so no
existing link, printed flyer or search result changed.

Translation is a **lookup, not a second set of content**. Every translatable
string in `content/` is a key in `content/translations/<code>.json`, and anything
without an entry falls back to the English it was written in — so a
half-translated language is safe to ship and is never blank. `localize()` in
`lib/i18n.ts` does the swap in the same walk that rewrites in-site links for the
current language, which is why no component has to know about languages to link
correctly.

All nine languages are fully translated. Two limits are worth knowing:

- **A string is the unit of translation, so a fragment shared by two headings
  gets one translation.** Hero headlines are stored as `title` + `accent` and
  rendered as two lines; `"the block."` is the accent on the events page *and*
  part of the home hero, so a language that needs a different case or particle
  in those two positions cannot have both. Give the two headings different
  English if it matters more than the duplication.
- **Machine-translated, not natively reviewed.** Fine for wayfinding; have a
  speaker check anything legally or financially load-bearing before relying on
  it.

Strings written into components are marked by being passed to `t("…")`;
`scripts/bundle-pages.mjs` finds them at build time. **A string built at runtime
— `t(label)`, or a template literal — is invisible to that scan and will never
be translated.** Use a literal with a `{placeholder}` and substitute afterwards.

```bash
npm run i18n -- report            # coverage per language
npm run i18n -- extract --locale=es --limit=150
npm run i18n -- apply --locale=es
npm run i18n -- prune             # drop entries whose English no longer exists
```

There is no translation API and no API key: the translating is done by an agent.
Run `/translate es` in Claude Code and it drives those commands. Staff can
correct any single string in the CMS under **Translations**.

Adding a language: one entry in `locales` (`lib/i18n.ts`), one import in
`lib/i18n.server.ts`, one entry in `public/admin/collections/translations.yml`.

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

The site is a Cloudflare Worker, compiled from this Next build by
`@opennextjs/cloudflare`. Pushing to `main` deploys automatically, so a CMS save
or a `git push` is all it takes.

By hand, from this directory:

```bash
npm run cf:deploy      # build, populate the cache, upload
npm run cf:preview     # the same build, served locally by the real workerd
npm run verify:site -- https://ccdgroup.org
```

Two things about this build are load-bearing, and both look like routing bugs
when they go wrong:

- **`npm run cf:build` is not `opennextjs-cloudflare build`.** It also runs
  `populateCache`, which copies the 355 prerendered pages into the assets bundle.
  Skip it and every page 404s while `/admin` and `/media/*` keep working. See
  `open-next.config.ts`.
- **Bare English URLs are rewritten in `beforeFiles`, not `fallback`.** OpenNext
  skips fallback rewrites whenever a dynamic route *pattern* matched, and
  `/about` matches `[lang]`. See the comment at the top of `next.config.ts`.

Neither is caught by `npm run build`. `npm run verify:site` catches both, which
is what it is for — run it against any deploy before trusting it.

Vercel is the previous host. `main` still builds there unchanged, and
`docs/CLOUDFLARE-CUTOVER.md` is the sequence for standing it down.



## Content scripts

```bash
npm run content:verify -- --snapshot   # capture a baseline before a refactor
npm run content:verify                 # confirm the refactor changed no content
```

A deep-equality guard for risky refactors, not a standing check — editors change
content on purpose. It is what proved the CMS migration lost nothing.

`content:extract` was the one-time migration from the old `siteData.ts`. It now
refuses to run — content lives in `content/` and is edited at `/admin`.

`scripts/ts-resolve.mjs` is what lets these plain-Node scripts import the app's
real `.ts` modules (extensionless imports, the `@/` alias, and JSON without an
import attribute). Next handles all three natively; bare Node does not.

## Before you push

```bash
npm run check                    # tsc + tests + build
npm run verify:site -- <url>     # 23 end-to-end checks against a deployed site
```

`verify:site` exercises everything that has actually broken on this project:
every route, the legacy addresses, the CMS and its config, sign-in and the CSRF
guard, form storage, the shop, and content-token resolution. Point it at
localhost, a Cloudflare preview, or production.

Check any colour you add against the rule above, and confirm new images are sized for
the web — `public/media/` is served as-is, with no image optimization pipeline
(`next/image` is deliberately not used).
