import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import Cookies from 'js-cookie';
import { messages, type Locale } from '../i18n';

type Ctx = {
  locale: Locale;
  t: (path: string) => string;
  setLocale: (l: Locale) => void;
};

/* --- helpers --- */
const STORAGE_KEY = 'lang';
const I18nContext = createContext<Ctx | undefined>(undefined);

const getByPath = (obj: unknown, path: string): string => {
  return path
    .split('.')
    .reduce<unknown>((acc, key) => {
      if (typeof acc === 'object' && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return '';
    }, obj) as string;
};

/* --- provider --- */
export function I18nProvider({
  children,
  initialLocale = 'es',
}: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dict, setDict] = useState(messages[initialLocale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    setDict(messages[l]);
    localStorage.setItem(STORAGE_KEY, l);
    Cookies.set('lang', l, { expires: 365, sameSite: 'lax' });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = (localStorage.getItem(STORAGE_KEY) as Locale) || (Cookies.get('lang') as Locale);
    if (saved === 'en' || saved === 'es') setLocale(saved);
    else setLocale(navigator.language.startsWith('en') ? 'en' : 'es');
  }, [setLocale]);

  const t = useCallback((path: string) => getByPath(dict, path), [dict]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
