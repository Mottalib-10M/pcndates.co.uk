/** Writing helpers handed to every page: links, figures read from params-2026.json, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { codeEarliest, councilAmounts } from './engine/parking';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

/** Every page id of the plan: a link to a planned page that is not written yet renders as text. */
export const PLANNED = [
  'parking-charge-notice', 'penalty-charge-notice', 'pcn-vs-parking-charge-notice', 'private-parking-fine', 'fixed-penalty-notice', 'pcn-fine-amounts', 'pcn-deadlines', 'ignore-parking-charge-notice',
  'notice-to-keeper', 'parking-code-of-practice', 'parking-grace-period', 'anpr-parking-fine', 'wrong-registration-parking-fine', 'parking-fine-not-driver', 'supermarket-parking-fine', 'retail-park-parking-fine', 'hospital-parking-fine', 'hire-car-parking-fine', 'blue-badge-parking-fine', 'residential-parking-charge',
  'notice-to-owner', 'charge-certificate', 'bus-lane-fine', 'moving-traffic-pcn', 'car-towed-clamped', 'parking-fine-bailiffs', 'formal-representations',
  'parking-ticket-appeal', 'appeal-parking-charge-notice', 'appeal-penalty-charge-notice', 'popla-appeal', 'ias-appeal', 'parking-appeal-tribunal', 'parking-fine-debt-collection', 'parking-county-court-claim',
  'london-pcn', 'red-route-pcn', 'scotland-parking-fines', 'wales-parking-fines', 'northern-ireland-parking-fines',
];
export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id)) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const gbp = (n: number) => money(n);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const pc = (x: number, d = 0) => pct(x, 'en', d);
  return {
    lang, a, ext, src, gbp, num, pc, P,
    /** England outside London (SI 2022/71), London, Wales, Scotland, Northern Ireland. */
    E: P.england, L: P.london, W: P.wales, S: P.scotland, NI: P.ni,
    /** Private: Code laid 20 October 2026, PoFA 2012 Sch 4, POPLA. */
    CODE: P.private.code, POFA: P.private.pofa, POPLA: P.private.popla,
    C: P.court, ENF: P.enforcement, NHS: P.nhs,
    code: codeEarliest(),
    amounts: councilAmounts,
    date: (iso: string) => dateL(iso),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
  };
}
export type Helpers = ReturnType<typeof helpers>;
