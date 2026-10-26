import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'scotland-parking-fines',
  group: 'places',
  order: 62,
  tool: { kind: 'countdown', props: { mode: 'council', area: 'scotland' } },
  mini: { kind: 'mini:scotpcn' },
  related: ['parking-appeal-tribunal', 'fixed-penalty-notice', 'private-parking-fine', 'pcn-fine-amounts'],
  sources: ['scot_levels', 'scot_consult', 'scot_tribunal', 'pofa4', 'code_em'],
  demarche: true,
  en: {
    slug: 'scotland-parking-fines',
    nav: 'Scotland',
    card: 'Council PCNs in Scotland up to £100, pavement and dropped kerb penalties, police fixed penalties, private charges without keeper liability, and the tribunal route.',
    title: 'Parking Fines in Scotland: PCN Levels, Appeals and Rules',
    description: 'Parking fines in Scotland: council PCNs up to £100, halved within 14 days, pavement parking penalties, police tickets, private charges and the tribunal route.',
    h1: 'Parking fines in Scotland',
    intro: 'Enter the date on your Scottish council notice and its amount: the countdown gives the reduced-rate deadline and the steps that follow if it stays unpaid.',
    resume: (h) => `Scotland has its own parking rules, and three kinds of ticket. Most councils run decriminalised parking enforcement and issue Penalty Charge Notices: since ${h.date(h.S.maxSince)} the maximum level has been ${h.gbp(h.S.max)}, up from ${h.gbp(h.S.previousMax)}, and councils may set less, except that pavement parking, dropped kerb and double parking penalties must be ${h.gbp(h.S.pavementDroppedDouble)}. A penalty is halved if paid within ${h.S.discountDays} days and increased by ${h.S.surchargePct}% after a charge certificate. Where a council does not run civil enforcement, parking remains a police matter, with a fixed penalty of ${h.gbp(h.S.policeFpn)}, rising to ${h.gbp(h.S.policeFpnLate)} if unpaid. Private car parks issue parking charges, but Schedule 4 to the Protection of Freedoms Act 2012 does not apply in Scotland, so a company cannot rely on it to make the registered keeper pay. Appeals against council penalties go to the First-tier Tribunal for Scotland within ${h.S.appealDays} days of the notice of rejection. A consultation on penalty levels closed on ${h.date(h.S.consultationClosed)}.`,
    faqs: (h) => [
      { q: 'Is pavement parking banned everywhere in Scotland?', a: `Scotland introduced a national prohibition on pavement parking, parking at dropped kerbs and double parking, with exemptions councils can set for particular streets. Councils that enforce it issue penalties of ${h.gbp(h.S.pavementDroppedDouble)}, halved if paid within ${h.S.discountDays} days. Check signs for any exempted street, and the council website for the date it began enforcing.` },
      { q: 'Do I have to pay a private parking charge in Scotland if I was not driving?', a: 'The keeper-liability rules of Schedule 4 to the Protection of Freedoms Act 2012 apply only in England and Wales. In Scotland a company has to pursue the driver under the contract formed by the signs, so the registered keeper who was not driving is in a stronger position. The government Code, once in force, also applies to car parks in Scotland.' },
      { q: 'Will Scottish PCN levels change after the consultation?', a: `Transport Scotland consulted on penalty charge levels for decriminalised parking enforcement, and the consultation closed on ${h.date(h.S.consultationClosed)}. On ${h.date(h.P.retrieved_at)} the maximum remained ${h.gbp(h.S.max)}. Any change would be made by new rules with a start date; the amount printed on your notice is the one that applies to it.` },
      { q: 'How do I appeal a council parking fine in Scotland?', a: `First make representations to the council, using the method on the notice. If the council sends a notice of rejection, you can appeal to the First-tier Tribunal for Scotland, General Regulatory Chamber, within ${h.S.appealDays} days of that notice. The tribunal is independent of councils and decides on the evidence from both sides.` },
    ],
    body: (h) => `
<h2>Council, police or company: which ticket</h2>
${h.table(['Ticket', 'Issued by', 'Amount', 'If unpaid'], [
  ['Penalty Charge Notice', 'a council with decriminalised enforcement', `up to ${h.gbp(h.S.max)}, halved within ${h.S.discountDays} days`, `charge certificate, +${h.S.surchargePct}%`],
  ['Pavement, dropped kerb, double parking PCN', 'an enforcing council', h.gbp(h.S.pavementDroppedDouble), `charge certificate, +${h.S.surchargePct}%`],
  ['Fixed Penalty Notice', 'Police Scotland', h.gbp(h.S.policeFpn), h.gbp(h.S.policeFpnLate)],
  ['Parking charge', 'a private company', 'set by the company; the government Code will cap it', 'debt letters, possible court action'],
], `${h.src('scot_levels', 'Transport Scotland: DPE report 2024-25, penalty charges')}.`, ['l', 'l', 'l', 'l'])}
<p>Transport Scotland's annual report lists the councils that run decriminalised parking enforcement. If the council for the street where you parked does, the yellow-line ticket is a council penalty; if not, it is the police who enforce, and a police ticket follows criminal procedure. Our ${h.a('fixed-penalty-notice', 'fixed penalty page')} explains that route.</p>

<h2>Dates on a Scottish council PCN</h2>
<p>For a penalty of ${h.gbp(h.S.max)} fixed to a car in Edinburgh or Glasgow on ${h.date('2026-11-30')}, which is St Andrew's Day and a Scottish bank holiday, the reduced rate of ${h.gbp(h.S.max * (1 - h.E.discountPct / 100))} lasts ${h.S.discountDays} days, until ${h.date(plus('2026-11-30', h.S.discountDays - 1))}. If it stays unpaid, a Notice to Owner can follow after ${h.S.ntoAfterDays} days, from ${h.date(plus('2026-11-30', h.S.ntoAfterDays))}, inviting payment or representations. A charge certificate then raises the amount to ${h.gbp(h.S.max * (1 + h.E.surchargePct / 100))}. The countdown at the top uses Scottish bank holidays and counts from the date printed on the notice; the council's own notice gives the exact dates it applies.</p>

<h2>Appealing to the First-tier Tribunal</h2>
<p>Parking and bus lane appeals in Scotland moved to the First-tier Tribunal for Scotland, General Regulatory Chamber. After the council rejects your representations, you have ${h.S.appealDays} days from the notice of rejection to appeal (${h.src('scot_tribunal', 'Tribunal: before you appeal')}). The tribunal asks for the notice, the council's rejection and your evidence. As in England, it decides whether the penalty was properly issued, not whether it seems harsh, so concentrate on the facts: signs, lines, times, permits, and any failure by the council to follow its procedure.</p>

<h2>Private car parks in Scotland</h2>
<p>A charge from a company at a supermarket or retail park in Scotland is a contract claim, as anywhere in the UK. The difference is that the ${h.src('pofa4', 'Schedule 4 keeper-liability rules')} do not extend to Scotland, so the company must identify the driver. The government Private Parking Code of Practice, once in force, does apply in Scotland, together with England and Wales (${h.src('code_em', 'explanatory memorandum, paragraph 4.4')}). Its cap of ${h.gbp(h.CODE.cap)}, its ${h.CODE.appealDays}-day appeal period and its grace periods will cover Scottish car parks too. Our ${h.a('private-parking-fine', 'private ticket page')} explains the route.</p>

<h2>What may change</h2>
<p>A ${h.src('scot_consult', 'Transport Scotland consultation on penalty charge notice levels')} closed on ${h.date(h.S.consultationClosed)}. Until any new levels are set and dated, the figures on this page apply. The mini-tool above shows the reduced and increased amounts for any penalty up to the current maximum.</p>

<h2>Practical points</h2>
<ul>
<li>Bank holidays differ from England: St Andrew's Day and the January bank holidays affect counts that use working days.</li>
<li>Keep the notice, your photographs and proof of the date you sent representations.</li>
<li>Pay only through the channels printed on the council notice.</li>
</ul>`,
  },
});
