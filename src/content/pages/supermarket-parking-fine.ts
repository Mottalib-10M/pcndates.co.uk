import { definePage } from '../../lib/guide-types';
import { lastDayOf } from '../../lib/engine/parking';

export default definePage({
  id: 'supermarket-parking-fine',
  group: 'private',
  order: 26,
  tool: { kind: 'countdown', props: { mode: 'private' } },
  mini: { kind: 'mini:grace' },
  related: ['parking-grace-period', 'retail-park-parking-fine', 'anpr-parking-fine', 'appeal-parking-charge-notice'],
  sources: ['code2026', 'pofa4'],
  demarche: true,
  en: {
    slug: 'supermarket-parking-fine',
    nav: 'Supermarket car parks',
    card: 'Charges from supermarket car parks: free time limits, customer-only rules, leaving to shop elsewhere, and the dates to pay or appeal.',
    title: 'Supermarket Parking Fine: Free-Time Limits and Appeals',
    description: 'Overstayed the free time at a supermarket car park? See the grace minutes, why a receipt helps, and the dates to pay at the reduced rate or to appeal.',
    h1: 'Supermarket parking charge: overstaying the free time',
    intro: 'Enter the date on the charge and how it reached you: the countdown gives the reduced-rate deadline, the appeal date and, for a letter, the keeper window.',
    resume: (h) => `Most supermarket car parks are free for a limited time, typically shown on large signs at the entrance with a maximum stay and a condition that you use the store. The car park is usually run by a private parking company for the retailer, with cameras at the entrance that record each number plate. If the cameras show a stay beyond the free period, or the terms say the car park is for customers only and you went elsewhere, the company sends a parking charge by post to the registered keeper. It is a claim under contract, not a fine. In England and Wales, a camera letter must reach the keeper within ${h.POFA.ntkNoNtdDays} days beginning with the day after the visit for the keeper to be liable under Schedule 4 to the Protection of Freedoms Act 2012. Under the government Code, once in force, the charge is capped at ${h.gbp(h.CODE.cap)}, a reduction of at least ${h.CODE.discountMinPct}% applies within ${h.CODE.discountDays} days, free car parks of under 500 spaces get ${h.CODE.sites[0].grace} minutes of grace, and you have ${h.CODE.appealDays} days to appeal.`,
    faqs: (h) => [
      { q: 'Does a till receipt help with a supermarket parking appeal?', a: 'Often, yes. The receipt shows the time you were in the store and that you were a customer, which matters when the terms are customer-only or when the overstay is short. Send a copy with your appeal. If you did not keep it, a card statement with the store and the time of the purchase can do the same job.' },
      { q: 'Can a supermarket cancel a parking charge from its car park operator?', a: 'The landowner or retailer often has an arrangement with the operator, and store staff sometimes ask for a charge to be cancelled for a genuine customer. That is a matter of goodwill, not a right. The formal route remains the appeal to the operator within the time printed on the notice, so do not let that date pass while waiting for the store.' },
      { q: 'How much grace does a large supermarket car park have to give?', a: `Annex B of the Code ties the minimum to the type of site. A free car park with more than 500 spaces must allow a consideration period of ${h.CODE.sites[1].consideration} minutes on arrival and ${h.CODE.sites[1].grace} minutes of grace at the end. A smaller free car park allows ${h.CODE.sites[0].consideration} and ${h.CODE.sites[0].grace}. Those minutes count before a charge is allowed once the Code is in force.` },
    ],
    body: (h) => {
      const visit = '2026-12-05';
      return `
<h2>How a supermarket charge is calculated</h2>
<p>The camera at the entrance records the time your plate came in, and the camera at the exit the time it left. The difference is compared with the free period on the signs. If you stayed longer, the company issues a charge for the sum displayed on the signs. Nothing is left on your windscreen, so the letter is a notice to keeper sent after the company has obtained your details from the DVLA. The countdown above, set to the date on the letter, gives each deadline.</p>
${h.table(['Free car park', 'Consideration on arrival', 'Grace after the free time'], [
  [h.CODE.sites[0].label, `${h.CODE.sites[0].consideration} min`, `${h.CODE.sites[0].grace} min`],
  [h.CODE.sites[1].label, `${h.CODE.sites[1].consideration} min`, `${h.CODE.sites[1].grace} min`],
  [h.CODE.sites[6].label, `${h.CODE.sites[6].consideration} min`, `${h.CODE.sites[6].grace} min`],
], 'Private Parking Code of Practice, Annex B. Minimums once the Code is in force.', ['l', 'r', 'r'])}

<h2>A worked example</h2>
<p>A shopper parks on ${h.date(visit)} in a supermarket car park with a two-hour free limit and 600 spaces. The cameras show 2 hours and 12 minutes. The first ${h.CODE.sites[1].consideration} minutes on arrival and ${h.CODE.sites[1].grace} minutes of grace at the end are allowed under the Code, so on our reading of Annex B the stay counts as over the limit only beyond 2 hours and ${h.CODE.sites[1].consideration + h.CODE.sites[1].grace} minutes: on these figures, no charge should be issued once the Code applies. Had the stay lasted 2 hours and 40 minutes, a charge would be allowed. A letter about that visit must be delivered by ${h.date(lastDayOf('2026-12-06', h.POFA.ntkNoNtdDays))} for the keeper to be liable, counting ${h.POFA.ntkNoNtdDays} days from the day after the visit (${h.src('pofa4', 'Schedule 4, paragraph 9')}).</p>

<h2>Common reasons drivers give, and what the texts say</h2>
<ul>
<li><strong>Queues at the tills or at the exit.</strong> The Appeals Charter says no charge should be issued where a driver is physically unable to leave in time because of traffic within the car park.</li>
<li><strong>A medical problem or a child to collect.</strong> The onset of illness, an overrunning medical appointment and childcare delays are reasons for cancellation on appeal with evidence.</li>
<li><strong>Two visits on the same day.</strong> Cameras can pair the first entry with the last exit; explain the two visits with receipts.</li>
<li><strong>Customer-only terms.</strong> If you shopped, your receipt answers the point; if you parked to go elsewhere, the terms may well have been broken.</li>
</ul>
<p>Our ${h.a('parking-grace-period', 'grace period page')} explains the minutes in detail, and the ${h.a('anpr-parking-fine', 'ANPR page')} the camera evidence.</p>

<h2>Paying or appealing</h2>
<p>If the charge is right, paying within ${h.CODE.discountDays} days of the date of issue costs least, through the payment route printed on the letter. If not, appeal to the operator within ${h.CODE.appealDays} days of delivery with your receipt and your explanation; the ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} assembles the letter. An operator that rejects an appeal made in time must keep the reduced rate available for ${h.CODE.discountHeldDays} more days and name the independent appeals service (${h.src('code2026', 'Code, clauses 8.1.2 and 8.3.6')}). The same approach applies to the large car parks of ${h.a('retail-park-parking-fine', 'retail parks')}.</p>`;
    },
  },
});
