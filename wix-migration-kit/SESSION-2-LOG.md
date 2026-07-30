# Session 2 Log — canvas build in progress

**Date:** 2026-07-18 · Site: CCD 2026 (staging), unpublished. Live site untouched.

## Done this session
- Dynamic page **"Projects (Item)"** created from Projects collection (Item-page template), verified cycling all 4 seeded projects. All 18 static pages + dynamic page now exist.
- **Header structure:** height **110px**, converted to **Advanced CSS grid, 1 column × 2 rows** (top row = future utility bar, bottom row holds the logo image + "Business Name" text placeholders). Rows currently equal height (~55/55) — target 34px / 76px.
- Wrote `SESSION-2-HEADER-FOOTER-SCRIPT.md` — full click-script with every string/hex/link for header + footer assembly (usable by human or agent).

## Exact resume point (next micro-steps)
1. Select header top-row container (double-click top row on canvas → breadcrumb shows Page > Header > Container).
2. Set its background **#124A34**: with container selected, use the canvas floating toolbar ("Add Media ▸ / ? / ⋯") — fill color is under the container's Design controls (⋯ menu or Inspector "Adjust"); if elusive, select the container and press the paint/Design entry in the floating toolbar. (Not located via a11y yet — see notes below.)
3. Row sizes: with Header selected, CSS-grid row handles on canvas left edge let you set 34px / 76px (drag or click the row size chip).
4. Then follow `SESSION-2-HEADER-FOOTER-SCRIPT.md` §A3 onward (utility texts + socials), §B (logo swap to site-media/ccd-logo.png, wordmark, Horizontal Menu + Manage Menu tree, gold DONATE, sticky), §C footer, then doc 03 pages in order: Home, About, …

## Hard-won automation notes (READ FIRST when resuming)
- **Editor tab renderer stalls:** screenshots intermittently time out 30s; wait 5–10s and retry — DOM tools (find/read_page/form_input/JS) keep working during stalls. Tab reload fixes prolonged stalls (state is autosaved).
- **Random zoomed capture (~2.5×, top-left crop):** happens after some canvas clicks; viewport becomes 626×314 CSS. Clicks still map to SCREENSHOT coordinates (CSS × 2.5). JS `getBoundingClientRect × devicePixelRatio` converts DOM→click coords. Reload resets it. Ary can also Ctrl+0 by hand.
- **Ref staleness:** refs from find/read_page go stale after panel re-renders — re-find immediately before each click; never reuse refs across canvas actions.
- **Keystrokes get eaten** if typed in the same batch as the click that opens an input during canvas load — always type in a FRESH batch after visually confirming input focus.
- **Iframes:** dashboard CMS = top-document (fully automatable, incl. file inputs). Media Manager + editor "Add dynamic page" wizard = iframes (dashboard ones same-origin/JS-reachable; editor ones cross-origin — human or normal-zoom coordinate clicks only).
- **Wix "Choose a collection" dropdowns:** type-to-filter works; option lists don't scroll via wheel reliably.
- **Layout preset radios (2-rows etc.):** synthetic JS clicks DON'T register (trusted events required) — must click visible tile by screen coords (scroll inspector panel until tile visible below the sticky tabs, cssY ≳ 130).
- **Advanced CSS grid:** "Apply" → confirm "Switch to CSS Grid" dialog → grid preset dropdown on canvas toolbar ("1x2 ▾" → Other = rows/cols counts). Cells become Containers (Page > Header > Container).

## Remaining (whole-site)
Header finish → footer → 18 pages per doc 03 stacks (designed-section scaffolds + retext + reimage from site-media + scroll animations) → forms/automations (doc 04) → members/pricing (doc 05) → CMS image attach per row → slug verification → QA (doc 06 stays MANUAL/Ary-only: publish, domain, cutover).

**To resume with Claude:** open a fresh Cowork session, point it at `wix-migration-kit/` and say: "Resume the Wix staging build from SESSION-2-LOG.md — continue the header at the exact resume point." Log in to Wix first; guardrails unchanged (staging only, never the live site, no publish/domain/billing).
