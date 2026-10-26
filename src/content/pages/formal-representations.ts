import { definePage } from '../../lib/guide-types';

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export default definePage({
  id: 'formal-representations',
  group: 'council',
  order: 46,
  tool: { kind: 'letter', props: { kind: 'council-formal' } },
  mini: { kind: 'mini:nto' },
  related: ['notice-to-owner', 'appeal-penalty-charge-notice', 'parking-appeal-tribunal', 'charge-certificate'],
  sources: ['si2022_576', 'si2022_71', 'govuk_tickets'],
  demarche: true,
  en: {
    slug: 'formal-representations',
    nav: 'Formal representations',
    card: 'The statutory challenge after a Notice to Owner: the grounds the council must consider, the 28 days to send it, the 56 days for a reply, and a letter built for you.',
    title: 'Formal Representations Against a PCN: Grounds and Letter',
    description: 'Formal representations against a council PCN: the statutory grounds, 28 days from the Notice to Owner, 56 days for a reply, then the tribunal. Build the letter.',
    h1: 'Formal representations against a council PCN',
    intro: 'Tick the grounds that fit your case: the builder writes formal representations you can copy into the council form or send by post.',
    resume: (h) => `Formal representations are the statutory challenge to a council Penalty Charge Notice in England. They are made after the Notice to Owner, or straight away after a camera notice sent by post, within ${h.E.representationsDays} days beginning with the day it is served. Unlike an informal challenge, they are governed by the appeal regulations made in 2022, which list the grounds the council must consider: the contravention did not occur; you were not the owner at the time; the vehicle had been taken without consent; it was on hire and the hirer signed a statement of liability; the penalty exceeded the amount applicable; there was a procedural impropriety by the council; the traffic order was invalid; the civil enforcement officer was not prevented from serving the notice on the car, for postal notices; or the penalty had already been paid. The council can also cancel for compelling reasons outside the list. It must decide within ${h.E.councilDecisionDays} days; a rejection gives you ${h.E.afterRejectionDays} days to pay or appeal to the independent adjudicator.`,
    faqs: (h) => [
      { q: 'What counts as a procedural impropriety by a council?', a: 'It means a failure by the council to follow the steps the regulations require: a Notice to Owner served too late or missing required information, a charge certificate served before the time allowed, ignoring representations made in time, or demanding the wrong amount. Point to the exact document and date. Adjudicators take these failures seriously because the procedure protects every driver.' },
      { q: 'Can I make formal representations on mitigating grounds only?', a: 'You can, as compelling reasons, and the council has a discretion to cancel. A medical emergency, a breakdown or a bereavement are examples people raise. But mitigation is not one of the statutory grounds, and an adjudicator cannot cancel on mitigation alone; at most it can recommend that the council reconsider. Combine it with a statutory ground where one applies.' },
      { q: 'How should I send formal representations?', a: 'Use the method printed on the Notice to Owner: most councils have an online form, and many accept email or post. Keep a copy of what you send and proof of the date, such as the confirmation screen or a certificate of posting. Attach photographs, receipts or permits as evidence, since the council and the adjudicator decide on what you provide.' },
    ],
    body: (h) => `
<h2>The grounds, one by one</h2>
${h.table(['Ground', 'When it fits', 'Evidence that helps'], [
  ['The contravention did not occur', 'valid ticket or permit, unclear signs or lines, loading allowed', 'photos of signs and lines, ticket, permit'],
  ['Not the owner at the time', 'sold or transferred before the date', 'sale receipt, buyer details, DVLA confirmation'],
  ['Taken without consent', 'stolen or taken without permission', 'police crime reference'],
  ['Hire vehicle', 'a hire firm with a signed liability statement', 'the hire agreement'],
  ['Penalty exceeded the applicable amount', 'wrong band or wrong level demanded', 'the notice and the council band'],
  ['Procedural impropriety', 'a step done late, out of order or incompletely', 'dates on every letter'],
  ['Invalid traffic order', 'the restriction itself is not lawfully made', 'the order, if you can obtain it'],
  ['Officer was not prevented from serving', 'a postal notice where the officer could have fixed it to the car', 'witnesses, timings'],
  ['Already paid', 'paid in full or at the reduced rate in time', 'payment receipt'],
], `Grounds in ${h.src('si2022_576', 'SI 2022/576, regulation 5')}, England.`, ['l', 'l', 'l'])}

<h2>Dates that frame your representations</h2>
<p>A Notice to Owner posted on ${h.date('2026-12-07')} is served on ${h.date('2026-12-09')}. Your ${h.E.representationsDays} days begin that day, so the last day is ${h.date(plus('2026-12-09', h.E.representationsDays - 1))}. The council then has ${h.E.councilDecisionDays} days from receipt to decide. If it rejects, the notice of rejection gives ${h.E.afterRejectionDays} days to pay the full penalty or appeal to the adjudicator. The mini-tool above shows when a Notice to Owner can first arrive after a windscreen penalty, and the latest date, ${h.E.ntoLatestMonths} months on (${h.src('si2022_71', 'SI 2022/71, regulation 20')}).</p>

<h2>Writing them well</h2>
<ul>
<li><strong>Lead with the strongest ground.</strong> One clear statutory ground with evidence beats a long list of weak ones.</li>
<li><strong>Be specific.</strong> Say which sign was missing, at what time, and attach a dated photograph. Quote dates from the council's own letters for procedural points.</li>
<li><strong>Keep it factual.</strong> The council, and later the adjudicator, read many letters. Short paragraphs, one point each.</li>
<li><strong>Ask for what you want.</strong> Cancellation of the penalty, and if you raised an informal challenge earlier, the date you did so.</li>
</ul>
<p>The builder at the top follows that structure. It does not judge your case; it turns your ticked grounds into clear sentences and leaves blanks for the details only you know. Everything stays in your browser.</p>

<h2>Informal challenge first, or straight to formal?</h2>
<p>With a windscreen notice, you can challenge informally during the reduced-rate period; GOV.UK says that if this is rejected you may be able to pay at the reduced rate (${h.src('govuk_tickets', 'GOV.UK')}). Formal representations come later and usually mean the full amount if they fail, but they bind the council to the statutory process and open the road to the tribunal. Our ${h.a('appeal-penalty-charge-notice', 'PCN appeal page')} explains the informal step; the ${h.a('parking-appeal-tribunal', 'tribunal page')} covers what happens after a rejection.</p>

<h2>If the council does not answer</h2>
<p>Keep your proof of sending. If a charge certificate arrives although you made representations in time and received no decision, that is a procedural point, and at the order for recovery stage it is one of the grounds for a witness statement, explained on our ${h.a('charge-certificate', 'charge certificate page')}.</p>`,
  },
});
