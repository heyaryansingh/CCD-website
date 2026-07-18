from __future__ import annotations

import csv
import shutil
import textwrap
from pathlib import Path

import cv2
from PIL import Image, ImageDraw, ImageFont, ImageOps

try:
    from pillow_heif import register_heif_opener

    register_heif_opener()
except Exception:
    pass


REPO = Path(__file__).resolve().parents[1]
FILEBASE = REPO / "website-media-filebase"
OUT = FILEBASE / "stitch-upload-files"
CATALOG = FILEBASE / "media-catalog.csv"

W, H = 2400, 2200
MARGIN = 70
BG = "#FAF7F2"
INK = "#1A1A1A"
MUTED = "#625F58"
GREEN = "#2D5016"
GOLD = "#C9A227"
TERRACOTTA = "#C4632A"
GRAY = "#F0EBE3"
WHITE = "#FFFFFF"

PAGES = [
    {
        "slug": "01-home",
        "title": "Home",
        "headline": "Build the Block. Brick by Brick.",
        "query": ["Neighborhood / drone footage"],
        "direction": "Full-bleed real Irvington aerial media, mission block, program cards, impact counters, project map teaser, Donate / Member / Book CTAs.",
        "max_assets": 10,
    },
    {
        "slug": "02-about",
        "title": "About",
        "headline": "We are Irvington.",
        "query": ["History / walking tour", "Events / community activity"],
        "direction": "Human CCD story, H.E.A.R.T. and C.L.E.A.R., timeline, walking-tour context, community proof, team placeholders.",
        "max_assets": 10,
    },
    {
        "slug": "03-center-social-impact",
        "title": "Center for Social Impact",
        "headline": "What was abandoned can become a beacon.",
        "query": ["Center for Social Impact / 3932 Frederick"],
        "direction": "3932-3934 Frederick project page with before/current condition, renovation vision, partners, timeline, Brick Campaign CTA.",
        "max_assets": 12,
    },
    {
        "slug": "04-brick-campaign",
        "title": "Brick Campaign",
        "headline": "Put your name in the future of 21229.",
        "query": ["Center for Social Impact / 3932 Frederick", "Neighborhood / drone footage"],
        "direction": "Emotional fundraising page with real building media, named brick tiers, progress bar, PayPal and fundraisingbrick CTAs.",
        "max_assets": 12,
    },
    {
        "slug": "05-clean-green",
        "title": "Clean & Green",
        "headline": "Your yard. Our pride.",
        "query": ["Clean & Green / work action", "Project before-condition"],
        "direction": "Revenue-focused service landing page with work-action proof, services grid, 15 percent member discount, estimate CTA, before/after slots.",
        "max_assets": 10,
    },
    {
        "slug": "06-events-market",
        "title": "Co-op Market + Events",
        "headline": "Shop local. Grow together.",
        "query": ["Events / community activity", "Shoe Drive campaign"],
        "direction": "Events hub with market cards, Shoe Drive/news modules, registration links, social proof, and active community rhythm.",
        "max_assets": 10,
    },
    {
        "slug": "07-projects",
        "title": "Projects",
        "headline": "Our work in the 21229.",
        "query": ["Projects / gardens / Oasis", "Murals / community marketplace", "History / walking tour", "Project before-condition"],
        "direction": "Project hub with Oasis, Memorial Garden, Botanical Bus Stop, murals, walking tour, and ReBUILD-style impact map teaser.",
        "max_assets": 12,
    },
    {
        "slug": "08-membership",
        "title": "Membership",
        "headline": "This is your co-op. Own a piece of it.",
        "query": ["History / walking tour", "Events / community activity"],
        "direction": "Benefit-first co-op membership page with resident/business tiers, vote and perk clarity, Tool Bank and Clean & Green benefits.",
        "max_assets": 8,
    },
    {
        "slug": "09-donate",
        "title": "Donate",
        "headline": "Invest in Irvington.",
        "query": ["Neighborhood / drone footage", "Projects / gardens / Oasis", "Murals / community marketplace"],
        "direction": "Donation page with impact tiers, Brick Campaign cross-link, real project media, trust signals, and recurring giving CTA.",
        "max_assets": 10,
    },
    {
        "slug": "10-contact",
        "title": "Contact",
        "headline": "Connect with CCD.",
        "query": ["Brand / logos", "Neighborhood / drone footage"],
        "direction": "Quiet utility page with contact info, address, forms, social links, facilities booking, and brand-consistent footer.",
        "max_assets": 6,
    },
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for item in candidates:
        if Path(item).exists():
            return ImageFont.truetype(item, size)
    return ImageFont.load_default()


FONT_H1 = font(64, True)
FONT_H2 = font(38, True)
FONT_BODY = font(28)
FONT_SMALL = font(22)
FONT_TINY = font(18)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, width: int) -> list[str]:
    lines: list[str] = []
    for para in text.split("\n"):
        current = ""
        for word in para.split():
            test = f"{current} {word}".strip()
            if draw.textbbox((0, 0), test, font=fnt)[2] <= width:
                current = test
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def fit_image(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(img.convert("RGB"), size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def frame_from_video(path: Path) -> Image.Image | None:
    cap = cv2.VideoCapture(str(path))
    if not cap.isOpened():
        return None
    frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    if frames:
        cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, int(frames * 0.25)))
    ok, frame = cap.read()
    cap.release()
    if not ok:
        return None
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return Image.fromarray(frame)


def thumb(path: Path, row: dict[str, str], size: tuple[int, int]) -> Image.Image:
    try:
        if row["media_type"] == "video":
            img = frame_from_video(path)
        elif row["media_type"] == "image":
            img = Image.open(path)
        else:
            img = None
        if img:
            return fit_image(img, size)
    except Exception:
        pass
    img = Image.new("RGB", size, GRAY)
    draw = ImageDraw.Draw(img)
    label = row.get("media_type", "file").upper()
    for y, line in enumerate(wrap(draw, label, FONT_H2, size[0] - 50)[:2]):
        draw.text((25, 35 + y * 44), line, fill=GREEN, font=FONT_H2)
    for y, line in enumerate(wrap(draw, Path(row["organized_path"]).name, FONT_SMALL, size[0] - 50)[:4]):
        draw.text((25, 140 + y * 30), line, fill=INK, font=FONT_SMALL)
    return img


def load_rows() -> list[dict[str, str]]:
    with CATALOG.open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))
    return [r for r in rows if r.get("organized_path")]


def choose_assets(rows: list[dict[str, str]], page: dict[str, object]) -> list[dict[str, str]]:
    queries = [str(q).lower() for q in page["query"]]

    def score(row: dict[str, str]) -> int:
        hay = " ".join(
            [
                row["category"],
                row["target_page"],
                row["target_section"],
                row["organized_path"],
                row["include_recommendation"],
            ]
        ).lower()
        if not any(q in hay for q in queries):
            return -1
        n = 0
        if row["include_recommendation"] == "Website-ready":
            n += 50
        if row["quality_rating"] == "Strong":
            n += 25
        if row["media_type"] == "image":
            n += 8
        if row["media_type"] == "video":
            n += 6
        if row["extension"].lower() == ".heic":
            n += 10
        if "shoe" in row["category"].lower() and page["slug"] != "06-events-market":
            n -= 30
        return n

    selected: list[dict[str, str]] = []
    used: set[str] = set()
    per_query = max(1, int(page["max_assets"]) // max(1, len(queries)))
    for query in queries:
        candidates = []
        for row in rows:
            hay = " ".join([row["category"], row["target_page"], row["target_section"], row["organized_path"]]).lower()
            if query in hay:
                candidates.append((score(row), row))
        for _, row in sorted(candidates, key=lambda item: item[0], reverse=True):
            if row["organized_path"] in used:
                continue
            selected.append(row)
            used.add(row["organized_path"])
            if sum(1 for item in selected if query in " ".join([item["category"], item["target_page"], item["target_section"], item["organized_path"]]).lower()) >= per_query:
                break
    if len(selected) < int(page["max_assets"]):
        ranked = sorted(((score(r), r) for r in rows), key=lambda item: item[0], reverse=True)
        for s, row in ranked:
            if s < 0 or row["organized_path"] in used:
                continue
            selected.append(row)
            used.add(row["organized_path"])
            if len(selected) >= int(page["max_assets"]):
                break
    return selected[: int(page["max_assets"])]


def draw_palette(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    swatches = [
        ("Forest", GREEN),
        ("Gold", GOLD),
        ("Clay", TERRACOTTA),
        ("Cream", BG),
        ("Warm gray", GRAY),
        ("Ink", INK),
    ]
    draw.text((x, y), "CCD palette", fill=INK, font=FONT_H2)
    y += 54
    for idx, (name, color) in enumerate(swatches):
        sx = x + idx * 170
        draw.rounded_rectangle((sx, y, sx + 140, y + 72), radius=12, fill=color, outline=INK if color == BG else None, width=2)
        draw.text((sx, y + 84), name, fill=INK, font=FONT_TINY)
        draw.text((sx, y + 108), color, fill=MUTED, font=FONT_TINY)


def draw_text_block(draw: ImageDraw.ImageDraw, x: int, y: int, title: str, body: str, width: int, lines: int = 8) -> int:
    draw.text((x, y), title, fill=GREEN, font=FONT_H2)
    y += 48
    for line in wrap(draw, body, FONT_BODY, width)[:lines]:
        draw.text((x, y), line, fill=INK, font=FONT_BODY)
        y += 36
    return y


def draw_board(page: dict[str, object], assets: list[dict[str, str]]) -> Path:
    board = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(board)
    draw.rectangle((0, 0, W, 18), fill=GREEN)
    draw.rectangle((0, H - 22, W, H), fill=GOLD)
    draw.text((MARGIN, 60), "CCD / Google Stitch upload board", fill=GREEN, font=FONT_H2)
    draw.text((MARGIN, 112), str(page["title"]), fill=INK, font=FONT_H1)
    draw.text((MARGIN, 190), str(page["headline"]), fill=TERRACOTTA, font=FONT_H2)

    draw_text_block(
        draw,
        MARGIN,
        270,
        "Prompt direction",
        str(page["direction"])
        + " Inspired by ReBUILD Metro: full-bleed real media, sticky utility nav, program cards, impact counters, map teaser, testimonials, and persistent Donate CTA.",
        1020,
        7,
    )
    draw_palette(draw, MARGIN, 590)

    nav = "Nav: About | Programs | Projects | Get Involved | News | Contact | Donate"
    utility = "Utility: Clean & Green Services | Tool Bank | Facilities Booking"
    draw_text_block(draw, MARGIN, 780, "Required structure", nav + "\n" + utility, 1020, 4)

    draw.text((1260, 60), "Real media to use", fill=GREEN, font=FONT_H2)
    cell_w, cell_h = 500, 270
    gap = 26
    start_x, start_y = 1260, 125
    cols = 2
    for idx, row in enumerate(assets[:10]):
        x = start_x + (idx % cols) * (cell_w + gap)
        y = start_y + (idx // cols) * (cell_h + 95)
        path = REPO / row["organized_path"]
        tile = thumb(path, row, (cell_w, cell_h))
        board.paste(tile, (x, y))
        draw.rounded_rectangle((x, y, x + cell_w, y + cell_h), radius=8, outline=GREEN, width=4)
        badge = "VIDEO" if row["media_type"] == "video" else row["include_recommendation"].upper()
        draw.rounded_rectangle((x + 10, y + 10, x + 150, y + 45), radius=8, fill=GOLD)
        draw.text((x + 20, y + 16), badge[:14], fill=INK, font=FONT_TINY)
        caption = f"{row['category']} - {Path(row['organized_path']).name[:58]}"
        for n, line in enumerate(wrap(draw, caption, FONT_TINY, cell_w)[:2]):
            draw.text((x, y + cell_h + 10 + n * 24), line, fill=INK, font=FONT_TINY)

    footer = "Upload this PNG to Stitch, then paste the matching prompt TXT. Do not ask Stitch to browse folders."
    draw.text((MARGIN, H - 75), footer, fill=INK, font=FONT_BODY)
    out = OUT / f"{page['slug']}-visual-board.png"
    board.save(out, optimize=True)
    return out


def prompt_for(page: dict[str, object], board_name: str) -> str:
    return textwrap.dedent(
        f"""\
        Use the uploaded reference board `{board_name}` as the source of truth for CCD's real media, palette, page structure, and design direction.

        Build a modern nonprofit website page for Cooperative Community Development Inc in Baltimore's Irvington / 21229 community.
        Page: {page['title']}
        Headline: {page['headline']}

        Direction:
        {page['direction']}

        Design rules:
        - Use the actual people, places, buildings, murals, tools, gardens, and neighborhood footage shown in the uploaded board.
        - Use CCD's palette from the board: deep forest green, CCD gold, terracotta clay, cream, warm gray, and near-black text.
        - Be heavily inspired by ReBUILD Metro's strengths: full-bleed real photography, sticky nav, utility links, program cards, impact counters, map teaser, testimonials, news/social proof, and clear Donate CTA.
        - Do not use purple as the dominant brand color and do not make the page feel like generic stock nonprofit design.
        - Keep the design specific to CCD: H.E.A.R.T., C.L.E.A.R., Center for Social Impact, Clean & Green, Tool Bank, Co-op Market, Brick Campaign, Irvington, and 21229.
        - Primary nav: About, Programs, Projects, Get Involved, News, Contact, Donate.
        - Utility nav: Clean & Green Services, Tool Bank, Facilities Booking.
        """
    )


def draw_master(rows: list[dict[str, str]]) -> Path:
    pseudo_page = {
        "slug": "00-master",
        "title": "Master Website Direction",
        "headline": "ReBUILD-inspired, CCD-specific, real-media-first.",
        "query": [
            "Neighborhood / drone footage",
            "Clean & Green / work action",
            "Murals / community marketplace",
            "History / walking tour",
            "Center for Social Impact / 3932 Frederick",
        ],
        "direction": "Use this as the global visual system board: CCD palette, actual media, program priorities, and navigation model.",
        "max_assets": 10,
    }
    return draw_board(pseudo_page, choose_assets(rows, pseudo_page))


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    rows = load_rows()

    master = draw_master(rows)
    generated = [master]
    guide_lines = [
        "# Google Stitch Upload Files",
        "",
        "Google Stitch cannot see local folders. Use these single files instead.",
        "",
        "Workflow:",
        "1. Open a page experiment in Stitch.",
        "2. Upload the matching `*-visual-board.png` file.",
        "3. Paste the matching `*-prompt.txt` text.",
        "4. Do not paste folder paths; the media is already embedded in the board image.",
        "",
        "Start with `00-master-visual-board.png`, then run page boards in this order: Home, Center for Social Impact, Clean & Green, Projects, Donate/Brick Campaign.",
        "",
    ]

    master_prompt = prompt_for(
        {
            "title": "Full Site Visual System",
            "headline": "Build the Block. Brick by Brick.",
            "direction": "Create the global CCD design system and homepage direction using the uploaded master board.",
        },
        master.name,
    )
    (OUT / "00-master-prompt.txt").write_text(master_prompt, encoding="utf-8")

    for page in PAGES:
        assets = choose_assets(rows, page)
        board = draw_board(page, assets)
        generated.append(board)
        prompt = prompt_for(page, board.name)
        prompt_path = OUT / f"{page['slug']}-prompt.txt"
        prompt_path.write_text(prompt, encoding="utf-8")
        guide_lines.append(f"- `{board.name}` + `{prompt_path.name}`")

    (OUT / "00-upload-guide.md").write_text("\n".join(guide_lines) + "\n", encoding="utf-8")
    print(f"generated_boards={len(generated)}")
    print(f"output={OUT}")


if __name__ == "__main__":
    main()
