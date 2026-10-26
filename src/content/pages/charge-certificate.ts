import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'charge-certificate',
  group: 'council',
  order: 41,
  tool: { kind: 'mini:cc' },
  mini: { kind: 'mini:witness' },
  related: ['parking-fine-bailiffs', 'notice-to-owner', 'pcn-deadlines', 'penalty-charge-notice'],
  sources: ['si2022_71', 'govuk_tickets', 'ni_pcn', 'tfl_red'],
  demarche: true,
  en: {
    slug: 'charge-certificate',
    nav: 'Charge certificate',
    card: 'The 50% increase on an unpaid council PCN, the order for recovery that follows 14 days later, and the 21-day witness statement that can reopen the case.',
    title: 'Charge Certificate: the 50% Rise and the Order for Recovery',
    description: 'A charge certificate raises an unpaid council PCN by 50%. Then comes an order for recovery at court, with 21 days for a witness statement. Work out your amount.',
    h1: 'Charge certificate and order for recovery',
    intro: 'Type the penalty printed on your notice: the tool shows the amount after the charge certificate and the next court deadlines.',
    resume: (h) => `A charge certificate is the notice a council serves when a Penalty Charge Notice has gone unpaid and unchallenged through the whole Notice to Owner period. It increases the penalty by ${h.E.surchargePct}%: a ${h.gbp(h.E.band2.higher)} penalty outside London becomes ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))}, a ${h.gbp(h.L.bandA.higher)} London band A penalty becomes ${h.gbp(h.L.bandA.higher * (1 + h.E.surchargePct / 100))}. In England, if the increased amount is still not paid ${h.E.orderAfterCcDays} days after the certificate is served, the council can ask the county court's Traffic Enforcement Centre to register the debt as if it were a court order, without a hearing on the merits. You then receive an order for recovery, and you have ${h.E.witnessStatementDays} days to pay or file a witness statement on one of a few narrow grounds, such as never having received the Notice to Owner. If neither happens, the council can pass the debt to enforcement agents, whose fixed fees are added on top. The certificate is therefore the last point at which the debt can be settled simply.`,
    faqs: (h) => [
      { q: 'Can I appeal against a charge certificate?', a: 'Not on the merits of the parking itself: that chance was the formal representations stage after the Notice to Owner. Once the order for recovery arrives, a witness statement can be filed on limited grounds, for example that you never received the Notice to Owner, or that you made representations or an appeal and got no answer. If accepted, the case goes back to the council.' },
      { q: 'Is the charge certificate amount always the penalty plus 50%?', a: `Yes for council and TfL penalties in England, Wales and Scotland: the regulations add half the penalty. In Northern Ireland the ${h.gbp(h.NI.pcn)} penalty becomes ${h.gbp(h.NI.cc)}, also half as much again. TfL red route penalties of ${h.gbp(h.L.tflRedRoute)} become ${h.gbp(h.L.tflCc)}. The certificate itself states the new amount and where to pay it.` },
      { q: 'What happens if I pay the increased amount straight away?', a: 'The case ends. Paying the charge certificate amount before the council registers the debt avoids the order for recovery and any enforcement agent fees. Pay through the channels on the certificate and keep the receipt. If you believe you should never have reached this stage, pay only if you are content to give up the dispute.' },
    ],
    body: (h) => `
<h2>How the steps follow each other</h2>
${h.table(['Step', 'When', 'Amount on a band 2 higher penalty'], [
  ['Penalty Charge Notice', 'day of the contravention', h.gbp(h.E.band2.higher)],
  ['Notice to Owner', `from day ${h.E.ntoAfterDays}`, h.gbp(h.E.band2.higher)],
  ['Charge certificate', `after the ${h.E.ccAfterDays} days of the Notice to Owner`, h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))],
  ['Order for recovery', `${h.E.orderAfterCcDays} days after the certificate`, h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))],
  ['Witness statement deadline', `${h.E.witnessStatementDays} days after the order`, h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))],
  ['Enforcement agents', 'after that', `${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))} plus fixed fees`],
], `England outside London: ${h.src('si2022_71', 'SI 2022/71, regulations 21 to 23')}.`, ['l', 'l', 'r'])}

<h2>An example with dates</h2>
<p>A Notice to Owner served on ${h.date('2026-12-02')} leaves ${h.E.ccAfterDays} days to pay or make representations. If nothing happens, a charge certificate can be served from ${h.date(plus('2026-12-02', h.E.ccAfterDays))}. Suppose it is served on ${h.date('2027-01-05')}: the council can apply for registration from ${h.date(plus('2027-01-05', h.E.orderAfterCcDays))}. If the order for recovery is served on ${h.date('2027-02-01')}, a witness statement must reach the Traffic Enforcement Centre by ${h.date(plus('2027-02-01', h.E.witnessStatementDays - 1))}, counting the day of service as day one. The second mini-tool above gives that last date for yours.</p>

<h2>The witness statement: a narrow door</h2>
<p>A witness statement is not a second appeal about whether you parked legally. It deals with what went wrong in the process. The grounds are printed on the form sent with the order for recovery and cover cases such as these: you did not receive the Notice to Owner; you made representations but never received a rejection; you appealed to the adjudicator but had no response; or you had already paid the penalty in full. A witness statement is made under a statement of truth, so it must be accurate. If the court accepts it, the order for recovery is revoked and the council must go back a step, often to the Notice to Owner.</p>
<p>If you are past the ${h.E.witnessStatementDays} days, the form also allows an application to file out of time with your reasons, such as being away or not receiving the order. Explain the facts with dates.</p>

<h2>Northern Ireland, Wales and Scotland</h2>
<p>In Northern Ireland, nidirect explains that a charge certificate raising the penalty to ${h.gbp(h.NI.cc)} can follow ${h.NI.ccAfterDays} days after the Notice to Owner, and that a Notice of Enforcement of Charge Certificate gives ${h.NI.statDecDays} days to make a statutory declaration (${h.src('ni_pcn', 'nidirect')}). In Wales and Scotland the increase is also ${h.E.surchargePct}%; the recovery route uses each nation's own court procedure, described in the letters you receive. GOV.UK's summary for England is in its ${h.src('govuk_tickets', 'parking tickets guide')}.</p>

<h2>Checking the certificate</h2>
<p>A charge certificate should only arrive after the full period given by the Notice to Owner has passed without payment or representations. Compare its date with the date you received the Notice to Owner: a certificate served before the ${h.E.ccAfterDays} days have run, or after you made representations that were never decided, points to a procedural problem. Note it in writing to the council at once.</p>

<h2>Before enforcement agents</h2>
<p>Once a warrant goes to enforcement agents, fixed fees apply from the first letter. Our ${h.a('parking-fine-bailiffs', 'bailiffs page')} shows how they add up. Paying at the charge certificate stage, or acting on the order for recovery within ${h.E.witnessStatementDays} days, is far cheaper than any later step.</p>`,
  },
});
