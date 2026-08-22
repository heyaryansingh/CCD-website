# Finishing the CMS setup

> **Host note.** Steps 1 and 2 were originally done on Vercel and are recorded
> below as history. On Cloudflare the same two things are steps 6 and 5b–5c of
> [CLOUDFLARE-CUTOVER.md](CLOUDFLARE-CUTOVER.md) — do them there, not here. Step 3
> and step 4 below are host-independent and still apply.

**Steps 1 and 2 are DONE** (completed 2026-08-06): the host is connected to
GitHub with root directory `ccd-website`, and the GitHub OAuth App is live with
its credentials set on the host. Sign-in at `/admin` works — verified end to end.

**Step 3 is the only thing left for the CMS**: give your editors access.

⚠️ **Separately, the contact forms need one environment variable** before
enquiries reach CCD — see step 4. The code is written and tested; what is left
is a five-minute free signup. Not a CMS issue, but it is losing real enquiries
until it is done.

---

## 1. Connect the host to GitHub — ✅ DONE (on Vercel; redo on Cloudflare)

Without this, a staff member saves in the CMS, the change lands on GitHub, and
**the website never updates.** The CMS would look like it works and silently do
nothing.

On Cloudflare this is CLOUDFLARE-CUTOVER.md step 6. What was done on Vercel:

1. https://vercel.com/account/login-connections → connect your **GitHub** account
2. Open the **ccdgroup** project → **Settings → Git** → connect
   `heyaryansingh/CCD-website`
3. In **Settings → General**, set **Root Directory** to `ccd-website`

   > This matters. The app is in a subfolder. Deploys have been run with the CLI
   > from inside `ccd-website/`, so Root Directory is currently `.` — correct for
   > the CLI, wrong for a git build. Leave it and every automatic deploy fails.

4. Confirm **Production Branch** is `main`

Check it worked: make any small edit at `/admin`, save, and watch a deployment
start within a few seconds.

## 2. Create the GitHub OAuth App — ✅ DONE (URLs change at cutover)

This is what "Sign in with GitHub" at `/admin` talks to.

1. https://github.com/settings/developers → **New OAuth App**
   - **Application name:** `CCD Website Editor`
   - **Homepage URL:** `https://ccdgroup.org`
   - **Authorization callback URL:**
     `https://ccdgroup.org/api/auth/callback`

     This must match exactly — no trailing slash.
2. Generate a client secret. Copy both values now; GitHub shows the secret once.
3. Put them in the host's environment — Cloudflare → Workers & Pages →
   `ccdgroup` → Settings → **Variables and Secrets**, as *Secrets*:

   | Name | Value |
   |---|---|
   | `GITHUB_CLIENT_ID` | the Client ID |
   | `GITHUB_CLIENT_SECRET` | the client secret |

4. Redeploy so the variables take effect (`npm run cf:deploy`, or push a commit
   once step 1 is done).

The two URLs above and `base_url` in `ccd-website/public/admin/config.yml` must
all name the same hostname. `/api/auth` sends no `redirect_uri`, so GitHub always
returns to the callback registered on the app — one OAuth App serves exactly one
address, and changing hosts means changing all three together.

Check it worked: `https://ccdgroup.org/admin` → **Sign in with GitHub** →
you land in the editor. Before this step it correctly shows a
"not configured yet" message rather than an error page.

## 3. Give editors access — ← DO THIS

Repo write access *is* the permission model — there is no separate CMS user list.

GitHub → `heyaryansingh/CCD-website` → **Settings → Collaborators** → add each
person with **Write**. They need a free GitHub account.

To revoke someone's editing, remove them here. Nothing else to change.

## 4. Make the contact forms work — ⚠️ ONE STEP LEFT

The code is done. Contact, volunteer and estimate submissions are **emailed to
CCD** as soon as one environment variable is set. Nothing else to build.

Until it is set the forms tell visitors *"Something went wrong — please email
info@ccdgroup.org directly"*. That is deliberate: the site never tells somebody
their message was sent when nobody received it. But it is a fallback, not a fix.

### Do this (about five minutes, free)

1. Go to **https://resend.com** and sign up **as `info@ccdgroup.org`**.

   > Sign up as the CCD address, not a personal one. Until `ccdgroup.org` is
   > verified with Resend, they will only deliver to the address the account was
   > opened with — which is the address enquiries should reach anyway. It also
   > keeps the account CCD's rather than a developer's.

2. Create an API key and copy it.
3. Add it to the host's environment variables as a **Secret**:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | the key you just copied |

   Cloudflare → Workers & Pages → `ccdgroup` → Settings → **Variables and
   Secrets**. On Vercel, Project → Settings → **Environment Variables**.

4. Redeploy, then send yourself a test message through the contact form on the
   live site. It should arrive at `info@ccdgroup.org` within a few seconds, and
   **replying to it goes straight back to whoever wrote in**.

Free tier is 3,000 emails a month — far beyond anything CCD will send.

### Where the emails go

`FORM_EMAIL_TO` sets the recipient, but it defaults to the contact address in
the CMS (**Settings → Contact details**). So staff can change where enquiries
land without a developer and without touching any environment variable.

### Optional: also keep a database record

Email is what makes enquiries reach a person. If CCD also wants a durable,
searchable record, set up Supabase as well — the endpoint writes to both, and a
submission survives either one failing:

1. Create a free Supabase project
2. Run `ccd-website/supabase/schema.sql` in its SQL editor (4 tables)
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` (the **service role** key)

> The service role key bypasses row-level security. It belongs only in the
> host's environment settings — never in the repo, and never in a `NEXT_PUBLIC_`
> variable.

> ⚠️ Supabase pauses free projects after a week of inactivity. For a form that
> may sit quiet for weeks, treat it as the optional extra and email as the
> thing that must work.

### Check it worked

```bash
cd ccd-website && npm run verify:site -- https://ccdgroup.org
```

"submissions are actually stored" must pass.

---

## Then hand out

Send staff **https://ccdgroup.org/admin** and
[EDITING-THE-WEBSITE.md](EDITING-THE-WEBSITE.md).

Worth doing once, live: walk one person through adding a news item. The concepts
that need explaining are "pages are built from blocks" and "lists appear in more
than one place". Everything else is self-evident.

---

## If something is wrong

| Symptom | Cause |
|---|---|
| "not configured yet" on sign-in | Step 2 not done, or the app was not redeployed after adding the variables |
| Sign-in popup opens then nothing happens | Callback URL does not exactly match `https://ccdgroup.org/api/auth/callback` |
| Editor saves, but the site does not change | Step 1 not done — check GitHub for the commit; if it is there, the host is not building it |
| Automatic deploys fail | Root directory is not set to `ccd-website` |
| "not authorised" | That person is not a collaborator on the repo yet |

## Still open, unrelated to the CMS

- **Shopify:** move the store's primary domain to `shop.the4thbrew.com` before
  retiring `the4thbrew.com`, or every checkout breaks. See
  [DEVELOPER-NOTES.md](DEVELOPER-NOTES.md).
- **`ccdgroup.org`** — moving the domain off Wix onto Cloudflare, including the
  DNS records CCD's Microsoft 365 email depends on:
  [CLOUDFLARE-CUTOVER.md](CLOUDFLARE-CUTOVER.md).
