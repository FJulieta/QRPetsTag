import { Pet } from '../types/Pet';
import styles from '../styles/PetProfile.module.scss';
import { useT } from '../hooks/useT';
import LanguageSwitcher from './LanguageSwitcher';

export default function PetProfile({ pet }: { pet: Pet }) {
    const t = useT();

    return (
        <div className={styles.wrapper}>
            <div className={styles.sprinkles}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <span key={i} className={styles.sprinkle}></span>
                ))}
            </div>

            <div className={styles.card}>
                <div className={styles.langBtn}>
                    <LanguageSwitcher />
                </div>
                <img src={pet.image} alt={pet.name} className={styles.avatar} />

                <h1 className={styles.name}>🐶 {pet.name}</h1>
                <div className={styles.divider}></div>

                <p className={styles.text}><strong>{t('pet.age')}:</strong> {pet.age}</p>
                <p className={styles.text}><strong>{t('pet.breed')}:</strong> {pet.breed}</p>
                <p className={styles.text}><strong>{t('pet.color')}:</strong> {pet.color}</p>
                <p className={styles.text}><strong>{t('pet.allergies')}:</strong> {pet.allergies}</p>
                <p className={styles.text}><strong>{t('pet.medication')}:</strong> {pet.medication}</p>
                <p className={styles.text}>
                    <strong>{t('pet.contact')}:</strong>{' '}
                    <a href={`https://wa.me/${pet.contact}`} target="_blank" rel="noreferrer">
                        {t('pet.whatsapp')}
                    </a>
                </p>

                <p className={styles.text}><strong>{t('pet.personality')}:</strong></p>

                <div className={styles.badges}>
                    {pet.personality.split(',').map((trait) => (
                        <span key={trait.trim()} className={styles.badge}>
                            {trait.trim()}
                        </span>
                    ))}
                </div>

                {pet.notes && <p className={styles.notes}>{pet.notes}</p>}
            </div>
        </div>
    );
}
