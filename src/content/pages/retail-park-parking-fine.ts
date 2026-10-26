import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'retail-park-parking-fine',
  group: 'private',
  order: 27,
  tool: { kind: 'mini:grace' },
  mini: { kind: 'mini:privatecap' },
  related: ['supermarket-parking-fine', 'parking-grace-period', 'parking-charge-notice', 'appeal-parking-charge-notice'],
  sources: ['code2026', 'pofa4'],
  demarche: true,
  en: {
    slug: 'retail-park-parking-fine',
    nav: 'Retail parks',
    card: 'Shared car parks of retail and leisure parks: maximum stays, leaving the site on foot, mixed signs, and how the Code minutes apply.',
    title: 'Retail Park Parking Fine: Maximum Stays and Shared Signs',
    description: 'A parking charge from a retail park car park: maximum stays, leaving the site on foot, reading shared signs, the grace minutes and the cap on the charge.',
    h1: 'Retail park parking charges: shared car parks, one set of rules',
    intro: 'Choose the type of car park and the minutes over your limit: the tool says whether the Code minimums cover the overstay.',
    resume: (h) => `A retail park brings several shops, restaurants and sometimes a cinema or gym around one car park owned by a single landlord, which hires a parking company to enforce a maximum stay, often with a ban on leaving the site on foot. Cameras record each number plate at the entrance and exit, and a stay beyond the maximum, or a breach of another term on the signs, leads to a parking charge sent to the registered keeper. It is a claim under contract, not a penalty set by law. Shared car parks raise particular questions: whether the maximum stay was clearly displayed at the entrance, whether a separate area belonged to a different operator, and whether a cinema or restaurant offered extended parking by registering your plate. Under the government Code, once in force, a charge cannot exceed ${h.gbp(h.CODE.cap)}, the reduction for paying within ${h.CODE.discountDays} days is at least ${h.CODE.discountMinPct}%, the minimum grace period depends on the type of site, and an appeal can be made within ${h.CODE.appealDays} days of delivery.`,
    faqs: (h) => [
      { q: 'A cinema at the retail park said my parking was extended. Why did I get a charge?', a: 'Extended stays usually depend on the registration being entered on a terminal or tablet in the venue. If it was not entered, or entered wrongly, the cameras only see the standard maximum stay. The Appeals Charter of the Code treats a vehicle that would have been allowed to park but whose registration was not entered as a reduced charge case, with proof of the visit.' },
      { q: 'Can a retail park charge me for walking to a shop outside the site?', a: 'If the signs make it a term that drivers must remain on site, leaving on foot can break that term, and the operator usually relies on patrol staff or cameras to show it. The term must be clear on the signs to bind you. Check the exact wording at the entrance and on the poles near your space, and photograph them for an appeal.' },
      { q: 'Who decides if a retail park sign is clear enough?', a: 'In the first place the operator, on your appeal; then the independent appeals service named in its rejection; finally a county court judge if the operator sues. The Code sets standards for entrance and terms signs, including showing the type of parking and whether payment is required. Photographs of what a driver could see on arrival carry the most weight.' },
    ],
    body: (h) => `
<h2>Maximum stay, no return and stay on site</h2>
<p>Three terms recur on retail park signs. A <strong>maximum stay</strong> limits the time between entry and exit, measured by the cameras. A <strong>no return</strong> rule bars coming back within a set period. A <strong>stay on site</strong> rule bars leaving the park on foot. Each must be on the signs for it to form part of the contract. Annex A of the ${h.src('code2026', 'Private Parking Code of Practice')} requires entrance signs to show clearly the type of parking and if, when and how payment is required, and to say that terms apply and where to read them.</p>
${h.table(['Type of car park', 'Consideration', 'Grace'], h.CODE.sites.filter((s) => ['free-small', 'free-large', 'customer', 'short-stay'].includes(s.id)).map((s) => [s.label, s.consideration ? `${s.consideration} min` : 'none', s.grace ? `${s.grace} min` : 'none']), 'Annex B of the Code: the categories most retail parks fall into. Minimums once in force.', ['l', 'r', 'r'])}

<h2>Where the charge can go wrong</h2>
<p>Retail park charges are disputed for reasons that are rarer in a single-store car park:</p>
<ul>
<li><strong>Two operators on one site.</strong> A restaurant or gym can rent its own bays from a different company. A charge from the wrong operator, or for a bay with different terms, deserves a careful look at the signs where you parked.</li>
<li><strong>Visits paired by the cameras.</strong> A trip to the park in the morning and another in the afternoon can appear as one long stay. Receipts from each visit show the break.</li>
<li><strong>Registration terminals.</strong> Extended stays for customers of one venue often depend on entering the plate on a tablet; the ${h.a('wrong-registration-parking-fine', 'registration error page')} explains the reduced charge rules.</li>
<li><strong>Queueing to leave.</strong> At busy times the exit can take several minutes; the Appeals Charter excludes a charge where the driver was stuck in traffic inside the car park.</li>
</ul>

<h2>A worked example</h2>
<p>A driver arrives at a retail park with a three-hour maximum stay at 1pm and the exit camera records 4.07pm. The park is free, with more than 500 spaces. Under Annex B, ${h.CODE.sites[1].consideration} minutes of consideration and ${h.CODE.sites[1].grace} minutes of grace apply, so a seven-minute overrun is covered once the Code is in force. If the same park were run as short-stay, with no grace period, the overrun would leave the driver exposed. That is why the type of site on the signs matters as much as the time.</p>

<h2>Paying, appealing and the amounts involved</h2>
<p>A camera charge reaches the keeper by post. In England and Wales it must be delivered within ${h.POFA.ntkNoNtdDays} days beginning with the day after the visit for the keeper to be liable under ${h.src('pofa4', 'Schedule 4')}. Once the Code is in force, the charge is capped at ${h.gbp(h.CODE.cap)}, so at least ${h.CODE.discountMinPct}% off within ${h.CODE.discountDays} days brings it to ${h.gbp(h.CODE.cap * (1 - h.CODE.discountMinPct / 100))} or less, and a debt recovery add-on of up to ${h.gbp(h.CODE.debtRecoveryMax)} can follow only once it is overdue. The mini-tool under the summary compares any amount with those limits. To dispute the charge, the ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} has reasons for unclear signs, grace periods and paired visits; supermarket car parks follow the same logic, covered on the ${h.a('supermarket-parking-fine', 'supermarket page')}.</p>`,
  },
});
