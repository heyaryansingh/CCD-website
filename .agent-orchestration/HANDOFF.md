# CCD media organization handoff

## Goal
Build a non-destructive, website-focused media filebase from the local CCD repo and likely shared media folders.

## Frozen contract
- Do not move or rename originals.
- Create organized copies under `website-media-filebase/`.
- Keep an auditable catalog with source path, output path, type, size, dimensions/duration when available, category, suggested use, and notes.
- Categories should map to the redesign needs: Home hero, About/team, Center for Social Impact, Brick Campaign, Clean & Green, Co-op Market/events, Tool Bank, Projects/Oasis/gardens/bus stop, Partner logos, Shoe Drive, Documents/source copy, Review needed.
- Use existing Windows/local tools first. Do not add dependencies.

## Dispatch log
- Main: locate likely roots, define category rules, implement sorter, run inventory, review results.
- Main: implemented `scripts/organize_ccd_media.py`.
- Main: generated `website-media-filebase/`, `media-catalog.csv`, `README.md`, and `google-stitch-prompt-pack.md`.
- Main: appended the July 2026 media/Stitch addendum to `CCD_New_Website_Plan.md`.
- Main: added `scripts/create_stitch_upload_files.py`.
- Main: generated `website-media-filebase/stitch-upload-files/` with uploadable visual boards and prompt TXT files so Google Stitch can ingest media as files.

## Raw evidence
- Shared media source: `Cooperative Community Development Inc`.
- Source originals before generation: 933 files, 61,045,587,830 bytes.
- Catalog rows generated: 986.
- Curated copied assets generated: 262.
- Recommendation counts: Website-ready 34, Supporting 145, Review-needed 607, Archive 200.
- Sensitive/admin PDF `Martin_DHR_FIA_500-Medical-Report-Form-revised-August-2018-1.pdf` is cataloged as Archive with no organized copy.
- Filebase category folders created under `website-media-filebase/`.
- Stitch upload kit generated 11 visual boards plus matching prompt TXT files.
- HEIC rendering support installed via `pillow-heif` so 3932 Frederick HEIC assets can appear inside upload boards.

## Verdict
- Accepted after local verification. Originals were not moved or renamed; generated output is copy-only.
