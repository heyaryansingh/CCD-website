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

## Human steps (need a Cloudflare account)

1. `npx wrangler login`
2. `npm run deploy:cf` → gives a `*.workers.dev` preview URL
3. Re-run the verification battery against that URL
4. Only then: update `base_url`, update the OAuth callback URL, connect the git
   integration, and cut over
5. Cancel/avoid Vercel Pro once Cloudflare is serving

## Not doing

- Not touching Vercel until Cloudflare is proven.
- Not moving the CMS, the content, or GitHub — none of them are host-specific.
