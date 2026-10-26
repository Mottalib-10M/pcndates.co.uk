import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'penalty-charge-notice',
  group: 'ticket',
  order: 11,
  tool: { kind: 'countdown', props: { mode: 'council' } },
  mini: { kind: 'mini:pcnamount' },
  related: ['pcn-deadlines', 'appeal-penalty-charge-notice', 'notice-to-owner', 'charge-certificate', 'pcn-fine-amounts'],
  sources: ['tma2004', 'si2022_71', 'si2022_71_sch3', 'si2022_576', 'govuk_tickets', 'london_levels'],
  demarche: true,
  en: {
    slug: 'penalty-charge-notice',
    nav: 'Penalty Charge Notice (PCN)',
    card: 'A council or TfL penalty: the reduced rate, the Notice to Owner, the charge certificate and how to challenge it, with every date worked out.',
    title: 'Penalty Charge Notice (PCN): Amounts, Deadlines, Appeals',
    description: 'A council Penalty Charge Notice is a civil penalty set by law. See the 14 or 21-day reduced rate, the Notice to Owner, the 50% rise and how to challenge it.',
    h1: 'Penalty Charge Notice: how a council PCN works, date by date',
    intro: 'Choose who issued the notice, its amount and how it reached you: the countdown gives each deadline and what you would pay on that day.',
    resume: (h) => `A Penalty Charge Notice, or PCN, is the civil penalty a council or Transport for London issues for a parking, bus lane or moving traffic contravention. In England it rests on Part 6 of the Traffic Management Act 2004 and on regulations made in 2022 that fix the levels, the dates and the appeal route, so unlike a private parking charge it does not depend on a contract: the amount is set by law and, if it stays unpaid, it climbs on a fixed scale. Outside London the penalty is ${h.gbp(h.E.band1.lower)} to ${h.gbp(h.E.band2.higher)}; in London it runs from ${h.gbp(h.L.bandB.lower)} to ${h.gbp(h.L.bandA.higher)}. Paying within ${h.E.discountDays} days of service halves it, or within ${h.E.discountDaysCameraPost} days when a camera notice comes by post. After ${h.E.ntoAfterDays} days without payment a Notice to Owner can go to the registered keeper, and if that is ignored a charge certificate adds ${h.E.surchargePct}%. You can challenge at each stage, and an independent adjudicator has the last word.`,
    faqs: (h) => [
      { q: 'Is a council PCN a criminal fine?', a: 'No. Since parking enforcement was moved from the police to councils, a Penalty Charge Notice is a civil penalty. It never leads to a criminal record or penalty points on a licence. If it is not paid, the council registers it as a debt at the county court and can then pass it to enforcement agents, which is why ignoring it costs more over time.' },
      { q: 'Can a council PCN be sent by post instead of left on the car?', a: `Yes, in two cases. A camera can record the contravention, and the notice is then posted to the registered keeper, normally within ${h.E.cameraServeWithinDays} days. A notice can also be posted if the civil enforcement officer was prevented from fixing it to the car or handing it over. A posted notice counts as served on the second working day after posting.` },
      { q: 'Who has to pay a PCN, the driver or the keeper?', a: 'The council deals with the owner, which in practice means the registered keeper recorded by the DVLA. If someone else was driving, the keeper is still liable for the penalty. The exceptions are set by law: a vehicle sold before the date, a vehicle taken without consent, or a hire vehicle where the hirer signed a statement accepting liability.' },
      { q: 'Does the council have to offer the reduced rate again after I challenge?', a: 'For a challenge made during the reduced-rate period, GOV.UK says that if the challenge is rejected you may be able to pay at the reduced rate. Most councils re-offer it, and their rejection letter says so with a new date. Formal representations made after a Notice to Owner usually mean the full amount if they fail.' },
    ],
    body: (h) => `
<h2>What makes a PCN different from other tickets</h2>
<p>Three kinds of paper end up under a windscreen wiper. A Penalty Charge Notice comes from a council or from Transport for London and is headed with those words. A Fixed Penalty Notice comes from the police. A Parking Charge Notice comes from a private company. Only the first is governed by the ${h.src('tma2004', 'Traffic Management Act 2004')}, and only the first follows the statutory ladder described on this page: reduced rate, Notice to Owner, charge certificate, order for recovery. If you are not sure which one you hold, the ${h.a('home', 'ticket checker')} reads it for you in four questions, and our ${h.a('pcn-vs-parking-charge-notice', 'side-by-side comparison')} goes into the differences.</p>

<h2>The amounts in England, Wales and London</h2>
${h.table(['Where', 'Higher rate', 'Lower rate', 'Paid at the reduced rate'], [
  ['England outside London, band 1', h.gbp(h.E.band1.higher), h.gbp(h.E.band1.lower), `${h.gbp(h.E.band1.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.E.band1.lower * (1 - h.E.discountPct / 100))}`],
  ['England outside London, band 2', h.gbp(h.E.band2.higher), h.gbp(h.E.band2.lower), `${h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.E.band2.lower * (1 - h.E.discountPct / 100))}`],
  ['London, band A', h.gbp(h.L.bandA.higher), h.gbp(h.L.bandA.lower), `${h.gbp(h.L.bandA.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.L.bandA.lower * (1 - h.E.discountPct / 100))}`],
  ['London, band B', h.gbp(h.L.bandB.higher), h.gbp(h.L.bandB.lower), `${h.gbp(h.L.bandB.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.L.bandB.lower * (1 - h.E.discountPct / 100))}`],
  ['Wales', h.gbp(h.W.higher), h.gbp(h.W.lower), `${h.gbp(h.W.higher * (1 - h.E.discountPct / 100))} or ${h.gbp(h.W.lower * (1 - h.E.discountPct / 100))}`],
], `England: ${h.src('si2022_71_sch3', 'SI 2022/71, Schedule 3')}; London: bands in force since ${h.date(h.L.from)} (${h.src('london_levels', 'London Councils levels, as published by Lewisham')}).`, ['l', 'r', 'r', 'r'])}
<p>The higher rate covers the contraventions the regulations treat as more serious: parking where waiting or loading is banned, on a dropped footway, in a disabled bay without a badge, at a bus stop, or in a bus lane. The lower rate covers things like overstaying a paid bay. The band your council uses, and the rate of your contravention, are printed on the notice with a contravention code. Scotland and Northern Ireland follow their own scales, covered on our ${h.a('scotland-parking-fines', 'Scotland')} and ${h.a('northern-ireland-parking-fines', 'Northern Ireland')} pages.</p>

<h2>A windscreen PCN, day by day</h2>
<p>Take a band 2 higher-rate notice fixed to a car outside London on ${h.date('2026-11-02')}. The reduced rate of ${h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100))} is open for ${h.E.discountDays} days beginning with that day, so until ${h.date(plus('2026-11-02', h.E.discountDays - 1))}. If nothing is paid, the council may post a Notice to Owner from ${h.date(plus('2026-11-02', h.E.ntoAfterDays))}, and must do so within ${h.E.ntoLatestMonths} months. The keeper then has ${h.E.representationsDays} days to pay ${h.gbp(h.E.band2.higher)} or make formal representations. If neither happens, a charge certificate raises the debt to ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))}, and ${h.E.orderAfterCcDays} days later the council can register it at the county court (${h.src('si2022_71', 'SI 2022/71, regulations 10 and 20 to 22')}).</p>
<p>The countdown at the top of the page does the same arithmetic for your own date and amount, marks the dates that depend on a later letter as the earliest they can fall, and lets you save the whole list to your calendar.</p>

<h2>Three moments to challenge</h2>
<ol>
<li><strong>Informal challenge</strong>, as soon as you get a windscreen notice: write to the council, ideally within the ${h.E.discountDays} days, with photographs and receipts. GOV.UK explains that if this is rejected you may still be offered the reduced rate (${h.src('govuk_tickets', 'GOV.UK: parking tickets')}).</li>
<li><strong>Formal representations</strong> after the Notice to Owner, within ${h.E.representationsDays} days, on one of the grounds listed in the appeal regulations. The council has ${h.E.councilDecisionDays} days to decide (${h.src('si2022_576', 'SI 2022/576')}). Our ${h.a('formal-representations', 'formal representations page')} lists the grounds.</li>
<li><strong>Appeal to the adjudicator</strong> within ${h.E.afterRejectionDays} days of the notice of rejection: the Traffic Penalty Tribunal outside London and in Wales, London Tribunals in the capital. See our ${h.a('parking-appeal-tribunal', 'tribunal guide')}.</li>
</ol>
<p>The ${h.a('appeal-penalty-charge-notice', 'appeal letter builder')} writes the first two for you from ticked reasons. It is a drafting aid: the council and the adjudicator decide.</p>

<h2>What this site does not do</h2>
<p>We cannot see your notice in a council system, pay it, or appeal for you. Payment and challenges go only through the website, address or phone line printed on the notice. Every figure here comes from the regulations and official pages listed below, read on ${h.date(h.P.retrieved_at)}.</p>`,
  },
});
