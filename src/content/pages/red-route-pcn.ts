import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'red-route-pcn',
  group: 'places',
  order: 61,
  tool: { kind: 'countdown', props: { mode: 'council', area: 'tfl' } },
  mini: { kind: 'mini:londonband' },
  related: ['london-pcn', 'parking-appeal-tribunal', 'appeal-penalty-charge-notice', 'charge-certificate'],
  sources: ['tfl_red', 'london_levels', 'si2022_71', 'si2022_576'],
  demarche: true,
  en: {
    slug: 'red-route-pcn',
    nav: 'TfL red route PCN',
    card: 'A penalty from Transport for London on a red route: the amount, the 14 or 21 days at half price, the charge certificate and appeals to London Tribunals.',
    title: 'Red Route PCN from TfL: Amount, Deadlines and Appeals',
    description: 'A TfL red route PCN costs £160, or £80 if paid within 14 days, or 21 for a camera notice by post, and £240 after a charge certificate. Your dates and appeals.',
    h1: 'TfL red route PCN: amount, dates and appeals',
    intro: 'Enter the date on your TfL notice and how it arrived: the countdown lists the reduced-rate deadline, the challenge dates and the charge certificate.',
    resume: (h) => `Red routes are the main roads in London managed by Transport for London rather than by the boroughs, marked with red lines instead of yellow ones. Stopping restrictions on them are strict, because they carry buses and heavy traffic, and Transport for London enforces them with civil enforcement officers and cameras. A red route Penalty Charge Notice costs ${h.gbp(h.L.tflRedRoute)}. TfL halves it to ${h.gbp(h.L.tflRedRoute * (1 - h.E.discountPct / 100))} if you pay within ${h.L.discountDays} days, or within ${h.L.discountDaysCameraPost} days when the notice was sent by post after a camera recording, and the notice states which period applies. If nothing is paid or challenged, a charge certificate raises it to ${h.gbp(h.L.tflCc)}. The challenge route is the same as for a borough penalty: representations to TfL, then an appeal to London Tribunals, which are independent of TfL. A red route PCN is a civil penalty under the Traffic Management Act 2004, not a criminal fine, and carries no penalty points.`,
    faqs: (h) => [
      { q: 'What is the difference between a double and a single red line?', a: 'Double red lines generally mean no stopping at any time, even briefly, except for licensed taxis and Blue Badge holders picking up or setting down where allowed. Single red lines apply during the hours shown on nearby signs. Red route bays, marked in boxes, allow parking or loading at set times. The signs at the spot decide, so photograph them if you plan to challenge.' },
      { q: 'Can I stop on a red route to drop someone off?', a: 'On double red lines, normally not, apart from the exceptions TfL lists such as licensed taxis. Some red route bays allow short stops for loading or setting down during certain hours. If you stopped in a bay, check the plate next to it for the times and the purpose allowed, and quote it in your challenge if you complied.' },
      { q: 'Do I pay TfL or the borough for a red route PCN?', a: `Transport for London. The notice is issued in its name and payment, challenges and the charge certificate all go through TfL, not through the borough in which the road lies. The amount is ${h.gbp(h.L.tflRedRoute)} whatever the borough's own band. Use only the payment and challenge channels printed on the notice.` },
    ],
    body: (h) => `
<h2>What a red route PCN costs at each stage</h2>
${h.table(['Stage', 'Amount'], [
  [`Paid within ${h.L.discountDays} days (or ${h.L.discountDaysCameraPost} for a posted camera notice)`, h.gbp(h.L.tflRedRoute * (1 - h.E.discountPct / 100))],
  ['Paid after that, before a charge certificate', h.gbp(h.L.tflRedRoute)],
  ['After a charge certificate', h.gbp(h.L.tflCc)],
], `${h.src('tfl_red', 'Transport for London: red route penalty charges')}.`, ['l', 'r'])}
<p>For comparison, a borough in band A charges ${h.gbp(h.L.bandA.higher)} for a higher-rate contravention and a band B borough ${h.gbp(h.L.bandB.higher)} (${h.src('london_levels', 'London levels')}). The mini-tool above shows the borough amounts.</p>

<h2>Dates for a red route notice</h2>
<p>An officer fixes a notice to a car on a red route on ${h.date('2026-11-20')}. The reduced rate of ${h.gbp(h.L.tflRedRoute * (1 - h.E.discountPct / 100))} runs until ${h.date(plus('2026-11-20', h.L.discountDays - 1))}. If nothing is paid, a Notice to Owner can be posted from ${h.date(plus('2026-11-20', h.E.ntoAfterDays))}, opening ${h.E.representationsDays} days for formal representations. A camera notice posted on ${h.date('2026-11-27')} would be served on ${h.date('2026-11-30')}, after the weekend, and its reduced rate would run until ${h.date(plus('2026-11-30', h.L.discountDaysCameraPost - 1))} (${h.src('si2022_71', 'SI 2022/71, regulations 3 and 10')}). The countdown at the top gives all of these for your own date and saves them to your calendar.</p>

<h2>Challenging TfL</h2>
<p>For a notice fixed to the car, TfL accepts an informal challenge before the Notice to Owner; for a camera notice, you make representations straight away. Formal representations follow the statutory grounds: the contravention did not occur, you were not the owner, the vehicle was taken without consent, the penalty exceeded the applicable amount, procedural impropriety and the others listed in ${h.src('si2022_576', 'SI 2022/576')}. If TfL rejects them, you have ${h.E.afterRejectionDays} days to appeal to London Tribunals. The ${h.a('appeal-penalty-charge-notice', 'appeal letter builder')} drafts the first letter.</p>

<h2>Evidence that matters on red routes</h2>
<ul>
<li>The signs and markings at the exact place, including any time plates for single red lines or bays.</li>
<li>For a camera notice, the full images or clip: how long the vehicle stopped, and what it was doing.</li>
<li>Proof of an exemption, such as a Blue Badge used where the rules allow it.</li>
<li>Anything that forced you to stop: a breakdown, an accident ahead, an instruction from the police.</li>
</ul>
<p>Mitigation alone rarely wins at the tribunal, but TfL can cancel on discretion at the challenge stage; see our ${h.a('parking-appeal-tribunal', 'tribunal page')} on what adjudicators can and cannot do.</p>

<h2>Red routes and the boroughs side by side</h2>
<p>A street can change hands at a junction: a red route belongs to TfL, the side road beyond it to the borough. Two notices issued a few metres apart can therefore come from two different authorities, with two different amounts and two different addresses for challenges. Check the name at the top of your notice before you pay or write, and send everything to the authority that issued it. London Tribunals hears appeals against both.</p>

<h2>If it reaches the charge certificate</h2>
<p>At ${h.gbp(h.L.tflCc)}, the debt can then be registered at court after ${h.E.orderAfterCcDays} days. Our ${h.a('charge-certificate', 'charge certificate page')} explains the witness statement that can reopen the case if you never received the earlier letters. Acting earlier is always cheaper: the reduced rate is a third of the final amount.</p>`,
  },
});
