/** Rules engine: every case below is worked by hand from the text it cites. */
import { describe, expect, it } from 'vitest';
import P from '../src/data/params-2026.json';
import {
  addWorkingDays, isNonWorking, lastDayOf, councilAmounts, councilTimeline, privateTimeline, ntkInTime, poplaDates,
  codeEarliest, graceCheck, courtDates, papReply, enforcementFees, privateMax, whichTicket,
} from '../src/lib/engine/parking';

describe('parameters read on the official texts', () => {
  it('England outside London, SI 2022/71 Sch 3 Table 1', () => {
    expect(P.england.band1).toEqual({ higher: 60, lower: 40 });
    expect(P.england.band2).toEqual({ higher: 70, lower: 50 });
    expect([P.england.removal, P.england.storagePerDay, P.england.disposal, P.england.clampRelease]).toEqual([105, 12, 50, 40]);
  });
  it('London bands from 7 April 2025 and TfL', () => {
    expect(P.london.bandA).toEqual({ higher: 160, lower: 110 });
    expect(P.london.bandB).toEqual({ higher: 140, lower: 90 });
    expect(P.london.tflCc).toBe(240);
  });
  it('Wales, Scotland, Northern Ireland', () => {
    expect([P.wales.higher, P.wales.lower]).toEqual([70, 50]);
    expect(P.scotland.max).toBe(100);
    expect([P.ni.pcn, P.ni.discounted, P.ni.cc]).toEqual([90, 45, 135]);
  });
  it('Private Parking Code laid on 20 October 2026', () => {
    const c = P.private.code;
    expect([c.cap, c.discountMinPct, c.debtRecoveryMax, c.reducedCharge, c.appealDays]).toEqual([100, 40, 70, 20, 28]);
    expect(c.laid).toBe('2026-10-20');
  });
  it('bank holidays from GOV.UK include Christmas 2026 and Easter 2027', () => {
    expect(P.bankHolidays.ew).toContain('2026-12-28');
    expect(P.bankHolidays.ew).toContain('2027-03-29');
    expect(P.bankHolidays.scotland).toContain('2026-11-30');
    expect(P.bankHolidays.ni).toContain('2027-03-17');
  });
});

describe('days', () => {
  it('weekends and bank holidays are not working days', () => {
    expect(isNonWorking('2026-10-24')).toBe(true); // Saturday
    expect(isNonWorking('2026-12-25')).toBe(true);
    expect(isNonWorking('2026-11-30', 'scotland')).toBe(true);
    expect(isNonWorking('2026-11-30', 'ew')).toBe(false);
  });
  it('second working day after posting', () => {
    expect(addWorkingDays('2026-10-26', 2)).toBe('2026-10-28'); // Monday → Wednesday
    expect(addWorkingDays('2026-10-23', 2)).toBe('2026-10-27'); // Friday → Tuesday
    expect(addWorkingDays('2026-12-23', 2)).toBe('2026-12-29'); // 24th, then 25, 26, 27, 28 skipped
  });
  it('a period beginning with a day counts that day', () => {
    expect(lastDayOf('2026-10-01', 14)).toBe('2026-10-14');
  });
});

describe('council PCN', () => {
  it('amounts: reduced rate 50%, charge certificate +50%', () => {
    expect(councilAmounts('outside-london', { englandBand: 'band2', band: 'higher' })).toMatchObject({ full: 70, discounted: 35, afterCertificate: 105 });
    expect(councilAmounts('outside-london', { englandBand: 'band1', band: 'lower' })).toMatchObject({ full: 40, discounted: 20, afterCertificate: 60 });
    expect(councilAmounts('london', { londonBand: 'bandA', band: 'higher' })).toMatchObject({ full: 160, discounted: 80, afterCertificate: 240 });
    expect(councilAmounts('ni')).toMatchObject({ full: 90, discounted: 45, afterCertificate: 135 });
    expect(councilAmounts('scotland', { scotlandAmount: 150 }).full).toBe(100);
  });
  it('windscreen PCN in England: reduced rate 14 days, NtO from day 28', () => {
    const t = councilTimeline('outside-london', 'windscreen', '2026-11-02', councilAmounts('outside-london'));
    const s = Object.fromEntries(t.steps.map((x) => [x.id, x.date]));
    expect(s.discount).toBe('2026-11-15');
    expect(s.nto).toBe('2026-11-30');
  });
  it('camera PCN by post in England: served 2nd working day, 21 days', () => {
    const t = councilTimeline('outside-london', 'post', '2026-11-02', councilAmounts('outside-london'));
    expect(t.served).toBe('2026-11-04');
    expect(t.steps.find((x) => x.id === 'discount')!.date).toBe('2026-11-24');
    expect(t.steps.find((x) => x.id === 'reps')!.date).toBe('2026-12-01');
  });
  it('Northern Ireland: charge certificate 28 days after the NtO', () => {
    const t = councilTimeline('ni', 'windscreen', '2026-11-02', councilAmounts('ni'));
    expect(t.steps.find((x) => x.id === 'cc')!.date).toBe('2026-12-28');
  });
});

describe('private parking charge', () => {
  it('Schedule 4 window after a windscreen notice: days 29 to 56', () => {
    const t = privateTimeline('windscreen', '2026-10-01', '2026-10-01', 100);
    expect(t.ntkWindow).toEqual({ from: '2026-10-30', to: '2026-11-26' });
  });
  it('postal NtK: within 14 days beginning with the day after parking', () => {
    expect(ntkInTime('post', '2026-10-01', '2026-10-15')).toMatchObject({ ok: true, to: '2026-10-15' });
    expect(ntkInTime('post', '2026-10-01', '2026-10-16').ok).toBe(false);
    const t = privateTimeline('post', '2026-10-13', '2026-10-01', 100);
    expect(t.delivered).toBe('2026-10-15');
    expect(t.notes.length).toBe(0);
    const late = privateTimeline('post', '2026-10-14', '2026-10-01', 100);
    expect(late.notes[0]).toMatch(/after the 14-day window/);
  });
  it('discount at 40% on £100', () => {
    const t = privateTimeline('windscreen', '2026-10-01', '2026-10-01', 100);
    expect(t.steps.find((x) => x.id === 'discount')!.amount).toBe(60);
  });
  it('Scotland: no keeper liability under Schedule 4', () => {
    expect(privateTimeline('windscreen', '2026-10-01', '2026-10-01', 100, 'scotland').ntkWindow).toBeUndefined();
  });
  it('POPLA 28 days', () => expect(poplaDates('2026-11-01').lastDay).toBe('2026-11-28'));
  it('cap and debt add-on', () => {
    expect(privateMax(120, true)).toEqual({ charge: 100, overCap: true, addOn: 70, total: 170 });
  });
});

describe('Code in force', () => {
  it('laid 20 October 2026: issue 29 November, in force 20 December at the earliest', () => {
    expect(codeEarliest()).toEqual({ periodEnd: '2026-11-28', issue: '2026-11-29', inForce: '2026-12-20' });
  });
  it('days of adjournment push it back', () => expect(codeEarliest('2026-10-20', 10).inForce).toBe('2026-12-30'));
  it('grace periods of Annex B', () => {
    expect(graceCheck('short-stay', 3).withinGrace).toBe(false);
    expect(graceCheck('pay-display', 9).withinGrace).toBe(true);
  });
});

describe('court and enforcement', () => {
  it('claim posted Friday 4 December 2026', () => {
    expect(courtDates('2026-12-04')).toEqual({ served: '2026-12-08', aos: '2026-12-22', defence: '2026-12-22', defenceWithAos: '2027-01-05' });
  });
  it('letter of claim: 30 days', () => expect(papReply('2026-11-01').reply).toBe('2026-12-01'));
  it('enforcement fees from 1 May 2026', () => {
    expect(enforcementFees(240, 'compliance').total).toBe(319);
    expect(enforcementFees(240).total).toBe(566);
    expect(enforcementFees(2900).enforcement).toBe(322);
  });
});

describe('which ticket', () => {
  it('reads the issuer first', () => {
    expect(whichTicket('council', 'penalty', 'windscreen', 'england').kind).toBe('council-pcn');
    expect(whichTicket('private', 'parking-charge', 'post', 'england').kind).toBe('private');
    expect(whichTicket('private', 'penalty', 'windscreen', 'england').kind).toBe('private-mimic');
    expect(whichTicket('police', 'unsure', 'windscreen', 'scotland').kind).toBe('police-fpn');
    expect(whichTicket('unsure', 'unsure', 'windscreen', 'england').kind).toBe('unclear');
  });
});
