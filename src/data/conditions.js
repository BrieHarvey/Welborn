// ===========================================================================
//  CONDITIONS & TREATMENTS
// ===========================================================================
//  This one file builds three things at once:
//
//    1. The grouped list on /conditions-treatments
//    2. A dedicated page for every entry below
//    3. The sitemap entry and search-engine metadata for each of those pages
//
//  Entries with  type: 'condition'  become  /conditions/<slug>
//  Entries with  type: 'treatment'  become  /treatments/<slug>
//
//  TO ADD A NEW CONDITION OR PROCEDURE: copy an existing block, change the
//  details, and give it a `region` that matches one of the region ids below.
//  The new page is created automatically the next time the site builds.
//
//  All copy here is general patient education. It is deliberately conservative:
//  no outcome statistics, no success rates, no promises. Every page also
//  carries the site-wide medical disclaimer.
// ===========================================================================

export const regions = [
  {
    id: 'hand-wrist',
    name: 'Hand & Wrist',
    blurb:
      'Conditions affecting the small joints, tendons and nerves that make the hand work — from nerve compression to fractures.',
  },
  {
    id: 'shoulder',
    name: 'Shoulder',
    blurb:
      'Rotator cuff, instability and stiffness problems, evaluated with examination and imaging before treatment is recommended.',
  },
  {
    id: 'knee-hip',
    name: 'Knee & Hip',
    blurb:
      'Arthritis, cartilage and ligament conditions of the large weight-bearing joints, including joint replacement evaluation.',
  },
  {
    id: 'fracture-injury',
    name: 'Fracture & Injury Care',
    blurb:
      'Evaluation and treatment of broken bones and acute injuries, along with second opinions on recommended surgery.',
  },
];

export const entries = [
  // -------------------------------------------------------------------------
  //  HAND & WRIST
  // -------------------------------------------------------------------------
  {
    slug: 'carpal-tunnel',
    type: 'condition',
    region: 'hand-wrist',
    title: 'Carpal Tunnel Syndrome',
    cardSummary:
      'Numbness, tingling and night pain in the hand caused by pressure on the median nerve at the wrist.',
    metaTitle: 'Carpal Tunnel Syndrome Treatment | Pinole & East Bay',
    metaDescription:
      'Carpal tunnel syndrome evaluation and treatment in Pinole, CA. Learn about symptoms, nerve testing, splinting, injections and carpal tunnel release surgery.',
    intro:
      'Carpal tunnel syndrome occurs when the median nerve is compressed as it passes through a narrow channel on the palm side of the wrist. It is one of the most common conditions treated in hand surgery, and symptoms usually begin gradually before becoming difficult to ignore.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Numbness or tingling in the thumb, index, middle and part of the ring finger',
          'Pain or burning that wakes you during the night',
          'Dropping objects, or a sense of clumsiness in the hand',
          'Weakened grip or pinch strength',
          'Symptoms brought on by driving, typing or holding a phone',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'An evaluation begins with a conversation about your symptoms and a physical examination of the hand, wrist and neck, since nerve compression elsewhere can produce similar symptoms. Nerve conduction studies or electromyography may be ordered to measure how well the median nerve is working, and imaging is sometimes used to look for other causes.',
      },
      {
        heading: 'Treatment options',
        body: 'Many patients improve without surgery. When symptoms persist, when nerve testing shows significant compression, or when there is muscle weakness, carpal tunnel release may be discussed — a procedure that relieves pressure on the nerve by dividing the transverse carpal ligament.',
        items: [
          'Night splinting to keep the wrist in a neutral position',
          'Activity modification and workstation adjustments',
          'Anti-inflammatory medication',
          'Corticosteroid injection into the carpal tunnel',
          'Carpal tunnel release surgery',
        ],
      },
    ],
  },
  {
    slug: 'trigger-finger',
    type: 'condition',
    region: 'hand-wrist',
    title: 'Trigger Finger',
    cardSummary:
      'A finger or thumb that catches, clicks or locks because a flexor tendon no longer glides freely.',
    metaTitle: 'Trigger Finger Treatment | Pinole & East Bay',
    metaDescription:
      'Trigger finger care in Pinole, CA. Understand why fingers catch or lock, and the range of treatment from splinting and injection to trigger finger release.',
    intro:
      'Trigger finger — stenosing tenosynovitis — develops when a flexor tendon in the finger or thumb no longer glides smoothly through the sheath surrounding it. The finger may catch, click, or lock in a bent position before snapping straight.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Catching, clicking or locking when bending or straightening the finger',
          'A tender nodule at the base of the finger, in the palm',
          'Stiffness that is worst first thing in the morning',
          'Pain at the base of the affected finger or thumb',
          'A finger that becomes stuck bent and has to be straightened with the other hand',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'Trigger finger is usually diagnosed through history and examination, and imaging is rarely needed. The examination also considers associated conditions such as diabetes and inflammatory arthritis, which can make triggering more likely and more likely to recur.',
      },
      {
        heading: 'Treatment options',
        body: 'Mild cases often settle with non-surgical measures. If triggering returns after injection, or the finger remains locked, a trigger finger release opens the constricted portion of the sheath so the tendon can glide freely. It is an outpatient procedure.',
        items: [
          'Splinting and activity modification',
          'Anti-inflammatory medication',
          'Corticosteroid injection into the tendon sheath',
          'Trigger finger release surgery',
        ],
      },
    ],
  },
  {
    slug: 'tendon-and-nerve-injuries',
    type: 'condition',
    region: 'hand-wrist',
    title: 'Tendon & Nerve Injuries',
    cardSummary:
      'Cuts and crush injuries of the hand and forearm that divide tendons or nerves, where early evaluation matters.',
    metaTitle: 'Hand Tendon & Nerve Injury Treatment | Pinole & East Bay',
    metaDescription:
      'Evaluation and repair of tendon and nerve injuries of the hand, wrist and forearm in Pinole, CA. Why prompt assessment after a laceration matters.',
    intro:
      'Cuts, crush injuries and deep lacerations of the hand and forearm can divide tendons or nerves. Because these structures sit close to the skin, an injury that looks minor on the surface can involve important structures underneath. Repair is generally more straightforward when it is performed early.',
    sections: [
      {
        heading: 'Signs that a tendon or nerve may be involved',
        items: [
          'Inability to bend or straighten a finger after a cut',
          'Numbness in part of a finger following an injury',
          'Loss of pinch or grip strength',
          'A wound over the palm, wrist or forearm',
          'Pain or weakness when movement is resisted',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'The examination tests each tendon individually and maps sensation in each nerve distribution to identify precisely what has been injured. X-rays are often taken to look for a fracture or a retained fragment of glass or metal within the wound.',
      },
      {
        heading: 'Treatment options',
        body: 'Some partial injuries are treated with splinting and a protected therapy program. A completely divided tendon or nerve usually requires surgical repair, followed by structured hand therapy that protects the repair while gradually restoring motion. The therapy phase is as important to the outcome as the procedure itself.',
      },
    ],
  },
  {
    slug: 'dupuytrens-contracture',
    type: 'condition',
    region: 'hand-wrist',
    title: "Dupuytren's Contracture",
    cardSummary:
      'Thickened cords in the palm that gradually pull one or more fingers toward the palm.',
    metaTitle: "Dupuytren's Contracture Treatment | Pinole & East Bay",
    metaDescription:
      "Dupuytren's contracture evaluation in Pinole, CA. Learn how palm nodules and cords develop, when treatment is recommended, and the available options.",
    intro:
      "Dupuytren's contracture is a slowly progressive thickening of the fascia, the connective tissue layer just beneath the skin of the palm. Firm cords can form and gradually pull one or more fingers toward the palm. The ring and small fingers are most often affected.",
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Firm nodules or dimpling in the palm',
          'Cords that can be felt beneath the skin',
          'Fingers that no longer straighten fully',
          'Difficulty laying the hand flat on a table',
          'Trouble with gloves, pockets, washing the face or shaking hands',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'Diagnosis is made by examination. The degree of contracture at each joint is measured and recorded so that progression can be tracked over time — an important part of deciding whether and when to treat.',
      },
      {
        heading: 'Treatment options',
        body: 'Early nodules without contracture are often simply monitored, since treatment is directed at loss of function rather than at the presence of a nodule. When a contracture interferes with hand use, several approaches may be considered. Hand therapy and night splinting are commonly part of recovery.',
        items: [
          'Observation and periodic measurement',
          'Needle aponeurotomy',
          'Enzyme injection to weaken the cord',
          'Surgical fasciectomy to remove the diseased tissue',
        ],
      },
    ],
  },
  {
    slug: 'ganglion-cysts',
    type: 'condition',
    region: 'hand-wrist',
    title: 'Ganglion Cysts',
    cardSummary:
      'Benign fluid-filled lumps arising from a joint or tendon sheath, most often on the back of the wrist.',
    metaTitle: 'Ganglion Cyst Treatment | Pinole & East Bay',
    metaDescription:
      'Ganglion cyst evaluation in Pinole, CA. What these wrist and hand lumps are, when they need treatment, and the options including aspiration and excision.',
    intro:
      'A ganglion cyst is a fluid-filled sac that arises from a joint capsule or a tendon sheath, most often on the back of the wrist. Ganglion cysts are benign. They may change in size over time, and some disappear without any treatment at all.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'A smooth, firm lump near a joint, usually at the wrist',
          'A lump that changes size with activity',
          'Aching or a sense of pressure',
          'Discomfort when the wrist is bent back',
          'Occasionally tingling, if the cyst presses on a nearby nerve',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'Most ganglion cysts are diagnosed by examination alone. Ultrasound or MRI is used occasionally when the diagnosis is unclear or the lump is in an unusual location, mainly to confirm that it is a cyst rather than something else.',
      },
      {
        heading: 'Treatment options',
        body: 'Many ganglion cysts need nothing more than reassurance and observation. Aspiration with a needle can decompress a cyst, although cysts commonly return afterward. Surgical excision removes the cyst together with its stalk and its connection to the joint, and is generally reserved for cysts that are painful, limit function, or recur after aspiration.',
      },
    ],
  },
  {
    slug: 'wrist-fractures',
    type: 'condition',
    region: 'hand-wrist',
    title: 'Wrist Fractures',
    cardSummary:
      'Breaks at the end of the forearm or in the small carpal bones, commonly after a fall onto an outstretched hand.',
    metaTitle: 'Wrist Fracture Treatment | Pinole & East Bay',
    metaDescription:
      'Wrist fracture care in Pinole, CA, including distal radius and scaphoid fractures. Casting, reduction and surgical fixation explained for patients.',
    intro:
      'A distal radius fracture — a break at the end of the forearm bone near the wrist — is one of the most common fractures, often the result of a fall onto an outstretched hand. Fractures of the scaphoid and other small carpal bones also occur, and some are subtle enough to be missed on the first set of X-rays.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Immediate pain and swelling after a fall',
          'Visible deformity or a bent appearance at the wrist',
          'Bruising and tenderness',
          'Pain with any attempt to move the wrist',
          'Numbness in the fingers',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'X-rays in several views confirm the fracture and show how the fragments sit. CT is used for complex fractures and for those that extend into the joint surface. When a scaphoid fracture is suspected but not visible initially, the wrist may be splinted and imaging repeated, because these fractures can be difficult to see early.',
      },
      {
        heading: 'Treatment options',
        body: 'Fractures in acceptable position may be treated with closed reduction and casting, with X-rays repeated over the following weeks to confirm the alignment holds. Displaced or unstable fractures, and those extending into the joint, may be treated surgically with plates, screws, pins or an external fixator. Restoring wrist motion and grip strength afterward typically involves a period of hand therapy.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  //  SHOULDER
  // -------------------------------------------------------------------------
  {
    slug: 'rotator-cuff',
    type: 'condition',
    region: 'shoulder',
    title: 'Rotator Cuff Conditions',
    cardSummary:
      'Impingement, tendon inflammation and partial or full-thickness tears of the tendons that lift and rotate the arm.',
    metaTitle: 'Rotator Cuff Treatment | Pinole & East Bay',
    metaDescription:
      'Rotator cuff tear and shoulder impingement treatment in Pinole, CA. Symptoms, imaging, physical therapy, injections and when repair is considered.',
    intro:
      'The rotator cuff is a group of four tendons that stabilize the shoulder and allow the arm to lift and rotate. Problems range from inflammation and impingement to partial tears and full-thickness tears. Some develop gradually with age and use; others happen suddenly with an injury.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Pain over the outside of the shoulder, often radiating toward the elbow',
          'Difficulty sleeping on the affected side',
          'Weakness lifting the arm overhead or reaching behind the back',
          'A catching or grinding sensation with movement',
          'Sudden loss of strength after a fall or a lifting injury',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'The examination tests each cuff tendon separately for strength and pain, which helps localize the problem. X-rays assess the bone and the space beneath the acromion, and MRI or ultrasound is used to determine whether a tendon is torn, how large the tear is, and the quality of the tissue.',
      },
      {
        heading: 'Treatment options',
        body: 'Many rotator cuff problems improve without surgery. Repair — often performed arthroscopically — may be considered for full-thickness tears, for acute tears in active patients, or when symptoms persist despite non-surgical care.',
        items: [
          'Physical therapy focused on the cuff and shoulder blade',
          'Activity modification',
          'Anti-inflammatory medication',
          'Corticosteroid injection',
          'Arthroscopic rotator cuff repair',
        ],
      },
      {
        heading: 'Related procedure',
        body: 'If a repair is being considered, the rotator cuff repair page explains what the procedure involves and what recovery looks like.',
        links: [{ label: 'Rotator cuff repair', href: '/treatments/rotator-cuff-repair' }],
      },
    ],
  },
  {
    slug: 'labral-injuries',
    type: 'condition',
    region: 'shoulder',
    title: 'Labral Injuries',
    cardSummary:
      'Tears of the cartilage rim that deepens the shoulder socket, often after a dislocation or repetitive overhead use.',
    metaTitle: 'Shoulder Labral Tear Treatment | Pinole & East Bay',
    metaDescription:
      'Shoulder labral tear evaluation in Pinole, CA, including SLAP and Bankart tears. Symptoms, MRI findings, rehabilitation and arthroscopic repair.',
    intro:
      'The labrum is a rim of cartilage that deepens the shoulder socket and helps hold the joint stable. Tears can follow a dislocation, a fall, or repetitive overhead activity, and are described by where they occur — including SLAP tears at the top of the socket and Bankart tears at the front.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Deep aching within the shoulder',
          'Catching, clicking or a sense of the shoulder slipping',
          'Pain with overhead motion',
          'A feeling of instability, or apprehension in certain positions',
          'Loss of throwing or overhead strength',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'Examination includes tests that reproduce symptoms by placing the shoulder in specific positions. X-rays check for bone injury associated with dislocation, and MRI — sometimes performed with contrast placed in the joint — is used to visualize the labrum itself.',
      },
      {
        heading: 'Treatment options',
        body: 'Rehabilitation that strengthens the stabilizing muscles around the shoulder blade and cuff, along with activity modification, is often the first step. Arthroscopic labral repair may be considered for recurrent instability, for dislocations that keep happening, or for symptoms that persist despite an appropriate rehabilitation program.',
      },
    ],
  },
  {
    slug: 'frozen-shoulder',
    type: 'condition',
    region: 'shoulder',
    title: 'Frozen Shoulder',
    cardSummary:
      'Adhesive capsulitis — a painful, progressive loss of shoulder motion that develops over months.',
    metaTitle: 'Frozen Shoulder (Adhesive Capsulitis) Treatment | Pinole',
    metaDescription:
      'Frozen shoulder treatment in Pinole, CA. Understand the freezing, frozen and thawing phases, stretching programs, injections and when release is considered.',
    intro:
      'Adhesive capsulitis — commonly called frozen shoulder — is a thickening and tightening of the shoulder capsule that causes pain and a progressive loss of motion. It typically moves through overlapping phases described as freezing, frozen and thawing, and it can last many months.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Deep, aching shoulder pain',
          'Progressive loss of motion in every direction',
          'Difficulty reaching overhead, behind the back, or across the body',
          'Pain that is worse at night',
          'Stiffness that interferes with dressing and grooming',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'The distinguishing finding is loss of both active and passive motion — the shoulder does not move further even when someone else moves it. X-rays are taken to rule out arthritis and other causes of stiffness, and MRI is used occasionally. Diabetes and thyroid disease are associated with frozen shoulder, so they form part of the evaluation.',
      },
      {
        heading: 'Treatment options',
        body: 'Most cases are managed without surgery, and patience is a genuine part of treatment. A structured stretching program, anti-inflammatory medication and corticosteroid injection are common first steps. Manipulation under anesthesia or arthroscopic capsular release may be considered when stiffness persists despite months of appropriate therapy.',
      },
    ],
  },
  {
    slug: 'shoulder-arthroscopy',
    type: 'treatment',
    region: 'shoulder',
    title: 'Shoulder Arthroscopy',
    cardSummary:
      'A minimally invasive procedure that lets the shoulder joint be inspected and treated through several small incisions.',
    metaTitle: 'Shoulder Arthroscopy | Pinole & East Bay',
    metaDescription:
      'Minimally invasive shoulder arthroscopy in Pinole, CA. What the procedure treats, what to expect on the day, and how recovery is structured.',
    intro:
      'Shoulder arthroscopy is a minimally invasive procedure performed through several small incisions using a camera and specialized instruments. It allows the inside of the joint to be inspected directly, and allows many problems to be treated without a large open incision.',
    sections: [
      {
        heading: 'What it can address',
        items: [
          'Rotator cuff repair',
          'Labral repair and shoulder stabilization',
          'Subacromial decompression',
          'Removal of loose bodies',
          'Biceps tendon procedures',
          'Capsular release for persistent stiffness',
        ],
      },
      {
        heading: 'What to expect',
        body: 'Shoulder arthroscopy is usually an outpatient procedure, meaning you go home the same day. Anesthesia commonly combines a regional nerve block with general anesthesia. Afterward, a sling is used for a period that depends on what was repaired, and physical therapy follows a schedule matched to the specific procedure — a simple decompression and a rotator cuff repair have very different timelines.',
      },
      {
        heading: 'Deciding whether it is right for you',
        body: 'Arthroscopy is a tool, not an automatic answer. Whether it is appropriate depends on your diagnosis, how much your symptoms limit you, and what has already been tried. Dr. Welborn reviews your examination findings and imaging with you and explains the alternatives, including continued non-surgical care.',
      },
    ],
  },
  {
    slug: 'rotator-cuff-repair',
    type: 'treatment',
    region: 'shoulder',
    title: 'Rotator Cuff Repair',
    cardSummary:
      'Reattaching a torn cuff tendon to the bone, most often arthroscopically, when non-surgical care has not been enough.',
    metaTitle: 'Rotator Cuff Repair Surgery | Pinole & East Bay',
    metaDescription:
      'Arthroscopic rotator cuff repair in Pinole, CA. How the procedure works, what recovery involves month by month, and what to consider before deciding.',
    intro:
      'Rotator cuff repair reattaches a torn tendon to the head of the humerus, most often arthroscopically using small anchors placed in the bone. It is considered when a tear is full-thickness, when a tear follows an acute injury in an active patient, or when pain and weakness persist despite non-surgical treatment.',
    sections: [
      {
        heading: 'How the procedure works',
        body: 'Through several small incisions, the torn tendon edge is identified, mobilized and brought back to its attachment site on the bone. Anchors with attached sutures secure it while the tendon heals to the bone. Other findings inside the joint — a biceps tendon problem or bone spurring, for example — are commonly addressed at the same time.',
      },
      {
        heading: 'Recovery at a glance',
        body: 'Recovery is a staged process measured in months rather than weeks, and following the schedule matters, because a tendon needs protected time to heal to bone.',
        items: [
          'A sling for a period determined by the size and quality of the tear',
          'Gentle passive motion first, guided by a therapist',
          'Active motion added as healing allows',
          'Strengthening introduced last',
          'Gradual return to activity over several months',
        ],
      },
      {
        heading: 'Before you decide',
        body: 'It is worth discussing the non-surgical alternatives, the factors that influence tendon healing — including tear size, tissue quality, smoking and diabetes — and a realistic timeline for your work and daily activities. The right decision depends on your tear, your goals and your circumstances.',
      },
    ],
  },
  {
    slug: 'shoulder-replacement-evaluation',
    type: 'treatment',
    region: 'shoulder',
    title: 'Shoulder Replacement Evaluation',
    cardSummary:
      'A focused visit to determine whether shoulder replacement is appropriate — and what the alternatives are.',
    metaTitle: 'Shoulder Replacement Evaluation | Pinole & East Bay',
    metaDescription:
      'Shoulder replacement evaluation in Pinole, CA. What the visit covers, how anatomic and reverse replacement differ, and questions worth bringing.',
    intro:
      'When shoulder arthritis or an irreparable rotator cuff tear causes pain and loss of function that non-surgical care no longer controls, shoulder replacement may become part of the conversation. An evaluation is a discussion, not a commitment — its purpose is to establish whether a replacement is appropriate and what the alternatives look like.',
    sections: [
      {
        heading: 'What the evaluation involves',
        items: [
          'A review of your symptoms and how they affect sleep, work and daily activities',
          'Examination of shoulder motion, strength and rotator cuff function',
          'X-rays, with CT or MRI added when bone or cuff detail is needed',
          'A discussion of how anatomic and reverse replacement differ, and which applies to your shoulder',
          'A review of the non-surgical options that remain available',
        ],
      },
      {
        heading: 'Questions worth bringing',
        items: [
          'How much are my symptoms limiting the things I actually want to do?',
          'What have I already tried, and for how long?',
          'What does recovery involve, week by week?',
          'What are the risks, and what are the alternatives?',
          'Is there an advantage to waiting, or to proceeding sooner?',
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  //  KNEE & HIP
  // -------------------------------------------------------------------------
  {
    slug: 'knee-arthritis',
    type: 'condition',
    region: 'knee-hip',
    title: 'Knee Arthritis',
    cardSummary:
      'Progressive cartilage wear causing pain with walking and stairs, stiffness and reduced walking distance.',
    metaTitle: 'Knee Arthritis Treatment | Pinole & East Bay',
    metaDescription:
      'Knee osteoarthritis treatment in Pinole, CA. Non-surgical care including therapy, bracing and injections, and when knee replacement is discussed.',
    intro:
      'Osteoarthritis of the knee develops as the smooth cartilage lining the joint wears thin, allowing bone surfaces to carry load they were not designed to carry. It usually progresses slowly, and symptoms tend to fluctuate rather than worsen in a straight line.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Deep aching pain with walking, stairs or prolonged standing',
          'Morning stiffness that loosens after moving around',
          'Swelling after activity',
          'Grinding, catching, or a feeling that the knee may give way',
          'A steadily shrinking comfortable walking distance',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'The examination assesses alignment, motion, stability, and whether fluid is present in the joint. Weight-bearing X-rays are important, because cartilage loss is best judged when the knee is carrying load. MRI is added when a mechanical problem such as a meniscus tear is suspected alongside the arthritis.',
      },
      {
        heading: 'Treatment options',
        body: 'Non-surgical treatment is the foundation, and for many patients it controls symptoms for years. When arthritis is advanced and pain limits daily life despite these measures, partial or total knee replacement may be discussed.',
        items: [
          'Activity modification and low-impact exercise',
          'Weight management, which reduces load across the joint',
          'A targeted strengthening program',
          'Bracing or an assistive device',
          'Anti-inflammatory medication',
          'Corticosteroid or hyaluronic acid injections',
        ],
      },
      {
        heading: 'Related procedure',
        links: [{ label: 'Knee replacement', href: '/treatments/knee-replacement' }],
      },
    ],
  },
  {
    slug: 'meniscus-injuries',
    type: 'condition',
    region: 'knee-hip',
    title: 'Meniscus Injuries',
    cardSummary:
      'Tears of the cartilage cushions in the knee, from twisting injuries in younger patients to degenerative tears later.',
    metaTitle: 'Meniscus Tear Treatment | Pinole & East Bay',
    metaDescription:
      'Meniscus tear evaluation in Pinole, CA. Symptoms, MRI findings, physical therapy, and when arthroscopic repair or trimming is appropriate.',
    intro:
      'The menisci are two C-shaped cartilage cushions that distribute load across the knee. Younger patients often tear a meniscus during a twisting injury. In older patients, tears frequently develop gradually as part of degenerative change, sometimes without any specific injury at all.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'Pain along the inside or outside joint line',
          'Swelling that develops over a day or two rather than immediately',
          'Catching, clicking or locking',
          'A sense that the knee gives way',
          'Pain with squatting, pivoting or twisting',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'Examination includes checking for joint line tenderness and specific tests that load the meniscus. X-rays assess how much arthritis is present, which strongly influences treatment. MRI confirms the tear and shows its pattern and location.',
      },
      {
        heading: 'Treatment options',
        body: 'Many tears settle with activity modification, physical therapy and anti-inflammatory medication — particularly degenerative tears in a knee that also has arthritis, where surgery is often not the answer. Arthroscopic surgery may be considered for a knee that is locked, for a tear that mechanically blocks motion, or for symptoms that persist. Depending on the tear pattern, its location and its blood supply, the meniscus may be repaired or the torn portion trimmed.',
      },
    ],
  },
  {
    slug: 'acl-injuries',
    type: 'condition',
    region: 'knee-hip',
    title: 'ACL Injuries',
    cardSummary:
      'Tears of the ligament that stabilizes the knee against pivoting, usually from a cutting or landing injury.',
    metaTitle: 'ACL Injury Treatment | Pinole & East Bay',
    metaDescription:
      'ACL tear evaluation in Pinole, CA. Symptoms, examination and MRI, rehabilitation, and how the decision about ACL reconstruction is made.',
    intro:
      'The anterior cruciate ligament stabilizes the knee against pivoting and against forward shifting of the shin bone. Tears usually happen during a cutting, landing or pivoting movement — often with a pop, rapid swelling, and a sense that the knee gave way.',
    sections: [
      {
        heading: 'Common symptoms',
        items: [
          'A pop felt or heard at the moment of injury',
          'Swelling that develops within hours',
          'Instability or buckling when turning',
          'Difficulty returning to pivoting sports',
          'Symptoms from associated meniscus or cartilage injury',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'Specific examination tests assess how far the tibia shifts forward relative to the femur. X-rays exclude fracture, and MRI confirms the tear while identifying the injuries that commonly accompany it — meniscus tears, cartilage damage and bone bruising.',
      },
      {
        heading: 'Treatment options',
        body: 'Initial care focuses on settling swelling and restoring motion, whatever the eventual plan. Some patients — particularly those whose activities involve less pivoting — do well with rehabilitation and activity modification. ACL reconstruction, which rebuilds the ligament using a graft, is often considered for patients who experience instability in daily life or who want to return to pivoting activity. Rehabilitation afterward runs for many months and matters as much as the procedure.',
      },
    ],
  },
  {
    slug: 'hip-conditions',
    type: 'condition',
    region: 'knee-hip',
    title: 'Hip Conditions',
    cardSummary:
      'Groin pain, outer hip pain and stiffness arising from the joint itself or the soft tissues around it.',
    metaTitle: 'Hip Pain & Hip Condition Treatment | Pinole & East Bay',
    metaDescription:
      'Hip pain evaluation in Pinole, CA. Arthritis, impingement, bursitis and labral problems — identifying which structure is causing the pain.',
    intro:
      'Hip pain can arise from the joint itself or from the soft tissues around it, and where the pain is felt often points toward the cause. Arthritis and impingement typically produce groin pain, while bursitis and tendon problems produce pain over the outer hip. Pain referred from the lower back can imitate both.',
    sections: [
      {
        heading: 'Commonly evaluated',
        items: [
          'Hip osteoarthritis',
          'Femoroacetabular impingement',
          'Greater trochanteric bursitis and gluteal tendinopathy',
          'Labral tears',
          'Hip fractures',
          'Pain referred from the lumbar spine',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'The examination looks at gait, hip motion, and the response to positions that load specific structures, and it includes an assessment of the lower back. X-rays are the starting point for imaging, with MRI added when a soft-tissue cause is suspected.',
      },
      {
        heading: 'Treatment options',
        body: 'Treatment depends entirely on the diagnosis, which is why identifying the source of the pain comes first. Options range from physical therapy, activity modification and injections through to surgical treatment, including hip replacement for advanced arthritis.',
      },
    ],
  },
  {
    slug: 'knee-replacement',
    type: 'treatment',
    region: 'knee-hip',
    title: 'Knee Replacement',
    cardSummary:
      'Resurfacing the worn ends of the knee joint with implants, considered for advanced arthritis limiting daily life.',
    metaTitle: 'Knee Replacement Surgery | Pinole & East Bay',
    metaDescription:
      'Knee replacement in Pinole, CA. Who it is for, what the procedure involves, what recovery looks like, and what to weigh before deciding.',
    intro:
      'Total knee replacement resurfaces the worn ends of the femur and tibia — and usually the back of the kneecap — with implants that restore a smooth bearing surface. It is generally considered for advanced arthritis, when pain limits daily life and non-surgical treatment no longer provides enough relief.',
    sections: [
      {
        heading: 'Who it is generally considered for',
        items: [
          'Advanced arthritis confirmed on weight-bearing X-rays',
          'Pain that limits walking, stairs, work or sleep',
          'Symptoms that persist despite therapy, medication and injections',
          'A patient prepared for a structured rehabilitation program',
        ],
      },
      {
        heading: 'What the procedure involves',
        body: 'The damaged surfaces are removed and replaced with metal and plastic components sized and positioned for your knee. In some patients only one compartment is worn, and a partial knee replacement may be appropriate instead — this is determined by examination and imaging.',
      },
      {
        heading: 'Recovery at a glance',
        body: 'Walking with assistance and beginning motion exercises start early, with physical therapy guiding progress. Motion and strength improve over weeks to months, with the most noticeable change in the first several months and continued gradual gains after that. Recovery asks real work of the patient.',
      },
      {
        heading: 'Before you decide',
        body: 'A useful conversation covers the alternatives that remain, whether a partial replacement is an option, the risks of the procedure, the timing that fits your life and work, and practical preparation at home. There is rarely a single correct moment — the goal is a decision you understand and are comfortable with.',
      },
    ],
  },
  {
    slug: 'joint-replacement-evaluation',
    type: 'treatment',
    region: 'knee-hip',
    title: 'Joint Replacement Evaluation',
    cardSummary:
      'A focused visit to answer one question clearly: is joint replacement the right next step, and if so, when?',
    metaTitle: 'Joint Replacement Evaluation | Pinole & East Bay',
    metaDescription:
      'Joint replacement evaluation in Pinole, CA. What the visit covers, what to bring, and why many patients leave with a non-surgical plan instead.',
    intro:
      'A joint replacement evaluation is a focused visit to answer one question clearly: is a joint replacement the right next step, and if so, when? Many patients leave with a non-surgical plan and a timeline to reassess rather than a surgical date.',
    sections: [
      {
        heading: 'What the visit covers',
        items: [
          'A history of your symptoms and how they affect daily life',
          'Examination of the joint, including motion, strength and alignment',
          'Review of existing imaging, or new weight-bearing X-rays',
          'A discussion of what has already been tried and for how long',
          'An explanation of both surgical and non-surgical options, with risks and expected recovery',
        ],
      },
      {
        heading: 'What to bring',
        items: [
          'Your insurance card and photo identification',
          'A list of your current medications',
          'Prior imaging or radiology reports, if you have them',
          'Notes on which specific activities have become limited',
          'Your questions, written down',
        ],
      },
      {
        heading: 'You are not committing to surgery',
        body: 'The purpose of the visit is an informed decision. If replacement is not appropriate yet, that is a useful answer, and the plan becomes what to do in the meantime and when to be seen again.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  //  FRACTURE & INJURY CARE
  // -------------------------------------------------------------------------
  {
    slug: 'upper-extremity-fractures',
    type: 'condition',
    region: 'fracture-injury',
    title: 'Upper-Extremity Fractures',
    cardSummary:
      'Fractures of the shoulder, arm, elbow, forearm, wrist and hand, treated with immobilization or surgical fixation.',
    metaTitle: 'Upper-Extremity Fracture Care | Pinole & East Bay',
    metaDescription:
      'Treatment of shoulder, arm, elbow, forearm, wrist and hand fractures in Pinole, CA. How alignment and joint involvement guide the treatment plan.',
    intro:
      'Fractures of the shoulder, upper arm, elbow, forearm, wrist and hand are among the most common orthopaedic injuries. Treatment depends on which bone is broken, whether the fracture extends into a joint, and how well the fragments are aligned.',
    sections: [
      {
        heading: 'Commonly treated',
        items: [
          'Clavicle (collarbone) fractures',
          'Proximal humerus fractures',
          'Elbow and forearm fractures',
          'Distal radius (wrist) fractures',
          'Hand and finger fractures',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'X-rays confirm the fracture pattern and alignment, and CT is added when the fracture involves a joint surface. The examination also checks the condition of the skin, the circulation and the nerve function in the limb, all of which can influence the urgency and the plan.',
      },
      {
        heading: 'Treatment options',
        body: 'Well-aligned, stable fractures are often treated with a cast, splint or sling, with X-rays repeated over the following weeks to confirm the alignment is maintained as healing progresses. Displaced or unstable fractures may need reduction and fixation with plates, screws, pins or rods. Restoring motion and strength afterward is a significant part of care, particularly around the elbow and hand, where stiffness develops easily.',
      },
    ],
  },
  {
    slug: 'lower-extremity-fractures',
    type: 'condition',
    region: 'fracture-injury',
    title: 'Lower-Extremity Fractures',
    cardSummary:
      'Fractures of the hip, thigh, knee, leg, ankle and foot, where restoring safe weight bearing guides the plan.',
    metaTitle: 'Lower-Extremity Fracture Care | Pinole & East Bay',
    metaDescription:
      'Treatment of hip, femur, knee, tibia, ankle and foot fractures in Pinole, CA. Immobilization, surgical fixation and structured return to weight bearing.',
    intro:
      'Fractures of the hip, thigh, knee, lower leg, ankle and foot affect the ability to bear weight. Treatment decisions center on restoring alignment and getting patients moving safely, since prolonged immobility carries its own risks.',
    sections: [
      {
        heading: 'Commonly treated',
        items: [
          'Hip fractures',
          'Femur fractures',
          'Fractures around the knee',
          'Tibia and fibula fractures',
          'Ankle fractures',
          'Foot fractures',
        ],
      },
      {
        heading: 'How it is evaluated',
        body: 'X-rays establish the pattern, and CT is frequently used for fractures involving the ankle or the joint surfaces around the knee. Swelling and the condition of the surrounding soft tissue are assessed carefully, because they can affect both the timing and the choice of treatment.',
      },
      {
        heading: 'Treatment options',
        body: 'Stable, well-aligned fractures may be managed with immobilization and a defined weight-bearing plan. Displaced fractures, and those involving the ankle or the knee joint surfaces, frequently require surgical fixation to restore alignment. Recovery involves a structured progression of weight bearing alongside physical therapy.',
      },
    ],
  },
  {
    slug: 'orthopaedic-injuries',
    type: 'condition',
    region: 'fracture-injury',
    title: 'Orthopaedic Injuries',
    cardSummary:
      'Sprains, strains, tendon injuries, dislocations, work injuries and sports injuries — many treated without surgery.',
    metaTitle: 'Orthopaedic Injury Care | Pinole & East Bay',
    metaDescription:
      'Evaluation of sprains, strains, dislocations, sports injuries and work injuries in Pinole, CA. When an injury should be seen by an orthopaedic surgeon.',
    intro:
      'Not every injury is a fracture. Sprains, strains, tendon injuries, dislocations, work injuries and sports injuries all fall within orthopaedic care, and many of them can be evaluated and treated without surgery.',
    sections: [
      {
        heading: 'Commonly evaluated',
        items: [
          'Sprains and ligament injuries',
          'Muscle and tendon strains',
          'Dislocations and joint instability',
          'Overuse and repetitive-strain injuries',
          'Work-related injuries',
          'Sports injuries',
        ],
      },
      {
        heading: 'When to be seen',
        body: 'Some injuries settle with rest and time. These are reasons to have one evaluated:',
        items: [
          'Inability to bear weight on the limb or use it normally',
          'Visible deformity',
          'Numbness, coldness, or loss of circulation',
          'Severe or rapidly increasing swelling',
          'Pain that is not improving after several days',
          'Any injury following a significant fall or collision',
        ],
      },
      {
        heading: 'A note on urgent injuries',
        body: 'A severe injury, an open wound over a suspected fracture, or a limb that is numb, cold or grossly deformed should be assessed at an emergency department rather than by waiting for an office appointment. Call 911 for a medical emergency.',
      },
    ],
  },
  {
    slug: 'second-opinions',
    type: 'treatment',
    region: 'fracture-injury',
    title: 'Second Opinions',
    cardSummary:
      'A review of your diagnosis, imaging and recommended treatment before you commit to a procedure.',
    metaTitle: 'Orthopaedic Second Opinion | Pinole & East Bay',
    metaDescription:
      'Orthopaedic second opinions in Pinole, CA. Have your diagnosis, imaging and recommended surgery reviewed and explained before you decide.',
    intro:
      'A second opinion is a normal and appropriate part of making a decision about surgery. Patients request one to confirm a diagnosis, to understand the alternatives to a recommended procedure, or simply to hear the explanation in different words before committing.',
    sections: [
      {
        heading: 'Reasons patients request one',
        items: [
          'Surgery has been recommended and you want to understand the alternatives',
          'The diagnosis does not seem to fit your symptoms',
          'Symptoms have persisted despite treatment',
          'You would like your imaging reviewed and explained directly',
          'You want to discuss timing rather than whether to proceed at all',
        ],
      },
      {
        heading: 'What to bring',
        items: [
          'Imaging on a disc or portal access, plus the radiology reports',
          'Operative reports from any prior surgery',
          'Notes or records from the physicians you have already seen',
          'A list of the treatments you have tried, and for how long',
          'Your insurance card and your questions',
        ],
      },
      {
        heading: 'What to expect',
        body: 'The visit involves a review of your records and imaging, an examination, and a direct explanation of what is seen and what the reasonable options are — including the option of doing nothing for now. You are under no obligation to transfer your care.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
//  Helpers used by the pages. No need to edit below this line.
// ---------------------------------------------------------------------------

export const pathFor = (entry) =>
  entry.type === 'treatment' ? `/treatments/${entry.slug}` : `/conditions/${entry.slug}`;

export const entriesByRegion = (regionId) => entries.filter((e) => e.region === regionId);

export const regionById = (regionId) => regions.find((r) => r.id === regionId);
