import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'residential-parking-charge',
  group: 'private',
  order: 31,
  tool: { kind: 'mini:charter' },
  mini: { kind: 'mini:privatecap' },
  related: ['notice-to-keeper', 'parking-code-of-practice', 'appeal-parking-charge-notice', 'car-towed-clamped'],
  sources: ['pofa4', 'pofa54', 'code2026'],
  demarche: true,
  en: {
    slug: 'residential-parking-charge',
    nav: 'Flats and residential permits',
    card: 'Parking charges in the car park of a block of flats or an estate: permits, visitors, your lease and the land that Schedule 4 does not cover.',
    title: 'Residential Parking Charge: Permits, Flats and Your Lease',
    description: 'Charge outside your own flat? How permits and visitor bays work, why your lease matters, which land Schedule 4 excludes and the reduced charge for permits.',
    h1: 'Residential parking charges: permits, flats and estates',
    intro: 'Choose "valid permit not displayed" in the tool to see the outcome the Appeals Charter sets; the rest of the page covers leases and the kinds of land involved.',
    resume: (h) => `Many blocks of flats, new-build estates and managed developments hire a parking company to stop outsiders using the bays. Residents and their visitors are then expected to display a permit or register a number plate, and a car without one can receive a parking charge like in any private car park. The position of a resident differs in one way: the right to park often comes from the lease or the transfer of the property, not from the signs, and a parking company cannot usually take away by a sign a right that a lease already grants. Schedule 4 to the Protection of Freedoms Act 2012 applies only to relevant land, which excludes public highways, parking places provided or controlled by a council and land where parking is under statutory control, so a charge on an adopted road of the estate is a different matter from one in a private courtyard. Under the government Code, a valid permit that was not displayed is a case for a reduced charge of ${h.gbp(h.CODE.reducedCharge)} once the Code is in force.`,
    faqs: (h) => [
      { q: 'Can a parking company charge me for parking in my own allocated space?', a: 'If your lease or the transfer of your property gives you a right to park in that space, the parking company cannot normally impose new conditions on that right through its signs alone. Read the parking clauses of your lease and any later deed of variation. If the right is clear, send the relevant clause with your appeal and inform the managing agent at the same time.' },
      { q: 'My visitor got a charge in the visitor bays. What can they do?', a: `The visitor is the driver who accepted the terms on the signs, so the charge goes to the visitor's keeper. If a visitor permit was issued but not displayed, or the plate was not registered, the Appeals Charter of the Code treats it as a reduced charge case of ${h.gbp(h.CODE.reducedCharge)} once in force, with proof that the visitor was entitled to park. A letter from the resident confirming the visit helps.` },
      { q: 'Is the road through my housing estate private land for parking charges?', a: 'It depends whether the council has adopted the road. An adopted road is a highway maintainable at the public expense and is excluded from relevant land in Schedule 4, so a private company cannot use that Schedule to pursue keepers there. Unadopted roads and private car parks remain relevant land. The council keeps a list of adopted roads that you can ask to see.' },
    ],
    body: (h) => `
<h2>Which land a parking company can enforce</h2>
<p>Paragraph 3 of ${h.src('pofa4', 'Schedule 4 to the Protection of Freedoms Act 2012')} defines relevant land as any land other than:</p>
${h.table(['Excluded from relevant land', 'Typical example on an estate', 'Who enforces there'], [
  ['A highway maintainable at the public expense', 'an adopted estate road', 'the council, with penalty charge notices'],
  ['A parking place provided or controlled by a traffic authority', 'council-run bays or a council car park', 'the council'],
  ['Other land where parking is under statutory control', 'land where a statute itself regulates parking', 'whoever the statute names'],
], 'Schedule 4, paragraph 3. Everything else, such as a private courtyard or an unadopted road, can be relevant land.', ['l', 'l', 'l'])}
<p>On relevant land, a parking company can pursue the keeper if its notices meet the Schedule; elsewhere, it cannot rely on the Schedule. Ask the managing agent which parts of the site the company enforces, and check with the council whether a road is adopted.</p>

<h2>Your lease and the signs</h2>
<p>A parking charge rests on a contract formed by the signs. A resident who already has a right to park under the lease did not need that contract to park. Where the lease grants a right to a specific space, or to park in a shared area, conditions added later by a parking company may not bind the resident unless the lease allows such rules, for example through a clause letting the landlord make regulations for the estate. This is a question about your own lease: read the clauses on parking, rights of way and estate rules, and keep a copy ready for an appeal. This site does not interpret leases; the operator, then the appeals service and finally a court decide.</p>

<h2>Permits and the Appeals Charter</h2>
<p>Once the ${h.src('code2026', 'government Code')} is in force, the Appeals Charter covers the most common residential mistakes:</p>
<ul>
<li>a parking permit not displayed, where the driver then supplies a copy of a permit valid at the time: reduced charge of ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days;</li>
<li>a vehicle that was allowed to park but whose registration was not entered on the terminal or app: the same reduced charge;</li>
<li>a wrong registration entered, such as a previous car: the same reduced charge.</li>
</ul>
<p>Annex B also gives permit holders and permitted users a consideration period of ${h.CODE.sites.find((s) => s.id === 'permit')!.consideration} minutes and a grace period of ${h.CODE.sites.find((s) => s.id === 'permit')!.grace} minutes. Charges are capped at ${h.gbp(h.CODE.cap)}, and the mini-tool under the summary compares any amount with that limit.</p>

<h2>Clamping and towing on residential land</h2>
<p>Section 54 of the ${h.src('pofa54', 'Protection of Freedoms Act 2012')} made it an offence to immobilise a vehicle, or move it or restrict its movement, without lawful authority, in England and Wales. Consent given by reading a sign is not lawful authority, except for a fixed barrier already present when the vehicle was parked. A residential parking company therefore cannot clamp or tow a car to force payment of a parking charge; it can only send a charge and, if unpaid, go to court. Councils keep their own powers to remove vehicles from the highway, explained on our ${h.a('car-towed-clamped', 'towing and clamping page')}. To dispute a residential charge, the ${h.a('appeal-parking-charge-notice', 'appeal letter builder')} has reasons for permit holders and for keepers.</p>`,
  },
});
