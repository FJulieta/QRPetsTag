import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useT } from '../hooks/useT';

interface Props {
  pets: Pet[];
}

export default function Home({ pets }: Props) {
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
                <img src={pet.image} alt={pet.name} className={styles.cardImage} />
                <h2 className={styles.cardTitle}>{pet.name}</h2>
                <p className={styles.cardText}>{pet.breed}</p>
              </Link>

              <div className={styles.qrSection}>
                <QRCode value={`http://localhost:3000/${pet.id}`} size={120} />
                <p className={styles.qrNote}>{t('home.qrNote')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const lang = ctx.req.cookies.lang === 'en' ? 'en' : 'es';
  const res = await fetch(`http://localhost:3002/pets?lang=${lang}`);
  const pets = await res.json();

  return { props: { pets } };
};
