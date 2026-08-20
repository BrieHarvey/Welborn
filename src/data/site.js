// ===========================================================================
//  PRACTICE INFORMATION  —  START HERE
// ===========================================================================
//  This is the main file to edit when practice details change.
//  Everything below appears throughout the website (header, footer, contact
//  page, structured data for Google, etc.). Change it once here and it updates
//  everywhere on the site.
//
//  Keep the quotation marks and the commas exactly where they are.
// ===========================================================================

export const practice = {
  name: 'Welborn Orthopedics',
  doctor: {
    // Formal name, used in structured data and the footer.
    fullName: 'John Hearst Welborn, MD',
    // Shorter name used in headings and navigation.
    shortName: 'Dr. J. Hearst Welborn',
    lastNameOnly: 'Dr. Welborn',
    specialty: 'Orthopaedic Surgery',
  },
  phone: '(510) 724-4600',
  // Digits only — used for click-to-call links on mobile. Keep the +1.
  phoneHref: '+15107244600',
  fax: '(510) 964-0607',
  email: 'office@welbornortho.com',
};

// ---------------------------------------------------------------------------
//  OFFICE LOCATIONS
// ---------------------------------------------------------------------------
//  `primary: true` marks the office used for structured data and the map.
//  To add a location, copy one block and change the details.
// ---------------------------------------------------------------------------

export const locations = [
  {
    id: 'pinole',
    primary: true,
    name: 'Pinole Office',
    street: '1700 San Pablo Avenue, Suite F',
    city: 'Pinole',
    state: 'CA',
    zip: '94564',
    phone: practice.phone,
    phoneHref: practice.phoneHref,
    fax: practice.fax,
    email: practice.email,
    note: '',
    // Used for the "Get directions" links and the map.
    mapQuery: '1700 San Pablo Avenue Suite F, Pinole, CA 94564',
    showMap: true,
  },
];

export const primaryLocation = locations.find((l) => l.primary) ?? locations[0];

/** "Pinole, CA 94564" — built as one string so spacing is always correct. */
export const cityLine = (location) =>
  [location.city, [location.state, location.zip].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ');

/** "1700 San Pablo Avenue, Suite F, Pinole, CA 94564" */
export const fullAddress = (location) =>
  [location.street, cityLine(location)].filter(Boolean).join(', ');

// ---------------------------------------------------------------------------
//  OFFICE HOURS
// ---------------------------------------------------------------------------
//  Set `verified: false` to hide the hours block everywhere on the site until
//  real hours are confirmed. Set it to true once the days/times below are
//  correct — never publish hours that have not been checked with the office.
// ---------------------------------------------------------------------------

export const officeHours = {
  verified: false,
  note: 'Please call the office for current hours.',
  days: [
    { label: 'Monday – Thursday', hours: '' },
    { label: 'Friday', hours: '' },
    { label: 'Saturday – Sunday', hours: 'Closed' },
  ],
};

// ---------------------------------------------------------------------------
//  NAVIGATION
// ---------------------------------------------------------------------------

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About Dr. Welborn', href: '/about' },
  { label: 'Conditions & Treatments', href: '/conditions-treatments' },
  { label: 'Patient Resources', href: '/patient-resources' },
  { label: 'Contact', href: '/contact' },
];

export const primaryCta = {
  label: 'Request an Appointment',
  href: '/contact#request-an-appointment',
};

// ---------------------------------------------------------------------------
//  APPOINTMENT FORM DELIVERY
// ---------------------------------------------------------------------------
//  A static website cannot email a form on its own — something has to receive
//  the submission. Two supported options, explained fully in the README:
//
//  1. LEAVE THIS AS IS ("/api/appointment"). The form posts to the Cloudflare
//     Pages Function included in this repo at `functions/api/appointment.js`.
//     Add RESEND_API_KEY and NOTIFY_EMAIL in the Cloudflare Pages dashboard and
//     requests are emailed to the office. Until those are set, the form tells
//     the visitor to call the office instead of silently losing the message.
//
//  2. Paste a form-service endpoint here instead (Formspree, Web3Forms, etc.)
//     e.g. formEndpoint: 'https://formspree.io/f/xxxxxxxx'
// ---------------------------------------------------------------------------

export const formEndpoint = '/api/appointment';

// ---------------------------------------------------------------------------
//  LEGAL / FOOTER
// ---------------------------------------------------------------------------

export const legal = {
  established: 2026,
  disclaimer:
    'The information provided on this website is for general educational purposes only and is not a substitute for individualized medical advice, diagnosis, or treatment. Reading this website does not create a physician–patient relationship. Always seek the advice of your physician or another qualified health provider with any questions you may have about a medical condition, and never disregard professional medical advice or delay seeking it because of something you have read here.',
  emergency:
    'If you are experiencing a medical emergency, call 911 or go to the nearest emergency room.',
};
