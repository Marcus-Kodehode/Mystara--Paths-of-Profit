import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './Grumhollow.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';

const Grumhollow = () => {
  const audioRef = useRef(null);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);

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

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const handleMarketOpen = () => {
    setMarketOpen(true);
  };

  const handleMarketClose = () => {
    setMarketOpen(false);
  };

  const handleInventoryToggle = () => {
    setInventoryOpen(!isInventoryOpen);
  };

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
        onInventoryToggle={handleInventoryToggle}
      />

      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/Grumhollow3.png"
      >
<div className={styles.cityHeader}>
  <h1 className={styles.cityName}>Grumhollow</h1>
  <p className={styles.cityDescription}>
    Deep within the Drakthar Peaks, the forges of the Dhurak burn eternal. Steel, stone, and stubborn pride shape every breath of life here.
  </p>
</div>


        {/* Kun én knapp for markedet */}
        <div
          className={styles.marketHotspot}
          onClick={handleMarketOpen}
          title="Enter Market"
        >
          Enter Market
        </div>

        {/* Inventory-knapp fra HUD åpner vanlig InventoryModal */}
        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}

        {/* Åpner begge modalene når man går til markedet */}
        {isMarketOpen && (
          <MarketModal city="Grumhollow" onClose={handleMarketClose} />
        )}
      </CityLayout>
    </>
  );
};

export default Grumhollow;