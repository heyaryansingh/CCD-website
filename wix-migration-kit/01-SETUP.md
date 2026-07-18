# 01 — Studio Site Setup & Design System

## A. Create the site
1. studio.wix.com → **Create New Site** → start from **Blank** (do not pick a template — we're rebuilding an exact design).
2. Name it **"CCD 2026 (staging)"** — the name marks it unmistakably as the new build, not the live site.
3. Editor: confirm you're in **Wix Studio editor** (responsive), not the classic Editor.

## B. Site theme (Site Design panel)
### Colors (from `ccd-website/app/globals.css`)
| Token | Hex | Wix role |
|---|---|---|
| Gold | `#FEC630` | Accent / all CTA buttons |
| Gold dark | `#E6AC00` | Button hover |
| Green | `#209765` | Secondary accent, tags, checkmarks |
| Green deep | `#124A34` | Dark band sections, utility bar |
| Blue | `#0797D4` | Info tags only |
| Ink | `#1A1A1A` | Body text |
| Muted | `#5B6B72` | Secondary text |
| Soft | `#EEF1F2` | Light section backgrounds |
| Off-white | `#F5F7F8` | Alt section backgrounds |
| White | `#FFFFFF` | Base |

### Typography (add via Site Design → Text; all on Google Fonts inside Wix)
| Role | Font | Notes |
|---|---|---|
| Headings H1–H3 | **Ovo** (serif) | weight 400; H1 clamp ~54–110px desktop |
| Body / UI | **Ropa Sans** | 16–19px body, 1.65 line height |
| Script accents | **Sue Ellen Francisco** | ONLY for the gold italic hero accent words |
| Eyebrow labels | Ropa Sans, 12px, letter-spacing 0.16em, uppercase, gold |

Button style: rectangular (no radius), uppercase, letter-spacing 0.08em, bold 14px, min-height 48px. Gold fill/black text primary; white outline ghost on dark.

## C. Media Manager
1. Media Manager → create folder **"site-media"**.
2. Upload the entire contents of `ccd-website/public/media/` (28 files + `video/memorial-garden.mp4`). Keep filenames unchanged — every later doc references them by name.

## D. Global header (build once as a Section saved to Library)
Matches `components/SiteHeader.tsx`:
- **Utility bar** (deep green `#124A34`, 34px, white 12px uppercase): links Clean & Green Services → /clean-and-green · Tool Bank → /tool-bank · Facilities Booking → /contact · phone `(410) 205-2488` (tel link) · Facebook + Instagram icons (links in 04 §Links).
- **Main nav** (white, 76px, sticky): logo `ccd-logo.png` 44px + wordmark left; menu right: About ▾ (Our Story, Mission & H.E.A.R.T., What is a Co-op?, Team & Partners, Partners & Funders) · Programs ▾ (Center for Social Impact, Clean & Green Team, Community Co-op Market, Tool Bank, Workforce Development) · Get Involved ▾ (Become a Member, Volunteer, Donate, Brick Campaign, Events) · Projects · News · Contact · **DONATE gold button**.
- Pin to top (sticky) on scroll. Mobile: hamburger → full menu.

## E. Global footer
Matches `components/SiteFooter.tsx`:
- **Newsletter band**: "Get the block report." + email field + Subscribe (wire in 04).
- **4 columns**: brand (logo, name, tagline, social links) · Quick Links (About, Membership, Projects, News & Events) · Programs (Center for Social Impact, Clean & Green, Co-op Market, Tool Bank) · Contact (info@ccdgroup.org, (410) 205-2488, 4004 Frederick Ave, Baltimore, MD 21229).
- Bottom bar: `Copyright <year> Cooperative Community Development Inc. · Proud member of MANO · Built for the block.`

## F. Page list (create empty pages now; build in 03)
/, /about, /what-is-a-coop, /team, /partners, /programs, /coop-market, /tool-bank, /center-for-social-impact, /clean-and-green, /projects, /membership, /brick-campaign, /news, /events, /donate, /volunteer, /contact — plus dynamic page for Projects detail (from CMS, 02).
