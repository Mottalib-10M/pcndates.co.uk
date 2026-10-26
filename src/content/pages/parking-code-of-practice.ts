import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'parking-code-of-practice',
  group: 'private',
  order: 21,
  tool: { kind: 'mini:codedate' },
  mini: { kind: 'mini:privatecap' },
  related: ['parking-grace-period', 'parking-charge-notice', 'wrong-registration-parking-fine', 'parking-fine-debt-collection'],
  sources: ['code2026', 'code_em', 'code_collection', 'pcopa2019'],
  en: {
    slug: 'private-parking-code-of-practice',
    nav: 'Private Parking Code of Practice',
    card: 'The government Code laid before Parliament in October 2026: the charge cap, grace periods, the reduced charge and the earliest date it can take effect.',
    title: 'Private Parking Code of Practice 2026: Status and Rules',
    description: 'The Private Parking Code of Practice was laid in Parliament in October 2026. Read its cap, discount, grace and appeal rules and the earliest date it can apply',
    h1: 'Private Parking Code of Practice: what it changes and when',
    intro: 'The calculator applies the timetable of the Parking (Code of Practice) Act 2019 to the day the Code was laid; add days of parliamentary adjournment to see the date move.',
    resume: (h) => `The Private Parking Code of Practice is the government's own rulebook for companies that run car parks on private land in England, Wales and Scotland. It was prepared by the Ministry of Housing, Communities and Local Government under the Parking (Code of Practice) Act 2019 and laid before Parliament on ${h.date(h.CODE.laid)}. The Act gives Parliament a ${h.CODE.scrutinyDays}-day period to object; if neither House does, the Secretary of State must issue the Code, and it comes into force at the end of ${h.CODE.inForceDaysAfterIssue} days beginning with the day of issue. Counting from the day it was laid, the earliest date it can be in force is ${h.date(h.code.inForce)}, later if both Houses adjourn for more than four days. The government has not announced a date, and says transitional enforcement arrangements will be published on GOV.UK when the Code comes into force. Its main rules: a charge capped at ${h.gbp(h.CODE.cap)}, at least ${h.CODE.discountMinPct}% off within ${h.CODE.discountDays} days, ${h.CODE.appealDays} days to appeal, a debt recovery add-on of no more than ${h.gbp(h.CODE.debtRecoveryMax)}, and set grace periods.`,
    faqs: (h) => [
      { q: 'Is the Private Parking Code of Practice already in force?', a: `Not on the day we last checked the texts. It was laid before Parliament on ${h.date(h.CODE.laid)} and must pass a ${h.CODE.scrutinyDays}-day scrutiny period before it can be issued, then a further ${h.CODE.inForceDaysAfterIssue} days before it takes effect. The earliest possible date under the Act is ${h.date(h.code.inForce)}. Until then, parking companies follow the Sector Single Code written by their trade associations.` },
      { q: 'Does the government Code make private parking charges illegal?', a: 'No. The explanatory memorandum says the underlying law, mainly contract law, stays the same. The Code sets standards for how companies issue charges, handle appeals and chase payment. A company that does not comply risks losing access to DVLA keeper records, and a trade association that fails to meet the standards risks losing its accredited status.' },
      { q: 'Will the Code apply to parking charges issued before it starts?', a: 'The Code does not answer that in one line. The explanatory memorandum says the transitional enforcement arrangements will be published on GOV.UK when the Code comes into force. Until those arrangements are out, treat a charge issued before the start date as governed by the Sector Single Code, and check the GOV.UK collection page for the transitional rules.' },
      { q: 'Which parts of the UK does the Private Parking Code cover?', a: 'England, Wales and Scotland, according to the explanatory memorandum. Northern Ireland is not covered. Note that the Code and keeper liability are separate questions: the Code applies in Scotland, but Schedule 4 to the Protection of Freedoms Act 2012, which lets a company pursue the registered keeper, applies only in England and Wales.' },
    ],
    body: (h) => `
<h2>The parliamentary timetable, step by step</h2>
<p>Section 2 of the ${h.src('pcopa2019', 'Parking (Code of Practice) Act 2019')} sets the route. The Secretary of State consults, prepares the Code and lays it before Parliament. The ${h.CODE.scrutinyDays}-day period begins with the day it is laid. Days on which Parliament is dissolved or prorogued, or on which both Houses are adjourned for more than four days, are not counted. If either House resolves not to approve the Code, it cannot be issued and a new one must be prepared. If no such resolution is passed, the Secretary of State must issue it, and it takes effect at the end of ${h.CODE.inForceDaysAfterIssue} days beginning with the day of issue.</p>
${h.table(['Step', 'Date', 'Basis'], [
  ['Code laid before Parliament', h.date(h.CODE.laid), 'GOV.UK publication'],
  [`End of the ${h.CODE.scrutinyDays}-day period, if no recess counts`, h.date(h.code.periodEnd), 'Act, section 2(6)'],
  ['Earliest issue', h.date(h.code.issue), 'Act, section 2(4)'],
  ['Earliest entry into force', h.date(h.code.inForce), 'Act, section 2(5)'],
], 'Our reading of the Act. The government has published no start date; a long adjournment of both Houses moves every line.', ['l', 'r', 'l'])}
<p>The explanatory memorandum confirms the two periods: ${h.CODE.scrutinyDays} days of scrutiny, then entry into force ${h.CODE.inForceDaysAfterIssue} calendar days from issue (${h.src('code_em', 'explanatory memorandum, section 11')}). Treat the date in the table as a floor, not a forecast.</p>

<h2>What the Code requires of parking companies</h2>
${h.table(['Rule', 'What the Code says', 'Clause'], [
  ['Cap on a charge', `no more than ${h.gbp(h.CODE.cap)}`, '8.2.1'],
  ['Prompt payment', `at least ${h.CODE.discountMinPct}% off within ${h.CODE.discountDays} days of issue`, '8.2.2'],
  ['Unpaid tariff', `can be claimed on top only above ${h.gbp(h.CODE.tariffPursuitOver)}, by approved operators`, '8.2.3'],
  ['First appeal', `${h.CODE.appealDays} days from delivery; answer within ${h.CODE.operatorResponseDays} days`, '8.3.1'],
  ['After a rejection', `the rate at the time of appeal held ${h.CODE.discountHeldDays} more days`, '8.1.2(e)'],
  ['Second-stage appeal', 'debt recovery suspended until the outcome is known', '8.3.7'],
  ['Debt recovery', `up to ${h.gbp(h.CODE.debtRecoveryMax)} added once overdue`, '9.1'],
  ['Arrival and overstay', `consideration of at least ${h.CODE.considerationMin} minutes, grace of ${h.CODE.graceMin} on most sites`, 'Annex B'],
], 'Private Parking Code of Practice as laid on 20 October 2026.', ['l', 'l', 'r'])}
<p>The Code also bans words that make a charge look like a public penalty, such as offence, violation or Notice of Intended Prosecution, and any design that deliberately resembles a council notice. It adds an Appeals Charter: a list of situations where an appeal with evidence must lead to cancellation, and others where the charge falls to ${h.gbp(h.CODE.reducedCharge)} if paid within ${h.CODE.reducedChargeDays} days. Our ${h.a('wrong-registration-parking-fine', 'registration error page')} and ${h.a('parking-grace-period', 'grace period page')} work through those lists.</p>

<h2>How it differs from the industry code in use today</h2>
<p>Since October 2024 the companies have followed a Sector Single Code published by the parking trade associations in June 2024. The memorandum says that code borrowed much from the government code withdrawn in 2022, including a single set of standards and a ${h.CODE.appealDays}-day appeal period, but differed on the length of consideration and grace periods, on the ${h.gbp(h.CODE.reducedCharge)} reduced charge and on appeals after payment. The new Code replaces it when it comes into force, and access to DVLA keeper data will be tied to compliance, checked through a certification scheme recognised by the United Kingdom Accreditation Service (${h.src('code_em', 'memorandum, paragraphs 5.6 to 5.10')}).</p>

<h2>What stays the same</h2>
<p>The Code is not directly enforceable in law: you cannot sue a company simply for breaking it. A parking charge remains a claim under contract, and only a county court can order payment. Keeper liability still depends on Schedule 4 to the Protection of Freedoms Act 2012 in England and Wales, explained on our ${h.a('notice-to-keeper', 'Notice to Keeper page')}. The documents, including the consultation response, are gathered in the ${h.src('code_collection', 'GOV.UK collection')}; we read them again whenever a new document is added and update this page with the date.</p>`,
  },
});
