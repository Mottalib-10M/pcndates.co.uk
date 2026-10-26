import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const addM = (iso: string, m: number) => { const [y, mo, d] = iso.split('-').map(Number); const t = y * 12 + mo - 1 + m; return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`; };

export default definePage({
  id: 'notice-to-owner',
  group: 'council',
  order: 40,
  tool: { kind: 'mini:nto' },
  mini: { kind: 'mini:reduced' },
  related: ['formal-representations', 'charge-certificate', 'penalty-charge-notice', 'pcn-deadlines'],
  sources: ['si2022_71', 'si2022_576', 'govuk_tickets'],
  demarche: true,
  en: {
    slug: 'notice-to-owner',
    nav: 'Notice to Owner',
    card: 'The council letter that follows an unpaid PCN: when it can be sent, the latest date it can arrive, and the 28 days it gives for formal representations.',
    title: 'Notice to Owner: The Council Letter After an Unpaid PCN',
    description: 'A Notice to Owner follows a council PCN left unpaid for 28 days. See when it can arrive, the 6-month limit, the 28 days for representations and the amount due.',
    h1: 'Notice to Owner: what it means and what to do',
    intro: 'Enter the date your windscreen notice was issued: the tool gives the first and last dates on which the council can post the Notice to Owner.',
    resume: (h) => `A Notice to Owner is the formal letter a council sends to the registered keeper of a vehicle when a Penalty Charge Notice fixed to the car, or handed to the driver, has not been paid. In England the council may serve it once ${h.E.ntoAfterDays} days have passed since the penalty notice was served without payment, and it must serve it within ${h.E.ntoLatestMonths} months. From that point the reduced rate has gone and the full penalty is due, but the Notice to Owner also opens your strongest right to challenge: ${h.E.representationsDays} days, beginning with the day it is served, to make formal representations on one of the grounds listed in the appeal regulations. The council must decide within ${h.E.councilDecisionDays} days, and if it rejects them you can appeal to an independent adjudicator. If you neither pay nor make representations, a charge certificate can follow and the penalty rises by ${h.E.surchargePct}%. A camera notice sent by post works differently: it already acts as the Notice to Owner, so there is no separate letter.`,
    faqs: (h) => [
      { q: 'I made an informal challenge and then got a Notice to Owner. Is my challenge lost?', a: 'No, but the council has moved to the formal stage. If its reply to your challenge was a rejection, or it did not answer before sending the Notice to Owner, you can now make formal representations repeating your reasons, with your evidence. Mention the date of your earlier challenge: a council that ignored it may have a procedural problem to explain.' },
      { q: 'The Notice to Owner went to my old address. What can I do?', a: `If the keeper record at the DVLA was out of date, the letter is still treated as served at that address. When later letters reach you, act at once. At the order for recovery stage you can file a witness statement within ${h.E.witnessStatementDays} days saying you did not receive the Notice to Owner, which, if accepted, sends the case back to the council.` },
      { q: 'Can I still pay the reduced rate after a Notice to Owner?', a: 'Normally not: the Notice to Owner asks for the full penalty. Some councils accept the reduced rate if your earlier challenge was made in time and they are still considering it, and their letters say so. Otherwise the choice is between paying the full amount and making formal representations within the time stated on the notice.' },
    ],
    body: (h) => `
<h2>When the letter can arrive</h2>
<p>Take a penalty fixed to a windscreen on ${h.date('2026-11-02')}. The council cannot serve a Notice to Owner before ${h.date(plus('2026-11-02', h.E.ntoAfterDays))}, the day after the ${h.E.ntoAfterDays} days have run out, and it must serve it no later than ${h.date(addM('2026-11-02', h.E.ntoLatestMonths))}, ${h.E.ntoLatestMonths} months on (${h.src('si2022_71', 'SI 2022/71, regulation 20')}). A Notice to Owner posted is served on the second working day after posting. The tool above gives both ends of this window for your own date.</p>
${h.table(['Your situation', 'What the Notice to Owner means'], [
  ['You paid the reduced rate in time', 'it should not arrive; if it does, send proof of payment'],
  ['You challenged informally and heard nothing', 'make formal representations and mention your challenge'],
  ['Your informal challenge was rejected', `make formal representations within ${h.E.representationsDays} days, or pay the full amount`],
  ['You did nothing', `pay the full amount or make representations within ${h.E.representationsDays} days`],
  ['The notice came by post after a camera recording', 'that notice was already the Notice to Owner'],
], 'England. GOV.UK describes the same sequence for all council penalties.', ['l', 'l'])}

<h2>The 28 days that matter most</h2>
<p>Formal representations are the stage where the law lists what the council must consider. The grounds include: the contravention did not occur; you were not the owner at the time; the vehicle was taken without consent; it was on hire and the hirer accepted liability; the penalty exceeded the applicable amount; there was a procedural impropriety; the traffic order is invalid; and the penalty had already been paid (${h.src('si2022_576', 'SI 2022/576, regulation 5')}). The council can also cancel on compelling reasons outside the list. Our ${h.a('formal-representations', 'formal representations page')} goes through each ground, and its letter builder drafts the text.</p>
<p>The council has ${h.E.councilDecisionDays} days to decide. If it accepts, the penalty is cancelled. If it rejects, the notice of rejection gives you ${h.E.afterRejectionDays} days to pay or appeal to the ${h.a('parking-appeal-tribunal', 'adjudicator')}.</p>

<h2>If you do nothing</h2>
<p>When the ${h.E.representationsDays} days given by the Notice to Owner end without payment or representations, the council may serve a charge certificate, which increases the penalty by ${h.E.surchargePct}% (${h.src('si2022_71', 'regulation 21')}). Fourteen days after that, it can ask the county court to register the debt. Each step is described on our ${h.a('charge-certificate', 'charge certificate page')}.</p>

<h2>Check the letter itself</h2>
<p>A Notice to Owner must contain specific information: the date of the penalty notice, the contravention, the amount, how to pay, how to make representations and the grounds. It must also be served within the ${h.E.ntoLatestMonths}-month limit. A letter that is missing these details, or arrives too late, may itself be the procedural impropriety that justifies cancelling the penalty. Compare it with the original notice: dates, registration and location should all match.</p>
<p>The second mini-tool above recalculates the end of the reduced-rate period, useful if you are checking whether a payment you made was in time. As always, the tools here read the regulations and leave the decision to the council and the adjudicator; payment and representations go only through the channels printed on your notice.</p>`,
  },
});
