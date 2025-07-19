import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';

interface Props {
    pets: Pet[];
}

export default function Home({ pets }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>🐾 Mis Mascotas 🐾</h1>
            <div className={styles.grid}>
                {pets.map((pet) => (
                    <Link key={pet.id} href={`/${pet.id}`} className={styles.card}>
                        <img src={pet.image} alt={pet.name} className={styles.cardImage} />
                        <h2 className={styles.cardTitle}>{pet.name}</h2>
                        <p className={styles.cardText}>{pet.breed}</p>
                    </Link>
                ))}
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
