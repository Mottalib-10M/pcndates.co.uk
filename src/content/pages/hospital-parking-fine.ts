import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'hospital-parking-fine',
  group: 'private',
  order: 28,
  tool: { kind: 'mini:nhs' },
  mini: { kind: 'mini:grace' },
  related: ['blue-badge-parking-fine', 'parking-grace-period', 'appeal-parking-charge-notice', 'parking-charge-notice'],
  sources: ['nhs', 'code2026'],
  demarche: true,
  en: {
    slug: 'hospital-parking-charges',
    nav: 'Hospital parking',
    card: 'Hospital car parks in England: who should park free under the NHS principles, and how overrunning appointments are treated on appeal.',
    title: 'Hospital Parking Charges: Free Groups and Appeal Grounds',
    description: 'Hospital parking in England: who should park free under the NHS principles, what to do after an overrunning appointment and how to appeal a private charge.',
    h1: 'Hospital parking charges and fines',
    intro: 'Tell the tool who you are and how often you visit: it shows whether the NHS principles for England give you free parking.',
    resume: (h) => `Parking at NHS hospitals in England is governed by the NHS patient, visitor and staff car parking principles published by the Department of Health and Social Care. They say that certain groups should be able to park free: disabled people holding a Blue Badge, frequent outpatients who attend at least ${h.NHS.frequentTimes} times in ${h.NHS.frequentDays} days over at least ${h.NHS.frequentMonths} months, parents of sick children staying overnight, and staff working night shifts, with the overnight concessions running from ${h.NHS.nightFrom} to ${h.NHS.nightTo}. Each trust decides how to put this in place, often by registering your number plate at a desk or terminal. Many hospital car parks are run by private parking companies for the trust; a charge from them is a claim under contract, like any private parking charge. The government Code, once in force, lists an overrunning medical appointment, the onset of illness and emergencies among the reasons for which a charge must be cancelled on appeal with evidence. These principles cover England only; elsewhere, ask the health board or trust for its own policy.`,
    faqs: (h) => [
      { q: 'My hospital appointment ran late and I overstayed. Will the charge be cancelled?', a: 'Under the Appeals Charter of the government Code, a delay caused by an overrunning medical appointment, for the driver or a passenger, is a reason to cancel a charge on appeal when you provide reliable evidence. A letter or text from the clinic giving the appointment time and the time you were seen is the simplest proof. Send it with your first appeal.' },
      { q: 'Who counts as a frequent outpatient for free hospital parking?', a: `The NHS principles for England describe frequent outpatients as people who attend at least ${h.NHS.frequentTimes} times in ${h.NHS.frequentDays} days, for at least ${h.NHS.frequentMonths} months. The test is about the pattern of visits, not the illness behind them. Ask the trust how to register, because the concession usually depends on your plate being recorded before you park.` },
      { q: 'Can parents park free when their child is in hospital overnight?', a: `The principles say parents of sick children staying overnight should be able to park free, with the concession covering the evening and night period from ${h.NHS.nightFrom} to ${h.NHS.nightTo}, and up to ${h.NHS.parentVehicles} vehicles per child. The trust sets the practical arrangements, such as a permit or registration at the ward. Ask on the ward on the first evening, before a charge can be issued.` },
    ],
    body: (h) => `
<h2>Free parking under the NHS principles</h2>
<p>The ${h.src('nhs', 'NHS car parking principles')} apply to NHS trusts in England. They name the groups that should park free and leave each trust to organise it:</p>
${h.table(['Group', 'What the principles say', 'What to ask the trust'], [
  ['Disabled people with a Blue Badge', 'free parking', 'whether to display the badge only or also register the plate'],
  ['Frequent outpatients', `${h.NHS.frequentTimes} or more visits in ${h.NHS.frequentDays} days, for ${h.NHS.frequentMonths} months or more`, 'how to register for the concession'],
  ['Parents of sick children staying overnight', `free from ${h.NHS.nightFrom} to ${h.NHS.nightTo}, up to ${h.NHS.parentVehicles} vehicles`, 'where to collect a permit'],
  ['Night shift staff', `shifts within ${h.NHS.nightFrom} to ${h.NHS.nightTo}`, 'staff permit arrangements'],
], 'NHS patient, visitor and staff car parking principles (England), read on GOV.UK.', ['l', 'l', 'l'])}
<p>Ordinary visitors and most daytime patients are not covered and pay the tariff the trust sets. The tool at the top applies the groups to your case.</p>

<h2>When a hospital car park sends a charge</h2>
<p>If the car park is run by a private company, the charge follows the rules for any private parking charge: a reduced rate if paid early, an appeal to the operator, then an independent appeal. The Appeals Charter of the ${h.src('code2026', 'government Code')} is especially relevant in hospitals. Once the Code is in force, a charge must be cancelled on appeal, with reliable evidence, where:</p>
<ul>
<li>the driver or a passenger was delayed by an overrunning medical appointment;</li>
<li>the driver or a passenger suffered the onset of illness;</li>
<li>the vehicle was driven onto the site because of an emergency outside the driver's control, such as serious illness;</li>
<li>the vehicle broke down, or the payment machines were out of order with no reasonable alternative.</li>
</ul>
<p>The Charter also says no charge should be issued at all to ambulances, emergency health workers on a call with an authorised badge, or a breakdown recovery vehicle. A Blue Badge not displayed, but held and valid at the time, is a case for a reduced charge of ${h.gbp(h.CODE.reducedCharge)} the first time; see the ${h.a('blue-badge-parking-fine', 'Blue Badge page')}.</p>

<h2>Evidence that works</h2>
<p>Hospital appeals succeed or fail on paperwork. Keep the appointment letter or text, ask the clinic for a note of the time you were actually seen if it ran late, and keep any parking ticket or app record. For a concession group, a copy of the permit or the registration confirmation answers the charge directly. The first appeal must reach the operator within ${h.CODE.appealDays} days of delivery under the Code, and the ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} has reasons for emergencies and breakdowns.</p>

<h2>Grace minutes at a hospital car park</h2>
<p>A hospital pay and display car park falls under the same Annex B minimums as any other: ${h.CODE.sites.find((s) => s.id === 'pay-display')!.consideration} minutes of consideration and ${h.CODE.sites.find((s) => s.id === 'pay-display')!.grace} minutes of grace, ${h.CODE.sites.find((s) => s.id === 'pay-exit')!.grace} minutes where you pay on departure. The mini-tool under the summary checks an overstay, and the ${h.a('parking-grace-period', 'grace period page')} explains each category. Outside England, ask the health board or trust for its own parking policy.</p>`,
  },
});
