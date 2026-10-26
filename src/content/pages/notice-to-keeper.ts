import { definePage } from '../../lib/guide-types';
import { addDays } from '../../lib/engine/dates';
import { addWorkingDays, ntkInTime } from '../../lib/engine/parking';

export default definePage({
  id: 'notice-to-keeper',
  group: 'private',
  order: 20,
  tool: { kind: 'mini:ntk' },
  mini: { kind: 'mini:ntkpost' },
  related: ['parking-fine-not-driver', 'anpr-parking-fine', 'appeal-parking-charge-notice', 'parking-charge-notice'],
  sources: ['pofa4', 'code2026', 'bankhol'],
  demarche: true,
  en: {
    slug: 'notice-to-keeper',
    nav: 'Notice to Keeper',
    card: 'The letter that makes the registered keeper liable for a private parking charge, and the exact delivery window it must meet.',
    title: 'Notice to Keeper: The Delivery Window and Keeper Liability',
    description: 'A Notice to Keeper must reach the keeper inside a fixed window or the keeper cannot be pursued under Schedule 4. Check your dates and the presumed delivery day.',
    h1: 'Notice to Keeper: did it arrive in time?',
    intro: 'Tell the checker whether a ticket was left on the car, the day of parking or of that ticket, and the day the letter arrived: it shows whether the window was met.',
    resume: (h) => `A Notice to Keeper is the letter a private parking company sends to the registered keeper of a vehicle, using DVLA records, when it wants the keeper to pay a parking charge that the driver has not paid. Schedule 4 to the Protection of Freedoms Act 2012 is the only law that lets a company pass liability from an unknown driver to the keeper, and it attaches strict conditions. The notice must contain set information and must be delivered inside a fixed window. Where a ticket was first left on the windscreen, the window runs from day ${h.POFA.ntkAfterNtdFromDay} to day ${h.POFA.ntkAfterNtdToDay} after that ticket. Where nothing was left on the car and a camera recorded the stay, the notice must arrive within ${h.POFA.ntkNoNtdDays} days beginning with the day after the parking ended. A letter sent by post is presumed delivered on the second working day after posting. If the window is missed, the keeper cannot be made liable under the Schedule by that notice, although the company can still pursue whoever was driving. Schedule 4 applies in England and Wales only.`,
    faqs: (h) => [
      { q: 'What happens if a Notice to Keeper arrives after the deadline?', a: 'The keeper cannot be held liable for the charge through Schedule 4, because one of its conditions has failed. The company can still try to recover the money from the driver, but it then has to show who the driver was. Many keepers set out the late delivery date in their first appeal, with the envelope or other proof of when the letter arrived.' },
      { q: 'How is the delivery date of a posted Notice to Keeper worked out?', a: `Paragraphs 8(6) and 9(6) presume delivery on the second working day after posting, leaving out Saturdays, Sundays and bank holidays in England and Wales. The presumption can be displaced: if you can show the letter arrived later, the real date counts. The company must keep a record of the actual posting date, as the Code reminds operators.` },
      { q: 'Can a keeper be asked for more than the amount on the Notice to Keeper?', a: `Not under Schedule 4. Paragraph 4(5) caps what can be recovered from the keeper at the amount specified in the notice to keeper. Proceedings against the keeper also cannot start until ${h.POFA.keeperLiableAfterDays} days have passed, beginning with the day the notice was given, which leaves time to pay, appeal or name the driver.` },
      { q: 'Does a Notice to Keeper apply to a car parked in Scotland?', a: 'No. Schedule 4 extends to England and Wales, so the keeper liability it creates does not exist for land in Scotland or Northern Ireland. A company may still write to the keeper there, asking who was driving, but it has no statutory route to make the keeper pay simply for being the keeper.' },
    ],
    body: (h) => {
      const ntd = '2026-10-01';
      const w = ntkInTime('windscreen', ntd, ntd);
      const parked = '2026-11-06';
      const posted = '2026-11-18';
      const del = addWorkingDays(posted, h.POFA.deemedWorkingDays, 'ew');
      const lim = ntkInTime('post', parked, del);
      return `
<h2>Two windows, depending on what happened at the car</h2>
<p>Schedule 4 treats two situations differently. When an attendant left a notice to driver on the windscreen, the company first has to give the driver time to pay: the notice to keeper may only be delivered from day ${h.POFA.ntkAfterNtdFromDay} to day ${h.POFA.ntkAfterNtdToDay} after the windscreen ticket, the second block of 28 days counted from the day after it (${h.src('pofa4', 'paragraph 8(5)')}). When the parking was recorded by a camera and nothing was left on the car, the notice is the first contact and must be delivered within ${h.POFA.ntkNoNtdDays} days beginning with the day after the parking ended (${h.src('pofa4', 'paragraph 9(5)')}).</p>
${h.table(['Situation', 'Earliest delivery', 'Latest delivery', 'Worked example'], [
  ['Windscreen ticket first', `day ${h.POFA.ntkAfterNtdFromDay}`, `day ${h.POFA.ntkAfterNtdToDay}`, `ticket on ${h.date(ntd)}: ${h.date(w.from)} to ${h.date(w.to)}`],
  ['Camera only, no windscreen ticket', 'day after parking', `${h.POFA.ntkNoNtdDays} days later`, `parked ${h.date(parked)}: by ${h.date(lim.to)}`],
], 'Counted from the dates in Schedule 4 to the Protection of Freedoms Act 2012. England and Wales.', ['l', 'l', 'l', 'l'])}

<h2>Presumed delivery: the second working day</h2>
<p>Most notices come by post, and the Schedule presumes that a posted letter is delivered on the second working day after the day it was posted. A working day excludes weekends and the bank holidays of England and Wales, taken here from the ${h.src('bankhol', 'GOV.UK bank holiday list')}. In the example above, a letter posted on ${h.date(posted)} is presumed delivered on ${h.date(del)}, ${lim.ok ? 'inside' : 'outside'} the window that closes on ${h.date(lim.to)}. A letter posted a day or two later around a weekend can slip outside it. The mini-tool under the summary turns any posting date into the presumed delivery date.</p>
<p>The presumption works both ways: if the letter actually arrived later than the presumed date, the real date of delivery counts, but you would need to show it. A dated photograph of the envelope on arrival, or a note of the date written at the time, helps.</p>

<h2>What a valid notice must also contain</h2>
<p>Timing is only one condition. Paragraphs 8(2) and 9(2) list what the notice must say: among other items, the single period of parking it relates to, an invitation to pay or to name the driver, and the arrangements for disputes or complaints, including any independent appeal. Read your notice against the text of the Schedule rather than against a summary. When a notice is missing one of these elements, the keeper liability route fails in the same way as a late delivery. The government Code adds that an operator must not presume the keeper was the driver, and that a notice not issued under Schedule 4 must not refer to it (${h.src('code2026', 'Private Parking Code, clause 8.1')}).</p>

<h2>What the keeper can do</h2>
<ul>
<li><strong>Pay</strong> at the rate shown on the notice. Under the Code, at least ${h.CODE.discountMinPct}% off applies within ${h.CODE.discountDays} days of the date of issue.</li>
<li><strong>Name the driver</strong>, with a current address for service, if someone else was driving. Liability then moves to that person.</li>
<li><strong>Appeal</strong> within ${h.CODE.appealDays} days of delivery, stating, for example, that the notice was late or incomplete. The keeper has no duty to say who was driving. Our ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} has a reason for each of these cases.</li>
</ul>
<p>If the camera route applies to you, the ${h.a('anpr-parking-fine', 'ANPR page')} goes through the camera evidence; if you were not the driver, see the page on the ${h.a('parking-fine-not-driver', 'keeper who was not driving')}.</p>`;
    },
  },
});
