# Session 3 Log — header build, automation root-cause found

**Date:** 2026-07-18 · Site: CCD 2026 (staging), unpublished. Live site untouched.

## ROOT CAUSE of all Session-2/3 editor flakiness (READ FIRST)
**Chrome background-tab throttling.** When the automation tab group's window is not the user's foreground window, `document.visibilityState === "hidden"` and Chrome throttles the Wix Studio renderer:
- clicks/keys get swallowed or land 3–10s late
- `Page.captureScreenshot` times out (30s)
- captures come back as 2.5×-cropped top-left views (the "random zoom" from Session 2 — it is NOT random)
- Wix autosave can wedge mid-flight ("Leave site?" dialog blocks navigation; fix: `window.onbeforeunload=null` via JS, then reload)

**Session start checklist:** (1) open editor in the session tab, (2) JS-check `document.visibilityState` — if "hidden", ask Ary to click the Claude-group Wix tab and keep that window frontmost, THEN start clicking. With a visible window the editor drives cleanly (~20 actions in a row worked at session start).

**Additional findings (end of session 3):**
- An editor loaded **while the tab is hidden never becomes interactive** (Wix Studio init depends on requestAnimationFrame). Foreground the window FIRST, then load/reload the editor.
- WebAudio keep-alive (tiny oscillator) runs but does NOT unfreeze input/rendering — don't bother.
- Wix "Leave site?" unsaved-changes dialogs while wedged: clear with `window.onbeforeunload=null` via JS, then reload — no work was lost (autosave had already flushed all real edits; verified after every reload via canvas DOM).
- If Cowork's desktop-control permission dialog is used to raise Chrome, approve it quickly — it times out in 180s.

## Done this session (persisted, verified via canvas DOM)
- Top-row container background **#124A34** via Inspector → Design → Fill color & opacity → theme swatch "Color 9" (the control Session 2 couldn't find — it's right in the Inspector when the Container is selected).
- Grid rows set **34px / 76px** via Header selected → Inspector → Layout → Rows (2) → expand ▶ → per-row unit dropdown "Min/max→Pixels (px)" → type 34 / 76. (Canvas chip drag/click not needed; chips are display-only in customize mode.)
- Utility text #1 created in top row: `CLEAN & GREEN SERVICES` — Ropa Sans (site default), **12px**, letter-spacing **0.16em**, color **white** (theme swatch 1), at cell X517 Y0 W232. Styled via Text Inspector (size field, Spacing ↔ field, Color swatch → picker).
- A styled duplicate was made and lost during the throttling fight — recreate with Ctrl+D when resuming.

## Technique notes that WORK (visible window assumed)
- **Duplicate+retext loop:** select styled text → Ctrl+D → copy lands +20/+20 → double-click copy → (if it selects Container, double-click again) → Edit Text → Ctrl+A → type new string → Escape. Copies inherit all styling.
- **Right-click selects the exact element under cursor** when left/double-click picks the parent; Escape closes the menu and keeps selection.
- **Canvas DOM is same-origin and readable**: `iframe#preview-frame.contentDocument`, comps = `[id^="comp-"]`; use `getBoundingClientRect()` + iframe offset for precise click coords, and to VERIFY state (text content, computed color) without screenshots.
- **Breadcrumb** (`[class*="breadcrumb"]`) + Inspector X/Y inputs (DOM-read) tell you what's selected without a screenshot.
- Editor splash keeps a hidden "LOADING" string in DOM — don't use it as a readiness probe; probe for `[id^="comp-"]` in preview-frame instead.

## COMPLETED after window fix (same session, all DOM-verified)
**§A utility bar — DONE:** 4 texts placed Y7, right-aligned run: CLEAN & GREEN SERVICES (X561 W206 → Clean And Green pg), TOOL BANK (X781 W96 → Tool Bank pg), FACILITIES BOOKING (X891 W166 → Contact pg), (410) 205-2488 (X1071 W112 → tel:+14102052488). Social Bar comp `…mrqjcs4e` at X1197 Y9, 2 icons 16px/12px gap, IG→instagram.com/ccd_group/, FB→facebook.com/CoopCommunity.
**§B main nav — DONE except logo swap:** wordmark retexted to "Cooperative Community Development" (Ovo 18px, W310, one line). DONATE button (comp `…mrqjvszh`): X1099 Y17 W142 H42, fill #FEC630, text #1A1A1A, radius 0, linked → Donate page — sits in grid row 2. Header Scroll effect = **Freeze** (sticky). Menu (X750 Y38 W475): top level = Home / About▾ / Programs▾ / Get Involved▾ / Projects / News / Contact, PLUS all 14 sub-pages added as FLAT items (About, What Is A Coop, Team, Partners, Programs, Coop Market, Tool Bank, Center For Social Impact, Clean And Green, Membership, Brick Campaign, Events, Donate, Volunteer).

## Remaining for next session (ordered)
1. **Menu nesting (MANUAL/Ary — 2 min):** in Manage Menu, drag the 14 flat page items under their dropdowns (About▾: About/What Is A Coop/Team/Partners · Programs▾: Center For Social Impact/Clean And Green/Coop Market/Tool Bank/Programs · Get Involved▾: Membership/Volunteer/Donate/Brick Campaign/Events). Automation can't drag-with-autoscroll in this list; human drag is trivial. Optionally rename per script §B4 (Our Story, What is a Co-op?, etc. via item Edit).
2. Menu overlaps DONATE — after nesting, set Menu W≈330 (X750) so it ends before X1090.
3. **Logo swap** (§B2): select logo image in Stack → Replace image → Media Manager `site-media/ccd-logo.png` → 44px height. (Media Manager iframe = coordinate clicks only.)
4. Delete the stray empty paragraph ("P" row in Layers under the header container).
5. Social icons are black — recolor white via Set Social Links → Replace Icon (white variants) — 2 icons.
6. DONATE text weight → bold via button Text section if desired.
7. **§C footer — STARTED:** Footer H=480, bg #1A1A1A, bottom bar text done (comp `…mrqkcjnc`: "Copyright 2026 Cooperative Community Development Inc. · Proud member of MANO · Built for the block." — 12px #5B6B72, X282 Y445 W700). REMAINING: newsletter band (§C2), 4 columns (§C3), then §D Save to Library, then doc 03 pages.
   - Custom hex colors: picker's bottom hex LABEL is not typable; use My colors "+ Add" → Custom Color → HEX input → Apply.

## Working technique (proven this session)
- Selection: Layers panel row-click (panel OVERLAYS canvas at x<350 — CLOSE it before clicking canvas/toolbar buttons underneath!).
- Retext: select → click "Edit Text"/"Change Text" toolbar button (DOM-locate by text) → Ctrl+A → type → Escape. NEVER Ctrl+D while in edit mode (it types "d" over your selection).
- Geometry: Inspector X/Y/W fields (DOM-locate inputs); set W BEFORE X (W changes re-anchor right edge).
- Dialogs (link picker, social links, menu manager): all coordinates stable; type-to-filter works in page dropdowns; "Add Site Pages" supports multi-check.
- Verify EVERYTHING via preview-frame DOM instead of screenshots where possible.

## global.css design tokens (LIVE — written via Wix IDE terminal, synced)
`src/styles/global.css` now exists on the staging site (created via ide.wix-code.com terminal — `cat > file << 'EOF'` heredoc; click "Sync site" in the IDE status bar after writes). Classes available to assign on any element via Inspector → **Add custom CSS**:

| Class | Use for |
|---|---|
| `.ccd-band-green` | green bars/bands (#124A34) |
| `.ccd-utility-text` | 12px caps white utility links (gold hover) |
| `.ccd-wordmark` | Ovo 18px ink |
| `.ccd-nav-link` | nav items — 14px caps, gold underline hover |
| `.ccd-btn-gold` | gold square button (bold caps, dark text) |
| `.ccd-h-ovo` / `.ccd-h-ovo-white` | Ovo headings (ink / white) |
| `.ccd-eyebrow` | 12px caps green section eyebrows |
| `.ccd-footer` | #1A1A1A footer bg |
| `.ccd-footer-text` | 14px off-white footer copy (gold link hover) |
| `.ccd-footer-muted` | 12px #5B6B72 bottom bar |

Tokens as CSS vars: `--ccd-gold/green/ink/muted/paper`. **Workflow for all doc-03 page builds:** scaffold with Wix designed sections → retext → assign these classes instead of hand-styling. IDE terminal is also the fast path for any future code/CSS work.

## Velo code layer (written via Wix IDE — ide.wix-code.com, terminal)
The site now has a code-driven content architecture. In the IDE workspace:
- `src/styles/global.css` — CCD tokens/classes (synced ✓, verified on site).
- `src/public/renderPage.js` — generic renderer; fills placeholder IDs from data. **ID convention** (assign in editor; every ID optional): hero `#pageEyebrow #pageTitle #pageAccent #pageBody #heroCta`; per section i: `#sec{i}Eyebrow/Title/Body/Cta`, stats `#sec{i}Stat{j}Value/Label`, steps `#sec{i}Step{j}N/Title/Body`, cards `#sec{i}Card{j}Title/Body/Btn`, timeline `#sec{i}Item{j}Year/Title/Body`.
- `src/pages/*.js` — ALL 18 page files wired: `renderPage($w, pages["<key>"])`.
- `src/pages/masterPage.js` — auto-fills `#copyrightText` with the current year.
- `src/public/siteData.js` — **PLACEHOLDER (pages={})**. The FULL data file (all 18 pages of copy, generated from ccd-website/lib/siteData.ts) is at **`wix-migration-kit/velo/siteData.js`** — open the IDE, open src/public/siteData.js, select-all, paste the full file, save, click "Sync site". (Terminal-typing 39KB proved fragile — the Beta IDE recycled its container mid-transfer; paste is the reliable route.)
- ⚠️ If the status bar doesn't show "synced just now" after the last stub write, click **Sync site** once — the files persist in the IDE workspace either way.

**Page-build flow now:** editor: drop designed sections → assign the IDs above + CSS classes → content appears automatically from siteData. CMS-bound sections (team/partners/projects/news repeaters) still bind via editor datasets.

**PROVEN transfer technique for big files → IDE (next session, do this first):** with the Wix IDE tab VISIBLE and terminal open, dispatch a synthetic paste via the extension's JS tool — find `.xterm-helper-textarea`, `dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt}))` where dt is a DataTransfer carrying `cat > src/public/siteData.js << 'JSEOF'\n<entire file>\nJSEOF\n`. One call, no typing-corruption risk (xterm accepts untrusted paste events; bracketed paste handles newlines). Base64-wrap the command and decode with atob+TextDecoder inside the JS to avoid quoting issues. Terminal-typing >2KB commands and hidden-tab work both crash the Beta IDE — avoid.
⚠️ The IDE cannot BOOT in a hidden tab ("Wix IDE needs to reload" loop) — foreground it first, always.

## Guardrails unchanged
Staging site only. Never touch live "CCD" site. No publish, no domain, no billing.
