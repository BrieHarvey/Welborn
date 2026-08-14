// ===========================================================================
//  PATIENT RESOURCES  —  forms, insurance and frequently asked questions
// ===========================================================================
//  Each of the three sections below is independent. Edit the text between the
//  quotation marks, add or remove items from the lists, and the page updates.
// ===========================================================================

// ---------------------------------------------------------------------------
//  1. NEW PATIENT FORMS
// ---------------------------------------------------------------------------
//  To publish a downloadable form: put the PDF in the `public/forms/` folder
//  and set `file` to its path, e.g. file: '/forms/new-patient-registration.pdf'
//
//  While `file` is empty, the form is listed but shown as "available at the
//  office" rather than as a broken download link.
// ---------------------------------------------------------------------------

export const forms = {
  eyebrow: 'New patient forms',
  headline: 'Save time at your first visit.',
  intro:
    'Completing your paperwork in advance means more of your appointment is spent with Dr. Welborn. Bring the completed forms with you, or arrive about fifteen minutes early to fill them out in the office.',
  items: [
    {
      name: 'New Patient Registration',
      description: 'Contact details, insurance information and responsible party.',
      file: '',
    },
    {
      name: 'Medical History',
      description: 'Current medications, allergies, prior surgery and medical conditions.',
      file: '',
    },
    {
      name: 'Notice of Privacy Practices Acknowledgement',
      description: 'Confirms you have received the practice’s privacy notice.',
      file: '',
    },
    {
      name: 'Authorization to Release Medical Records',
      description: 'Allows records or imaging to be requested from another provider.',
      file: '',
    },
  ],
  fallbackNote:
    'Downloadable versions of these forms are being prepared. In the meantime, please call the office and we will email them to you, or arrive fifteen minutes early and complete them at your visit.',
  bring: {
    heading: 'What to bring to your first appointment',
    items: [
      'Photo identification and your insurance card',
      'A list of your current medications and dosages',
      'Any imaging on disc, along with the radiology reports',
      'Records or notes from other physicians you have seen for this problem',
      'Your referral or authorization, if your plan requires one',
      'A written list of your questions',
    ],
  },
};

// ---------------------------------------------------------------------------
//  2. INSURANCE
// ---------------------------------------------------------------------------
//  IMPORTANT: only list plans the office has confirmed it participates in.
//  Remove any plan that is no longer accepted.
// ---------------------------------------------------------------------------

export const insurance = {
  eyebrow: 'Insurance',
  headline: 'Covered by most Bay Area plans.',
  intro:
    'Our office works with the majority of commercial and Medicare networks in the East Bay. The quickest way to confirm your coverage is to call the office with your insurance card ready.',
  plans: [
    'Sutter Health',
    'Hill Physicians Medical Group',
    'Blue Shield of California',
    'Anthem Blue Cross',
    'Aetna',
    'Cigna',
    'United Healthcare',
    'Medicare',
  ],
  ctaLabel: 'Confirm your coverage',
  disclaimer:
    'Plan participation varies by product and employer. Please confirm when you book.',
  workersComp: {
    heading: 'Workers’ compensation',
    body: 'Work-related injuries are accepted. Please have your claim number, the name of your claims adjuster and your employer’s information available when you call, along with any authorization your carrier has issued.',
  },
};

// ---------------------------------------------------------------------------
//  3. FREQUENTLY ASKED QUESTIONS
// ---------------------------------------------------------------------------
//  These also generate FAQ structured data for search engines, so keep the
//  answers accurate. To add a question, copy one block.
// ---------------------------------------------------------------------------

export const faqs = {
  eyebrow: 'Questions',
  headline: 'Frequently asked questions',
  items: [
    {
      q: 'Do I need a referral to be seen?',
      a: 'Whether a referral is required depends on your insurance plan rather than on the practice. HMO plans commonly require a referral or authorization from your primary care physician, while most PPO plans do not. If you are not sure, call the office with your insurance card and we can help you check before you book.',
    },
    {
      q: 'What happens at a first appointment?',
      a: 'Your visit begins with a conversation about your symptoms, how the problem started and how it affects your daily activities, followed by a physical examination. X-rays are frequently taken at the visit. Dr. Welborn will explain what he finds and outline the options, which very often begin with non-surgical treatment.',
    },
    {
      q: 'Will surgery be recommended at my first visit?',
      a: 'Usually not. Most orthopaedic problems are treated without surgery, and the first visit is generally about reaching an accurate diagnosis and starting appropriate non-surgical care. When surgery is worth considering, it is discussed as one option among several, with time to ask questions before any decision is made.',
    },
    {
      q: 'Will I see Dr. Welborn at every visit?',
      a: 'Yes. This is a private practice, and patients are seen by Dr. Welborn rather than being rotated between different providers. The surgeon who evaluates you is the surgeon who performs your procedure and follows your recovery.',
    },
    {
      q: 'Do you accept my insurance?',
      a: 'The office participates with most major commercial and Medicare networks in the East Bay, and the plans currently accepted are listed above. Because participation varies by specific product and by employer group, please call with your card in hand so your coverage can be verified before your appointment.',
    },
    {
      q: 'Do you treat work-related injuries?',
      a: 'Yes. Workers’ compensation injuries are accepted. Have your claim number, adjuster contact information and employer details ready when you call, along with any authorization your carrier has already issued.',
    },
    {
      q: 'How do I get my imaging and records to the office?',
      a: 'Bring imaging on a disc together with the written radiology report whenever possible, since the report alone is not a substitute for the images. If your imaging was performed elsewhere and you cannot obtain a copy, call the office ahead of your appointment and we will let you know what is needed to request it.',
    },
    {
      q: 'How do I request a prescription refill, form or letter?',
      a: 'Call the office during business hours. Requests for refills, work or school notes, disability paperwork and letters are handled during office hours and generally need a few business days, so please allow time rather than waiting until a deadline.',
    },
    {
      q: 'What should I do about a problem after surgery?',
      a: 'Call the office. For anything urgent outside of office hours — including chest pain, shortness of breath, a fever, a wound that is opening or draining, or a limb that becomes numb, cold or severely swollen — seek emergency care immediately or call 911. Do not use the website form to report an urgent problem.',
    },
    {
      q: 'Is there an office in Vallejo?',
      a: 'Dr. Welborn sees patients in Vallejo by appointment. Please call the office for location details and availability when you schedule.',
    },
  ],
};
