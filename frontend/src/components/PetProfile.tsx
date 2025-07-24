import { FaWhatsapp } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useT } from '../hooks/useT';
import { Pet } from '../types/Pet';
import styles from '../styles/PetProfile.module.scss';

interface Props {
  pet: Pet;
}

export default function PetProfile({ pet }: Props) {
  const t = useT();

  return (
    <div className={styles.wrapper}>
      {/* floating sprinkles */}
      <div className={styles.sprinkles}>
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i} className={styles.sprinkle} />
        ))}
      </div>

      {/* main card */}
      <div className={styles.card}>
        {/* language switcher */}
        <div className={styles.langBtn}>
          <LanguageSwitcher />
        </div>

        {/* avatar */}
        <img src={pet.image} alt={pet.name} className={styles.avatar} />

        {/* name */}
        <h1 className={styles.name}>🐶 {pet.name}</h1>

        {/* glass info box */}
        <div className={styles.infoBox}>
          <p className={styles.text}>
            <strong>{t('pet.age')}:</strong> {pet.age}
          </p>
          <p className={styles.text}>
            <strong>{t('pet.breed')}:</strong> {pet.breed}
          </p>
          <p className={styles.text}>
            <strong>{t('pet.color')}:</strong> {pet.color}
          </p>
          <p className={styles.text}>
            <strong>{t('pet.allergies')}:</strong> {pet.allergies}
          </p>
          <p className={styles.text}>
            <strong>{t('pet.medication')}:</strong> {pet.medication}
          </p>

          {/* personality */}
          <p className={styles.personalityLabel}>🧠 {t('pet.personality')}:</p>
          <ul className={styles.badges}>
            {pet.personality.split(',').map((trait, i) => (
              <li
                key={trait.trim()}
                className={styles.badge}
                style={{ '--i': i } as React.CSSProperties}
              >
                {trait.trim()}
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <p className={styles.contact}>
          <FaWhatsapp size={20} color="#25d366" />
          <a
            href={`https://wa.me/${pet.contact}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            {t('pet.whatsapp')}
          </a>
        </p>

        {/* note */}
        {pet.notes && <p className={styles.notes}>{pet.notes}</p>}
      </div>
    </div>
  );
}
