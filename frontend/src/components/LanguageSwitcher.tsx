// src/components/LanguageSwitcher.tsx
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useI18n } from '../context/I18nContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const router = useRouter();

  const toggle = async () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    setLocale(newLocale);                           // mueve thumb + contexto
    Cookies.set('lang', newLocale, { expires: 365, sameSite: 'lax' }); // SSR
    await router.replace(router.asPath, undefined, { scroll: false }); // no reload
  };

  return (
    <button
      className="lang-switch"
      onClick={toggle}
      aria-label="Toggle language"
    >
      <span className="lang-switch__thumb" data-lang={locale}>
        {locale === 'es' ? '🇦🇷' : '🇺🇸'}
      </span>
      <span className="lang-switch__label lang-switch__label--es">ES</span>
      <span className="lang-switch__label lang-switch__label--en">EN</span>
      <span className="lang-switch__paw">🐾</span>
    </button>
  );
}
