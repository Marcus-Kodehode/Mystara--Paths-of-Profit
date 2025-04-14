import { useNavigate } from 'react-router-dom';
import styles from './StartScreen.module.css';

function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/select-race');
  };

  return (
    <div className={styles.container}>
      <div className={styles.coinsContainer}>
        {[...Array(25)].map((_, i) => (
          <img
            key={`set1-${i}`}
            src="/images/coin.png"
            alt="coin"
            className={styles.coin}
            style={{
              top: '100%',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {[...Array(25)].map((_, i) => (
          <img
            key={`set2-${i}`}
            src="/images/coin.png"
            alt="coin"
            className={styles.coin}
            style={{
              top: '100%',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.overlay}>
        <h1 className={`${styles.title} ${styles.fadeIn}`}>Mystara: Paths of Profit</h1>
        <button className={styles.startButton} onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
