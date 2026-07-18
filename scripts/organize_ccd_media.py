from __future__ import annotations

import csv
import re
import shutil
from dataclasses import dataclass
from pathlib import Path

try:
    from PIL import Image
except Exception:  # pragma: no cover - optional local dependency
    Image = None

try:
    import cv2
except Exception:  # pragma: no cover - optional local dependency
    cv2 = None


REPO = Path(__file__).resolve().parents[1]
SHARED_ROOT = REPO / "Cooperative Community Development Inc"
OUT_ROOT = REPO / "website-media-filebase"

FOLDERS = {
    "home_drone": "01-home-hero-neighborhood-drone",
    "about": "02-about-team-community",
    "center": "03-center-for-social-impact-3932-frederick",
    "brick": "04-brick-campaign",
    "clean": "05-clean-green",
    "events": "06-coop-market-events",
    "projects": "07-projects-oasis-gardens-bus-stop",
    "history": "08-history-walking-tour-murals",
    "brand": "09-partner-logos-brand",
    "shoe": "10-shoe-drive-campaign",
    "docs": "90-source-docs",
    "review": "99-review-needed",
}

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".nef"}
VIDEO_EXT = {".mp4", ".mov", ".avi"}
DOC_EXT = {".pdf", ".docx", ".doc", ".pptx", ".md", ".textclipping"}
AUDIO_EXT = {".wav"}


@dataclass(frozen=True)
class Decision:
    folder: str
    category: str
    recommendation: str
    rating: str
    page: str
    section: str
    notes: str
    copy: bool


def slug(text: str) -> str:
    text = re.sub(r"[^A-Za-z0-9._-]+", "-", text).strip("-")
    return text[:120] or "asset"


def media_type(ext: str) -> str:
    ext = ext.lower()
    if ext in IMAGE_EXT:
        return "image"
    if ext in VIDEO_EXT:
        return "video"
    if ext in DOC_EXT:
        return "document"
    if ext in AUDIO_EXT:
        return "audio"
    return "other"


def in_range(stem: str, prefix: str, start: int, end: int) -> bool:
    if not stem.upper().startswith(prefix):
        return False
    try:
        n = int(stem.upper().replace(prefix, ""))
    except ValueError:
        return False
    return start <= n <= end


def decide(source_label: str, rel: Path, path: Path) -> Decision:
    text = str(rel).replace("\\", "/").lower()
    name = path.name.lower()
    stem = path.stem.upper()
    ext = path.suffix.lower()
    size = path.stat().st_size

    if any(token in text for token in ["medical-report", "dhr_fia", "fia_500", "revised-august"]):
        return Decision(FOLDERS["docs"], "Private/admin document", "Archive", "Not for website", "Archive", "Do not publish", "Administrative or sensitive source file; catalog only.", False)

    if "shoe drive" in text or "sneaker" in text or "f2owhyshoes" in text:
        return Decision(FOLDERS["shoe"], "Shoe Drive campaign", "Supporting", "Good", "Events / News", "Shoe Drive promotion", "Campaign asset from existing drive package.", True)

    if "brand guideline" in text or "logo" in text:
        return Decision(FOLDERS["brand"], "Brand / logos", "Website-ready", "Good", "Global design system", "Brand reference", "Brand source file.", True)

    if ext in DOC_EXT:
        page = "Planning / source copy"
        if "irvington" in text:
            page = "Projects / Impact map"
        if "org overview" in text:
            page = "About / Donate"
        return Decision(FOLDERS["docs"], "Source document", "Supporting", "Good", page, "Reference copy", "Keep as source material, not visual hero media.", True)

    if "3932 frederick" in text or "center for social impact" in text or "frederick" in text:
        if ext == ".heic":
            return Decision(FOLDERS["review"], "Center for Social Impact / 3932 Frederick", "Review-needed", "Unknown", "Center for Social Impact / Brick Campaign", "Building inventory gallery", "HEIC needs visual review/conversion before web use.", True)
        return Decision(FOLDERS["center"], "Center for Social Impact / 3932 Frederick", "Supporting", "Good", "Center for Social Impact", "Current-building and transformation proof", "Use for before/after and project credibility.", True)

    if "brick" in text or "campaign" in text:
        return Decision(FOLDERS["brick"], "Brick Campaign", "Supporting", "Good", "Brick Campaign", "Fundraising story media", "Use only when it directly supports the 3932 Frederick story.", True)

    if "drone" in text or "dji_" in name or "panout" in text or "ccd_field" in name:
        if ext in {".jpg", ".jpeg", ".png"}:
            return Decision(FOLDERS["home_drone"], "Neighborhood / drone footage", "Supporting", "Good", "Home / Projects", "Aerial still", "Use as real neighborhood stills for Stitch experiments.", True)
        if name in {"yt_shortccdpanout.mp4", "miraclechurch_morinaenterprise.mp4", "sidepan_miraclechurch_morinaenterprise.mp4", "dji_0102.mp4"} or name.startswith("ccd_field"):
            return Decision(FOLDERS["home_drone"], "Neighborhood / drone footage", "Website-ready", "Strong", "Home", "Hero video / motion background", "Short enough for design experiments.", True)
        return Decision(FOLDERS["home_drone"], "Neighborhood / drone footage", "Archive", "Unknown", "Home", "Raw edit source", "Large raw drone source; cataloged but not copied.", False)

    if "clean" in text or "green" in text or in_range(stem, "MMZ_", 8030, 8049):
        if ext == ".nef":
            return Decision(FOLDERS["clean"], "Clean & Green / work action", "Archive", "Unknown", "Clean & Green", "RAW edit source", "RAW paired with JPG; keep original as edit source.", False)
        return Decision(FOLDERS["clean"], "Clean & Green / work action", "Website-ready", "Strong", "Clean & Green", "Services hero / work proof", "Real team-in-action media.", True)

    if "marketplace" in text or "mural" in text:
        return Decision(FOLDERS["history"], "Murals / community marketplace", "Website-ready", "Strong", "Projects / About", "Mural and local culture gallery", "Strong place-based visual; use as supporting project media.", True)

    if "5-minute histories" in text or "irvington tour" in text or "walk final photos" in text or "city chill" in text:
        if ext in VIDEO_EXT and size > 350_000_000:
            return Decision(FOLDERS["history"], "History / walking tour", "Archive", "Unknown", "About / Projects", "Long-form source video", "Too large for direct design filebase; catalog source path.", False)
        return Decision(FOLDERS["history"], "History / walking tour", "Supporting", "Good", "About / Projects / Impact map", "History and walking-tour proof", "Use for story sections, map, and galleries.", True)

    if "oasis" in text or "memorial garden" in text or "house memorial" in text or "monastery" in text or "bus stop" in text:
        if "final" in name and size > 500_000_000:
            return Decision(FOLDERS["projects"], "Memorial Garden / project video", "Archive", "Unknown", "Projects", "Long-form source video", "Large final video; cataloged, not copied.", False)
        return Decision(FOLDERS["projects"], "Projects / gardens / Oasis", "Supporting", "Good", "Projects", "Project gallery", "Use for project pages and community story blocks.", True)

    if "bgjwc" in text or "cooperative way" in text or "community day" in text:
        if ext in VIDEO_EXT and size > 75_000_000:
            return Decision(FOLDERS["events"], "Events / community activity", "Archive", "Unknown", "Events / News", "Long event source", "Large clip; cataloged for later review.", False)
        if ext == ".heic":
            return Decision(FOLDERS["review"], "Events / community activity", "Review-needed", "Unknown", "Events / News", "Event gallery", "HEIC needs visual review/conversion before web use.", False)
        return Decision(FOLDERS["events"], "Events / community activity", "Supporting", "Good", "Events / News", "Event gallery", "Use after caption/context review.", True)

    if "camera 1" in text and name == "dscf0028.jpg":
        return Decision(FOLDERS["projects"], "Project before-condition", "Supporting", "Fair", "Projects / Clean & Green", "Before-condition proof", "Useful but not hero quality.", True)

    if ext == ".nef":
        return Decision(FOLDERS["review"], "RAW photo source", "Archive", "Unknown", "Archive", "Edit source", "RAW file; use paired JPG first.", False)

    if ext == ".heic":
        return Decision(FOLDERS["review"], "Unreviewed HEIC photo", "Review-needed", "Unknown", "Review", "Possible gallery image", "Needs conversion and visual review.", False)

    if media_type(ext) == "image":
        return Decision(FOLDERS["review"], "Unclassified image", "Review-needed", "Unknown", "Review", "Possible supporting media", "No reliable folder signal; review manually.", False)

    if media_type(ext) == "video":
        return Decision(FOLDERS["review"], "Unclassified video", "Review-needed", "Unknown", "Review", "Possible b-roll", "No reliable folder signal; review manually.", False)

    return Decision(FOLDERS["review"], "Other", "Archive", "Unknown", "Archive", "Unclassified source", "Not a primary website media type.", False)


def image_dimensions(path: Path) -> str:
    if Image is None or path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        return ""
    try:
        with Image.open(path) as im:
            return f"{im.width}x{im.height}"
    except Exception:
        return ""


def video_metadata(path: Path) -> tuple[str, str]:
    if cv2 is None or path.suffix.lower() not in VIDEO_EXT or path.stat().st_size > 350_000_000:
        return "", ""
    try:
        cap = cv2.VideoCapture(str(path))
        if not cap.isOpened():
            return "", ""
        fps = cap.get(cv2.CAP_PROP_FPS) or 0
        frames = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
        duration = f"{frames / fps:.1f}" if fps else ""
        cap.release()
        return (f"{width}x{height}" if width and height else ""), duration
    except Exception:
        return "", ""


def copy_asset(path: Path, source_label: str, rel: Path, decision: Decision, used: set[str]) -> str:
    if not decision.copy:
        return ""
    target_dir = OUT_ROOT / decision.folder
    if decision.folder == FOLDERS["review"] and "3932" in decision.category:
        target_dir = target_dir / "center-social-impact-3932-heic"
    target_dir.mkdir(parents=True, exist_ok=True)
    name = f"{source_label}-{slug(str(rel.parent))}-{slug(path.name)}"
    while name.lower() in used:
        name = f"{path.stem}-{len(used)}{path.suffix}"
    used.add(name.lower())
    target = target_dir / name
    if not target.exists() or target.stat().st_size != path.stat().st_size:
        shutil.copy2(path, target)
    return str(target.relative_to(REPO))


def iter_sources() -> list[tuple[str, Path]]:
    roots = [("shared", SHARED_ROOT), ("shoe", REPO / "Shoe Drive CCD")]
    for file in REPO.iterdir():
        if file.is_file() and file.suffix.lower() in IMAGE_EXT | DOC_EXT:
            roots.append(("repo-root", file))
    return roots


def iter_files(source: Path):
    if source.is_file():
        yield source, Path(source.name)
        return
    for path in source.rglob("*"):
        if path.is_file() and OUT_ROOT not in path.parents and ".agent-orchestration" not in path.parts:
            yield path, path.relative_to(source)


def write_readme(rows: list[dict[str, str]]) -> None:
    counts: dict[str, int] = {}
    recs: dict[str, int] = {}
    for row in rows:
        counts[row["category"]] = counts.get(row["category"], 0) + 1
        recs[row["include_recommendation"]] = recs.get(row["include_recommendation"], 0) + 1
    lines = [
        "# CCD Website Media Filebase",
        "",
        "Generated from the shared CCD media folder and existing Shoe Drive website assets.",
        "",
        "Original files were not moved, renamed, or deleted. This folder contains curated copies plus a complete catalog.",
        "",
        "## How to Use",
        "",
        "- Start with `media-catalog.csv`.",
        "- Use `Website-ready` rows first in Google Stitch or the final redesign.",
        "- Use `Supporting` rows for galleries, cards, proof sections, and social/news.",
        "- Use `Review-needed` rows only after conversion/caption review.",
        "- Use `Archive` rows as source references; many are large RAW/drone/video files not copied here.",
        "",
        "## Recommendation Counts",
        "",
    ]
    for key in sorted(recs):
        lines.append(f"- {key}: {recs[key]}")
    lines += ["", "## Category Counts", ""]
    for key in sorted(counts):
        lines.append(f"- {key}: {counts[key]}")
    lines += [
        "",
        "## Website Priorities",
        "",
        "- Home hero: test `01-home-hero-neighborhood-drone` first.",
        "- Center for Social Impact and Brick Campaign: review `99-review-needed/center-social-impact-3932-heic` and convert the best HEICs.",
        "- Clean & Green: use `05-clean-green` for real action/service proof.",
        "- Projects/history: use `07-projects-oasis-gardens-bus-stop` and `08-history-walking-tour-murals` for local credibility.",
        "- Shoe Drive: use `10-shoe-drive-campaign` for event/news content, not primary brand hero content.",
    ]
    (OUT_ROOT / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_stitch_pack(rows: list[dict[str, str]]) -> None:
    ready = [r for r in rows if r["include_recommendation"] in {"Website-ready", "Supporting"} and r["organized_path"]]
    review = [r for r in rows if r["include_recommendation"] == "Review-needed" and r["organized_path"]]

    def assets_for(*needles: str, limit: int = 8) -> list[str]:
        found = []
        for row in ready:
            hay = " ".join([row["category"], row["target_page"], row["target_section"], row["organized_path"]]).lower()
            if any(n.lower() in hay for n in needles):
                found.append(row["organized_path"])
        return found[:limit]

    def review_assets_for(*needles: str, limit: int = 6) -> list[str]:
        found = []
        for row in review:
            hay = " ".join([row["category"], row["target_page"], row["target_section"], row["organized_path"]]).lower()
            if any(n.lower() in hay for n in needles):
                found.append(row["organized_path"])
        return found[:limit]

    pages = [
        ("Home", "Build the Block. Brick by Brick.", ["Home hero", "Neighborhood / drone footage"], "Full-bleed real Irvington/drone media, ReBUILD-style impact intro, programs carousel, impact map teaser, donate/member/book pathways."),
        ("About", "We are Irvington.", ["History", "About", "community"], "Human story page with H.E.A.R.T. and C.L.E.A.R., timeline, walking-tour proof, and team/headshot placeholders."),
        ("Center for Social Impact", "What was abandoned can become a beacon.", ["3932", "Center for Social Impact"], "Dedicated project page for 3932-3934 Frederick with before/current media, rendering slots, timeline, partners, and Brick Campaign CTA."),
        ("Brick Campaign", "Put your name in the future of 21229.", ["Brick", "3932", "Neighborhood / drone footage"], "Fundraising page with emotional story, named brick tiers, progress bar, PayPal and fundraisingbrick CTAs."),
        ("Clean & Green", "Your yard. Our pride.", ["Clean & Green"], "Service landing page with action media, service grid, member discount, free estimate CTA, and before/after placeholders."),
        ("Co-op Market + Events", "Shop local. Grow together.", ["Events", "Shoe Drive"], "Events hub with market cards, Shoe Drive/news modules, vendor registration, and recent community activity."),
        ("Projects", "Our work in the 21229.", ["Projects", "Oasis", "garden", "Murals"], "Project hub with Oasis, Memorial Garden, Botanical Bus Stop, murals/walking tour, and an impact map."),
        ("Membership", "This is your co-op. Own a piece of it.", ["community", "History"], "Benefit-first pricing page with resident/business tiers, Tool Bank/Clean & Green perks, and join CTA."),
        ("Donate", "Invest in Irvington.", ["Neighborhood / drone footage", "Projects"], "Donation page with impact tiers, Brick Campaign cross-link, real project media, and trust signals."),
        ("Contact", "Connect with CCD.", ["Brand", "Source document"], "Simple contact page with address, phone, emails, forms, social links, and facilities booking CTA."),
    ]

    lines = [
        "# CCD Google Stitch Prompt Pack",
        "",
        "Use these as separate Stitch experiments. Keep the site inspired by ReBUILD Metro's full-bleed real photography, sticky utility nav, impact counters, program cards, map teaser, testimonials, and strong donate CTA. Do not copy ReBUILD's purple brand; use CCD's green/gold/community palette and actual CCD media.",
        "",
    ]
    for title, headline, needles, direction in pages:
        assets = assets_for(*needles)
        if title in {"Center for Social Impact", "Brick Campaign"}:
            assets.extend(review_assets_for("3932", "Center for Social Impact"))
        if title == "Contact":
            assets = assets_for("Brand", limit=3)
        lines += [
            f"## {title}",
            "",
            "```text",
            f"Design a modern nonprofit website page for Cooperative Community Development Inc in Baltimore's Irvington / 21229 community.",
            f"Page: {title}.",
            f"Primary headline: {headline}",
            f"Design direction: {direction}",
            "Visual language: real community media, warm off-white backgrounds, deep green sections, CCD gold CTAs, terracotta Baltimore brick accents, sharp typography, diagonal ReBUILD-inspired section cuts, no stock photography.",
            "Navigation: About, Programs, Projects, Get Involved, News, Contact, Donate button. Utility links: Clean & Green Services, Tool Bank, Facilities Booking.",
            "Required CTAs: Become a Member, Donate, Book Clean & Green, Explore Projects.",
            "Use these local media references:",
        ]
        lines.extend([f"- {asset}" for asset in assets] or ["- No strong asset assigned yet; use a real-media placeholder and flag content gap."])
        lines += ["```", ""]
    (OUT_ROOT / "google-stitch-prompt-pack.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    if OUT_ROOT.exists():
        shutil.rmtree(OUT_ROOT)
    OUT_ROOT.mkdir(exist_ok=True)
    for folder in FOLDERS.values():
        (OUT_ROOT / folder).mkdir(exist_ok=True)

    rows: list[dict[str, str]] = []
    used_names: set[str] = set()
    for source_label, source in iter_sources():
        if not source.exists():
            continue
        for path, rel in iter_files(source):
            ext = path.suffix.lower()
            if ext not in IMAGE_EXT | VIDEO_EXT | DOC_EXT | AUDIO_EXT:
                continue
            decision = decide(source_label, rel, path)
            dimensions = image_dimensions(path)
            video_dims, duration = video_metadata(path)
            if video_dims:
                dimensions = video_dims
            try:
                organized = copy_asset(path, source_label, rel, decision, used_names)
                copy_error = ""
            except Exception as exc:
                organized = ""
                copy_error = f"copy failed: {type(exc).__name__}: {exc}"
            rows.append(
                {
                    "source_root": source_label,
                    "source_path": str(path.relative_to(REPO)),
                    "organized_path": organized,
                    "media_type": media_type(ext),
                    "extension": ext,
                    "size_bytes": str(path.stat().st_size),
                    "dimensions": dimensions,
                    "duration_seconds": duration,
                    "category": decision.category,
                    "include_recommendation": decision.recommendation,
                    "quality_rating": decision.rating,
                    "target_page": decision.page,
                    "target_section": decision.section,
                    "notes": decision.notes if not copy_error else f"{decision.notes} {copy_error}",
                }
            )

    fieldnames = list(rows[0].keys()) if rows else []
    with (OUT_ROOT / "media-catalog.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    write_readme(rows)
    write_stitch_pack(rows)
    print(f"cataloged={len(rows)}")
    print(f"copied={sum(1 for r in rows if r['organized_path'])}")
    print(f"output={OUT_ROOT}")


if __name__ == "__main__":
    main()
