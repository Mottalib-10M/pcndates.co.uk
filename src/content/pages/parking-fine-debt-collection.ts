import { definePage } from '../../lib/guide-types';
import { papReply } from '../../lib/engine/parking';

export default definePage({
  id: 'parking-fine-debt-collection',
  group: 'appeal',
  order: 56,
  tool: { kind: 'mini:debtadd' },
  mini: { kind: 'mini:ignore' },
  related: ['parking-county-court-claim', 'ignore-parking-charge-notice', 'popla-appeal', 'parking-charge-notice'],
  sources: ['code2026', 'pap_debt'],
  demarche: true,
  en: {
    slug: 'parking-fine-debt-collection',
    nav: 'Debt collection letters',
    card: 'Letters from a debt recovery agent about a private parking charge: what can be added, what collectors cannot do, and when a letter of claim changes things.',
    title: 'Parking Fine Debt Collection: Letters, Fees and Your Rights',
    description: 'Debt collection letters for a private parking charge: the fee limit in the Code, what collectors cannot do, the letter of claim and its 30-day reply period.',
    h1: 'Debt collection letters for a parking charge',
    intro: 'Enter the original charge and the fee added in the letter: the tool compares the total with what the government Code allows once it is in force.',
    resume: (h) => `When a private parking charge stays unpaid after the reminders, many operators pass it to a debt recovery agent, a company that writes, emails and sometimes phones to ask for payment, usually with an extra fee added. A debt collector chasing a parking charge is not an enforcement agent: it has no court order, cannot take goods and cannot enter your home. Under the government Code laid on ${h.date(h.CODE.laid)}, once in force, up to ${h.gbp(h.CODE.debtRecoveryMax)} may be added to an overdue charge for debt recovery, and the Code adds that this maximum is not automatically fair or recoverable. Agents must be full members of an accredited parking association, letters may mention free debt advice only once the charge is overdue, and an operator must make reasonable efforts to find the right address before enforcing. The tone changes with a letter of claim under the Pre-Action Protocol for Debt Claims: it gives you ${h.C.papReplyDays} days to reply before court proceedings and comes with a reply form. That letter deserves an answer, whatever you think of the charge.`,
    faqs: (h) => [
      { q: 'Can a debt collector come to my house about a parking charge?', a: 'A debt collector working for a parking company has no legal power to enter your home or take your belongings. Only enforcement agents acting under a court order or a warrant can take control of goods, and for a private parking charge that would require a county court judgment that you did not pay. A visit from a collector is a request, which you can decline.' },
      { q: 'Is the extra fee added by a parking debt collector legal?', a: `The government Code allows up to ${h.gbp(h.CODE.debtRecoveryMax)} to be added once a charge is overdue, for debt recovery only, and says this does not mean the fee is fair or recoverable in every case. It must also have been possible for drivers to see such a term before parking. The government has said it will consult again on these fees, so check for updates.` },
      { q: 'Should I reply to parking debt collection letters?', a: 'Ordinary collection letters do not have to be answered, and many drivers who are disputing a charge write once, to say so and to ask that the matter be referred back to the operator. A letter of claim is different: it starts the pre-action stage of a court claim and gives a set period to reply with a form. Ignoring that one can lead straight to a claim.' },
    ],
    body: (h) => {
      const loc = '2026-11-23';
      const r = papReply(loc);
      return `
<h2>What the Code says about recovery</h2>
${h.table(['Rule', 'Effect', 'Clause'], [
  ['Debt recovery add-on', `up to ${h.gbp(h.CODE.debtRecoveryMax)}, only once the charge is overdue`, '9.1'],
  ['Fairness', 'the maximum is not automatically fair or recoverable; terms must have been visible before parking', '9.2'],
  ['Tracing', 'reasonable efforts, including a soft credit search, to find the correct address before enforcing', '10'],
  ['New address found', `the charge is reissued at the original rate, with a fresh period of ${h.CODE.appealDays} days to pay or appeal`, '10'],
  ['Collectors', 'must be full members of an accredited parking association', '10'],
  ['Debt advice', 'letters must say free debt or legal advice is available, but only once overdue', '8.3.9'],
  ['Second-stage appeal open', 'debt recovery must not start, or must be suspended', '8.3.7'],
], `Private Parking Code of Practice as laid on ${h.date(h.CODE.laid)}. Applies once in force.`, ['l', 'l', 'r'])}
<p>The reissue rule matters for anyone who moved house: if the operator finds your new address, the ${h.src('code2026', 'Code')} requires it to send the charge again at the original rate, with a new period of ${h.CODE.appealDays} days, rather than piling fees onto a notice you never received.</p>

<h2>Collectors, solicitors and enforcement agents</h2>
<p>Three kinds of letter can follow an unpaid charge, and they carry different weight:</p>
<ul>
<li><strong>Debt recovery letters</strong> from a collection company: a request for payment, with no court behind it.</li>
<li><strong>A letter of claim</strong>, often from a solicitor acting for the operator, under the Pre-Action Protocol for Debt Claims: the formal step before a court claim.</li>
<li><strong>Enforcement agent letters</strong>, which can only follow a court judgment or warrant. For a private charge that means a county court judgment that was not paid; council penalties follow their own route, covered on the ${h.a('parking-fine-bailiffs', 'bailiffs page')}.</li>
</ul>

<h2>Answering a letter of claim</h2>
<p>Paragraph 3.4 of the ${h.src('pap_debt', 'Pre-Action Protocol for Debt Claims')} gives the debtor ${h.C.papReplyDays} days to reply before the creditor starts proceedings. A letter dated ${h.date(loc)} therefore asks for a reply by ${h.date(r.reply)}. The letter must include a reply form, an information sheet and a financial statement form. Use the reply form to say whether you dispute the debt and why, or whether you need more time, for example to get advice or documents: the protocol then expects the creditor to allow a reasonable period, and our mini-tool on the court page shows a further ${h.C.papExtraDays} days as an example. Ask for copies of the evidence, such as the photographs, the signs and the landowner's authority, if you have not seen them.</p>

<h2>Your choices at this stage</h2>
<p><strong>If you accept the charge</strong>, you can offer to pay the original amount and ask for the added fee to be removed, pointing to the Code. <strong>If you dispute it</strong>, set out your reasons once, in writing, and keep a copy; the same grounds will form your defence if a claim is issued. <strong>If you were never told of the charge</strong>, say so, with your previous address, and ask for it to be reissued under clause 10. The ${h.a('parking-county-court-claim', 'county court page')} lists the deadlines if a claim form arrives, and the ${h.a('ignore-parking-charge-notice', 'page on ignoring a charge')} explains how each stage follows the last.</p>`;
    },
  },
});
