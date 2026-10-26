import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'northern-ireland-parking-fines',
  group: 'places',
  order: 64,
  tool: { kind: 'countdown', props: { mode: 'council', area: 'ni' } },
  mini: { kind: 'mini:nipcn' },
  related: ['parking-appeal-tribunal', 'charge-certificate', 'bus-lane-fine', 'private-parking-fine'],
  sources: ['ni_pcn', 'ni_bus', 'pofa4', 'bankhol'],
  demarche: true,
  en: {
    slug: 'northern-ireland-parking-fines',
    nav: 'Northern Ireland',
    card: 'PCNs in Northern Ireland: £90, or £45 within 14 days, £135 after a charge certificate, bus lane penalties, the adjudicator and the 21-day statutory declaration.',
    title: 'Parking Fines in Northern Ireland: PCN Dates and Amounts',
    description: 'Parking fines in Northern Ireland: a £90 PCN, £45 if paid within 14 days, £135 after a charge certificate, bus lanes, adjudication and statutory declarations.',
    h1: 'Parking fines in Northern Ireland',
    intro: 'Enter the date on your Northern Ireland PCN: the countdown gives the last day for the reduced rate, the Notice to Owner and the charge certificate.',
    resume: (h) => `In Northern Ireland, on-street parking and bus lanes are enforced by the Department for Infrastructure rather than by councils, and the rules are set out on nidirect. A Penalty Charge Notice costs ${h.gbp(h.NI.pcn)}, reduced to ${h.gbp(h.NI.discounted)} if paid within ${h.NI.discountDays} days. A challenge made within those ${h.NI.discountDays} days freezes the reduced rate while it is considered. If nothing is paid, a Notice to Owner can be sent to the registered keeper after ${h.NI.ntoAfterDays} days; if that is ignored, a charge certificate follows a further ${h.NI.ccAfterDays} days later and raises the penalty to ${h.gbp(h.NI.cc)}. Representations that are rejected can be taken to an independent adjudicator, and a lost appeal must be paid within ${h.NI.payAfterAdjudicationDays} days. At the enforcement stage, a Notice of Enforcement of Charge Certificate gives ${h.NI.statDecDays} days to make a statutory declaration, for example if you never received the earlier notices. Bus lane penalties follow the same amounts. Private car parks issue contract claims, without the English keeper-liability rules.`,
    faqs: (h) => [
      { q: 'Who issues parking tickets in Northern Ireland?', a: 'On-street parking and bus lane penalties are issued for the Department for Infrastructure, whose Parking Enforcement Processing Unit handles payments and challenges. Council-run car parks have their own arrangements, and private car parks are managed by companies issuing parking charges. The heading and the name on the notice tell you which you have.' },
      { q: 'What is a statutory declaration for a parking fine in Northern Ireland?', a: `It is a formal written statement used at the enforcement stage when you have received a Notice of Enforcement of Charge Certificate. nidirect gives ${h.NI.statDecDays} days to make it. It covers cases such as not having received the Notice to Owner, or having made representations or an appeal that got no reply.` },
      { q: 'Does challenging a Northern Ireland PCN keep the reduced rate?', a: `Yes, if you challenge within the first ${h.NI.discountDays} days: nidirect says the reduced rate of ${h.gbp(h.NI.discounted)} is frozen while the challenge is considered. If the challenge is rejected, the letter tells you how long you have to pay at that rate. A challenge made later, after the Notice to Owner, is dealt with at the full amount.` },
    ],
    body: (h) => `
<h2>Amounts and dates</h2>
${h.table(['Stage', 'When', 'Amount'], [
  ['Penalty Charge Notice', 'day of issue', h.gbp(h.NI.pcn)],
  ['Reduced rate', `within ${h.NI.discountDays} days`, h.gbp(h.NI.discounted)],
  ['Notice to Owner', `after ${h.NI.ntoAfterDays} days unpaid`, h.gbp(h.NI.pcn)],
  ['Charge certificate', `${h.NI.ccAfterDays} days after the Notice to Owner`, h.gbp(h.NI.cc)],
  ['Statutory declaration', `${h.NI.statDecDays} days after the Notice of Enforcement`, h.gbp(h.NI.cc)],
], `${h.src('ni_pcn', 'nidirect: parking tickets (penalty charge notices)')}; bus lanes: ${h.src('ni_bus', 'nidirect')}.`, ['l', 'l', 'r'])}

<h2>A worked example</h2>
<p>A notice is issued in Belfast on ${h.date('2026-11-02')}. The reduced rate of ${h.gbp(h.NI.discounted)} applies for ${h.NI.discountDays} days, until ${h.date(plus('2026-11-02', h.NI.discountDays - 1))}. If nothing is paid or challenged, a Notice to Owner can be sent from ${h.date(plus('2026-11-02', h.NI.ntoAfterDays))}, and a charge certificate for ${h.gbp(h.NI.cc)} from ${h.date(plus('2026-11-02', h.NI.ntoAfterDays + h.NI.ccAfterDays))}. Northern Ireland has its own bank holidays, such as St Patrick's Day and the Battle of the Boyne holiday in July (${h.src('bankhol', 'GOV.UK bank holidays')}); the countdown above uses that list where working days count, and the mini-tool gives the main dates at a glance.</p>

<h2>Challenging and appealing</h2>
<p>You can challenge a penalty in writing, using the address or online service printed on the notice. Within the first ${h.NI.discountDays} days, the reduced rate is frozen while the challenge is looked at. After a Notice to Owner, the registered keeper can make formal representations. If they are rejected, the notice of rejection explains how to appeal to an independent adjudicator and by when; nidirect does not give a single period, so use the date printed on your notice. If you lose, payment is due within ${h.NI.payAfterAdjudicationDays} days. Our ${h.a('parking-appeal-tribunal', 'tribunal page')} compares the adjudication routes across the UK.</p>

<h2>Bus lanes</h2>
<p>Bus lane penalties in Northern Ireland are issued on the same scale: ${h.gbp(h.NI.pcn)}, ${h.gbp(h.NI.discounted)} within ${h.NI.discountDays} days, ${h.gbp(h.NI.cc)} after a charge certificate (${h.src('ni_bus', 'nidirect: bus lane PCNs')}). They are usually recorded by camera and posted to the keeper. Check the hours on the bus lane signs, which vary from one lane to another, and ask to see the images. The rules of England, such as the warning notice at new cameras, do not apply here; see our ${h.a('bus-lane-fine', 'bus lane page')} for the English rules only if you drove in England.</p>

<h2>Private car parks</h2>
<p>Charges from private car parks in Northern Ireland are contract claims. The keeper-liability rules in ${h.src('pofa4', 'Schedule 4 to the Protection of Freedoms Act 2012')} cover England and Wales only, so a company must show who was driving, and the government Private Parking Code is drafted for England, Wales and Scotland. Our ${h.a('private-parking-fine', 'private ticket page')} explains what a company can and cannot do.</p>

<h2>Paying</h2>
<p>Pay only through the methods printed on the notice. The reduced rate of ${h.gbp(h.NI.discounted)} is half the cost of the full penalty and a third of the amount after a charge certificate, so a prompt decision matters. Keep the payment reference: if a later letter arrives by mistake, it is your proof.</p>

<h2>At the enforcement stage</h2>
<p>When a charge certificate has gone unpaid, a Notice of Enforcement of Charge Certificate is the last warning. The statutory declaration within ${h.NI.statDecDays} days is the way to reopen the case if the earlier letters never reached you. Our ${h.a('charge-certificate', 'charge certificate page')} explains the equivalent steps in England.</p>`,
  },
});
