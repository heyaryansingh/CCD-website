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
| DNS nameservers | `ns4`/`ns5.wixdns.net` | Cloudflare's — see step 3, which is the hard part |
| Editing | `/admin`, commits to GitHub | Identical — the CMS talks to GitHub, not to the host |
| Cost | $0 (in breach) or $240/yr | $0 |

The one genuinely dangerous part is the DNS move, because CCD's **email** rides
on the same zone as the website, and the domain currently has DNSSEC switched on.
Step 3 exists entirely to keep those from breaking, and it is the only step with
a real failure mode.

### If step 3 stalls

If the registration turns out to be locked inside Wix and transferring it is not
something CCD wants to do right now, the site does not have to stay on
`ccdgroup.vercel.app`. Wix's DNS panel can point `A` records anywhere, so the
same Next build can go to any host that publishes a stable IP address for an
apex domain, and `ccdgroup.org` would be live within the hour with no transfer at
all.

That is a genuinely different project, though — it means abandoning the
Cloudflare build that is finished and verified, and adopting a host that has not
been tested against this site. It is a fallback, not a shortcut. Take it only if
the transfer is refused outright.

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

## 3. Get ccdgroup.org onto Cloudflare's nameservers

This is the whole difficulty of the migration, and it is not a technical problem
with the site. Read this section before starting anything in it.

**Cloudflare can only put a Worker on a domain whose nameservers point at
Cloudflare.** Not a CNAME, not an A record — the zone itself has to be
authoritative on Cloudflare. That is documented, and the CNAME-only alternative
("partial setup") is a Business-plan feature at roughly $200/month, so it is not
an option here.

Today the nameservers are `ns4.wixdns.net` / `ns5.wixdns.net`, and **Wix does not
permit changing them.** Their own help centre is explicit: *"Currently, it's not
possible to change name servers (edit NS records) for a Wix domain."* The only
routes they offer are pointing the domain at an external site, or transferring
the registration away.

So the answer depends on one fact nobody has confirmed yet:

### 3a. Find out where ccdgroup.org is actually registered

The public record says the registrar is **Tucows Domains Inc.**, which is a
wholesale registrar — Wix resells through them, but so do a dozen other
companies. Tucows on the record therefore does *not* prove the domain lives at
Wix. Registered 2021-06-02, last transferred between registrars 2025-06-11,
expires 2027-06-02.

**Ask the boss who sends the renewal invoice.** That single answer decides
between an afternoon and a week:

| If the renewal comes from… | Then |
|---|---|
| **Wix** | The registration has to be transferred away before anything else can happen. Path B. |
| **Anyone else** (Hover, Namecheap, GoDaddy, an OpenSRS reseller, a web person who set it up) | The nameservers can be changed there today. Path A — skip to 3c. |

The domain merely *uses* Wix's nameservers; that is a setting, and it is
independent of who holds the registration.

### 3b. Path B — transferring the registration off Wix

Only if 3a says Wix. Budget **6 to 9 days**, most of it ICANN's mandatory waiting
period, not work.

Cloudflare Registrar cannot be the destination: it requires the domain to already
be on Cloudflare's nameservers, which is the thing being fixed. So the
registration goes to any registrar that permits nameserver edits — Porkbun,
Namecheap, Dynadot and Hover all do, for roughly $12–15, which buys an extra
year rather than being a fee.

1. **Turn DNSSEC off at Wix first** (see 3c — this is the dangerous step, and it
   has to be finished and verified before the transfer, not during it).
2. Wix → Domains → the domain → **Advanced → Transfer away from Wix**. Unlock it
   and copy the authorisation code.
3. At the new registrar, start the transfer and paste the code. Approve the
   confirmation email quickly; Wix will otherwise let the full five days run.
4. **The moment it completes, set the nameservers to Cloudflare** (3d). Wix has
   no obligation to keep answering DNS for a domain that has left, and if their
   zone goes quiet before Cloudflare's is live, CCD's email goes down with it.
   Having the Cloudflare zone already built and waiting (3c) is what closes that
   window to minutes.

The 60-day ICANN lock does not apply — the last transfer was over a year ago.

### 3c. Turn off DNSSEC — do this first, and do not skip it

**`ccdgroup.org` has DNSSEC enabled** (there is a signed DS record at the `.org`
registry, key tag 31645). If the nameservers change while that record is still
published, every validating resolver on the internet will reject the answers as
forged, and `ccdgroup.org` **stops existing** — website and email both, for
everyone, until it is undone and propagates back.

This is the one step in the whole migration that can take CCD offline.

Wix → Domains → the Domain Actions icon → **Edit contact info → Show more**, next
to *Privacy and DNSSEC protection* → **Turn off protection**. If 3a found another
registrar, it is in that registrar's DNSSEC or Security panel instead.

Then wait, and confirm the registry has actually dropped it:

```bash
nslookup -type=DS ccdgroup.org 1.1.1.1     # must return NOTHING
```

It can take a few hours. **Nothing else in step 3 starts until that command comes
back empty.** Cloudflare can re-enable DNSSEC with one click once the zone is
live there.

### 3d. Build the Cloudflare zone before it is needed

Do this while the domain is still served by Wix. A Cloudflare zone sits inactive
and harmless until nameservers point at it, so the whole record set can be
entered, checked and left ready — which is what turns the nameserver switch into
a moment rather than an outage.

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

### 3e. Switch the nameservers

Cloudflare gives two nameservers. Set them at the registrar found in 3a — the
registrar's control panel, not Wix's DNS records screen; they are different
things.

This is not a change of ownership. The registration and the renewal stay where
they are; only who answers DNS queries changes.

Propagation is usually under an hour. Because 3d copied the records exactly,
**email keeps working throughout** — resolvers get the same MX answer from
whichever side they reach.

Confirm before continuing:

```bash
nslookup -type=NS ccdgroup.org 1.1.1.1     # must show two *.ns.cloudflare.com
nslookup -type=MX ccdgroup.org 1.1.1.1     # must still show ...outlook.com
nslookup -type=TXT ccdgroup.org 1.1.1.1    # must still show the v=spf1 line
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
- Cancel the Wix **site** subscription

⚠️ **Cancelling Wix is not the same as cancelling the domain.** If step 3a found
the registration still at Wix and Path B was never completed, the domain renews
through that same Wix account — cancelling it can let `ccdgroup.org` lapse, and a
lapsed domain is far harder to get back than a website. Confirm the domain shows
an active registration and auto-renew at whichever registrar now holds it
*before* cancelling anything at Wix.

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
| The whole domain vanishes — site *and* email, everywhere | DNSSEC was still published when the nameservers changed (3c). Point the nameservers back, or get the DS record removed at the registrar, and wait for propagation. |
| Email stops arriving | The MX or SPF record did not survive the zone move. Re-add from the table in 3d. |
| Outlook cannot auto-configure a new mailbox | The `autodiscover` CNAME is proxied (orange cloud). It must be DNS-only. |
| `wrangler deploy` fails on the custom domain | The zone is not in this Cloudflare account yet — step 3 is incomplete |

Before step 5, rollback is: do nothing, `main` still deploys to Vercel.
After step 5, rollback is: re-add the Wix `A` records in Cloudflare DNS.
