import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import LanguageSwitcher from '../components/LanguageSwitcher';


interface Props {
    pets: Pet[];
}

export default function Home({ pets }: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sprinkles}>
                {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} className={styles.sprinkle}></span>
                ))}
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>🐾 Mis Mascotas 🐾</h1>
                <p className={styles.subtitle}>
                    📍Hice esta aplicación con tecnología QR para que cada una de mis mascotas tenga su propia credencial digital. Al escanear el código que llevan en su chapita del collar, se accede a su perfil con información útil para que, si alguna vez se pierden, puedan contactarme y ayudarlos a volver a casa. 💜
                </p>


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
                                <p className={styles.qrNote}>📲 Escaneame si me perdí</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:3002/pets');
    const pets = await res.json();

    return {
        props: {
            pets,
        },
    };
};
