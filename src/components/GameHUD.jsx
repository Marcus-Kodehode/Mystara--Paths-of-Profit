// src/components/GameHUD.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameHUD.module.css';

function GameHUD({ playerName, onInventoryToggle }) {
  const navigate = useNavigate();

  // LES fra localStorage én gang initielt
  const [health,  setHealth]  = useState(() => Number(localStorage.getItem('playerHealth')));
  const [stamina, setStamina] = useState(() => Number(localStorage.getItem('playerStamina')));
  const [coins,   setCoins]   = useState(() => Number(localStorage.getItem('playerCoins')));

  useEffect(() => {
    function refreshStats() {
      setHealth( Number(localStorage.getItem('playerHealth')) );
      setStamina( Number(localStorage.getItem('playerStamina')) );
      setCoins(   Number(localStorage.getItem('playerCoins')) );
    }

    // Når vår util oppdaterer stats i localStorage, sender den 'statsChanged'
    window.addEventListener('statsChanged', refreshStats);

    return () => {
      window.removeEventListener('statsChanged', refreshStats);
    };
  }, []);

  const handleRestart = () => {
    localStorage.clear();
    navigate('/'); // eller '/start'
  };

  return (
    <>
      <div className={styles.hud}>
        <div className={styles.left}>
          <div className={styles.stat}>❤️ {health} / 100</div>
          <div className={styles.stat}>⚡ {stamina} / 100</div>
          <div className={styles.stat}>💰 {coins}</div>
        </div>
        <div className={styles.right}>
          <span className={styles.player}>Trader: {playerName}</span>
          <button
            className={styles.inventoryBtn}
            onClick={onInventoryToggle}
          >
            Inventory
          </button>
        </div>
      </div>

      <button
        className={styles.restartButton}
        onClick={handleRestart}
      >
        Restart Game
      </button>
    </>
  );
}

export default GameHUD;
