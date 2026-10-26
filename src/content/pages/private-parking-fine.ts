import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'private-parking-fine',
  group: 'ticket',
  order: 13,
  tool: { kind: 'ticket', props: { issuer: 'private' } },
  mini: { kind: 'mini:ignore' },
  related: ['parking-charge-notice', 'ignore-parking-charge-notice', 'appeal-parking-charge-notice', 'notice-to-keeper', 'parking-county-court-claim'],
  sources: ['pofa4', 'code2026', 'code_em', 'cpr15', 'popla'],
  demarche: true,
  en: {
    slug: 'do-i-have-to-pay-private-parking-fines',
    nav: 'Do I have to pay a private ticket?',
    card: 'Private parking tickets are contract claims, not fines. When you are bound to pay, when you are not, and what the company can really do.',
    title: 'Private Parking Fines: When You Have to Pay and When Not',
    description: 'Do you have to pay a private parking fine? It is a contract claim, not a penalty. See when the keeper is liable, how to appeal and what a company can really do.',
    h1: 'Do I have to pay a private parking ticket?',
    intro: 'Check first that the notice really comes from a company: the checker confirms the type and the next step, with the dates that apply to it.',
    resume: (h) => `A private parking ticket is not a fine: it is a parking charge claimed by a company under a contract that the signs of the car park say you accepted by parking. You have to pay it only if the charge is owed, which means clear signs that formed a contract, terms that were actually broken, and a sum that a court would consider a fair charge rather than an unfair penalty. In England and Wales the company can claim from the registered keeper when it does not know who drove, but only under Schedule 4 to the Protection of Freedoms Act 2012, which sets strict contents and dates for its notices; in Scotland and Northern Ireland that route does not exist. The company cannot fine you, add points or send bailiffs on its own: its only means of forcing payment is a county court claim. Appealing first to the operator within ${h.CODE.appealDays} days, then to POPLA or the IAS, costs nothing, and paying within ${h.CODE.discountDays} days keeps the reduced rate if you decide the charge is due.`,
    faqs: (h) => [
      { q: 'What happens if I simply never pay a private parking ticket?', a: `The company sends reminders, then usually passes the file to a debt collector, which may add a fee that the government Code limits to ${h.gbp(h.CODE.debtRecoveryMax)} once in force. Some companies then send a letter before claim and issue proceedings in the county court. Others stop. Nobody can predict which, so ignoring court papers is the one step that is never safe.` },
      { q: 'Am I liable if I was the keeper but a friend was driving?', a: 'In England and Wales you can be, but only if the company followed Schedule 4 to the Protection of Freedoms Act 2012: a notice to keeper with the required wording, delivered inside the period the law sets, and a wait of 28 days before pursuing you. If any condition fails, it must show who was driving. You are not obliged to name the driver.' },
      { q: 'Are private parking tickets enforceable in Scotland?', a: 'They can be, as a contract claim against the driver, but Schedule 4 to the Protection of Freedoms Act 2012 does not apply in Scotland, so the company cannot rely on that law to make the registered keeper pay. It has to show who was driving. The same is true in Northern Ireland. The government Code, once in force, applies in Scotland too.' },
      { q: 'Should I pay a private ticket to make it go away even if I think it is unfair?', a: `That is your choice, but once paid, the Code lets the company refuse any later appeal, except where you paid only to release a barrier or new evidence shows wrongdoing, and then within ${h.CODE.appealAfterPaymentDays} days. If you intend to dispute it, appeal first: an appeal made within ${h.CODE.appealDays} days keeps the reduced rate open for ${h.CODE.discountHeldDays} days after a rejection.` },
    ],
    body: (h) => `
<h2>The three things a company must be able to show</h2>
<p>Because a private charge is a contract claim, the burden sits with the company. In any appeal, and before any judge, it has to establish:</p>
<ol>
<li><strong>A contract.</strong> Signs at the entrance and in the car park that a driver could see and read, stating the terms and the sum charged for breaking them. Small print high up on a pole, or a sign placed after the bays, weakens that case.</li>
<li><strong>A breach.</strong> Evidence that the terms were broken: camera times, a photograph of the car outside a bay, a missing payment. A camera that records entry and exit times includes the time spent queuing and looking for a space, which is why the Code sets consideration and grace periods.</li>
<li><strong>The right person.</strong> The driver, or the keeper under the conditions of ${h.src('pofa4', 'Schedule 4')} in England and Wales.</li>
</ol>

<h2>When you are more likely to owe it</h2>
${h.table(['Situation', 'Likely position'], [
  ['Clear signs, you stayed well beyond the paid time', 'the charge is probably owed; pay within the reduced-rate period'],
  ['You paid but typed one character of the registration wrongly', 'the Code tells operators to cancel on appeal, with proof of payment'],
  [`You stayed a few minutes over`, 'check the grace period for that type of car park before paying'],
  ['You were the keeper, not the driver, and the letter came late', 'the keeper may not be liable under Schedule 4; appeal on that ground'],
  ['The car park was in Scotland or Northern Ireland and you were not driving', 'Schedule 4 does not apply; the company must show who drove'],
], 'General positions drawn from the Private Parking Code and Schedule 4. The operator, the appeals service or a court decides each case.', ['l', 'l'])}

<h2>What the company cannot do</h2>
<p>A parking company has no power to fine, to issue penalty points, to clamp in England and Wales (that is an offence under section 54 of the Protection of Freedoms Act 2012 unless a fixed barrier was there when you parked), or to send enforcement agents without first winning in court. Its debt collectors have no more powers than the company itself. The government Code requires every letter at the debt stage to say that free debt advice is available, and bans the words offence, offender and crime on its notices (${h.src('code2026', 'Code, clause 8.3.9 and Annex D')}).</p>
<p>What a company can do is apply to the county court. The court process has its own deadlines: if a claim form arrives, you have ${h.C.aosDays} days from service to acknowledge it and ${h.C.defenceWithAosDays} days to file a defence if you acknowledged (${h.src('cpr15', 'Civil Procedure Rules, Part 15')}). Missing those can lead to a judgment without a hearing. Our ${h.a('parking-county-court-claim', 'court claim page')} counts the dates.</p>

<h2>A sensible order of steps</h2>
<p>Take photographs of the signs and of where you parked, as soon as you can. Decide within the first days whether you dispute the charge. If you do, appeal to the operator within ${h.CODE.appealDays} days with your evidence; the ${h.a('appeal-parking-charge-notice', 'letter builder')} drafts it. If the appeal is rejected, the second stage with ${h.src('popla', 'POPLA')} or the IAS is free, and enforcement must pause while it runs. If you do not dispute it, paying early is cheapest. The mini-tool above places a charge that has been left alone for a given number of days on that path.</p>

<h2>A note on the Code</h2>
<p>Many protections quoted here come from the government Private Parking Code of Practice laid on ${h.date(h.CODE.laid)}. The government explains that it is not directly enforceable in law but that operators who break it can lose access to DVLA keeper data (${h.src('code_em', 'explanatory memorandum, paragraph 4.3')}). It applies from its entry into force, at the earliest on ${h.date(h.code.inForce)}.</p>`,
  },
});
