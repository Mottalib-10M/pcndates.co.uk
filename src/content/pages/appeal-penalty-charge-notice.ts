import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'appeal-penalty-charge-notice',
  group: 'appeal',
  order: 52,
  tool: { kind: 'letter', props: { kind: 'council-informal' } },
  mini: { kind: 'mini:reduced' },
  related: ['formal-representations', 'parking-appeal-tribunal', 'penalty-charge-notice', 'pcn-deadlines', 'parking-ticket-appeal'],
  sources: ['govuk_tickets', 'si2022_576', 'si2022_71'],
  demarche: true,
  en: {
    slug: 'appeal-penalty-charge-notice',
    nav: 'Appeal a council PCN',
    card: 'How to appeal a council Penalty Charge Notice in three stages, with an informal challenge letter built from your reasons and the dates that keep the reduced rate.',
    title: 'Appeal a Penalty Charge Notice: Challenge Letter and Dates',
    description: 'How to appeal a council Penalty Charge Notice: the informal challenge that can keep half price, then formal representations and the tribunal. Build your letter.',
    h1: 'How to appeal a council Penalty Charge Notice',
    intro: 'Tick your reasons and add the notice details if you wish: the builder writes an informal challenge to copy into the council form or an email.',
    resume: (h) => `Appealing a council Penalty Charge Notice happens in up to three stages, and the first one is the cheapest to try. For a notice fixed to the car or handed to the driver, you can make an informal challenge to the council straight away, ideally within the ${h.E.discountDays} days of the reduced rate: GOV.UK explains that if the challenge is rejected you may still be offered that rate. If the council rejects it, or you did not challenge, a Notice to Owner can follow after ${h.E.ntoAfterDays} days, and you then have ${h.E.representationsDays} days to make formal representations on the grounds listed in the 2022 appeal regulations. The council has ${h.E.councilDecisionDays} days to decide. A rejection of formal representations opens the third stage: an appeal to an independent adjudicator within ${h.E.afterRejectionDays} days, at the Traffic Penalty Tribunal or London Tribunals. Camera notices sent by post skip the informal stage and go straight to formal representations. At each stage, evidence decides: photographs, receipts, permits and dates.`,
    faqs: (h) => [
      { q: 'What should an informal challenge to a council PCN contain?', a: 'The notice number and registration, the date and place, and a short statement of why the penalty should be cancelled, with your evidence attached: photographs of signs or lines, a pay and display ticket, a permit, a Blue Badge, a garage invoice for a breakdown. Ask the council to re-offer the reduced rate if it rejects the challenge. Keep a copy.' },
      { q: 'Does challenging a PCN risk paying more?', a: 'Challenging within the reduced-rate period usually costs nothing extra, because councils commonly re-offer the reduced rate when they reject an early challenge. Formal representations and a tribunal appeal normally mean the full penalty if you lose, but never more than that, provided you pay within the time given in the rejection or decision.' },
      { q: 'Can I appeal a PCN on behalf of someone else who was driving?', a: 'The council deals with the registered keeper, who is liable for the penalty whoever drove. The keeper can make the challenge, using the driver’s account of what happened as evidence. A driver who is not the keeper can write too, but the council will normally reply to the keeper. Agree between you who sends it so that deadlines are not missed.' },
    ],
    body: (h) => `
<h2>The three stages at a glance</h2>
${h.table(['Stage', 'When', 'Who decides', 'If it fails'], [
  ['Informal challenge', `as soon as possible, ideally within ${h.E.discountDays} days`, 'the council', 'reduced rate often re-offered'],
  ['Formal representations', `${h.E.representationsDays} days from the Notice to Owner`, `the council, within ${h.E.councilDecisionDays} days`, 'full penalty, or appeal'],
  ['Appeal to the adjudicator', `${h.E.afterRejectionDays} days from the notice of rejection`, 'Traffic Penalty Tribunal or London Tribunals', 'pay within the time the decision gives'],
], `England: ${h.src('govuk_tickets', 'GOV.UK parking tickets')}, ${h.src('si2022_576', 'SI 2022/576')}.`, ['l', 'l', 'l', 'l'])}

<h2>Timing the informal challenge</h2>
<p>A notice fixed to a car on ${h.date('2026-11-12')} has its reduced rate until ${h.date(plus('2026-11-12', h.E.discountDays - 1))}, the ${h.E.discountDays}th day counting the day of service (${h.src('si2022_71', 'SI 2022/71, regulation 10')}). Sending the challenge during that time is what gives the best chance of the reduced rate being offered again if the council says no. The mini-tool above recalculates the end of that period for your own date, including the ${h.E.discountDaysCameraPost}-day rule for camera notices sent by post. Send through the channel on the notice, and keep the confirmation.</p>

<h2>Reasons that often succeed, and those that rarely do</h2>
<p>Councils and adjudicators cancel most readily where the evidence shows the contravention did not happen as alleged: a valid ticket or permit that was displayed, a sign that was missing or contradictory, lines that were worn away, loading that the restriction allowed. Procedural failures, such as a notice with the wrong date or location, also succeed. Mitigation, for example a medical emergency or a breakdown with a garage report, can persuade a council to use its discretion, especially at the informal stage.</p>
<p>Reasons that rarely work on their own: not having seen the sign when it was clearly there, having stopped only for a moment where stopping is banned, or other cars being parked in the same place. If that is all you have, paying at the reduced rate is usually the better choice.</p>

<h2>Using the letter builder</h2>
<p>The builder above writes the challenge from the reasons you tick, leaving placeholders for the details only you know. Switch the letter type to formal representations once a Notice to Owner has arrived: the grounds change to the statutory list. The text is a drafting aid, not legal advice, and nothing you type is sent anywhere. Read it through, add your facts and dates, attach evidence, and send it yourself.</p>

<h2>Evidence: what to gather on the day</h2>
<p>The strongest challenges are built in the first hour. Photograph the car where it stood, the nearest signs from a driver's point of view, the lines at the kerb and any time plate. Keep the pay and display ticket or the app receipt. If you were loading, note what and for whom. If someone else was involved, such as a passenger you were helping, write down what happened while it is fresh. A council reading a challenge with dated photographs can see the situation as you saw it.</p>

<h2>After a rejection</h2>
<p>An informal rejection usually comes with a new reduced-rate date: pay by then if you accept it. If you still dispute the penalty, wait for the Notice to Owner and make ${h.a('formal-representations', 'formal representations')}, which keep you on the road to the independent ${h.a('parking-appeal-tribunal', 'tribunal')}. For a full list of dates on your notice, use the ${h.a('pcn-deadlines', 'deadline countdown')}. And if your ticket came from a private company rather than a council, the rules are different: see our ${h.a('parking-ticket-appeal', 'general appeal guide')}.</p>`,
  },
});
