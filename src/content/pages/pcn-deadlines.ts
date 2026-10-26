import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'pcn-deadlines',
  group: 'ticket',
  order: 16,
  tool: { kind: 'countdown', props: { mode: 'council' } },
  mini: { kind: 'mini:reduced' },
  related: ['penalty-charge-notice', 'notice-to-owner', 'charge-certificate', 'formal-representations', 'parking-appeal-tribunal'],
  sources: ['si2022_71', 'si2022_576', 'govuk_tickets', 'bankhol'],
  demarche: true,
  en: {
    slug: 'parking-fine-deadlines',
    nav: 'How long to pay a PCN',
    card: 'How long you have to pay or challenge a council parking fine: 14 or 21 days, then 28-day stages, with posted notices and bank holidays counted.',
    title: 'Parking Fine Deadlines: How Long to Pay or Challenge a PCN',
    description: 'How long do you have to pay a parking fine? 14 days at half price, 21 for camera notices by post, then 28-day stages to the charge certificate. Dates for yours.',
    h1: 'How long do I have to pay or challenge a parking fine?',
    intro: 'Enter the date on your notice and how it arrived: the countdown lists every deadline with the amount due, and saves them to your calendar.',
    resume: (h) => `A council parking fine runs on a strict clock set by regulations. In England the reduced rate, half the penalty, lasts ${h.E.discountDays} days beginning with the day the notice is served, or ${h.E.discountDaysCameraPost} days when a camera notice comes by post. A notice fixed to the car is served that day; a posted one counts as served on the second working day after posting, with weekends and bank holidays left out. If nothing is paid within ${h.E.ntoAfterDays} days, the council can post a Notice to Owner, which opens ${h.E.representationsDays} days to pay the full amount or make formal representations; the council then has ${h.E.councilDecisionDays} days to decide. When the Notice to Owner period passes without payment or challenge, a charge certificate adds ${h.E.surchargePct}%, and ${h.E.orderAfterCcDays} days later the debt can be registered at the county court, after which you have ${h.E.witnessStatementDays} days to file a witness statement. A rejected challenge gives ${h.E.afterRejectionDays} days to pay or appeal to the adjudicator. Wales, Scotland and Northern Ireland use similar steps with their own amounts.`,
    faqs: (h) => [
      { q: 'Do weekends count in the 14 days to pay a PCN at half price?', a: `Yes. The ${h.E.discountDays} days are calendar days beginning with the day the notice is served, so Saturdays, Sundays and bank holidays all count. Working days matter only for deciding when a posted notice is served: the second working day after posting. If the last day falls on a weekend, pay online before midnight or on the Friday to be safe.` },
      { q: 'Does an informal challenge stop the clock on my PCN?', a: 'In practice it pauses things: while the council considers a challenge made during the reduced-rate period, it does not usually move to a Notice to Owner, and GOV.UK says the reduced rate may be offered again if the challenge is rejected. The rejection letter gives a fresh date. Keep proof of the day you sent your challenge.' },
      { q: 'What if the Notice to Owner never arrives?', a: `The council must serve it within ${h.E.ntoLatestMonths} months of the penalty notice. If you moved and the DVLA record was out of date, letters can go to an old address and the debt can reach the charge certificate stage without your knowledge. At the order for recovery stage, a witness statement within ${h.E.witnessStatementDays} days can say that you did not receive the earlier notices.` },
      { q: 'Are the deadlines the same for a camera PCN sent by post?', a: `Not quite. A postal camera notice in England acts as the Notice to Owner itself, so the reduced rate lasts ${h.E.discountDaysCameraPost} days and representations go straight to the council within ${h.E.representationsDays} days of service. There is no separate informal stage. The charge certificate can follow ${h.E.ccAfterDays} days after service if nothing is done.` },
    ],
    body: (h) => `
<h2>A worked example, step by step</h2>
<p>Here is a windscreen notice issued outside London on ${h.date('2026-12-14')}, at band 2 higher rate (${h.gbp(h.E.band2.higher)}). The dates show why the end of the year needs care.</p>
${h.table(['Step', 'Date', 'Amount'], [
  ['Notice fixed to the car', h.date('2026-12-14'), h.gbp(h.E.band2.higher)],
  ['Last day at the reduced rate', h.date(plus('2026-12-14', h.E.discountDays - 1)), h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100))],
  ['Notice to Owner can be posted', h.date(plus('2026-12-14', h.E.ntoAfterDays)), h.gbp(h.E.band2.higher)],
  ['Formal representations, earliest end', `${h.E.representationsDays} days after the Notice to Owner is served`, h.gbp(h.E.band2.higher)],
  ['Charge certificate, at the earliest', `${h.E.ccAfterDays} days after the Notice to Owner is served`, h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))],
], `SI 2022/71, regulations 10, 20 and 21. Christmas Day, Boxing Day and New Year's Day all count as days.`, ['l', 'l', 'r'])}
<p>The reduced-rate period ends on ${h.date(plus('2026-12-14', h.E.discountDays - 1))}, just as many people are away. If the notice had been posted by camera on ${h.date('2026-12-23')}, service would be presumed only on ${h.date('2026-12-29')}, because the 24th is a working day and the 25th to the 28th are not (${h.src('bankhol', 'GOV.UK bank holidays')}). The countdown above applies the bank holidays of each nation for 2025 to 2027.</p>

<h2>Why "beginning with" matters</h2>
<p>The regulations use the phrase "the period of 14 days beginning with the date on which the penalty charge notice is served" (${h.src('si2022_71', 'SI 2022/71, regulation 10')}). The day of service is day one, so the last day is thirteen days later. Some councils print a date on the notice; where they do, that is the one to follow, and if it is later than ours, so much the better. Our tools always count the cautious way.</p>

<h2>Deadlines after you challenge</h2>
${h.table(['You have done', 'The next deadline'], [
  ['Informal challenge within the reduced-rate period', 'the date in the council reply; reduced rate may be offered again'],
  ['Formal representations after a Notice to Owner', `council decides within ${h.E.councilDecisionDays} days`],
  ['Representations rejected', `${h.E.afterRejectionDays} days to pay or appeal to the adjudicator`],
  ['Charge certificate received', `${h.E.orderAfterCcDays} days before an order for recovery`],
  ['Order for recovery received', `${h.E.witnessStatementDays} days for a witness statement`],
], `${h.src('si2022_576', 'SI 2022/576')} and ${h.src('si2022_71', 'SI 2022/71')}, England.`, ['l', 'l'])}
<p>Each of these has its own page: ${h.a('notice-to-owner', 'Notice to Owner')}, ${h.a('formal-representations', 'formal representations')}, ${h.a('parking-appeal-tribunal', 'tribunal appeal')} and ${h.a('charge-certificate', 'charge certificate')}.</p>

<h2>Outside England</h2>
<p>In Wales the reduced rate also lasts ${h.W.discountDays} days. In Scotland it lasts ${h.S.discountDays} days and appeals to the First-tier Tribunal must be made within ${h.S.appealDays} days of the notice of rejection. In Northern Ireland the reduced rate lasts ${h.NI.discountDays} days, the Notice to Owner can follow after ${h.NI.ntoAfterDays} days and the charge certificate a further ${h.NI.ccAfterDays} days later. Choose the nation in the countdown to see them as dates.</p>

<h2>Keep a record</h2>
<p>Whatever you decide, write down the day you received each letter, keep envelopes, and send challenges in a way that leaves a trace: the council's online form with a confirmation, or email. A one-day dispute about service is far easier to win with evidence. The calendar file from the countdown puts every date in your diary without anything leaving your device.</p>`,
  },
});
