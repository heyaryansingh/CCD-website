# Execute now — the 90-minute runbook

One linear sequence. Do it in this order. Every step says how to verify it worked and how to undo it.

**Who:** someone logged into the Wix account with Dev Mode access.
**Where:** the Wix Studio staging site "CCD 2026". Not the live legacy site.
**Do not:** publish, attach a domain, or set up billing as part of this. Those are separate decisions.

Keep the Wix tab **in the foreground the whole time.** The IDE will not boot in a hidden tab, and background throttling silently drops input.

---

## Step 0 — Safety net (3 min)

- [ ] Note today's date and time. Site History entries are timestamped; you want to know your "before" point.
- [ ] **Take a manual CMS backup.** Content Manager → Backups → create one now. Site History does NOT cover CMS data, so this is your only undo for steps 2 and 4.
- [ ] Copy the current contents of `src/styles/global.css` into a scratch file so you can diff or revert.

Everything below is reversible if you do these three things. Skip them and step 2 stops being reversible.

---

## Step 1 — The CSS fix (5 min) · fixes 8 live accessibility failures

This is first because it is currently failing on every page for every visitor, and it is the lowest-risk change here.

- [ ] Open the Wix IDE (Dev Mode → the code panel), open the terminal
- [ ] **Paste** the entire contents of [`global-css-append.ide-command.txt`](global-css-append.ide-command.txt)

> Paste it. Do not type it, and do not split it across two pastes. It is ~3KB, and the build logs record the beta IDE crashing on typed input above ~2KB. A heredoc broken in half leaves the shell hanging on its terminator.

- [ ] Click **Sync site**. The status bar must read "synced just now" — click again if it does not.

**Verify:**
- [ ] The footer copyright line is now clearly readable, not faint grey-on-black
- [ ] Press Tab through a page — you can always see which element has focus
- [ ] Tab onto a link inside the green band — the ring should be **gold** there. If it is not, the ancestor selector did not match: change `.ccd-band-green :where(` to `.ccd-band-green:where(` (remove the space) in both places.
- [ ] Run `node wix-migration-kit/handoff/contrast-check.js` — every "Regression guard" line says `ok`, exit code 0

**Undo:** delete the appended block from the end of `global.css`, Sync site. Nothing above it was touched.

---

## Step 2 — CMS fields (20 min)

Source: [`CMS-SCHEMA.md`](CMS-SCHEMA.md) Part 3 for the schema, [`ALT-TEXT-DRAFTS.md`](ALT-TEXT-DRAFTS.md) for the values.

- [ ] Confirm your step-0 backup exists before changing any schema
- [ ] Add `altText` (Text, required) to: **Team, Interns, Partners, Projects, News**
- [ ] Add **two** alt fields where a row holds two images: BeforeAfterPairs → `beforeAltText` + `afterAltText`; News → `thumbAltText`. One description cannot serve two different pictures.
- [ ] Leave SupporterLogos' existing `alt` field alone — do not rename it unless you have confirmed nothing is bound to it
- [ ] Create the **Testimonials** schema (it currently has zero fields): `quote`, `personName`, `personRole`, `photo`, `altText`, `order`, `isActive`
- [ ] Fill the alt text from `ALT-TEXT-DRAFTS.md`. Rows marked `[CHECK IMAGE]` need you to open the photo and confirm the draft matches — most are drafted from row data, not from seeing the image.

**Verify:** open two or three rows and confirm the value saved. Check a row where the draft was marked `[CHECK IMAGE]` and you corrected it.

**Undo:** restore the CMS backup from step 0. Adding a field is harmless; deleting or renaming one is not.

---

## Step 3 — Hero image alt text (10 min) · never been applied

Source: [`ALT-TEXT-DRAFTS.md`](ALT-TEXT-DRAFTS.md) section 4.

All 17 hero descriptions were written long ago, but the retired renderer had no code path for them — so **no hero image on the site has ever had alt text.** This is not new writing; it is re-entering approved copy.

- [ ] For each of the 18 pages, select the hero image in the Editor → Alt Text → paste the value
- [ ] Two are flagged as needing improvement (`brick-campaign`, `donate`) — use the better version given in the doc
- [ ] The `contact` page hero says **4004 Frederick Avenue**. That is correct. It is CCD's own address, a different building from the Center for Social Impact at 3932-3934. Do not "fix" it.

**Verify:** in the Editor, click a hero image and confirm the Alt Text field is populated.

**Undo:** Site → History → Restore (this is a page change, so Site History does cover it).

---

## Step 4 — Heading tags (15 min)

Source: [`HEADING-OUTLINES.md`](HEADING-OUTLINES.md) — every heading on all 18 pages, with its correct tag.

The trap: in Wix the heading *tag* is separate from how the text *looks*. Picking "Heading 2" because the font size looks right is the most common accessibility failure on Wix sites, and it is invisible until someone uses a screen reader.

- [ ] Run the Wix Studio **Accessibility Wizard** → "Organize heading structure"
- [ ] Set each heading's tag from the table for that page
- [ ] **Eyebrows are not headings.** The small caps lines (`IRVINGTON, BALTIMORE`, `HOW IT WORKS`) must be paragraphs styled with `.ccd-eyebrow`. They are labels, not document structure.
- [ ] Exactly one H1 per page. Where a title has an accent line ("Building the block." + "Brick by brick."), those are **one** H1 together, not two headings.

**Verify:** re-run the Accessibility Wizard — it should no longer report missing or skipped heading levels.

**Undo:** Site → History → Restore.

---

## Step 5 — Link labels (10 min)

Source: [`LINK-TEXT-FIXES.md`](LINK-TEXT-FIXES.md) — 21 exact replacements.

- [ ] Apply the "Use this" column as the button label. Destinations do not change.
- [ ] On `/projects`, **keep the status badges visible** ("IN PROGRESS" is useful information). Only the *link label* changes.
- [ ] Where a shorter, more natural phrasing exists, use it. These are safe defaults, not finished writing.
- [ ] Also: `membershipSignup` and `privacyPolicy` have no destination. Give them one or remove the buttons that use them.

**Verify:** on the home page, no two links read the same. Six identical "Learn more" links was the original problem.

**Undo:** Site → History → Restore.

---

## Step 6 — Page copy into native text elements (40 min)

Source: [`page-copy/_INDEX.md`](page-copy/_INDEX.md) → one packet per page.

This is the step that makes the site editable by nontechnical staff. Right now the copy lives in JavaScript.

- [ ] **Do the home page first, completely, and verify it before touching any other page.** If something about the approach is wrong, you want to find out on one page, not eighteen.
- [ ] For each page: paste each "Copy to paste" value into the matching text element, working top to bottom — the packet order is the page order
- [ ] Tick the page off in `page-copy/_INDEX.md` as you finish it
- [ ] **37 rows are marked "never rendered."** That copy was in the code but the old renderer ignored it, so it has never appeared on the site. Read it and decide — use it or drop it deliberately. Do not paste it unread.
- [ ] Optional but useful: run `cd ccd-website && npx next dev` and keep it open beside you. It renders the intended design for the copy you are pasting.

**Only after all 18 pages are done and verified:**

- [ ] Delete `src/public/renderPage.js`
- [ ] Delete `src/public/siteData.js`
- [ ] Remove the `renderPage($w, pages["..."])` call from each of the 18 files in `src/pages/`
- [ ] Keep `masterPage.js` — it fills in the copyright year and is the only custom code that should survive
- [ ] Sync site

**Verify:** every page still shows its full copy with the code deleted. If a page goes blank, that page's copy was never actually pasted — restore and finish it.

**Undo:** Site → History → Restore. Do the deletions as their own step so the restore point is clean.

---

## Step 7 — Confirm it is actually maintainable (5 min)

The whole point. Test it as a staff member would.

- [ ] Double-click a headline in the Editor, change a word, confirm it changes. No code, no IDE.
- [ ] Add a test News row in the CMS, confirm it appears on the site, then delete it.
- [ ] Confirm automatic **weekly CMS backups** are switched on.
- [ ] Set day-to-day staff to the **CMS Editor** role — CMS access, no Editor, no Dev Mode. Nobody except the org account holds owner-level access.
- [ ] Walk one person through `EDITOR-HANDBOOK.md` and watch them do a task without help. Whatever they get stuck on is a documentation bug — fix the doc.

---

## Not part of this runbook

These are decisions, not tasks, and each needs a deliberate owner:

- **Ownership transfer** ([`OWNERSHIP-TRANSFER.md`](OWNERSHIP-TRANSFER.md)) — do it **before** launch, while nothing is live. The invite lapses after 3 days and the receiving Wix account must already exist.
- **Publishing** — a separate decision with domain and billing attached.
- **Post-publish accessibility testing** — axe or Lighthouse, a screen reader pass, keyboard-only, 200% zoom. Only possible once the site is live, and it is the check that catches what a static audit cannot.
- **Screenshots** for the handbook ([`screenshots/README.md`](screenshots/README.md)) — or better, short screen recordings.

---

## If something breaks

**Page, layout or text change** → Site → History → Restore.
**CMS content** (a row, a collection, a field) → Site History will **not** help. Restore the CMS backup from step 0.

That distinction is the single most important thing in this whole kit. If you remember nothing else, remember there are two different undo buttons.
