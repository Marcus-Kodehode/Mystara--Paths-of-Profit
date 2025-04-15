// src/locations/mainCities/Grumhollow.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ nødvendig for å navigere ved reise
import CityLayout from '../shared/CityLayout';
import styles from './Grumhollow.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';

// 🧭 NYTT – importerer TravelModal
import TravelModal from '../../components/travel/TravelModal';

const Grumhollow = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate(); // 👈 brukes når spiller velger reise

  // 📦 STATE – modaler og UI
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isTravelOpen, setTravelOpen] = useState(false); // 🧭 NYTT – reisevalg modal

  // 📜 HENTER SPILLERDATA
  const nickname = localStorage.getItem('playerNickname');
  const health = localStorage.getItem('playerHealth');
  const stamina = localStorage.getItem('playerStamina');
  const coins = localStorage.getItem('playerCoins');
  const items = JSON.parse(localStorage.getItem('playerInventory')) || {};

  // 🔊 SPILL AV BAKGRUNNSMUSIKK
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch((err) => console.warn('Autoplay failed:', err));
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  // 📦 MODAL-HÅNDTERING
  const handleMarketOpen = () => setMarketOpen(true);
  const handleMarketClose = () => setMarketOpen(false);
  const handleInventoryToggle = () => setInventoryOpen(!isInventoryOpen);

  // 🧭 REISE-HÅNDTERING
  const handleTravelOpen = () => setTravelOpen(true);          // Åpner reisevalg
  const handleTravelClose = () => setTravelOpen(false);        // Lukker modal
  const handleTravel = (path) => {                             // Navigerer ved valg
    setTravelOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* 🎵 MUSIKK */}
      <audio ref={audioRef} loop>
        <source src="/sounds/dhurak-city.mp3" type="audio/mpeg" />
      </audio>

      {/* 🧍 HUD */}
      <GameHUD
        playerName={nickname}
        coins={coins}
        health={health}
        stamina={stamina}
        onInventoryToggle={handleInventoryToggle}
      />

      {/* 🌆 BY-LAYOUT */}
      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/Grumhollow3.png"
      >
        {/* 🏙️ HEADER */}
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Grumhollow</h1>
          <p className={styles.cityDescription}>
            Deep within the Drakthar Peaks lies Grumhollow—a dwarven bastion of stone, steam, and stubborn pride.
          </p>
        </div>

        {/* 🛒 MARKET */}
        <div
          className={styles.marketHotspot}
          onClick={handleMarketOpen}
          title="Enter Market"
        >
          Enter Market
        </div>

        {/* 🧭 TRAVEL (🆕 NY) */}
        <div
          className={styles.travelHotspot}
          onClick={handleTravelOpen}
          title="Travel to another location"
        >
          Begin Journey
        </div>

        {/* MODALS */}
        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}
        {isMarketOpen && (
          <MarketModal city="Grumhollow" onClose={handleMarketClose} />
        )}
        {isTravelOpen && (
          <TravelModal
            city="Grumhollow"
            onClose={handleTravelClose}
            onTravel={handleTravel}
          />
        )}
      </CityLayout>
    </>
  );
};

export default Grumhollow;
