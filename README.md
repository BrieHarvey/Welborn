# Welborn Orthopedics — Website

The website for Welborn Orthopedics, the private orthopaedic surgery practice of
John Hearst Welborn, MD, in Pinole, California.

Built with [Astro](https://astro.build). It compiles to plain HTML, CSS and a
very small amount of JavaScript, so it loads quickly and is inexpensive to host.
There is no database, no CMS and no login to maintain — the words on the site
live in a handful of clearly-labelled text files.

---

## Where to change things

Most updates only require editing one file. **You do not need to touch anything
in `src/components/` or `src/layouts/` to change words, phone numbers or
photographs.**

| I want to change…                                       | Edit this file                     |
| ------------------------------------------------------- | ---------------------------------- |
| Phone, fax, email, address, office locations, office hours | `src/data/site.js`              |
| Where appointment requests are emailed                   | `src/data/site.js` (`appointmentInbox`) |
| Navigation links and the "Request an Appointment" button | `src/data/site.js`                 |
| Homepage headline, about text, call-to-action wording    | `src/data/content.js`              |
| Credentials strip under the hero ("30 Years of Experience"…) | `src/data/content.js`          |
| Conditions and procedures, and their individual pages    | `src/data/conditions.js`           |
| New patient forms, insurance plans, FAQs                 | `src/data/patient-resources.js`    |
| Training, certification, hospital affiliations           | `src/data/about.js`                |
| Privacy policy wording                                   | `src/pages/privacy-policy.astro`   |
| Colours, fonts, spacing                                  | `src/styles/global.css` (the `:root` block at the top) |
| The logo                                                 | `public/images/logo-*.svg` (see “Brand and artwork”) |

Each of those files is commented. Change the text between the quotation marks
and leave the punctuation around it alone.

> **A note on the homepage copy.** The hero headline, the credentials strip and
> the "board-certified orthopaedic surgeon" section were written by the practice
> and are reproduced word for word. Please confirm with the practice before
> rewording them.

### Editing without installing anything

You can edit these files directly on GitHub in a browser:

1. Open the file on github.com and click the pencil (**Edit**) icon.
2. Make your change.
3. Click **Commit changes**.

Cloudflare Pages rebuilds and publishes the site automatically, usually within a
minute or two.

---

## Local development

You need [Node.js](https://nodejs.org) version 20 or newer (this project is
tested on Node 22).

```bash
npm install     # once, to download the build tools
npm run dev     # start a local preview at http://localhost:4321
```

The site reloads in the browser as you save changes. Press `Ctrl + C` to stop.

```bash
npm run build   # produce the finished site in dist/
npm run preview # serve the built site locally, to check it before deploying
```

> The appointment form does **not** send email in local development —
> `/api/appointment` only exists once the site is running on Cloudflare Pages.
> To test the form end to end, use `npx wrangler pages dev dist` after building,
> or test it on the deployed preview URL.

---

## Deploying to Cloudflare Pages

The site is designed to deploy straight from GitHub with no extra steps.

**One-time setup**

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages →
   Connect to Git**, and choose this repository.
2. Use these build settings:

   | Setting                | Value           |
   | ---------------------- | --------------- |
   | Framework preset       | Astro           |
   | Build command          | `npm run build` |
   | Build output directory | `dist`          |
   | Root directory         | *(leave blank)* |

3. Under **Environment variables**, add `NODE_VERSION` = `22`.
4. Click **Save and Deploy**.

**After that**, every push to the `main` branch rebuilds and republishes the
site automatically. Pull requests get their own preview URL, so changes can be
reviewed before they go live.

**Custom domain** — in the Pages project, open **Custom domains → Set up a
custom domain** and add `welbornortho.com` (and `www.welbornortho.com`).
Cloudflare issues the HTTPS certificate automatically.

---

## Appointment form

A purely static website cannot send email on its own — something has to receive
the submission. This project ships with a small Cloudflare Pages Function at
`functions/api/appointment.js` that does it. It deploys with the site; there is
no separate server to run or pay for.

### Where requests are delivered

The inbox is `appointmentInbox` in `src/data/site.js`:

```js
export const appointmentInbox = 'welbornappointments@gmail.com';
```

Change that line and redeploy. Several addresses work too — separate them with
commas. This address is only ever used server-side; it is never printed on the
website. The address patients see is `practice.email`, near the top of the same
file.

### The one thing that must be set in Cloudflare

**The form still cannot send anything until an API key is added.** In the
Cloudflare Pages project, under **Settings → Environment variables**, add:

| Variable         | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY` | An API key from [resend.com](https://resend.com) (the free tier is enough) |
| `NOTIFY_EMAIL`   | *(optional)* overrides `appointmentInbox` — useful for pointing a staging deploy at a different inbox |
| `MAIL_FROM`      | *(optional)* the "from" address. Defaults to `website@welbornortho.com` |

**A Gmail address can receive requests but cannot send them.** Resend — like
every other mail service — will only send *from* a domain you have verified,
which is what keeps the messages out of spam folders. So `MAIL_FROM` has to be
something like `website@welbornortho.com`, and `welbornortho.com` has to be
verified in the Resend dashboard by adding a few DNS records; their setup page
walks through it. The delivery address is unaffected by any of this — Gmail,
Outlook or anything else is fine on the receiving end.

**Until `RESEND_API_KEY` is set**, the form does not pretend to work: it tells
the visitor that online requests are not enabled yet and asks them to call the
office. It never shows a confirmation for a message that went nowhere.

**Prefer a hosted form service instead?** Set `formEndpoint` in
`src/data/site.js` to a Formspree or Web3Forms endpoint and the form posts there
instead. The Pages Function is then unused and can be deleted.

### What the form deliberately does not do

The form is a scheduling convenience, not a patient portal. It is **not
HIPAA-compliant**, and the site says so plainly on the contact page, in the
consent checkbox and in the privacy policy. Do not remove that language unless
the implementation genuinely changes — for example by moving to a
business-associate-agreement-backed intake service.

The form also carries a visible notice that it is not monitored for medical
emergencies, and directs emergencies to 911.

---

## Swapping in photography

**There are no photographs on the site yet, and the hero is built for one.**
The large image area on the right of the homepage hero — and the matching one
on the About page — is a `PhotoFrame`. While it has no photograph it shows the
practice artwork with the logo on it. That stand-in is presentable enough to go
live with, but it is a stand-in: the composition is designed around a real
photograph of Dr. Welborn and improves markedly with one.

What to shoot, in priority order:

| Slot | Where it appears | Suggested size | Orientation |
| ---- | ---------------- | -------------- | ----------- |
| Dr. Welborn with a patient, or an environmental portrait in the office | homepage hero | 1200 × 1500 | Portrait |
| Portrait of Dr. Welborn | homepage about section, About page | 1200 × 1500 | Portrait |

To add one:

1. Save it into `public/images/` — for example `dr-welborn-portrait.jpg`.
2. Add `src` to the `<PhotoFrame>` tag on the page:

   ```astro
   <PhotoFrame
     src="/images/dr-welborn-portrait.jpg"
     alt="Dr. J. Hearst Welborn, MD in the Pinole office"
     caption="John Hearst Welborn, MD"
     captionSub="Orthopaedic Surgery"
     ratio="4 / 5"
   />
   ```

The stand-in disappears and the photograph takes its place, cropped to the
frame and lazily loaded. Nothing else changes.

Export as JPEG at around 75–80% quality and keep each file under roughly 300 KB.
The frame crops to fill, so leave a little room around the subject — on tablet
the same frame switches to a landscape crop.

Each `<PhotoFrame>` also carries a `note` describing the photograph intended for
that slot. It is never shown to visitors; it is written into the page source as
an HTML comment for whoever adds the photography later.

**One layout note if you reuse `PhotoFrame` elsewhere:** it draws a soft brand
glow that deliberately extends past the frame, so the section containing it
needs `overflow-x: clip` — otherwise the glow widens the page and the whole
document scrolls sideways.

---

## Brand and artwork

**The logo.** The practice supplied the logo as a 2000 x 2000 PNG: the mark —
a medical cross split blue and green, with a spine curving through it — above
the words WELBORN / ORTHOPEDICS.

A website needs that logo crisp in a 32px browser tab and on a 5K display, and
it needs a version that fits a sticky header, which the tall stacked lockup does
not. So each flat colour region of the supplied artwork is traced to a vector
path, and four SVGs are generated from it:

| File                    | What it is                       | Used by                          |
| ----------------------- | -------------------------------- | -------------------------------- |
| `logo-horizontal.svg`   | mark beside the words            | site header, footer, social card |
| `logo-stacked.svg`      | the supplied lockup              | anywhere with vertical room      |
| `logo-mark.svg`         | the mark alone                   | favicon, touch icon, watermark   |
| `logo-wordmark.svg`     | the words alone                  | spare                            |

They all live in `public/images/` and are produced by:

```bash
pip install pillow numpy potracer
python3 scripts/trace-logo.py path/to/logo.png
```

**If the practice can supply the original vector artwork** (`.ai`, `.eps` or
`.svg` from whoever designed the logo), prefer it: export the four files above
from it, drop them in `public/images/`, and delete `scripts/trace-logo.py`. A
trace of a raster is very close but it is still a trace.

**Two things to know when placing the logo.** The mark is drawn with white gaps
between the spine and the cross, so it cannot sit directly on a dark background
— the spine runs into the cross and the shape is lost. `Logo.astro` handles this
with `tone="tile"`, which sets the logo on a white tile; that keeps the brand
colours exact instead of flattening the logo to one colour. And the logo carries
its own typeface, which is not the typeface of the site. That is normal: a
logo is artwork, not text.

**Colour.** Three colours, sampled from the supplied artwork:

| Token           | Value     | Contrast on white | Use                                   |
| --------------- | --------- | ----------------- | ------------------------------------- |
| `--brand-blue`  | `#0d92b8` | 3.6:1             | graphics, borders, large type         |
| `--brand-green` | `#7abc8d` | 2.2:1             | graphics only                         |
| `--brand-teal`  | `#43a4a4` | 3.0:1             | graphics only                         |

None of them are used for body text or links, and that is deliberate. The logo
blue reaches 3.6:1 against white — fine for a border or a big heading, short of
the 4.5:1 that WCAG 2.1 AA asks of ordinary text. Small text and links use
`--accent` (`#0a6e8a`, 5.8:1), which is the same blue taken down until it is
safe to read. Buttons and dark bands follow the same rule. The result looks like
the logo without becoming hard to read.

The green appears in exactly two places in the interface — the dots in the
credentials strip and the artwork — and nowhere else. Used more than that it
stops reading as a brand colour and starts reading as decoration.

Every colour on the site is defined in the `:root` block at the top of
`src/styles/global.css`, with its contrast ratio in a comment beside it. If you
change one, re-check the ratio.

**The artwork.** Three SVGs in `public/images/`, drawn from the same sweeping
arc geometry, in the brand's colours:

| File                    | Where it is used                                     |
| ----------------------- | ---------------------------------------------------- |
| `art-arcs-wide.svg`     | hero brand panel, call-to-action band, social card    |
| `art-arcs-portrait.svg` | the portrait slots where Dr. Welborn's photo will go  |
| `art-arcs-light.svg`    | behind interior page headings (`HeroArt.astro`)       |

They are vector, so they stay sharp at any size and never date the way stock
photography does. They are decorative: each is marked `aria-hidden` or given an
empty `alt`, so screen readers skip them.

---

## Adding a condition or procedure page

Open `src/data/conditions.js`, copy an existing block, and change the details:

```js
{
  slug: 'tennis-elbow',        // becomes /conditions/tennis-elbow
  type: 'condition',           // 'condition' → /conditions/…   'treatment' → /treatments/…
  region: 'shoulder',          // must match a region id at the top of the file
  title: 'Tennis Elbow',
  cardSummary: 'One sentence for the card on the overview page.',
  metaTitle: 'Tennis Elbow Treatment | Pinole & East Bay',
  metaDescription: 'One or two sentences shown in Google results.',
  intro: 'An opening paragraph.',
  sections: [
    { heading: 'Common symptoms', items: ['…', '…'] },
    { heading: 'How it is evaluated', body: '…' },
  ],
}
```

That is all. The next build creates the page, adds it to the overview page and
to the sitemap, and generates its search-engine metadata. Deleting a block
removes the page just as cleanly.

---

## Publishing the new patient forms

The four forms listed on the Patient Resources page currently show "At the
office" rather than a download link, because no PDFs have been supplied yet.

To publish one, save the PDF into `public/forms/` and set its `file` value in
`src/data/patient-resources.js`:

```js
{
  name: 'New Patient Registration',
  description: 'Contact details, insurance information and responsible party.',
  file: '/forms/new-patient-registration.pdf',
},
```

The entry turns into a download link automatically.

---

## Typeface

The site is set in **Schibsted Grotesk**, served from `public/fonts/` rather
than from Google Fonts — so there is no third-party request, nothing to break if
an outside service changes, and no visitor data sent elsewhere. A single
variable font file covers every weight used on the site.

It is licensed under the [SIL Open Font License 1.1](https://openfontlicense.org),
which permits this use; the licence text ships alongside the font at
`public/fonts/schibsted-grotesk-OFL.txt` and must stay there.

**Three weights, and only three.** Because it is a variable font, any value
between 400 and 900 renders. That is a trap: 600 next to 650 does not read as
emphasis, it reads as a second typeface on the same page. The site uses 400 for
body copy, 500 for labels and small UI, and 600 for headings and buttons — the
`--weight-regular` / `--weight-medium` / `--weight-semibold` tokens in
`src/styles/global.css`. If something needs more presence, change its size or
colour rather than adding a fourth weight.

The logo's wordmark is a different typeface, drawn into the logo artwork
itself. That is deliberate and normal — a logo is a picture of a name, not text
set in the page font — and it means the logo does not depend on any font being
available.

To change the typeface, replace the `.woff2` file and update the `@font-face`
block at the top of `src/styles/global.css` along with the `--font-sans` token.
The second `@font-face` in that file is a metrics-matched stand-in built from a
system font: its numbers were measured against Schibsted Grotesk so that text
occupies exactly the same space before the real font loads, which keeps the page
from reflowing. If you swap the typeface, those numbers need re-measuring or the
block should simply be removed.

---

## Changing the domain

The site URL appears in one place: the `SITE_URL` constant at the top of
`astro.config.mjs`. It drives canonical links, the sitemap and social sharing
tags. If the domain changes, also update the `Sitemap:` line in
`public/robots.txt`.

---

## Regenerating the social image

`public/og-image.png` is the card shown when the site is shared on social media
or in a text message. Its source is `scripts/og-image.html` — edit that file,
then re-render it:

```bash
python3 scripts/render.py scripts/og-image.html public/og-image.png 1200 630
python3 scripts/render.py scripts/apple-touch-icon.html public/apple-touch-icon.png 180 180
```

`scripts/render.py` needs Pillow (`pip install pillow`) and a Chromium binary.
It renders taller than asked and crops, because headless Chromium counts
browser chrome in `--window-size` and otherwise hands back an image with a band
of empty page along the bottom edge.

---

## What is already handled

**Search engines.** Every page has its own title, meta description and canonical
URL. The site publishes a sitemap (`/sitemap-index.xml`), a `robots.txt`, Open
Graph tags for link previews, and structured data describing the practice, the
physician, each condition page, the breadcrumb trail and the FAQ. URLs follow a
readable pattern (`/conditions/carpal-tunnel`, `/treatments/knee-replacement`)
that leaves room for the library to grow.

**Accessibility.** Semantic HTML, a skip link, visible focus rings, labelled
form fields with inline error messages, keyboard-operable navigation, colour
contrast that meets WCAG 2.1 AA, and full respect for the operating system's
"reduce motion" setting.

**Performance.** No icon library, no CSS framework, no analytics, and nothing
loaded from a third-party domain. One self-hosted font file (47 KB, preloaded)
covers every weight on the site. The only JavaScript is the mobile menu, the
scroll reveal, the map loader and the form — a few kilobytes in total. Images
are lazily loaded, and the map on the contact page is not requested from Google
until a visitor asks for it.

---

## Please do not invent

This is a medical website, and several kinds of content carry real professional
and legal weight. Never add any of the following unless the practice has
confirmed it:

- Patient testimonials or reviews
- Awards, honours or rankings
- Board certifications, medical school, residency or fellowship details
- Hospital affiliations and professional memberships
- Procedure counts, success rates or patient outcomes
- Insurance plans the office does not actually participate in
- Research or publications

`src/data/about.js` exists precisely for this: the training and credentials
section stays hidden until real, verified details are entered, so there is never
a placeholder pretending to be a credential.

---

## Project structure

```
├── astro.config.mjs           Site URL and build configuration
├── functions/
│   └── api/appointment.js     Receives the appointment form (Cloudflare Pages Function)
├── public/                    Files served as-is
│   ├── favicon.svg            Browser tab icon
│   ├── og-image.png           Social sharing card
│   ├── robots.txt             Search engine instructions
│   ├── _headers               Security and caching headers
│   ├── _redirects             Short URLs (/insurance, /faq, /appointment)
│   ├── fonts/                 Self-hosted typeface and its licence
│   ├── forms/                 New patient PDFs go here
│   └── images/                Logo files and brand artwork; photographs too
├── scripts/                   Logo tracing, generated images, render.py
└── src/
    ├── data/                  ← ALL EDITABLE CONTENT LIVES HERE
    │   ├── site.js            Practice details, locations, navigation
    │   ├── content.js         Homepage copy
    │   ├── conditions.js      Conditions and procedures
    │   ├── patient-resources.js  Forms, insurance, FAQs
    │   └── about.js           Approach to care, training and credentials
    ├── components/            Reusable pieces (nav, buttons, cards, form, footer)
    ├── layouts/
    │   └── BaseLayout.astro   Page shell: metadata, structured data, header, footer
    ├── pages/                 One file per URL
    │   ├── index.astro                    /
    │   ├── about.astro                    /about
    │   ├── conditions-treatments.astro    /conditions-treatments
    │   ├── patient-resources.astro        /patient-resources
    │   ├── contact.astro                  /contact
    │   ├── privacy-policy.astro           /privacy-policy
    │   ├── 404.astro                      not-found page
    │   ├── conditions/[slug].astro        /conditions/…
    │   └── treatments/[slug].astro        /treatments/…
    └── styles/
        └── global.css         The design system
```
