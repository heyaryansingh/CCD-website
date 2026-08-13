"""Crop the headshot out of each intern announcement card.

The cards are a fixed template: a gold-ringed oval portrait up top, and a gold
"role" pill below it. The pill sits at a different height on every card (the
longer someone's bio, the higher it rides), so a hardcoded box does not work.
Scan down for gold rows and take the FIRST run — the blank card background
separates the oval from the pill.

The site shows these in a border-radius:50% avatar, so the useful area is the
CIRCLE inscribed in the crop, and the widest circle that contains only photo has
the radius of the oval's semi-minor (horizontal) axis. That much is geometry.

What is not geometry is WHERE to centre it vertically. A fixed offset cut
Immanuel's chin while leaving others sitting low, because the subject is framed
differently on each card. So the face is found instead: within the oval, facial
detail (eyes, mouth, the edge of the hair) produces far more row-to-row variance
than a wall, a hedge or a studio backdrop. Centre on the weighted middle of that
detail, then clamp so the circle cannot leave the photo.

    python scripts/crop_intern_cards.py [--preview]

--preview also writes a circle-masked contact sheet so the crops can be judged
the way they will actually appear.
"""

import math
import os
import sys
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, "assets", "interns-2026-graphics")
OUT = os.path.join(HERE, "ccd-website", "public", "media", "interns")

GOLD = (247, 194, 43)
TOL = 46
RING = 30  # ring thickness in px, measured off the template
OUT_PX = 560

NAMES = {
    "Alison Gunzler": "alison-gunzler",
    "Aryan Singh": "aryan-singh",
    "Immanuel Gebreyesus": "immanuel-gebreyesus",
    "John Lu": "john-lu",
    "Zoe Tseng": "zoe-tseng",
}


def gold_run(px, w, y):
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
            return x0, top, x1, y
    return None


def face_centre_y(im, box, cx, radius):
    """The vertical middle of the facial detail inside the oval.

    Row-to-row variance across a narrow central column: a face swings from brow
    to eye to cheek to mouth, a backdrop barely moves. Weighting each row by that
    swing and taking the centre of mass lands on the face without a detector.
    """
    x0, y0, x1, y1 = box
    strip = im.crop((int(cx - radius * 0.55), y0, int(cx + radius * 0.55), y1))
    strip = strip.convert("L").filter(ImageFilter.FIND_EDGES)
    w, h = strip.size
    px = strip.load()
    weights = []
    for y in range(h):
        row = [px[x, y] for x in range(0, w, 2)]
        weights.append(sum(row) / len(row))
    # Ignore the outermost rows: FIND_EDGES lights up the oval's own boundary.
    pad = int(h * 0.10)
    weights = [0.0] * pad + weights[pad : h - pad] + [0.0] * pad
    total = sum(weights)
    if total <= 0:
        return (y0 + y1) / 2
    centre = sum(y * wgt for y, wgt in enumerate(weights)) / total
    return y0 + centre


def clamp_inside_ellipse(target, cy, a, b, r, steps=180):
    """Move the circle's centre towards `target`, as far as it can go while every
    point of the circle stays inside the ellipse.

    `b - r` looks like the answer and is not: it only holds on the vertical axis.
    Off-centre, the ellipse narrows and the circle's upper arcs escape first —
    which is exactly how a gold sliver of the ring reappeared at the top of one
    crop. Sampling the circle is a few microseconds and is simply correct.
    """

    def fits(dy):
        for i in range(steps):
            th = 2 * math.pi * i / steps
            x = r * math.cos(th)
            y = dy + r * math.sin(th)
            if (x * x) / (a * a) + (y * y) / (b * b) > 1.0:
                return False
        return True

    want = target - cy
    if fits(want):
        return cy + want
    step = -1 if want > 0 else 1
    dy = want
    while abs(dy) > 0:
        dy += step
        if abs(dy) < 1:
            dy = 0
        if fits(dy):
            return cy + dy
    return cy


def main():
    os.makedirs(OUT, exist_ok=True)
    crops = []
    for label, slug in NAMES.items():
        im = Image.open(os.path.join(SRC, f"{label}.PNG")).convert("RGB")
        box = oval_box(im)
        if not box:
            print(f"!! no oval found for {label}", file=sys.stderr)
            continue
        x0, y0, x1, y1 = box
        ix0, iy0, ix1, iy1 = x0 + RING, y0 + RING, x1 - RING, y1 - RING
        a, b = (ix1 - ix0) / 2, (iy1 - iy0) / 2
        cx, cy = (ix0 + ix1) / 2, (iy0 + iy1) / 2

        # Widest circle that holds only photo, backed off 2%.
        r = a * 0.98
        face_y = face_centre_y(im, (ix0, iy0, ix1, iy1), cx, r)
        # Sit slightly above the detected centre so there is headroom rather than
        # a chin-up crop, then clamp so the circle stays inside the ellipse.
        target = face_y - r * 0.08
        centre_y = clamp_inside_ellipse(target, cy, a, b, r)

        crop = im.crop((round(cx - r), round(centre_y - r), round(cx + r), round(centre_y + r)))
        crop = crop.resize((OUT_PX, OUT_PX), Image.LANCZOS)
        dest = os.path.join(OUT, f"{slug}.jpg")
        crop.save(dest, "JPEG", quality=88, optimize=True)
        crops.append((slug, crop))
        print(
            f"{slug}.jpg  face@{face_y - iy0:.0f}px of {2 * b:.0f}  "
            f"shift={centre_y - cy:+.0f}  -> {os.path.getsize(dest) // 1024} KB"
        )

    # Keep the designed cards too — staff made them and the announcement uses them.
    for label, slug in NAMES.items():
        im = Image.open(os.path.join(SRC, f"{label}.PNG")).convert("RGB")
        im.thumbnail((900, 1125), Image.LANCZOS)
        dest = os.path.join(OUT, f"{slug}-card.jpg")
        im.save(dest, "JPEG", quality=86, optimize=True)

    if "--preview" in sys.argv:
        # Masked to a circle, which is how the site renders them.
        size = 240
        sheet = Image.new("RGB", (size * len(crops), size), "white")
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
        for i, (_slug, crop) in enumerate(crops):
            tile = Image.new("RGB", (size, size), "white")
            tile.paste(crop.resize((size, size), Image.LANCZOS), (0, 0), mask)
            sheet.paste(tile, (i * size, 0))
        sheet.save(os.path.join(HERE, "crops-preview.png"))
        print("preview -> crops-preview.png")


main()
