import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';
export type Translations = typeof en;

export const messages: Record<Locale, Translations> = { en, es };
