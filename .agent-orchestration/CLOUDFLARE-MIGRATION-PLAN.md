# Plan — move the site from Vercel to Cloudflare Workers

## Why

Vercel's Hobby plan forbids commercial use, and their definition explicitly names
**asking for donations** and processing payments. CCD's site does both. We are in
violation today; the choice is Vercel Pro (~$240/yr) or somewhere that permits it
for free.

Cloudflare Workers' free tier allows commercial use outright. The deciding factor
is not the money: `HANDOFF.md` assumes the developer leaves, and a recurring card
on an account someone must keep access to is a failure mode for a volunteer-run
nonprofit. A free tier with no billing relationship cannot lapse.

## Approach

`@opennextjs/cloudflare` — the official adapter, and OpenNext joined the Next.js
Ecosystem Working Group in March 2026. It compiles the existing Next build into a
Worker; no application rewrite.

Work happens on a branch. **Vercel stays live and untouched** until Cloudflare is
verified, so the fallback is "abandon the branch".

## The two real risks

Everything else is host-agnostic. These are the only parts that can genuinely break:

**1. `lib/pages.server.ts` reads the filesystem.** Workers has no runtime `fs`.
This *should* be fine because all 25 pages are statically generated, so the read
happens during the build in Node — but "should be" is not verified.

**2. The OAuth routes must run in the Workers runtime**, not Node. Low risk:
Sveltia's own reference authenticator *is* a Cloudflare Worker, so this code is
moving back toward its native shape. `crypto.randomUUID`, `fetch` and cookies are
all standard there.

Both are testable locally — `wrangler dev` runs the genuine workerd runtime, so
no Cloudflare account is needed to prove them.

## Does this break editing?

No. The CMS never talks to the host — it talks to GitHub. Sveltia, the content,
sign-in, and the media library are all unaffected. Three things change:

1. `base_url` in `public/admin/config.yml` → the new domain
2. The GitHub OAuth App callback → `https://<new-domain>/api/auth/callback`
   (miss this and login breaks in a way that looks like the migration broke editing)
3. Auto-deploy reconnected to Cloudflare's git integration

Build minutes are not a constraint: free tier gives 3,000/month, builds run ~25s,
so roughly 7,000 CMS saves a month.

## Outcome (executed 2026-08-07)

**Both risks were real to check, and one of them fired.**

Risk 1 hit immediately: the first workerd preview 500'd with
`Cannot read properties of undefined (reading 'slug')` — `pages.server.ts` read
the filesystem at request time and Workers returned nothing. Fixed at the root
rather than per-host: `scripts/bundle-pages.mjs` collapses the per-page files at
build time and the app imports the bundle. The site no longer touches fs at
runtime on **any** host.

Risk 2 did not fire. The OAuth routes work unchanged in workerd — as expected,
since Sveltia's reference authenticator is itself a Cloudflare Worker.

Verified in the genuine Workers runtime (`wrangler dev`), not inferred:

| Check | Result |
|---|---|
| 25 routes | all 200 |
| `/api/auth` | 302 to GitHub, CSRF cookie set |
| Mismatched state | `CSRF_DETECTED` |
| `/api/submit` | `{ok:true}` |
| Shop | live prices, cart buttons render |
| Tokens leaked | 0 |
| Aliases | redirect correctly |
| Static assets | served |
| `/admin` | 307 → `/admin/` → CMS loads (Cloudflare directory handling) |

Also confirmed the branch still builds for Vercel, so merging risks nothing.

## Steps

1. Branch `cloudflare-migration`.
2. Add `@opennextjs/cloudflare` + `wrangler` as dev dependencies. Runtime
   dependencies stay at three.
3. `wrangler.jsonc` — name, compatibility date, `nodejs_compat` flag, assets
   binding.
4. Add `open-next.config.ts`.
5. Build with `opennextjs-cloudflare build`.
6. **Verify in workerd locally** — the whole battery: 25 routes, `/admin`,
   `config.yml`, `/api/auth` 302 + CSRF cookie, CSRF rejection, `/api/submit`,
   shop prices, no token leakage.
7. Commit the branch. Do not merge until a real Cloudflare deploy is verified.

## Re-verification 2026-08-14 — two blockers the first pass could not have caught

The August 7 battery passed, and then the site changed underneath it. The nine
language rebuild (`cc2d169`, `07e6d50`) landed after Cloudflare was last checked,
and nobody re-ran the battery in workerd. Both of these were sitting in the
branch, and both look like routing bugs while being nothing of the kind.

**1. Every page 404'd. The incremental cache was never configured.** Next does
not emit prerendered App Router pages as static files — it writes them to the
incremental cache, and OpenNext reads them back out of whatever cache the config
names. `defineCloudflareConfig()` with no argument names none, so all 355 pages
sat unread in `.open-next/cache/` and the Worker answered 404 for every one.
`/admin`, `/media/*` and the three `/api` routes kept working, because those are
the only things that are genuinely files or genuinely dynamic — which is exactly
what makes it read as a rewrite bug.

The old note in `wrangler.jsonc` ("no ISR, so no cache needed") had the premise
right and the conclusion wrong: no ISR means the cache never has to be *written*,
not that it never has to be *read*.

Fixed with `static-assets-incremental-cache`, which serves them read-only from
the assets bundle the Worker already has. Still no R2, no KV, nothing billable.

It also needs a build step, not just config: `opennextjs-cloudflare build` leaves
the cache where it is, and `populateCache` is what copies it into the assets. So
`cf:build` now runs both — which matters because that is the command Cloudflare's
git integration will run.

**2. Every bare English URL 404'd. `fallback` rewrites do not survive OpenNext.**
`/es/about` worked; `/about` did not. OpenNext applies fallback rewrites only
when nothing matched a route *pattern*, and `/about` matches `app/[lang]` with
lang="about". Next itself then 404s that (the segment sets
`dynamicParams = false`) and moves on to the fallback; OpenNext has already
concluded a route was found and skips it. Nothing in `next build` reports this.

Moved into `beforeFiles`, which runs unconditionally and behaves identically on
both hosts. Cost is an explicit exclusion list, now generated from `localeCodes`
so adding a language cannot leave it behind.

Verified after the fixes:

| Host | Result |
|---|---|
| workerd (`wrangler dev`) | 33/35 — the two failures are `base_url` pointing at the future domain, and the unconfigured form database |
| `next start` (Vercel semantics) | 30/33 — same two, plus OAuth vars absent locally |

The lesson worth keeping: `npm run build` passing proves nothing about
Cloudflare. `npm run verify:site` against a real workerd is the only gate.

## Human steps (need a Cloudflare account)

Written up properly for a non-developer in `docs/CLOUDFLARE-CUTOVER.md`, which
also covers the part this plan originally missed: `ccdgroup.org`'s DNS is at Wix
and CCD's Microsoft 365 email rides on the same zone, so the nameserver move has
to carry the MX, SPF and autodiscover records across or email stops.

1. CCD-owned Cloudflare account (not a personal one — that is the failure mode
   this whole migration exists to avoid)
2. `npx wrangler login`, `npm run cf:deploy` → a `*.workers.dev` URL
3. `npm run verify:site` against it
4. Move the zone to Cloudflare, records first, nameservers second
5. Stage on `new.ccdgroup.org`, verify again
6. Cut over: merge the branch, uncomment `routes` in `wrangler.jsonc`, repoint
   the GitHub OAuth callback, add the secrets, connect Workers Builds
7. Stand down Vercel and Wix

## Not doing

- Not touching Vercel until Cloudflare is proven.
- Not moving the CMS, the content, or GitHub — none of them are host-specific.
