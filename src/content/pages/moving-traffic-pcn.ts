import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'moving-traffic-pcn',
  group: 'council',
  order: 43,
  tool: { kind: 'countdown', props: { mode: 'council', service: 'post' } },
  mini: { kind: 'mini:buswarn' },
  related: ['bus-lane-fine', 'formal-representations', 'parking-appeal-tribunal', 'london-pcn'],
  sources: ['busguidance', 'si2022_71', 'si2022_71_sch3', 'si2022_576', 'london_levels'],
  demarche: true,
  en: {
    slug: 'yellow-box-junction-fine',
    nav: 'Yellow box and moving traffic',
    card: 'Yellow box junction, banned turn and no entry PCNs from council cameras: who can issue them since 2022, the amounts, and the dates to pay or challenge.',
    title: 'Yellow Box Junction Fine and Other Moving Traffic PCNs',
    description: 'Yellow box junction and banned turn fines are council camera PCNs. See the amounts, the 21-day reduced rate, the first-offence warning and how to challenge.',
    h1: 'Yellow box junction fines and other moving traffic PCNs',
    intro: 'Enter the date printed on the posted notice and its amount: the countdown gives the reduced-rate deadline, the representations deadline and what follows.',
    resume: (h) => `Moving traffic contraventions are breaches of signs that control how vehicles move rather than where they park: stopping in a yellow box junction, making a banned turn, ignoring a no entry sign, driving the wrong way in a one-way street or through a route closed to motor vehicles. In London, boroughs and Transport for London have enforced them by camera for years. In the rest of England, councils have been able to take on the same civil enforcement powers since ${h.date(h.E.inForce)}, when new regulations came into force, and more of them do so each year. The result is a Penalty Charge Notice sent by post to the registered keeper, charged at the higher level: up to ${h.gbp(h.E.band2.higher)} outside London, ${h.gbp(h.L.busLane)} in London. The reduced rate lasts ${h.E.discountDaysCameraPost} days from service and representations go straight to the council within ${h.E.representationsDays} days. Statutory guidance asks councils outside London to warn rather than fine first-time drivers at a new camera for its first ${h.E.busWarningMonths} months.`,
    faqs: (h) => [
      { q: 'When is stopping in a yellow box junction allowed?', a: 'The usual rule is that you may enter the box only if your exit is clear, with one exception: you may wait in the box when turning right and prevented only by oncoming traffic or by other vehicles waiting to turn right. If the camera images show your exit was clear when you entered and became blocked unexpectedly, explain that in your representations.' },
      { q: 'Are moving traffic PCNs enforced everywhere in England now?', a: `No. Since ${h.date(h.E.inForce)} councils outside London can apply to use these powers, and only those that have done so can issue moving traffic penalties. Elsewhere, the same contraventions remain matters for the police. The notice names the council and the camera location; the council website lists where its cameras are.` },
      { q: 'Can I see the video of my yellow box junction contravention?', a: 'Yes. Councils make the images or the clip available, usually online with the notice number and registration. Watch it before deciding: it shows whether the exit was clear, how long the vehicle stopped and what the traffic ahead did. That footage is the evidence the council relies on, and the evidence an adjudicator will look at.' },
    ],
    body: (h) => `
<h2>Common moving traffic contraventions</h2>
${h.table(['Contravention', 'What the camera records', 'Typical defence to check'], [
  ['Stopping in a yellow box junction', 'the vehicle stationary inside the box', 'exit clear on entry; waiting to turn right'],
  ['Banned turn', 'a turn against a sign', 'sign missing, hidden or unclear'],
  ['No entry or one-way street', 'entry past the sign', 'sign visibility, roadworks diversion'],
  ['Route closed to motor vehicles', 'passage through a restricted point', 'exemption for your vehicle or permit'],
], `Moving traffic contraventions enforceable under ${h.src('si2022_71', 'SI 2022/71')} outside London.`, ['l', 'l', 'l'])}

<h2>From camera to penalty</h2>
<p>A council outside London first has to obtain the powers and set up approved devices. Its camera then records the contravention, an officer reviews the images, and a notice is posted to the registered keeper. It must be served within ${h.E.cameraServeWithinDays} days of the contravention, unless DVLA details were delayed. Service is presumed on the second working day after posting. That notice is both the penalty and the Notice to Owner, so the steps are short: pay at the reduced rate within ${h.E.discountDaysCameraPost} days, pay in full, or make representations within ${h.E.representationsDays} days. The countdown above sets these out for the date printed on your notice.</p>
<p>The ${h.src('busguidance', 'Department for Transport statutory guidance')} adds a rule of fairness: for a vehicle's first contravention at a new camera site, during the first ${h.E.busWarningMonths} months, the council should send a warning notice instead of a penalty. The mini-tool checks whether your date is within that window.</p>

<h2>Amounts</h2>
<p>Moving traffic contraventions sit at the higher level of the council's band in England outside London: ${h.gbp(h.E.band1.higher)} in band 1, ${h.gbp(h.E.band2.higher)} in band 2, halved if paid within ${h.E.discountDaysCameraPost} days, increased to ${h.gbp(h.E.band1.higher * (1 + h.E.surchargePct / 100))} or ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))} after a charge certificate (${h.src('si2022_71_sch3', 'Schedule 3')}). In London the penalty is ${h.gbp(h.L.busLane)}, or ${h.gbp(h.L.busLane * (1 - h.E.discountPct / 100))} at the reduced rate (${h.src('london_levels', 'London levels since 7 April 2025')}).</p>

<h2>Making representations</h2>
<p>Representations against a moving traffic notice use the same statutory grounds as any council penalty: the contravention did not occur, you were not the owner, the vehicle was taken without consent, it was a hire vehicle with a signed liability statement, the penalty exceeded the applicable amount, procedural impropriety, an invalid traffic order (${h.src('si2022_576', 'SI 2022/576, regulation 5')}). For moving traffic, two arguments are frequent: unclear signs at the location, and a council that skipped the warning notice for a new camera. The council must answer within ${h.E.councilDecisionDays} days; a rejection opens ${h.E.afterRejectionDays} days to appeal to the ${h.a('parking-appeal-tribunal', 'Traffic Penalty Tribunal')}. Build the letter with the ${h.a('formal-representations', 'formal representations tool')}.</p>

<h2>A worked example</h2>
<p>A driver stops in a box junction on ${h.date('2026-11-23')} because the car ahead braked suddenly. The council posts the notice on ${h.date('2026-11-30')}; it is served on ${h.date('2026-12-02')}. Watching the clip, the driver sees the exit was clear on entry. Representations sent on ${h.date('2026-12-08')}, well inside the ${h.E.representationsDays} days, explain this with a still from the video. If the council rejects them, the reduced rate is usually gone, but the adjudicator can still cancel. The decision is the council's and then the tribunal's; the tools here only make sure no date is missed.</p>`,
  },
});
