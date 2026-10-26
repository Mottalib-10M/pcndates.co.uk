import { definePage } from '../../lib/guide-types';
import { lastDayOf } from '../../lib/engine/parking';

export default definePage({
  id: 'wrong-registration-parking-fine',
  group: 'private',
  order: 24,
  tool: { kind: 'mini:charter' },
  mini: { kind: 'mini:appealwin' },
  related: ['anpr-parking-fine', 'appeal-parking-charge-notice', 'parking-code-of-practice', 'blue-badge-parking-fine'],
  sources: ['code2026', 'code_em'],
  demarche: true,
  en: {
    slug: 'wrong-registration-parking-fine',
    nav: 'Wrong registration entered',
    card: 'You paid but typed the number plate wrongly, entered another car or forgot to enter it: what the Appeals Charter of the Code says for each case.',
    title: 'Wrong Registration Parking Fine: Keying Errors and Appeals',
    description: 'Paid for parking but typed the wrong number plate? The Code cancels minor keying errors and cuts other registration mistakes to a reduced charge. Check it.',
    h1: 'Wrong registration entered: cancel or reduced charge?',
    intro: 'Pick the situation closest to yours: the tool gives the outcome the Appeals Charter sets and the evidence the operator will ask for.',
    resume: (h) => `A large share of private parking charges are sent to drivers who did pay, but whose payment the operator's system could not match to the number plate read by its cameras. The Private Parking Code of Practice, laid before Parliament on ${h.date(h.CODE.laid)}, deals with these cases in its Appeals Charter, which sorts them into two groups. A minor keying error, such as a zero typed instead of the letter O, a capital I instead of an L, or a figure one instead of an I, must lead to cancellation when you show that you paid for the stay. A wider mistake, such as entering the registration of a partner's car or of a previous car, or not entering the registration at all where the vehicle would have been allowed to park, leads to a reduced charge of ${h.gbp(h.CODE.reducedCharge)} payable within ${h.CODE.reducedChargeDays} days, after a first-stage appeal. These outcomes apply once the Code is in force; before that date, the operator's trade association code governs, and the evidence you gather is the same.`,
    faqs: (h) => [
      { q: 'Which registration typos count as a minor keying error?', a: 'The Appeals Charter gives examples rather than a closed list: a zero instead of the letter O, the letter I instead of L, and the figure one instead of the letter I. The common thread is a character that looks like another, with the rest of the plate right. You must have paid the tariff, and you need reliable evidence of that payment, such as the ticket or the app record.' },
      { q: 'I paid with my old car registration still saved in the app. What happens?', a: `That is one of the cases the Charter places in the reduced charge group: the driver paid the tariff but entered the wrong registration, for example a previous car or a partner's car. After a first-stage appeal with proof of payment, the charge should be reduced to ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days. Update the saved vehicles in your parking apps to avoid a repeat.` },
      { q: 'Should the operator spot a keying error before sending a charge?', a: 'The Code expects it to. The Charter refers to a minor keying error that the operator did not pick up when issuing the charge, in line with its clause on checking payment records. If the error is obvious, a short appeal with the payment record attached usually settles it. Ask for the payment data held against the site for the time of your visit if you no longer have your ticket.' },
    ],
    body: (h) => {
      const issued = '2026-11-03';
      return `
<h2>The three outcomes in the Appeals Charter</h2>
<p>Clause 19 of the ${h.src('code2026', 'Private Parking Code of Practice')} sets out the Appeals Charter. It lists situations where no charge should be issued, situations where an appeal with reliable evidence must lead to cancellation, and situations where the charge must fall to ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days after a first-stage appeal. Registration mistakes appear in the second and third groups.</p>
${h.table(['What went wrong', 'Outcome under the Charter', 'Evidence to send'], [
  ['One character typed wrongly (0 and O, I and L, 1 and I), stay paid', 'cancel', 'ticket, app record or card statement'],
  ['Registration of a partner’s car or a previous car entered, stay paid', `reduce to ${h.gbp(h.CODE.reducedCharge)}`, 'payment record and your V5C or hire details'],
  ['Registration not entered at the terminal, vehicle allowed to park', `reduce to ${h.gbp(h.CODE.reducedCharge)}`, 'proof you were a customer, guest or permit holder'],
  ['Valid permit held but not displayed', `reduce to ${h.gbp(h.CODE.reducedCharge)}`, 'a copy of the permit valid at the time'],
  ['Payment machine out of order, no reasonable alternative', 'cancel', 'photographs, times of attempts'],
], 'Private Parking Code of Practice, clause 19, as laid. Outcomes apply once the Code is in force.', ['l', 'l', 'l'])}
<p>Clause 19.2 adds that where the evidence is not enough to decide, the operator should give you a reasonable opportunity to send more before deciding. That matters if you only find the card statement a few days after your first message.</p>

<h2>A worked example</h2>
<p>A driver parks at a retail park on ${h.date(issued)}, pays in the app, and receives a camera charge a week later. The app shows the registration ending in "O1" instead of "01". The charge was issued on ${h.date(issued)}, so the reduced rate under the Code lasts until ${h.date(lastDayOf(issued, h.CODE.discountDays))}, and a first appeal on a windscreen-free postal notice can be made within ${h.CODE.appealDays} days of delivery. The driver appeals with a screenshot of the payment and the bank line. Under the Charter, that is a cancellation case. If the operator rejects the appeal, the reduced rate that applied when the appeal was made stays open for ${h.CODE.discountHeldDays} days, and the driver can take the case to the independent appeals service named in the rejection.</p>

<h2>How to write the appeal</h2>
<ol>
<li>Quote the charge reference and the registration on the notice.</li>
<li>State in one sentence what was entered and what the plate really is.</li>
<li>Attach the payment record showing date, time, site and amount; for a reduced charge case, show that the other registration belongs to you or your household.</li>
<li>Ask for cancellation, or for the ${h.gbp(h.CODE.reducedCharge)} reduced charge, citing the Appeals Charter of the Code.</li>
</ol>
<p>Our ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} includes a ready reason for a keying error. If the camera times themselves look wrong, see the ${h.a('anpr-parking-fine', 'ANPR page')}.</p>

<h2>Before the Code takes effect</h2>
<p>The explanatory memorandum notes that the industry code in use since October 2024 did not include the ${h.gbp(h.CODE.reducedCharge)} reduced charge (${h.src('code_em', 'memorandum, paragraph 5.8')}). Until the government Code is in force, a wider registration mistake may therefore be treated less generously, at the operator's discretion. A keying error with proof of payment remains a strong ground in any case, because the operator received the money for the stay. The earliest start date is on our ${h.a('parking-code-of-practice', 'Code page')}.</p>`;
    },
  },
});
