# CCD media library

**283 photographs and 43 videos** — every piece of footage CCD has — sorted by
what they show and sized for the web. Browse the folders below on GitHub: photos
preview in the browser and videos play in it, so you do not need to download
anything, or install anything, to see what CCD has.

**These are copies.** The full-resolution originals live in CCD's OneDrive, in
the folders shared from Johnny Martin Jr.'s account. Nothing here replaces them
and nothing was moved or deleted to build this.

## What is in each folder

| Folder | What it holds |
|---|---|
| `01-home-hero-neighborhood-drone` | Neighbourhood and aerial shots — the widest, most establishing images |
| `05-clean-green` | Clean & Green crews actually working. The best proof-of-service photos CCD has |
| `06-coop-market-events` | Markets, gatherings, community activity |
| `07-projects-oasis-gardens-bus-stop` | The Oasis, gardens, the bus stop project |
| `08-history-walking-tour-murals` | The walking tour, murals, 5-Minute Histories |
| `09-partner-logos-brand` | Partner logos and brand files |
| `10-shoe-drive-campaign` | The shoe drive |
| `11-4th-brew-shopify` | The 4th Brew — product shots and the brewing-method line art |
| `90-source-docs` | Scanned source documents |
| `99-review-needed` | Not yet sorted or captioned. Usable, but look before you publish |

## Using one of these on the website

The website has its own picture store and does **not** read this folder. To put
one of these images on a page: open the editor at `/admin`, go to the field you
want the picture in, choose **Upload**, and pick the file from here. See
[docs/EDITING-THE-WEBSITE.md](../docs/EDITING-THE-WEBSITE.md).

Always fill in the image description. It is what a screen-reader user hears and
what shows if the picture fails to load.

## media-catalog.csv

The index of **everything** CCD has, not just what is copied here — 986 entries
including the video and RAW files that are far too large for this repository. For
each one it records where the original sits in OneDrive, its size and dimensions,
what it shows, and a quality rating.

The `web_copy` column names the file in this folder, where one exists. A blank
`web_copy` means the original is OneDrive-only — usually video, RAW, or a PDF.

Use it to answer "does CCD have a photo of X, and where is it".

## How this folder was made

Each image was rotated upright, scaled so its longest edge is 1600 pixels, and
saved as JPEG at quality 80.

Each video was scaled to fit within 1280×720, capped at 30 frames a second, and
re-encoded as H.264 — the format every browser and phone plays without help. All
67 minutes are here in full; nothing was shortened or cut into parts.

The originals were recorded at far higher bitrates than anything needs: the 4K
drone clips ran about 75 megabits a second, which is why thirty seconds of
footage took 284MB. Re-encoding them is what makes the whole library 428MB
instead of 4GB, and what keeps every file under GitHub's 100MB limit.

These are viewing copies, the same as the photographs. Use the OneDrive originals
for anything that will be edited, re-cut, or projected.

To rebuild the sorted library from the shared drive:
`python scripts/organize_ccd_media.py` — it only ever copies, never moves.
