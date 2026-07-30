# Session 2 — Header & Footer assembly script (paste-ready)

Everything below is click-order + exact values. Copy strings straight from here.
State already done by Claude: header height **110px**, layout **2 rows** (top row = utility bar, bottom = main nav). Site palette slots: Color 6 = gold #FEC630, Color 9 = deep green #124A34.

---

## A. HEADER — utility bar (top row, 34px)

1. Select the header's **top row cell** → Inspector → set row height **34px** (drag the row divider or Layout → grid row sizes 34px / 76px).
2. Cell background: **#124A34** (palette Color 9).
3. Add **Text** elements (Add + → Text → paragraph), style each: Ropa Sans, 12px, ALL CAPS, letter-spacing 0.16em, color white, layout in one horizontal row, right-aligned, gap ~24px:

| Text | Link |
|---|---|
| `CLEAN & GREEN SERVICES` | page: Clean And Green |
| `TOOL BANK` | page: Tool Bank |
| `FACILITIES BOOKING` | page: Contact |
| `(410) 205-2488` | web address: `tel:+14102052488` |

4. Add two **social icons** (Add + → Social → social bar, or icon buttons):
   - Facebook → `https://www.facebook.com/CoopCommunity`
   - Instagram → `https://www.instagram.com/ccd_group/`
   - White icons, ~16px.

## B. HEADER — main nav (bottom row, 76px)

1. Bottom cell background: **#FFFFFF**. Row height 76px.
2. **Logo:** select the placeholder logo image → Replace image → Media Manager → `site-media/ccd-logo.png` → size 44px height.
3. **Wordmark:** replace "Business Name" text with `Cooperative Community Development` — Ovo, 18–20px, #1A1A1A. (Keep it one line; it can shorten to `CCD` on mobile.)
4. **Menu:** Add + → Menu → **Horizontal menu**, place right of center.
   - Open **Manage Menu** and build this structure (dropdowns as sub-items):
     - **About** ▾ → Our Story (page: About), Mission & H.E.A.R.T. (page: About + anchor later), What is a Co-op? (page: What Is A Coop), Team & Partners (page: Team), Partners & Funders (page: Partners)
     - **Programs** ▾ → Center for Social Impact, Clean & Green Team (page: Clean And Green), Community Co-op Market (page: Coop Market), Tool Bank, Workforce Development (page: Programs)
     - **Get Involved** ▾ → Become a Member (page: Membership), Volunteer, Donate, Brick Campaign, Events
     - **Projects** (page link)
     - **News** (page link)
     - **Contact** (page link)
   - Menu item style: Ropa Sans 14px, uppercase, letter-spacing 0.08em, #1A1A1A; hover gold #FEC630 underline.
5. **DONATE button:** Add + → Button. Text `DONATE`. Style: fill #FEC630, text #1A1A1A, **corner radius 0**, bold 14px uppercase, letter-spacing 0.08em, padding ≈ 14px 22px (min-height 48px). Link → page: Donate. Place at far right.
6. **Header behavior:** select Header → Inspector → Scroll effect / "Pins to top" (sticky).
7. **Mobile breakpoint:** switch to mobile view → hide utility texts (keep phone), menu becomes hamburger automatically; check logo+DONATE fit.

## C. FOOTER

1. Select Footer (bottom of page) → height ≈ 480px, background #1A1A1A (or Color 5), text white.
2. **Newsletter band** (top strip of footer, ~120px): H3 `Get the block report.` (Ovo, white, ~28px) + email input + button `SUBSCRIBE` (gold, square). *(Wire the form in doc 04 — for now the button can link to `mailto:info@ccdgroup.org?subject=Newsletter signup`.)*
3. **4 columns** below (repeat the header's text styling, white/#EEF1F2):
   - **Col 1 — brand:** ccd-logo.png (36px) + `Cooperative Community Development` + tagline `A Baltimore cooperative building food access, green space, local services, and community-owned infrastructure in Irvington.` + FB/IG icons (same links as header).
   - **Col 2 — Quick Links:** About → /about · Membership → /membership · Projects → /projects · News & Events → /news
   - **Col 3 — Programs:** Center for Social Impact → /center-for-social-impact · Clean & Green → /clean-and-green · Co-op Market → /coop-market · Tool Bank → /tool-bank
   - **Col 4 — Contact:** `info@ccdgroup.org` (mailto) · `(410) 205-2488` (tel:+14102052488) · `4004 Frederick Ave` / `Baltimore, MD 21229`
4. **Bottom bar** (1 thin row): `Copyright 2026 Cooperative Community Development Inc. · Proud member of MANO · Built for the block.` — Ropa Sans 12px, #5B6B72.

## D. Save to Library
Right-click header → Save to Library as "CCD Header"; same for footer. (They're global anyway, but the Library copy protects against accidents.)

---
*Claude's parallel jobs (no canvas needed): menu structure can also be pre-built in the Menus manager; page slugs verified/corrected; display names prettified; copy sheets for every page generated from siteData.ts on request.*
