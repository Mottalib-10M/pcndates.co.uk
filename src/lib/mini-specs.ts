/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the engine
 * (`lib/engine/parking.ts`) and params-2026.json, never a second formula. Date inputs hold day numbers.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { money, formatNumberL, dateL } from './format-l';
import { dayNum, isoOf, addDays, addMonths } from './engine/dates';
import {
  councilAmounts, ntkInTime, poplaDates, codeEarliest, codeSites, graceCheck, courtDates, papReply, enforcementFees,
  privateMax, lastDayOf, addWorkingDays, type Area,
} from './engine/parking';

const E = P.england, L = P.london, S = P.scotland, NI = P.ni, CODE = P.private.code, POFA = P.private.pofa, POPLA = P.private.popla;
const d = (iso: string) => dayNum(iso);
const D = (n: number) => dateL(isoOf(n));
const iso = (n: number | undefined) => isoOf(n ?? 0);
const n0 = (v: number) => formatNumberL(v);
const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const plural = (k: number, w: string) => `${n0(k)} ${w}${k === 1 ? '' : 's'}`;
const EX = '2026-11-02';

const AREAS: Array<{ value: string; label: string; area: Area }> = [
  { value: '0', label: 'England, outside London', area: 'outside-london' },
  { value: '1', label: 'London borough', area: 'london' },
  { value: '2', label: 'TfL red route', area: 'tfl' },
  { value: '3', label: 'Wales', area: 'wales' },
  { value: '4', label: 'Scotland', area: 'scotland' },
  { value: '5', label: 'Northern Ireland', area: 'ni' },
];
const STAGES = [{ value: '0', label: 'Paid within the reduced-rate period' }, { value: '1', label: 'Paid after it, before a charge certificate' }, { value: '2', label: 'After a charge certificate' }];
const RATE = [{ value: '0', label: 'Higher rate (serious, e.g. yellow lines)' }, { value: '1', label: 'Lower rate (e.g. overstaying)' }];
const BAND = [{ value: '0', label: 'Band 2 or band A (most councils)' }, { value: '1', label: 'Band 1 or band B' }];

function amountsFor(areaIdx: number, bandIdx: number, rateIdx: number, bus = false) {
  const a = AREAS[clamp(areaIdx, 0, AREAS.length - 1)].area;
  return { area: a, amounts: councilAmounts(a, { englandBand: bandIdx ? 'band1' : 'band2', londonBand: bandIdx ? 'bandB' : 'bandA', band: rateIdx ? 'lower' : 'higher', busLane: bus }) };
}

const SPECS: Record<string, () => MiniSpec> = {
  pcnamount: () => ({
    title: 'How much is my council PCN now?', cta: 'All the dates on my notice', ctaPage: 'pcn-deadlines',
    inputs: [{ id: 'area', label: 'Issued by', def: 0, options: AREAS.map(({ value, label }) => ({ value, label })) }, { id: 'band', label: 'Band', def: 0, options: BAND }, { id: 'rate', label: 'Rate', def: 0, options: RATE }, { id: 'stage', label: 'When you pay', def: 0, options: STAGES }],
    run: (v) => {
      const { amounts: a } = amountsFor(v.area ?? 0, v.band ?? 0, v.rate ?? 0);
      const due = [a.discounted, a.full, a.afterCertificate][clamp(v.stage ?? 0, 0, 2)];
      return { head: ['You pay', money(due)], rows: [['Penalty on the notice', money(a.full)], [`Reduced rate (${a.discountPct}% off)`, money(a.discounted)], [`After a charge certificate (+${a.surchargePct}%)`, money(a.afterCertificate)]], note: 'Band and rate are printed on the notice with the contravention code. Wales, Scotland and Northern Ireland have no bands.' };
    },
  }),
  londonband: () => ({
    title: 'London PCN by band', cta: 'London penalty charges explained', ctaPage: 'london-pcn',
    inputs: [{ id: 'band', label: 'Band of your borough', def: 0, options: [{ value: '0', label: 'Band A' }, { value: '1', label: 'Band B' }, { value: '2', label: 'Bus lane or moving traffic' }] }, { id: 'rate', label: 'Rate', def: 0, options: RATE }],
    run: (v) => {
      const bus = (v.band ?? 0) === 2;
      const a = councilAmounts('london', { londonBand: v.band === 1 ? 'bandB' : 'bandA', band: v.rate ? 'lower' : 'higher', busLane: bus });
      return { head: ['Penalty', money(a.full)], rows: [['Within 14 days', money(a.discounted)], ['After a charge certificate', money(a.afterCertificate)], ['In force since', dateL(L.from)]] };
    },
  }),
  scotpcn: () => ({
    title: 'Scottish PCN: what each date costs', cta: 'Parking fines in Scotland', ctaPage: 'scotland-parking-fines',
    inputs: [{ id: 'amt', label: 'Amount on the notice', def: S.max, max: S.max, unit: '£' }],
    run: (v) => {
      const a = councilAmounts('scotland', { scotlandAmount: v.amt ?? S.max });
      return { head: ['Within 14 days', money(a.discounted)], rows: [['Full charge', money(a.full)], ['After a charge certificate', money(a.afterCertificate)], ['Highest level allowed', `${money(S.max)} since ${dateL(S.maxSince)}`]] };
    },
  }),
  nipcn: () => ({
    title: 'Northern Ireland PCN dates', cta: 'Parking tickets in Northern Ireland', ctaPage: 'northern-ireland-parking-fines',
    inputs: [{ id: 'on', label: 'Date on the PCN', def: d(EX), date: true }],
    run: (v) => {
      const on = iso(v.on), nto = addDays(on, NI.ntoAfterDays), cc = addDays(nto, NI.ccAfterDays);
      return { head: [`Pay ${money(NI.discounted)} by`, dateL(lastDayOf(on, NI.discountDays))], rows: [['Notice to Owner from', dateL(nto)], [`Charge certificate (${money(NI.cc)}) from`, dateL(cc)], ['Full charge', money(NI.pcn)]] };
    },
  }),
  walespcn: () => ({
    title: 'Welsh PCN at each stage', cta: 'Parking fines in Wales', ctaPage: 'wales-parking-fines',
    inputs: [{ id: 'rate', label: 'Rate', def: 0, options: RATE }],
    run: (v) => {
      const a = councilAmounts('wales', { band: v.rate ? 'lower' : 'higher' });
      return { head: ['Penalty', money(a.full)], rows: [['Within 14 days', money(a.discounted)], ['After a charge certificate', money(a.afterCertificate)]] };
    },
  }),
  reduced: () => ({
    title: 'Last day for the reduced rate', cta: 'Every deadline on a PCN', ctaPage: 'pcn-deadlines',
    inputs: [{ id: 'on', label: 'Date on the notice', def: d(EX), date: true }, { id: 'post', label: 'Sent by post after a camera recording?', def: 0, options: yn }],
    run: (v) => {
      const on = iso(v.on), post = !!v.post, served = post ? addWorkingDays(on, E.deemedServiceWorkingDays, 'ew') : on, n = post ? E.discountDaysCameraPost : E.discountDays;
      return { head: ['Reduced rate until', dateL(lastDayOf(served, n))], rows: [['Notice served on', dateL(served)], ['Period', `${n} days beginning with service`]], note: 'England: SI 2022/71 reg 10. A postal notice is served on the second working day after posting.' };
    },
  }),
  nto: () => ({
    title: 'When can the Notice to Owner arrive?', cta: 'Notice to Owner explained', ctaPage: 'notice-to-owner',
    inputs: [{ id: 'on', label: 'Date the PCN was fixed or handed over', def: d(EX), date: true }],
    run: (v) => {
      const on = iso(v.on);
      return { head: ['Earliest posting', dateL(addDays(on, E.ntoAfterDays))], rows: [['Latest', dateL(addMonths(on, E.ntoLatestMonths))], ['Then representations', `${E.representationsDays} days from service`], ['Council answer', `within ${E.councilDecisionDays} days`]] };
    },
  }),
  cc: () => ({
    title: 'What a charge certificate adds', cta: 'Charge certificate and order for recovery', ctaPage: 'charge-certificate',
    inputs: [{ id: 'amt', label: 'Penalty on the notice', def: 70, max: 500, unit: '£' }],
    run: (v) => {
      const a = clamp(v.amt ?? 0, 0, 500), up = a * (1 + E.surchargePct / 100);
      return { head: ['Amount after the certificate', money(up)], rows: [['Increase', money(up - a)], ['Order for recovery after', plural(E.orderAfterCcDays, 'day')], ['Witness statement within', plural(E.witnessStatementDays, 'day')]] };
    },
  }),
  witness: () => ({
    title: 'Deadline for a witness statement', cta: 'Order for recovery and bailiffs', ctaPage: 'charge-certificate',
    inputs: [{ id: 'on', label: 'Date of the order for recovery notice', def: d(EX), date: true }],
    run: (v) => ({ head: ['Send it by', dateL(lastDayOf(iso(v.on), E.witnessStatementDays))], rows: [['Period', `${E.witnessStatementDays} days`], ['Where', 'Traffic Enforcement Centre (county court)']], note: 'Counted from the day the notice is served, with that day as day one: the cautious reading.' }),
  }),
  bailiff: () => ({
    title: 'What enforcement agents can add', cta: 'Debt letters and bailiffs', ctaPage: 'parking-fine-bailiffs',
    inputs: [{ id: 'debt', label: 'Debt passed to the enforcement agent', def: 105, max: 10000, unit: '£' }, { id: 'stage', label: 'Stage reached', def: 1, options: [{ value: '0', label: 'Compliance letter' }, { value: '1', label: 'Visit (enforcement stage)' }, { value: '2', label: 'Sale stage' }] }],
    run: (v) => {
      const st = (['compliance', 'enforcement', 'sale'] as const)[clamp(v.stage ?? 1, 0, 2)], f = enforcementFees(clamp(v.debt ?? 0, 0, 10000), st);
      return { head: ['Total to pay', money(f.total)], rows: [['Compliance fee', money(f.compliance)], ['Enforcement fee', money(f.enforcement)], ['Sale fee', money(f.sale)]], note: `Fixed fees from ${dateL(P.enforcement.from)}; ${P.enforcement.pct}% is added on the part of the debt above ${money(P.enforcement.pctOver)}.` };
    },
  }),
  removal: () => ({
    title: 'Getting a towed car back (England)', cta: 'Council removal and clamping', ctaPage: 'car-towed-clamped',
    inputs: [{ id: 'days', label: 'Days in the pound', def: 2, max: 60, unit: 'days' }, { id: 'pcn', label: 'Penalty on the notice', def: 70, max: 200, unit: '£' }],
    run: (v) => {
      const k = clamp(v.days ?? 0, 0, 60), st = k * E.storagePerDay, pcn = clamp(v.pcn ?? 0, 0, 200);
      return { head: ['To release the car', money(E.removal + st + pcn)], rows: [['Removal', money(E.removal)], [`Storage (${money(E.storagePerDay)} a day)`, money(st)], ['Penalty charge', money(pcn)]], note: 'Outside London, SI 2022/71 Schedule 3. London boroughs set their own removal charges.' };
    },
  }),
  privatecap: () => ({
    title: 'Is this private charge above the Code limits?', cta: 'Parking charge notice explained', ctaPage: 'parking-charge-notice',
    inputs: [{ id: 'amt', label: 'Charge on the notice', def: 100, max: 1000, unit: '£' }, { id: 'over', label: 'Overdue, with debt letters?', def: 0, options: yn }],
    run: (v) => {
      const m = privateMax(clamp(v.amt ?? 0, 0, 1000), !!v.over);
      return { head: ['Most the Code allows', money(m.total)], rows: [['Charge cap', money(CODE.cap)], ['Reduced within 14 days (at least 40% off)', money(m.charge * (1 - CODE.discountMinPct / 100))], ['Debt recovery add-on once overdue', money(m.addOn)]], note: m.overCap ? 'Above the cap of the government Code: once the Code is in force, an operator charging more breaks it.' : 'The Code is laid but not yet in force: these limits apply from the date it takes effect.' };
    },
  }),
  debtadd: () => ({
    title: 'Charge plus debt recovery fee', cta: 'Debt collection letters', ctaPage: 'parking-fine-debt-collection',
    inputs: [{ id: 'amt', label: 'Original charge', def: 100, max: 1000, unit: '£' }, { id: 'fee', label: 'Fee added in the letter', def: 70, max: 1000, unit: '£' }],
    run: (v) => {
      const a = clamp(v.amt ?? 0, 0, 1000), f = clamp(v.fee ?? 0, 0, 1000), over = Math.max(0, f - CODE.debtRecoveryMax);
      return { head: ['Total demanded', money(a + f)], rows: [['Add-on allowed by the Code', `up to ${money(CODE.debtRecoveryMax)}`], ['Above that limit', money(over)]], note: 'Clause 9 of the Code: the add-on is a maximum, not an amount that is always fair or recoverable.' };
    },
  }),
  ntk: () => ({
    title: 'Did the Notice to Keeper arrive in time?', cta: 'Notice to Keeper rules', ctaPage: 'notice-to-keeper',
    inputs: [{ id: 'start', label: 'Was a ticket left on the car?', def: 0, options: [{ value: '0', label: 'No, it came by post (camera)' }, { value: '1', label: 'Yes, on the windscreen' }] }, { id: 'ref', label: 'Day parking ended, or day of the windscreen ticket', def: d('2026-10-01'), date: true }, { id: 'del', label: 'Day the Notice to Keeper was delivered', def: d('2026-10-14'), date: true }],
    run: (v) => {
      const r = ntkInTime(v.start ? 'windscreen' : 'post', iso(v.ref), iso(v.del));
      return { head: ['Keeper liability possible?', r.ok ? 'Yes, in time' : 'No, outside the window'], rows: [['Window opens', dateL(r.from)], ['Window closes', dateL(r.to)]], note: 'England and Wales only. A posted notice is presumed delivered on the second working day after posting unless you can show otherwise.' };
    },
  }),
  ntkpost: () => ({
    title: 'Presumed delivery of a posted notice', cta: 'Notice to Keeper rules', ctaPage: 'notice-to-keeper',
    inputs: [{ id: 'posted', label: 'Date of posting printed on the notice', def: d('2026-10-09'), date: true }],
    run: (v) => {
      const del = addWorkingDays(iso(v.posted), POFA.deemedWorkingDays, 'ew');
      return { head: ['Presumed delivered', dateL(del)], rows: [['Rule', 'second working day after posting'], ['Days not counted', 'weekends and bank holidays in England and Wales']] };
    },
  }),
  popla: () => ({
    title: 'Last day to appeal to POPLA', cta: 'How POPLA works', ctaPage: 'popla-appeal',
    inputs: [{ id: 'rej', label: 'Date of the operator’s rejection', def: d(EX), date: true }],
    run: (v) => {
      const p = poplaDates(iso(v.rej));
      return { head: ['Appeal by', dateL(p.lastDay)], rows: [['Verification code', `${POPLA.codeDigits} digits, from the rejection`], ['Operator’s evidence', `within ${p.operatorBy} days`], ['Your comments', `within ${p.commentDays} days`], ['If you lose, pay within', plural(p.payDays, 'day')]], note: 'Counted with the day of the rejection as day one, the cautious reading. POPLA handles operators that are members of the British Parking Association.' };
    },
  }),
  ias: () => ({
    title: 'Your IAS appeal deadline', cta: 'How the IAS works', ctaPage: 'ias-appeal',
    inputs: [{ id: 'rej', label: 'Date of the operator’s rejection', def: d(EX), date: true }, { id: 'days', label: 'Days given in the rejection letter', def: 21, max: 90, unit: 'days' }],
    run: (v) => {
      const k = clamp(v.days ?? 0, 1, 90);
      return { head: ['Appeal by', dateL(lastDayOf(iso(v.rej), k))], rows: [['Period you entered', plural(k, 'day')], ['Who uses the IAS', 'members of the International Parking Community']], note: 'We do not print a fixed IAS time limit: use the one stated in your rejection letter or on the IAS appeal page, and enter it above.' };
    },
  }),
  grace: () => ({
    title: 'Within the grace period?', cta: 'Grace and consideration periods', ctaPage: 'parking-grace-period',
    inputs: [{ id: 'site', label: 'Type of car park', def: 2, options: codeSites.map((s, i) => ({ value: String(i), label: s.label })) }, { id: 'over', label: 'Minutes after the paid time ended', def: 8, max: 600, unit: 'min' }],
    run: (v) => {
      const s = codeSites[clamp(v.site ?? 0, 0, codeSites.length - 1)], g = graceCheck(s.id, clamp(v.over ?? 0, 0, 600));
      return { head: ['Charge allowed?', g.withinGrace ? 'No, within grace' : 'Yes, grace exceeded'], rows: [['Grace period', `${s.grace} min`], ['Consideration on arrival', `${s.consideration} min`], ['Council bays in England', `${E.graceMinutes} min overstay`]], note: 'Minimums in Annex B of the Private Parking Code, which applies once in force; operators may give longer.' };
    },
  }),
  charter: () => ({
    title: 'What the Appeals Charter says about my case', cta: 'Appeal a private parking charge', ctaPage: 'appeal-parking-charge-notice',
    inputs: [{ id: 'c', label: 'Your situation', def: 0, options: [
      { value: '0', label: 'Minor typo in the registration (0/O, 1/I)' }, { value: '1', label: 'Wrong registration, e.g. partner’s car' }, { value: '2', label: 'Forgot to enter the registration' },
      { value: '3', label: 'Valid permit not displayed' }, { value: '4', label: 'Blue Badge not displayed (first time)' }, { value: '5', label: 'Machine out of order, no other way to pay' },
      { value: '6', label: 'Car broke down' }, { value: '7', label: 'Medical appointment overran' }] }],
    run: (v) => {
      const k = clamp(v.c ?? 0, 0, 7), cancel = [0, 5, 6, 7].includes(k);
      return { head: ['Outcome under the Charter', cancel ? 'Cancel the charge' : `Reduce to ${money(CODE.reducedCharge)}`], rows: [['With evidence of', ['the payment', 'payment for the right time', 'the time paid', 'the valid permit', 'the valid badge', 'the fault', 'the breakdown', 'the appointment'][k]], [cancel ? 'Reduced charge' : 'Pay within', cancel ? 'not applicable' : `${CODE.reducedChargeDays} days`]], note: 'Appeals Charter of the Private Parking Code, once in force. Until then operators follow their trade association code.' };
    },
  }),
  codedate: () => ({
    title: 'When can the Code be in force?', cta: 'Private Parking Code of Practice', ctaPage: 'parking-code-of-practice',
    inputs: [{ id: 'pause', label: 'Days both Houses are adjourned for more than 4 days', def: 0, max: 120, unit: 'days' }],
    run: (v) => {
      const c = codeEarliest(CODE.laid, clamp(v.pause ?? 0, 0, 120));
      return { head: ['In force at the earliest', dateL(c.inForce)], rows: [['Laid before Parliament', dateL(CODE.laid)], ['40-day period ends', dateL(c.periodEnd)], ['Earliest issue', dateL(c.issue)]], note: 'Parking (Code of Practice) Act 2019, section 2. The government has not announced a date: this is the earliest the Act allows.' };
    },
  }),
  court: () => ({
    title: 'Deadlines on a county court claim', cta: 'County court claim for a parking charge', ctaPage: 'parking-county-court-claim',
    inputs: [{ id: 'posted', label: 'Date the claim was posted (on the form)', def: d('2026-12-04'), date: true }],
    run: (v) => {
      const c = courtDates(iso(v.posted));
      return { head: ['Acknowledge by', dateL(c.aos)], rows: [['Claim deemed served', dateL(c.served)], ['Defence without acknowledgment', dateL(c.defence)], ['Defence after acknowledging', dateL(c.defenceWithAos)]], note: 'CPR 6.14, 10.3 and 15.4, counted from deemed service. Check the dates printed on your claim form.' };
    },
  }),
  letterclaim: () => ({
    title: 'Reply to a letter of claim', cta: 'Letter before claim', ctaPage: 'parking-county-court-claim',
    inputs: [{ id: 'on', label: 'Date of the letter of claim', def: d(EX), date: true }],
    run: (v) => {
      const p = papReply(iso(v.on));
      return { head: ['Reply by', dateL(p.reply)], rows: [['Period', `${P.court.papReplyDays} days`], ['If you ask for documents or advice', `about ${P.court.papExtraDays} more days, to ${dateL(p.extra)}`]], note: 'Pre-Action Protocol for Debt Claims, paragraphs 3.4 and 4.2.' };
    },
  }),
  hire: () => ({
    title: 'Hire car: who pays the charge?', cta: 'Parking fines on hire and lease cars', ctaPage: 'hire-car-parking-fine',
    inputs: [{ id: 'on', label: 'Date the hire firm received the notice', def: d(EX), date: true }],
    run: (v) => {
      const on = iso(v.on);
      return { head: ['Hire firm replies by', dateL(lastDayOf(on, POFA.hireStatementDays))], rows: [['It sends', 'a statement and a copy of the hire agreement'], ['Notice to the hirer', `then ${POFA.hirerDays} days from it`]], note: 'Protection of Freedoms Act 2012, Schedule 4, paragraphs 13 and 14 (England and Wales).' };
    },
  }),
  nhs: () => ({
    title: 'Free hospital parking in England?', cta: 'Hospital parking charges', ctaPage: 'hospital-parking-fine',
    inputs: [{ id: 'who', label: 'You are', def: 0, options: [{ value: '0', label: 'A Blue Badge holder' }, { value: '1', label: 'A frequent outpatient' }, { value: '2', label: 'Parent of a sick child staying overnight' }, { value: '3', label: 'Staff on a night shift' }, { value: '4', label: 'A visitor' }] }, { id: 'n', label: 'Visits in the last 30 days', def: 3, max: 60 }],
    run: (v) => {
      const w = clamp(v.who ?? 0, 0, 4), N = P.nhs, freq = (v.n ?? 0) >= N.frequentTimes;
      const ok = w === 0 || w === 2 || w === 3 || (w === 1 && freq);
      return { head: ['Free parking under the NHS principles', ok ? 'Yes' : w === 4 ? 'Not as a rule' : 'Not yet'], rows: [['Frequent outpatient', `${N.frequentTimes} or more visits in ${N.frequentDays} days, for ${N.frequentMonths} months or more`], ['Night staff and parents', `${N.nightFrom} to ${N.nightTo}`]], note: 'Principles set for NHS trusts in England. Ask the trust how to register before you park.' };
    },
  }),
  buswarn: () => ({
    title: 'Warning notice for a first camera offence?', cta: 'Bus lane and moving traffic PCN', ctaPage: 'bus-lane-fine',
    inputs: [{ id: 'start', label: 'Day the camera started enforcing', def: d('2026-09-01'), date: true }, { id: 'on', label: 'Day of your contravention', def: d('2026-10-20'), date: true }, { id: 'first', label: 'Your first one at this camera?', def: 1, options: yn }],
    run: (v) => {
      const end = addMonths(iso(v.start), E.busWarningMonths), inWin = iso(v.on) < end;
      return { head: ['Warning instead of a PCN?', inWin && v.first ? 'Expected, under the guidance' : 'No'], rows: [['Warning period ends', dateL(end)], ['Penalty otherwise', `${money(E.band2.higher)} outside London, ${money(L.busLane)} in London`]], note: 'DfT statutory guidance for councils outside London: a warning notice for a first contravention at each new camera site in its first six months.' };
    },
  }),
  appealwin: () => ({
    title: 'Private appeal: dates after a rejection', cta: 'Appeal a private charge', ctaPage: 'appeal-parking-charge-notice',
    inputs: [{ id: 'issued', label: 'Date on the parking charge', def: d('2026-10-05'), date: true }, { id: 'rej', label: 'Date of the rejection', def: d(EX), date: true }],
    run: (v) => {
      const appealBy = lastDayOf(iso(v.issued), CODE.appealDays), hold = lastDayOf(iso(v.rej), CODE.discountHeldDays);
      return { head: ['Reduced rate still open until', dateL(hold)], rows: [['First appeal was due by', dateL(appealBy)], ['Second stage (POPLA or IAS)', 'from the rejection letter'], ['Enforcement during it', 'suspended (clause 8.3.7)']], note: 'Clause 8.1.2(e): appeal within 28 days and the rate you could pay then holds for 14 days after the rejection. Windscreen notices are delivered the day they are issued.' };
    },
  }),
  tribunal: () => ({
    title: 'Last day to appeal to the tribunal', cta: 'Parking appeal tribunals', ctaPage: 'parking-appeal-tribunal',
    inputs: [{ id: 'rej', label: 'Date of the notice of rejection', def: d(EX), date: true }, { id: 'where', label: 'Council in', def: 0, options: [{ value: '0', label: 'England (incl. London) or Wales' }, { value: '1', label: 'Scotland' }, { value: '2', label: 'Northern Ireland' }] }],
    run: (v) => {
      const w = clamp(v.where ?? 0, 0, 2), on = iso(v.rej);
      if (w === 2) return { head: ['Appeal by', 'date on your rejection'], rows: [['Tribunal', 'independent adjudicator (DfI process)'], ['If you lose, pay within', plural(NI.payAfterAdjudicationDays, 'day')]], note: 'nidirect does not give one fixed period: use the date printed on your notice of rejection.' };
      const served = w === 0 ? addWorkingDays(on, E.deemedServiceWorkingDays, 'ew') : on, n = w === 0 ? E.afterRejectionDays : S.appealDays;
      return { head: ['Appeal by', dateL(lastDayOf(served, n))], rows: [['Period', `${n} days${w === 0 ? ' from service of the rejection' : ' from the notice of rejection'}`], ['Tribunal', ['Traffic Penalty Tribunal or London Tribunals', 'First-tier Tribunal for Scotland', ''][w]]], note: w === 0 ? 'SI 2022/576 reg 7 (England). A posted rejection is counted from the second working day after posting.' : 'First-tier Tribunal for Scotland, General Regulatory Chamber.' };
    },
  }),
  scotfpn: () => ({
    title: 'Police fixed penalty for parking', cta: 'Fixed penalty notices', ctaPage: 'fixed-penalty-notice',
    inputs: [{ id: 'late', label: 'Paid on time?', def: 1, options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }] }],
    run: (v) => ({ head: ['Scotland', money(v.late ? S.policeFpn : S.policeFpnLate)], rows: [['On time', money(S.policeFpn)], ['Late', money(S.policeFpnLate)], ['England and Wales', 'GOV.UK: 50% more after 28 days']] }),
  }),
  pofawindow: () => ({
    title: 'Notice to Keeper window after a windscreen ticket', cta: 'Notice to Keeper rules', ctaPage: 'notice-to-keeper',
    inputs: [{ id: 'ntd', label: 'Date of the windscreen ticket', def: d('2026-10-01'), date: true }],
    run: (v) => {
      const r = ntkInTime('windscreen', iso(v.ntd), iso(v.ntd));
      return { head: ['Delivery allowed from', dateL(r.from)], rows: [['Until', dateL(r.to)], ['Keeper liable from', `${POFA.keeperLiableAfterDays} days after delivery`]] };
    },
  }),
  ignore: () => ({
    title: 'Where does an ignored private charge stand?', cta: 'What happens if you ignore it', ctaPage: 'ignore-parking-charge-notice',
    inputs: [{ id: 'days', label: 'Days since the charge was issued', def: 45, max: 2000, unit: 'days' }],
    run: (v) => {
      const k = clamp(v.days ?? 0, 0, 2000);
      const stage = k < CODE.discountDays ? 'Reduced rate still open' : k < CODE.appealDays ? 'Full charge, appeal still possible' : k < 60 ? 'Reminders and Notice to Keeper' : 'Debt letters, then possibly a claim';
      return { head: ['Likely stage', stage], rows: [['Reduced rate', `first ${CODE.discountDays} days`], ['First appeal', `${CODE.appealDays} days from delivery`], ['Debt add-on once overdue', `up to ${money(CODE.debtRecoveryMax)}`]], note: 'A rough guide: operators set their own reminder schedule. Only a county court judgment that is not paid reaches your credit file.' };
    },
  }),
};

export function getSpec(kind: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f();
}
export const MINI_KINDS = Object.keys(SPECS);
