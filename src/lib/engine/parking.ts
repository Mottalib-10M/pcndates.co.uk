/**
 * Rules engine of the site. Every amount and every time limit is read from params-2026.json, where
 * each value carries its source (SI 2022/71, SI 2022/576, PoFA 2012 Sch 4, the Private Parking Code
 * laid on 20 October 2026, nidirect, Transport Scotland, CPR, Taking Control of Goods (Fees) Regs).
 * No clock is read here: "today" is always passed in by the caller (RECETTE §17.5).
 */
import P from '../../data/params-2026.json';
import { dayNum, isoOf, addDays, addMonths, type Iso } from './dates';

export type Nation = 'england' | 'wales' | 'scotland' | 'ni';
export type Area = 'outside-london' | 'london' | 'tfl' | 'wales' | 'scotland' | 'ni';
export type Calendar = 'ew' | 'scotland' | 'ni';
export const calendarOf = (n: Nation): Calendar => (n === 'scotland' ? 'scotland' : n === 'ni' ? 'ni' : 'ew');

const E = P.england, L = P.london, W = P.wales, S = P.scotland, NI = P.ni;
const PV = P.private, POFA = PV.pofa, CODE = PV.code, POPLA = PV.popla, C = P.court, ENF = P.enforcement;

/* ---------- days ---------- */

const HOLS: Record<Calendar, Set<string>> = {
  ew: new Set(P.bankHolidays.ew), scotland: new Set(P.bankHolidays.scotland), ni: new Set(P.bankHolidays.ni),
};
/** True for a Saturday, a Sunday or a bank holiday of that calendar (GOV.UK list, 2025 to 2027). */
export function isNonWorking(d: Iso, cal: Calendar = 'ew'): boolean {
  const wd = new Date(`${d}T00:00:00Z`).getUTCDay();
  return wd === 0 || wd === 6 || HOLS[cal].has(d);
}
/** The n-th working day after `d` (n = 2: "the second working day after the day on which it is posted"). */
export function addWorkingDays(d: Iso, n: number, cal: Calendar = 'ew'): Iso {
  let x = d, left = n;
  while (left > 0) { x = addDays(x, 1); if (!isNonWorking(x, cal)) left--; }
  return x;
}
/** Last day of a period of n days "beginning with" day `start` (the start day is day one). */
export const lastDayOf = (start: Iso, n: number): Iso => addDays(start, n - 1);
/** Whole days from `today` to `d` (negative when `d` is past). */
export const daysUntil = (d: Iso, today: Iso) => dayNum(d) - dayNum(today);
/** True when the bank holiday list covers that date (2025 to 2027). */
export const holidaysKnown = (d: Iso) => d >= '2025-01-01' && d <= '2027-12-31';

/* ---------- amounts ---------- */

export type Band = 'higher' | 'lower';
export type EnglandBand = 'band1' | 'band2';
export type LondonBand = 'bandA' | 'bandB';
export interface CouncilAmounts { full: number; discounted: number; afterCertificate: number; discountPct: number; surchargePct: number }

/** Penalty, reduced rate and amount after a charge certificate for a council or TfL PCN. */
export function councilAmounts(area: Area, opts: { band?: Band; englandBand?: EnglandBand; londonBand?: LondonBand; busLane?: boolean; scotlandAmount?: number } = {}): CouncilAmounts {
  const band = opts.band ?? 'higher';
  let full: number, dPct = 50, sPct = 50;
  switch (area) {
    case 'outside-london': full = E[opts.englandBand ?? 'band2'][band]; dPct = E.discountPct; sPct = E.surchargePct; break;
    case 'london': full = opts.busLane ? L.busLane : L[opts.londonBand ?? 'bandA'][band]; dPct = L.discountPct; sPct = L.surchargePct; break;
    case 'tfl': full = L.tflRedRoute; dPct = L.discountPct; sPct = L.surchargePct; break;
    case 'wales': full = W[band]; dPct = W.discountPct; sPct = W.surchargePct; break;
    case 'scotland': full = Math.min(Math.max(0, opts.scotlandAmount ?? S.max), S.max); dPct = S.discountPct; sPct = S.surchargePct; break;
    case 'ni': full = NI.pcn; return { full, discounted: NI.discounted, afterCertificate: NI.cc, discountPct: 50, surchargePct: 50 };
  }
  return { full, discounted: full * (1 - dPct / 100), afterCertificate: full * (1 + sPct / 100), discountPct: dPct, surchargePct: sPct };
}

/* ---------- council PCN timeline ---------- */

export type Service = 'windscreen' | 'post';
export interface Step { id: string; date: Iso; label: string; detail: string; amount?: number; earliest?: boolean; source: keyof typeof P.sources }
export interface Timeline { served: Iso; steps: Step[]; amounts: CouncilAmounts; notes: string[] }

/**
 * Council (or TfL) PCN. `date` = date printed on the notice: the day it was fixed to the car, or the
 * day it was posted. England: a postal notice is served on the second working day after posting
 * (SI 2022/71 reg 3(3)); the reduced rate lasts 14 days beginning with service, 21 for a camera notice
 * sent by post (reg 10(2)(a)); notice to owner after 28 days unpaid (reg 20); charge certificate
 * after the 28 days given by the notice to owner (reg 21), order for recovery 14 days later (reg 22).
 */
export function councilTimeline(area: Area, service: Service, date: Iso, amounts: CouncilAmounts): Timeline {
  const notes: string[] = [];
  const ew = area === 'outside-london' || area === 'london' || area === 'tfl';
  const served = service === 'post' && ew ? addWorkingDays(date, E.deemedServiceWorkingDays, 'ew') : date;
  if (service === 'post' && !ew) notes.push('Counted from the date printed on the notice: check on the notice whether your council counts from the date of posting or of delivery.');
  const steps: Step[] = [];
  if (service === 'post' && ew) steps.push({ id: 'served', date: served, label: 'Notice served', detail: `Second working day after posting, unless you can show it arrived later.`, source: 'si2022_71' });
  if (area === 'ni') {
    const disc = lastDayOf(date, NI.discountDays);
    steps.push({ id: 'discount', date: disc, label: 'Last day for the reduced rate', detail: `Pay ${fmtGbp(NI.discounted)} instead of ${fmtGbp(NI.pcn)}. A challenge made within ${NI.discountDays} days freezes the reduced rate while it is looked at.`, amount: NI.discounted, source: 'ni_pcn' });
    const nto = addDays(date, NI.ntoAfterDays);
    steps.push({ id: 'nto', date: nto, label: 'Notice to Owner can be sent', detail: 'The registered keeper is then asked to pay the full amount or make representations.', amount: NI.pcn, earliest: true, source: 'ni_pcn' });
    const cc = addDays(nto, NI.ccAfterDays);
    steps.push({ id: 'cc', date: cc, label: 'Charge certificate can be issued', detail: `The charge rises to ${fmtGbp(NI.cc)}.`, amount: NI.cc, earliest: true, source: 'ni_pcn' });
    return { served, steps, amounts, notes };
  }
  const camera = service === 'post' && ew;
  const discDays = camera ? (area === 'outside-london' ? E.discountDaysCameraPost : L.discountDaysCameraPost) : area === 'scotland' ? S.discountDays : area === 'wales' ? W.discountDays : E.discountDays;
  const disc = lastDayOf(served, discDays);
  steps.push({ id: 'discount', date: disc, label: 'Last day for the reduced rate', detail: `${discDays} days beginning with the day the notice was served. Pay ${fmtGbp(amounts.discounted)} instead of ${fmtGbp(amounts.full)}.`, amount: amounts.discounted, source: ew ? 'si2022_71' : area === 'wales' ? 'wales' : 'scot_levels' });
  if (!camera) {
    steps.push({ id: 'informal', date: lastDayOf(served, discDays), label: 'Informal challenge, to keep the reduced rate', detail: 'Write to the council before this date: if it rejects the challenge it may offer the reduced rate again.', source: 'govuk_tickets' });
    const nto = addDays(served, E.ntoAfterDays);
    steps.push({ id: 'nto', date: nto, label: 'Notice to Owner can be posted', detail: `Sent to the registered keeper if nothing is paid in 28 days. From then on the full ${fmtGbp(amounts.full)} is due.`, amount: amounts.full, earliest: true, source: ew ? 'si2022_71' : 'govuk_tickets' });
    const ntoServed = ew ? addWorkingDays(nto, E.deemedServiceWorkingDays, 'ew') : nto;
    steps.push({ id: 'reps', date: lastDayOf(ntoServed, E.representationsDays), label: 'Formal representations', detail: '28 days beginning with the day the Notice to Owner is served. The date counts from your Notice to Owner: this is the earliest it can fall.', earliest: true, source: ew ? 'si2022_576' : 'govuk_tickets' });
    const cc = addDays(ntoServed, E.ccAfterDays);
    steps.push({ id: 'cc', date: cc, label: 'Charge certificate', detail: `If nothing is paid or challenged, the charge rises by ${amounts.surchargePct}% to ${fmtGbp(amounts.afterCertificate)}.`, amount: amounts.afterCertificate, earliest: true, source: ew ? 'si2022_71' : 'govuk_tickets' });
    if (ew) steps.push({ id: 'order', date: addDays(cc, E.orderAfterCcDays), label: 'Order for recovery', detail: `14 days after the charge certificate the council can register the debt at the county court; you then have 21 days for a witness statement.`, amount: amounts.afterCertificate, earliest: true, source: 'si2022_71' });
    if (ew) notes.push(`The Notice to Owner must be served within ${E.ntoLatestMonths} months of the notice (SI 2022/71 reg 20).`);
  } else {
    steps.push({ id: 'reps', date: lastDayOf(served, E.representationsDays), label: 'Representations against the postal notice', detail: 'A notice sent by post after a camera recording works as the Notice to Owner: representations go straight to the council within 28 days of service.', source: 'si2022_576' });
    const cc = addDays(served, E.ccAfterDays);
    steps.push({ id: 'cc', date: cc, label: 'Charge certificate', detail: `If nothing is paid or challenged, the charge rises to ${fmtGbp(amounts.afterCertificate)}.`, amount: amounts.afterCertificate, earliest: true, source: 'si2022_71' });
    steps.push({ id: 'order', date: addDays(cc, E.orderAfterCcDays), label: 'Order for recovery', detail: 'Registration at the county court, then 21 days for a witness statement.', amount: amounts.afterCertificate, earliest: true, source: 'si2022_71' });
  }
  if (area === 'scotland') notes.push(`Scotland: appeals go to the First-tier Tribunal for Scotland within ${S.appealDays} days of the notice of rejection.`);
  return { served, steps: steps.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)), amounts, notes };
}

/* ---------- private parking charge ---------- */

export type PrivateStart = 'windscreen' | 'post';
export interface PrivateTimeline { delivered: Iso; steps: Step[]; ntkWindow?: { from: Iso; to: Iso }; notes: string[] }

/**
 * Private parking charge on relevant land in England or Wales.
 * windscreen: notice to driver given on `date`; a notice to keeper must reach the keeper in the 28 days
 * that follow the first 28 days beginning with the day after (PoFA Sch 4 para 8(5)): days 29 to 56.
 * post (camera, no notice to driver): delivered within 14 days beginning with the day after the parking
 * ended (para 9(5)), presumed delivered on the second working day after posting (para 9(6)).
 * Code clauses 8.2.2 (discount 14 days from issue), 8.3.1 (appeal within 28 days of delivery).
 */
export function privateTimeline(start: PrivateStart, date: Iso, parkedOn: Iso, amount: number, nation: Nation = 'england'): PrivateTimeline {
  const notes: string[] = [];
  const steps: Step[] = [];
  const delivered = start === 'post' ? addWorkingDays(date, POFA.deemedWorkingDays, 'ew') : date;
  const discount = Math.round(amount * (1 - CODE.discountMinPct / 100) * 100) / 100;
  steps.push({ id: 'discount', date: lastDayOf(date, CODE.discountDays), label: 'End of the 14-day reduced rate', detail: `Under the government Code, at least ${CODE.discountMinPct}% off if paid within 14 days of the date of issue: ${fmtGbp(discount)} or less on ${fmtGbp(amount)}. Check the rate printed on your notice.`, amount: discount, source: 'code2026' });
  steps.push({ id: 'appeal', date: lastDayOf(delivered, CODE.appealDays), label: 'First appeal to the operator', detail: 'Within 28 days of delivery. If it is rejected after an appeal made in time, the rate you could pay when you appealed stays open for 14 more days.', source: 'code2026' });
  let ntkWindow: PrivateTimeline['ntkWindow'];
  if (nation === 'england' || nation === 'wales') {
    if (start === 'windscreen') {
      ntkWindow = { from: addDays(date, POFA.ntkAfterNtdFromDay), to: addDays(date, POFA.ntkAfterNtdToDay) };
      steps.push({ id: 'ntk-from', date: ntkWindow.from, label: 'Notice to Keeper: earliest delivery', detail: 'Before this day a notice to keeper does not meet paragraph 8.', source: 'pofa4' });
      steps.push({ id: 'ntk-to', date: ntkWindow.to, label: 'Notice to Keeper: latest delivery', detail: 'After this day the keeper cannot be made liable under Schedule 4; the operator would have to show who was driving.', source: 'pofa4' });
    } else {
      const to = lastDayOf(addDays(parkedOn, 1), POFA.ntkNoNtdDays);
      ntkWindow = { from: addDays(parkedOn, 1), to };
      steps.push({ id: 'ntk-to', date: to, label: 'Notice to Keeper: latest delivery', detail: `14 days beginning with the day after the parking ended. Your notice is presumed delivered on ${fmtDate(delivered)}.`, source: 'pofa4' });
      if (delivered > to) notes.push('Presumed delivered after the 14-day window: the keeper cannot be made liable under Schedule 4 by this notice. The operator can still pursue the driver.');
    }
    steps.push({ id: 'keeper', date: addDays(delivered, POFA.keeperLiableAfterDays), label: 'Keeper liability can start', detail: 'Proceedings against the keeper cannot begin before the end of 28 days beginning with the day the notice to keeper is given, and only for the sum it names.', earliest: true, source: 'pofa4' });
  } else {
    notes.push('Schedule 4 to the Protection of Freedoms Act 2012 applies only in England and Wales: in Scotland and Northern Ireland it does not make the keeper liable.');
  }
  return { delivered, steps: steps.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)), ntkWindow, notes };
}

/** Is a notice to keeper, delivered on `delivered`, inside the Schedule 4 window? */
export function ntkInTime(start: PrivateStart, refDate: Iso, delivered: Iso): { ok: boolean; from: Iso; to: Iso } {
  if (start === 'windscreen') { const from = addDays(refDate, POFA.ntkAfterNtdFromDay), to = addDays(refDate, POFA.ntkAfterNtdToDay); return { ok: delivered >= from && delivered <= to, from, to }; }
  const from = addDays(refDate, 1), to = lastDayOf(from, POFA.ntkNoNtdDays);
  return { ok: delivered >= from && delivered <= to, from, to };
}

/** POPLA: 28 days from the operator's rejection (counted from that day); pay within 28 days of a lost appeal. */
export function poplaDates(rejection: Iso) {
  return { lastDay: lastDayOf(rejection, POPLA.appealDays), operatorBy: POPLA.operatorEvidenceDays, commentDays: POPLA.commentDays, payDays: POPLA.payAfterDecisionDays };
}

/* ---------- the government Code ---------- */

/**
 * Earliest date the Code can be in force: the 40-day period begins with the day it is laid (Act s.2(6)),
 * days when both Houses are adjourned for more than 4 days are not counted (s.2(7)); issued after
 * that period if neither House objects (s.2(4)); in force at the end of 21 days beginning with the day
 * of issue (s.2(5)).
 */
export function codeEarliest(laid: Iso = CODE.laid, pausedDays = 0) {
  const periodEnd = lastDayOf(laid, CODE.scrutinyDays + Math.max(0, pausedDays));
  const issue = addDays(periodEnd, 1);
  const inForce = addDays(issue, CODE.inForceDaysAfterIssue);
  return { periodEnd, issue, inForce };
}
export const codeSites = CODE.sites;
/** Annex B: minutes before a charge may be issued on arrival (consideration) and after the paid time ends (grace). */
export function graceCheck(siteId: string, minutesOver: number, minutesOnArrival = 0) {
  const s = CODE.sites.find((x) => x.id === siteId) ?? CODE.sites[0];
  return { site: s, withinGrace: minutesOver <= s.grace, withinConsideration: minutesOnArrival <= s.consideration };
}

/* ---------- court and enforcement ---------- */

/** County court claim posted on `posted`: deemed service (CPR 6.14), acknowledgment (10.3), defence (15.4). */
export function courtDates(posted: Iso) {
  const served = addWorkingDays(posted, C.deemedServiceBusinessDays, 'ew');
  return { served, aos: addDays(served, C.aosDays), defence: addDays(served, C.defenceDays), defenceWithAos: addDays(served, C.defenceWithAosDays) };
}
/** Letter of claim under the Pre-Action Protocol for Debt Claims: 30 days to reply (para 3.4). */
export const papReply = (letter: Iso) => ({ reply: addDays(letter, C.papReplyDays), extra: addDays(addDays(letter, C.papReplyDays), C.papExtraDays) });
/** Enforcement agent fixed fees (Taking Control of Goods (Fees) Regulations 2014, from 1 May 2026). */
export function enforcementFees(debt: number, stage: 'compliance' | 'enforcement' | 'sale' = 'enforcement') {
  const pctOn = (x: number) => Math.round(Math.max(0, x - ENF.pctOver) * ENF.pct) / 100;
  const compliance = ENF.compliance;
  const enforcement = stage === 'compliance' ? 0 : ENF.enforcement + pctOn(debt);
  const sale = stage === 'sale' ? ENF.sale + pctOn(debt) : 0;
  return { compliance, enforcement, sale, total: debt + compliance + enforcement + sale };
}
/** Private charge: what an operator may ask under the Code once overdue (cap + debt recovery add-on). */
export function privateMax(amount: number, overdue: boolean) {
  const charge = Math.min(amount, CODE.cap);
  return { charge, overCap: amount > CODE.cap, addOn: overdue ? CODE.debtRecoveryMax : 0, total: charge + (overdue ? CODE.debtRecoveryMax : 0) };
}

/* ---------- which ticket ---------- */

export type Issuer = 'council' | 'tfl' | 'police' | 'private' | 'unsure';
export type Heading = 'penalty' | 'parking-charge' | 'fixed-penalty' | 'unsure';
export type Kind = 'council-pcn' | 'tfl-pcn' | 'police-fpn' | 'private' | 'private-mimic' | 'unclear';
export interface Verdict { kind: Kind; title: string; nature: string; ifUnpaid: string; next: string; page: string; law: keyof typeof P.sources }

export function whichTicket(issuer: Issuer, heading: Heading, delivery: Service, nation: Nation): Verdict {
  const priv = issuer === 'private' || (issuer === 'unsure' && heading === 'parking-charge');
  const pub = issuer === 'council' || issuer === 'tfl' || (issuer === 'unsure' && heading === 'penalty');
  if (issuer === 'police' || heading === 'fixed-penalty') {
    return { kind: 'police-fpn', title: 'Fixed Penalty Notice (police)', nature: 'A criminal fixed penalty for a parking offence, offered instead of prosecution. It is not a debt to a company and not a civil council charge.',
      ifUnpaid: nation === 'scotland' ? `In Scotland the police fixed penalty rises from ${fmtGbp(S.policeFpn)} to ${fmtGbp(S.policeFpnLate)} if unpaid.` : 'GOV.UK: if you do not pay within 28 days you may pay 50% more or be taken to court.',
      next: 'Pay or ask for a court hearing within the time printed on the notice. You cannot appeal it like a council PCN.', page: 'fixed-penalty-notice', law: 'govuk_tickets' };
  }
  if (priv && heading === 'penalty') {
    return { kind: 'private-mimic', title: 'Private parking charge that looks like a council notice', nature: 'A company on private land cannot issue a Penalty Charge Notice: only councils and TfL can. Read the small print for the issuer’s name and whether it cites the Protection of Freedoms Act 2012.',
      ifUnpaid: 'If it is from a company, it is a contractual claim: reminders, debt letters and possibly a county court claim, never a fine or a criminal record.',
      next: 'Check who sent it and whether it says “Parking Charge Notice” in full. The government Code bans notices that deliberately resemble a council PCN.', page: 'pcn-vs-parking-charge-notice', law: 'code2026' };
  }
  if (priv) {
    const pofa = nation === 'england' || nation === 'wales';
    return { kind: 'private', title: delivery === 'post' ? 'Private parking charge by post (Notice to Keeper)' : 'Private parking charge on the windscreen (Notice to Driver)',
      nature: `A demand from a parking company for breaking the terms on the signs: a claim under contract, not a fine. ${pofa ? 'Under Schedule 4 to the Protection of Freedoms Act 2012 the registered keeper can be made liable if the driver is not named and the notices meet strict conditions and dates.' : 'Schedule 4 to the Protection of Freedoms Act 2012 does not apply here: the keeper is not made liable by that law.'}`,
      ifUnpaid: `Reminders, then debt collection letters (the Code allows up to ${fmtGbp(CODE.debtRecoveryMax)} on top once overdue), then possibly a county court claim. Nothing goes on a credit file unless a court judgment is not paid.`,
      next: `Appeal to the operator within ${CODE.appealDays} days, then to POPLA or the IAS. Pay within 14 days for the reduced rate if you do not dispute it.`, page: 'parking-charge-notice', law: pofa ? 'pofa4' : 'code2026' };
  }
  if (pub || issuer === 'council' || issuer === 'tfl') {
    const tfl = issuer === 'tfl';
    return { kind: tfl ? 'tfl-pcn' : 'council-pcn', title: tfl ? 'Penalty Charge Notice from Transport for London' : 'Penalty Charge Notice from a council',
      nature: nation === 'ni' ? 'A civil penalty charge set by law and enforced by the Department for Infrastructure.' : nation === 'scotland' ? 'A civil penalty charge under decriminalised parking enforcement, set by law.' : 'A civil penalty charge under Part 6 of the Traffic Management Act 2004, set by law. Not a criminal fine.',
      ifUnpaid: nation === 'ni' ? `Notice to Owner after 28 days, then a charge certificate at ${fmtGbp(NI.cc)}.` : 'Notice to Owner after 28 days, then a charge certificate (+50%), then registration at court and enforcement agents.',
      next: delivery === 'post' ? 'If it came by post after a camera recording, you make representations straight away, within 28 days.' : 'Pay within 14 days at the reduced rate, or challenge in writing within 14 days to keep that rate open.', page: tfl ? 'red-route-pcn' : 'penalty-charge-notice', law: nation === 'ni' ? 'ni_pcn' : nation === 'scotland' ? 'scot_levels' : 'tma2004' };
  }
  return { kind: 'unclear', title: 'Look at the top and bottom of the notice', nature: 'The heading and the name of the sender decide everything: “Penalty Charge Notice” from a council or TfL, “Parking Charge Notice” from a company, “Fixed Penalty Notice” from the police.',
    ifUnpaid: 'Depends on who sent it: council and police penalties escalate by law; a company has to go to court to make you pay.', next: 'Answer the first two questions with what is printed on the notice.', page: 'pcn-vs-parking-charge-notice', law: 'govuk_tickets' };
}

/* ---------- small formatting used inside step texts ---------- */
const fmtGbp = (n: number) => `£${Math.round(n * 100) % 100 ? n.toFixed(2) : n.toFixed(0)}`;
const fmtDate = (d: Iso) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export { addMonths, isoOf, dayNum };
