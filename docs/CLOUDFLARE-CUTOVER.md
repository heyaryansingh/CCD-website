# Moving the site to Cloudflare, on ccdgroup.org

The code is done and verified in the real Workers runtime. What remains needs
accounts and a domain, which only you and CCD can do.

**Nothing here touches the live site until step 5.** All of it lives on the
`cloudflare-cutover` branch; `main` is what Vercel builds, and `main` is
unchanged. Rollback at any point before step 5 is "abandon the branch".

## Why we are doing this

Vercel's Hobby plan forbids commercial use, and their definition explicitly names
**asking for donations** and processing payments. CCD's site does both, so we are
in violation today — the options are Vercel Pro (~$240/yr) or a host that permits
it for free.

Cloudflare Workers' free tier allows commercial use outright. The deciding factor
is not the money: this project assumes the developer leaves, and a recurring card
on an account someone must keep access to is a failure mode. A free tier with no
billing relationship cannot lapse.

## What is actually changing

| | Now | After |
|---|---|---|
| Site code | Next.js on Vercel | The same build, compiled to a Cloudflare Worker |
| Address | `ccdgroup.vercel.app` | `ccdgroup.org` (`www` redirects to it) |
| The old Wix site | Serving `ccdgroup.org` | Gone. Its content is not needed. |
| CCD's email | Microsoft 365, DNS records held at Wix | Microsoft 365, **same records**, held at Cloudflare |
| Editing | `/admin`, commits to GitHub | Identical — the CMS talks to GitHub, not to the host |
| Cost | $0 (in breach) or $240/yr | $0 |

The one genuinely dangerous part is the DNS move, because CCD's **email** rides
on the same zone as the website. Step 3 exists entirely to keep that from
breaking.

---

## 1. Make a CCD-owned Cloudflare account

Not a personal one. The point of leaving Vercel is that the site survives any one
person leaving, and an account on a developer's private email fails that the same
way a lapsed credit card does.

1. Whoever at CCD should own the site long-term signs up at
   https://dash.cloudflare.com/sign-up with a **CCD address** (`info@ccdgroup.org`
   or similar). Free plan.
2. Turn on two-factor auth on it, and store the recovery codes wherever CCD keeps
   its other credentials.
3. **Members → Invite** whoever is doing the work, as *Administrator*.

Everything below happens inside that account.

## 2. Deploy the Worker to a temporary address

Nothing public changes here. This proves the build runs on Cloudflare's real
infrastructure before any domain is involved.

```bash
cd ccd-website
git checkout cloudflare-cutover
npx wrangler login          # sign in as the CCD account from step 1
npm run cf:deploy
```

That prints a `https://ccdgroup.<subdomain>.workers.dev` URL. Check it:

```bash
npm run verify:site -- https://ccdgroup.<subdomain>.workers.dev
```

23 checks: every page in every language, the legacy addresses, the CMS files,
sign-in and its CSRF guard, the forms, the shop, the content.

**Three failures are expected at this stage and are not bugs:**

| Expected failure | Why |
|---|---|
| `config.yml base_url matches this site` | `base_url` is already set to `ccdgroup.org`, which is where it needs to end up. See the note under step 5. |
| `GitHub OAuth configured` | The client ID/secret are not in Cloudflare yet (step 5). |
| `submissions are actually stored` | No database configured on any host yet. Visitors are correctly told to email instead. |

Everything else must pass. If a page 500s, the page bundle did not build — check
that `prebuild` ran and printed "bundled 21 pages".

## 3. Move ccdgroup.org's DNS to Cloudflare — carefully

Cloudflare can only put a Worker on a domain whose **nameservers point at
Cloudflare**. There is no way around this on the free plan. So the zone moves.

Right now the nameservers are `ns4.wixdns.net` / `ns5.wixdns.net`, and that Wix
zone is also what routes CCD's email to Microsoft 365. Copy the records first,
switch nameservers second.

### 3a. Add the domain and check what Cloudflare imported

Cloudflare → **Add a site** → `ccdgroup.org` → Free plan. It scans the current
zone and imports what it can find. Scanning is best-effort — **verify it against
this table**, which is the live zone as of the migration:

| Type | Name | Value | What it is |
|---|---|---|---|
| MX | `@` | `ccdgroup-org.mail.protection.outlook.com` (priority 0) | **CCD's email.** Lose this and mail stops. |
| TXT | `@` | `v=spf1 include:spf.protection.outlook.com ~all` | **SPF.** Lose this and CCD's mail starts landing in spam. |
| TXT | `@` | `MS=ms42159291` | Microsoft 365 domain ownership. Lose it and M365 can un-verify the domain. |
| CNAME | `autodiscover` | `autodiscover.outlook.com` | Outlook/phone mail setup. **Must be DNS-only (grey cloud), not proxied.** |
| TXT | `@` | `google-site-verification=mpXdi2knjibgiBdRIzXlY-GJCWhMNVBzkqQrC6QMg18` | Google Search Console. Keep it or lose the search data. |
| TXT | `@` | `13.03.2023`, `21-03-2023`, `<06.03.2023>` | Junk left by some past tool. Harmless. Copy or drop, doesn't matter. |
| A | `@` | `185.230.63.107`, `.171`, `.186` | The Wix site. **Deleted in step 5** — the Worker replaces it. |
| CNAME | `www` | `cdn1.wixdns.net` | The Wix site. **Deleted in step 5.** |

Log in to the Wix DNS panel and compare line by line — if CCD has added anything
since (a subdomain, another service's verification record), it is in Wix's panel
and must be copied too. Cloudflare's scan is not proof.

There is currently **no DKIM and no DMARC** on this domain. That is how it
already is, so the move does not make it worse, but it is worth adding in
Microsoft 365 afterwards.

### 3b. Switch the nameservers

Cloudflare gives two nameservers. Set them at whoever the domain is *registered*
with — that is a different screen from Wix's DNS records, and if the domain was
bought through Wix it is under **Domains → Manage → Nameservers**.

This is not a transfer of ownership. The registrar and the renewal stay exactly
where they are; only who answers DNS queries changes.

Propagation is usually under an hour. While it is happening, **the Wix site keeps
serving and email keeps working** — the records are identical on both sides, which
is the entire point of doing 3a properly.

Confirm before continuing:

```bash
nslookup -type=NS ccdgroup.org 1.1.1.1     # must show two *.ns.cloudflare.com
nslookup -type=MX ccdgroup.org 1.1.1.1     # must still show ...outlook.com
```

Then **send a test email to `info@ccdgroup.org` from an outside address and
confirm it arrives.** Do not skip this. It is the one check that cannot be
undone quietly.

## 4. Stage on a subdomain

Still nothing public changes. `ccdgroup.org` still shows Wix.

Cloudflare → **Workers & Pages → ccdgroup → Settings → Domains & Routes → Add →
Custom Domain** → `new.ccdgroup.org`. Cloudflare writes the DNS record itself.

```bash
npm run verify:site -- https://new.ccdgroup.org
```

Same three expected failures as step 2. Then click through it by hand — home,
`/shop` with live prices, `/contact`, a couple of Spanish and Arabic pages.

Leave it here for as long as you want. This is the last stop before the real
domain.

## 5. Cut over

Do these in order, in one sitting. Steps 5b–5d are what make editing work; do
5a alone and staff will report "the editor is broken".

**5a. Merge and attach the real domain.**

```bash
git checkout main
git merge cloudflare-cutover
```

Then uncomment the `routes` block in `ccd-website/wrangler.jsonc` (it is written
out and ready), commit, and:

```bash
cd ccd-website && npm run cf:deploy
```

In Cloudflare's DNS panel, delete the three Wix `A` records on `@` and the `www`
CNAME. The Worker's custom domains replace them. `www.ccdgroup.org` now 301s to
the bare domain — that redirect lives in `next.config.ts`, not in a dashboard
rule, so it travels with the repo.

**5b. Point sign-in at the new address.** `base_url` in
`ccd-website/public/admin/config.yml` already says `https://ccdgroup.org`, so
only GitHub's side is left:

https://github.com/settings/developers → the **CCD Website Editor** app →

- **Homepage URL:** `https://ccdgroup.org`
- **Authorization callback URL:** `https://ccdgroup.org/api/auth/callback`

It must match exactly. `/api/auth` sends no `redirect_uri`, so GitHub always
returns to whatever is registered here — which is why one OAuth App serves
exactly one hostname, and why sign-in could not be tested on `new.ccdgroup.org`
in step 4.

**5c. Add the secrets to Cloudflare.** Workers & Pages → `ccdgroup` → Settings →
**Variables and Secrets** → add as *Secret* (not plaintext):

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Same values as Vercel has. Or from the command line:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

**5d. Verify the whole thing, sign-in included.**

```bash
npm run verify:site -- https://ccdgroup.org
```

Now only *one* failure is acceptable — `submissions are actually stored`, which
is the unconfigured database and predates this migration. Everything else must
pass. Then sign in at https://ccdgroup.org/admin and make a real test edit.

## 6. Turn on automatic deploys

Without this, CMS saves commit to GitHub but the site never rebuilds — the same
trap Vercel had.

Cloudflare → Workers & Pages → `ccdgroup` → Settings → **Builds** → connect the
`heyaryansingh/CCD-website` repository:

| Field | Value |
|---|---|
| Root directory | `ccd-website` |
| Build command | `npm run cf:build` |
| Deploy command | `npx wrangler deploy` |
| Branch | `main` |

Node version comes from `ccd-website/.node-version`.

Test it: make an edit at `/admin`, watch a build start, see the change appear.

Free tier gives 3,000 build minutes/month and builds take ~25 seconds — roughly
7,000 saves a month. Not a constraint.

## 7. Stand down Vercel

Once Cloudflare has served `ccdgroup.org` correctly for a few days:

- Tell staff the editor is now at **https://ccdgroup.org/admin**
- Delete the Vercel project (or leave it idle — just never pay for Pro)
- Delete `.vercelignore` and the `.vercel/` directories from the repo
- Cancel the Wix subscription

---

## What changes for editors

Only the address they bookmark: `ccdgroup.org/admin`. The editor, the sign-in,
the content, the media library and the guide are all identical, because the CMS
talks to GitHub, not to whoever is hosting the site.

## If something breaks

| Symptom | Cause |
|---|---|
| Every page 500s | The page bundle did not build. `npm run bundle:pages` should print "bundled 21 pages". |
| Every page 404s, but `/admin` and `/media/*` work | The prerendered pages were not copied into the assets bundle. Deploy with `npm run cf:deploy`, or if Cloudflare is building, check the build command is `npm run cf:build` — plain `opennextjs-cloudflare build` is not enough, it needs the `populateCache` step that script runs. See the comment in `open-next.config.ts`. |
| Sign-in popup opens then does nothing | The GitHub callback URL and `base_url` do not both say `https://ccdgroup.org` (step 5b) |
| "not configured yet" on sign-in | `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` missing in Cloudflare (step 5c) |
| Editor saves, site does not change | Step 6 not done |
| Email stops arriving | The MX or SPF record did not survive the zone move. Re-add from the table in 3a. |
| Outlook cannot auto-configure a new mailbox | The `autodiscover` CNAME is proxied (orange cloud). It must be DNS-only. |
| `wrangler deploy` fails on the custom domain | The zone is not in this Cloudflare account yet — step 3 is incomplete |

Before step 5, rollback is: do nothing, `main` still deploys to Vercel.
After step 5, rollback is: re-add the Wix `A` records in Cloudflare DNS.
