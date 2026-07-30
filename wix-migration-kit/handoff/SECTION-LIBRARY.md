# CCD Section Library

Wix Studio. Defines the only five reusable blocks nontechnical staff should use to build pages. If a page needs something not in this list, that is a signal to ask the developer, not to freehand a new layout.

---

## Part 1 — How the library works

**Save to Library** turns a section you've built into a reusable component you can drag onto any page in the site, instead of rebuilding it each time.

**Naming convention:** every saved block is named `CCD / <Block name>` — e.g. `CCD / Hero`, `CCD / Card grid`. This keeps all five together at the top of the Library panel and stops them getting lost among one-off page elements.

**The rule for staff:** build new pages by dragging `CCD /` blocks from the Library onto the page, in the order given in Part 3. Inside a placed block, only edit **text and images**. Do not resize, recolor, change fonts, or rearrange the internal layout — those choices are locked so every page keeps the same look.

> VERIFY: whether editing an instance of a Library block that's already placed on a page (text, image swaps) is saved per-instance, or whether Wix Studio treats any edit as a local override that can be reset back to the Library master. Confirm the exact override/reset behavior before training staff on it.

**Confirmed:** editing a saved section's master copy in the Library automatically updates every already-placed instance of that section, on every page it's used on.
(https://support.wix.com/en/article/studio-editor-request-making-global-changes-to-saved-assets)
This applies to saved **sections** specifically — other saved asset types (buttons, text,
images) become independent copies once placed on a page and do **not** update when the
original is edited.

**Why this matters:** because a section master propagates to every page that already uses it,
a fix or an accessibility correction made once in the Library reaches every instance — this
is the main argument for building pages only from library blocks (Part 1's rule) instead of
freehanding one-off sections. Fix it once, fixed everywhere.

---

## Part 2 — The blocks

### 1. Hero

Page-opening band. One per page, always the first section.

| Purpose | Use | Don't |
|---|---|---|
| | Open every page (home uses the slideshow variant of this block; all other pages use the static image variant) | Don't use mid-page as a divider; don't use twice on one page |

**Anatomy** (top to bottom, layered on a full-bleed background image):

| Order | Element | Class | Text length |
|---|---|---|---|
| 1 | Container (background image + dark gradient overlay) | — | — |
| 2 | Eyebrow (Paragraph) | `.ccd-eyebrow` (white variant on dark hero — use gold token per contrast rule, not `.ccd-eyebrow`'s default ink) | max ~30 chars |
| 3 | Heading (H1) | `.ccd-h-ovo-white` | max ~70 chars |
| 4 | Body (Paragraph, optional) | plain body text, white 84% opacity | max ~160 chars |
| 5 | Button (CTA, optional) | `.ccd-btn-gold` | max ~24 chars |

**Layout:** full-width section, min-height ~62vh (page hero) or ~88vh (home slideshow hero); content container left-aligned, max content width 760px, inset from left edge ~6vw; internal vertical stack gap ~24-30px.

**Responsive:** tablet — heading scales down (clamp already handles this if rebuilt as fluid type, otherwise step down one size); mobile — hero height switches from fixed vh to auto/min-height, content padding drops to ~22px sides, button (if present) goes full-width, stacked above eyebrow/heading order unchanged.

**Accessibility contract:** exactly one H1 per page, and the Hero owns it. Background image needs alt text describing the scene (not "hero image"). Overlay must keep white text at minimum 4.5:1 contrast — never lighten the gradient. Button minimum tap target 44×44px. Approved text/bg pair: white text (`#ffffff` / 84% opacity for body) on the dark gradient overlay only — never place dark text on this block.

**Editable by staff / locked:**

| Editable | Locked |
|---|---|
| Background image | Overlay darkness/gradient |
| Eyebrow text | Font, size, letter-spacing |
| Heading text | Heading level (must stay H1) |
| Body text | Section height, padding |
| Button label + link URL | Button color/shape |

---

### 2. Section header

Eyebrow + heading + optional intro paragraph. Opens any section below a hero.

| Purpose | Use | Don't |
|---|---|---|
| | Introduce any section (cards, split, stats, etc.) | Don't use as a standalone page element with nothing below it; don't use in place of the Hero at the top of a page |

**Anatomy:**

| Order | Element | Class | Text length |
|---|---|---|---|
| 1 | Eyebrow (Paragraph) | `.ccd-eyebrow` | max ~30 chars |
| 2 | Heading (H2) | `.ccd-h-ovo` (or `.ccd-h-ovo-white` if section background is dark/green) | max ~70 chars |
| 3 | Intro paragraph (optional) | plain body text, muted color | max ~180 chars |

**Layout:** max content width 820px, left-aligned by default (center only on CTA/testimonial-empty-state variants), bottom margin ~42px before next block starts, no left/right inset of its own — inherits the parent section's 6vw padding.

**Responsive:** tablet — no structural change, only font-size step-down; mobile — heading drops to ~36px, wraps allowed (`overflow-wrap: anywhere`), intro paragraph line-length shortens naturally with container width.

**Accessibility contract:** must be H2 (never H1 — H1 is reserved for the page Hero). Approved text/bg pairs: `.ccd-eyebrow` green-deep-on-light OR gold-on-dark (never gold-on-light — fails contrast); heading ink-on-light or white-on-dark/green; intro paragraph muted-on-light or white-78%-on-dark. No images, no tap targets in this block.

**Editable by staff / locked:**

| Editable | Locked |
|---|---|
| Eyebrow text | Font, spacing, casing |
| Heading text | Heading level, size |
| Intro paragraph text (or delete it) | Max-width, alignment, margin |

---

### 3. Card grid

2/3/4-across repeater. CMS-bindable or static.

| Purpose | Use | Don't |
|---|---|---|
| | Programs, services, news, team, projects — any repeating list of items with image + title + short text | Don't use for a single featured item (use Image + text instead); don't hand-build a grid with individual containers |

**Anatomy** (per card, repeated):

| Order | Element | Class | Text length |
|---|---|---|---|
| 1 | Repeater (container of N cards) | — | — |
| 2 | Image (top of card) | card image, fixed aspect | alt text required |
| 3 | Meta tag (Paragraph, optional — category/date) | small caps blue-tone label | max ~20 chars |
| 4 | Title (H3) | Ovo-style card heading | max ~55 chars |
| 5 | Body (Paragraph) | muted body text | max ~120 chars |
| 6 | Button/link (optional, whole card may be clickable instead) | `.ccd-btn-gold` if a standalone button is used | max ~20 chars |

**Layout:** grid, 3 columns default (set to 2 or 4 per page need), gap ~24px, section padding standard (96px vertical / 6vw horizontal), card padding ~24px, image fixed height ~220px object-fit cover.

**Responsive:** tablet (≤1050px) — drops to 2 columns; mobile (≤640px) — drops to 1 column, image height may reduce.

**Accessibility contract:** card titles are H3 (never skip to H2/H4 — must follow the Section header's H2 above it). Every card image needs descriptive alt text (not filenames). If the whole card is a link, it needs an accessible name — don't rely on "read more" alone. Minimum tap target 44×44px for any button. Approved pairs: white card bg / ink text (light sections) or slate bg / white text (dark variant) — do not mix.

**CMS binding:** repeater can bind to `News`, `Events`, `Projects`, `Team`, `Partners`, `MembershipTiers` (also `Interns`, `ServiceDirectory` using the same shape as `Team`/`ServiceDirectory` below). Real field names, verified against the seed CSVs:

| Collection | Image | Title (H3) | Meta tag | Body | Click-through |
|---|---|---|---|---|---|
| News | `thumb` | `title` | `meta` | `excerpt` | detail page (auto, by row) |
| Events | `thumb` | `title` | `tag` | `blurb` | detail page (auto, by row) |
| Projects | `heroImage` | `title` | `status` | `summary` | detail page at `/slug` (auto) |
| Team | `photo` | `name` | `role` | `tagline` | none (card is not a link) |
| Partners | `logo` | `name` | `category` | `description` | `url` |
| MembershipTiers | — (no image field) | `name` | — | `eligibility` or `benefits` | none |

`Testimonials` is an empty collection with no fields defined yet — do not bind the Card grid to it until a developer defines its schema.

**Editable by staff / locked:**

| Editable | Locked |
|---|---|
| Card images | Grid columns, gap, card padding |
| Meta tag, title, body text | Card border, shadow, hover animation |
| Number of cards (repeater rows, if static) | Font sizes, colors |
| CMS-bound content (edit via CMS collection, not the page) | Repeater binding/field mapping |

---

### 4. CTA band

Full-width green band, heading + gold button.

| Purpose | Use | Don't |
|---|---|---|
| | Drive one action at the end of a section or page (donate, join, contact) | Don't use more than once or twice per page; don't put two competing buttons in it |

**Anatomy:**

| Order | Element | Class | Text length |
|---|---|---|---|
| 1 | Container (band bg) | `.ccd-band-green` | — |
| 2 | Eyebrow (optional) | `.ccd-eyebrow` gold-on-dark variant | max ~30 chars |
| 3 | Heading (H2) | `.ccd-h-ovo-white` | max ~60 chars |
| 4 | Body (optional Paragraph) | white/light body text | max ~140 chars |
| 5 | Button | `.ccd-btn-gold` | max ~24 chars |

**Layout:** full-width band, centered text alignment, max content width ~700px centered, section padding standard, button margin-top ~20px above copy.

**Responsive:** tablet — no structural change; mobile — heading steps down to ~36px, button becomes full-width within the centered content column.

**Accessibility contract:** heading is H2 (or H3 if nested directly under another H2 section — never skip a level). Button minimum 44×44px tap target, label describes the action ("Become a Member", not "Click Here"). Approved pair: white/gold text on green-deep background only (this block does not have a light variant — do not place it on white/offwhite backgrounds).

**Editable by staff / locked:**

| Editable | Locked |
|---|---|
| Eyebrow, heading, body text | Band background color |
| Button label + destination link | Button color/shape, band padding |

---

### 5. Image + text

50/50 split, image left or right.

| Purpose | Use | Don't |
|---|---|---|
| | Narrative sections pairing one photo with supporting copy (about, program detail, timeline intro) | Don't use for lists of 3+ items (use Card grid); don't use for a single CTA-only message (use CTA band) |

**Anatomy:**

| Order | Element | Class | Text length |
|---|---|---|---|
| 1 | Container (2-col grid, reversible) | — | — |
| 2a | Image (one side) | full-bleed within its column | alt text required |
| 2b | Copy column: Eyebrow (optional) | `.ccd-eyebrow` | max ~30 chars |
| — | Heading (H2) | `.ccd-h-ovo` (or white variant on dark bg) | max ~65 chars |
| — | Body (Paragraph) | body text | max ~200 chars |
| — | List (optional, check-list style) | bullet list | max ~10 items, ~50 chars each |
| — | Button (optional) | `.ccd-btn-gold` | max ~24 chars |

**Layout:** 2-column grid, columns roughly 0.92fr / 1fr (copy side slightly narrower), gap ~56px, `reverse` variant swaps which side the copy sits on, section padding standard, image column min-height ~460px object-fit cover.

**Responsive:** tablet — no column change; mobile — collapses to single column, image and copy stack (order depends on `reverse` setting — image typically stays visually first unless design calls for copy-first), image min-height reduces to ~320px.

**Accessibility contract:** heading is H2 (top-level section) or H3 if nested under a Section header's H2 — never skip levels. Image requires descriptive alt text. If on a dark/green background variant, body text must use the light/78%-opacity token, never default ink. Approved pairs: ink-on-white/offwhite, or white-on-green/slate/dark — set by which background variant is chosen for the whole block, never mixed within one instance.

**Editable by staff / locked:**

| Editable | Locked |
|---|---|
| Image | Column ratio, gap |
| Eyebrow, heading, body, list text | Background color variant, reverse direction (set once at build time) |
| Button label + link | Font sizes, padding |

---

## Part 3 — Page recipes

| Page type | Recipe |
|---|---|
| Program/service page | Hero → Section header → Card grid (3-up) → Image+text → CTA band |
| News/events index page | Hero → Section header → Card grid (3-up, CMS-bound to News or Events) → CTA band |
| Simple "about"-style narrative page | Hero → Image+text → Section header → Card grid (3-up) → CTA band |
| Campaign/donate landing page | Hero → Section header → Image+text → CTA band |

These four cover the page types in `03-PAGES-BUILD-GUIDE.md`. Pages with structures beyond these five blocks (slideshow home hero, stats counters, timeline, H.E.A.R.T. band, impact map, marquee partner wall, before/after slider, forms) were custom-built by the developer and are **not** in this Library — they are one-off sections, not reusable blocks. Do not attempt to recreate them by combining the five library blocks.

---

## Part 4 — Rules for whoever comes after

1. Before building anything, check if a `CCD /` Library block already covers it. Reuse before creating.
2. Never hand-style a section from scratch when a Library block exists for that purpose.
3. Never introduce a color outside the token list (`#fec630`, `#e6ac00`, `#209765`, `#124a34`, `#0797d4`, `#37474f`, `#1a1a1a`, `#5b6b72`, `#eef1f2`, `#f5f7f8`, `#ffffff`).
4. Never nest a heading level that breaks document order (no H3 before an H2 in the same section, no skipping from H1 to H3).
5. Exactly one H1 per page, and only the Hero block gets it.
6. Any new reusable block must be documented in this file (with the full spec table from Part 2) before it is used on a live page.
7. If a page needs a section outside these five and the custom sections in `03-PAGES-BUILD-GUIDE.md`, that's a developer task, not a staff drag-and-drop task.
