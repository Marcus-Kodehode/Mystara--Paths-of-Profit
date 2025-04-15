// src/locations/lesserLocations/IrvathGlade.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './IrvathGlade.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';

const IrvathGlade = () => {
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
      audio.play().catch((err) => console.warn('Autoplay failed:', err));
    }

    const hasVisited = localStorage.getItem('visitedIrvathGlade');
    if (!hasVisited) {
      setShowIntro(true);
      localStorage.setItem('visitedIrvathGlade', 'true');
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const handleMarketOpen = () => setMarketOpen(true);
  const handleMarketClose = () => setMarketOpen(false);
  const handleInventoryToggle = () => setInventoryOpen(!isInventoryOpen);
  const handleTravelOpen = () => setTravelOpen(true);
  const handleTravelClose = () => setTravelOpen(false);
  const handleTravel = (path) => {
    navigate(path);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sounds/elarin-city.mp3" type="audio/mpeg" />
      </audio>

      <GameHUD
        playerName={nickname}
        coins={coins}
        health={health}
        stamina={stamina}
        onInventoryToggle={handleInventoryToggle}
      />

      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/irvath-glade.webp"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Irvath Glade</h1>
          <p className={styles.cityDescription}>
            A tranquil haven where nature and magic intertwine, hidden deep within ancient woods.
          </p>
        </div>

        <div
          className={styles.marketHotspot}
          onClick={handleMarketOpen}
          title="Enter Market"
        >
          Enter Market
        </div>

        <div
          className={styles.travelHotspot}
          onClick={handleTravelOpen}
          title="Begin Journey"
        >
          Begin Journey
        </div>

        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}
        {isMarketOpen && (
          <MarketModal city="IrvathGlade" onClose={handleMarketClose} />
        )}
        {isTravelOpen && (
          <TravelModal
            city="IrvathGlade"
            onClose={handleTravelClose}
            onTravel={handleTravel}
          />
        )}

        {showIntro && (
          <div className={styles.introModal}>
            <div className={styles.introContent}>
              <h2>Welcome to Irvath Glade</h2>
              <p>
                The glade whispers tales of old, where every leaf and breeze carries the essence of ancient magic.
              </p>
              <button
                className={styles.closeButton}
                onClick={() => setShowIntro(false)}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </CityLayout>
    </>
  );
};

export default IrvathGlade;
