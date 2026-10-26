import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'parking-charge-notice',
  group: 'ticket',
  order: 10,
  tool: { kind: 'countdown', props: { mode: 'private' } },
  mini: { kind: 'mini:privatecap' },
  related: ['appeal-parking-charge-notice', 'notice-to-keeper', 'popla-appeal', 'pcn-vs-parking-charge-notice', 'parking-code-of-practice'],
  sources: ['pofa4', 'code2026', 'code_em', 'govuk_tickets', 'popla', 'ias'],
  demarche: true,
  en: {
    slug: 'parking-charge-notice',
    nav: 'Parking Charge Notice',
    card: 'A private company’s parking charge: what it is in law, the 14-day reduced rate, every appeal date and when the keeper can be pursued.',
    title: 'Parking Charge Notice: Dates, Amounts and Appeal Rules',
    description: 'A Parking Charge Notice from a company is not a fine. See the 14-day reduced rate, the 28-day appeal, Notice to Keeper dates and the £100 cap of the new Code.',
    h1: 'Parking Charge Notice: what it is and every date that matters',
    intro: 'Enter the date printed on your notice and how it reached you: the countdown lists the reduced rate, the appeal deadline and the Notice to Keeper window.',
    resume: (h) => `A Parking Charge Notice is a demand sent by a private parking company, on behalf of a landowner, when it says the driver broke the terms displayed on the signs of a car park: overstaying, not paying, parking outside a bay or without a permit. It is not a fine and it is not issued under any power of a council or the police: it is a claim under contract, and only a county court can order you to pay it. In England and Wales, Schedule 4 to the Protection of Freedoms Act 2012 lets the company pursue the registered keeper when the driver is not named, but only if its notices meet strict conditions and arrive within set dates; in Scotland and Northern Ireland that Schedule does not apply. The Private Parking Code of Practice laid before Parliament on ${h.date(h.CODE.laid)} caps a charge at ${h.gbp(h.CODE.cap)}, requires at least ${h.CODE.discountMinPct}% off for payment within ${h.CODE.discountDays} days, gives ${h.CODE.appealDays} days to appeal and limits the debt recovery fee to ${h.gbp(h.CODE.debtRecoveryMax)}. It applies from the day it comes into force, which the government has not yet fixed.`,
    faqs: (h) => [
      { q: 'Is a Parking Charge Notice a legal fine?', a: 'No. Only councils, Transport for London and the police issue penalties set by law. A Parking Charge Notice comes from a company that manages private land and says you agreed to its terms by parking. If you do not pay, it can send reminders and debt letters, and its only route to force payment is a claim in the county court.' },
      { q: 'How long do I have to pay a Parking Charge Notice at the reduced rate?', a: `Under the government Code the reduced rate must last at least ${h.CODE.discountDays} days from the date of issue, with at least ${h.CODE.discountMinPct}% off. For a notice fixed to the car the period starts on the day it was issued; for a notice sent by post it starts on the date of issue printed on it. The notice itself states the exact amount and date.` },
      { q: 'Can I still appeal after paying a private parking charge?', a: `Usually not. The Code lets an operator refuse an appeal once the charge is paid, with two exceptions: you paid only to get out through a barrier, or new evidence shows the operator did something wrong. In both cases the appeal must reach the operator within ${h.CODE.appealAfterPaymentDays} days of the payment.` },
      { q: 'Who decides an appeal against a Parking Charge Notice?', a: `First the operator, which must answer within ${h.CODE.operatorResponseDays} days or say how long it needs. If it rejects your appeal, you can go to the independent service named on the rejection: POPLA for members of the British Parking Association, or the IAS for members of the International Parking Community. Debt collection must pause while that second appeal is open.` },
      { q: 'Does an unpaid Parking Charge Notice affect my credit score?', a: 'Not by itself. An unpaid private charge is not reported to credit reference agencies as a fine would be. It only reaches your credit file if the company takes you to the county court, wins, and the judgment is then not paid within the time the court allows. Answering letters and court papers on time avoids that outcome.' },
    ],
    body: (h) => `
<h2>What the notice is, in law</h2>
<p>When you park on private land, the signs at the entrance and around the car park set out the terms of a contract: how long you may stay, what you must pay, who may park where, and what you owe if you break those terms. The parking company acts for the landowner. If its attendant or camera records a breach, it sends a Parking Charge Notice for the sum displayed on the signs. That is why a court, not the company, decides in the end whether the money is owed: the company must show that the terms were clear enough to form a contract and that they were broken.</p>
<p>The government explanatory memorandum puts it plainly: the private parking sector is largely governed by contract law, and the Code does not change that law. What the Code changes is the behaviour expected from companies that want to keep access to DVLA keeper records. A company that breaks it can lose that access, which in practice stops it from tracing keepers (${h.src('code_em', 'explanatory memorandum, paragraphs 4.3 and 6.1')}).</p>

<h2>Windscreen ticket or letter: two routes</h2>
<p>A notice fixed to the windscreen or handed to the driver is a notice to driver. A notice sent by post to the registered keeper, usually after a camera read the number plate, is a notice to keeper. The dates that follow depend on which one you have:</p>
${h.table(['Step', 'Windscreen ticket first', 'Letter by post only'], [
  ['Reduced rate', `${h.CODE.discountDays} days from the day it was issued`, `${h.CODE.discountDays} days from the date of issue printed on it`],
  ['First appeal to the operator', `${h.CODE.appealDays} days from delivery`, `${h.CODE.appealDays} days from delivery (second working day after posting)`],
  ['Notice to Keeper must arrive', `between day ${h.POFA.ntkAfterNtdFromDay} and day ${h.POFA.ntkAfterNtdToDay} after the windscreen ticket`, `within ${h.POFA.ntkNoNtdDays} days beginning the day after the parking ended`],
  ['Keeper can be pursued', `${h.POFA.keeperLiableAfterDays} days after the Notice to Keeper`, `${h.POFA.keeperLiableAfterDays} days after the Notice to Keeper`],
], 'England and Wales. Schedule 4 to the Protection of Freedoms Act 2012, paragraphs 4, 8 and 9; Private Parking Code clauses 8.2.2 and 8.3.1.', ['l', 'l', 'l'])}
<p>The countdown at the top of this page applies these rules to your date. A posted notice is presumed delivered on the second working day after posting, weekends and bank holidays in England and Wales left out, unless you can show it arrived later (${h.src('pofa4', 'Schedule 4, paragraphs 8(6) and 9(6)')}). Keep the envelope if the postmark or the date of arrival helps you.</p>

<h2>How much a private parking charge can be</h2>
<p>Under the government Code, laid on ${h.date(h.CODE.laid)}, a parking charge cannot exceed ${h.gbp(h.CODE.cap)}, and a payment within ${h.CODE.discountDays} days must earn at least ${h.CODE.discountMinPct}% off, so ${h.gbp(h.CODE.cap * (1 - h.CODE.discountMinPct / 100))} or less on a charge at the cap. When a driver left without paying a tariff above ${h.gbp(h.CODE.tariffPursuitOver)}, an approved operator may claim that tariff on top of the charge. Once a charge is overdue, up to ${h.gbp(h.CODE.debtRecoveryMax)} may be added for debt recovery. The Code says itself that these are maximums: a charge at the cap is not automatically fair or recoverable (${h.src('code2026', 'clauses 8.2 and 9')}).</p>
<!--tool:mini:debtadd-->
<p>These limits apply from the day the Code comes into force. Until then, the companies follow the code of their trade association, the Sector Single Code in effect since October 2024, which the government Code will replace. Our ${h.a('parking-code-of-practice', 'page on the Code')} tracks the date.</p>

<h2>Your options, in order</h2>
<p><strong>If you accept the charge</strong>, paying inside the reduced-rate period costs least. Pay only through the channel printed on the notice and keep the receipt. <strong>If you dispute it</strong>, appeal to the operator within ${h.CODE.appealDays} days with your reasons and evidence: photographs of the signs, a payment receipt, a breakdown report. The Code lists cases where the operator must cancel, such as a minor keying error in the registration you paid for, and cases where it must reduce the charge to ${h.gbp(h.CODE.reducedCharge)}, such as a valid permit not displayed. Our ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} turns ticked reasons into a letter.</p>
<p>If you appeal within ${h.CODE.appealDays} days and the operator rejects it, the rate you could have paid on the day you appealed stays open for ${h.CODE.discountHeldDays} more days. You can then pay, or go to the independent appeals service named in the rejection: ${h.a('popla-appeal', 'POPLA')} or the ${h.a('ias-appeal', 'IAS')}. While that second appeal runs, debt recovery must stop (${h.src('code2026', 'clauses 8.1.2(e) and 8.3.7')}).</p>

<h2>Signs that the notice may not hold</h2>
<ul>
<li>It arrived by post more than ${h.POFA.ntkNoNtdDays} days after the day you parked, with no windscreen ticket before it: the keeper cannot be made liable under Schedule 4 by that notice (check with our ${h.a('notice-to-keeper', 'Notice to Keeper checker')}).</li>
<li>It calls itself a fine or a penalty, or speaks of an offence or a crime: the Code bans those words and any design that imitates a council notice.</li>
<li>The time recorded is within the grace period after your paid time ended, or within the consideration period on arrival: see our ${h.a('parking-grace-period', 'grace period page')}.</li>
<li>The amount, once the Code applies, is above ${h.gbp(h.CODE.cap)}, or the added fees above ${h.gbp(h.CODE.debtRecoveryMax)}.</li>
</ul>
<p>None of these is decided by this site: the operator, then the appeals service, then a court decides. The tools here tell you which dates and limits the texts set, so you can act before they pass.</p>`,
  },
});
