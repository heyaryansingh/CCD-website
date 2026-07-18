# Seed CSVs for Wix CMS collections

Generated directly from `ccd-website/lib/siteData.ts` (the verified source of truth) — do not hand-edit here; fix the site data and regenerate, or edit inside Wix after import.

**How to import (per collection):**
1. Wix Studio → CMS → create the collection with the matching field names (see `02-CMS-COLLECTIONS.md`).
2. Collection → ⋯ menu → **Import from CSV** → pick the file → map columns 1:1.
3. Multi-value columns (`benefits`, `photos`, `instructions`) are `; `-separated — map to Tags fields, or split into Wix rich text/gallery items during import review.
4. `photo`/`logo` columns are intentionally blank — attach images from the Media Manager after import (filenames referenced in `thumb`/`heroImage` columns match `site-media/`).

| File | Rows | Collection |
|---|---|---|
| Team.csv | 6 | Team (leadership) |
| Interns.csv | 6 | Interns (1 named + 5 open roles) |
| Partners.csv | 13 | Partners |
| MembershipTiers.csv | 5 | MembershipTiers (real prices, +$5 setup) |
| News.csv | 6 | News |
| Events.csv | 3 | Events (incl. cost/instructions/contact) |
| Projects.csv | 4 | Projects (drives dynamic pages) |
| SiteLinks.csv | 7 | SiteLinks (single place to fix links) |

Empty-by-design collections (create but don't import): `Testimonials`, `BeforeAfterPairs`.
