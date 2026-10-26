import { definePage } from '../../lib/guide-types';
import { addDays } from '../../lib/engine/dates';
import { lastDayOf } from '../../lib/engine/parking';

export default definePage({
  id: 'hire-car-parking-fine',
  group: 'private',
  order: 29,
  tool: { kind: 'mini:hire' },
  mini: { kind: 'mini:ntk' },
  related: ['parking-fine-not-driver', 'notice-to-keeper', 'appeal-parking-charge-notice', 'penalty-charge-notice'],
  sources: ['pofa4', 'code2026', 'si2022_576'],
  demarche: true,
  en: {
    slug: 'hire-car-parking-fine',
    nav: 'Hire and lease cars',
    card: 'A parking charge or PCN on a rental, lease or company car: how the hire firm passes it on to the hirer, and the dates each side must meet.',
    title: 'Hire Car Parking Fine: Rental and Lease Vehicle Rules',
    description: 'Got a parking charge in a hire or lease car? See how the hire firm transfers it to you under Schedule 4, the dates, and how council PCNs on hire cars differ.',
    h1: 'Parking fines on hire, rental and lease cars',
    intro: 'Enter the date the hire firm received the parking notice: the tool gives its deadline to pass the charge on and the period that follows for the hirer.',
    resume: (h) => `When a hire or lease car gets a private parking charge, the parking company writes first to the registered keeper, which is the rental or leasing firm, not the driver. Schedule 4 to the Protection of Freedoms Act 2012 sets a special route for this case in England and Wales. The hire firm sends the parking company, within ${h.POFA.hireStatementDays} days beginning with the day after the notice to keeper was given, a statement that the vehicle was on hire, a copy of the hire agreement and a copy of the hirer's statement of liability. The parking company can then give the hirer a notice to hirer, within ${h.POFA.hirerDays} days of receiving those documents, and the hirer can be made liable if the charge is not paid within ${h.POFA.hirerDays} days beginning with the day after that notice was given. The government Code requires operators to offer rental and leasing companies a process to transfer liability. Council penalty charge notices on hire cars follow different rules: in England the hire firm can make representations that the hirer accepted liability in a signed agreement.`,
    faqs: (h) => [
      { q: 'Why did my rental company charge me an admin fee for a parking ticket?', a: 'Many hire agreements contain a term allowing the firm to charge for handling fines and parking charges, separate from the charge itself. Whether such a fee applies, and how much, depends on the contract you signed, not on parking law. Read the terms of your agreement and ask the firm which clause it relies on if the fee was not explained.' },
      { q: 'Can I appeal a private parking charge that my hire company passed on to me?', a: `Yes. Once you receive a notice to hirer, you have the same practical options as any keeper: pay, or appeal to the operator within the time the notice gives, and then to the independent appeals service if the appeal is rejected. Under the government Code, the first appeal can be made within ${h.CODE.appealDays} days of delivery. Ask the hire firm for any copies it sent the operator.` },
      { q: 'What happens with a council PCN on a hire car?', a: 'The council sends its notice to the registered keeper, the hire firm. In England the firm can make representations that the vehicle was on hire under an agreement in which the hirer accepted liability for penalty charges, and supply the agreement. The council then pursues the hirer. That is one of the listed grounds in the 2022 representations and appeals regulations.' },
    ],
    body: (h) => {
      const rec = '2026-11-09';
      const firmBy = lastDayOf(addDays(rec, 1), h.POFA.hireStatementDays);
      const nth = '2026-12-01';
      const hirerFrom = addDays(lastDayOf(addDays(nth, 1), h.POFA.hirerDays), 1);
      return `
<h2>The hire route in Schedule 4</h2>
<p>Paragraphs 13 and 14 of ${h.src('pofa4', 'Schedule 4 to the Protection of Freedoms Act 2012')} deal with vehicle-hire firms. The firm, as keeper, is protected from liability if it does three things within the time allowed: it tells the parking company that the vehicle was hired under a hire agreement, it supplies a copy of the agreement, and it supplies a copy of the hirer's signed statement of liability. The parking company then turns to the hirer with a notice to hirer, accompanied by copies of those documents and of the original notice. The hirer becomes liable under the Schedule only if the charge is still unpaid after the period that follows.</p>
${h.table(['Step', 'Who acts', 'Period', 'Example'], [
  ['Notice to keeper received', 'hire firm', 'start', h.date(rec)],
  ['Statement, agreement and liability statement sent', 'hire firm', `${h.POFA.hireStatementDays} days beginning with the next day`, `by ${h.date(firmBy)}`],
  ['Notice to hirer given', 'parking company', `within ${h.POFA.hirerDays} days beginning the day after the documents arrive`, h.date(nth)],
  ['Hirer liability possible', 'parking company', `after ${h.POFA.hirerDays} days beginning with the next day`, `from ${h.date(hirerFrom)}`],
], 'Our reading of paragraphs 13 and 14 of Schedule 4, England and Wales. Example dates only.', ['l', 'l', 'l', 'l'])}

<h2>What this means for a hirer</h2>
<p>The hirer usually hears about the charge late, first from the hire firm and then from the parking company. By then, the reduced-rate period of the original notice may have passed. Check the dates on the notice to hirer you receive, and the amount it states, before deciding. The appeal grounds are the usual ones: unclear signs, a grace period, a payment record, a breakdown. One extra point is open to a hirer: whether the parking company followed the hire procedure itself, including sending the documents with the notice to hirer.</p>
<p>The government Code, in clause 8.3.3, requires parking operators to provide a process for rental and leasing companies to transfer liability to the customer (${h.src('code2026', 'Private Parking Code of Practice')}). Business leasing is treated the same way: the leasing company is the keeper and the lessee is the hirer.</p>

<h2>Company cars and cars lent by a friend</h2>
<p>A company car owned by your employer, or a car lent informally, is not on hire in the sense of the Schedule unless there is a hire agreement with a statement of liability. The keeper then receives the notice as any keeper does and can name the driver. Our page on the ${h.a('parking-fine-not-driver', 'keeper who was not driving')} covers that situation, and the ${h.a('notice-to-keeper', 'Notice to Keeper page')} the windows the original notice must meet.</p>

<h2>Council penalty charge notices on hire cars</h2>
<p>A council PCN is not a contractual claim but a civil penalty, so Schedule 4 does not apply. In England, regulation 5(4) of the ${h.src('si2022_576', '2022 representations and appeals regulations')} lists among the grounds for representations that the recipient is a vehicle-hire firm and the vehicle was on hire under an agreement in which the hirer accepted liability for penalty charges. The council can then turn to the hirer, who can pay or challenge the charge in the normal way. The steps of a council notice are on the ${h.a('penalty-charge-notice', 'penalty charge notice page')}.</p>`;
    },
  },
});
