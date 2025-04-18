// src/components/GameOver.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameOver.module.css';

const GameOver = () => {
  const navigate = useNavigate();

  function handleRestart() {
    // Tilbakestill alt (kan tilpasses mer)
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.title}>Game Over</h1>
        <p className={styles.message}>Your journey has ended.</p>
        <button className={styles.button} onClick={handleRestart}>
          Return to Start
        </button>
      </div>
    </div>
  );
};

export default GameOver;
