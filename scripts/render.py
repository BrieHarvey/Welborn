#!/usr/bin/env python3
"""Render an HTML file to a PNG of an exact size using headless Chromium.

Chromium's --window-size counts browser chrome, so the visible viewport comes
out CHROME_OFFSET pixels shorter than asked. Render taller, then crop.

  python3 scripts/render.py scripts/og-image.html public/og-image.png 1200 630
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image

CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
CHROME_OFFSET = 83


def render(src: Path, out: Path, width: int, height: int) -> None:
    subprocess.run(
        [
            CHROME, '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
            '--force-prefers-reduced-motion', '--allow-file-access-from-files',
            '--virtual-time-budget=8000', f'--window-size={width},{height + CHROME_OFFSET}',
            f'--screenshot={out}', str(src.resolve().as_uri()),
        ],
        capture_output=True,
        check=True,
    )
    with Image.open(out) as img:
        img.crop((0, 0, width, height)).save(out)


if __name__ == '__main__':
    src, out = Path(sys.argv[1]), Path(sys.argv[2])
    render(src, out, int(sys.argv[3]), int(sys.argv[4]))
    with Image.open(out) as img:
        print(f'{out} {img.size[0]}x{img.size[1]}')
