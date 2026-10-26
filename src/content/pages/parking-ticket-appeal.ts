import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'parking-ticket-appeal',
  group: 'appeal',
  order: 50,
  tool: { kind: 'letter', props: { kind: 'council-informal' } },
  mini: { kind: 'mini:tribunal' },
  related: ['appeal-parking-charge-notice', 'appeal-penalty-charge-notice', 'popla-appeal', 'parking-appeal-tribunal', 'pcn-vs-parking-charge-notice'],
  sources: ['govuk_tickets', 'si2022_576', 'code2026', 'popla', 'ias'],
  demarche: true,
  en: {
    slug: 'parking-ticket-appeal',
    nav: 'How to appeal a parking ticket',
    card: 'The two appeal routes side by side, council and private, with a letter builder for each stage and the deadline that applies.',
    title: 'Parking Ticket Appeal: Council and Private Routes Compared',
    description: 'How to appeal a UK parking ticket: the council route to a tribunal, the private route to POPLA or the IAS, the deadlines and a letter built in your browser.',
    h1: 'How to appeal a parking ticket',
    intro: 'Choose the stage you are at, tick your reasons and copy the letter: it is built in your browser, and the routes and deadlines follow below.',
    resume: (h) => `Appealing a parking ticket starts with one question: who issued it. A penalty charge notice from a council or Transport for London follows a route set by law: an informal challenge while the reduced rate is open, formal representations once the Notice to Owner arrives, then an appeal to an independent tribunal if the council rejects them. A parking charge from a private company follows a route set by contract and by the parking codes: a first appeal to the operator, then an appeal to the independent service the operator belongs to, POPLA or the IAS, and only then, if the company sues, a county court. The time limits differ: in England, formal representations are due within ${h.E.representationsDays} days of the Notice to Owner and a tribunal appeal within ${h.E.afterRejectionDays} days of the rejection, while under the government Code a private appeal is due within ${h.CODE.appealDays} days of delivery and a POPLA appeal within ${h.POPLA.appealDays} days of the rejection. The letter builder above covers all four stages.`,
    faqs: (h) => [
      { q: 'Is it worth appealing a parking ticket?', a: 'It is worth it when you have a reason that the rules recognise and evidence to support it: unclear signs, a valid ticket or permit, a breakdown, a grace period, a late or defective notice. An appeal with no reason and no evidence rarely succeeds. Weigh the risk of losing the reduced rate, which the rules partly protect if you appeal early.' },
      { q: 'Do I lose the reduced rate if my parking appeal fails?', a: `Not always. For a council notice, gov.uk says that if you challenge within ${h.E.discountDays} days and the council rejects your challenge, it may offer the reduced rate again. For a private charge, the Code says that if you appeal within ${h.CODE.appealDays} days, the rate you could pay at that time stays open for ${h.CODE.discountHeldDays} days after a rejection. At the independent stage, the reduced rate is usually gone.` },
      { q: 'What evidence should I send with a parking appeal?', a: 'Photographs of the signs and road markings as a driver would see them, your ticket, permit or payment record, any breakdown or medical report, and the notice itself. Date your photographs and keep the originals. Send copies, not originals, and keep proof of the date you sent your appeal, such as an online confirmation or a certificate of posting.' },
      { q: 'Can someone else write my parking appeal for me?', a: 'Yes, a relative or friend can help you draft it, and the letter builder on this page produces a text you can adapt. The appeal is still made in your name, as driver, keeper or hirer, and the operator or council may ask an authorised representative for proof of authority. Check every fact in the letter before you send it.' },
    ],
    body: (h) => `
<h2>Two routes, side by side</h2>
${h.table(['Stage', 'Council or TfL penalty charge notice', 'Private parking charge'], [
  ['First step', 'informal challenge, ideally within the reduced-rate period', `appeal to the operator within ${h.CODE.appealDays} days of delivery`],
  ['Formal step', `representations within ${h.E.representationsDays} days of the Notice to Owner`, 'operator’s answer within its time limit'],
  ['Independent stage', `tribunal, within ${h.E.afterRejectionDays} days of the rejection (England)`, `POPLA within ${h.POPLA.appealDays} days, or the IAS within the time it states`],
  ['If you lose', 'pay within the period in the decision', `pay; POPLA allows ${h.POPLA.payAfterDecisionDays} days`],
  ['Final step for the creditor', 'charge certificate, court registration, enforcement agents', 'debt letters, then a county court claim'],
], 'England for the council column (SI 2022/576); Private Parking Code of Practice and POPLA FAQs for the private column.', ['l', 'l', 'l'])}
<p>If you are not sure which route you are on, the ${h.a('home', 'ticket checker')} reads the heading and the issuer, and the ${h.a('pcn-vs-parking-charge-notice', 'comparison page')} explains the difference in detail.</p>

<h2>Grounds that the rules recognise</h2>
<p>For council notices in England, regulation 5(4) of the ${h.src('si2022_576', 'representations and appeals regulations')} lists the grounds for formal representations: the contravention did not occur; the recipient was not the owner; the vehicle was taken without consent; a hire firm with a signed liability statement; the penalty exceeded the amount applicable; a procedural impropriety; an invalid traffic order; for some postal notices, no one prevented the officer from fixing the notice; and the penalty already paid. Councils may also cancel for mitigating circumstances, which the letter builder lets you explain.</p>
<p>For private charges, the strongest grounds come from Schedule 4 to the Protection of Freedoms Act 2012, when the keeper is pursued, and from the ${h.src('code2026', 'government Code')}, whose Appeals Charter lists cases where a charge must be cancelled or reduced to ${h.gbp(h.CODE.reducedCharge)}. Unclear signs, grace periods and paid stays remain common grounds under both the current industry code and the new one.</p>

<h2>Five habits that make appeals work</h2>
<ol>
<li><strong>Act inside the first deadline.</strong> Each route rewards early action: the reduced rate is protected and you keep every later stage open.</li>
<li><strong>One reason, one piece of evidence.</strong> A short appeal that names the ground and attaches proof is easier to accept than a long complaint.</li>
<li><strong>Use the channel on the notice.</strong> Councils and operators state where appeals go; an appeal sent elsewhere may not count.</li>
<li><strong>Keep proof of sending.</strong> An online receipt, an email or a certificate of posting shows you met the deadline.</li>
<li><strong>Note every date.</strong> The ${h.a('pcn-deadlines', 'deadline countdown')} lists them and exports a calendar file.</li>
</ol>

<h2>Where each stage is explained</h2>
<p>Council notices: the ${h.a('appeal-penalty-charge-notice', 'council appeal page')}, the ${h.a('formal-representations', 'formal representations page')} and the ${h.a('parking-appeal-tribunal', 'tribunal page')}, whose mini-tool under the summary gives your last day. Private charges: the ${h.a('appeal-parking-charge-notice', 'private appeal page')}, then ${h.a('popla-appeal', 'POPLA')} or the ${h.a('ias-appeal', 'IAS')}. Nothing you type in the builders is sent anywhere; the letters are drafting aids, not legal advice. If you are unsure which reason applies, start with the one you can prove best: a photograph or a receipt carries more weight than a long explanation without evidence.</p>`,
  },
});
