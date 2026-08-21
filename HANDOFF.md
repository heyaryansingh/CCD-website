# Handing over the CCD website

**Read this first.** It is written for CCD staff, not for developers. Nothing
here requires you to write code.

Last updated: **21 August 2026**, the last day of the internship that built this.

---

## The one-minute version

CCD has **two** websites right now, and that is deliberate but temporary:

| | Address | What it is | Runs on |
|---|---|---|---|
| **The live site** | https://ccdgroup.org | The old Wix site the public sees today | Wix |
| **The new site** | https://ccdgroup.vercel.app | The rebuilt site, finished and working | Vercel (moving to Cloudflare) |

The new site is **done**. It is not the public address yet because switching
`ccdgroup.org` over needs decisions and account access that only CCD can give.
Those steps are written out in [docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md).

**If you do nothing at all, nothing breaks.** The Wix site keeps serving
`ccdgroup.org` and CCD's email keeps working. The new site simply sits at its
temporary address until someone finishes the move.

---

## ⚠️ Do these three things in the next two weeks

Everything else in this document can wait. These cannot, because they all depend
on an account belonging to a person who has left.

### 1. Get the website's code onto a CCD-owned GitHub account

The code lives at **https://github.com/heyaryansingh/CCD-website** — a personal
account. If that account is closed, renamed, or simply forgotten, CCD loses the
website's source code *and* the staff editing tool, which saves into it.

**What to do:** make a free GitHub organisation owned by a CCD email address
(e.g. `ccd-baltimore`), then ask the repository's current owner to *transfer* it
there. GitHub → repository → **Settings** → **General** → scroll to
**Danger Zone** → **Transfer ownership**. It takes about two minutes, keeps all
history, and redirects the old address automatically.

Afterwards, one line in the site's settings must be updated to name the new
location — a developer job of about thirty seconds. The file is
`ccd-website/public/admin/config.yml`, the line beginning `repo:`.

### 2. Make sure more than one person can get in

Right now, editing access is controlled by who is a collaborator on that
repository. Add at least **two** CCD staff members so no single person is a
bottleneck: GitHub → the repository → **Settings** → **Collaborators** → add
each person with **Write** access. They need a free GitHub account.

This is also how you *remove* someone's access later. There is no other user list.

### 3. Write down who owns what

Fill in the table below and keep it somewhere CCD controls — a shared drive, not
a personal laptop. Blank rows are where the handoff is currently incomplete.

| Account | What it is for | Who owns it now | Should be owned by |
|---|---|---|---|
| GitHub `heyaryansingh/CCD-website` | The website's code and all staff edits | A departing intern's personal account | A CCD organisation |
| GitHub OAuth App "CCD Website Editor" | Makes "Sign in with GitHub" work at `/admin` | Same personal account | A CCD organisation |
| Vercel project `ccdgroup` | Hosts the new site today | | Retired after the Cloudflare move |
| Cloudflare | Will host the new site | **Not created yet** | A CCD email address |
| Wix | The current live site, and possibly the `ccdgroup.org` registration | CCD | CCD |
| Microsoft 365 | CCD's email — rides on the same domain settings as the website | CCD | CCD |
| Shopify (The 4th Brew) | Sells the coffee; the website links to its checkout | | CCD |
| PayPal | The Donate button | CCD | CCD |

> **Why this matters more than it looks.** A website outlives the person who
> built it only if the accounts do. Everything else in this repository is
> replaceable; a lost domain or a lost code account is not.

---

## Changing words and pictures on the site

You do not need a developer, and you cannot break anything permanently.

**The editor is at `/admin` on whichever address the site is on** —
https://ccdgroup.vercel.app/admin today, `https://ccdgroup.org/admin` after the move.

Full guide, written for non-technical staff:
**[docs/EDITING-THE-WEBSITE.md](docs/EDITING-THE-WEBSITE.md)**

It covers changing wording, adding news and events, adding people to the team,
uploading photos, fixing translations, adding a page, and what to be careful with.
Every save is recorded with who made it and when, so anything can be undone.

---

## What is still unfinished

Three things. Each is written up properly in the linked document — hand the link
to whoever picks the work up.

### The contact forms do not reach anybody yet

**This is losing real enquiries.** When somebody fills in the contact, volunteer,
or estimate form, nothing is stored. The site currently tells them *"Something
went wrong — please email info@ccdgroup.org directly"*, so messages are not
vanishing silently, but people are being turned away.

Fixing it is about twenty minutes of a developer's time and costs nothing:
[docs/CMS-SETUP.md](docs/CMS-SETUP.md), step 4.

### `ccdgroup.org` still points at Wix

The move is written out step by step, including exactly what protects CCD's
**email** while the domain's settings change hands — that is the one genuinely
risky part, and the document exists to keep it from going wrong:
[docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md).

The finished work for this is on a separate branch of the code called
`cloudflare-cutover`. That is on purpose: the main copy is kept in its safe,
working state until CCD is ready. **A developer will not find this work unless
they are told it exists** — so tell them. The very first step of the cutover
document is the command that brings the two together.

### The 4th Brew shop address must be changed in the right order

Before retiring `the4thbrew.com`, Shopify's **primary domain** has to be moved to
`shop.the4thbrew.com` first. Shopify redirects every checkout link to whatever
its primary domain currently is, so doing this in the wrong order breaks every
purchase. Details in [docs/DEVELOPER-NOTES.md](docs/DEVELOPER-NOTES.md).

---

## Bringing in a new developer

Send them three things:

1. This repository: https://github.com/heyaryansingh/CCD-website
2. **[ccd-website/README.md](ccd-website/README.md)** — how the site is built.
   They should read it before changing anything.
3. Whichever of the three unfinished items above you want done.

To get the site running on their own machine is three commands:

```bash
cd ccd-website
npm install
npm run dev          # then open http://localhost:3000
```

Before they hand work back, they should be able to run `npm run check` inside
`ccd-website` and see it finish without errors. That checks the whole site builds.

**What kind of developer.** Anyone comfortable with JavaScript and React. The
site deliberately uses only three outside libraries, so there is very little
project-specific knowledge to absorb.

**What it costs to run.** Nothing, once the Cloudflare move is done. That was a
deliberate design decision: a free service with no billing relationship cannot
lapse when nobody is watching the invoice.

---

## If something goes wrong

| What you see | What it means | What to do |
|---|---|---|
| The public site looks wrong after an edit | Somebody saved a mistake at `/admin` | Ask a developer to revert it. Tell them roughly when and what. Nothing is lost. |
| `/admin` says "not authorised" | That person is not a collaborator on the repository | Add them — see item 2 above |
| Sign-in opens then does nothing | The site's address and the GitHub app's address no longer match | [docs/CMS-SETUP.md](docs/CMS-SETUP.md), "If something is wrong" |
| Somebody saved, but the site never changed | Automatic rebuilding is not switched on | [docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md), step 6 |
| The site **and** email both vanish | Only possible during the domain move, and only if a step was skipped | [docs/CLOUDFLARE-CUTOVER.md](docs/CLOUDFLARE-CUTOVER.md), "If something breaks" |

---

## What is in this repository

```
ccd-website/    THE WEBSITE. Everything the public sees. Start at its README.
docs/           Guides — editing the site, finishing the setup, moving the domain
media-library/  283 CCD photographs and all 43 videos, sorted by subject and
                viewable straight on GitHub, plus a catalog of every original
assets/         CCD flyers, event slides and campaign graphics
scripts/        Small tools: the media organiser and the colour-contrast checker
```

**Photographs and video.** The full-resolution originals — 61GB — are not in
here. They live in CCD's OneDrive, in the folders shared from Johnny Martin Jr.'s
account, so they already belong to CCD and do not leave with any developer.

`media-library/` holds viewing copies of 283 photographs and all 43 videos, 67
minutes of footage in full, so anyone can see and play what CCD has without a
61GB download. `media-library/media-catalog.csv` lists all 986 original files
with their OneDrive locations.

---

## Three rules that keep the site right

**Gold is a background, never text.** CCD gold `#fec630` on white measures 1.57:1
and fails accessibility standards outright. Gold goes *behind* dark text, or is
used as text on a dark background. On light backgrounds use `#8a6d00` instead.
`node scripts/contrast-check.js` checks this and every other colour pair.

**Two addresses, both correct.** 4004 Frederick Ave is CCD's own address.
3932–3934 Frederick Ave is the Center for Social Impact. Different buildings.
Please do not "fix" one to match the other.

**Write English only.** The site is offered in nine languages, but there is one
copy of the content and it is the English one. Everything else is a translation
of it, kept separately and filled in afterwards. A page with no translation yet
shows in English rather than blank, so publishing before translating is safe.
