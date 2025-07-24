// src/pages/index.tsx
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useT } from '../hooks/useT';
import { Pet } from '../types/Pet';
import styles from '../styles/Home.module.scss';

interface Props {
  pets: Pet[];
  baseUrl: string;
}

const Home: NextPage<Props> = ({ pets, baseUrl }) => {
  const t = useT();

  return (
    <div className={styles.wrapper}>
      <div className={styles.sprinkles}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className={styles.sprinkle}></span>
        ))}
      </div>

      <div className={styles.container}>
        <LanguageSwitcher />

        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.subtitle}>{t('home.description')}</p>

        <div className={styles.grid}>
          {pets.map((pet) => (
            <div key={pet.id} className={styles.card}>
              <Link href={`/${pet.id}`} className={styles.cardLink}>
                <img
                  src={pet.image}
                  alt={pet.name}
                  className={styles.cardImage}
                />
                <h2 className={styles.cardTitle}>{pet.name}</h2>
              </Link>

              <div className={styles.qrSection}>
                <QRCode value={`${baseUrl}/${pet.id}`} size={120} />
                <p className={styles.qrNote}>{t('home.qrNote')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const lang = ctx.req.cookies.lang === 'en' ? 'en' : 'es';

  // Detectá el host para armar el QR (o usa env var)
  const host =
    ctx.req.headers['x-forwarded-host'] ||
    ctx.req.headers.host ||
    'localhost:3000';
  const protocol =
    (ctx.req.headers['x-forwarded-proto'] as string) || 'http';
  const baseUrl = `${protocol}://${host}`;

  const apiBase =
    process.env.API_URL || 'http://localhost:3002';

  const res = await fetch(`${apiBase}/pets?lang=${lang}`);
  const pets = await res.json();

  return { props: { pets, baseUrl } };
};

export default Home;
