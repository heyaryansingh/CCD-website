# CCD Website Accessibility Audit and Fix Spec

**Audience:** developer / contractor handoff. Precise, technical.
**Companion doc:** `BEFORE-YOU-PUBLISH.md` (plain-language card for staff).
**Site:** Cooperative Community Development Inc (CCD), Baltimore nonprofit. Wix Studio, currently unpublished staging site.
**Target standard:** WCAG 2.1 Level AA. This is a public-facing nonprofit site with real ADA Title III exposure — AA is the floor, not a stretch goal.

---

## 1. Scope and standard

### 1.1 What this document is

This is a **static design-and-content audit**: a manual review of the design tokens (`global.css`), the CMS content model, the page/section library, and Wix Studio's own structural conventions (headings, dynamic pages, navigation). It includes one piece of automated-equivalent evidence: a manually computed WCAG 2.1 contrast-ratio table for every colour pairing used in the design system (Section 2).

### 1.2 What this document is NOT

No automated accessibility scanner (axe, WAVE, Lighthouse, IBM Equal Access Checker) has been run. No assistive-technology test has been performed. **This is because the site is not yet published** — none of those tools or a screen reader can meaningfully evaluate a page that isn't live at a URL. Wix's own **Accessibility Wizard** (Editor → Site menu) has not been run either as part of this audit; it should be run before launch as a baseline check, but it only catches a subset of AA issues (it will not catch, for example, mid-green text failing contrast, or a dynamic page template producing duplicate titles) — treat it as a floor, not a pass.

> VERIFY: confirm the Accessibility Wizard has been run in the Wix Studio editor and its findings folded into the "Before launch" row of Section 10.

### 1.3 Testing still required before launch (and the mechanism for each)

| Test | Tool / method | Why it matters |
|---|---|---|
| Automated scan | axe DevTools or WAVE browser extension, run against the published (or a staging-preview) URL, every template page | Catches missing alt text, empty links, form-label mismatches, ARIA misuse — fast net for mechanical errors |
| Performance/accessibility score | Lighthouse (Chrome DevTools → Lighthouse → Accessibility) | Catches contrast issues at rendered scale, tap-target sizing, some heading-order errors |
| Screen reader pass | NVDA (Windows, free) or VoiceOver (Mac/iOS), navigate every template page top to bottom without a mouse | Only real test of whether content and structure make sense read aloud, in order |
| Keyboard-only pass | Unplug the mouse; Tab/Shift+Tab/Enter/Space/Esc through every page, including the nav's nested menus and every form | Confirms focus order, focus visibility, and that nothing is a mouse-only trap |
| 200% zoom | Browser zoom to 200% (not just text-size, full page zoom), check every template page for clipped or overlapping content | WCAG 1.4.4/1.4.10 — required, commonly broken by fixed-width Wix elements |
| Mobile pass | Real device or Chrome device emulation, portrait and landscape, on the nav, forms, and any dynamic Projects page | Tap targets, reflow, and the mobile hamburger menu are separate implementations from desktop and can fail independently |

None of these six are optional; none have been run yet. Section 10 places them in "Before launch."

---

## 2. Colour contrast findings

All ratios below are computed WCAG 2.1 relative-luminance contrast ratios against the actual hex values in `global.css`. AA requires **4.5:1** for normal text, **3:1** for large text (≥24px, or ≥18.66px/14pt bold) and for UI-component/graphical-object boundaries (e.g. focus rings, button outlines, form-field borders). These numbers are final — do not recompute or alter them without re-running a verified contrast tool.

### 2.1 PASS

| Pairing | Class / usage | Ratio |
|---|---|---|
| ink on gold | `.ccd-btn-gold` | 11.05:1 |
| white on green-deep | `.ccd-utility-text` | 10.22:1 |
| gold on green-deep | `.ccd-utility-text` hover | 6.49:1 |
| gold on ink | `.ccd-footer-text` link hover | 11.05:1 |
| offwhite on ink | `.ccd-footer-text` | 16.20:1 |
| green-deep on white | `.ccd-eyebrow` | 10.22:1 |
| ink on white | `.ccd-h-ovo` | 17.40:1 |
| ink on soft | body text on `#eef1f2` | 15.33:1 |
| ink on offwhite | body text on `#f5f7f8` | 16.20:1 |
| white on ink | `.ccd-h-ovo-white` | 17.40:1 |
| slate on white | body text | 9.65:1 |
| white on slate | body text | 9.65:1 |
| muted on white | secondary text `#5b6b72` on white | 5.54:1 (passes AA; fails AAA — fine for AA target) |

### 2.2 FAIL

| Pair | Ratio | Verdict | Prescribed fix |
|---|---|---|---|
| gold `#fec630` as **text** on white | 1.57 | Fails even as large text | Gold is **never text or a meaningful icon on a light background.** No gold-family hue reaches 4.5:1 on white while still reading as gold — the solved value `#91711b` (4.58:1) is olive-brown, not gold. Gold is a **fill behind dark text**, or text/underline on ink or green-deep only. |
| gold-dark `#e6ac00` as text on white | 2.05 | FAIL | Same rule as above. |
| `.ccd-nav-link` gold underline on hover (white background) | 1.57 | FAIL — non-text UI contrast needs 3:1 | Change the hover underline colour to green-deep `#124a34`, or to `#b78f23` (3.01:1) if the gold family must be kept. Also add a second, non-colour cue on hover (weight change, or a persistent low-opacity underline that darkens) — hover must not be colour-only (see 2.4 rule R2). |
| `.ccd-footer-muted` muted `#5b6b72` on ink `#1a1a1a` | 3.14 | **FAIL — already shipped, on the live bottom copyright bar of every page** | Change the token to `#77848a` (**4.52:1**). This is the single highest-priority fix in this document — see 2.3. |
| white text on mid-green `#209765` | 3.70 | FAIL as normal text; PASSES as large text (≥24px or ≥18.66px bold) | Restrict mid-green bands to large Ovo headings only, OR darken the band to `#1c865a` (4.56:1) for any body-size white text on it. When in doubt, use green-deep `#124a34` (10.22:1) instead of mid-green for a text-bearing band. |
| mid-green `#209765` as text on white | 3.70 | FAIL | Use green-deep `#124a34` (10.22:1) for green text on light backgrounds. Reserve `#209765` for large decorative fills (icons, illustration accents, large headline colour on a dark band), never for body-size text. |
| blue `#0797d4` as a link on white | 3.29 | FAIL as normal text; passes as large text | Darken to `#067db0` (4.60:1) for any link or body-size text use. |
| white on blue `#0797d4` | 3.29 | FAIL as normal text | Same fix: use `#067db0` as the fill. |

### 2.3 Fix these in `global.css`

Token-level changes only. The developer applying this should treat these as a small, self-contained diff against the existing custom-property block in `global.css` — do not touch anything else in the file (this document does not edit `global.css`; the change is prescribed here for whoever holds edit rights to that file).

```
/* BEFORE */
--ccd-muted-on-dark: #5b6b72;      /* 3.14:1 on ink — FAILS AA, live on every page footer */
--ccd-nav-hover: #fec630;          /* 1.57:1 on white — FAILS non-text 3:1 */
--ccd-green-text: #209765;         /* 3.70:1 on white — FAILS normal-text AA */
--ccd-blue-link: #0797d4;          /* 3.29:1 on white — FAILS normal-text AA */

/* AFTER */
--ccd-muted-on-dark: #77848a;      /* 4.52:1 on ink #1a1a1a — PASSES */
--ccd-nav-hover: #124a34;          /* green-deep, matches existing PASS token; or #b78f23 (3.01:1) to keep a gold family hue */
--ccd-green-text: #124a34;         /* green-deep, 10.22:1 on white — reuse the existing eyebrow token, no new variable needed */
--ccd-blue-link: #067db0;          /* 4.60:1 on white */
```

**Highest priority: `--ccd-muted-on-dark`.** Everything else on this list is scoped to hover states or specific text colours that a staff member could avoid by following the rules table below. The footer-muted failure is different in kind: it is baked into `.ccd-footer-muted`, which is **already live on the bottom copyright bar of every single page on the site**. It is the one failure that needs zero user action to trigger — it is failing right now, on every page, for every visitor. Fix it first.

**Note on variable names.** `global.css` currently defines only five custom properties: `--ccd-gold`, `--ccd-green`, `--ccd-ink`, `--ccd-muted`, `--ccd-paper`. The names in the diff above other than `--ccd-muted` are therefore **new variables to add**, not existing ones to change. Add them; do not rename what is there.

**Do not "fix" `--ccd-muted` in place — it is shared, and one value cannot serve both backgrounds.** `--ccd-muted` `#5b6b72` is used both on white (5.54:1, **passes**) and on the ink footer (3.14:1, **fails**). Lightening the single shared token to `#77848a` fixes the footer but drops the on-white use to **3.85:1, a new failure**. Verified: no grey in this hue family clears 4.5:1 against white and `#1a1a1a` simultaneously — the two requirements pull in opposite directions.

The correct fix is **two tokens**:

```css
--ccd-muted:         #5b6b72;  /* on white/offwhite/soft — 5.54:1, unchanged */
--ccd-muted-on-dark: #77848a;  /* on ink #1a1a1a — 4.52:1, NEW */
```

`.ccd-footer-muted` must reference `--ccd-muted-on-dark`. Anyone tempted to consolidate these two tokens back into one should re-run `node contrast-check.js` first.

### 2.4 Rules table — approved and forbidden pairings per class

This table is what stops a future edit from reintroducing a contrast failure. Any new use of a `.ccd-*` class should be checked against it before publishing.

| Class | Approved foreground/background | Forbidden |
|---|---|---|
| `.ccd-band-green` (bg green-deep) | white or gold text/icons on this band | Do not place mid-green `#209765` body text on this band (green-on-green, unreadable regardless of ratio math) |
| `.ccd-utility-text` | white on green-deep (default), gold on green-deep (hover only) | Never on a white or light-band background |
| `.ccd-wordmark` | ink on white/offwhite/soft only | Not on gold, not on mid-green |
| `.ccd-nav-link` | ink or slate text on white; hover underline in green-deep (`#124a34`) after the fix in 2.3 | Gold hover underline on a white/light background (current state — fails 3:1); colour-only hover with no secondary cue |
| `.ccd-btn-gold` | ink text on gold fill — this is the one approved gold pairing, and it already passes at 11.05:1 | Gold as the text/foreground colour on any background; gold-dark `#e6ac00` as text on white |
| `.ccd-h-ovo` | ink on white/offwhite/soft | Gold or mid-green as the heading colour on a light background |
| `.ccd-h-ovo-white` | white on ink or green-deep | White on mid-green for body-size headings under 24px/18.66px-bold; fine for large decorative headings only |
| `.ccd-eyebrow` | green-deep on white (default, 10.22:1) | Do not reuse mid-green `#209765` for eyebrow text — use the green-deep token every time |
| `.ccd-footer` (bg ink) | offwhite or white text; gold link-hover | Mid-green or blue at their unmodified values as text on ink — check against 2.3 fixed values first |
| `.ccd-footer-text` | offwhite on ink (16.20:1); gold on ink for hover (11.05:1) | — |
| `.ccd-footer-muted` | `#77848a` on ink (post-fix, 4.52:1) | The current `#5b6b72` value — do not reintroduce it anywhere else in the site either |

---

## 3. Heading semantics

### 3.1 The Wix trap

In Wix, the heading **tag** (H1 through H6, the actual semantic markup a screen reader announces) is a separate setting from the **visual style** (font size, weight, colour) applied to a text element. It is extremely common — and it is the default failure mode on Wix builds — for a designer or editor to pick "Heading 3" purely because it is the font size they want for a given spot on the page, with no thought to whether that text is structurally a level-3 heading of anything. The result is pages with three H1s, a heading level that jumps from H2 straight to H5, or a large decorative pull-quote marked up as an H1 because it needed to look big.

Screen-reader users frequently navigate a page **by heading level alone** (press H to jump heading-to-heading, or open a headings list). A broken hierarchy makes that navigation method actively misleading rather than merely cosmetic.

### 3.2 Rules

- **Exactly one H1 per page**, and it must be the real subject of that page — the org name on the homepage, the project name on a Projects (Item) dynamic page, the article headline on a News item, etc. Never use H1 for a decorative section headline that repeats elsewhere on the page.
- **No skipped levels.** H1 → H2 → H3 in order of appearance and nesting. Don't jump from H2 to H4 because H3's default font size wasn't wanted — apply a custom style to an H3 tag instead of borrowing a smaller tag's default look.
- **Eyebrows are not headings.** The small caps label above a section title (`.ccd-eyebrow`) is a paragraph, styled with the `.ccd-eyebrow` class, not a Heading tag. It is not a section title in its own right; it is a label for the heading that follows it.
- **Decorative large text is a styled paragraph**, not a heading tag. If a big Ovo-font quote or callout needs to be visually large but is not actually a structural heading of the surrounding content, apply `.ccd-h-ovo`'s visual style to a paragraph element (or a suitably classed text box) — do not borrow an H2/H3 tag just for the font size.

### 3.3 Common Wix editing mistakes that break this

- Picking "Heading 2" for a pull-quote because H2's default size looks right, when the pull-quote isn't a structural section of the page. Fix: style a paragraph to look like an H2 instead.
- Reusing the homepage's H1 wording ("Cooperative Community Development") as the H1 on every other page too, because it was duplicated from a template. Fix: each page's H1 is that page's own subject.
- A repeater (e.g. the Team grid, the News list) where every card's name/title is marked as an H3, producing a page with fifteen H3s in a row with no H2 grouping them. This is technically not "skipped levels" but it does flatten the page's real structure — group repeater output under one H2 ("Our Team") so the outline still reads as a hierarchy, not a flat list of same-level headings.
- Marking the `.ccd-eyebrow` label as an H4 "so it's slightly bigger than body text." This is the single most common instance of the Section 3.1 trap on this design system, because `.ccd-eyebrow` is visually styled like a small heading. It is not one — see 3.2.

### 3.4 Per-page-archetype heading outline example

**Homepage**
```
H1  Cooperative Community Development
H2  What We Do
  H3  Co-op Market
  H3  Youth Programs
H2  Our Impact
H2  Get Involved
```

**Projects (Item) dynamic page** — one instance per CMS item, title driven by the item's own fields, never a shared static string:
```
H1  {Project.Title}          <- e.g. "Irvington Corner Store Revival"
H2  Project Overview
H2  Timeline
H2  Related Projects
```

**News article**
```
H1  {News.Headline}
H2  (any in-article subheads, if present)
```

**Team / staff listing page**
```
H1  Our Team
H2  Leadership
H2  Staff
H2  Interns
```
(Individual person names on a listing card are not headings — they're labelled text within a repeater item, unless the page is a single person's dedicated bio, in which case that person's name is the H1.)

---

## 4. Alt text as a CMS field

### 4.1 The prescription

Add a **required** text field named `altText` to these seven collections: **Team, Interns, Partners, Projects, News, BeforeAfterPairs, SupporterLogos**.

### 4.2 Why a required field, not a reminder

A required column in a CMS collection blocks the record from being considered complete — Wix (and most CMS-driven workflows) will visibly flag an empty required field, and staff filling in a new Team member or News post cannot skip past it without noticing. A note in a training doc or a comment in the Media Manager saying "remember to set alt text" is invisible at the moment of data entry and gets skipped under time pressure, every time. This is a behavioural argument, not a technical one: make the correct behaviour the only path through the form, rather than relying on staff to remember a rule that lives in a different document from the one they're looking at.

### 4.3 Writing rules, with CCD-specific examples

- **A person:** name, role, and what they're doing if the image shows an action or event context. Good: *"Johnny Martin Jr., CEO, speaking at the Irvington community day."* Bad: *"Man at podium."* / *"Johnny.jpg"* / *"Image of a person speaking."*
- **A partner logo:** the organisation's name. Good: *"Baltimore Community Lending"*. If the organisation's name is already given in adjacent visible text (e.g. a caption right next to the logo), the image itself can be marked **decorative with an empty alt** (`alt=""`) rather than repeating the name — see the redundancy rule below.
- **A before/after pair (`BeforeAfterPairs`):** both images carry real information; neither is disposable. Describe what changed, not the fact that one comes before the other. Good: *"Vacant rowhouse lot, overgrown and fenced off, prior to renovation"* paired with *"Same lot after renovation: new siding, working porch light, landscaped front yard."* Bad: *"Before"* / *"After"* alone — that tells a screen-reader user nothing about the actual content of the image.
- **Decorative images** (background textures, spacer graphics, purely ornamental icons that repeat information already given in text next to them): use an **empty alt attribute**, explicitly marked decorative in the Media Manager if Wix exposes that toggle, so assistive tech skips the image entirely instead of announcing a filename or a redundant description. Never write *"image of..."*, *"picture of..."*, or *"graphic showing..."* — assistive technology already announces that the element is an image; naming the image type again is redundant filler that wastes the listener's time.

### 4.4 The redundancy rule

If a caption, heading, or adjacent paragraph already states the same information the alt text would state, do not repeat it verbatim in the alt text — either shorten the alt text to add only what the caption doesn't cover, or mark the image decorative (empty alt) if the caption fully covers it. A screen reader will read the caption and then the alt text back to back; identical text read twice in a row is a worse experience than no alt text, not a safer one.

> VERIFY: confirm Wix CMS text fields can be marked "required" in the Content Manager (this is standard Wix CMS behaviour but should be confirmed against the current Studio version before the field is added).

---

## 5. Links and buttons

### 5.1 Descriptive link text

Every link's visible text should make sense read in isolation, out of context — this is exactly how screen-reader users often navigate (a "links list" that shows only link text, with no surrounding sentence). The common failure mode on content-managed sites is a page with five or six identical "Learn more" links, each pointing somewhere different (one project, one event, one program) with no way to tell them apart once pulled out of context.

**CCD fix:** never ship a bare "Learn more." Extend every instance to name its destination: *"Learn more about the co-op market,"* *"Learn more about the Irvington Walking Tour,"* *"Learn more about becoming a member."* This applies wherever a repeater (Projects, Events, News) generates a "Learn more"-style link per item — the link text should pull the item's title into the string, not use a static label for every card.

### 5.2 Buttons

- **Minimum 44×44px tap target** on every clickable button and icon-button, including on mobile. This is a Wix layout setting (button size/padding), not a code setting.
- **No colour-only affordance.** A button must be identifiable as clickable by more than colour alone — shape (visible border or fill), an icon, underline, or a hover/focus state change that isn't purely a hue shift. This matters most for `.ccd-btn-gold`, which already passes contrast at 11.05:1 but should still read as a button (rounded fill, visible edge) independent of its colour, for colour-blind users.

### 5.3 What "descriptive" does not mean

Descriptive link text does not mean long. "Learn more about the co-op market" beats both "Learn more" and a full sentence crammed into a link ("Click here to learn more about all of the wonderful things happening at the co-op market this season"). Aim for a short noun phrase that names the destination — "Co-op market details," "Irvington Walking Tour route," "2026 membership tiers" all work as well as the "Learn more about X" pattern and read faster in a links list. The rule is destination clarity, not word count.

### 5.4 Focus visibility

Every interactive element (link, button, form field, nav item, menu toggle) needs a **visible focus ring** when reached by keyboard (Tab). Wix's default focus outline is frequently suppressed or too faint against coloured backgrounds. Specify one focus style that meets 3:1 non-text contrast against **both** the white background and the green band, since interactive elements appear on both in this design:

- A **2px solid outline in green-deep `#124a34`** with a small offset (2–3px) works against white (10.22:1, far above the 3:1 UI-component floor) but would blend into `.ccd-band-green`'s dark background.
- Use **gold `#fec630`** for the outline when the element sits on a dark band (green-deep or ink) — gold on green-deep is a measured PASS at 6.49:1, and gold on ink passes at 11.05:1.
- Net rule: **focus ring colour follows the same light/dark logic as text colour already does in this design system** — green-deep ring on light backgrounds, gold ring on dark backgrounds. Do not use a single fixed focus-ring colour sitewide, since no single colour clears 3:1 against both white and green-deep simultaneously without recourse to this pairing logic.

**This is achievable.** `global.css` is already live on this site and its `.ccd-*` classes are assignable to any element via the Editor's Inspector → **Add custom CSS**. Add `:focus-visible` rules there — the two-colour pairing logic above belongs in `global.css`, not in per-element Editor settings, so it cannot be lost by an editor changing a page.

> VERIFY: after adding the focus rules, Tab through one light page and one page with a green band and confirm the ring is actually visible on both — Wix component internals occasionally suppress an outline on their own wrappers.

---

## 6. Forms

Applies to the footer newsletter signup band, membership application forms, and the contact form.

- **Visible, persistent labels.** Every field needs a label that stays on screen once the user starts typing — not a placeholder that disappears on focus/input. Placeholder-only labels fail for anyone who loses their place mid-form (cognitive load, screen magnification, interruption) and fail outright for some screen-reader/autofill combinations that don't reliably announce placeholder text as a label.
- **Required-field marking that isn't colour-only.** An asterisk or the word "(required)" next to the label — not a red border alone, since colour-only cues fail for colour-blind users and are invisible to screen readers unless the colour change is paired with a text or ARIA state change.
- **Error messages that name the field and the problem, in text.** "This field is required" or "Enter a valid email address" placed next to (or associated via `aria-describedby`-equivalent Wix form settings with) the specific field — not a generic banner ("Please fix the errors above") that leaves the user to hunt for which fields failed.
- **Correct input types and autocomplete.** Email fields should use an email input type/autocomplete hint; phone fields a tel type. This is a Wix form-field-settings choice, not custom code, and it's what triggers correct mobile keyboards and browser autofill.
- **Keyboard-only completability.** Every form (newsletter signup, membership application, contact) must be fully fillable and submittable using Tab, Shift+Tab, Enter, and Space alone — no field, dropdown, or submit action that only responds to a mouse click or drag.

### 6.1 The footer newsletter band specifically

The footer newsletter signup sits inside `.ccd-footer` (bg ink), which makes label contrast and focus-ring visibility easy to get wrong at the same time a form-specific mistake (placeholder-only label) is also common — check this one band against all three rules above (visible label, non-colour required marking, offwhite/white label text at the contrast ratios already verified in Section 2.1) as a single unit before launch, since it's the one form present on every page.

### 6.2 Membership tier selection

The membership application likely presents `MembershipTiers` as a set of selectable options (radio buttons, cards, or a dropdown). Whichever pattern Wix Studio renders this as, confirm each option's selected/unselected state is distinguishable by more than colour (a checkmark, a border-weight change, or bold text on the selected option, not a colour swap alone), and that the tier name and price are both read aloud by a screen reader when the option receives focus — not just visually adjacent text that the underlying form control doesn't reference.

---

## 7. Media

Applies to: drone footage, "5-Minute Histories" video series, Irvington Walking Tour video, community day footage.

- **Captions, human-corrected.** Raw auto-generated captions (YouTube auto-captions, Wix's built-in auto-caption if offered) are not sufficient — they routinely mangle names, addresses, and local terms (street names in Irvington, org names, program names) that a general-purpose speech model has never seen. Every video needs a caption pass reviewed and corrected by a human who knows the content, before it counts as compliant. **This is also worth funding on its own merits beyond the compliance argument:** accurate captions are indexed as on-page text by search engines, meaning a well-captioned video directly improves the page's SEO — a concrete, non-legal benefit that helps get the correction pass budgeted and staffed.
- **Transcripts for audio-only content**, if any exists or is added later (e.g. a podcast-style piece) — a full text transcript posted alongside the audio.
- **No autoplay with sound.** Any video that autoplays must be muted by default; sound only starts on explicit user action.
- **Respect `prefers-reduced-motion`.** Any animation, parallax scroll effect, or auto-advancing carousel/slider must check the `prefers-reduced-motion` media query and disable or substantially reduce motion for users who have that OS-level preference set. This applies to any hero-band motion effects and any auto-rotating testimonial or supporter-logo carousel.
- **Flash threshold.** Nothing on the site may flash more than 3 times per second — relevant to any looping video clip or animated graphic used as a background or hero element.

### 7.1 Where each rule applies on this site

| Media | Caption/transcript needed | Autoplay rule | Motion rule |
|---|---|---|---|
| Drone footage (hero/background use) | Captions if it carries spoken narration; if it's silent b-roll used as a background loop, no captions needed but it still must be muted and must respect `prefers-reduced-motion` (offer a static image fallback) | Muted only, no sound autoplay | Must pause/reduce for `prefers-reduced-motion` if used as an auto-looping hero background |
| "5-Minute Histories" series | Captions, human-corrected | Muted only if autoplaying in a listing; full sound only on user play | N/A (standard embedded player) |
| Irvington Walking Tour video | Captions, human-corrected; consider a text transcript alongside the HTML version of the tour (Section 9) | Muted only if autoplaying | N/A |
| Community day footage | Captions, human-corrected | Muted only | If used in an auto-advancing gallery/carousel, must respect `prefers-reduced-motion` |

### 7.2 Testimonials and SupporterLogos carousels

If either `Testimonials` or `SupporterLogos` is displayed as an auto-advancing carousel (a common Wix repeater pattern for both collections), it counts as auto-advancing content under the `prefers-reduced-motion` rule above, and it also needs pause/stop controls reachable by keyboard — an auto-rotating carousel with no visible pause button is a WCAG 2.2.2 failure independent of the reduced-motion question, since some users need to stop motion even without that OS preference set.

---

## 8. Structure and navigation

- **Skip-to-content link.** A visually-hidden-until-focused "Skip to main content" link as the very first focusable element on every page, so keyboard and screen-reader users don't have to tab through the full header/nav on every single page load.
- **Landmark structure.** Header, nav, main, footer should be identifiable as distinct landmarks (Wix's built-in header/footer sections generally map to this correctly; confirm any custom-built section doesn't override it).
- **Keyboard-reachable navigation, including nested menus.** The main nav, and specifically any **nested/dropdown submenu**, is the single most common keyboard-accessibility failure point on Wix sites — dropdowns that only open on mouse hover, with no keyboard or focus-triggered equivalent, are unreachable and unclosable for a keyboard-only user. Every nested menu must open on focus (not hover-only) and be dismissible with Escape.
- **Logical tab order.** Tab order should follow the visual reading order of the page. Absolutely-positioned or overlapping Wix elements can produce a tab order that jumps around the page unpredictably — check this on every template, not just the homepage.
- **`lang` attribute set on the site.** The site's HTML `lang` attribute (Wix Site Settings → SEO/language settings) should be set to English so screen readers use the correct pronunciation engine.
- **Unique, descriptive page title per page**, not a repeated site-name-only title across every page.
- **The dynamic Projects (Item) page must generate a unique title and H1 per project.** This is a specific, high-risk failure mode for Wix dynamic pages: if the page's SEO title and H1 are left as a static template string (e.g. "Projects | CCD" hard-coded instead of bound to `{Project.Title}`), every single project in the CMS collection ships with the identical page title and identical H1, which is both an SEO problem and an accessibility problem (a screen-reader user who opens several project pages in tabs cannot distinguish them by title). Confirm the dynamic page's title and H1 fields are bound to the Projects collection's title field, not typed as static text.

> VERIFY: confirm Wix Studio's dynamic-page title binding is actually connected to a CMS field (not left as placeholder static text) — this is a per-page setting in the dynamic page's SEO panel that is easy to leave unbound.

---

## 9. Documents and PDFs

CCD has PDFs in circulation or planned: the Irvington Walking Tour guide, brand guidelines, event flyers.

**A scanned or image-only PDF is inaccessible, flatly.** If a PDF is a photograph or scan of a printed page with no underlying text layer, a screen reader announces nothing — it is functionally invisible to assistive technology, regardless of how good the print design is.

**Rule:** for any PDF that carries information the public needs (the walking tour route and stop descriptions, in particular), publish that information as a real HTML page on the site first, and offer the PDF as a **supplementary, optional download** — a printable companion, not the only source. If a PDF must be the primary source of some content, it must be remediated with real text tags, a defined reading order, and alt text on any images/diagrams inside it (this is a separate remediation pass, typically done in Adobe Acrobat Pro's accessibility tools, and is out of scope for the Wix rebuild itself but should be tracked as its own task).

---

## 10. Remediation plan

Severity is ranked by **user impact** (does this block a user from getting information or completing a task) — not by how easy the fix is to make.

### Before launch

| Item | Severity | Effort | Owner | When |
|---|---|---|---|---|
| Fix `.ccd-footer-muted` token (`#5b6b72` → `#77848a`) | High — live on every page footer today | Low (one token) | Developer | Before launch |
| Fix nav-link gold hover underline (→ green-deep or `#b78f23`) + add non-colour hover cue | Medium | Low | Developer | Before launch |
| Fix mid-green and blue text/link tokens per 2.3 | Medium | Low | Developer | Before launch |
| Add `altText` required field to the 7 CMS collections and backfill existing records | High — blocks screen-reader users from any image content | Medium (schema change + content pass) | Developer + content lead | Before launch |
| Audit and correct heading hierarchy on every template page (one H1, no skipped levels, eyebrows de-tagged) | High — breaks primary screen-reader navigation method | Medium | Developer | Before launch |
| Bind dynamic Projects (Item) page title/H1 to the CMS title field | High — SEO and accessibility both | Low | Developer | Before launch |
| Add skip-to-content link | Medium | Low | Developer | Before launch |
| Fix nested nav menu to open on focus, not hover-only, and close on Escape | High — total keyboard blocker if unfixed | Medium | Developer | Before launch |
| Add visible focus ring (green-deep / gold pairing per 5.3) | High — total keyboard blocker if invisible | Low–Medium | Developer | Before launch |
| Run Wix Accessibility Wizard and fold findings in | Medium (baseline sweep) | Low | Developer | Before launch |
| Run axe/WAVE, Lighthouse, keyboard-only pass, NVDA/VoiceOver pass, 200% zoom, mobile pass (Section 1.3) | High — this is the actual verification step for everything above | Medium | Developer + one non-dev tester | Before launch |
| Rewrite generic "Learn more" links to name their destination | Medium | Low–Medium | Content lead | Before launch |
| Convert form placeholder-only labels to persistent visible labels (newsletter, membership, contact) | High — form usability blocker | Low–Medium | Developer | Before launch |
| Publish Irvington Walking Tour content as an HTML page (PDF becomes supplementary) | Medium | Medium | Content lead | Before launch, if the tour is part of launch content |

### First 30 days

| Item | Severity | Effort | Owner | When |
|---|---|---|---|---|
| Human-correct captions on all existing video (drone footage, 5-Minute Histories, walking tour, community day) | High — video content otherwise inaccessible to Deaf/HoH users | Medium–High | Content lead | First 30 days |
| Backfill/verify `altText` quality against the writing rules in Section 4.3 (not just "field is non-empty") | Medium | Medium | Content lead | First 30 days |
| Remediate or replace remaining non-walking-tour PDFs (brand guidelines, flyers) per Section 9 rule | Medium | Medium | Content lead / designer | First 30 days |
| Confirm `prefers-reduced-motion` is honoured on any carousel/parallax actually shipped | Medium | Low | Developer | First 30 days |
| Full form keyboard-completion test on membership and contact forms in production | High | Low | Developer or tester | First 30 days |

### Ongoing

| Item | Severity | Effort | Owner | When |
|---|---|---|---|---|
| New content follows the `altText` and heading rules by default (required field + editorial checklist) | — | Low, per item | Content lead | Every publish |
| Any new colour added to `global.css` is contrast-checked before use (Section 11) | — | Low, per change | Developer | Every design change |
| Caption every new video before publishing, not after | High | Low, per video, if done at time of upload | Content lead | Every publish |
| Annual full re-audit (repeat Section 1.3's six tests) | — | Medium | Developer or contractor | Annually |

---

## 11. Keeping it accessible after the developer leaves

CCD's stated post-handoff model is: the only custom code is `masterPage.js`; page copy lives in native Wix text elements; staff apply `.ccd-*` classes and never hand-pick colours. That model is exactly what makes long-term accessibility maintainable without a developer on retainer, provided these five pieces stay in place:

1. **The token rules table in Section 2.4.** Staff and future contractors check any new use of a `.ccd-*` class against this table before publishing, instead of re-deriving contrast rules from scratch.
2. **`altText` as a required CMS field**, not an optional one — see Section 4.2's reasoning. This is the single mechanism that keeps image accessibility from silently degrading as new content is added by non-technical staff.
3. **The five approved page/section library entries in `SECTION-LIBRARY.md`** — reusing pre-approved section layouts means new pages inherit correct heading structure and contrast pairings by construction, rather than staff assembling new layouts from raw elements and reintroducing the failures this document just fixed.
4. **The `BEFORE-YOU-PUBLISH.md` card**, kept next to the publish button (physically printed or pinned) as the last check before every publish.
5. **An annual re-audit** — repeat the six tests in Section 1.3 once a year, or after any significant redesign, since Wix platform updates and staff-made content changes can both reintroduce failures that a one-time audit can't catch permanently.

One more standing rule: **any new colour added to `global.css` must be contrast-checked before it enters the file** — against both its likely text/background pairing and against the rules table in 2.4. A checker script for this exists at `wix-migration-kit/handoff/contrast-check.js` — run it against any candidate colour before adding it as a token.
