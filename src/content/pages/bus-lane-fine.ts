import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'bus-lane-fine',
  group: 'council',
  order: 42,
  tool: { kind: 'mini:buswarn' },
  mini: { kind: 'mini:pcnamount' },
  related: ['moving-traffic-pcn', 'penalty-charge-notice', 'london-pcn', 'formal-representations', 'northern-ireland-parking-fines'],
  sources: ['busguidance', 'si2022_71', 'si2022_71_sch3', 'si2022_576', 'london_levels', 'ni_bus'],
  demarche: true,
  en: {
    slug: 'bus-lane-fine',
    nav: 'Bus lane fine',
    card: 'Bus lane PCNs from cameras: the amount in and outside London, the 21-day reduced rate by post, and the first-offence warning notice at new camera sites.',
    title: 'Bus Lane Fine: Camera PCN Amounts, Warnings and Appeals',
    description: 'Bus lane fines are council camera PCNs: amounts in and outside London, 21 days at half price, the six-month warning at new cameras and how to challenge one.',
    h1: 'Bus lane fine: how a camera PCN works',
    intro: 'Enter when the camera started and the day you drove in the lane: the tool says whether the guidance expects a warning notice instead of a penalty.',
    resume: (h) => `A bus lane fine is a Penalty Charge Notice issued by a council, or by Transport for London, after a camera records a vehicle driving in a bus lane during its hours of operation. It is a civil penalty, not a criminal offence, and it arrives by post to the registered keeper. Outside London it is charged at the higher level of the council's band, up to ${h.gbp(h.E.band2.higher)}; in London bus lane and moving traffic penalties are ${h.gbp(h.L.busLane)}. Because the notice comes by post after a camera recording, the reduced rate of half the penalty lasts ${h.E.discountDaysCameraPost} days from service rather than ${h.E.discountDays}, and the notice acts as the Notice to Owner, so you make representations straight to the council within ${h.E.representationsDays} days. Statutory guidance from the Department for Transport tells councils outside London to send a warning notice instead of a penalty for a first contravention at each new camera site during its first ${h.E.busWarningMonths} months. Northern Ireland has its own bus lane penalties, at the same level as its parking penalties.`,
    faqs: (h) => [
      { q: 'How long after driving in a bus lane can the PCN arrive?', a: `In England the regulations require a camera penalty to be served within ${h.E.cameraServeWithinDays} days of the contravention, with a longer period only where the DVLA details were delayed. The notice is served on the second working day after posting. A notice served later than the rules allow is a procedural point worth raising in representations.` },
      { q: 'Can I enter a bus lane to turn left?', a: 'Rules depend on the signs and markings. Many bus lanes have a broken line at junctions where other vehicles may cross to turn, and some lanes operate only at set hours shown on blue signs. Read the signs at the exact spot on the camera images the council provides: if the times or the markings were unclear, that is a ground for representations.' },
      { q: 'Is a first bus lane fine always replaced by a warning?', a: `No. The guidance applies to councils outside London using their bus lane and moving traffic powers, and it covers a first contravention at a new camera site during its first ${h.E.busWarningMonths} months. After that period, or for a second contravention at the same site, a full penalty is normal. London councils follow their own policies.` },
    ],
    body: (h) => `
<h2>How much a bus lane PCN costs</h2>
${h.table(['Area', 'PCN', 'Reduced', 'Certificate'], [
  ['England, band 2', h.gbp(h.E.band2.higher), h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100)), h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))],
  ['England, band 1', h.gbp(h.E.band1.higher), h.gbp(h.E.band1.higher * (1 - h.E.discountPct / 100)), h.gbp(h.E.band1.higher * (1 + h.E.surchargePct / 100))],
  ['London', h.gbp(h.L.busLane), h.gbp(h.L.busLane * (1 - h.E.discountPct / 100)), h.gbp(h.L.busLane * (1 + h.E.surchargePct / 100))],
  ['Northern Ireland', h.gbp(h.NI.pcn), h.gbp(h.NI.discounted), h.gbp(h.NI.cc)],
], `${h.src('si2022_71_sch3', 'SI 2022/71, Schedule 3')}; ${h.src('london_levels', 'London levels')}; ${h.src('ni_bus', 'nidirect: bus lane PCNs')}.`, ['l', 'r', 'r', 'r'])}

<h2>The dates of a bus lane PCN in England</h2>
<p>Suppose the camera records the car on ${h.date('2026-11-09')} and the council posts the notice on ${h.date('2026-11-16')}. Service is presumed on ${h.date('2026-11-18')}, the second working day after posting. The reduced rate is open for ${h.E.discountDaysCameraPost} days beginning with that day, until ${h.date(plus('2026-11-18', h.E.discountDaysCameraPost - 1))}. Representations must reach the council within ${h.E.representationsDays} days of service, by ${h.date(plus('2026-11-18', h.E.representationsDays - 1))}. The countdown below applies this to any date.</p>
<!--tool:countdown|{"mode":"council","service":"post"}-->

<h2>The warning notice at new cameras</h2>
<p>The ${h.src('busguidance', 'Department for Transport statutory guidance for councils outside London')} asks them to issue a warning notice, not a penalty, for a vehicle's first contravention at each new camera site during the first ${h.E.busWarningMonths} months of enforcement there. The idea is that drivers learn where the cameras are before paying. The tool at the top of the page checks whether your date falls in that window. If it does, and you had no earlier warning at that site, ask the council in your representations why a penalty was sent; the guidance is statutory, which means councils must have regard to it.</p>

<h2>Grounds that often come up</h2>
<ul>
<li><strong>Signs and markings.</strong> Bus lane times must be shown on signs; road markings must be visible. If the camera images show worn paint or a hidden sign, say so.</li>
<li><strong>Entering to avoid an obstruction or to let an emergency vehicle pass.</strong> Explain what the images do not show and give any evidence you have.</li>
<li><strong>Late service.</strong> More than ${h.E.cameraServeWithinDays} days between the contravention and service, without a DVLA delay, is a procedural impropriety.</li>
<li><strong>Not the owner, vehicle taken without consent, hire vehicle.</strong> These are grounds listed in ${h.src('si2022_576', 'the appeal regulations')}.</li>
</ul>
<p>Ask the council to let you see the full video or the sequence of images: they are evidence you are entitled to rely on. Our ${h.a('formal-representations', 'representations page')} builds the letter.</p>

<h2>Before you pay or challenge</h2>
<p>Three checks take a few minutes. First, the date of service: if the notice took more than ${h.E.cameraServeWithinDays} days to reach you, note the postmark. Second, the images: the vehicle, the registration and the lane markings should all be clear. Third, the amount: a band 2 council cannot ask more than ${h.gbp(h.E.band2.higher)}, a band 1 council more than ${h.gbp(h.E.band1.higher)}. If all three are in order and the lane was clearly signed, paying within the reduced-rate period is usually the cheapest outcome. If one of them fails, representations cost nothing and keep the case open, although the reduced rate may be lost if they are rejected.</p>

<h2>Moving traffic offences use the same route</h2>
<p>Since ${h.date(h.E.inForce)}, councils in England outside London can also enforce moving traffic contraventions by camera, such as yellow box junctions and banned turns. The amounts, dates and guidance are the same as for bus lanes; our ${h.a('moving-traffic-pcn', 'moving traffic page')} covers what is specific to them.</p>`,
  },
});
