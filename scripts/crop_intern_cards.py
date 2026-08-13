"""Crop the headshot out of each intern graphic card.

The cards are a fixed template: a gold-ringed oval portrait up top, and a gold
"role" pill below it. The pill sits at a different height on every card (the
longer someone's bio, the higher it rides), so a hardcoded box does not work.

Instead: scan down for gold rows, take the FIRST run of them — that is the oval,
since the blank card background separates it from the pill — then step inside the
ring and cut a square that the site's circular avatar can clip cleanly.
"""

import os
import sys
from PIL import Image

SRC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "interns-2026-graphics")
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ccd-website", "public", "media", "interns")

GOLD = (247, 194, 43)
TOL = 46
RING = 30  # ring thickness in px, measured off the template

NAMES = {
    "Alison Gunzler": "alison-gunzler",
    "Aryan Singh": "aryan-singh",
    "Immanuel Gebreyesus": "immanuel-gebreyesus",
    "John Lu": "john-lu",
    "Zoe Tseng": "zoe-tseng",
}


def gold_run(px, w, y):
    """x-extent of gold pixels on one row, or None."""
    xs = [x for x in range(0, w, 2) if all(abs(px[x, y][i] - GOLD[i]) <= TOL for i in range(3))]
    return (min(xs), max(xs)) if xs else None


def oval_box(im):
    """Bounding box of the portrait ring only — the first gold run down the card."""
    w, h = im.size
    px = im.load()
    top = None
    x0, x1 = w, 0
    for y in range(0, int(h * 0.75), 2):
        run = gold_run(px, w, y)
        if run:
            if top is None:
                top = y
            x0, x1 = min(x0, run[0]), max(x1, run[1])
        elif top is not None:
            return x0, top, x1, y  # first blank row after the oval
    return None


def main():
    os.makedirs(OUT, exist_ok=True)
    for label, slug in NAMES.items():
        im = Image.open(os.path.join(SRC, f"{label}.PNG")).convert("RGB")
        box = oval_box(im)
        if not box:
            print(f"!! no oval found for {label}", file=sys.stderr)
            continue
        x0, y0, x1, y1 = box
        # Inside the ring.
        ix0, iy0, ix1, iy1 = x0 + RING, y0 + RING, x1 - RING, y1 - RING
        a, b = (ix1 - ix0) / 2, (iy1 - iy0) / 2
        cx, cy = (ix0 + ix1) / 2, (iy0 + iy1) / 2
        # The site renders these in a border-radius:50% avatar, so size for the
        # INSCRIBED CIRCLE, not the square — the square's corners fall outside the
        # ellipse but get clipped away. Sizing for the square instead cropped into
        # people's chins. The oval is taller than wide, so width is the limit.
        s = a * 0.98
        # Faces sit above the ellipse's centre, so shift up — but only as far as
        # the ellipse still covers the circle.
        headroom = b - s
        shift = min(headroom, b * 0.12)
        cy -= shift
        crop = im.crop((round(cx - s), round(cy - s), round(cx + s), round(cy + s)))
        side = round(2 * s)
        crop = crop.resize((560, 560), Image.LANCZOS)
        dest = os.path.join(OUT, f"{slug}.jpg")
        crop.save(dest, "JPEG", quality=88, optimize=True)
        print(f"{slug}.jpg  oval={box} side={side}px -> {os.path.getsize(dest) // 1024} KB")

    # Keep the designed cards too — staff made them and the announcement uses them.
    for label, slug in NAMES.items():
        im = Image.open(os.path.join(SRC, f"{label}.PNG")).convert("RGB")
        im.thumbnail((900, 1125), Image.LANCZOS)
        dest = os.path.join(OUT, f"{slug}-card.jpg")
        im.save(dest, "JPEG", quality=86, optimize=True)
        print(f"{slug}-card.jpg -> {os.path.getsize(dest) // 1024} KB")


main()
