import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'london-pcn',
  group: 'places',
  order: 60,
  tool: { kind: 'mini:londonband' },
  mini: { kind: 'mini:reduced' },
  related: ['red-route-pcn', 'pcn-fine-amounts', 'bus-lane-fine', 'parking-appeal-tribunal', 'moving-traffic-pcn'],
  sources: ['london_levels', 'tfl_red', 'si2022_71', 'si2022_576'],
  demarche: true,
  en: {
    slug: 'london-pcn',
    nav: 'London parking fines',
    card: 'London PCN bands since 7 April 2025: band A and band B, bus lane and moving traffic penalties, reduced and increased amounts, and the London Tribunals route.',
    title: 'Parking Fines in London 2026: PCN Bands A and B Explained',
    description: 'London parking fines since April 2025: band A £160 or £110, band B £140 or £90, bus lanes £160, half within 14 days. See your borough band and appeal route.',
    h1: 'London parking fines: PCN bands A and B',
    intro: 'Choose your borough band and the rate of the contravention: the tool gives the penalty, the reduced amount and the amount after a charge certificate.',
    resume: (h) => `London sets its own penalty levels, separate from the rest of England. They are proposed by London Councils, the body of the 32 boroughs and the City of London, and approved by the Mayor; the current levels took effect on ${h.date(h.L.from)}. Boroughs are placed in one of two bands. In band A a higher-rate parking contravention costs ${h.gbp(h.L.bandA.higher)} and a lower-rate one ${h.gbp(h.L.bandA.lower)}; in band B the figures are ${h.gbp(h.L.bandB.higher)} and ${h.gbp(h.L.bandB.lower)}. Bus lane and moving traffic contraventions, such as yellow box junctions and banned turns, cost ${h.gbp(h.L.busLane)} across London, and Transport for London charges ${h.gbp(h.L.tflRedRoute)} on its red routes. As elsewhere in England, the penalty is halved if paid within ${h.L.discountDays} days, or ${h.L.discountDaysCameraPost} days for a camera notice sent by post, and rises by ${h.L.surchargePct}% after a charge certificate. Appeals that the council rejects go to London Tribunals, independent of the boroughs.`,
    faqs: (h) => [
      { q: 'How do I know whether my London borough is band A or band B?', a: 'Your borough’s parking pages state its band, and the notice shows the amount, which tells you the band and the rate at once. Broadly, central and busier boroughs are in band A and the others in band B, but the boundary follows each borough’s choice within the London Councils scheme, not a fixed map.' },
      { q: 'Why did London PCNs go up in 2025?', a: `London Councils consulted on new levels and the Mayor approved them, with the increase taking effect on ${h.date(h.L.from)}. The aim given was to keep penalties high enough to deter contraventions in a city with heavy traffic. The levels apply to every penalty issued from that date; a notice issued before it keeps the old amount.` },
      { q: 'Is a TfL red route penalty a London borough PCN?', a: `It is issued by Transport for London on the roads it manages, the red routes, rather than by a borough, and its level is set at ${h.gbp(h.L.tflRedRoute)}. The steps are the same: reduced rate, Notice to Owner, charge certificate at ${h.gbp(h.L.tflCc)}, and appeals to London Tribunals. Our red route page covers it in detail.` },
    ],
    body: (h) => `
<h2>The London levels in one table</h2>
${h.table(['Contravention', 'Penalty', 'Within 14 days', 'After a charge certificate'], [
  ['Band A, higher', h.gbp(h.L.bandA.higher), h.gbp(h.L.bandA.higher * (1 - h.E.discountPct / 100)), h.gbp(h.L.bandA.higher * (1 + h.E.surchargePct / 100))],
  ['Band A, lower', h.gbp(h.L.bandA.lower), h.gbp(h.L.bandA.lower * (1 - h.E.discountPct / 100)), h.gbp(h.L.bandA.lower * (1 + h.E.surchargePct / 100))],
  ['Band B, higher', h.gbp(h.L.bandB.higher), h.gbp(h.L.bandB.higher * (1 - h.E.discountPct / 100)), h.gbp(h.L.bandB.higher * (1 + h.E.surchargePct / 100))],
  ['Band B, lower', h.gbp(h.L.bandB.lower), h.gbp(h.L.bandB.lower * (1 - h.E.discountPct / 100)), h.gbp(h.L.bandB.lower * (1 + h.E.surchargePct / 100))],
  ['Bus lane, moving traffic', h.gbp(h.L.busLane), h.gbp(h.L.busLane * (1 - h.E.discountPct / 100)), h.gbp(h.L.busLane * (1 + h.E.surchargePct / 100))],
  ['TfL red route', h.gbp(h.L.tflRedRoute), h.gbp(h.L.tflRedRoute * (1 - h.E.discountPct / 100)), h.gbp(h.L.tflCc)],
], `Levels since ${h.date(h.L.from)}, ${h.src('london_levels', 'as published by the London Borough of Lewisham')}; ${h.src('tfl_red', 'TfL red route penalty charges')}.`, ['l', 'r', 'r', 'r'])}

<h2>Higher or lower rate</h2>
<p>The rate depends on the contravention, not the borough. Parking on a yellow line during restricted hours, in a disabled bay without a badge, on a footway or at a bus stop is higher rate. Overstaying in a paid bay, or parking in a bay with a ticket that has run out, is generally lower rate. The contravention code on your notice decides it, and the amount printed should match your borough's band.</p>

<h2>Comparing London with the rest of England</h2>
<p>The same higher-rate contravention costs ${h.gbp(h.L.bandA.higher)} in a band A borough and ${h.gbp(h.E.band2.higher)} in a band 2 council outside London. Paid within the reduced-rate period, that is ${h.gbp(h.L.bandA.higher * (1 - h.E.discountPct / 100))} against ${h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100))}. The deadlines, though, follow the same national regulations (${h.src('si2022_71', 'SI 2022/71')}): ${h.L.discountDays} days for the reduced rate, a Notice to Owner after ${h.E.ntoAfterDays} days, ${h.E.representationsDays} days for formal representations. The second mini-tool above gives the last day of the reduced rate for your notice.</p>

<h2>Appeals in London</h2>
<p>The route is the national one. An informal challenge to the borough, for a windscreen notice, then formal representations after a Notice to Owner, which the borough must decide within ${h.E.councilDecisionDays} days (${h.src('si2022_576', 'SI 2022/576')}). A rejection gives ${h.E.afterRejectionDays} days to appeal to London Tribunals, the independent adjudicators for London. They do not work for the boroughs or TfL, and the appeal itself is decided on the evidence both sides send. Our ${h.a('parking-appeal-tribunal', 'tribunal page')} explains how to prepare it.</p>

<h2>Cameras in London</h2>
<p>London has used cameras for bus lanes and moving traffic for many years, so many London penalties arrive by post. A camera notice sent by post gives ${h.L.discountDaysCameraPost} days for the reduced rate and goes straight to representations. If you drove into a box junction or a bus lane, see our pages on ${h.a('moving-traffic-pcn', 'moving traffic')} and ${h.a('bus-lane-fine', 'bus lanes')}, which explain what the images need to show.</p>

<h2>Paying or challenging: a worked choice</h2>
<p>A driver parks on a single yellow line in a band B borough during the restricted hours on ${h.date('2026-11-23')}. The notice is ${h.gbp(h.L.bandB.higher)}. Paying within ${h.L.discountDays} days costs ${h.gbp(h.L.bandB.higher * (1 - h.E.discountPct / 100))}. Challenging informally within that time, with a photograph showing the time plate was missing, risks little: if the borough rejects it, it usually offers the reduced rate again. Waiting without doing anything leads to the full ${h.gbp(h.L.bandB.higher)} after the Notice to Owner and ${h.gbp(h.L.bandB.higher * (1 + h.E.surchargePct / 100))} after a charge certificate. The difference between acting in the first fortnight and doing nothing is ${h.gbp(h.L.bandB.higher * (1 + h.E.surchargePct / 100) - h.L.bandB.higher * (1 - h.E.discountPct / 100))}.</p>

<h2>A note on removals</h2>
<p>London boroughs set their own charges for removing and storing vehicles; they are not the national scale used outside London. If your car was towed in London, the borough's pound states the fees. Everything else on the notice, including the right to challenge after paying to release the car, works as described on our ${h.a('penalty-charge-notice', 'PCN guide')}.</p>`,
  },
});
