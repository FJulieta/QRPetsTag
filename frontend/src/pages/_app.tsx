// src/pages/_app.tsx
import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'cookie';

import { I18nProvider } from '../context/I18nContext';
import RouteLoader from '../components/RouteLoader';
import '../styles/global.scss';

export default function MyApp({
  Component,
  pageProps,
}: AppProps & { pageProps: { initialLang: 'es' | 'en' } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* -------- loader de patitas -------- */
  useEffect(() => {
    let start = 0;
    const handleStart = () => { start = Date.now(); setLoading(true); };
    const handleEnd   = () => {
      const min = 800;
      const elapsed = Date.now() - start;
      if (elapsed < min) setTimeout(() => setLoading(false), min - elapsed);
      else setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError', handleEnd);
    return () => {
      router.events.off('routeChangeStart',  handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError',   handleEnd);
    };
  }, [router]);

  return (
    <I18nProvider initialLocale={pageProps.initialLang}>
      {loading && <RouteLoader />}
      <Component {...pageProps} />
    </I18nProvider>
  );
}

/* -------- Lee la cookie lang en SSR -------- */
MyApp.getInitialProps = async (appCtx: AppContext) => {
  // primero deja que Next resuelva los pageProps normales
  const appProps = await App.getInitialProps(appCtx);

  // parseamos la cabecera cookie del request
  const rawCookie = appCtx.ctx.req?.headers.cookie ?? '';
  const parsed    = cookie.parse(rawCookie);

  const initialLang = parsed.lang === 'en' ? 'en' : 'es';

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      initialLang,               // <- se pasa al I18nProvider
    },
  };
};
