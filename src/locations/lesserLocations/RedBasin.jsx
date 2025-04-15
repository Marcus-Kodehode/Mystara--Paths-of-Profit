import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅
import CityLayout from '../shared/CityLayout';
import styles from './RedBasin.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';

const RedBasin = () => {
  const audioRef = useRef(null);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isTravelOpen, setTravelOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const navigate = useNavigate(); // ✅

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

    const hasVisited = localStorage.getItem('visitedRedBasin');
    if (!hasVisited) {
      setShowIntro(true);
      localStorage.setItem('visitedRedBasin', 'true');
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sounds/kavari-city.mp3" type="audio/mpeg" />
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
        backgroundImage="/images/red-basin.webp"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Red Basin</h1>
          <p className={styles.cityDescription}>
            A sun-scorched basin dotted with caves and ancient bones. Traders whisper of lost tombs beneath the crimson sands.
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
          <MarketModal city="RedBasin" onClose={() => setMarketOpen(false)} />
        )}

        {isInventoryOpen && (
          <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />
        )}

        {isTravelOpen && (
          <TravelModal
            city="RedBasin"
            onClose={() => setTravelOpen(false)}
            onTravel={(path) => navigate(path)} // ✅ Denne trengs
          />
        )}

        {showIntro && (
          <div className={styles.introModal}>
            <div className={styles.introContent}>
              <h2>Welcome to Red Basin</h2>
              <p>
                Beneath the blazing sun and blood-colored dunes lies Red Basin — once a thriving oasis, now home to nomads, relic hunters, and whispers of buried cities. 
                Sandstorms can uncover fortune… or death.
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

export default RedBasin;
