#!/usr/bin/env python3
"""
Vectorise the Welborn Orthopedics logo PNG into the SVG assets the site uses.

The practice supplied the logo as a 2000 x 2000 raster. A website needs it
crisp on a phone, on a 5K display and in a 32px browser tab, so each flat
colour region is traced to a path and written out as SVG.

If the practice ever supplies the original vector artwork (.ai/.eps/.svg),
prefer it: drop it in place of the generated files and delete this script.

    pip install pillow numpy potracer
    python3 scripts/trace-logo.py path/to/logo.png

Writes public/images/logo-mark.svg, logo-wordmark.svg and logo-stacked.svg.
"""

import sys
from pathlib import Path

import numpy as np
import potrace
from PIL import Image

# Sampled from the supplied artwork — see README, "Brand and artwork".
BRAND = {
    'blue': (0x0D, 0x92, 0xB8),
    'green': (0x7A, 0xBC, 0x8D),
    'teal': (0x43, 0xA4, 0xA4),
    'charcoal': (0x24, 0x24, 0x24),
}
WHITE = (255, 255, 255)

# Bands measured from the supplied artwork: the mark, then the two words.
BANDS = {
    'mark': (650, 1295),
    'welborn': (1325, 1430),
    'orthopedics': (1460, 1506),
}


def nearest(pixels: np.ndarray, palette: list) -> np.ndarray:
    """Index of the closest palette colour for every pixel, killing antialiasing."""
    ref = np.array(palette, dtype=int)
    d = ((pixels[:, :, None, :] - ref[None, None, :, :]) ** 2).sum(axis=3)
    return d.argmin(axis=2)


def path_data(mask: np.ndarray, x0: int, y0: int) -> str:
    """Trace a boolean mask and return SVG path data in cropped coordinates.

    potracer reads a bitmap the way potrace reads a scan: values above the
    black level are paper, values below are ink. A True/False mask is therefore
    inverted before tracing, or every shape comes out as its own silhouette.
    """
    path = potrace.Bitmap(~mask).trace(turdsize=2, alphamax=1.0, opticurve=True,
                                       opttolerance=0.2)
    out = []
    for curve in path:
        s = curve.start_point
        out.append(f'M{s.x - x0:.2f} {s.y - y0:.2f}')
        for seg in curve:
            e = seg.end_point
            if seg.is_corner:
                c = seg.c
                out.append(f'L{c.x - x0:.2f} {c.y - y0:.2f}L{e.x - x0:.2f} {e.y - y0:.2f}')
            else:
                a, b = seg.c1, seg.c2
                out.append(
                    f'C{a.x - x0:.2f} {a.y - y0:.2f} {b.x - x0:.2f} {b.y - y0:.2f}'
                    f' {e.x - x0:.2f} {e.y - y0:.2f}'
                )
        out.append('Z')
    return ''.join(out)


def trace(img: np.ndarray, y_from: int, y_to: int, colours: list):
    """Trace one horizontal band, returning (paths, width, height)."""
    band = img[y_from:y_to + 1]
    palette = [WHITE] + [BRAND[c] for c in colours]
    idx = nearest(band, palette)
    ink = idx > 0
    cols = np.where(ink.any(axis=0))[0]
    rows = np.where(ink.any(axis=1))[0]
    x0, x1 = int(cols.min()), int(cols.max())
    r0, r1 = int(rows.min()), int(rows.max())

    paths = []
    for i, name in enumerate(colours, start=1):
        mask = (idx == i)[r0:r1 + 1, x0:x1 + 1]
        if not mask.any():
            continue
        paths.append((name, path_data(mask, 0, 0)))
    return paths, x1 - x0 + 1, r1 - r0 + 1


def svg(paths, w, h, title, extra=''):
    body = '\n'.join(
        f'  <path fill="{"#%02X%02X%02X" % BRAND[name]}" d="{d}"/>' for name, d in paths
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img" aria-label="{title}">\n'
        f'  <title>{title}</title>\n{extra}{body}\n</svg>\n'
    )


def main() -> None:
    src = Path(sys.argv[1] if len(sys.argv) > 1 else 'logo.png')
    out_dir = Path(__file__).resolve().parent.parent / 'public' / 'images'
    img = np.array(Image.open(src).convert('RGB')).astype(int)

    mark, mw, mh = trace(img, *BANDS['mark'], ['blue', 'green', 'teal'])
    (out_dir / 'logo-mark.svg').write_text(
        svg(mark, mw, mh, 'Welborn Orthopedics')
    )
    print(f'logo-mark.svg        {mw} x {mh}')

    # The two words are traced separately, then stacked so the wordmark keeps
    # the spacing of the supplied lockup.
    wel, ww, wh = trace(img, *BANDS['welborn'], ['blue'])
    ort, ow, oh = trace(img, *BANDS['orthopedics'], ['charcoal'])
    gap = BANDS['orthopedics'][0] - BANDS['welborn'][1]
    total_h = wh + gap + oh
    ox = (ww - ow) / 2
    word = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ww} {total_h}" '
        f'width="{ww}" height="{total_h}" role="img" aria-label="Welborn Orthopedics">\n'
        f'  <title>Welborn Orthopedics</title>\n'
        + '\n'.join(f'  <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in wel)
        + f'\n  <g transform="translate({ox:.2f} {wh + gap})">\n'
        + '\n'.join(f'    <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in ort)
        + '\n  </g>\n</svg>\n'
    )
    (out_dir / 'logo-wordmark.svg').write_text(word)
    print(f'logo-wordmark.svg    {ww} x {total_h}')

    # Horizontal lockup for the site header, where the supplied stacked
    # lockup would be far too tall. The mark keeps its size and the wordmark
    # is set beside it at 62% of the mark's height — close to the ratio the
    # stacked lockup uses, so the two read as the same logo.
    mark_h = 100.0
    mark_w = mw / mh * mark_h
    word_h = mark_h * 0.62
    word_w = ww / total_h * word_h
    gap_x = mark_w * 0.26
    hw = mark_w + gap_x + word_w
    horizontal = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {hw:.1f} {mark_h:.0f}" '
        f'width="{hw:.1f}" height="{mark_h:.0f}" role="img" aria-label="Welborn Orthopedics">\n'
        f'  <title>Welborn Orthopedics</title>\n'
        f'  <g transform="scale({mark_h / mh:.5f})">\n'
        + '\n'.join(f'    <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in mark)
        + f'\n  </g>\n'
        f'  <g transform="translate({mark_w + gap_x:.2f} {(mark_h - word_h) / 2:.2f}) '
        f'scale({word_h / total_h:.5f})">\n'
        + '\n'.join(f'    <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in wel)
        + f'\n    <g transform="translate({ox:.2f} {wh + gap})">\n'
        + '\n'.join(f'      <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in ort)
        + '\n    </g>\n  </g>\n</svg>\n'
    )
    (out_dir / 'logo-horizontal.svg').write_text(horizontal)
    print(f'logo-horizontal.svg  {hw:.0f} x {mark_h:.0f}')

    # Full stacked lockup, laid out with the proportions of the original.
    mark_gap = BANDS['welborn'][0] - BANDS['mark'][1]
    total = mh + mark_gap + total_h
    width = max(mw, ww)
    stacked = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {total}" '
        f'width="{width}" height="{total}" role="img" aria-label="Welborn Orthopedics">\n'
        f'  <title>Welborn Orthopedics</title>\n'
        f'  <g transform="translate({(width - mw) / 2:.2f} 0)">\n'
        + '\n'.join(f'    <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in mark)
        + f'\n  </g>\n  <g transform="translate({(width - ww) / 2:.2f} {mh + mark_gap})">\n'
        + '\n'.join(f'    <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in wel)
        + f'\n    <g transform="translate({ox:.2f} {wh + gap})">\n'
        + '\n'.join(f'      <path fill="{"#%02X%02X%02X" % BRAND[n]}" d="{d}"/>' for n, d in ort)
        + '\n    </g>\n  </g>\n</svg>\n'
    )
    (out_dir / 'logo-stacked.svg').write_text(stacked)
    print(f'logo-stacked.svg     {width} x {total}')


if __name__ == '__main__':
    main()
