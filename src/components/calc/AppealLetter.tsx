/**
 * Appeal letter builder. Ticked grounds → a letter in plain English to copy or print. The grounds
 * follow SI 2022/576 reg 5(4) for council notices in England, Schedule 4 to the Protection of
 * Freedoms Act 2012 and the Appeals Charter of the Private Parking Code for private charges. It is a
 * drafting aid, not legal advice; nothing typed here leaves the browser.
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { DateField, inputCls, PRIVACY } from './fields';
import { dateL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;
export type LetterKind = 'council-informal' | 'council-formal' | 'private' | 'second-stage';
interface Ground { id: string; label: string; text: string }
const COUNCIL: Ground[] = [
  { id: 'signs', label: 'Signs or lines were missing, hidden or unclear', text: 'The restriction was not adequately signed: the signs and road markings at this location were missing, obscured or unclear, so the contravention did not occur. I attach photographs taken at the location.' },
  { id: 'paid', label: 'I had paid or displayed a valid ticket, permit or badge', text: 'A valid pay and display ticket, permit or Blue Badge covered the vehicle at the time. A copy is attached.' },
  { id: 'loading', label: 'I was loading, unloading or helping a passenger', text: 'The vehicle was being loaded or unloaded, or a passenger was being helped in or out, which the restriction allows. I can provide details of the delivery or the passenger.' },
  { id: 'breakdown', label: 'The car broke down or there was an emergency', text: 'The vehicle had broken down or I faced an emergency that I could not avoid, and it was moved as soon as possible. Evidence is attached.' },
  { id: 'notowner', label: 'I was not the owner at the time', text: 'I was not the owner of the vehicle at the time of the alleged contravention. I sold or transferred it before that date and can supply the details I have of the buyer.' },
  { id: 'stolen', label: 'The vehicle was taken without consent', text: 'The vehicle had been taken without my consent at the time. A police crime reference is given below.' },
  { id: 'hire', label: 'It was on hire and the hirer signed a liability statement', text: 'The vehicle was on hire under an agreement in which the hirer accepted liability for penalty charges. The hirer’s details and the agreement are supplied.' },
  { id: 'amount', label: 'The amount asked is higher than the law allows', text: 'The penalty charge exceeds the amount applicable in the circumstances of the case.' },
  { id: 'procedure', label: 'The council did not follow the procedure', text: 'There has been a procedural impropriety on the part of the enforcement authority, as set out below.' },
  { id: 'already', label: 'I have already paid this penalty', text: 'The penalty charge has already been paid in full, or at the reduced rate within the time allowed. Proof of payment is attached.' },
];
const PRIVATE: Ground[] = [
  { id: 'keeper', label: 'I am the keeper and I will not name the driver', text: 'I am the registered keeper. I do not admit to being the driver and I am under no obligation to name them. Unless every condition of Schedule 4 to the Protection of Freedoms Act 2012 has been met, liability cannot pass to the keeper.' },
  { id: 'ntklate', label: 'The Notice to Keeper arrived too late', text: 'The Notice to Keeper was not delivered within the period set by Schedule 4 to the Protection of Freedoms Act 2012, so the keeper cannot be held liable.' },
  { id: 'signage', label: 'The signs were unclear or I could not see them', text: 'The terms were not clearly displayed: there was no sign at the entrance that could be read from a vehicle and the terms signs were too small, too high or badly lit, so no contract was formed on the terms you rely on.' },
  { id: 'grace', label: 'I was within the grace or consideration period', text: `The time recorded falls within the consideration period on arrival or the grace period after the paid time ended, which the Private Parking Code sets at a minimum of ${P.private.code.considerationMin} and ${P.private.code.graceMin} minutes on this type of site.` },
  { id: 'keying', label: 'I paid but mistyped the registration', text: 'I paid for the full time I stayed. The registration entered at the machine or in the app contains a minor keying error. Proof of payment is attached. Under the Appeals Charter of the Code this is a reason to cancel the charge.' },
  { id: 'machine', label: 'The payment machine or app did not work', text: 'I could not pay because the machine was out of order and there was no other way to pay on site. I attach photographs and the times of my attempts.' },
  { id: 'permit', label: 'I hold a valid permit or Blue Badge', text: 'I held a valid permit (or Blue Badge) for this site at the time. A copy is attached.' },
  { id: 'breakdownp', label: 'Breakdown, illness or an emergency kept me there', text: 'I stayed longer because of a breakdown, the onset of illness or an emergency I could not avoid. Evidence is attached.' },
  { id: 'amountp', label: 'The charge or the added fees are too high', text: `The sum demanded exceeds what can be recovered: a parking charge above ${'£'}${P.private.code.cap} or debt recovery fees above ${'£'}${P.private.code.debtRecoveryMax} go beyond the limits set by the Private Parking Code.` },
];
const KINDS = [
  { value: 'council-informal', label: 'Council PCN: informal challenge' },
  { value: 'council-formal', label: 'Council PCN: formal representations' },
  { value: 'private', label: 'Private charge: appeal to the operator' },
  { value: 'second-stage', label: 'Private charge: POPLA or IAS' },
];
interface Props { kind?: LetterKind; idPrefix?: string; primary?: boolean }

export default function AppealLetter({ kind: k0 = 'private', idPrefix = 'al', primary = true }: Props) {
  const [kind, setKind] = useState<LetterKind>(k0);
  const [ref, setRef] = useState('');
  const [vrm, setVrm] = useState('');
  const [date, setDate] = useState(__BUILD_DAY__);
  const [place, setPlace] = useState('');
  const [name, setName] = useState('');
  const council = kind.startsWith('council');
  const list = council ? COUNCIL : PRIVATE;
  const [ticked, setTicked] = useState<string[]>(council ? ['signs'] : ['keeper', 'signage']);
  const changeKind = (x: string) => { setKind(x as LetterKind); setTicked(x.startsWith('council') ? ['signs'] : ['keeper', 'signage']); };
  const id = (s: string) => `${idPrefix}-${s}`;
  const letter = useMemo(() => {
    const g = list.filter((x) => ticked.includes(x.id));
    const to = kind === 'second-stage' ? 'To the independent appeals service' : council ? 'To the parking services team of the council' : 'To the parking operator';
    const what = kind === 'council-formal' ? 'I make formal representations against the Notice to Owner' : kind === 'council-informal' ? 'I challenge the Penalty Charge Notice' : kind === 'second-stage' ? 'I appeal against the operator’s rejection of my appeal regarding the parking charge' : 'I appeal against the parking charge';
    const ask = council ? 'I ask you to cancel the penalty charge.' + (kind === 'council-informal' ? ' If you reject this challenge, please confirm that the reduced rate will be offered again.' : '') : kind === 'second-stage' ? 'I ask the assessor to allow the appeal and direct the operator to cancel the charge.' : 'I ask you to cancel the charge. If you reject this appeal, please send the code I need to appeal to the independent appeals service.';
    return [
      to, '',
      `Reference: ${ref || '[notice number]'}`, `Vehicle: ${vrm || '[registration]'}`, `Date of the notice: ${dateL(date)}`, `Location: ${place || '[car park or street]'}`, '',
      `${what} for the following reason${g.length > 1 ? 's' : ''}.`, '',
      ...(g.length ? g.map((x, i) => `${i + 1}. ${x.text}`) : ['[Tick at least one reason]']), '',
      ask, '',
      'I have kept a copy of this letter and of the evidence.', '',
      name || '[your name]',
    ].join('\n');
  }, [kind, ref, vrm, date, place, name, ticked, list, council]);
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(letter); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); } };
  const text = (k: string, label: string, v: string, set: (s: string) => void, ph: string) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={id(k)} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={id(k)} type="text" value={v} placeholder={ph} onChange={(e) => set(e.target.value.slice(0, 80))} className={inputCls} autoComplete="off" /><span /></div>
  );
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-letter>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('kind')} label="Letter for" value={kind} onChange={changeKind} options={KINDS} />
          <DateField id={id('date')} label="Date on the notice" value={date} onChange={setDate} />
          <fieldset className="sm:col-span-2">
            <legend className="mb-1 text-sm font-medium text-navy-700">Your reasons (tick all that apply)</legend>
            <div className="grid gap-1.5">
              {list.map((x) => (
                <label key={x.id} className="flex items-start gap-2 text-sm text-navy-800">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-accent-600" checked={ticked.includes(x.id)} onChange={(e) => setTicked((o) => (e.target.checked ? [...o, x.id] : o.filter((y) => y !== x.id)))} />
                  <span>{x.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {text('ref', 'Notice number (optional)', ref, setRef, 'e.g. AB12345678')}
          {text('vrm', 'Registration (optional)', vrm, setVrm, 'e.g. AB12 CDE')}
          {text('place', 'Street or car park (optional)', place, setPlace, 'e.g. Station Road car park')}
          {text('name', 'Your name (optional)', name, setName, 'Name to sign with')}
          <p className="text-xs text-navy-600 sm:col-span-2">{PRIVACY} A drafting aid, not legal advice.</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">Your letter, ready to copy</p>
          <textarea readOnly value={letter} aria-label="Appeal letter" className="mt-2 h-80 w-full resize-y rounded-lg border border-navy-200 bg-white p-3 font-mono text-xs leading-relaxed text-navy-900" />
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={copy} className="h-10 rounded-lg bg-accent-600 px-4 text-sm font-medium text-white hover:bg-accent-700">{copied ? 'Copied' : 'Copy the letter'}</button>
            <button type="button" onClick={() => window.print()} className="h-10 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-white">Print</button>
          </div>
          <p className="mt-2 text-xs text-navy-600">Send it through the channel printed on the notice (online form, email or post) and keep proof of the date you sent it.</p>
        </div>
      </div>
    </div>
  );
}
