import { definePage } from '../../lib/guide-types';
import { poplaDates } from '../../lib/engine/parking';

export default definePage({
  id: 'popla-appeal',
  group: 'appeal',
  order: 53,
  tool: { kind: 'mini:popla' },
  mini: { kind: 'mini:appealwin' },
  related: ['appeal-parking-charge-notice', 'ias-appeal', 'parking-fine-debt-collection', 'parking-ticket-appeal'],
  sources: ['popla', 'code2026'],
  demarche: true,
  en: {
    slug: 'popla-appeal',
    nav: 'POPLA appeal',
    card: 'The independent appeal for charges from British Parking Association members: the verification code, the evidence exchange and the decision.',
    title: 'POPLA Appeal: Deadline, Verification Code and Evidence',
    description: 'Appeal a private parking charge to POPLA: your last day from the rejection, the verification code, the evidence stages and what a decision means for you.',
    h1: 'POPLA appeal: the second stage for private parking charges',
    intro: 'Enter the date of the operator’s rejection: the tool gives the last day to appeal to POPLA and the time limits of each stage that follows.',
    resume: (h) => `POPLA, short for Parking on Private Land Appeals, is the independent service that decides second-stage appeals against parking charges issued by operators that belong to the British Parking Association. You can only use it after the operator has rejected your first appeal, and the rejection letter gives you a ${h.POPLA.codeDigits}-digit verification code, which links your POPLA appeal to that case. According to the POPLA FAQs, the appeal must be made within ${h.POPLA.appealDays} days of the rejection, the code stays valid for ${h.POPLA.appealDays} days, the operator then has ${h.POPLA.operatorEvidenceDays} days to send its evidence, you have ${h.POPLA.commentDays} days to comment on it, and the service is free for motorists. If the assessor allows the appeal, the operator must cancel the charge; if not, you are expected to pay within ${h.POPLA.payAfterDecisionDays} days of the decision, at the full rate. Under the government Code, the operator must suspend debt recovery while the appeal is open and must accept the decision. If the operator later goes to court, a judge decides the claim on the evidence.`,
    faqs: (h) => [
      { q: 'What do I do if my POPLA verification code has expired?', a: `The code from the operator's rejection is valid for ${h.POPLA.appealDays} days, so an appeal after that time is usually refused. If the delay was caused by the operator, for example a rejection sent to the wrong address, contact POPLA and the operator with evidence of the date you received it. Keep in mind that the operator may then start chasing payment.` },
      { q: 'Can I add new evidence when I appeal to POPLA?', a: `Yes. The POPLA appeal is a fresh look at the case, and you can send photographs, receipts and arguments you did not give the operator. After the operator sends its evidence, usually within ${h.POPLA.operatorEvidenceDays} days, you get ${h.POPLA.commentDays} days to comment. Use that window to answer each point in the operator's pack, especially any photographs of signs.` },
      { q: 'Is a POPLA decision binding on me?', a: 'It is binding on the operator, which must accept the decision under the government Code and cancel the charge if you win. If you lose, POPLA expects payment within the stated period. If the operator later issues a court claim, the judge decides it on the evidence put before the court, and you can file a defence in the usual way.' },
    ],
    body: (h) => {
      const rej = '2026-11-16';
      const p = poplaDates(rej);
      return `
<h2>Stages and time limits</h2>
${h.table(['Stage', 'Time limit', `Example: rejection dated ${h.date(rej)}`], [
  ['Your appeal to POPLA', `${h.POPLA.appealDays} days from the rejection`, `by ${h.date(p.lastDay)}`],
  ['Operator sends its evidence', `${h.POPLA.operatorEvidenceDays} days`, 'after your appeal is registered'],
  ['Your comments on that evidence', `${h.POPLA.commentDays} days`, 'after you receive it'],
  ['Payment if you lose', `${h.POPLA.payAfterDecisionDays} days`, 'from the decision'],
], 'Time limits from the POPLA frequently asked questions. Example counted with the day of the rejection as day one, the cautious reading.', ['l', 'l', 'l'])}
<p>Read the ${h.src('popla', 'POPLA FAQs')} again before you start, since the service updates its process. The tool at the top applies the appeal period to your own rejection date.</p>

<h2>Which charges go to POPLA</h2>
<p>POPLA handles charges from operators in the British Parking Association. Operators in the International Parking Community use the ${h.a('ias-appeal', 'Independent Appeals Service')} instead. The rejection letter names the right service and gives the code. Under the government Code, once in force, the operator must accept the decision of the second-stage service and suspend enforcement until the outcome is known (${h.src('code2026', 'Code, clauses 8.3.7 and 8.3.8')}).</p>

<h2>Writing the POPLA appeal</h2>
<p>An assessor reads both sides on paper, so structure helps. Number your points, and for each one state the ground, the rule and the evidence. Common grounds at this stage are the same as at the first: keeper liability not established under Schedule 4, unclear signs, a grace period, a paid stay or an Appeals Charter case. Add one more if the operator's rejection ignored a point you made. The builder below drafts a second-stage letter from ticked reasons.</p>
<!--tool:letter|{"kind":"second-stage"}-->
<p>When the operator's evidence arrives, check the photographs of the signs against your own, the times recorded by cameras against your payment, and whether its documents show authority from the landowner. Answer within the ${h.POPLA.commentDays} days.</p>

<h2>A worked example</h2>
<p>A driver overstays at a retail park and receives a charge on ${h.date('2026-10-12')}. The first appeal, made on ${h.date('2026-10-20')} and based on a grace period, is rejected on ${h.date(rej)}. The rejection contains the verification code. Counting the day of the rejection as day one, the POPLA appeal must be made by ${h.date(p.lastDay)}. The driver submits it a week before that date, with the exit photograph showing the time and a copy of the signs listing the type of car park. The operator sends its evidence pack within ${h.POPLA.operatorEvidenceDays} days; the driver replies within ${h.POPLA.commentDays} days, pointing out that the pack shows the entry time but not the end of the paid stay. The assessor then decides on the written file. Throughout that period, under the Code once in force, the operator may not pass the charge to a debt collector.</p>
<h2>After the decision</h2>
<p>If the appeal is allowed, the charge is cancelled and nothing more is owed. If it is refused, the charge stands at the full rate; the reduced rate ended with the first rejection, and POPLA expects payment within ${h.POPLA.payAfterDecisionDays} days. Not paying then exposes you to ${h.a('parking-fine-debt-collection', 'debt collection letters')} and possibly a ${h.a('parking-county-court-claim', 'county court claim')}, where you can still defend yourself. The ${h.a('appeal-parking-charge-notice', 'first-stage appeal page')} explains what to do before you reach POPLA.</p>`;
    },
  },
});
