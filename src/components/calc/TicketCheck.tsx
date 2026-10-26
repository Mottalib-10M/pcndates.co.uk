/**
 * "Which ticket have I got?": issuer, heading, delivery and nation → legal nature, what happens if it
 * is not paid, next step and the amounts that apply. Pure function of the four answers (engine
 * `whichTicket`), so the first render is the same on the server and in the browser.
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { whichTicket, councilAmounts, type Issuer, type Heading, type Service, type Nation } from '../../lib/engine/parking';
import { money } from '../../lib/format-l';
import P from '../../data/params-2026.json';
import { PRIVACY } from './fields';

interface Props { idPrefix?: string; issuer?: Issuer; nation?: Nation; links?: Record<string, string>; primary?: boolean }

const ISSUERS = [
  { value: 'council', label: 'A council (city, borough, district)' },
  { value: 'tfl', label: 'Transport for London (red route)' },
  { value: 'private', label: 'A parking company' },
  { value: 'police', label: 'The police' },
  { value: 'unsure', label: 'I cannot tell' },
];
const HEADINGS = [
  { value: 'penalty', label: 'Penalty Charge Notice (PCN)' },
  { value: 'parking-charge', label: 'Parking Charge Notice or Parking Charge' },
  { value: 'fixed-penalty', label: 'Fixed Penalty Notice' },
  { value: 'unsure', label: 'Something else or not sure' },
];
const DELIVERY = [{ value: 'windscreen', label: 'On the windscreen or handed to me' }, { value: 'post', label: 'By post' }];
const NATIONS = [{ value: 'england', label: 'England' }, { value: 'wales', label: 'Wales' }, { value: 'scotland', label: 'Scotland' }, { value: 'ni', label: 'Northern Ireland' }];

export default function TicketCheck({ idPrefix = 'tc', issuer: i0 = 'private', nation: n0 = 'england', links = {}, primary = true }: Props) {
  const [issuer, setIssuer] = useState<Issuer>(i0);
  const [heading, setHeading] = useState<Heading>(i0 === 'private' ? 'parking-charge' : i0 === 'police' ? 'fixed-penalty' : 'penalty');
  const [delivery, setDelivery] = useState<Service>('windscreen');
  const [nation, setNation] = useState<Nation>(n0);
  const v = useMemo(() => whichTicket(issuer, heading, delivery, nation), [issuer, heading, delivery, nation]);
  const amountLine = useMemo(() => {
    if (v.kind === 'council-pcn') {
      if (nation === 'ni') { const a = councilAmounts('ni'); return `${money(a.full)}, or ${money(a.discounted)} within ${P.ni.discountDays} days; ${money(a.afterCertificate)} after a charge certificate.`; }
      if (nation === 'scotland') return `Up to ${money(P.scotland.max)}, halved if paid within ${P.scotland.discountDays} days, plus ${P.scotland.surchargePct}% after a charge certificate.`;
      if (nation === 'wales') return `${money(P.wales.higher)} or ${money(P.wales.lower)}, halved within ${P.wales.discountDays} days.`;
      return `Outside London ${money(P.england.band1.lower)} to ${money(P.england.band2.higher)}; in London ${money(P.london.bandB.lower)} to ${money(P.london.bandA.higher)}. Half within 14 days, +50% after a charge certificate.`;
    }
    if (v.kind === 'tfl-pcn') return `${money(P.london.tflRedRoute)}, or ${money(P.london.tflRedRoute / 2)} within 14 days (21 for a camera notice by post); ${money(P.london.tflCc)} after a charge certificate.`;
    if (v.kind === 'private' || v.kind === 'private-mimic') return `Capped at ${money(P.private.code.cap)} by the government Code once in force, with at least ${P.private.code.discountMinPct}% off within 14 days.`;
    if (v.kind === 'police-fpn' && nation === 'scotland') return `${money(P.scotland.policeFpn)}, ${money(P.scotland.policeFpnLate)} if unpaid in time.`;
    return 'The amount printed on the notice.';
  }, [v, nation]);
  const href = links[v.page];
  const id = (s: string) => `${idPrefix}-${s}`;
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('issuer')} label="Who sent it?" value={issuer} onChange={(x) => setIssuer(x as Issuer)} options={ISSUERS} />
          <SelectField id={id('heading')} label="What is the heading?" value={heading} onChange={(x) => setHeading(x as Heading)} options={HEADINGS} />
          <SelectField id={id('delivery')} label="How did you get it?" value={delivery} onChange={(x) => setDelivery(x as Service)} options={DELIVERY} />
          <SelectField id={id('nation')} label="Where were you parked?" value={nation} onChange={(x) => setNation(x as Nation)} options={NATIONS} />
          <p className="text-xs text-navy-600 sm:col-span-2">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">You have</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{v.title}</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div><dt className="font-semibold text-navy-800">What it is</dt><dd className="text-navy-700">{v.nature}</dd></div>
            <div><dt className="font-semibold text-navy-800">Amount</dt><dd className="text-navy-700">{amountLine}</dd></div>
            <div><dt className="font-semibold text-navy-800">If it is not paid</dt><dd className="text-navy-700">{v.ifUnpaid}</dd></div>
            <div><dt className="font-semibold text-navy-800">Next step</dt><dd className="text-navy-700">{v.next}</dd></div>
          </dl>
          {href && <a href={href} className="mt-3 inline-block text-sm font-medium text-accent-700 underline">Deadlines and how to challenge it →</a>}
        </div>
      </div>
    </div>
  );
}
