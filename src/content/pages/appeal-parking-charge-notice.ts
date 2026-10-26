import { definePage } from '../../lib/guide-types';
import { addWorkingDays, lastDayOf } from '../../lib/engine/parking';

export default definePage({
  id: 'appeal-parking-charge-notice',
  group: 'appeal',
  order: 51,
  tool: { kind: 'letter', props: { kind: 'private' } },
  mini: { kind: 'mini:appealwin' },
  related: ['popla-appeal', 'ias-appeal', 'notice-to-keeper', 'wrong-registration-parking-fine', 'parking-charge-notice'],
  sources: ['code2026', 'pofa4', 'popla', 'ias'],
  demarche: true,
  en: {
    slug: 'appeal-parking-charge-notice',
    nav: 'Appeal a private parking charge',
    card: 'Build the first appeal to a parking company: reasons the Code and Schedule 4 recognise, late appeals, and what happens after a rejection.',
    title: 'Appeal a Parking Charge Notice: Letter, Grounds and Dates',
    description: 'Appeal a private Parking Charge Notice: tick your reasons, copy the letter, and see the 28-day deadline, late appeal cases and the rate held after a rejection.',
    h1: 'Appeal a Parking Charge Notice to the operator',
    intro: 'Tick the reasons that fit, add the reference if you wish, and copy the letter: nothing you type leaves this page.',
    resume: (h) => `The first appeal against a private Parking Charge Notice goes to the parking company that issued it, through the channel printed on the notice, usually an online form or an email address. Under the government Code laid on ${h.date(h.CODE.laid)}, the appeal can be made within ${h.CODE.appealDays} days of delivery, the operator must answer within ${h.CODE.operatorResponseDays} days or say how long it needs, and an appeal accepted means the charge is cancelled. If the appeal is rejected, the operator must offer two choices: pay, or appeal to the independent second-stage service. When the appeal was made within ${h.CODE.appealDays} days, the rate you could have paid on the day you appealed stays available for ${h.CODE.discountHeldDays} more days after the rejection. Late appeals must still be considered when the delay comes from exceptional circumstances, such as a stay in hospital or mail sent to the wrong address. Appeals after payment are only possible where you paid to release the car or later evidence shows wrongdoing by the operator, within ${h.CODE.appealAfterPaymentDays} days of paying.`,
    faqs: (h) => [
      { q: 'Can I appeal a private parking charge after the 28 days have passed?', a: 'Under the government Code, an operator must still consider a late appeal when there is evidence of exceptional circumstances, and the period then restarts with enforcement paused. The listed examples include discovering the charge only after the appeal period, a holiday or long work trip, a stay in hospital, a move of home, a family emergency and a notice sent to the wrong address.' },
      { q: 'Does the parking company have to tell me why it rejected my appeal?', a: 'It must give you the choice between paying and taking the appeal to the second-stage service, with the details you need to do so. For members of the British Parking Association that includes a verification code for POPLA. If the rejection gives no reasons that answer your points, say so in your second-stage appeal: the assessor sees both sides.' },
      { q: 'Should I admit who was driving in my appeal?', a: 'You do not have to. A keeper can appeal as keeper, without saying who drove, and rely on the conditions of Schedule 4 in England and Wales. If you were driving and your reason concerns what happened on the day, such as a payment or an emergency, explaining it may be the simplest route. Choose before you write, because the letter cannot easily be unsaid.' },
    ],
    body: (h) => {
      const posted = '2026-11-06';
      const del = addWorkingDays(posted, h.POFA.deemedWorkingDays, 'ew');
      const by = lastDayOf(del, h.CODE.appealDays);
      return `
<h2>The appeal timetable under the Code</h2>
${h.table(['Step', 'Rule', 'Example: letter posted on ' + h.date(posted)], [
  ['Delivery of a posted notice', 'second working day after posting', h.date(del)],
  ['Last day to appeal to the operator', `${h.CODE.appealDays} days from delivery`, h.date(by)],
  ['Operator’s answer', `within ${h.CODE.operatorResponseDays} days, or a stated timetable`, 'after your appeal'],
  ['Rate held after a rejection', `${h.CODE.discountHeldDays} more days, if you appealed in time`, 'from the rejection'],
  ['Second-stage appeal', 'POPLA or IAS, as named in the rejection', 'debt recovery suspended meanwhile'],
], 'Private Parking Code of Practice, clauses 8.1.2(e), 8.3.1, 8.3.6 and 8.3.7. Example counted with the day of delivery as day one.', ['l', 'l', 'l'])}
<p>The mini-tool under the summary works out, from the date on your charge and the date of a rejection, how long the reduced rate stays open. Where the operator follows only the current industry code because the government Code is not yet in force, check the deadlines printed on your notice; the Sector Single Code already used a ${h.CODE.appealDays}-day appeal period.</p>

<h2>Reasons that carry weight</h2>
<p>The letter builder offers the reasons most often accepted. Each corresponds to a rule:</p>
<ul>
<li><strong>Keeper liability not established:</strong> the notice to keeper missed its window or lacked required content (${h.src('pofa4', 'Schedule 4, paragraphs 8 and 9')}).</li>
<li><strong>Appeals Charter cancellation cases:</strong> a minor keying error with a paid stay, a breakdown, the onset of illness, an overrunning medical appointment, childcare delays, a machine out of order with no alternative, a driver pausing to check directions on a private road, or an instruction from the emergency services or the landholder.</li>
<li><strong>Appeals Charter reduced charge cases:</strong> a valid permit not displayed, a wrong registration entered for a paid stay, a registration not entered where you were allowed to park, and, the first time, a Blue Badge not displayed: ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days.</li>
<li><strong>Grace and consideration:</strong> a stay inside the minimums of Annex B.</li>
<li><strong>Signs:</strong> terms not displayed clearly enough to form a contract.</li>
<li><strong>Amount:</strong> above the cap of ${h.gbp(h.CODE.cap)} once the Code applies.</li>
</ul>
<p>Clause 19.2 of the ${h.src('code2026', 'Code')} asks operators to give you a reasonable chance to send more evidence where what you sent is not enough to decide. If you are waiting for a document, say so in your appeal.</p>

<h2>After the operator answers</h2>
<p>An accepted appeal ends the matter: the operator must cancel the charge. A rejection must offer payment or a second-stage appeal. For operators in the British Parking Association, the rejection includes a ${h.POPLA.codeDigits}-digit code for ${h.a('popla-appeal', 'POPLA')}; for members of the International Parking Community, the route is the ${h.a('ias-appeal', 'IAS')}. While the second-stage appeal is open, debt recovery must not start or must be suspended. If you lose there too, the reduced rate no longer applies, a point the notice itself must tell you (${h.src('code2026', 'clause 8.1.2(d)')}).</p>

<h2>Practical points</h2>
<p>Keep your appeal factual and short, and attach copies of your evidence. Use the reference number on the notice in every message. Keep a copy of what you sent and the confirmation. If you are the keeper and were not driving, read the page on the ${h.a('parking-fine-not-driver', 'keeper who was not driving')} before you write. The letters here are drafting aids, not legal advice; you remain responsible for what you send.</p>`;
    },
  },
});
