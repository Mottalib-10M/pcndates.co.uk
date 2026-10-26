import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'parking-fine-bailiffs',
  group: 'council',
  order: 45,
  tool: { kind: 'mini:bailiff' },
  mini: { kind: 'mini:witness' },
  related: ['charge-certificate', 'parking-fine-debt-collection', 'parking-county-court-claim', 'notice-to-owner'],
  sources: ['tcog', 'si2022_71', 'code2026'],
  demarche: true,
  en: {
    slug: 'parking-fine-bailiffs',
    nav: 'Bailiffs and parking fines',
    card: 'When enforcement agents can collect a parking debt, the fixed fees they add from 1 May 2026, and the difference between council penalties and private charges.',
    title: 'Parking Fine Bailiffs: Fees, Stages and How to Stop Them',
    description: 'When can bailiffs collect a parking fine? Council PCNs after an order for recovery, private charges only after a court judgment. Fixed fees from May 2026.',
    h1: 'Bailiffs and parking fines: fees and stages',
    intro: 'Enter the debt passed to the enforcement agent and the stage reached: the tool adds the fixed fees set by regulation.',
    resume: (h) => `Bailiffs, now called enforcement agents, can only collect a parking debt after a court process. For a council Penalty Charge Notice in England, that process is short: an unpaid charge certificate is registered at the county court's Traffic Enforcement Centre, an order for recovery is served, and if nothing is paid or filed within ${h.E.witnessStatementDays} days the council can obtain a warrant and pass it to enforcement agents. For a private parking charge, the company must first sue in the county court and win a judgment, and only an unpaid judgment can lead to enforcement. Once agents are instructed, their fees are fixed by the Taking Control of Goods (Fees) Regulations 2014, updated from ${h.date(h.ENF.from)}: ${h.gbp(h.ENF.compliance)} at the compliance stage, ${h.gbp(h.ENF.enforcement)} at the enforcement stage when an agent visits, and ${h.gbp(h.ENF.sale)} if goods are taken for sale, with ${h.ENF.pct}% added on the part of a debt above ${h.gbp(h.ENF.pctOver)}. On a typical parking debt, the fees can double the bill.`,
    faqs: (h) => [
      { q: 'Can a debt collector for a parking company send bailiffs?', a: 'No. A debt collection agency acting for a private parking company has no power to take goods or enter your home. Enforcement agents can only act on a court judgment that has not been paid. Until a county court claim has been issued and a judgment entered, letters from a collector are requests for payment, whatever they look like.' },
      { q: 'What is the compliance fee on a parking debt?', a: `It is the first fixed fee an enforcement agent can add, ${h.gbp(h.ENF.compliance)} since ${h.date(h.ENF.from)}, charged when the agent sends the notice of enforcement giving you time to pay before any visit. Paying in full at that point, or agreeing a payment plan, avoids the larger enforcement stage fee of ${h.gbp(h.ENF.enforcement)}.` },
      { q: 'Can I still challenge a council PCN once bailiffs are involved?', a: `Only through the court process, not by appealing the parking itself. If you never received the Notice to Owner or other letters, you can apply to the Traffic Enforcement Centre to file a witness statement out of time, explaining why. If the court accepts it, the warrant is recalled and the case returns to the council, and enforcement must stop.` },
    ],
    body: (h) => `
<h2>Council penalty or private charge: two routes to enforcement</h2>
${h.table(['Step', 'Council PCN (England)', 'Private parking charge'], [
  ['Debt becomes enforceable', `charge certificate registered ${h.E.orderAfterCcDays} days after service`, 'only after a county court judgment'],
  ['Last chance before agents', `${h.E.witnessStatementDays} days after the order for recovery`, 'pay the judgment or apply to set it aside'],
  ['Who can collect', 'certificated enforcement agents with a warrant', 'enforcement agents with a warrant on the judgment'],
  ['Fees added', 'Taking Control of Goods fixed fees', 'the same fixed fees'],
], `${h.src('si2022_71', 'SI 2022/71, regulations 21 to 23')}; ${h.src('tcog', 'Taking Control of Goods (Fees) Regulations 2014')}.`, ['l', 'l', 'l'])}

<h2>The fixed fees, worked through</h2>
<p>Take a band 2 higher penalty outside London that reached the charge certificate: ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100))}. Once a warrant is with an agent, the compliance fee brings it to ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100) + h.ENF.compliance)}. If no payment is made and the agent visits, the enforcement fee brings it to ${h.gbp(h.E.band2.higher * (1 + h.E.surchargePct / 100) + h.ENF.compliance + h.ENF.enforcement)}. The same London band A penalty at ${h.gbp(h.L.bandA.higher * (1 + h.E.surchargePct / 100))} would reach ${h.gbp(h.L.bandA.higher * (1 + h.E.surchargePct / 100) + h.ENF.compliance + h.ENF.enforcement)}. A ${h.gbp(h.E.band2.higher * (1 - h.E.discountPct / 100))} payment in the first ${h.E.discountDays} days would have ended it all.</p>
${h.table(['Stage', 'Fixed fee', 'Plus'], [
  ['Compliance', h.gbp(h.ENF.compliance), ''],
  ['Enforcement (visit)', h.gbp(h.ENF.enforcement), `${h.ENF.pct}% of the debt above ${h.gbp(h.ENF.pctOver)}`],
  ['Sale', h.gbp(h.ENF.sale), `${h.ENF.pct}% of the debt above ${h.gbp(h.ENF.pctOver)}`],
], `Schedule to the ${h.src('tcog', 'Taking Control of Goods (Fees) Regulations 2014')}, as substituted from ${h.date(h.ENF.from)}.`, ['l', 'r', 'l'])}
<p>The tool at the top applies these amounts to any debt. A single parking debt rarely exceeds ${h.gbp(h.ENF.pctOver)}, so the percentage usually does not apply.</p>

<h2>Stopping enforcement of a council penalty</h2>
<p>For a council penalty the key document is the order for recovery. Within ${h.E.witnessStatementDays} days you can file a witness statement on the grounds printed on the form, such as not having received the Notice to Owner, or having made representations or an appeal that was never answered. The second mini-tool gives the last day. After that, the form allows an application to file out of time, which explains why you did not act sooner. If accepted, the order is revoked and enforcement must stop while the council looks again. Details are on our ${h.a('charge-certificate', 'charge certificate page')}.</p>

<h2>Private parking: why bailiffs are a late stage</h2>
<p>A private operator cannot send agents because you ignored its letters. It must first issue a claim, which you can defend; see our ${h.a('parking-county-court-claim', 'county court claim page')}. The government Code laid on ${h.date(h.CODE.laid)} also requires debt-stage letters to point to free debt advice and limits the debt recovery add-on to ${h.gbp(h.CODE.debtRecoveryMax)} (${h.src('code2026', 'Code, clauses 8.3.9 and 9')}). Letters from a collector that mention enforcement agents before any judgment describe something that cannot yet happen.</p>

<h2>If an agent contacts you</h2>
<p>Enforcement agents must give notice before a visit, and the compliance stage exists precisely to give you that time. Use it: a single phone call to agree terms at that point avoids the largest fee in the table above. Ask for the warrant details and a breakdown of the fees, and compare them with the scale above. Agree a payment plan if you cannot pay at once; it is usually cheaper than the visit stage. Never ignore a notice of enforcement: the time it gives is short.</p>`,
  },
});
