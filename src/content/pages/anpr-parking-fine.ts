import { definePage } from '../../lib/guide-types';
import { addWorkingDays, ntkInTime } from '../../lib/engine/parking';

export default definePage({
  id: 'anpr-parking-fine',
  group: 'private',
  order: 23,
  tool: { kind: 'countdown', props: { mode: 'private', service: 'post' } },
  mini: { kind: 'mini:ntk' },
  related: ['notice-to-keeper', 'parking-grace-period', 'wrong-registration-parking-fine', 'appeal-parking-charge-notice'],
  sources: ['pofa4', 'code2026', 'bankhol'],
  demarche: true,
  en: {
    slug: 'anpr-parking-fine',
    nav: 'ANPR camera charge',
    card: 'A parking charge sent by post after a number plate camera recorded your entry and exit: the 14-day delivery rule and how to check the times.',
    title: 'ANPR Parking Fine: Camera Charges by Post and Their Dates',
    description: 'An ANPR camera charge arrives by post after a visit. Check the 14-day delivery rule for the keeper, the reduced rate, the appeal date and the camera times.',
    h1: 'ANPR parking charge: when a camera sends the letter',
    intro: 'Enter the date of posting printed on the letter and the day you parked: the countdown shows the presumed delivery day, the reduced rate, the appeal date and the keeper window.',
    resume: (h) => `ANPR stands for automatic number plate recognition: cameras at the entrance and exit of a car park read every number plate and record the times. When the stay breaks the terms on the signs, for example by staying longer than the maximum or without paying, the operator obtains the keeper's name and address from the DVLA and posts a parking charge, often called a fine although it is a claim under contract. Because nothing is left on the windscreen, this letter is the first contact and, in England and Wales, it is a notice to keeper under paragraph 9 of Schedule 4 to the Protection of Freedoms Act 2012. To make the keeper liable, it must be delivered within ${h.POFA.ntkNoNtdDays} days beginning with the day after the parking ended, and a posted letter is presumed delivered on the second working day after posting. Under the government Code, the reduced rate runs for ${h.CODE.discountDays} days from the date of issue on the letter and the first appeal must be made within ${h.CODE.appealDays} days of delivery.`,
    faqs: (h) => [
      { q: 'Why did an ANPR parking letter take two weeks to reach me?', a: `The operator has to request the keeper's details from the DVLA before it can post anything, which takes some days. Schedule 4 still sets an outer limit for keeper liability: delivery within ${h.POFA.ntkNoNtdDays} days beginning with the day after the parking ended. A letter presumed delivered after that day cannot make the keeper liable, although the operator can still pursue the driver.` },
      { q: 'Can an ANPR camera record the wrong times?', a: 'The camera records the moment a number plate passes it, not the time you parked or the time your ticket ended. Queueing to leave, circling for a space or a second visit on the same day can all distort the picture. Ask the operator for the photographs with their timestamps, and compare them with your payment record or bank statement.' },
      { q: 'What if I visited the same car park twice on one day?', a: 'Number plate cameras sometimes pair the first entry with the last exit, so two short visits appear as one long stay. If that happened, say so in your appeal with any evidence of the two visits, such as two payments, two receipts from a shop or a fuel purchase between them. The operator has the camera images and can check each passage.' },
      { q: 'Do I have to pay before leaving a car park that uses ANPR?', a: 'Under the Appeals Charter of the Code, a driver who pays the tariff in full before leaving a camera-controlled car park should not receive a charge; for stays over 24 hours, payment must be made within 24 hours of arrival. In a free car park with a registration terminal, logging the registration before leaving has the same effect. Some sites also allow payment afterwards: the signs say so.' },
    ],
    body: (h) => {
      const parked = '2026-11-12';
      const posted = '2026-11-20';
      const del = addWorkingDays(posted, h.POFA.deemedWorkingDays, 'ew');
      const r = ntkInTime('post', parked, del);
      const posted2 = '2026-11-25';
      const del2 = addWorkingDays(posted2, h.POFA.deemedWorkingDays, 'ew');
      const r2 = ntkInTime('post', parked, del2);
      return `
<h2>From the camera to your letterbox</h2>
<p>An ANPR charge follows a fixed path. The cameras record the entry and exit; the operator compares the stay with its tariff and terms; it asks the DVLA for the keeper's details; it posts a notice. Each step takes time, and Schedule 4 sets a deadline for the whole chain when the operator wants the keeper, rather than an identified driver, to pay (${h.src('pofa4', 'Schedule 4, paragraph 9')}). The date of posting printed on the letter is your starting point.</p>
${h.table(['Parked on', 'Posted on', 'Presumed delivered', 'Window closes', 'Keeper liable?'], [
  [h.date(parked), h.date(posted), h.date(del), h.date(r.to), r.ok ? 'can be' : 'no'],
  [h.date(parked), h.date(posted2), h.date(del2), h.date(r2.to), r2.ok ? 'can be' : 'no'],
], `Presumed delivery on the second working day after posting, England and Wales bank holidays from GOV.UK. Window: ${h.POFA.ntkNoNtdDays} days beginning with the day after the parking ended.`, ['l', 'l', 'l', 'l', 'l'])}
<p>The two lines differ by five days of posting, and that is enough to move the letter outside the window. The countdown at the top applies the same rules to your own dates. If you can show the letter arrived later than the presumed day, the real date counts.</p>

<h2>Checking what the camera saw</h2>
<p>A notice to keeper must say what period of parking it relates to. Before deciding to pay or appeal, set that period against your own records:</p>
<ul>
<li>the entry and exit times in the notice, and the photographs if they are printed or available online;</li>
<li>your payment: the machine ticket, the app history or a card statement showing the time and the registration entered;</li>
<li>anything that proves a break, such as a receipt from somewhere else between two visits;</li>
<li>the type of car park and its grace period, explained on our ${h.a('parking-grace-period', 'grace period page')}.</li>
</ul>
<p>Many camera charges come from a registration typed wrongly at the machine. The Code treats a minor keying error, such as a zero for a letter O, as a reason to cancel when you paid for the stay, and a wrong registration from another of your cars as a reason to reduce the charge to ${h.gbp(h.CODE.reducedCharge)}: see our ${h.a('wrong-registration-parking-fine', 'registration error page')}.</p>

<h2>Paying or appealing in time</h2>
<p>Under the government Code, once in force, a postal notice keeps a reduction of at least ${h.CODE.discountMinPct}% for ${h.CODE.discountDays} days beginning on the date of issue shown on it, and the first appeal can be made within ${h.CODE.appealDays} days of delivery (${h.src('code2026', 'clauses 8.2.2 and 8.3.1')}). Because the letter can arrive several days after it was issued, part of the reduced-rate period may already have passed when you open it. If you appeal within ${h.CODE.appealDays} days and lose, the reduced rate you could pay when you appealed stays open for ${h.CODE.discountHeldDays} more days.</p>
<p>If the keeper was not driving, the keeper does not have to name the driver, but the keeper may then be liable if every condition of Schedule 4 is met. Our ${h.a('parking-fine-not-driver', 'page for keepers who were not driving')} sets out the choices.</p>

<h2>Outside England and Wales</h2>
<p>Schedule 4 does not extend to Scotland or Northern Ireland. A camera charge for a car park there can still arrive by post, but it cannot make the keeper liable through that Schedule. The government Code covers Scotland once it is in force, so its cap, discount and appeal rules apply there too. Choose the nation in the countdown and it drops the keeper dates.</p>`;
    },
  },
});
