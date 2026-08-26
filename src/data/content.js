// ===========================================================================
//  WEBSITE COPY
// ===========================================================================
//  All of the words that appear on the homepage and the shared call-to-action
//  section live here, separated from the page layout code. Editing the text
//  between the quotation marks changes the website. Nothing else needs to
//  be touched.
//
//  NOTE: The hero, credibility strip and about copy below were supplied by the
//  practice and are reproduced word for word. Please do not reword them
//  without the practice's approval.
// ===========================================================================

export const hero = {
  headline: 'Restoring Movement. Relieving Pain. Improving Lives.',
  subhead:
    'From diagnosis through treatment and recovery, we’re committed to getting you back to the activities and life you love.',
  primaryButton: { label: 'Request an Appointment', href: '/contact#request-an-appointment' },
  secondaryButton: { label: 'About Dr. Welborn', href: '/about' },
  // Describes the intended photograph. Used as the alt text once a real
  // photograph replaces the placeholder — see README, "Swapping in photography".
  imageAlt:
    'Dr. J. Hearst Welborn meeting with a patient in the Pinole office consultation room',
};

// ---------------------------------------------------------------------------
//  CREDIBILITY STRIP  (directly beneath the hero)
// ---------------------------------------------------------------------------

//  The practice supplied these four lines:
//
//      Board-Certified Orthopaedic Surgeon
//      30 Years of Experience
//      4000 surgeries performed
//      Most insurance & workers' comp accepted
//
//  They are unchanged below — only the typesetting differs. The two that lead
//  with a number are split so the number can be set large with its wording
//  beneath it; the two that are statements are shown as statements. Nothing is
//  added to the claims: "30+" matches the practice's own "more than 30 years"
//  in the about copy, and the surgery count is printed exactly as given.

export const credentials = {
  /* Set as large numerals. `figure` is the number, `label` its wording. */
  figures: [
    { figure: '30+', label: 'Years of experience' },
    { figure: '4,000', label: 'Surgeries performed' },
  ],
  /* Set as statements, at reading size. */
  statements: ['Board-Certified Orthopaedic Surgeon', "Most insurance & workers' comp accepted"],
};

// ---------------------------------------------------------------------------
//  HOMEPAGE ABOUT SECTION
// ---------------------------------------------------------------------------

export const about = {
  eyebrow: 'Meet your surgeon',
  headline: 'board-certified orthopaedic surgeon',
  paragraphs: [
    'Dr. John Hearst Welborn, MD is a private practice orthopaedic surgeon with more than 30 years of experience.',
    'He treats a broad range of musculoskeletal conditions, from carpal tunnel syndrome and trigger finger to fractures, rotator cuff injuries, and conditions requiring joint replacement. His surgical experience spans fracture and ligament repair, minimally invasive arthroscopic procedures, and total joint replacement.',
    'Patients often come to an orthopaedic surgeon at a difficult moment—after an injury, while living with pain, or when facing an important decision about surgery. The road to recovery can be challenging, and having the right surgeon by your side can make a meaningful difference.',
    'Dr. Welborn believes exceptional care begins with time and communication. He emphasizes meaningful face-to-face interaction before and after surgery, giving patients the opportunity to ask questions, understand their treatment options, and feel supported throughout their treatment and recovery.',
  ],
  // The link shown at the end of the homepage about section. The hero already
  // offers "About Dr. Welborn", so this one carries the reader forward into the
  // conditions he treats. To point it somewhere else, change both lines.
  link: { label: 'See the conditions Dr. Welborn treats', href: '/conditions-treatments' },
  imageAlt: 'Portrait of Dr. J. Hearst Welborn, MD, orthopaedic surgeon',
};

// ---------------------------------------------------------------------------
//  CONTINUITY OF CARE  (the practice's key differentiator)
// ---------------------------------------------------------------------------

export const continuity = {
  eyebrow: 'One surgeon, start to finish',
  headline: 'You see Dr. Welborn — every visit.',
  body: 'In a private practice, care is not handed off between a rotating group of providers. The surgeon who evaluates your injury is the surgeon who performs your procedure and the surgeon who follows your recovery.',
  points: [
    {
      title: 'Evaluated by your surgeon',
      body: 'Your first appointment is with Dr. Welborn, not a rotating member of a care team.',
    },
    {
      title: 'Time to ask questions',
      body: 'Face-to-face conversation before and after surgery, so you understand your options and what comes next.',
    },
    {
      title: 'Followed through recovery',
      body: 'The same physician who performed your procedure oversees your follow-up care.',
    },
  ],
};

// ---------------------------------------------------------------------------
//  APPOINTMENT CALL-TO-ACTION  (reused across several pages)
// ---------------------------------------------------------------------------

export const appointmentCta = {
  headline: 'Ready to Take the Next Step?',
  body: "Whether you're dealing with a new injury, chronic pain, or considering orthopedic treatment, we're here to help you understand your options.",
  primaryButton: { label: 'Request an Appointment', href: '/contact#request-an-appointment' },
  secondaryButton: { label: 'Contact the Office', href: '/contact' },
};
