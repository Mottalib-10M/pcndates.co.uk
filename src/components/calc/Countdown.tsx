/**
 * Deadline countdown. Council or TfL PCN (England, London, Wales, Scotland, Northern Ireland) or private
 * parking charge (Code + PoFA Sch 4). Date on the notice → every date with the amount due then, the next
 * deadline in large type, a calendar file (.ics) built in the browser and a print button.
 * First render = build day (RECETTE §17.5); today is applied after mount.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { DateField, PRIVACY } from './fields';
import { councilAmounts, councilTimeline, privateTimeline, daysUntil, holidaysKnown, type Area, type Service, type Nation, type Step } from '../../lib/engine/parking';
import { money, dateL, formatNumberL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;
interface Props { mode?: 'council' | 'private'; area?: Area; service?: Service; idPrefix?: string; primary?: boolean; nation?: Nation }

const AREAS = [
  { value: 'outside-london', label: 'Council in England, outside London' },
  { value: 'london', label: 'London borough' },
  { value: 'tfl', label: 'TfL red route (London)' },
  { value: 'wales', label: 'Council in Wales' },
  { value: 'scotland', label: 'Council in Scotland' },
  { value: 'ni', label: 'Northern Ireland (DfI)' },
];
const RATES: Record<string, Array<{ value: string; label: string }>> = {
  'outside-london': [
    { value: 'band2-higher', label: `Higher, band 2 (${money(P.england.band2.higher)})` }, { value: 'band2-lower', label: `Lower, band 2 (${money(P.england.band2.lower)})` },
    { value: 'band1-higher', label: `Higher, band 1 (${money(P.england.band1.higher)})` }, { value: 'band1-lower', label: `Lower, band 1 (${money(P.england.band1.lower)})` },
  ],
  london: [
    { value: 'bandA-higher', label: `Higher, band A (${money(P.london.bandA.higher)})` }, { value: 'bandA-lower', label: `Lower, band A (${money(P.london.bandA.lower)})` },
    { value: 'bandB-higher', label: `Higher, band B (${money(P.london.bandB.higher)})` }, { value: 'bandB-lower', label: `Lower, band B (${money(P.london.bandB.lower)})` },
    { value: 'bus', label: `Bus lane or moving traffic (${money(P.london.busLane)})` },
  ],
  wales: [{ value: 'w-higher', label: `Higher rate (${money(P.wales.higher)})` }, { value: 'w-lower', label: `Lower rate (${money(P.wales.lower)})` }],
};

function ics(steps: Step[], title: string) {
  const d = (x: string) => x.replace(/-/g, '');
  const next = (x: string) => { const t = new Date(`${x}T00:00:00Z`); t.setUTCDate(t.getUTCDate() + 1); return t.toISOString().slice(0, 10).replace(/-/g, ''); };
  const esc = (s: string) => s.replace(/[\\,;]/g, (m) => `\\${m}`);
  const ev = steps.map((s, i) => ['BEGIN:VEVENT', `UID:${d(s.date)}-${i}-${s.id}@parking-countdown`, `DTSTAMP:${d(s.date)}T000000Z`, `DTSTART;VALUE=DATE:${d(s.date)}`, `DTEND;VALUE=DATE:${next(s.date)}`, `SUMMARY:${esc(`${title}: ${s.label}`)}`, `DESCRIPTION:${esc(s.detail)}`, 'END:VEVENT'].join('\r\n'));
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Radif Partners//Parking countdown//EN', 'CALSCALE:GREGORIAN', ...ev, 'END:VCALENDAR'].join('\r\n');
}

export default function Countdown({ mode = 'council', area: a0 = 'outside-london', service: s0 = 'windscreen', idPrefix = 'cd', primary = true, nation: n0 = 'england' }: Props) {
  const [today, setToday] = useState(__BUILD_DAY__);
  const [date, setDate] = useState(__BUILD_DAY__);
  const [parked, setParked] = useState(__BUILD_DAY__);
  const [touched, setTouched] = useState(false);
  const [area, setArea] = useState<Area>(a0);
  const [rate, setRate] = useState(RATES[a0]?.[0].value ?? '');
  const [service, setService] = useState<Service>(s0);
  const [scot, setScot] = useState(P.scotland.max);
  const [amount, setAmount] = useState(P.private.code.cap);
  const [nation, setNation] = useState<Nation>(n0);
  useEffect(() => { const t = new Date().toISOString().slice(0, 10); setToday(t); if (!touched) { setDate(t); setParked(t); } }, []);
  const changeArea = (x: string) => { setArea(x as Area); setRate(RATES[x]?.[0].value ?? ''); };
  const id = (s: string) => `${idPrefix}-${s}`;

  const res = useMemo(() => {
    if (mode === 'private') {
      const t = privateTimeline(service, date, service === 'post' ? parked : date, amount, nation);
      return { steps: t.steps, notes: t.notes, title: 'Private parking charge' };
    }
    const [b, r] = rate.split('-');
    const amounts = councilAmounts(area, {
      englandBand: b === 'band1' ? 'band1' : 'band2', londonBand: b === 'bandB' ? 'bandB' : 'bandA', band: (r === 'lower' ? 'lower' : 'higher'), busLane: rate === 'bus', scotlandAmount: scot,
    });
    const t = councilTimeline(area, service, date, amounts);
    return { steps: t.steps, notes: t.notes, title: 'Penalty Charge Notice' };
  }, [mode, area, rate, service, date, parked, scot, amount, nation]);

  const next = res.steps.find((s) => daysUntil(s.date, today) >= 0);
  const left = next ? daysUntil(next.date, today) : null;
  const href = useMemo(() => `data:text/calendar;charset=utf-8,${encodeURIComponent(ics(res.steps, res.title))}`, [res]);
  const touch = <T,>(f: (v: T) => void) => (v: T) => { setTouched(true); f(v); };

  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-countdown>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <DateField id={id('date')} label={service === 'post' ? 'Date printed on the notice (posting)' : 'Date on the notice'} value={date} onChange={touch(setDate)} />
          {mode === 'council'
            ? <SelectField id={id('area')} label="Who issued it?" value={area} onChange={touch(changeArea)} options={AREAS} />
            : <SelectField id={id('nation')} label="Where was the car park?" value={nation} onChange={touch((x: string) => setNation(x as Nation))} options={[{ value: 'england', label: 'England' }, { value: 'wales', label: 'Wales' }, { value: 'scotland', label: 'Scotland' }, { value: 'ni', label: 'Northern Ireland' }]} />}
          <SelectField id={id('service')} label="How did it reach you?" value={service} onChange={touch((x: string) => setService(x as Service))} options={mode === 'council' ? [{ value: 'windscreen', label: 'On the car or handed over' }, { value: 'post', label: 'By post (camera)' }] : [{ value: 'windscreen', label: 'On the windscreen' }, { value: 'post', label: 'By post (camera, ANPR)' }]} />
          {mode === 'council' && RATES[area] && <SelectField id={id('rate')} label="Amount on the notice" value={rate} onChange={touch(setRate)} options={RATES[area]} />}
          {mode === 'council' && area === 'scotland' && <NumberField id={id('scot')} label="Amount on the notice" value={scot} onChange={touch(setScot)} unit="£" max={P.scotland.max} />}
          {mode === 'private' && <NumberField id={id('amount')} label="Amount on the notice" value={amount} onChange={touch(setAmount)} unit="£" max={1000} />}
          {mode === 'private' && service === 'post' && <DateField id={id('parked')} label="Day the parking ended" value={parked} onChange={touch(setParked)} />}
          <p className="text-xs text-navy-600 sm:col-span-2">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{next ? `Next: ${next.label}` : 'Every date on this notice has passed'}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{next ? dateL(next.date) : 'Past'}</p>
          {left !== null && <p className="text-sm text-navy-700">{left === 0 ? 'Today is the last day' : `${formatNumberL(left)} day${left === 1 ? '' : 's'} left`}{next?.amount !== undefined ? ` · ${money(next.amount)}` : ''}</p>}
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {res.steps.map((s) => {
              const past = daysUntil(s.date, today) < 0;
              return <tr key={s.id} className={past ? 'text-navy-500' : 'text-navy-900'}><td className="py-1.5 pr-2"><span className="font-medium">{s.label}</span>{s.earliest ? ' (earliest)' : ''}<span className="block text-xs text-navy-600">{s.detail}</span></td><td className="tabular-nums whitespace-nowrap py-1.5 text-right align-top">{dateL(s.date)}{s.amount !== undefined && <span className="block text-xs">{money(s.amount)}</span>}</td></tr>;
            })}
          </tbody></table>
          {res.notes.map((n) => <p key={n} className="mt-2 text-xs text-navy-700">{n}</p>)}
          {!holidaysKnown(date) && <p className="mt-2 text-xs text-amber-800">Bank holidays are known for 2025 to 2027 only: working days outside those years skip weekends only.</p>}
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
            <a href={href} download="parking-deadlines.ics" className="inline-flex h-10 items-center rounded-lg bg-accent-600 px-4 text-sm font-medium text-white hover:bg-accent-700">Add to my calendar (.ics)</a>
            <button type="button" onClick={() => window.print()} className="h-10 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-white">Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}
