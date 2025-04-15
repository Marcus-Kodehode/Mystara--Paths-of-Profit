import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './NymRasha.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';

const NymRasha = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isTravelOpen, setTravelOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const nickname = localStorage.getItem('playerNickname');
  const health = localStorage.getItem('playerHealth');
  const stamina = localStorage.getItem('playerStamina');
  const coins = localStorage.getItem('playerCoins');
  const items = JSON.parse(localStorage.getItem('playerInventory')) || {};

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(err => console.warn('Autoplay failed:', err));
    }

    const hasVisited = localStorage.getItem('visitedNymRasha');
    if (!hasVisited) {
      setShowIntro(true);
      localStorage.setItem('visitedNymRasha', 'true');
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sounds/felarii-city.mp3" type="audio/mpeg" />
      </audio>

      <GameHUD
        playerName={nickname}
        coins={coins}
        health={health}
        stamina={stamina}
        onInventoryToggle={() => setInventoryOpen(!isInventoryOpen)}
      />

      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/Nym-Rasha2.png"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Nym'Rasha</h1>
          <p className={styles.cityDescription}>
            A mystical desert city with ancient secrets.
          </p>
        </div>

        <div
          className={styles.marketHotspot}
          onClick={() => setMarketOpen(true)}
          title="Enter Market"
        >
          Enter Market
        </div>

        <div
          className={styles.travelHotspot}
          onClick={() => setTravelOpen(true)}
          title="Begin Journey"
        >
          Begin Journey
        </div>

        {isMarketOpen && (
          <MarketModal city="NymRasha" onClose={() => setMarketOpen(false)} />
        )}

        {isInventoryOpen && (
          <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />
        )}

        {isTravelOpen && (
          <TravelModal
            city="NymRasha"
            onClose={() => setTravelOpen(false)}
            onTravel={(path) => navigate(path)}
          />
        )}

        {showIntro && (
          <div className={styles.introModal}>
            <div className={styles.introContent}>
            <h2>Welcome to Nym'Rasha</h2>
<p>
  Shrouded in whispers and sand, Nym'Rasha is a city of illusion and echoes. It stands where the jungle fades into red stone, its walls carved with runes older than kings. The Felarii say it listens — and remembers. Magic runs through its roots, old magic, wild and watching. Travelers here speak in hushed tones, for the city knows its own secrets... and protects them.
</p>

              <button className={styles.closeButton} onClick={() => setShowIntro(false)}>
                Continue
              </button>
            </div>
          </div>
        )}
      </CityLayout>
    </>
  );
};

export default NymRasha;
