import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ignore-parking-charge-notice',
  group: 'ticket',
  order: 17,
  tool: { kind: 'mini:ignore' },
  mini: { kind: 'mini:debtadd' },
  related: ['private-parking-fine', 'parking-fine-debt-collection', 'parking-county-court-claim', 'parking-charge-notice'],
  sources: ['code2026', 'pofa4', 'pap_debt', 'cpr10', 'cpr15'],
  demarche: true,
  en: {
    slug: 'ignore-parking-charge-notice',
    nav: 'What if I ignore it?',
    card: 'What really happens when a private parking charge is ignored: reminders, debt letters, a letter before claim, a county court claim, and the deadlines that matter.',
    title: 'Ignore a Parking Charge Notice? What Happens Step by Step',
    description: 'What happens if you ignore a parking charge notice: lost reduced rate, debt letters with fees, a letter before claim and possibly a county court claim.',
    h1: 'What happens if I ignore a private parking charge?',
    intro: 'Enter how many days have passed since the charge was issued: the tool shows the stage it has probably reached and the amounts the Code allows.',
    resume: (h) => `Ignoring a private Parking Charge Notice does not make it disappear, but it does not lead to a fine, a criminal record or bailiffs either. What usually follows is a sequence of letters. After ${h.CODE.discountDays} days the reduced rate is gone; after the ${h.CODE.appealDays}-day appeal period you lose the easiest way to dispute the charge; reminders and, in England and Wales, a Notice to Keeper go to the registered keeper; then a debt collection firm writes, often adding a fee that the government Code laid on ${h.date(h.CODE.laid)} limits to ${h.gbp(h.CODE.debtRecoveryMax)} once the charge is overdue. Some companies then send a letter before claim under the Pre-Action Protocol for Debt Claims, giving ${h.C.papReplyDays} days to reply, and issue a county court claim. A claim is the point where ignoring becomes truly costly: if you do not acknowledge or defend it in time, the company can obtain a judgment without a hearing, and an unpaid judgment reaches your credit file. Reading each letter and answering the court ones always matters.`,
    faqs: (h) => [
      { q: 'Do parking companies really take people to court?', a: 'Some do, regularly, and others rarely. There is no rule that tells you in advance which one you are dealing with. What is certain is that a company has to go through the county court to force payment, and that the court process has deadlines that cannot be ignored. Until a claim form arrives, letters are requests, however firmly they are worded.' },
      { q: 'Can I appeal a parking charge after ignoring it for months?', a: 'Normally the first appeal must reach the operator within 28 days of delivery. The government Code makes operators consider late appeals in exceptional circumstances, such as a stay in hospital, a long trip, a house move or a notice sent to the wrong address, and pause enforcement while they do. Explain the reason and give evidence.' },
      { q: 'Will ignoring a parking charge stop me getting credit?', a: 'Only a county court judgment that is not paid in time goes onto the public register used by lenders. Reminders, debt collection letters and even a letter before claim do not. If a claim is issued, acknowledging and defending it on time keeps the decision with a judge rather than a default judgment.' },
      { q: 'Is it worth replying to debt collection letters about a parking charge?', a: `A short reply stating that you dispute the charge, and why, costs little and creates a record. Debt collectors have no more powers than the parking company. Under the Code they must be members of an accredited parking association, and the extra fee they can add is capped at ${h.gbp(h.CODE.debtRecoveryMax)} once the Code applies.` },
    ],
    body: (h) => `
<h2>The usual sequence after a charge is ignored</h2>
${h.table(['Stage', 'What arrives', 'What you can still do'], [
  [`Days 1 to ${h.CODE.discountDays}`, 'nothing new; the notice is open at the reduced rate', 'pay at the reduced rate, or appeal'],
  [`Up to day ${h.CODE.appealDays} after delivery`, 'possibly a reminder', 'appeal to the operator'],
  [`Days ${h.POFA.ntkAfterNtdFromDay} to ${h.POFA.ntkAfterNtdToDay} after a windscreen ticket`, 'Notice to Keeper (England and Wales)', 'appeal; check it arrived in the window'],
  ['Following weeks', 'reminders, then debt collection letters', `dispute in writing; an added fee above ${h.gbp(h.CODE.debtRecoveryMax)} breaks the Code once in force`],
  ['Later', 'letter before claim', `reply within ${h.C.papReplyDays} days using the reply form`],
  ['Possibly', 'county court claim form', `acknowledge within ${h.C.aosDays} days, defend within ${h.C.defenceWithAosDays}`],
], 'Typical order. Operators choose their own reminder schedule; the legal deadlines are those of Schedule 4, the Code, the Pre-Action Protocol and the Civil Procedure Rules.', ['l', 'l', 'l'])}

<h2>What changes once the Code is in force</h2>
<p>The Private Parking Code of Practice, laid before Parliament on ${h.date(h.CODE.laid)}, gives the clearest picture of what operators may do with an unpaid charge. Before starting enforcement, they must make reasonable efforts to find the right address, including a soft trace with a credit reference agency, and if a new address is found the notice is reissued at the original rate with a fresh 28 days. Any debt recovery firm must be a full member of an accredited association. All debt-stage letters must mention free debt advice. And the add-on is a maximum of ${h.gbp(h.CODE.debtRecoveryMax)}, which the Code says is not automatically fair or recoverable (${h.src('code2026', 'Code, clauses 8.3.9, 9 and 10')}). The earliest the Code can apply is ${h.date(h.code.inForce)}.</p>

<h2>The letter that must not be ignored</h2>
<p>A letter before claim, sometimes called a letter of claim, is the formal warning that court action may follow. The ${h.src('pap_debt', 'Pre-Action Protocol for Debt Claims')} gives you ${h.C.papReplyDays} days to reply using the form enclosed, and if you ask for documents or say you are getting advice, the company should allow more time before going to court. Reply even if you think the charge is wrong: say why, and ask for the photographs and the contract with the landowner.</p>
<p>If a claim form then arrives from the county court, the clock is short. It is deemed served on the second business day after posting; you have ${h.C.aosDays} days from service to file an acknowledgment and ${h.C.defenceWithAosDays} days in total to file a defence if you acknowledged (${h.src('cpr10', 'CPR Part 10')}, ${h.src('cpr15', 'Part 15')}). Our ${h.a('parking-county-court-claim', 'county court page')} turns the date on the form into calendar dates.</p>

<h2>Two cases where silence is riskier</h2>
<p>First, when the letters are going to an old address. If you moved and did not update the DVLA, the notices and even a claim form can go to the old address, and a judgment can be entered without your knowledge. Second, when you were the driver and know the charge is owed: paying within the reduced-rate period costs least, and every later stage adds to the bill. The second mini-tool shows the total once a fee is added.</p>

<h2>A middle path</h2>
<p>Between paying straight away and ignoring everything, there is a simple option: appeal in time with your reasons. It costs nothing, it keeps the reduced rate open for ${h.CODE.discountHeldDays} days after a rejection if you appealed within ${h.CODE.appealDays} days, and it opens the free independent appeal. Our ${h.a('private-parking-fine', 'guide to whether you have to pay')} helps you decide.</p>`,
  },
});
