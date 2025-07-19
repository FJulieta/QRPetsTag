import { Pet } from '../types/Pet';
import styles from '../styles/PetProfile.module.scss';

export default function PetProfile({ pet }: { pet: Pet }) {
    return (
        <div className={styles.card}>
            <img src={pet.image} alt={pet.name} className={styles.avatar} />
            <h1 className={styles.title}>{pet.name}</h1>
            <p className={styles.text}><strong>Edad:</strong> {pet.age}</p>
            <p className={styles.text}><strong>Raza:</strong> {pet.breed}</p>
            <p className={styles.text}><strong>Color:</strong> {pet.color}</p>
            <p className={styles.text}><strong>Personalidad:</strong> {pet.personality}</p>
            <p className={styles.text}>
                <strong>Contacto:</strong>{' '}
                <a href={`https://wa.me/${pet.contact}`} target="_blank" rel="noreferrer">
                    WhatsApp
                </a>
            </p>
            {pet.notes && <p className={styles.notes}>{pet.notes}</p>}
        </div>
    );
}
