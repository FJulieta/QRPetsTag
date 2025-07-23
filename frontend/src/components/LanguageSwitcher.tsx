import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;

  const toggleLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.push(asPath, asPath, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        margin: '1rem auto',
        display: 'block',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        backgroundColor: '#eee',
        cursor: 'pointer',
      }}
    >
      {locale === 'es' ? '🇺🇸 Switch to English' : '🇦🇷 Cambiar a Español'}
    </button>
  );
}
