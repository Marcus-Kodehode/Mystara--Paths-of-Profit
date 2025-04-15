import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './NymRasha.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal'; // ✅ Riktig import

const NymRasha = () => {
  // 🔊 Lyd
  const audioRef = useRef(null);

  // 📦 State
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isTravelOpen, setTravelOpen] = useState(false); // ✨ NYTT

  // 🧍‍♂️ Spillerdata
  const nickname = localStorage.getItem('playerNickname');
  const health = localStorage.getItem('playerHealth');
  const stamina = localStorage.getItem('playerStamina');
  const coins = localStorage.getItem('playerCoins');
  const items = JSON.parse(localStorage.getItem('playerInventory')) || {};

  // 🔁 Spill musikk ved last
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

  // 📦 Modal-håndtering
  const handleMarketOpen = () => setMarketOpen(true);
  const handleMarketClose = () => setMarketOpen(false);
  const handleInventoryToggle = () => setInventoryOpen(!isInventoryOpen);
  const handleTravelOpen = () => setTravelOpen(true);        // ✨ NY
  const handleTravelClose = () => setTravelOpen(false);      // ✨ NY

  return (
    <>
      {/* 🎵 Musikk */}
      <audio ref={audioRef} loop>
        <source src="/sounds/felarii-city.mp3" type="audio/mpeg" />
      </audio>

      {/* 🧍 HUD */}
      <GameHUD
        playerName={nickname}
        coins={coins}
        health={health}
        stamina={stamina}
        onInventoryToggle={handleInventoryToggle}
      />

      {/* 🏙️ By-layout */}
      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/Nym-Rasha2.png"
      >
        {/* 📍 Bybeskrivelse */}
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Nym’Rasha</h1>
          <p className={styles.cityDescription}>
            Shrouded in the mists of Verdanthollow, Nym’Rasha breathes with ancient spirits.
            The Felarii move like shadows—silent, swift, and ever watchful.
          </p>
        </div>

        {/* 🛒 Market-knapp */}
        <div
          className={styles.marketHotspot}
          onClick={handleMarketOpen}
          title="Enter Market"
        >
          Enter Market
        </div>

        {/* ✨ Reise-knapp */}
        <div
          className={styles.travelHotspot}
          onClick={handleTravelOpen}
          title="Begin Journey"
        >
          Begin Journey
        </div>

        {/* 📦 Modaler */}
        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}

        {isMarketOpen && (
          <MarketModal city="NymRasha" onClose={handleMarketClose} />
        )}

        {isTravelOpen && (
          <TravelModal city="NymRasha" onClose={handleTravelClose} />
        )}
      </CityLayout>
    </>
  );
};

export default NymRasha;
