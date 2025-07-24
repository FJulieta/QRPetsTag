import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { messages, type Locale } from '../i18n/index';

type Ctx = {
  locale: Locale;
  t: (path: string) => string;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<Ctx | undefined>(undefined);

const STORAGE_KEY = 'lang';

const getByPath = (obj: any, path: string): string =>
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj) || '';

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('es');
  const [dict, setDict] = useState(messages.es);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    setDict(messages[l]);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cookieLang = document.cookie.match(/(?:^|; )lang=(en|es)/)?.[1] as Locale | undefined;
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;

    const initial = cookieLang || saved || (navigator.language.startsWith('en') ? 'en' : 'es');
    setLocale(initial);
  }, [setLocale]);

  const t = useCallback((path: string) => getByPath(dict, path), [dict]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
