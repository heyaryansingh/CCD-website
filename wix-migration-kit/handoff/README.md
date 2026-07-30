# CCD website — handoff kit

Everything CCD staff need to run, edit and extend the website without a developer.

**Read this folder. Do not read the `SESSION-*-LOG.md` or `0*-*.md` files one level up** — those are the developer's build journals. They contain half-finished instructions and will cause damage if followed as guidance.

## Start here

| If you are… | Read |
|---|---|
| CCD staff editing content | **[EDITOR-HANDBOOK.md](EDITOR-HANDBOOK.md)** — one section per task, start to finish |
| About to hit Publish | **[BEFORE-YOU-PUBLISH.md](BEFORE-YOU-PUBLISH.md)** — print this, seven checkboxes |
| Writing new copy, news or events | **[CONTENT-STYLE-GUIDE.md](CONTENT-STYLE-GUIDE.md)** — CCD's voice, with templates |
| A CCD officer or board member | **[OWNERSHIP-TRANSFER.md](OWNERSHIP-TRANSFER.md)** — do this before launch, not after |
| Building a new page | **[SECTION-LIBRARY.md](SECTION-LIBRARY.md)** — the five approved blocks |
| Looking up what a CMS field holds | **[CMS-SCHEMA.md](CMS-SCHEMA.md)** — every collection, field by field |
| A developer or contractor hired later | **[ACCESSIBILITY.md](ACCESSIBILITY.md)** + **[global-css-patch.md](global-css-patch.md)** + `SECTION-LIBRARY.md` |
| Moving the page copy into Wix | **[page-copy/_INDEX.md](page-copy/_INDEX.md)** — 18 paste-ready packets |
| Setting heading levels on a page | **[HEADING-OUTLINES.md](HEADING-OUTLINES.md)** — the H1/H2/H3 for all 18 pages |
| Filling in image descriptions | **[ALT-TEXT-DRAFTS.md](ALT-TEXT-DRAFTS.md)** — drafted for every CMS row |
| Fixing the repeated "Learn more" links | **[LINK-TEXT-FIXES.md](LINK-TEXT-FIXES.md)** — 21 exact replacements |

## The three rules that keep this site working

1. **Compose, don't create.** New pages are built from the five blocks in `SECTION-LIBRARY.md`. Never hand-style a section.
2. **Never pick a colour or font by hand.** Apply a `.ccd-*` class. The approved colour pairings are in `ACCESSIBILITY.md` §2.4; every one of them has been contrast-tested.
3. **Two different undo buttons.** Page and layout mistakes → Site → History → Restore. Content mistakes (anything in the CMS) → **Site History will not help you**; recovery is via CMS Backups. Take a manual CMS backup before any bulk edit or deletion. Details in `EDITOR-HANDBOOK.md`.

## Before launch — the short list

Roughly in order. The first four need Dev Mode or admin access; the rest are staff-doable.

- [ ] Apply **[global-css-patch.md](global-css-patch.md)** — one paste, fixes all 8 contrast failures. Start here; it is failing on every page right now.
- [ ] Add the `altText` fields and the Testimonials schema from **[CMS-SCHEMA.md](CMS-SCHEMA.md)** Part 3, then fill them from **[ALT-TEXT-DRAFTS.md](ALT-TEXT-DRAFTS.md)**
- [ ] Re-enter the **17 hero image descriptions** — they were written long ago but the old renderer never applied them, so no hero image has ever had alt text (`ALT-TEXT-DRAFTS.md` §4)
- [ ] Apply the **21 link-text replacements** in [LINK-TEXT-FIXES.md](LINK-TEXT-FIXES.md) — the home page has six identical "Learn more" links
- [ ] Set heading tags from [HEADING-OUTLINES.md](HEADING-OUTLINES.md) — eyebrows must be paragraphs, not headings
- [ ] Pick one form of the Center for Social Impact address: `3932` or `3932-3934` (both are in use). Note: `4004` is a *different*, correct building — do not merge them.
- [ ] Complete Part 3A of `OWNERSHIP-TRANSFER.md` — ownership moves to the org account **while nothing is live**. This window closes at launch.
- [ ] Paste the page copy from **[page-copy/](page-copy/_INDEX.md)** into native Wix text elements, then delete `renderPage.js` and `siteData.js`
- [ ] Decide on the **37 pieces of copy that never rendered** — see the note in `page-copy/_INDEX.md`
- [ ] Give `membershipSignup` and `privacyPolicy` real destinations, or remove the buttons using them
- [ ] Run the Wix Studio **Accessibility Wizard** and fix the heading structure it reports
- [ ] Confirm automatic weekly CMS backups are on
- [ ] Fill in the two named owners and the `<blank>` placeholders in `OWNERSHIP-TRANSFER.md`
- [ ] Take the screenshots referenced in `EDITOR-HANDBOOK.md` into `screenshots/`
- [ ] Resolve the remaining `> VERIFY:` lines against the live Editor (`grep -rn "VERIFY:" .`)
- [ ] After publishing: run axe or Lighthouse, a screen reader pass, keyboard-only, and 200% zoom

## Checking colours

Any new colour must clear WCAG AA before it enters `global.css`:

```bash
node wix-migration-kit/handoff/contrast-check.js
```

It prints every token pairing with its ratio, then re-checks that the prescribed fixes still hold. **Exit code 1 means a fix was reverted.** Add new pairs to the `PAIRS` list at the top when you add a colour.

## What custom code is left

After handoff, exactly one file: `masterPage.js`, which fills in the copyright year. Nothing else.

The old `renderPage.js` / `siteData.js` content renderer is being removed on purpose. It kept all 18 pages of copy inside a 29KB JavaScript file, which meant editing a headline required a developer, and one stray comma rendered a whole page blank. Page text now lives in normal Wix text elements that anyone can edit by double-clicking. Keep it that way — the moment content moves back into code, this folder stops being true.

[page-copy/](page-copy/_INDEX.md) is the migration path: 18 packets listing every piece of copy in page order, ready to paste. It was generated by

```bash
node scripts/export_page_copy.mjs
```

which checks that every single text value in `siteData.js` made it into a packet and fails if any is dropped. Once the copy is in Wix, **Wix is the source of truth** — do not regenerate the packets and do not edit them; they become a historical record.

Regenerating is only useful if you have not started pasting yet.

## For a contractor opening this repository later

The live website is **Wix**. Nothing in this repository is served to the public. Two things here can mislead you:

- `ccd-website/` is a Next.js build used as a **visual reference** for the Wix design. It is not deployed and is not the live site. Do not "fix" it expecting the website to change.

  It does still build and run (verified 2026-07-30: clean build, 26 static pages, all 18 page routes plus the 4 project routes). Run it side by side while rebuilding pages in Wix — it shows the intended design for the copy you are pasting:

  ```bash
  cd ccd-website && npx next dev
  ```

  Useful as a picture of the target, not as something to edit. Nontechnical staff never need it.
- `wix-migration-kit/velo/` holds the retired `renderPage.js` / `siteData.js` renderer. Kept as a record of where the copy came from. Do not reinstate it — see "What custom code is left" above for why.

Everything a person needs to run the website is in this `handoff/` folder. Everything else in `wix-migration-kit/` is a build journal from the original migration and should be read as history, not instructions.
