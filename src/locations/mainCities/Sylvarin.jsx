// src/locations/mainCities/Sylvarin.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './Sylvarin.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';

const Sylvarin = () => {
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

    const hasVisited = localStorage.getItem('visitedSylvarin');
    if (!hasVisited) {
      setShowIntro(true);
      localStorage.setItem('visitedSylvarin', 'true');
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
        <source src="/sounds/sylvarin-theme.mp3" type="audio/mpeg" />
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
        backgroundImage="/images/Sylvarin3.png"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Sylvarin</h1>
          <p className={styles.cityDescription}>
            Among the whispering trees and glowing flora, Sylvarin stands as a beacon of harmony between nature and magic.
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

        {isMarketOpen && (
          <MarketModal city="Sylvarin" onClose={handleMarketClose} />
        )}

        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}

        {isTravelOpen && (
          <TravelModal
            city="Sylvarin"
            onClose={handleTravelClose}
            onTravel={handleTravel}
          />
        )}

        {showIntro && (
          <div className={styles.introModal}>
            <div className={styles.introContent}>
              <h2>Welcome to Sylvarin</h2>
              <p>
                Nestled within the heart of the ancient forest, Sylvarin is a sanctuary where elves and mystical creatures coexist, preserving the balance of nature and arcane arts.
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

export default Sylvarin;
