import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pcn-fine-amounts',
  group: 'ticket',
  order: 15,
  tool: { kind: 'mini:pcnamount' },
  mini: { kind: 'mini:cc' },
  related: ['penalty-charge-notice', 'london-pcn', 'charge-certificate', 'pcn-deadlines', 'wales-parking-fines'],
  sources: ['si2022_71_sch3', 'london_levels', 'tfl_red', 'wales', 'scot_levels', 'ni_pcn'],
  en: {
    slug: 'pcn-fine-amounts',
    nav: 'How much is a PCN?',
    card: 'Every council PCN level in the UK on one page: bands outside London, London bands A and B, Wales, Scotland, Northern Ireland, with the reduced and increased amounts.',
    title: 'PCN Fine Amounts 2026: Every Band, Rate and Nation',
    description: 'How much is a PCN fine in 2026? Bands 1 and 2 in England, London bands A and B, TfL, Wales, Scotland and Northern Ireland, with reduced and increased amounts.',
    h1: 'How much is a PCN? Every council level in the UK',
    intro: 'Pick who issued the notice, its band and rate, and when you pay: the calculator gives the amount due, the reduced rate and the amount after a charge certificate.',
    resume: (h) => `A council Penalty Charge Notice has no single price: the amount depends on where you were, on the band your council uses and on how serious the contravention is. In England outside London, regulations made in 2022 set two bands, ${h.gbp(h.E.band1.higher)} and ${h.gbp(h.E.band1.lower)} in band 1, ${h.gbp(h.E.band2.higher)} and ${h.gbp(h.E.band2.lower)} in band 2, the higher figure for contraventions such as parking on yellow lines or in a disabled bay, the lower for things like overstaying. London has its own bands, raised on ${h.date(h.L.from)}: band A at ${h.gbp(h.L.bandA.higher)} and ${h.gbp(h.L.bandA.lower)}, band B at ${h.gbp(h.L.bandB.higher)} and ${h.gbp(h.L.bandB.lower)}, with bus lane and moving traffic penalties at ${h.gbp(h.L.busLane)}. Wales charges ${h.gbp(h.W.higher)} or ${h.gbp(h.W.lower)}, Scotland up to ${h.gbp(h.S.max)}, Northern Ireland ${h.gbp(h.NI.pcn)}. Everywhere the penalty is halved if paid quickly and increased by half after a charge certificate.`,
    faqs: (h) => [
      { q: 'How do I know whether my PCN is at the higher or lower rate?', a: 'The notice states the amount and a contravention code. The code identifies the contravention, and the regulations attach each one to the higher or lower level: parking where waiting is banned, in a disabled bay without a badge or on a dropped footway is higher; overstaying a paid or free bay is usually lower. The amount printed should match the band your council has adopted.' },
      { q: 'Why is my PCN in London so much more than in other cities?', a: `London boroughs and Transport for London set their levels through London Councils with the Mayor's approval, separately from the rest of England. The current bands took effect on ${h.date(h.L.from)}. Outside London, councils choose between the two national bands fixed by the 2022 regulations, which top out at ${h.gbp(h.E.band2.higher)}.` },
      { q: 'Can a council charge more than the national levels outside London?', a: `No. In England outside London a council can only use the levels in Schedule 3 to the 2022 regulations. If the amount demanded is higher than the level that applies, that is itself a ground for formal representations: the penalty exceeded the amount applicable in the circumstances of the case.` },
      { q: 'Is the reduced rate always exactly half?', a: `For council penalties in England, Wales, Scotland and Northern Ireland, yes: the reduced rate is 50% of the penalty and the charge certificate adds 50%. In Northern Ireland that means ${h.gbp(h.NI.discounted)}, ${h.gbp(h.NI.pcn)} and ${h.gbp(h.NI.cc)}. Private parking charges follow a different rule, at least ${h.CODE.discountMinPct}% off under the government Code.` },
    ],
    body: (h) => `
<h2>England outside London</h2>
${h.table(['Band and level', 'Penalty', 'Within the reduced-rate period', 'After a charge certificate'], [
  ['Band 1, higher', h.gbp(h.E.band1.higher), h.gbp(h.E.band1.higher * (1 - h.E.discountPct / 100)), h.gbp(h.E.band1.higher * (1 + h.E.surchargePct / 100))],
  ['Band 1, lower', h.gbp(h.E.band1.lower), h.gbp(h.E.band1.lower * (1 - h.E.discountPct / 100)), h.gbp(h.E.band1.lower * (1 + h.E.surchargePct / 100))],
  ['Band 2, higher', h.gbp(h.E.band2.higher), h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100)), h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))],
  ['Band 2, lower', h.gbp(h.E.band2.lower), h.gbp(h.E.band2.lower * (1 - h.E.discountPct / 100)), h.gbp(h.E.band2.lower * (1 + h.E.surchargePct / 100))],
], `${h.src('si2022_71_sch3', 'SI 2022/71, Schedule 3, Table 1')}, in force since ${h.date(h.E.inForce)}.`, ['l', 'r', 'r', 'r'])}
<p>Each council outside London picks one band for its area. Most large towns use band 2. The reduced rate lasts ${h.E.discountDays} days from service, or ${h.E.discountDaysCameraPost} days for a camera notice sent by post.</p>

<h2>London boroughs and TfL</h2>
${h.table(['Band', 'Higher', 'Lower', 'Higher, reduced', 'Higher, after certificate'], [
  ['Band A', h.gbp(h.L.bandA.higher), h.gbp(h.L.bandA.lower), h.gbp(h.L.bandA.higher * (1 - h.E.discountPct / 100)), h.gbp(h.L.bandA.higher * (1 + h.E.surchargePct / 100))],
  ['Band B', h.gbp(h.L.bandB.higher), h.gbp(h.L.bandB.lower), h.gbp(h.L.bandB.higher * (1 - h.E.discountPct / 100)), h.gbp(h.L.bandB.higher * (1 + h.E.surchargePct / 100))],
  ['Bus lane and moving traffic', h.gbp(h.L.busLane), '', h.gbp(h.L.busLane * (1 - h.E.discountPct / 100)), h.gbp(h.L.busLane * (1 + h.E.surchargePct / 100))],
  ['TfL red routes', h.gbp(h.L.tflRedRoute), '', h.gbp(h.L.tflRedRoute * (1 - h.E.discountPct / 100)), h.gbp(h.L.tflCc)],
], `London levels since ${h.date(h.L.from)} (${h.src('london_levels', 'as published by Lewisham')}); ${h.src('tfl_red', 'TfL red route penalty charges')}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Inner and busier boroughs are generally in band A, others in band B; the borough's own website states which. Our ${h.a('london-pcn', 'London page')} and ${h.a('red-route-pcn', 'red route page')} go further.</p>

<h2>Wales, Scotland and Northern Ireland</h2>
${h.table(['Nation', 'Penalty', 'Reduced', 'After certificate'], [
  ['Wales, higher', h.gbp(h.W.higher), h.gbp(h.W.higher * (1 - h.E.discountPct / 100)), h.gbp(h.W.higher * (1 + h.E.surchargePct / 100))],
  ['Wales, lower', h.gbp(h.W.lower), h.gbp(h.W.lower * (1 - h.E.discountPct / 100)), h.gbp(h.W.lower * (1 + h.E.surchargePct / 100))],
  ['Scotland, maximum', h.gbp(h.S.max), h.gbp(h.S.max * (1 - h.E.discountPct / 100)), h.gbp(h.S.max * (1 + h.E.surchargePct / 100))],
  ['Northern Ireland', h.gbp(h.NI.pcn), h.gbp(h.NI.discounted), h.gbp(h.NI.cc)],
], `${h.src('wales', 'WSI 2008/613')}; ${h.src('scot_levels', 'Transport Scotland')}; ${h.src('ni_pcn', 'nidirect')}.`, ['l', 'r', 'r', 'r'])}
<p>In Scotland the maximum rose from ${h.gbp(h.S.previousMax)} to ${h.gbp(h.S.max)} on ${h.date(h.S.maxSince)}, and councils may charge less; pavement parking, dropped kerb and double parking penalties must be ${h.gbp(h.S.pavementDroppedDouble)}. A consultation on Scottish levels closed on ${h.date(h.S.consultationClosed)}: the levels above stay until any change is made.</p>

<h2>Reading your own notice</h2>
<p>Three details on the notice tell you which line of these tables is yours. The first is the issuer: a London borough, Transport for London, or a council elsewhere. The second is the contravention code and its description, which decides between the higher and the lower level. The third is the amount itself, which should match the band of that council. If the amount printed is above the level that applies to your contravention, the regulations treat that as a ground of appeal in its own right, and our ${h.a('formal-representations', 'formal representations page')} explains how to raise it.</p>
<p>Take two drivers parked on single yellow lines during the hours of restriction, one in a band 2 town outside London and one in a band A London borough, both on ${h.date('2026-11-16')}. The first owes ${h.gbp(h.E.band2.higher)}, or ${h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100))} if paid within the reduced-rate period, and ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))} after a charge certificate. The second owes ${h.gbp(h.L.bandA.higher)}, ${h.gbp(h.L.bandA.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.L.bandA.higher * (1 + h.E.surchargePct / 100))}. Same contravention, same day, a difference of ${h.gbp(h.L.bandA.higher - h.E.band2.higher)} on the full penalty: the place decides the price.</p>
<p>The calculator at the top of this page applies the same rules to any combination. It shows the amount for the stage you choose, so you can see what waiting costs. For the dates of each stage on your own notice, use the ${h.a('pcn-deadlines', 'deadline countdown')}.</p>

<h2>What the amount does not include</h2>
<p>If your car was removed, the release costs come on top: outside London ${h.gbp(h.E.removal)} for removal and ${h.gbp(h.E.storagePerDay)} a day for storage (see ${h.a('car-towed-clamped', 'towed or clamped')}). Once a debt reaches enforcement agents, fixed fees are added under separate regulations, covered on our ${h.a('parking-fine-bailiffs', 'bailiffs page')}. The second mini-tool above shows what a charge certificate adds to any amount you type.</p>`,
  },
});
