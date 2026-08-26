/**
 * POST /api/appointment
 * ---------------------------------------------------------------------------
 * Receives the appointment request form and emails it to the office.
 *
 * This is a Cloudflare Pages Function. It deploys automatically with the site —
 * there is no separate server to run.
 *
 * Requests are delivered to `appointmentInbox` in src/data/site.js. Change the
 * address there; nothing in this file needs editing.
 *
 * One environment variable must be set in the Cloudflare dashboard before
 * anything can actually be sent:
 *
 *   RESEND_API_KEY   an API key from resend.com
 *
 * Optional:
 *   NOTIFY_EMAIL     overrides `appointmentInbox` — handy for pointing a
 *                    staging deploy at a different inbox
 *   MAIL_FROM        the "from" address, which must be on a domain verified
 *                    with Resend. Defaults to website@welbornortho.com
 *
 * Until RESEND_API_KEY is set, the endpoint returns a clear message asking the
 * visitor to call the office. It never pretends to have delivered a message it
 * did not deliver.
 *
 * Full setup instructions are in the README under "Appointment form".
 * ---------------------------------------------------------------------------
 */

import { appointmentInbox } from '../../src/data/site.js';

const FIELDS = [
  ['firstName', 'First name', 80],
  ['lastName', 'Last name', 80],
  ['phone', 'Phone', 40],
  ['email', 'Email', 160],
  ['contactMethod', 'Preferred contact', 40],
  ['location', 'Preferred office', 80],
  ['reason', 'Reason for visit', 120],
  ['message', 'Message', 1000],
];

const REQUIRED = ['firstName', 'lastName', 'phone', 'email', 'contactMethod'];

const PHONE = '(510) 724-4600';
const PHONE_HREF = '+15107244600';

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );

const wantsJson = (request) =>
  (request.headers.get('accept') || '').includes('application/json');

/** JSON for the fetch-based submit, a plain HTML page for no-JavaScript posts. */
function respond(request, status, message, { ok = status < 400 } = {}) {
  if (wantsJson(request)) {
    return new Response(JSON.stringify({ ok, message }), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${ok ? 'Request sent' : 'Request not sent'} — Welborn Orthopedics</title>
<style>
  :root { color-scheme: light }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:2rem;
         background:#fbfaf8; color:#3d4954; line-height:1.7;
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif }
  .box { max-width:34rem; background:#fff; border:1px solid #e5e0d8; border-radius:14px; padding:2.5rem }
  h1 { margin:0 0 1rem; font-size:1.6rem; line-height:1.2; letter-spacing:-.02em; color:#14191f }
  p { margin:0 0 1rem }
  a.back { display:inline-block; margin-top:1rem; padding:.85rem 1.5rem; background:#33566b;
           color:#fff; border-radius:999px; text-decoration:none; font-weight:600; font-size:.95rem }
  a { color:#33566b }
</style>
</head>
<body>
  <main class="box">
    <h1>${ok ? 'Thank you — your request has been sent.' : 'Your request could not be sent.'}</h1>
    <p>${escapeHtml(message)}</p>
    ${ok ? '' : `<p>Please call the office at <a href="tel:${PHONE_HREF}">${PHONE}</a> and we will be glad to help.</p>`}
    <a class="back" href="/contact">Back to the contact page</a>
  </main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return respond(request, 400, 'The form could not be read. Please try again.');
  }

  // Spam trap: a real person never fills in a field they cannot see.
  if ((form.get('company') || '').toString().trim() !== '') {
    return respond(request, 200, 'Thank you — your request has been sent.');
  }

  const data = {};
  for (const [name, , max] of FIELDS) {
    data[name] = (form.get(name) || '').toString().trim().slice(0, max);
  }

  const missing = REQUIRED.filter((name) => !data[name]);
  if (missing.length > 0) {
    return respond(request, 400, 'Please complete every required field and try again.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return respond(request, 400, 'Please enter a valid email address.');
  }

  if ((form.get('acknowledged') || '').toString() !== 'yes') {
    return respond(
      request,
      400,
      'Please confirm you have read the note about what to send through this form.'
    );
  }

  const apiKey = env.RESEND_API_KEY;
  const notify = env.NOTIFY_EMAIL || appointmentInbox;

  // Honest failure: if delivery is not configured, say so rather than
  // showing a confirmation for a message that went nowhere.
  if (!apiKey || !notify) {
    return respond(
      request,
      503,
      `Online requests are not enabled yet, so this message was not delivered. Please call the office at ${PHONE}.`,
      { ok: false }
    );
  }

  const from = env.MAIL_FROM || 'website@welbornortho.com';
  const name = `${data.firstName} ${data.lastName}`;

  const lines = FIELDS.filter(([key]) => data[key]).map(
    ([key, label]) => `${label}: ${data[key]}`
  );
  lines.push(`Submitted: ${new Date().toUTCString()}`);

  const text = `New appointment request from the website\n\n${lines.join('\n')}\n`;
  const html = `<h2 style="font:600 18px system-ui,sans-serif;color:#14191f">New appointment request</h2>
<table style="font:14px/1.6 system-ui,sans-serif;color:#3d4954;border-collapse:collapse">
${FIELDS.filter(([key]) => data[key])
  .map(
    ([key, label]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#5c6874;vertical-align:top">${label}</td><td style="padding:6px 0"><strong>${escapeHtml(
        data[key]
      )}</strong></td></tr>`
  )
  .join('\n')}
<tr><td style="padding:6px 16px 6px 0;color:#5c6874">Submitted</td><td style="padding:6px 0">${escapeHtml(
    new Date().toUTCString()
  )}</td></tr>
</table>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: `Welborn Orthopedics Website <${from}>`,
        to: notify.split(',').map((address) => address.trim()),
        reply_to: data.email,
        subject: `Appointment request — ${name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error('Resend error', response.status, await response.text());
      return respond(
        request,
        502,
        'Your request could not be delivered just now.',
        { ok: false }
      );
    }
  } catch (error) {
    console.error('Resend request failed', error);
    return respond(request, 502, 'Your request could not be delivered just now.', {
      ok: false,
    });
  }

  return respond(
    request,
    200,
    'Thank you — your request has been sent. The office will contact you during regular business hours.'
  );
}

/** This endpoint only accepts POST — everything else gets a clear answer. */
const methodNotAllowed = () =>
  new Response('Method Not Allowed', {
    status: 405,
    headers: { allow: 'POST, OPTIONS' },
  });

export const onRequestGet = methodNotAllowed;
export const onRequestPut = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;

export const onRequestOptions = () =>
  new Response(null, { status: 204, headers: { allow: 'POST, OPTIONS' } });
