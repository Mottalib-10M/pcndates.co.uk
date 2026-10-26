import { definePage } from '../../lib/guide-types';
import { courtDates } from '../../lib/engine/parking';

export default definePage({
  id: 'parking-county-court-claim',
  group: 'appeal',
  order: 57,
  tool: { kind: 'mini:court' },
  mini: { kind: 'mini:letterclaim' },
  related: ['parking-fine-debt-collection', 'parking-fine-not-driver', 'popla-appeal', 'parking-charge-notice'],
  sources: ['cpr6', 'cpr10', 'cpr15', 'pap_debt', 'bankhol'],
  demarche: true,
  en: {
    slug: 'parking-county-court-claim',
    nav: 'County court claim',
    card: 'A claim form for a private parking charge: deemed service, the 14-day acknowledgment, the defence deadline and what not to miss.',
    title: 'County Court Claim for a Parking Charge: Response Deadlines',
    description: 'Received a county court claim for a parking charge? Work out deemed service, the deadline to acknowledge, the defence date and why replying in time matters.',
    h1: 'County court claim for a parking charge: the deadlines',
    intro: 'Enter the date the claim form was posted, printed on it: the tool gives deemed service, the acknowledgment deadline and both defence dates.',
    resume: (h) => `A private parking company can only make you pay a disputed charge by suing you in the county court. Before that, the Pre-Action Protocol for Debt Claims expects it to send a letter of claim and give you ${h.C.papReplyDays} days to reply. The claim form itself usually comes from the court's bulk centre by post. Under the Civil Procedure Rules, a claim form posted by the court is deemed served on the second business day after posting, bank holidays and weekends left out. You then have ${h.C.aosDays} days after service of the particulars of claim to file an acknowledgment of service, and ${h.C.defenceDays} days to file a defence, extended to ${h.C.defenceWithAosDays} days if you acknowledge in time. Missing these dates allows the company to ask for judgment in default, without a hearing, and an unpaid judgment can reach your credit file. Acknowledging the claim and filing a defence keeps your case alive; a defence sets out, in your own words, why the charge is not owed, and the case then moves to the small claims track.`,
    faqs: (h) => [
      { q: 'What happens if I ignore a county court claim for a parking charge?', a: 'The company can ask the court for judgment in default once the time for acknowledging or defending has passed, without any hearing on the merits. You would then owe the amount of the judgment, and if it is not paid within the time the court allows it can be recorded against you and enforced. Responding in time costs nothing extra and preserves every argument.' },
      { q: 'How is the date of service of a parking claim form worked out?', a: `Rule 6.14 deems a claim form served on the second business day after the step taken to serve it, such as posting. A business day excludes Saturdays, Sundays and bank holidays. A form posted on a Friday is therefore deemed served on the Tuesday, and later still around a bank holiday. The response periods run from that deemed date.` },
      { q: 'Does acknowledging a parking claim mean I accept the debt?', a: `No. An acknowledgment of service only tells the court that you received the claim and intend to respond, and that you may defend all or part of it. Its practical effect is to extend the time for your defence from ${h.C.defenceDays} to ${h.C.defenceWithAosDays} days after service of the particulars of claim. The defence itself is where you set out why you dispute the charge.` },
    ],
    body: (h) => {
      const fri = '2026-12-23';
      const c = courtDates(fri);
      return `
<h2>The timetable, from posting to defence</h2>
${h.table(['Step', 'Rule', `Claim form posted ${h.date(fri)}`], [
  ['Deemed service', `second business day after posting (CPR 6.14)`, h.date(c.served)],
  ['Acknowledgment of service', `${h.C.aosDays} days after service of the particulars (CPR 10.3)`, h.date(c.aos)],
  ['Defence, without acknowledgment', `${h.C.defenceDays} days after service (CPR 15.4)`, h.date(c.defence)],
  ['Defence, after acknowledging', `${h.C.defenceWithAosDays} days after service (CPR 15.4)`, h.date(c.defenceWithAos)],
], 'Our reading of the Civil Procedure Rules, with England and Wales bank holidays from GOV.UK. The example falls just before Christmas: the bank holidays push deemed service back.', ['l', 'l', 'l'])}
<p>The example uses a date just before Christmas on purpose: ${h.src('bankhol', 'bank holidays')} on Christmas Day and the substitute Boxing Day holiday are not business days, so service and every later date move. The tool at the top applies the same counting to your own date. Always compare its result with the dates printed on the claim form and in the notes that come with it.</p>

<h2>Before the claim: the letter of claim</h2>
<p>The ${h.src('pap_debt', 'Pre-Action Protocol for Debt Claims')} applies when a business claims a debt from an individual. The creditor sends a letter of claim with a reply form, an information sheet and a financial statement, and should wait ${h.C.papReplyDays} days for your reply before issuing proceedings. If you reply that you need documents or advice, the protocol expects the creditor to allow reasonable time; the mini-tool under the summary shows the date with a further ${h.C.papExtraDays} days. A full reply at this stage, setting out your grounds, often shapes what happens next, and a court can take into account whether either side followed the protocol.</p>

<h2>Acknowledging and defending</h2>
<p>Most parking claims are issued through the court's online bulk service, and the claim form explains how to respond online. Acknowledging under ${h.src('cpr10', 'Part 10')} buys time. The defence under ${h.src('cpr15', 'Part 15')} must say which parts of the claim you deny and why, and give your own version of events. Typical defences mirror the appeal grounds: no contract because the signs were unclear, the keeper not liable because Schedule 4 was not followed, a paid stay, a grace period, an amount above what the terms allowed. If you were the keeper but not the driver, the page on the ${h.a('parking-fine-not-driver', 'keeper who was not driving')} explains the conditions the company must prove.</p>

<h2>After the defence</h2>
<p>Once a defence is filed, the court sends directions questionnaires and, for claims of this size, the case is normally allocated to the small claims track, where hearings are informal and the costs that can be claimed from the losing side are limited. You can still settle at any point by agreement. If you decide to pay, do it through the claimant and get written confirmation that the claim will be discontinued. The service rules come from ${h.src('cpr6', 'Part 6')} of the Civil Procedure Rules; for the letters that come before a claim, see the ${h.a('parking-fine-debt-collection', 'debt collection page')}. This site does not give legal advice; free advice is available from advice agencies, and the court forms explain each step.</p>`;
    },
  },
});
