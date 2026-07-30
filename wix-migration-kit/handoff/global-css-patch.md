# `global.css` — the accessibility patch

**What this is:** the exact CSS changes that fix the 8 contrast failures found in `ACCESSIBILITY.md`. Apply these to the live `src/styles/global.css` in the Wix Studio IDE.

**Who does this:** whoever has Dev Mode access — a developer or a hired Wix Partner. **This is on the DO-NOT-TOUCH list for regular staff.** It is a one-time job.

**Why it is a patch and not a whole file:** the live `global.css` is in the Wix IDE, not in this repo, so this document does not claim to know its full current contents. Read the live file first, apply these changes into it, and keep everything else as it is.

---

## Fastest route: one paste, no merging

You do not have to read the existing file and merge six changes by hand. All of them are also written as an **append-only** block in [`global-css-append.txt`](global-css-append.txt), which works because later CSS rules override earlier ones at equal specificity. Nothing above it needs editing, and nothing existing can be accidentally deleted.

Two ways to apply it:

**A. Wix IDE terminal (one paste).** [`global-css-append.ide-command.txt`](global-css-append.ide-command.txt) is the complete command — a `cat >>` heredoc. Open the IDE with the **Wix tab in the foreground** (it will not boot in a hidden tab), open the terminal, and **paste** it. Then click **Sync site**.

> The build logs are explicit that *typing* more than about 2KB into that terminal crashes the beta IDE. This command is ~3KB. Paste it; do not type it, and do not split it across two pastes — a heredoc broken in half leaves the shell waiting for its terminator.

**B. Editor.** Open `src/styles/global.css`, go to the very end, paste the contents of `global-css-append.txt`, save, **Sync site**.

Either way, verify:

```bash
node wix-migration-kit/handoff/contrast-check.js
```

The sections below explain what each change does and why. Read them if you want the reasoning, or if you would rather merge the changes into the existing rules than append them.

> VERIFY: the focus-ring block targets `.ccd-band-green` and `.ccd-footer` as **ancestor** containers. If Wix applies those classes to the element itself rather than to a wrapping section, the dark-background rule will not match — Tab onto a link inside the green band and check the ring turned gold. If it did not, change those two selectors from `.ccd-band-green :where(...)` to `.ccd-band-green:where(...)` (no space).

---

## Before you start

```bash
node wix-migration-kit/handoff/contrast-check.js
```

Note the current output. Run it again after you finish — every line under "Regression guard" must say `ok`.

Copy the live `global.css` into a scratch file before editing so you can diff and revert.

---

## Change 1 — the footer copyright bar (do this one first)

**Why first:** this is the only failure that is live on **every page right now** and needs no user action to trigger. `#5b6b72` on the `#1a1a1a` footer is **3.14:1**; AA needs 4.5:1.

**The trap:** `--ccd-muted` is used on *both* light and dark backgrounds. On white it is 5.54:1 and passes. If you just lighten the one shared token to fix the footer, the on-white use drops to **3.85:1 and becomes a new failure**. Verified: no grey in this hue family clears 4.5:1 against both white and `#1a1a1a`. You need two tokens.

Add the new variable alongside the existing ones:

```css
:root {
  /* ...existing --ccd-gold, --ccd-green, --ccd-ink, --ccd-muted, --ccd-paper... */

  /* --ccd-muted stays as it is: 5.54:1 on white, passes AA. Do not change it. */
  --ccd-muted-on-dark: #77848a;  /* 4.52:1 on --ccd-ink #1a1a1a — for dark backgrounds only */
}
```

Then point the footer bottom bar at it:

```css
.ccd-footer-muted {
  /* was: color: var(--ccd-muted);   3.14:1 — FAILED AA */
  color: var(--ccd-muted-on-dark);   /* 4.52:1 — passes */
  font-size: 12px;
}
```

Do not merge these two tokens back into one later. `contrast-check.js` asserts they stay separate and will complain.

---

## Change 2 — the nav hover underline

`.ccd-nav-link`'s gold hover underline is **1.57:1** against white. Underlines are non-text UI, which needs 3:1. Gold cannot get there on white.

There is a second problem: hover is signalled by colour alone, which fails for anyone who cannot distinguish it.

```css
.ccd-nav-link {
  color: var(--ccd-ink);
  text-decoration: none;
  border-bottom: 2px solid transparent;   /* reserve the space so nothing shifts on hover */
}

.ccd-nav-link:hover,
.ccd-nav-link:focus-visible {
  /* was: border-bottom-color: var(--ccd-gold);   1.57:1 — FAILED the 3:1 non-text rule */
  border-bottom-color: var(--ccd-green-deep);  /* 10.22:1 */
  font-weight: 600;                            /* second cue, not colour alone */
}

.ccd-nav-link[aria-current="page"] {
  border-bottom-color: var(--ccd-green-deep);
  font-weight: 600;
}
```

If the gold tone has to stay for brand reasons, `#b78f23` reaches exactly 3.01:1 — it passes, with no margin. Green-deep is the better choice.

---

## Change 3 — green and blue as text

Mid-green `#209765` is **3.70:1** on white and blue `#0797d4` is **3.29:1**. Both fail as body text.

```css
:root {
  --ccd-green-deep: #124a34;   /* 10.22:1 on white — use this for ALL green text */
  --ccd-blue-link:  #067db0;   /* 4.60:1 on white — was #0797d4 at 3.29:1 */
}
```

Rules that follow from this:

- **Green text is always `--ccd-green-deep`.** `#209765` is a large decorative fill only, never type.
- White text on a mid-green band is 3.70:1 — fine for headings at 24px+ (or 18.66px+ bold), **not** for body text. If a green band needs body-size white text, darken the band to `#1c865a` (4.56:1) or use `--ccd-green-deep`.
- `--ccd-gold` is **never text on a light background** — it is 1.57:1 and fails even as large text. No gold-family hue reaches AA on white while still reading as gold. Gold is a fill behind dark text (`.ccd-btn-gold` is 11.05:1 and correct), or text on ink/green-deep.

---

## Change 4 — the focus ring

Keyboard users need to see where they are. Wix's default outline is often invisible against these backgrounds. No single colour clears 3:1 against both white and the green band, so the ring follows the same light/dark logic the text already does.

```css
:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--ccd-green-deep);   /* 10.22:1 on white */
  outline-offset: 2px;
  border-radius: 2px;
}

/* On dark bands, switch to gold: 6.49:1 on green-deep, 11.05:1 on ink. */
.ccd-band-green :where(a, button, input, select, textarea, [tabindex]):focus-visible,
.ccd-footer :where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline-color: var(--ccd-gold);
}

/* Never do this. It removes the only cue a keyboard user has. */
/* *:focus { outline: none; } */
```

---

## Change 5 — respect reduced motion

Anyone who has asked their system to reduce motion should get a still page.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This does not cover a Wix carousel that auto-advances via its own script — turn auto-advance off in the Editor instead.

---

## Change 6 — a tap-target floor

AA wants interactive controls comfortably hittable. 44×44px is the practical floor, and it matters most for the social icons and the utility bar links.

```css
.ccd-btn-gold,
.ccd-nav-link,
.ccd-utility-text {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
```

`> VERIFY:` check the header does not grow taller than intended once this lands — the utility bar is deliberately compact. If it does, apply `min-height` only to the social icons and leave the text links, since those sit inside an already-tall row.

---

## After you finish

1. Run the checker. Every "Regression guard" line must say `ok`, and the exit code must be 0.

```bash
node wix-migration-kit/handoff/contrast-check.js
```

2. Click **Sync site** in the IDE status bar. The status bar must read "synced just now" — if it does not, click it once more.
3. Tab through one light page and one page with a green band. Confirm you can always see where the focus is.
4. Check the footer copyright line is now readable.
5. Run the Wix Studio **Accessibility Wizard** and fix the heading structure it reports.

## What is deliberately not here

Heading levels, alt text, link text and form labels are **not** CSS problems and cannot be fixed in this file. They are content and structure, covered in `ACCESSIBILITY.md` sections 3 to 6.
