import type { AppProps } from 'next/app';
import '../styles/global.scss';
import { I18nProvider } from '../context/I18nContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <Component {...pageProps} />
    </I18nProvider>
  );
}
