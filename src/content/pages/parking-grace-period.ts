import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'parking-grace-period',
  group: 'private',
  order: 22,
  tool: { kind: 'mini:grace' },
  mini: { kind: 'mini:charter' },
  related: ['parking-code-of-practice', 'supermarket-parking-fine', 'anpr-parking-fine', 'appeal-parking-charge-notice'],
  sources: ['code2026', 'code_em', 'si2022_71'],
  en: {
    slug: 'parking-grace-period',
    nav: 'Grace period',
    card: 'How many minutes you get on arrival and after your time runs out, by type of car park, in private car parks and council bays.',
    title: 'Parking Grace Period: Minutes Allowed on Arrival and Exit',
    description: 'Grace and consideration periods for UK car parks: the minimums in the government Code by type of site, the council rule in England and how to use them on appeal',
    h1: 'Parking grace period: how many minutes you really have',
    intro: 'Choose the type of car park and the minutes you stayed beyond your paid time: the tool says whether a charge is allowed under the minimums of the Code.',
    resume: (h) => `Two short periods protect a driver from a parking charge for a few minutes either side of a stay. The consideration period comes first: the time to enter, find a space, read the signs and decide whether to stay, before you are treated as having parked. The grace period comes last: the time after your paid or permitted stay ends, to return to the car and leave. The Private Parking Code of Practice laid on ${h.date(h.CODE.laid)} makes both mandatory for the first time, with minimums set by type of site in its Annex B: usually a consideration period of ${h.CODE.considerationMin} minutes and a grace period of ${h.CODE.graceMin} minutes, more on large free car parks, none for consideration on pre-booked parking and no grace in short-stay car parks. Operators may give longer. For council parking places in England, the 2022 regulations stop a penalty charge notice being issued for an overstay of ${h.E.graceMinutes} minutes or less. The Code minimums apply once it comes into force; until then, check the terms on the signs.`,
    faqs: (h) => [
      { q: 'What is the difference between a consideration period and a grace period?', a: 'The consideration period happens at the start: the minutes you need to drive in, look for a space and read the terms before deciding to stay or leave. The grace period happens at the end: the minutes after your paid or allowed time runs out, to walk back and drive away. A charge should not be issued within either, under the minimums of the Code.' },
      { q: 'Does the grace period apply in a short-stay car park?', a: `Annex B of the Code sets a consideration period of ${h.CODE.sites.find((s) => s.id === 'short-stay')!.consideration} minutes for short-stay car parks but no grace period at the end. If you overstay your time there by even a minute, the Code minimums do not protect you, although the operator may still choose to allow a margin. Read the signs at the entrance, which should state the maximum stay.` },
      { q: 'I left the car park ten minutes late. Can the operator still charge me?', a: `It depends on the type of site. On most sites in Annex B the grace period is ${h.CODE.graceMin} minutes, so leaving up to that point should not lead to a charge once the Code is in force. Count from the end of the time you paid for, not from your arrival, and remember that a camera records the moment you pass the exit, which includes queueing time.` },
      { q: 'Is there a grace period on council streets and car parks?', a: `In England, regulation 5(2) of the 2022 regulations says a penalty charge notice must not be given for staying in a designated parking place for ${h.E.graceMinutes} minutes or less beyond the permitted time. It concerns overstaying in a parking place, not parking on yellow lines or in places where you may not park at all. Wales, Scotland and Northern Ireland have their own rules.` },
    ],
    body: (h) => `
<h2>The minimums of Annex B, site by site</h2>
<p>Annex B of the ${h.src('code2026', 'Private Parking Code of Practice')} sets a floor for each type of private car park. The explanatory memorandum describes the change as minimum, mandatory consideration periods of ${h.CODE.considerationMin} minutes except for pre-booked parking, and a mandatory ${h.CODE.graceMin}-minute grace period before enforcement, except in short-stay car parks (${h.src('code_em', 'memorandum, paragraph 5.4')}).</p>
${h.table(['Type of car park', 'Consideration on arrival', 'Grace after your time'], h.CODE.sites.map((s) => [s.label, s.consideration ? `${s.consideration} min` : 'none', s.grace ? `${s.grace} min` : 'none']), 'Private Parking Code of Practice, Annex B. Minimums: an operator may allow more.', ['l', 'r', 'r'])}
<p>Two lines stand out. Large free car parks of more than 500 spaces get a longer consideration period, because finding a space takes longer. Short-stay car parks get no grace period at all, so their maximum stay is the real limit. If your car park is not clear from the signs, the tool above lets you compare the categories.</p>

<h2>Worked examples</h2>
<p>A driver pays for two hours at a pay and display car park, from 10am to noon, and the camera records the exit at 12.08pm. Eight minutes after the paid time falls within the ${h.CODE.sites.find((s) => s.id === 'pay-display')!.grace}-minute grace period: once the Code applies, no charge should follow. The same driver in a short-stay car park with a one-hour maximum, leaving at 11.04am after arriving at 10am, has no grace period to rely on: four minutes over the limit can lead to a charge.</p>
<p>At the other end, a driver enters a customer car park, sees that the tariff does not suit and leaves after four minutes. That stay is inside the ${h.CODE.sites.find((s) => s.id === 'customer')!.consideration}-minute consideration period: the driver has not parked in the sense of the Code. A camera system that charges for the full time between entry and exit must take these minutes into account.</p>

<h2>Using the grace period in an appeal</h2>
<p>When a charge is issued for a short overstay, ask the operator for the entry and exit times it recorded, and for the time your payment ended. Work out the minutes after the end of the paid stay, and state which category of Annex B the site belongs to. If the charge falls within the minimums, say so in your first appeal within ${h.CODE.appealDays} days of delivery: our ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} has a reason ready for it. Some delays are covered separately by the Appeals Charter, such as being stuck in traffic inside the car park or an overrunning medical appointment; the mini-tool under the summary checks those.</p>

<h2>Council parking places in England</h2>
<p>Council bays follow a different text. Regulation 5(2) of the ${h.src('si2022_71', '2022 England regulations')} stops a civil enforcement officer from issuing a penalty charge notice for an overstay of ${h.E.graceMinutes} minutes or less in a designated parking place. The rule protects overstays in bays where parking is allowed, not stopping where it is forbidden, such as on double yellow lines, and it applies in England. For council tickets, the ${h.a('penalty-charge-notice', 'penalty charge notice page')} explains the rest of the procedure.</p>
<p>For private car parks before the Code takes effect, the terms on the signs and the trade association code decide the margin. Our ${h.a('parking-code-of-practice', 'Code page')} shows the earliest date the minimums can apply.</p>`,
  },
});
