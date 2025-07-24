import { useI18n } from '../context/I18nContext';
import { useRouter } from 'next/router';

function setLangCookie(lang: 'es' | 'en') {
  document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const router = useRouter();

  const toggle = async () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    setLocale(newLocale);         // mueve el thumb
    setLangCookie(newLocale);     // para SSR
    await router.replace(router.asPath, undefined, { scroll: false });
    // sin reload ⇒ una sola animación
  };

  return (
    <button className="lang-switch" onClick={toggle} aria-label="Toggle language">
      <span className="lang-switch__thumb" data-lang={locale}>
        {locale === 'es' ? '🇦🇷' : '🇺🇸'}
      </span>
      <span className="lang-switch__label lang-switch__label--es">ES</span>
      <span className="lang-switch__label lang-switch__label--en">EN</span>
      <span className="lang-switch__paw">🐾</span>
    </button>
  );
}
