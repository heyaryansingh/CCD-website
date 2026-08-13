# Moving the site to Cloudflare

The code is done and verified. What remains needs a Cloudflare login, which only
you can do.

**Nothing here is urgent-risky:** Vercel stays live and serving throughout. If
Cloudflare misbehaves you simply do not cut over, and nothing was lost.

## Why we are doing this

Vercel's Hobby plan forbids commercial use, and their definition explicitly names
**asking for donations** and processing payments. CCD's site does both, so we are
in violation today — the options are Vercel Pro (~$240/yr) or a host that permits
it for free.

Cloudflare Workers' free tier allows commercial use outright. The deciding factor
is not the money: this project assumes the developer leaves, and a recurring card
on an account someone must keep access to is a failure mode. A free tier with no
billing relationship cannot lapse.

---

## 1. Deploy to a preview URL

```bash
cd ccd-website
npx wrangler login       # opens a browser
npm run cf:deploy
```

That prints a `*.workers.dev` URL. **Vercel is still live and unaffected.**

## 2. Check it

Open the preview URL and confirm:

- The home page and a few inner pages load
- `/shop` shows three coffees with prices
- `/contact` — submit the form. Until form storage is configured it correctly
  says to email CCD directly instead; that is the fallback, not a bug
- `/admin` loads the editor (sign-in will still fail — that is step 3)

Or check the whole thing in one command:

```bash
npm run verify:site -- https://<your-new-url>
```

That runs 23 checks — every page, the legacy addresses, the CMS, sign-in and its
CSRF guard, the forms, the shop, and the content. It exits non-zero on failure,
so it can gate the cutover.

Two failures are expected until you finish the steps below: `base_url` still
points at Vercel, and form storage is not configured. Everything else must pass.

All of this already passed locally in the real Workers runtime, so surprises are
unlikely — this confirms the hosted environment matches.

## 3. Point sign-in at the new address

Sign-in breaks until both of these match the new URL. This is the step most
likely to be missed, and it looks like "the migration broke editing".

1. **GitHub** → https://github.com/settings/developers → the `CCD Website Editor`
   app → set **Authorization callback URL** to:

   ```
   https://<your-new-url>/api/auth/callback
   ```

2. **`ccd-website/public/admin/config.yml`** (globals only; the collections
   now live in `public/admin/collections/`) → change `base_url` to
   `https://<your-new-url>`, commit and push.

3. **Cloudflare** → Workers → `ccdgroup` → Settings → Variables → add
   `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (same values as Vercel).

Then sign in at `<new-url>/admin` and make a test edit.

## 4. Turn on automatic deploys

Cloudflare → Workers → `ccdgroup` → Settings → **Builds** → connect
`heyaryansingh/CCD-website`, root directory `ccd-website`, build command
`npm run cf:deploy`.

Without this, CMS saves commit to GitHub but the site never updates — the same
trap Vercel had. Test it: make an edit at `/admin` and watch a build start.

Free tier gives 3,000 build minutes/month and builds take ~25 seconds, so roughly
7,000 saves a month. Not a constraint.

## 5. Cut over and stand down Vercel

Once the Cloudflare URL has served correctly for a few days:

- Point whatever public address you use at Cloudflare
- Tell staff the new `/admin` address
- Delete the Vercel project, or leave it idle — just do not pay for Pro

---

## What changes for editors

Only the URL they bookmark. The editor, the sign-in, the content, the media
library, and the guide are all identical — the CMS talks to GitHub, not to the
host.

## If something breaks

| Symptom | Cause |
|---|---|
| Every page 500s | The page bundle did not build. Check `prebuild` ran — `npm run bundle:pages` should print "bundled 21 pages". |
| Sign-in popup does nothing | The OAuth callback URL or `base_url` still points at Vercel |
| "not configured yet" on sign-in | `GITHUB_CLIENT_ID` / `SECRET` not set in Cloudflare |
| Editor saves, site does not change | Step 4 not done |

Rollback at any point is: keep using Vercel. It is untouched.
