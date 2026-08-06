# CCD — Cooperative Community Development Inc.

Baltimore member-owned cooperative, Irvington / 21229. Live site: [ccdgroup.org](https://ccdgroup.org).

## There are two websites in here

| | Path | What | Status |
|---|---|---|---|
| **A** | `ccd-website/` | Next.js 16 app — the rebuild | Vercel. **Own git repo, gitignored here.** Not committed by this repo. |
| **B** | `wix-migration-kit/` | Docs, CSV seed data, and Velo JS for the Wix Studio build | Drives the live ccdgroup.org |

Most commits in this repo are Wix work. Application code lives in `ccd-website/` and is tracked separately.

## Layout

```
.agent-orchestration/   HANDOFF logs — read HANDOFF.md before picking up any in-flight work
assets/                 Flyers, slides, and campaign graphics (see docs/ShoeDrive_Website_PostingGuide.md)
ccd-website/            Next.js app (gitignored — separate repo)
building-the-block-prototype/  Static HTML design prototype
docs/                   Plans, content audits, meeting notes
scripts/                Media organizer + content/link/contrast audit tooling
wix-migration-kit/      Wix build guide, seed CSVs, handoff kit for nontechnical staff
```

Gitignored media archives (61GB+ of originals, not in version control):
`Cooperative Community Development Inc/`, `website-media-filebase/`, `Shoe Drive CCD/`.

## Scripts

Run from the repo root. `scripts/*.py` resolve paths relative to it.

| Script | Does |
|---|---|
| `scripts/organize_ccd_media.py` | Builds `website-media-filebase/` + catalog from the shared drive. Copy-only, never moves originals. |
| `scripts/create_stitch_upload_files.py` | Generates Google Stitch upload boards from the catalog. |
| `scripts/export_page_copy.mjs` | Turns `wix-migration-kit/velo/siteData.js` into paste-ready copy packets. |
| `scripts/audit_content.mjs` | Heading outlines + link-text audit. |
| `scripts/check_handoff_links.mjs` | Validates every relative link in the handoff kit. |
| `wix-migration-kit/handoff/contrast-check.js` | WCAG regression guard. Exit 1 if a prescribed color fix is reverted. |

## Color rule (do not break)

Gold `#fec630` on white is **1.57:1** and fails WCAG. Gold is a fill behind dark text, or text on dark — never text on light. Eyebrows use `#8a6d00`. Full measured table in `.agent-orchestration/HANDOFF.md`.
