#!/usr/bin/env python3
"""
Bundle the built site into a single self-contained HTML file.

This exists so the site can be looked at from one link before it is deployed —
useful for sharing a draft with the practice for sign-off. It is a preview, not
the real website: it reproduces every page and the navigation between them, but
the appointment form and the Google map only work on the deployed site.

    npm run build && python3 scripts/build-preview.py

Writes preview/welborn-preview.html
"""

import base64
import pathlib
import re

DIST = pathlib.Path('dist')
OUT = pathlib.Path('preview/welborn-preview.html')

PAGES = (
    ['/', '/about', '/conditions-treatments', '/patient-resources', '/contact', '/privacy-policy']
    + [f'/conditions/{p.stem}' for p in sorted((DIST / 'conditions').glob('*.html'))]
    + [f'/treatments/{p.stem}' for p in sorted((DIST / 'treatments').glob('*.html'))]
)


def page_file(route: str) -> pathlib.Path:
    return DIST / ('index.html' if route == '/' else route.lstrip('/') + '.html')


def strip_tags(html: str, tag: str) -> str:
    return re.sub(rf'<{tag}\b[^>]*>.*?</{tag}>', '', html, flags=re.S)


# --- Stylesheets -----------------------------------------------------------
# global.css (the file carrying the :root tokens) has to come first so that
# everything after it can override rather than be overridden.
css_files = sorted(DIST.glob('_astro/*.css'))
css_files.sort(key=lambda p: ':root{--bg' not in p.read_text())
css = '\n'.join(p.read_text() for p in css_files)

# The Artifact sandbox blocks every external request, so the typeface travels
# with the page rather than being fetched.
font_b64 = base64.b64encode((DIST / 'fonts/schibsted-grotesk-variable.woff2').read_bytes()).decode()
css = css.replace(
    "url(/fonts/schibsted-grotesk-variable.woff2)",
    f"url(data:font/woff2;base64,{font_b64})",
).replace(
    "url('/fonts/schibsted-grotesk-variable.woff2')",
    f"url('data:font/woff2;base64,{font_b64}')",
)

# --- Images ----------------------------------------------------------------
# The brand artwork is referenced by URL on the real site. A single-file preview
# has nowhere to fetch it from, so each SVG travels inside the page.


def inline_images(html: str) -> str:
    for svg in sorted((DIST / 'images').glob('*.svg')):
        data = base64.b64encode(svg.read_bytes()).decode()
        html = html.replace(f'/images/{svg.name}', f'data:image/svg+xml;base64,{data}')
    return html


# --- Page bodies -----------------------------------------------------------
templates = []
titles = {}
for route in PAGES:
    html = inline_images(page_file(route).read_text())

    title = re.search(r'<title>(.*?)</title>', html, re.S)
    titles[route] = title.group(1).strip() if title else 'Welborn Orthopedics'

    body = re.search(r'<body[^>]*>(.*)</body>', html, re.S).group(1)
    body = strip_tags(body, 'script')  # re-implemented by the router below
    body = strip_tags(body, 'astro-island')

    # Inline <style> blocks were already collected from the stylesheets above.
    inline_styles = re.findall(r'<style>(.*?)</style>', html, re.S)
    for block in inline_styles:
        if block not in css:
            css += '\n' + block
    body = strip_tags(body, 'style')

    templates.append(f'<template data-route="{route}">{body}</template>')

TEMPLATES = '\n'.join(templates)
TITLES = ',\n      '.join(f'{route!r}: {titles[route]!r}' for route in PAGES)

OUT.parent.mkdir(exist_ok=True)
OUT.write_text(f'''<title>Welborn Orthopedics</title>
<style>
{css}

/* ---- Preview banner (not part of the real site) ---- */
.preview-bar {{
  background: var(--accent-dark);
  color: rgba(255, 255, 255, 0.72);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  line-height: 1.5;
  padding: 0.7rem var(--gutter);
}}
.preview-bar__inner {{
  max-width: var(--width-page);
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
}}
.preview-bar b {{
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.6875rem;
}}
.preview-note {{
  margin-top: 1rem;
  padding: 0.9rem 1.1rem;
  background: var(--bg-tint);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
  font-size: var(--step-small);
  line-height: 1.6;
  color: var(--ink-2);
}}
</style>

<div class="preview-bar">
  <div class="preview-bar__inner">
    <b>Preview</b>
    <span>All {len(PAGES)} pages of the Welborn Orthopedics site. The links and menus work. The appointment form and the map only work once the site is deployed.</span>
  </div>
</div>

<div id="app"></div>

{TEMPLATES}

<script>
  const app = document.getElementById('app');
  const titles = {{
      {TITLES}
  }};

  const routeOf = (path) => (document.querySelector(`template[data-route="${{path}}"]`) ? path : '/');

  function reveal(scope) {{
    const targets = scope.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {{
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }}
    const io = new IntersectionObserver((entries) => {{
      entries.forEach((entry) => {{
        if (entry.isIntersecting) {{
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }}
      }});
    }}, {{ rootMargin: '0px 0px -10% 0px', threshold: 0 }});
    targets.forEach((el) => io.observe(el));
    setTimeout(() => targets.forEach((el) => {{
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
    }}), 1200);
  }}

  function wireMenu(scope) {{
    const toggle = scope.querySelector('[data-menu-toggle]');
    const menu = scope.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;
    const setOpen = (open) => {{
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    }};
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => {{ if (e.target.closest('a')) setOpen(false); }});
    document.addEventListener('keydown', (e) => {{ if (e.key === 'Escape') setOpen(false); }});
  }}

  function wireHeader(scope) {{
    const header = scope.querySelector('[data-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, {{ passive: true }});
  }}

  /* The map and the form need the deployed site — say so rather than
     letting a visitor click something that quietly does nothing. */
  function wireDisabledBits(scope) {{
    const mapButton = scope.querySelector('[data-map-load]');
    if (mapButton) {{
      mapButton.addEventListener('click', () => {{
        const prompt = mapButton.closest('.map__prompt');
        prompt.innerHTML = '<p class="map__prompt-text">The interactive Google map is switched off in this preview. It loads normally on the deployed site.</p>';
      }});
    }}

    const form = scope.querySelector('[data-appointment-form]');
    if (form) {{
      const note = document.createElement('p');
      note.className = 'preview-note';
      note.textContent = 'Preview note: the form below is fully laid out and its checks work, but it cannot send anything from this preview. It delivers to the office once the site is deployed and the email settings are added.';
      form.parentNode.insertBefore(note, form);
      form.addEventListener('submit', (e) => {{
        e.preventDefault();
        const status = form.querySelector('[data-status]');
        status.dataset.state = 'error';
        status.textContent = 'This is a preview, so nothing was sent. On the live site this reaches the office.';
      }}, true);
    }}
  }}

  function render(path, push) {{
    const route = routeOf(path);
    const tpl = document.querySelector(`template[data-route="${{route}}"]`);
    app.replaceChildren(tpl.content.cloneNode(true));
    document.title = titles[route] || 'Welborn Orthopedics';
    if (push) history.pushState({{ route }}, '', '#' + route);
    wireMenu(app);
    wireHeader(app);
    wireDisabledBits(app);
    reveal(app);
    return route;
  }}

  document.addEventListener('click', (event) => {{
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';

    if (href.startsWith('#')) {{
      event.preventDefault();
      const target = app.querySelector(href.replace(/^#/, '#'));
      if (target) target.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
      return;
    }}
    if (!href.startsWith('/') || href.startsWith('//')) return;  // tel:, mailto:, external

    event.preventDefault();
    const [path, hash] = href.split('#');
    render(path, true);
    if (hash) {{
      const target = app.querySelector('#' + hash);
      if (target) {{ target.scrollIntoView(); return; }}
    }}
    window.scrollTo(0, 0);
  }});

  window.addEventListener('popstate', () => render((location.hash || '#/').slice(1), false));

  render((location.hash || '#/').slice(1), false);
</script>
''')

print(f'wrote {OUT}  ({OUT.stat().st_size / 1024:.0f} KB, {len(PAGES)} pages)')
