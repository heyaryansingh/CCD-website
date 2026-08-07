# Finishing the CMS setup

The CMS is built and deployed. Three things remain that can only be done from a
browser with your accounts. **Until steps 1 and 2 are done, editors cannot sign
in and their saves will not reach the website.**

Budget about 15 minutes.

---

## 1. Connect Vercel to GitHub — REQUIRED

Without this, a staff member saves in the CMS, the change lands on GitHub, and
**the website never updates.** The CMS would look like it works and silently do
nothing.

1. https://vercel.com/account/login-connections → connect your **GitHub** account
2. Open the **ccdgroup** project → **Settings → Git** → connect
   `heyaryansingh/CCD-website`
3. In **Settings → General**, set **Root Directory** to `ccd-website`

   > This matters. The app is in a subfolder. Deploys have been run with the CLI
   > from inside `ccd-website/`, so Root Directory is currently `.` — correct for
   > the CLI, wrong for a git build. Leave it and every automatic deploy fails.

4. Confirm **Production Branch** is `main`

Check it worked: make any small edit at `/admin`, save, and watch a deployment
start in the Vercel dashboard within a few seconds.

## 2. Create the GitHub OAuth App — REQUIRED

This is what "Sign in with GitHub" at `/admin` talks to.

1. https://github.com/settings/developers → **New OAuth App**
   - **Application name:** `CCD Website Editor`
   - **Homepage URL:** `https://ccdgroup.vercel.app`
   - **Authorization callback URL:**
     `https://ccdgroup.vercel.app/api/auth/callback`

     This must match exactly — no trailing slash.
2. Generate a client secret. Copy both values now; GitHub shows the secret once.
3. In Vercel → **ccdgroup → Settings → Environment Variables**, add for
   **Production**:

   | Name | Value |
   |---|---|
   | `GITHUB_CLIENT_ID` | the Client ID |
   | `GITHUB_CLIENT_SECRET` | the client secret |

4. Redeploy so the variables take effect (`npx vercel --prod --yes`, or push a
   commit once step 1 is done).

Check it worked: `https://ccdgroup.vercel.app/admin` → **Sign in with GitHub** →
you land in the editor. Before this step it correctly shows a
"not configured yet" message rather than an error page.

## 3. Give editors access

Repo write access *is* the permission model — there is no separate CMS user list.

GitHub → `heyaryansingh/CCD-website` → **Settings → Collaborators** → add each
person with **Write**. They need a free GitHub account.

To revoke someone's editing, remove them here. Nothing else to change.

---

## Then hand out

Send staff **https://ccdgroup.vercel.app/admin** and
[EDITING-THE-WEBSITE.md](EDITING-THE-WEBSITE.md).

Worth doing once, live: walk one person through adding a news item. The concepts
that need explaining are "pages are built from blocks" and "lists appear in more
than one place". Everything else is self-evident.

---

## If something is wrong

| Symptom | Cause |
|---|---|
| "not configured yet" on sign-in | Step 2 not done, or the app was not redeployed after adding the variables |
| Sign-in popup opens then nothing happens | Callback URL does not exactly match `https://ccdgroup.vercel.app/api/auth/callback` |
| Editor saves, but the site does not change | Step 1 not done — check GitHub for the commit; if it is there, Vercel is not building it |
| Automatic deploys fail | Root Directory is not set to `ccd-website` |
| "not authorised" | That person is not a collaborator on the repo yet |

## Still open, unrelated to the CMS

- **Shopify:** move the store's primary domain to `shop.the4thbrew.com` before
  retiring `the4thbrew.com`, or every checkout breaks. See
  `.agent-orchestration/HANDOFF.md`.
- **`ccdgroup.org`** still points at the old Wix site. Moving it is a separate
  decision — and CCD should not run both sites indefinitely.
