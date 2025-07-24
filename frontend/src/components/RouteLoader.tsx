import { useEffect, useState } from 'react';
import { FaPaw } from 'react-icons/fa';
import styles from '../styles/RouteLoader.module.scss';

export default function RouteLoader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHide(true), 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`${styles.overlay} ${hide ? styles.hide : ''}`}>
      <div className={styles.paws}>
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>
            <FaPaw size={34} className={styles.pawIcon} />
          </span>
        ))}
      </div>
    </div>
  );
}
