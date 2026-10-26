import { definePage } from '../../lib/guide-types';
import { addDays } from '../../lib/engine/dates';
import { ntkInTime } from '../../lib/engine/parking';

export default definePage({
  id: 'parking-fine-not-driver',
  group: 'private',
  order: 25,
  tool: { kind: 'mini:pofawindow' },
  mini: { kind: 'mini:ntk' },
  related: ['notice-to-keeper', 'hire-car-parking-fine', 'appeal-parking-charge-notice', 'parking-county-court-claim'],
  sources: ['pofa4', 'code2026'],
  demarche: true,
  en: {
    slug: 'parking-fine-keeper-not-driver',
    nav: 'Keeper, not the driver',
    card: 'The charge is addressed to you as registered keeper but someone else was driving: what Schedule 4 lets the operator do, and your three choices.',
    title: 'Parking Fine When You Were Not the Driver: Keeper Rules',
    description: 'A parking charge sent to a registered keeper who was not driving: when Schedule 4 makes the keeper liable, why naming the driver is optional and key dates.',
    h1: 'Parking charge, but you were not the driver',
    intro: 'Enter the date of the windscreen ticket: the tool shows the window in which a Notice to Keeper must arrive for the keeper to become liable.',
    resume: (h) => `A private parking charge is owed in the first place by the driver, because the driver is the person who accepted the terms on the signs by parking. The company usually does not know who the driver was, only the registered keeper whose details it obtains from the DVLA. Schedule 4 to the Protection of Freedoms Act 2012 bridges that gap in England and Wales: if the driver is not identified and the company has followed every condition of the Schedule, including the delivery dates of its notices, it can recover the unpaid charge from the keeper, up to the amount stated in the notice to keeper. The keeper has no legal duty to name the driver, but can do so, with a current address for service, to move liability. If the notices fail a condition, the keeper is not liable under the Schedule and the company must prove who was driving. The government Code adds that an operator must not presume that the keeper was the driver. In Scotland and Northern Ireland, Schedule 4 does not apply at all.`,
    faqs: (h) => [
      { q: 'Do I have to tell the parking company who was driving?', a: 'No law obliges a keeper to name the driver of a car parked on private land. Naming the driver, with an address where court papers can be served, moves the claim to that person. Not naming anyone leaves the keeper exposed only if every condition of Schedule 4 has been met; otherwise the company has to prove who the driver was.' },
      { q: 'Can a parking company assume the keeper was driving?', a: 'The government Code says an operator must not presume that the keeper was the driver when issuing or pursuing a charge. Schedule 4 exists precisely because a keeper is not automatically the driver. A letter that treats you as the driver without evidence, while relying on keeper details from the DVLA, is a point worth raising in an appeal.' },
      { q: 'What if a company car or a family car was used by someone else?', a: 'The same rules apply. The registered keeper, whether a person or a business, receives the notice and can name the driver or rely on the conditions of Schedule 4. A business can give the name and address of the employee who had the car that day. Where the car was on hire under a written agreement, the separate hire route of the Schedule applies instead.' },
    ],
    body: (h) => {
      const ntd = '2026-11-14';
      const w = ntkInTime('windscreen', ntd, ntd);
      return `
<h2>Driver liability and keeper liability</h2>
<p>The contract formed by the signs binds the driver. Schedule 4 adds a second, conditional route against the keeper (${h.src('pofa4', 'Schedule 4, paragraph 4')}). It works only if:</p>
<ul>
<li>the land is relevant land, which excludes public highways, council-controlled parking places and other land where parking is under statutory control (paragraph 3);</li>
<li>the company gave a notice to keeper with the required content, delivered within the set window (paragraphs 8 and 9);</li>
<li>${h.POFA.keeperLiableAfterDays} days have passed, beginning with the day the notice to keeper was given, without the charge being paid in full or the driver being named.</li>
</ul>
<p>Even then the keeper can be asked for no more than the amount in the notice to keeper (paragraph 4(5)). Debt recovery fees added later are a separate question, limited under the government Code to ${h.gbp(h.CODE.debtRecoveryMax)} once it is in force.</p>

<h2>The dates that decide keeper liability</h2>
${h.table(['Event', 'Example date', 'Rule'], [
  ['Windscreen ticket (notice to driver)', h.date(ntd), 'day of the visit'],
  ['Notice to keeper: earliest delivery', h.date(w.from), `day ${h.POFA.ntkAfterNtdFromDay}`],
  ['Notice to keeper: latest delivery', h.date(w.to), `day ${h.POFA.ntkAfterNtdToDay}`],
  ['Keeper liability can start, if delivered on the last day', h.date(addDays(w.to, h.POFA.keeperLiableAfterDays)), `${h.POFA.keeperLiableAfterDays} days after delivery`],
], 'Schedule 4 to the Protection of Freedoms Act 2012, paragraphs 4(4) and 8(5). Camera charges with no windscreen ticket use a 14-day window instead.', ['l', 'r', 'l'])}
<p>For a charge sent by post after a camera recording, the window is ${h.POFA.ntkNoNtdDays} days beginning with the day after the parking ended: the mini-tool under the summary checks either case, and our ${h.a('notice-to-keeper', 'Notice to Keeper page')} explains presumed delivery.</p>

<h2>Your three choices as keeper</h2>
<p><strong>Name the driver.</strong> Give the full name and a current address for service. The company then writes to that person, who has the usual rights to pay or appeal. Do this only with information you are sure of.</p>
<p><strong>Appeal as keeper.</strong> State that you are the keeper, that you do not admit being the driver and that you are not obliged to identify them, then explain why the conditions of Schedule 4 are not met, for example a late or incomplete notice. Our ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} has this wording ready. The first appeal is due within ${h.CODE.appealDays} days of delivery.</p>
<p><strong>Pay.</strong> If the conditions are met and you prefer to settle, paying within the reduced-rate period costs least, and you can recover the money privately from the driver.</p>

<h2>Hire cars, company cars and sold cars</h2>
<p>A vehicle on hire under a written agreement follows paragraphs 13 and 14 of the Schedule: the hire firm sends the company a statement and a copy of the agreement, and the charge then goes to the hirer. Our ${h.a('hire-car-parking-fine', 'hire car page')} gives the dates. If you had sold the car before the date of the charge, say so with the date of sale and any record of the change of keeper sent to the DVLA. If the matter reaches a claim form, the ${h.a('parking-county-court-claim', 'county court page')} lists the response deadlines.</p>`;
    },
  },
});
