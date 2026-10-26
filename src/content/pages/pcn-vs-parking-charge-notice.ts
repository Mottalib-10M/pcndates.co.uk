import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pcn-vs-parking-charge-notice',
  group: 'ticket',
  order: 12,
  tool: { kind: 'ticket' },
  mini: { kind: 'mini:privatecap' },
  related: ['penalty-charge-notice', 'parking-charge-notice', 'private-parking-fine', 'fixed-penalty-notice'],
  sources: ['tma2004', 'pofa4', 'code2026', 'code_em', 'govuk_tickets'],
  en: {
    slug: 'pcn-vs-parking-charge-notice',
    nav: 'PCN or parking charge?',
    card: 'Penalty Charge Notice or Parking Charge Notice: the same initials, two different legal worlds. How to tell them apart in ten seconds.',
    title: 'PCN vs Parking Charge Notice: Telling the Two Apart',
    description: 'Penalty Charge Notice or Parking Charge Notice? One is a council penalty set by law, the other a private claim under contract. Compare issuer, cost and appeals.',
    h1: 'Penalty Charge Notice or Parking Charge Notice: which one is yours?',
    intro: 'Answer the four questions about the paper you hold: the checker names the type of notice, what happens if it is not paid and where to go next.',
    resume: (h) => `Both are often shortened to PCN, which is why so many drivers mix them up, but they belong to two different legal worlds. A Penalty Charge Notice is issued by a council or by Transport for London under the Traffic Management Act 2004 or the equivalent rules in Scotland and Northern Ireland: the amount is fixed by law, it rises by half after a charge certificate, and an unpaid penalty is registered at the county court and passed to enforcement agents without any court hearing about the merits. A Parking Charge Notice is issued by a private company for breaking the terms displayed in a car park: it is a claim under contract, the company has to sue in the county court to make you pay, and in England and Wales it can pursue the registered keeper only through the conditions of Schedule 4 to the Protection of Freedoms Act 2012. The government Code laid on ${h.date(h.CODE.laid)} caps private charges at ${h.gbp(h.CODE.cap)} and forbids notices designed to look like a council penalty.`,
    faqs: (h) => [
      { q: 'How can I tell at a glance whether a notice is from a council or a company?', a: 'Read the heading and the name at the bottom. A council or TfL notice says Penalty Charge Notice, names the authority and quotes a contravention code. A company notice says Parking Charge Notice or Parking Charge, names a limited company and refers to terms and conditions on signs. Payment details pointing to a company website confirm it is private.' },
      { q: 'Is a Parking Charge Notice easier to ignore than a Penalty Charge Notice?', a: 'Ignoring either costs more in the end, in different ways. An ignored council penalty rises automatically and reaches enforcement agents without a hearing. An ignored private charge brings debt letters with added fees and may end in a county court claim, where a judgment left unpaid harms your credit file. Reading the dates and replying in time is the cheaper route.' },
      { q: 'Can a private company call its notice a penalty?', a: `Under the government Code laid on ${h.date(h.CODE.laid)}, no. Its Annex D lists banned words such as offence, offender, violation, illegal parking and crime, and clause 8.1.1 forbids notices that deliberately resemble a council Penalty Charge Notice or imply statutory powers. Once the Code is in force, a company that breaks these rules risks losing access to DVLA keeper data.` },
    ],
    body: (h) => `
<h2>Side by side</h2>
${h.table(['', 'Penalty Charge Notice', 'Parking Charge Notice'], [
  ['Issued by', 'a council or Transport for London', 'a private parking company for a landowner'],
  ['Legal basis', 'Traffic Management Act 2004, Part 6 (England and Wales)', 'contract formed by the signs; Schedule 4 to the Protection of Freedoms Act 2012 for keeper liability'],
  ['Amount', `set by law: ${h.gbp(h.E.band1.lower)} to ${h.gbp(h.L.bandA.higher)} in England`, `set by the company, capped at ${h.gbp(h.CODE.cap)} by the government Code once in force`],
  ['Reduced rate', `50% within ${h.E.discountDays} days (${h.E.discountDaysCameraPost} for a postal camera notice)`, `at least ${h.CODE.discountMinPct}% within ${h.CODE.discountDays} days under the Code`],
  ['If unpaid', `charge certificate (+${h.E.surchargePct}%), court registration, enforcement agents`, `debt letters (up to ${h.gbp(h.CODE.debtRecoveryMax)} added under the Code), possible county court claim`],
  ['Independent appeal', 'Traffic Penalty Tribunal or London Tribunals', 'POPLA or the IAS'],
  ['Criminal record', 'never', 'never'],
], 'Sources: SI 2022/71, Private Parking Code of Practice laid in October 2026, GOV.UK parking tickets guide.', ['l', 'l', 'l'])}

<h2>Why the difference matters for your next step</h2>
<p>With a council penalty, the law has already decided that a penalty is due if the contravention happened: your task is to show that it did not, or that one of the grounds in the regulations applies, such as unclear signs or a procedural error. The council does not need a court to collect it. With a private charge, the company is the one that needs to prove its case, first to an appeals service and in the end to a judge: that its signs formed a contract, that the terms were broken, that the sum is a fair charge, and, if it pursues the keeper, that every condition of ${h.src('pofa4', 'Schedule 4')} was met on time.</p>
<p>That is why the same tactic does not work for both. Refusing to name the driver, for example, can matter a great deal against a private company that relies on keeper liability and missed a date, but it changes nothing for a council penalty, where the keeper is liable as owner.</p>

<h2>The look-alike problem</h2>
<p>Some private notices have borrowed the look of a council penalty: yellow envelopes, the letters PCN in large type, words that suggest a fine. The government Code laid before Parliament on ${h.date(h.CODE.laid)} addresses this head on. Clause 8.1.1 forbids a notice that implies statutory authority where none exists or deliberately resembles a council penalty charge notice, and Annex D lists terms that must not be used (${h.src('code2026', 'Private Parking Code of Practice')}). Until the Code is in force, the same idea appears in the trade associations' own code, which the government Code will replace (${h.src('code_em', 'explanatory memorandum, paragraphs 5.7 to 5.10')}).</p>
<p>If your notice comes from a company but uses the words Penalty Charge Notice, treat it as private: check the company name, the reference to terms and conditions, and whether it mentions the Protection of Freedoms Act 2012. Then use the ${h.a('parking-charge-notice', 'private charge countdown')}.</p>

<h2>And the police Fixed Penalty Notice?</h2>
<p>A third family exists. Where parking is still enforced by the police, or for offences such as dangerous parking, officers issue a Fixed Penalty Notice. It is a criminal matter offered as an alternative to prosecution, with its own rules; GOV.UK warns that leaving it unpaid can mean paying half as much again or going to court (${h.src('govuk_tickets', 'GOV.UK: parking tickets')}). Our ${h.a('fixed-penalty-notice', 'fixed penalty page')} covers it.</p>

<h2>Using the checker above</h2>
<p>The four questions mirror what is printed on any notice: who sent it, the heading, how it reached you and the nation where you parked. The answer names the legal family, the amount range that applies, what follows if nothing is paid and a link to the page with your deadlines. Your answers stay in your browser. If the checker says the notice is unclear, it usually means the issuer and the heading point in different directions, which is itself worth noting in any appeal.</p>`,
  },
});
