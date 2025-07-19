import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import QRCode from 'react-qr-code';

interface Props {
    pets: Pet[];
}

export default function Home({ pets }: Props) {
    return (
        <div className={styles.wrapper}>
            {/* 🎉 Fondo decorativo con sprinkles */}
            <div className={styles.sprinkles}>
                {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} className={styles.sprinkle}></span>
                ))}
            </div>

            {/* Contenido principal */}
            <div className={styles.container}>
                <h1 className={styles.title}>🐾 Mis Mascotas 🐾</h1>
                <p className={styles.subtitle}>
                    📍 Escaneá su QR si se pierden, cada uno funciona como una credencial virtual de identificación.
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
