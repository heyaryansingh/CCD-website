# CCD Website Editor Handbook

## Who this is for
This guide is for CCD staff who need to update the website — no coding or web design
experience needed. It covers the everyday things: adding a news post, updating the team page,
posting an event, adding a project, swapping a photo, and fixing a mistake.

## What you can safely change
Anything covered by a task below: news, events, team members, projects, partners,
supporter logos, membership tiers, page headlines and paragraphs, and photos. The site is
built so that adding or editing this content updates the live pages automatically — you do
not need to touch any code, and there isn't any code to touch for this content.

## Who to call
See **Getting Help** at the end of this guide before you try to fix anything not listed here,
and always before touching anything on the **DO NOT TOUCH** list.

## Before you touch anything: how undo actually works here
Read **Task 13, "Undoing a mistake — read this before you need it"** now, not after something
goes wrong. In short: page edits (text, images, layout) are covered by Site History. CMS
content (a team member, a news post, an event, a project — anything with its own row in the
CMS) is **not** covered by Site History and is only recoverable from a CMS backup.

---

### 1. Log in and find your way around

**When:** Every time you come to update the site. Do this first.

**Where:** Your web browser, at wix.com/my-account (sign in with your CCD email).

**Steps:**
1. Go to wix.com and click **Log In**, using your CCD email and password.
2. Click on the site named **CCD 2026**.
3. You will land in the **Dashboard**. Think of the Dashboard as the site's filing cabinet —
   this is where you add and edit content: news posts, team members, events, projects,
   partners, and form submissions. Most of your work happens here.
4. To change layout, headlines, or photos that are typed directly onto a page (not pulled
   from a list), click **Edit Site** (usually top right) to open the **Editor**. Think of the
   Editor as the page's canvas — this is where you double-click text or images directly on
   the page to change them.
5. In short: **Dashboard = content** (the "what," things like a new team member or news
   story). **Editor = layout** (the "look," things like a headline on the Home page).
6. To get back to the Dashboard from the Editor, click **Back to Dashboard** (usually top
   left).

**Screenshot needed:** `screenshots/login-and-navigate.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:** N/A — this is just orientation, nothing to publish yet.

**If it goes wrong:** N/A.

> VERIFY: exact label and location of the "Edit Site" button and the "Back to Dashboard" link in the live Wix Studio Dashboard.

---

### 2. Add a news post

**When:** CCD has an announcement, story, or update to share.

**Where:** Dashboard → **CMS (Content Manager)** → **News** collection.

**Steps:**
1. In the Dashboard, click **CMS** (also called **Content Manager** — this is the
   spreadsheet where your content lives; each row becomes a card on the News page).
2. Click into the **News** collection.
3. Click **New Item** (or **+ Add**).
4. Fill in: **title**, **excerpt** (the short summary shown on the card), **body** (the full
   story), and **meta** (the date/category line shown with the post).
5. Click into the **thumb** field and upload the main photo. Add a short description of
   what's in the photo when prompted (this is called "alt text" — it helps people using
   screen readers, and helps search engines).
6. Optionally add more photos under **photos**. Use **instructions** and **contactEmail** if
   the post needs a call-to-action with a contact address.
7. If you're deleting a post or making a bulk edit across several posts, take a manual CMS
   backup first (see Task 13) — this is a CMS content change, and Site History will not save
   you here.
8. Click **Save** (or **Publish**, depending on the button shown).

**Screenshot needed:** `screenshots/add-news-post.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Photo has alt text (a short description) filled in.
- Title and date are correct — the date controls where it sorts on the News page.

**If it goes wrong:** This is CMS content — Site History will not restore it. See **Task 13,
CMS content case**, and recover from a CMS backup if needed.

---

### 3. Add or update a team member

**When:** Someone joins, leaves, or changes role, or their bio/photo needs updating.

**Where:** Dashboard → **CMS** → **Team** collection.

**Steps:**
1. In the Dashboard, click **CMS**, then open the **Team** collection.
2. To add someone new, click **New Item**. To update someone, click their row.
3. Fill in: **name**, **role** (shown in capital letters on the card, no need to type it in
   all caps yourself), **tagline** (one short line), **bio** (the longer paragraph shown when
   a visitor clicks the card), and **quote** and **email** if you have them.
4. Click into the **photo** field and upload a headshot. When prompted, type a short
   description of the photo (alt text) — for example, "Headshot of Jane Doe, smiling,
   outdoors." A photo is optional; if left blank, the card shows the person's initials
   instead.
5. Set **order** — a number controlling where they appear (lower numbers show first).
6. Leave **isActive** checked to show them on the site. Uncheck it instead of deleting the
   row if someone leaves — this keeps their record for later without showing them publicly.
7. If you do need to delete a row, or you're editing several rows at once, take a manual CMS
   backup first (see Task 13) — deletions in CMS content are not covered by Site History.
8. Click **Save**.

**Screenshot needed:** `screenshots/add-team-member.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Photo has alt text describing who is in it.
- **isActive** is checked (on) for anyone who should currently appear.
- **order** number doesn't duplicate someone else's exact spot (a tie is fine, but check the
  team page looks right).

**If it goes wrong:** This is CMS content — Site History will not restore it. See **Task 13,
CMS content case**, and recover from a CMS backup if needed.

---

### 4. Add an event

**When:** CCD is hosting or promoting an upcoming event.

**Where:** Dashboard → **CMS** → **Events** collection.

**Steps:**
1. In the Dashboard, click **CMS**, then open the **Events** collection.
2. Click **New Item**.
3. Fill in: **title**, **date**, **day** and **timeText** (how the date/time is displayed,
   e.g. "Saturday" and "10am–2pm"), **location**, **cost**, **blurb** (short teaser), and
   **body** (full details).
4. Fill in **tag** if the event should show a label (for example "Workshop" or "Fundraiser").
5. Upload a photo under **thumb** and add alt text describing it. Add more under **photos**
   if you have them.
6. If people need to register or ask questions, use **instructions** and **contactEmail**.
   Leave them blank if there's nothing extra to add.
7. If you're deleting an event or bulk-editing several, take a manual CMS backup first (see
   Task 13).
8. Click **Save**.

**Screenshot needed:** `screenshots/add-event.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Date is correct — the Events and News pages sort by date and only show future events as
  "upcoming."
- Photo has alt text.
- **contactEmail** (if filled in) is correct — test it by sending a check email.

**If it goes wrong:** This is CMS content — Site History will not restore it. See **Task 13,
CMS content case**, and recover from a CMS backup if needed.

---

### 5. Add a project

**When:** CCD completes or begins a new community project (like a garden, mural, or
building renovation) that should get its own page.

**Where:** Dashboard → **CMS** → **Projects** collection.

**Steps:**
1. In the Dashboard, click **CMS**, then open the **Projects** collection.
2. Click **New Item**.
3. Fill in: **title**, **slug** (this becomes part of the page's web address — use lowercase
   letters and dashes only, no spaces, for example `oasis-240`), **status** (Completed / In
   Progress / Planned), **location**, and **summary** (the description shown for the
   project).
4. Upload a main photo under **heroImage** and add alt text.
5. Set **order** to control where it appears in the projects list.
6. If you're deleting a project or bulk-editing several, take a manual CMS backup first (see
   Task 13).
7. Click **Save**.
8. This automatically creates a new page for the project at its own web address (based on
   the slug you typed) — you do not need to build a page by hand. It uses the same layout as
   the other project pages.

**Screenshot needed:** `screenshots/add-project.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Slug has no spaces or capital letters, and isn't already used by another project.
- Hero image has alt text.
- Open the new project's page and check the photo and text look right before telling people
  about it.

**If it goes wrong:** This is CMS content — Site History will not restore it. See **Task 13,
CMS content case**, and recover from a CMS backup if needed.

---

### 6. Add or remove a partner / supporter logo

**When:** CCD gains a new partner, funder, or sponsor, or a relationship ends.

**Where:** Dashboard → **CMS** → **Partners** collection (for the Partners page listing) and
**SupporterLogos** collection (for the scrolling logo strip).

**Steps:**
1. In the Dashboard, click **CMS**, then open the **Partners** collection.
2. Click **New Item**. Fill in **name**, **description**, **url** (their website, if any),
   and **category** (one of: funder, design, community, program, member — type it exactly
   as one of these words, lowercase).
3. Upload a **logo** image if you have one, and add alt text (for example, "Logo of
   [Organization Name]"). A logo is optional — if left blank, the site shows a card with just
   the name.
4. Click **Save**.
5. If this partner should also appear in the scrolling logo strip, open the
   **SupporterLogos** collection and repeat with a new row there, uploading the same logo
   with alt text.
6. **Before removing anything, take a manual CMS backup** (see Task 13) — a deleted row is
   only recoverable from a CMS backup, not Site History.
7. To remove a partner, open their row and click **Delete** (or select the row and click the
   trash/delete icon). Do this in both **Partners** and **SupporterLogos** if they appear in
   both.

**Screenshot needed:** `screenshots/add-remove-partner.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Logo has alt text.
- **category** is spelled exactly right (funder / design / community / program / member) —
  a typo here can make the logo not show up in the right group.

**If it goes wrong:** This is CMS content — Site History will not restore it. See **Task 13,
CMS content case**. If you deleted something without taking a backup first, the row may be
gone for good since the last automatic weekly backup — contact one of the people in
**Getting Help** right away.

---

### 7. Update a membership tier

**When:** Pricing, benefits, or eligibility for a membership level changes.

**Where:** Dashboard → **CMS** → **MembershipTiers** collection.

**Steps:**
1. In the Dashboard, click **CMS**, then open the **MembershipTiers** collection.
2. Click the row for the tier you want to change (Non-Resident, Resident, Small Org, Medium
   Org, or Large Org).
3. Update **price**, **setup** (the setup fee), **eligibility**, and **benefits** (add or
   remove lines — each one shows as a separate bullet on the page).
4. **vote** and **featured** are on/off checkboxes: **vote** marks tiers that come with
   voting rights, and **featured** marks the one tier that gets the "Most popular" highlight
   (normally just one tier should have this checked).
5. If you're bulk-editing several tiers at once, take a manual CMS backup first (see Task 13).
6. Click **Save**.

**Screenshot needed:** `screenshots/update-membership-tier.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Only one tier has **featured** checked — checking more than one will highlight multiple
  cards, which looks like a mistake.
- Price and setup fee match what's actually being charged (double check with whoever
  handles payments).

**If it goes wrong:** This is CMS content — Site History will not restore it. See **Task 13,
CMS content case**, and recover from a CMS backup if needed.

---

### 8. Change headline or paragraph text on a regular page

**When:** Wording on a page (not something pulled from a list like News or Team) needs a
small edit — for example, a headline on the Home or About page.

**Where:** Editor (not Dashboard). Click **Edit Site** from the Dashboard to open it.

**Steps:**
1. In the Editor, use the page list (usually on the left) to open the page you want to edit.
2. Find the text on the page and **double-click** directly on it. This puts you into typing
   mode right on the page.
3. Select the words you want to change and type the new text.
4. Click anywhere outside the text box when done to save your change in the Editor.
5. Do not change the font, size, or color while typing — the text should already be using
   the site's built-in styles. If a heading looks like it lost its style after editing, undo
   (Ctrl+Z / Cmd+Z) and try again, editing only the words, not the formatting.

**Screenshot needed:** `screenshots/edit-page-text.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Text still uses the same font/color as the rest of the page (don't hand-pick a new font or
  color — see DO NOT TOUCH).
- Re-read for typos — there's no spellcheck warning in the Editor.

**If it goes wrong:** Go to **Site → History → Restore** to undo (see Task 13).

> VERIFY: whether double-clicking text in the live Editor opens inline editing directly, or opens a side text-settings panel first.

---

### 9. Swap a photo on a page

**When:** A photo on a page (not one in a CMS list like News or Team) needs to be replaced.

**Where:** Editor.

**Steps:**
1. In the Editor, open the page with the photo you want to change.
2. Click once on the photo to select it.
3. Click **Replace Image** in the toolbar that appears next to it.
4. Choose a photo from the Media Manager, or click **Upload** to add a new one from your
   computer.
5. After choosing the photo, look for an **alt text** or **description** field and type a
   short description of what's in the photo — this matters for accessibility.
6. Click outside the photo to finish.

**Screenshot needed:** `screenshots/swap-photo.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Alt text is filled in and describes the photo.
- The new photo isn't stretched or blurry — if it looks distorted, try a different size photo.

**If it goes wrong:** Go to **Site → History → Restore** to undo (see Task 13).

> VERIFY: exact label of the image toolbar button in the live Editor ("Replace Image" vs. "Change Image").

---

### 10. Add a whole new page using saved sections

**When:** CCD needs an entirely new page (not covered by News, Events, Projects, etc.).

**Where:** Editor.

**Steps:**
1. In the Editor, open the pages panel and click **Add Page** (or the **+** next to the page
   list).
2. Choose a blank page and give it a name.
3. Build the page by adding pre-built sections rather than starting from scratch. Open the
   **Add Section** (or **Add Elements**) panel and look under **Saved** or **My Library** for
   the CCD block set.
4. See `SECTION-LIBRARY.md` for the full list of available blocks and what each one is for.
   Only use these block types: **hero**, **section header**, **card grid**, **CTA band**,
   and **image + text**. Do not build new custom sections from scratch — stick to this list
   so the new page matches the rest of the site.
5. Drag each section onto the page in the order you want, then edit its text and images using
   Tasks 8 and 9 above.
6. Add the new page to the site menu if it should appear in navigation: open the pages panel,
   find your page, and check the option to show it in the menu.
7. If a heading on the page needs a different visual look than its meaning (for example, text
   that should read as an H2 but needs to look smaller), use the Editor's **Accessibility
   Wizard** to set the correct heading tag (H1–H6) independently of how it's styled — don't
   just change the font size and leave the underlying heading level wrong.

**In Wix Studio, saved sections update everywhere they're used.** Editing a section's master
copy in the Library automatically updates every already-placed instance of it on every page
(other saved items — buttons, text, images — become independent copies once placed and do
not update this way).
(https://support.wix.com/en/article/studio-editor-request-making-global-changes-to-saved-assets)
In plain terms: if a library section needs a fix, fix it once in the Library and it fixes
itself everywhere that section has already been used — you do not need to hunt down every
page and repeat the edit.

**Screenshot needed:** `screenshots/add-new-page.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Page only uses the approved block types listed in `SECTION-LIBRARY.md`.
- Page is added to the menu if it's meant to be found by visitors, or intentionally left off
  if it's a hidden/landing page.

**If it goes wrong:** This is a page-layout change — go to **Site → History → Restore** to
undo (see Task 13, page changes case).

> VERIFY: exact panel name and location for saved/library sections in the live Wix Studio Editor.

---

### 11. Read form submissions

**When:** Someone fills out a form on the site (newsletter signup, membership interest,
contact, volunteer, Clean & Green estimate) and you need to see or respond to it.

**Where:** Dashboard.

**Steps:**
1. In the Dashboard, go to **Forms & Submissions** — this is the primary place to see and
   manage every form response.
2. Each form also auto-creates a matching collection in the **CMS**, so the same submissions
   are also viewable/exportable there like any other CMS collection.
3. Newsletter sign-ups also feed into **Email Marketing → Audience**, under the list named
   "Block Report."
4. Who gets emailed about a new submission is controlled separately, in **Automations** (not
   in the form itself) — find the "Send an email" action tied to that form and set the
   recipient there.
   (https://support.wix.com/en/article/wix-forms-choosing-who-gets-notified-about-form-submissions)

**Screenshot needed:** `screenshots/read-form-submissions.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:** N/A — this is a viewing task, nothing to publish.

**If it goes wrong:** N/A — you're only viewing information here, nothing to undo.

---

### 12. Publish — and the Before You Publish check

**When:** After any change above, once you're happy with it.

**Where:** Editor or Dashboard — the **Publish** button (usually top right).

**Steps:**
1. Review your change on the page (use **Preview** if available to see it as a visitor would).
2. Go through the **Before You Publish** checks below.
3. Click **Publish**.
4. Open the live site in a new browser tab and confirm your change appears correctly.

**Screenshot needed:** `screenshots/publish-site.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:**
- Every photo you added or changed has alt text (a short description) — see
  `ACCESSIBILITY.md` for the full checklist.
- Text reads correctly with no typos, and links (if any) go to the right place.
- If you're unsure about a change, ask someone in **Getting Help** before publishing rather
  than after.

**If it goes wrong:** See **Task 13** — publishing does not prevent you from rolling back a
page change, but it does not help with lost CMS content either. Which recovery path applies
depends on what kind of change went wrong.

---

### 13. Undoing a mistake — read this before you need it

**If you break something, don't panic — but which fix applies depends on what kind of change
it was. There are two completely different cases. Know which one you're in before you touch
anything.**

**Case A — Page changes.** Text, images, layout, or something you published — anything typed
or dragged directly onto a page in the **Editor** (Tasks 8, 9, 10). This is fully covered by
**Site → History → Restore**:
1. From the Dashboard, click **Site** (top menu), then **History**.
2. You'll see a list of past versions of the site, newest at the top, each with a date and
   time.
3. Click on a version from before your mistake to preview it.
4. Click **Restore** to bring the site back to that version.

**Case B — Content changes.** Anything in the **CMS** — a team member, a news post, an event,
a project, a partner, a membership tier. **Site History does not cover this, at all.**
Restoring a site version will not bring back a deleted or overwritten CMS row.
(https://support.wix.com/en/article/cms-formerly-content-manager-restoring-a-deleted-collection)
The only recovery path is **CMS Backups**: Wix takes an **automatic weekly backup** of your
CMS content, and you can also take a **manual backup** any time (Dashboard → CMS → Backups).
To recover:
1. Go to the CMS's Backups area.
2. Choose the most recent backup from before the mistake (automatic weekly, or a manual one
   if you took one — see the rule below).
3. Restore from it.
4. **Anything changed or deleted since that backup was taken may be gone for good.** This is
   why the manual-backup step in every CMS task above matters — it's your safety net between
   weekly automatic backups.

**The rule:** before any bulk edit or any deletion in the CMS, take a manual CMS backup
first. It takes a minute and it's the only thing standing between a mistake and lost content.

**Screenshot needed:** `screenshots/site-history-restore.png` — how to take it: [screenshots/README.md](screenshots/README.md)

**Check before you publish:** Confirm the restored version (page or CMS) looks right, then
republish if needed (Task 12).

**If it goes wrong:** Contact someone in **Getting Help** — do not keep clicking around
trying different fixes, as this can make it harder to track down the last good version.

---

## DO NOT TOUCH

| Item | Why |
|---|---|
| Wix Studio **Dev Mode** / the site's code panel (IDE) | This holds the site's programming. A wrong edit here can break the whole site, and it is not something that can be undone with Site History. |
| `global.css` file | This file controls every color, font, and style across the whole site in one place. Editing it changes the look of every page at once, on purpose or not. |
| `masterPage.js` file | This is the one small piece of code left on the site — it automatically keeps the copyright year up to date in the footer. It should never be opened or edited. |
| CMS **field names** (the column headers) — e.g. Team: `name, role, tagline, bio, quote, email, photo, order, isActive`; Interns: `name, role, bio, email, photo, order, cohort, isActive`; Partners: `name, description, url, category, logo`; MembershipTiers: `name, price, setup, eligibility, benefits, vote, featured, order`; News: `meta, title, thumb, excerpt, body, photos, instructions, contactEmail`; Events: `title, date, day, timeText, location, cost, tag, blurb, body, thumb, photos, instructions, contactEmail`; Projects: `title, slug, status, location, summary, heroImage, order`; SiteLinks: `key, url, label`; ServiceDirectory: `area, person, title, email`; SupporterLogos: `src, alt`; BeforeAfterPairs: `label, beforeImage, afterImage` | Changing a value inside a field (the text you type) is fine and expected. Renaming a field itself breaks the connection between that data and the page — the page will stop showing that content correctly. |
| The site's **header and footer** master sections | These appear on every page. Editing them here changes them everywhere at once — a small mistake shows up site-wide. |
| **Deleting** a CMS collection (like Team, News, Events) | This deletes all the rows and content inside it, and can break the pages that depend on it. Add, edit, or remove individual rows instead — never delete the whole collection. |
| Site **domain / DNS settings** | This controls where ccdgroup.org points on the internet. A mistake here can take the whole site offline for visitors. |

## Getting help

- Internal contact 1: `<name>` — role/area:
- Internal contact 2: `<name>` — role/area:
- **Wix Support**: available from the Dashboard (Help icon) or wix.com/support, for
  anything about how the Wix platform itself works.
- For anything on the **DO NOT TOUCH** list above, hire a **Wix Partner** (a certified Wix
  professional) rather than attempting it — search "Wix Partners" from the Wix support site.
