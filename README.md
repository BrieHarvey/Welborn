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
| Navigation links and the "Request an Appointment" button | `src/data/site.js`                 |
| Homepage headline, about text, call-to-action wording    | `src/data/content.js`              |
| Credentials strip under the hero ("30 Years of Experience"…) | `src/data/content.js`          |
| Conditions and procedures, and their individual pages    | `src/data/conditions.js`           |
| New patient forms, insurance plans, FAQs                 | `src/data/patient-resources.js`    |
| Training, certification, hospital affiliations           | `src/data/about.js`                |
| Privacy policy wording                                   | `src/pages/privacy-policy.astro`   |
| Colours, fonts, spacing                                  | `src/styles/global.css` (the `:root` block at the top) |

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

**It needs two environment variables before it can send anything.** In the
Cloudflare Pages project, under **Settings → Environment variables**, add:

| Variable         | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY` | An API key from [resend.com](https://resend.com) (free tier is sufficient) |
| `NOTIFY_EMAIL`   | Where requests should arrive, e.g. `office@welbornortho.com`    |
| `MAIL_FROM`      | *(optional)* the "from" address, on a domain verified in Resend. Defaults to `website@welbornortho.com` |

Resend requires you to verify the sending domain — this is what stops the
messages landing in spam. Their dashboard walks through adding the DNS records.

**Until those variables are set**, the form does not pretend to work: it tells
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

Every photograph on the site is currently a clearly-marked placeholder that
describes the image intended for that slot.

To replace one:

1. Save the photograph into `public/images/` (for example
   `public/images/dr-welborn-portrait.jpg`).
2. Find the `<Figure ... />` tag for that slot and add a `src`:

   ```astro
   <Figure
     src="/images/dr-welborn-portrait.jpg"
     alt="Dr. J. Hearst Welborn, MD in the Pinole office"
     ratio="4 / 5"
   />
   ```

The placeholder disappears and the photograph is served in its place, lazily
loaded and correctly sized. The `alt` text should describe what is in the
photograph — it is read aloud by screen readers and used by search engines.

Photographs to source, in priority order:

| Slot                | Where it appears           | Suggested size | Orientation |
| ------------------- | -------------------------- | -------------- | ----------- |
| Hero photograph     | `src/pages/index.astro`    | 1600 × 1200    | Landscape   |
| Portrait of Dr. Welborn | `src/pages/index.astro`, `src/pages/about.astro` | 1200 × 1500 | Portrait |

Export as JPEG at around 75–80% quality and keep each file under roughly 300 KB.

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

## Changing the domain

The site URL appears in one place: the `SITE_URL` constant at the top of
`astro.config.mjs`. It drives canonical links, the sitemap and social sharing
tags. If the domain changes, also update the `Sitemap:` line in
`public/robots.txt`.

---

## Regenerating the social image

`public/og-image.png` is the card shown when the site is shared on social media
or in a text message. Its source is `scripts/og-image.html` — edit that file,
then re-render it with any headless browser, for example:

```bash
chromium --headless --screenshot=public/og-image.png --window-size=1200,630 \
  scripts/og-image.html
```

`scripts/apple-touch-icon.html` produces `public/apple-touch-icon.png` the same
way, at 180 × 180.

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

**Performance.** No web fonts, no icon library, no CSS framework, no analytics.
The only JavaScript is the mobile menu, the scroll reveal, the map loader and
the form — a few kilobytes in total. Images are lazily loaded and the map on the
contact page is not requested from Google until a visitor asks for it.

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
│   ├── forms/                 New patient PDFs go here
│   └── images/                Photographs go here
├── scripts/                   Sources for the generated images
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
