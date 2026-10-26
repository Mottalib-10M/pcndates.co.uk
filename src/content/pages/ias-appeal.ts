import { definePage } from '../../lib/guide-types';
import { lastDayOf } from '../../lib/engine/parking';

export default definePage({
  id: 'ias-appeal',
  group: 'appeal',
  order: 54,
  tool: { kind: 'mini:ias' },
  mini: { kind: 'mini:appealwin' },
  related: ['popla-appeal', 'appeal-parking-charge-notice', 'parking-ticket-appeal', 'parking-fine-debt-collection'],
  sources: ['ias', 'code2026', 'code_em'],
  demarche: true,
  en: {
    slug: 'ias-appeal',
    nav: 'IAS appeal',
    card: 'The Independent Appeals Service for charges from International Parking Community members: when to use it and how to work out your deadline.',
    title: 'IAS Appeal: Independent Appeals Service for Parking Charges',
    description: 'Appealing a private parking charge to the IAS: which operators it covers, why to read the time limit in your rejection letter and how to prepare the case.',
    h1: 'IAS appeal: the Independent Appeals Service',
    intro: 'Enter the date of the operator’s rejection and the number of days it gives you: the tool turns them into your last day to appeal.',
    resume: (h) => `The Independent Appeals Service, known as the IAS, decides second-stage appeals against parking charges issued by operators that belong to the International Parking Community, one of the two accredited trade associations of private parking companies. It plays the same role as POPLA does for members of the British Parking Association: you use it only after the operator has rejected your first appeal, and the rejection should name it and tell you how to appeal. We do not print a fixed IAS time limit on this site, because the published sources we read did not agree on it; the safe course is to take the period stated in your rejection letter or on the IAS appeal pages, and to appeal well before it ends. Under the government Code laid on ${h.date(h.CODE.laid)}, once it is in force, an operator must suspend debt recovery while a second-stage appeal is open and must accept the decision. If the appeal is allowed, the charge is cancelled; if not, the full charge is due.`,
    faqs: (h) => [
      { q: 'How do I know whether my appeal goes to the IAS or to POPLA?', a: 'The operator decides by its membership: members of the International Parking Community use the IAS, members of the British Parking Association use POPLA. The rejection of your first appeal should say which service applies and give you the reference you need. The operator’s website and its notices usually carry the logo of its trade association as well.' },
      { q: 'Why does this site not give a fixed deadline for IAS appeals?', a: 'When we checked, the published information we could read pointed to different periods, and we only print a time limit we can confirm on an official or primary source. A deadline taken from the wrong source could make you miss your appeal. The tool on this page therefore asks you for the number of days written in your own rejection letter.' },
      { q: 'Can I appeal to the IAS without first appealing to the operator?', a: `No. The IAS is a second stage. Your first appeal goes to the parking company that issued the charge, within the time on the notice, which the government Code sets at ${h.CODE.appealDays} days from delivery. Only a rejection of that appeal opens the IAS route. Keep the rejection letter, since it carries the details the IAS will ask for.` },
    ],
    body: (h) => {
      const rej = '2026-11-20';
      return `
<h2>Where the IAS fits</h2>
${h.table(['Stage', 'Who decides', 'Time limit to check'], [
  ['First appeal', 'the parking operator', `${h.CODE.appealDays} days from delivery under the Code`],
  ['Second-stage appeal', 'the Independent Appeals Service', 'as stated in the rejection letter or on the IAS site'],
  ['Payment if the appeal is refused', 'you', 'as stated in the decision'],
  ['Court, if the operator sues', 'a county court judge', 'the dates on the claim form'],
], 'The IAS process for members of the International Parking Community. Information for motorists: theias.org.', ['l', 'l', 'l'])}
<p>The ${h.src('ias', 'IAS pages for motorists')} describe how to submit an appeal. Read them on the day you receive the rejection, and note the date on which your period ends.</p>

<h2>Working out your deadline</h2>
<p>The tool at the top counts from the date of the rejection, with that day as day one, which gives the earliest possible end. Suppose a rejection dated ${h.date(rej)} gives a certain number of days: entering 21 gives ${h.date(lastDayOf(rej, 21))}, entering 28 gives ${h.date(lastDayOf(rej, 28))}. These two figures are examples only, to show how much the end date moves; enter the period your letter actually states. If the letter states no period, ask the operator in writing and keep its answer.</p>

<h2>What the government Code changes for the IAS</h2>
<p>The government Code sets common rules for both second-stage services once it comes into force. While an appeal is open, the operator must not start debt recovery, or must suspend it; the operator must accept the decision; and the original notice must have told you that a rejected first appeal can go to the appropriate second-stage service, but that the reduced rate no longer applies if that appeal is rejected too (${h.src('code2026', 'Code, clauses 8.1.2(d), 8.3.7 and 8.3.8')}). The explanatory memorandum adds that the Code is backed by a certification scheme and a Scrutiny and Oversight Board that will review how appeals work (${h.src('code_em', 'memorandum, paragraphs 5.6 and 10.2')}).</p>

<h2>Before you send anything</h2>
<p>Check three things on the rejection letter: that it names the IAS as the second-stage service, that it gives the reference or code needed to open an appeal, and the period allowed. If any of them is missing, write to the operator straight away and ask for it, keeping a copy of your request. A rejection that does not tell you about the independent stage falls short of what the notice and the Code require, and that point can itself support your case.</p>
<h2>Preparing an IAS appeal</h2>
<ul>
<li>Restate each reason from your first appeal, and answer any point the operator made when rejecting it.</li>
<li>Attach your evidence again: photographs, receipts, permits, medical or breakdown records.</li>
<li>Where the keeper is pursued in England or Wales, check the dates and content of the notice to keeper against Schedule 4, as explained on our ${h.a('notice-to-keeper', 'Notice to Keeper page')}.</li>
<li>Where the Code applies, cite the Appeals Charter case or the Annex B grace period that fits.</li>
</ul>
<p>The builder on the ${h.a('popla-appeal', 'POPLA page')} produces a second-stage letter that works for the IAS as well, and the ${h.a('appeal-parking-charge-notice', 'first-stage page')} lists the grounds in detail. If the appeal fails and you do not pay, the next steps are ${h.a('parking-fine-debt-collection', 'debt collection letters')} and possibly a court claim.</p>`;
    },
  },
});
