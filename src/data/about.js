// ===========================================================================
//  ABOUT PAGE — professional background
// ===========================================================================
//  IMPORTANT: everything in this file is optional and starts empty on purpose.
//
//  Medical school, residency, fellowship, board certification, hospital
//  affiliations and professional memberships must never be guessed at or
//  filled in with plausible-sounding text. Each block below only appears on
//  the website once real, verified details have been entered here — an empty
//  list simply hides its section.
//
//  To publish a section, add items to its `items` list, e.g.
//
//    { label: 'Residency', value: 'Orthopaedic Surgery, Example University' }
//
// ===========================================================================

export const background = {
  eyebrow: 'Background',
  headline: 'Training & credentials',
  // Shown above the lists once any of them contain entries.
  intro: '',
  groups: [
    {
      heading: 'Education & training',
      // e.g. { label: 'Medical school', value: '...' }
      items: [],
    },
    {
      heading: 'Certification',
      items: [],
    },
    {
      heading: 'Hospital affiliations',
      items: [],
    },
    {
      heading: 'Professional memberships',
      items: [],
    },
  ],
};

/** True when at least one group has entries — the page uses this to decide
 *  whether to render the credentials section at all. */
export const hasBackground = background.groups.some((group) => group.items.length > 0);

// ---------------------------------------------------------------------------
//  APPROACH TO CARE  — safe to edit freely
// ---------------------------------------------------------------------------

export const approach = {
  eyebrow: 'Approach to care',
  headline: 'Unhurried conversation, then a clear plan.',
  intro:
    'An orthopaedic problem is rarely just a diagnosis. It is a job you cannot do, a night of interrupted sleep, a sport you have stopped playing. Understanding that context is part of choosing the right treatment.',
  points: [
    {
      title: 'An accurate diagnosis first',
      body: 'Treatment follows from knowing precisely which structure is causing the problem. That begins with history and examination, supported by imaging when it will change the plan — not as a substitute for the examination.',
    },
    {
      title: 'Non-surgical options taken seriously',
      body: 'Most orthopaedic conditions are managed without an operation. Therapy, activity modification, bracing, medication and injections are genuine treatments, not delays before the real one.',
    },
    {
      title: 'Surgery discussed, not assumed',
      body: 'When an operation is worth considering, it is presented as one option among several, with its risks, its recovery and its alternatives explained plainly enough to make a decision you are comfortable with.',
    },
    {
      title: 'The same surgeon throughout',
      body: 'The physician who evaluates you performs your procedure and follows your recovery. Continuity is the point of a private practice.',
    },
  ],
};
