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

  useEffect(() => {
    let start = 0;
    const handleStart = () => { start = Date.now(); setLoading(true); };
    const handleEnd = () => {
      const min = 800;
      const elapsed = Date.now() - start;
      if (elapsed < min) setTimeout(() => setLoading(false), min - elapsed);
      else setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError', handleEnd);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError', handleEnd);
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
  const appProps = await App.getInitialProps(appCtx);

  let initialLang: 'es' | 'en' = 'es';

  try {
    const rawCookie = appCtx.ctx.req?.headers?.cookie ?? '';
    const parsed = cookie.parse(rawCookie);
    if (parsed.lang === 'en') {
      initialLang = 'en';
    }
  } catch (error) {
  }

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      initialLang,
    },
  };
};
