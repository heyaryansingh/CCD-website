# Ready to paste — 2 files, ~2 minutes

These two files complete the site's content layer. An automated session applied
every fix (19 accessible link labels, hero alt text support, the
never-rendered `bullets`/`images` fields) — they only need pasting because
Wix's IDE cannot accept bulk automated input.

## Do this

1. Open the Wix IDE for **CCD 2026 (staging)**: Editor → Code panel → "Code in Wix IDE"
2. Open `src/public/siteData.js`
   ⚠️ It currently contains a broken 3-line fragment (interrupted automated
   edit). That is expected — you are replacing it entirely.
3. Open [siteData.js](siteData.js) from this folder, Select All, Copy
4. In the Wix IDE: Select All, Paste, Save (Ctrl+S)
5. Repeat steps 2–4 for `src/public/renderPage.js` ← [renderPage.js](renderPage.js)
6. Click **Sync site** in the IDE status bar; wait for "synced just now"

## What this delivers

- All 18 pages of copy in the site's data layer, with the 21 link-label
  accessibility fixes already applied (no more six identical "Learn more"s)
- A renderer that now applies hero image alt text and renders the 37 pieces
  of copy the old renderer silently dropped (`bullets`, `images`)

## After pasting

Any page scaffolded with the renderer IDs (see the header of `renderPage.js`)
fills itself with this copy automatically. The long-term plan is still native
text elements (see `../EDITOR-HANDBOOK.md`); this file is the paste **source**
for that migration, page by page, whenever staff are ready.
