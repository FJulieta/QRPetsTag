import { Pet } from '../types/Pet';
import styles from '../styles/PetProfile.module.scss';

export default function PetProfile({ pet }: { pet: Pet }) {
    return (
        <div className={styles.wrapper}>
            {/* 🎉 Fondo decorativo con chispitas flotantes */}
            <div className={styles.sprinkles}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <span key={i} className={styles.sprinkle}></span>
                ))}
            </div>

            {/* 🐾 Tarjeta de perfil de mascota */}
            <div className={styles.card}>
                <img src={pet.image} alt={pet.name} className={styles.avatar} />

                <h1 className={styles.name}>🐶 {pet.name}</h1>
                <div className={styles.divider}></div>

                <p className={styles.text}><strong>Edad:</strong> {pet.age}</p>
                <p className={styles.text}><strong>Raza:</strong> {pet.breed}</p>
                <p className={styles.text}><strong>Color:</strong> {pet.color}</p>
                <p className={styles.text}><strong>Alergias:</strong> {pet.alergies}</p>
                <p className={styles.text}><strong>Medicación:</strong> {pet.medication}</p>
                <p className={styles.text}><strong>Personalidad:</strong></p>
                <div className={styles.badges}>
                    {pet.personality.split(',').map((trait) => (
                        <span key={trait.trim()} className={styles.badge}>
                            {trait.trim()}
                        </span>
                    ))}
                </div>

                <p className={styles.text}>
                    <strong>Contacto:</strong>{' '}
                    <a href={`https://wa.me/${pet.contact}`} target="_blank" rel="noreferrer">
                        WhatsApp
                    </a>
                </p>

                {pet.notes && <p className={styles.notes}>{pet.notes}</p>}
            </div>
        </div>
    );
}
