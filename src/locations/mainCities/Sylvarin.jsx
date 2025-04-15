import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './Sylvarin.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal'; // ✅ Riktig path

const Sylvarin = () => {
  // 🔊 Lydreferanse
  const audioRef = useRef(null);

  // 📦 UI State
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isTravelOpen, setTravelOpen] = useState(false); // ✨ NYTT

  // 🧍 Spillerdata
  const nickname = localStorage.getItem('playerNickname');
  const health = localStorage.getItem('playerHealth');
  const stamina = localStorage.getItem('playerStamina');
  const coins = localStorage.getItem('playerCoins');
  const items = JSON.parse(localStorage.getItem('playerInventory')) || {};

  // 🎵 Spille bakgrunnsmusikk
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

  // 🧭 Håndter modaler
  const handleMarketOpen = () => setMarketOpen(true);
  const handleMarketClose = () => setMarketOpen(false);
  const handleInventoryToggle = () => setInventoryOpen(!isInventoryOpen);
  const handleTravelOpen = () => setTravelOpen(true);         // ✨ NY
  const handleTravelClose = () => setTravelOpen(false);       // ✨ NY

  return (
    <>
      {/* 🎵 Musikk */}
      <audio ref={audioRef} loop>
        <source src="/sounds/elarin-city.mp3" type="audio/mpeg" />
      </audio>

      {/* 🧍 HUD */}
      <GameHUD
        playerName={nickname}
        coins={coins}
        health={health}
        stamina={stamina}
        onInventoryToggle={handleInventoryToggle}
      />

      {/* 🏞️ Byvisning */}
      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/Sylvarin3.png"
      >
        {/* 🏙️ Byheader */}
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Sylvarin</h1>
          <p className={styles.cityDescription}>
            Beneath the canopies of Sundara, Sylvarin blossoms in harmony with the forest.
            Here, song, spirit, and sunlight are one.
          </p>
        </div>

        {/* 🛒 Markedsknapp */}
        <div
          className={styles.marketHotspot}
          onClick={handleMarketOpen}
          title="Enter Market"
        >
          Enter Market
        </div>

        {/* 🧭 Reiseknapp */}
        <div
          className={styles.travelHotspot}
          onClick={handleTravelOpen}
          title="Begin Journey"
        >
          Begin Journey
        </div>

        {/* 📦 Modalene */}
        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}
        {isMarketOpen && (
          <MarketModal city="Sylvarin" onClose={handleMarketClose} />
        )}
        {isTravelOpen && (
          <TravelModal city="Sylvarin" onClose={handleTravelClose} />
        )}
      </CityLayout>
    </>
  );
};

export default Sylvarin;
