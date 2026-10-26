/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free tools to read a UK parking ticket: tells a council or TfL Penalty Charge Notice from a police fixed penalty and a private Parking Charge Notice, counts every deadline (reduced rate, challenge, Notice to Owner, charge certificate, Notice to Keeper under Schedule 4 to the Protection of Freedoms Act 2012, POPLA) with working days and bank holidays, gives the amount due on each date in England, London, Wales, Scotland and Northern Ireland, tracks the Private Parking Code of Practice laid on ${words(params.private.code.laid)}, and drafts appeal letters. Independent site, not a council, operator or appeals service. Tools run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Rules and amounts read on legislation.gov.uk, GOV.UK, nidirect, Transport Scotland, TfL and the appeals services (Open Government Licence v3.0 where applicable), retrieved ${words(params.retrieved_at)}.`,
    '- Bank holidays: GOV.UK bank-holidays.json, 2025 to 2027 (OGL v3.0).',
    '',
    `- [Which parking ticket have I got?](${SITE_URL}${route('home', 'en')}): ticket checker, deadlines, amounts and appeal letter`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
