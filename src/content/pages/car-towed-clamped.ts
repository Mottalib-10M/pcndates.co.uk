import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'car-towed-clamped',
  group: 'council',
  order: 44,
  tool: { kind: 'mini:removal' },
  mini: { kind: 'mini:pcnamount' },
  related: ['penalty-charge-notice', 'pcn-fine-amounts', 'formal-representations', 'private-parking-fine'],
  sources: ['si2022_71_sch3', 'pofa54', 'si2022_576', 'govuk_tickets'],
  demarche: true,
  en: {
    slug: 'car-towed-clamped',
    nav: 'Car towed or clamped',
    card: 'What a council can charge to release a clamped or towed car outside London, and why clamping on private land is an offence in England and Wales.',
    title: 'Car Towed or Clamped: Release Fees and Your Rights in 2026',
    description: 'Car towed or clamped? Council release fees outside London, daily storage, the penalty on top, and why private clamping is an offence in England and Wales.',
    h1: 'Car towed or clamped: what you pay and what is allowed',
    intro: 'Enter the days your car spent in the pound and the penalty on the notice: the tool adds removal, storage and penalty under the national scale.',
    resume: (h) => `Being towed or clamped is the most expensive way a parking contravention can end. Councils in England can remove or immobilise vehicles parked in contravention, and outside London the charges are fixed in Schedule 3 to the 2022 regulations: ${h.gbp(h.E.removal)} for removal, ${h.gbp(h.E.storagePerDay)} for each day of storage, ${h.gbp(h.E.clampRelease)} to release a clamp and ${h.gbp(h.E.disposal)} if the vehicle is disposed of, all on top of the Penalty Charge Notice itself. London boroughs set their own removal and storage charges. Private land is a different story: in England and Wales, section 54 of the Protection of Freedoms Act 2012 made it a criminal offence to clamp, tow or otherwise immobilise a vehicle without lawful authority, and the driver's consent, even through a sign, does not count as authority. The one exception is a fixed barrier that was already there when you parked. Paying to get a car back does not remove your right to challenge the penalty afterwards.`,
    faqs: (h) => [
      { q: 'Can a private car park clamp my car in England?', a: 'No. Since section 54 of the Protection of Freedoms Act 2012 came into force, clamping or towing a vehicle on private land without lawful authority is an offence in England and Wales, and a sign saying you agree to it does not give authority. A private operator can issue a parking charge instead. A barrier that was in place when you parked is the exception.' },
      { q: 'Can I challenge a PCN after paying to release my towed car?', a: 'Yes. Councils require payment of the penalty and the release charges before handing the car back, but you can still make representations afterwards, and if they succeed the council refunds what you paid. Keep every receipt and photograph where the car was parked as soon as you can, including signs and road markings.' },
      { q: 'How quickly should I collect a car from the pound?', a: `As soon as you can: outside London each day of storage adds ${h.gbp(h.E.storagePerDay)}. Bring proof that you own or keep the vehicle and identification, and check the pound's opening hours on the council's website before travelling. If the car is not collected, the council can eventually dispose of it, which adds a further charge.` },
    ],
    body: (h) => `
<h2>What a council can charge outside London</h2>
${h.table(['Charge', 'Amount', 'When it applies'], [
  ['Penalty Charge Notice', `${h.gbp(h.E.band1.lower)} to ${h.gbp(h.E.band2.higher)}`, 'always, for the contravention'],
  ['Clamp release', h.gbp(h.E.clampRelease), 'if the car was immobilised'],
  ['Removal', h.gbp(h.E.removal), 'if the car was towed'],
  ['Storage', `${h.gbp(h.E.storagePerDay)} a day`, 'for each day in the pound'],
  ['Disposal', h.gbp(h.E.disposal), 'if the car is never collected'],
], `${h.src('si2022_71_sch3', 'SI 2022/71, Schedule 3')}. London boroughs set their own removal and storage charges.`, ['l', 'r', 'l'])}
<p>Take a car towed on a Friday evening for parking on a double yellow line in a band 2 area. Collected on Sunday, after two days in the pound, it costs ${h.gbp(h.E.removal)} for removal, ${h.gbp(2 * h.E.storagePerDay)} for storage and the ${h.gbp(h.E.band2.higher)} penalty: ${h.gbp(h.E.removal + 2 * h.E.storagePerDay + h.E.band2.higher)} in all. The tool at the top adds these for any number of days.</p>

<h2>Private land: no clamping, no towing</h2>
<p>For decades, clamping on private land was a notorious trap. ${h.src('pofa54', 'Section 54 of the Protection of Freedoms Act 2012')} ended it in England and Wales: a person who immobilises a vehicle, or moves or restricts it, to stop the person entitled to remove it from doing so, commits an offence unless they have lawful authority. The Act adds that consent, whether express or implied, is not lawful authority, so a notice on a wall saying "clamping in operation" changes nothing. The exception is a fixed barrier present when the vehicle was parked, such as a car park with a barrier at the exit.</p>
<p>What private operators do instead is issue parking charges, covered on our ${h.a('private-parking-fine', 'private ticket page')}. If someone clamps your car on private land in England or Wales and demands money, that is a matter for the police.</p>

<h2>Challenging after a removal</h2>
<p>The grounds for representations after a removal are the same as for any council penalty, with an extra one specific to towing: the charge demanded for release was more than the amount that applies (${h.src('si2022_576', 'SI 2022/576')}). Typical questions to ask: were the restrictions properly signed and marked at that spot; was the vehicle causing the problem the council relied on; were the release fees those of the scale; was the vehicle damaged in removal. Ask for the removal photographs and the officer's notes. Our ${h.a('formal-representations', 'formal representations builder')} produces the letter.</p>
<p>GOV.UK's general guidance on challenging a penalty applies in the same way (${h.src('govuk_tickets', 'GOV.UK: parking tickets')}).</p>

<h2>Practical points on the day</h2>
<ul>
<li>Phone the council or check its website to confirm the car was removed by them, not stolen.</li>
<li>Photograph the spot, the signs and the lines before anything changes.</li>
<li>Take the vehicle registration document or other proof that you keep the car, plus identification.</li>
<li>Inspect the car before leaving the pound and note any damage on the release paperwork.</li>
</ul>
<p>If you find the car gone and no sign of the council, ask the council's parking team first and then the police: a vehicle removed by a council is logged, and the pound can confirm it holds the car before you travel. Removal charges outside London are the same in every council area, so a pound asking for more than the national scale needs to explain why.</p>
<p>The second mini-tool shows the penalty itself at each stage, so you can see what is at stake if you decide to challenge rather than accept it.</p>`,
  },
});
