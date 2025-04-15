import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './Runebreak.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';

const Runebreak = () => {
  const audioRef = useRef(null);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isTravelOpen, setTravelOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const navigate = useNavigate();

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

    const hasVisited = localStorage.getItem('visitedRunebreak');
    if (!hasVisited) {
      setShowIntro(true);
      localStorage.setItem('visitedRunebreak', 'true');
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sounds/dhurak-city.mp3" type="audio/mpeg" />
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
        backgroundImage="/images/runebreak.webp"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Runebreak</h1>
          <p className={styles.cityDescription}>
            Cracked paths and ancient ruins lie ahead. Dwarves say the stones still hum with forgotten power.
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
          <MarketModal city="Runebreak" onClose={() => setMarketOpen(false)} />
        )}

        {isInventoryOpen && (
          <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />
        )}

        {isTravelOpen && (
          <TravelModal
            city="Runebreak"
            onClose={() => setTravelOpen(false)}
            onTravel={(path) => navigate(path)}
          />
        )}

        {showIntro && (
          <div className={styles.introModal}>
            <div className={styles.introContent}>
              <h2>Welcome to Runebreak</h2>
              <p>
                Once carved by dwarves and claimed by storms, Runebreak stands as a fractured trail into the ancient past. Beware the hidden glyphs and broken stone guardians.
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

export default Runebreak;
