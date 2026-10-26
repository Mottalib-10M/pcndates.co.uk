import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'parking-appeal-tribunal',
  group: 'appeal',
  order: 55,
  tool: { kind: 'mini:tribunal' },
  mini: { kind: 'mini:nto' },
  related: ['formal-representations', 'appeal-penalty-charge-notice', 'scotland-parking-fines', 'northern-ireland-parking-fines', 'popla-appeal'],
  sources: ['si2022_576', 'govuk_tickets', 'scot_tribunal', 'ni_pcn'],
  demarche: true,
  en: {
    slug: 'parking-appeal-tribunal',
    nav: 'Tribunal appeal',
    card: 'The independent adjudicators for council PCNs: Traffic Penalty Tribunal, London Tribunals, the First-tier Tribunal for Scotland and Northern Ireland, with your deadline.',
    title: 'Parking Appeal Tribunal: Adjudicators for Council PCNs',
    description: 'Appeal a rejected council PCN to an independent adjudicator: Traffic Penalty Tribunal, London Tribunals, Scotland, Northern Ireland. Deadline and what to send.',
    h1: 'Appealing a council PCN to the tribunal',
    intro: 'Enter the date of the notice of rejection and where the council is: the tool gives the last day to appeal to the independent adjudicator.',
    resume: (h) => `When a council rejects formal representations against a Penalty Charge Notice, the notice of rejection opens the last stage: an appeal to an independent adjudicator who is not part of the council. In England outside London and in Wales, appeals go to the Traffic Penalty Tribunal; in London, to London Tribunals; in Scotland, to the First-tier Tribunal for Scotland, General Regulatory Chamber; in Northern Ireland, to an independent adjudicator under the process run by the Department for Infrastructure. In England the appeal must be made within ${h.E.afterRejectionDays} days beginning with the day the notice of rejection is served, and in Scotland within ${h.S.appealDays} days of the notice of rejection. The adjudicator looks at the evidence from both sides, can hold a hearing by phone or video or decide on the papers, and either allows the appeal, which cancels the penalty, or refuses it, after which the full penalty must be paid within the time stated. Private parking charges are not heard by these tribunals: they go to POPLA or the IAS.`,
    faqs: (h) => [
      { q: 'Can the tribunal cancel my PCN because of mitigating circumstances?', a: 'Generally no. Adjudicators decide whether one of the statutory grounds is made out, such as the contravention not occurring or a procedural impropriety. Where only mitigation is shown, they can refer the case back to the council and recommend that it reconsider, but the council keeps the decision. Mitigation is best raised early, at the informal challenge stage, where councils have discretion.' },
      { q: 'Do I pay more if I lose at the parking tribunal?', a: `You pay the full penalty that applied when the council rejected your representations, not an increased amount, provided you pay within the time the decision gives. In Northern Ireland, nidirect says payment is due within ${h.NI.payAfterAdjudicationDays} days of losing. Leaving it unpaid after a lost appeal leads to a charge certificate and the recovery steps.` },
      { q: 'Should I ask for a hearing or let the adjudicator decide on the papers?', a: 'A hearing lets you explain and answer questions, which helps when the facts are disputed or when photographs need explaining. A decision on the papers is quicker and suits cases resting on documents, such as a receipt or a procedural date. Either way, send all your evidence with the appeal: the adjudicator can only weigh what is before them.' },
    ],
    body: (h) => `
<h2>Which tribunal hears your appeal</h2>
${h.table(['Council area', 'Tribunal', 'Time limit'], [
  ['England outside London', 'Traffic Penalty Tribunal', `${h.E.afterRejectionDays} days from service of the rejection`],
  ['Wales', 'Traffic Penalty Tribunal', 'stated on the notice of rejection'],
  ['London boroughs and TfL', 'London Tribunals', `${h.E.afterRejectionDays} days from service of the rejection`],
  ['Scotland', 'First-tier Tribunal for Scotland, General Regulatory Chamber', `${h.S.appealDays} days from the notice of rejection`],
  ['Northern Ireland', 'independent adjudicator (DfI process)', 'stated on the notice of rejection'],
], `${h.src('si2022_576', 'SI 2022/576, regulation 7')}; ${h.src('scot_tribunal', 'First-tier Tribunal for Scotland')}; ${h.src('ni_pcn', 'nidirect')}.`, ['l', 'l', 'l'])}

<h2>Counting the days in England</h2>
<p>A notice of rejection posted on ${h.date('2026-12-04')}, a Friday, is presumed served on the second working day after posting, ${h.date('2026-12-08')}. The ${h.E.afterRejectionDays} days begin that day, so the appeal must be made by ${h.date(plus('2026-12-08', h.E.afterRejectionDays - 1))}. The tool at the top does this count, with the bank holidays of England and Wales. In Scotland the tool counts from the date of the notice of rejection; in Northern Ireland, use the date printed on your notice, as nidirect does not state a single period.</p>

<h2>Preparing the appeal</h2>
<ol>
<li><strong>Use the same grounds.</strong> The appeal deals with the statutory grounds you raised in formal representations (${h.src('si2022_576', 'regulation 5')}). You can explain them more fully, and add evidence.</li>
<li><strong>Send everything.</strong> Photographs of signs and lines, receipts, permits, correspondence with dates, and the council's own evidence if it helps you.</li>
<li><strong>Read the council's case.</strong> The council sends its evidence to the tribunal and to you. Check it against your own: times, locations, the contravention code.</li>
<li><strong>Choose hearing or papers.</strong> See the question below the page for the trade-off.</li>
</ol>

<h2>What the adjudicator can decide</h2>
<p>The adjudicator allows or refuses the appeal. If allowed, the penalty is cancelled and the council must refund anything paid. If refused, the penalty is payable within the time the decision sets, usually at the full rate. Where the adjudicator finds no ground made out but sees compelling reasons, the case can be referred back to the council with a recommendation, and the council then decides whether to cancel. GOV.UK summarises the process for England in its ${h.src('govuk_tickets', 'parking tickets guide')}.</p>

<h2>Private parking charges are different</h2>
<p>None of these tribunals deals with charges from private companies. Those go first to the operator, then to POPLA or the IAS, both independent appeal services funded by the industry; see our ${h.a('popla-appeal', 'POPLA page')}. If your notice came from a company, the deadlines on this page do not apply to it.</p>

<h2>Common mistakes at the tribunal stage</h2>
<p>Three slips cost appellants most often. Missing the deadline by counting from the date printed on the rejection rather than from the day it was served, or the reverse: our tool counts the cautious way. Sending new arguments without evidence, when the adjudicator needs documents. And forgetting to read the council's evidence pack, which sometimes contains the very error that wins the appeal, such as a wrong time or location.</p>

<h2>Before you get here</h2>
<p>The second mini-tool above shows the earliest and latest dates for a Notice to Owner after a windscreen penalty, which is where the formal stage begins. Our pages on ${h.a('formal-representations', 'formal representations')} and on ${h.a('appeal-penalty-charge-notice', 'the informal challenge')} cover the steps that lead to the tribunal.</p>`,
  },
});
