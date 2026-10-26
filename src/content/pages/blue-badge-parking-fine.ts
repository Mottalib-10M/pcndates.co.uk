import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'blue-badge-parking-fine',
  group: 'private',
  order: 30,
  tool: { kind: 'mini:charter' },
  mini: { kind: 'mini:pcnamount' },
  related: ['hospital-parking-fine', 'wrong-registration-parking-fine', 'appeal-penalty-charge-notice', 'appeal-parking-charge-notice'],
  sources: ['code2026', 'si2022_71_sch3', 'nhs', 'si2022_576'],
  demarche: true,
  en: {
    slug: 'blue-badge-parking-fine',
    nav: 'Blue Badge',
    card: 'A charge or PCN when you hold a Blue Badge: badge not displayed, disabled bays, hospital parking and what each set of rules allows.',
    title: 'Blue Badge Parking Fine: Badge Not Displayed and Appeals',
    description: 'Blue Badge holder with a parking charge or PCN? See the reduced charge for a badge not shown in private car parks, council disabled bays, hospital concessions.',
    h1: 'Parking fines and the Blue Badge',
    intro: 'Choose "Blue Badge not displayed" in the tool to see what the Appeals Charter of the Code allows; the council PCN amounts follow below.',
    resume: (h) => `Holding a Blue Badge does not stop a parking ticket being issued, but it changes how several of them should end. In private car parks, the government Private Parking Code of Practice laid on ${h.date(h.CODE.laid)} includes in its Appeals Charter the case of a Blue Badge not displayed: if the holder sends a copy of a badge that was valid at the time and shows that the holder was in the vehicle, as driver or passenger, the charge should be reduced to ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days, the first time this happens; later cases are at the operator's discretion. On council land, a penalty charge notice for parking in a disabled bay without displaying a valid badge is a higher-level contravention in England, and an appeal turns on whether a valid badge was displayed correctly. At NHS hospitals in England, the car parking principles say Blue Badge holders should be able to park free. In every case, the evidence is a copy of the badge, front and back, and its validity dates.`,
    faqs: (h) => [
      { q: 'I forgot to display my Blue Badge in a private car park. Will the charge be cancelled?', a: `Not cancelled outright under the Code, but reduced. The Appeals Charter says that where a Blue Badge was not displayed but the holder supplies a copy of a badge valid at the time, the charge should fall to ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days. This applies the first time only; any further case is for the operator to judge. It takes effect when the Code comes into force.` },
      { q: 'Can a Blue Badge be used when the holder stays in the car?', a: 'The Appeals Charter refers to a badge valid in the circumstances of the charge, meaning the holder was in the vehicle, whether or not as the driver. A badge used by a relative while the holder is elsewhere does not meet that test. Council rules on the use of badges follow the same idea: the badge belongs to the person, not to the car.' },
      { q: 'How much is a council PCN for parking in a disabled bay?', a: `In England outside London, parking in a disabled bay without displaying a valid badge is charged at the higher level: ${h.gbp(h.E.band2.higher)} in band 2 or ${h.gbp(h.E.band1.higher)} in band 1, halved if paid within the reduced-rate period. In London the higher level is ${h.gbp(h.L.bandA.higher)} in band A, and the notice states which level applies. The mini-tool on this page gives the amount at each stage.` },
    ],
    body: (h) => `
<h2>Private car parks: the Appeals Charter</h2>
<p>Clause 19 of the ${h.src('code2026', 'Private Parking Code of Practice')} has a separate heading for a reduced charge that applies only in the first instance. Its only entry is the Blue Badge not displayed: the holder supplies a copy of a badge that would have been valid at the time and in the circumstances of the charge. The operator should then reduce the charge to ${h.gbp(h.CODE.reducedCharge)} for ${h.CODE.reducedChargeDays} days. For any later case, the Code tells operators to use their discretion with the individual circumstances in mind.</p>
<p>A badge that was displayed but not seen by the camera is a different matter: ANPR cameras read number plates, not windscreens. If a charge was issued while the badge was on display in a car park whose terms allow badge holders to park, say so and send a photograph of the badge in place and its details.</p>

<h2>Council disabled bays and PCN amounts</h2>
<p>Schedule 3 of the ${h.src('si2022_71_sch3', '2022 England regulations')} places parking in a disabled bay without a valid badge among the higher-level contraventions. The amounts:</p>
${h.table(['Where', 'Higher level', 'Paid early', 'After a charge certificate'], [
  ['England outside London, band 2', h.gbp(h.E.band2.higher), h.gbp(h.amounts('outside-london', { englandBand: 'band2' }).discounted), h.gbp(h.amounts('outside-london', { englandBand: 'band2' }).afterCertificate)],
  ['England outside London, band 1', h.gbp(h.E.band1.higher), h.gbp(h.amounts('outside-london', { englandBand: 'band1' }).discounted), h.gbp(h.amounts('outside-london', { englandBand: 'band1' }).afterCertificate)],
  ['London, band A', h.gbp(h.L.bandA.higher), h.gbp(h.amounts('london', { londonBand: 'bandA' }).discounted), h.gbp(h.amounts('london', { londonBand: 'bandA' }).afterCertificate)],
  ['Wales, higher rate', h.gbp(h.W.higher), h.gbp(h.amounts('wales').discounted), h.gbp(h.amounts('wales').afterCertificate)],
], 'Higher-level penalty charges. England: SI 2022/71 Schedule 3; London: London Councils bands from 7 April 2025; Wales: WSI 2008/613.', ['l', 'r', 'r', 'r'])}
<p>The England classification comes from Schedule 3; London and Wales use their own lists, so check the level and contravention code printed on your notice before relying on the table.</p>
<p>The grounds for a formal challenge in England are set out in regulation 5(4) of the ${h.src('si2022_576', 'representations and appeals regulations')}. The first, that the contravention did not occur, covers a badge that was validly displayed: a photograph taken at the time, showing the badge with its expiry date visible, is the strongest evidence. Our ${h.a('appeal-penalty-charge-notice', 'council appeal page')} builds the letter.</p>

<h2>Hospital car parks</h2>
<p>The ${h.src('nhs', 'NHS car parking principles')} for England list disabled people with a Blue Badge among the groups that should be able to park free. Trusts organise this differently: some ask you only to display the badge, others to register your number plate at a desk. If a private operator on a hospital site sends you a charge while you were a badge holder parking for a visit, give the trust's concession as your first reason; the ${h.a('hospital-parking-fine', 'hospital parking page')} has the other free groups.</p>

<h2>Building the appeal</h2>
<ol>
<li>Copy both sides of the badge, with the serial number and expiry date legible.</li>
<li>State who held the badge and that the holder was in the vehicle at the time.</li>
<li>For a private charge, cite the Appeals Charter and ask for the ${h.gbp(h.CODE.reducedCharge)} reduced charge, or cancellation if the badge was displayed.</li>
<li>Send it within ${h.CODE.appealDays} days of delivery for a private charge, or before the reduced-rate deadline for a council notice.</li>
</ol>
<p>The ${h.a('appeal-parking-charge-notice', 'private appeal builder')} has a reason ready for a permit or badge holder. If the charge came because the plate in the app was wrong, see the ${h.a('wrong-registration-parking-fine', 'registration error page')}.</p>`,
  },
});
