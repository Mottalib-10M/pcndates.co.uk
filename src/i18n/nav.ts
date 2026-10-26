import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Which ticket have I got?', method: 'Method', about: 'About', widget: 'Embed a tool', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
const GROUP_LABEL: Record<Group, string> = { ticket: 'Your ticket', private: 'Private parking', council: 'Council PCN', appeal: 'Appeals and court', places: 'Places and nations' };
export const GROUPS_ORDER: Group[] = ['ticket', 'private', 'council', 'appeal', 'places'];
export const groupLabel = (g: Group, _lang: Locale = 'en') => GROUP_LABEL[g];
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? pageById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS_ORDER.map((g) => ({ label: GROUP_LABEL[g], links: g === 'ticket' ? [link('home', lang), ...inGroup(g, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: 'This site', links: ['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
