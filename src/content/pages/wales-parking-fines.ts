import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'wales-parking-fines',
  group: 'places',
  order: 63,
  tool: { kind: 'countdown', props: { mode: 'council', area: 'wales' } },
  mini: { kind: 'mini:walespcn' },
  related: ['parking-appeal-tribunal', 'penalty-charge-notice', 'notice-to-keeper', 'pcn-fine-amounts'],
  sources: ['wales', 'tma2004', 'pofa4', 'govuk_tickets', 'code_em'],
  demarche: true,
  en: {
    slug: 'wales-parking-fines',
    nav: 'Wales',
    card: 'Council PCNs in Wales at £70 or £50, halved within 14 days, the Traffic Penalty Tribunal route, and private charges under the same keeper rules as England.',
    title: 'Parking Fines in Wales: PCN Amounts, Dates and Appeals',
    description: 'Parking fines in Wales: council PCNs of £70 or £50, half price within 14 days, more after a charge certificate, appeals to the Traffic Penalty Tribunal.',
    h1: 'Parking fines in Wales',
    intro: 'Enter the date on your Welsh council notice and its rate: the countdown gives the reduced-rate deadline, the Notice to Owner and the charge certificate.',
    resume: (h) => `Councils in Wales enforce parking under Part 6 of the Traffic Management Act 2004, like councils in England, but the penalty levels are set by a Welsh order made in 2008. A higher-rate contravention, such as parking on a yellow line during restricted hours or in a disabled bay without a badge, costs ${h.gbp(h.W.higher)}; a lower-rate one, such as overstaying a paid bay, costs ${h.gbp(h.W.lower)}. Paying within ${h.W.discountDays} days halves the penalty, to ${h.gbp(h.W.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.W.lower * (1 - h.E.discountPct / 100))}, and a charge certificate after the Notice to Owner stage raises it by ${h.W.surchargePct}%, to ${h.gbp(h.W.higher * (1 + h.E.surchargePct / 100))} or ${h.gbp(h.W.lower * (1 + h.E.surchargePct / 100))}. Appeals that a council rejects go to the Traffic Penalty Tribunal, which also hears appeals from councils in England outside London. For private car parks, Wales is covered by Schedule 4 to the Protection of Freedoms Act 2012 in the same way as England, and the government Code laid on ${h.date(h.CODE.laid)} will apply once in force.`,
    faqs: (h) => [
      { q: 'Are parking fines in Wales the same as in England?', a: `The structure is the same, but the levels differ. Welsh councils charge ${h.gbp(h.W.higher)} or ${h.gbp(h.W.lower)} under the Welsh order of 2008, while councils in England outside London choose between two bands of up to ${h.gbp(h.E.band2.higher)}. Both halve the penalty for prompt payment and add half after a charge certificate, and both send appeals to the Traffic Penalty Tribunal.` },
      { q: 'Can a private car park in Wales pursue the keeper?', a: `Yes, under the same rules as England. Schedule 4 to the Protection of Freedoms Act 2012 covers relevant land in England and Wales, so a company can pursue the registered keeper if its notices meet the content and timing rules, such as a Notice to Keeper delivered between day ${h.POFA.ntkAfterNtdFromDay} and day ${h.POFA.ntkAfterNtdToDay} after a windscreen ticket.` },
      { q: 'Do Welsh bank holidays affect parking deadlines?', a: 'Wales shares the bank holidays of England. They matter where a rule counts working days, such as the presumed service of a notice sent by post on the second working day after posting. The reduced-rate period itself counts calendar days, weekends and holidays included. The countdown applies the England and Wales list from GOV.UK.' },
    ],
    body: (h) => `
<h2>Welsh penalty levels</h2>
${h.table(['Rate', 'Penalty', `Within ${h.W.discountDays} days`, 'After a charge certificate'], [
  ['Higher', h.gbp(h.W.higher), h.gbp(h.W.higher * (1 - h.E.discountPct / 100)), h.gbp(h.W.higher * (1 + h.E.surchargePct / 100))],
  ['Lower', h.gbp(h.W.lower), h.gbp(h.W.lower * (1 - h.E.discountPct / 100)), h.gbp(h.W.lower * (1 + h.E.surchargePct / 100))],
], `${h.src('wales', 'WSI 2008/613, Civil Enforcement of Parking Contraventions (Guidelines on Levels of Charges) (Wales) Order 2008')}.`, ['l', 'r', 'r', 'r'])}
<p>Every Welsh council uses the same two levels. The contravention code on your notice decides whether the higher or the lower one applies. If the amount printed does not match, that is a ground of challenge in itself. The mini-tool above shows each stage for either rate.</p>

<h2>A worked example</h2>
<p>A penalty at the higher rate is fixed to a car in Cardiff on ${h.date('2026-12-21')}. The reduced rate of ${h.gbp(h.W.higher * (1 - h.E.discountPct / 100))} is available for ${h.W.discountDays} days, until ${h.date(plus('2026-12-21', h.W.discountDays - 1))}, a period that includes Christmas Day, Boxing Day and the substitute bank holiday on ${h.date('2026-12-28')}: all of them count. If nothing is paid, a Notice to Owner can follow after ${h.E.ntoAfterDays} days, from ${h.date(plus('2026-12-21', h.E.ntoAfterDays))}, asking for ${h.gbp(h.W.higher)} or representations. If those are not made, the charge certificate brings the debt to ${h.gbp(h.W.higher * (1 + h.E.surchargePct / 100))}. The countdown at the top counts from the date printed on the notice; Welsh councils' notices state the dates they apply, and those prevail.</p>

<h2>Challenging a Welsh PCN</h2>
<p>The steps follow GOV.UK's description for council penalties (${h.src('govuk_tickets', 'GOV.UK: parking tickets')}): an informal challenge for a windscreen notice, ideally during the reduced-rate period; formal representations after the Notice to Owner; and, if the council rejects them, an appeal to the Traffic Penalty Tribunal within the time stated on the notice of rejection. The tribunal is independent of councils. Our ${h.a('parking-appeal-tribunal', 'tribunal page')} covers how to prepare an appeal, and the ${h.a('penalty-charge-notice', 'PCN guide')} explains each stage.</p>
<p>The legal basis is the same Act as in England, the ${h.src('tma2004', 'Traffic Management Act 2004')}, but Wales has its own regulations for procedure and appeals made by the Welsh Ministers. Where this site quotes the English regulations of 2022 for a detail such as presumed service, check the Welsh notice for the rule your council applies.</p>

<h2>Private car parks in Wales</h2>
<p>Private parking in Wales works as in England. The keeper of a vehicle can be pursued under ${h.src('pofa4', 'Schedule 4')} if the notices are compliant and on time: within ${h.POFA.ntkNoNtdDays} days beginning the day after the parking ended for a camera notice with no windscreen ticket, or between day ${h.POFA.ntkAfterNtdFromDay} and day ${h.POFA.ntkAfterNtdToDay} after a windscreen ticket. The government Code, which applies in England, Wales and Scotland (${h.src('code_em', 'explanatory memorandum')}), will cap charges at ${h.gbp(h.CODE.cap)} once in force. Our ${h.a('notice-to-keeper', 'Notice to Keeper checker')} tests a date.</p>

<h2>Paying or challenging: how to choose</h2>
<p>The arithmetic is simple. At the higher rate, acting in the first ${h.W.discountDays} days costs ${h.gbp(h.W.higher * (1 - h.E.discountPct / 100))}; doing nothing until a charge certificate costs ${h.gbp(h.W.higher * (1 + h.E.surchargePct / 100))}, three times as much. A challenge sent early, with photographs or a receipt, rarely costs more than paying at once, because councils commonly re-offer the reduced rate when they reject an early challenge. If you have no evidence that the contravention did not happen, paying promptly is usually the sensible course.</p>

<h2>Practical points</h2>
<ul>
<li>Notices may be bilingual; the Welsh and English texts carry the same deadlines.</li>
<li>Photograph signs and lines at once, and keep receipts or permits.</li>
<li>Pay or challenge only through the channels printed on the notice.</li>
</ul>`,
  },
});
