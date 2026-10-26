# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Model: `parking-charge-notice.ts`. The page is built at
`/en/<en.slug>/`; menus, footer, home lists and sitemap follow by themselves. English only (en-GB).

## Fields

- `group`: `ticket`, `private`, `council`, `appeal` or `places`; `order`: position in its group.
- `tool`: the main tool, shown right under the H1 (first screen, RECETTE §5):
  - `{ kind: 'ticket', props?: { issuer: 'council'|'tfl'|'private'|'police', nation } }` (which ticket have I got)
  - `{ kind: 'countdown', props?: { mode: 'council'|'private', area, service: 'windscreen'|'post', nation } }`
  - `{ kind: 'letter', props?: { kind: 'council-informal'|'council-formal'|'private'|'second-stage' } }`
  - `{ kind: 'mini:<spec>' }`, specs in `src/lib/mini-specs.ts` (`MINI_KINDS`), always computed by `src/lib/engine/parking.ts`.
- `mini`: a second tool under the citable block (same kinds).
- In a body, `<!--tool:mini:popla-->` or `<!--tool:countdown|{"mode":"private"}-->` places a tool between paragraphs.
- `related`: 3–5 page ids. `sources`: keys of `src/data/params-2026.json` → `sources`.
- `demarche: true` on pages about paying, appealing or court: adds the "independent site" line under the H1.

## Text rules (checked by `npx vitest run tests/pages.test.ts`, then `npm run check`)

- `title` 50–60 characters, key term first ("Parking Charge Notice: …"), never "How…", "What…", "UK…", a nation or London first.
- `description` 150–160 characters.
- `resume(h)`: ONE paragraph (no tags but links) of at least 120 words answering the page's query with figures.
- `faqs(h)`: 3–5 questions unique across the site, each answer 42–88 words, plain text.
- `body(h)`: HTML with at least three `<h2>` sections; resume + body at least 650 words. No `<h1>`.
- No em dash; British spelling; dates in words ("20 October 2026"); coming rules written as coming, with their date.
- Pages must read differently (check-unique): no shared boilerplate paragraph.
- Links only to official sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a claims company,
  law firm, operator or forum; never mention a search engine or another site.
- Never present the site as a council, operator, appeals service or adviser; letters are drafting aids.

## Figures

Never type an amount or a number of days: read them through `h` (`src/lib/helpers.ts`): `h.E` (England outside
London, SI 2022/71), `h.L` (London and TfL), `h.W` (Wales), `h.S` (Scotland), `h.NI`, `h.CODE` (Private Parking Code),
`h.POFA` (Schedule 4), `h.POPLA`, `h.C` (court), `h.ENF` (enforcement fees), `h.NHS`, `h.code` (earliest in-force
date), `h.amounts(area, opts)`, `h.gbp(n)`, `h.date(iso)`, `h.table(headers, rows, caption, align)`.
A fact that is not in an official text is not written.

## Data

- `src/data/params-2026.json`: rules, amounts and bank holidays read on the official texts (date in `retrieved_at`),
  checked monthly by `scripts/update-data.py` (workflow `.github/workflows/update-data.yml`, exit code 2 on a change).
