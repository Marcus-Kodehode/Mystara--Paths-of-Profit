import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './NymRasha.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';

const NymRasha= () => {
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
        <source src="/sounds/felarii-city.mp3" type="audio/mpeg" />
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
        backgroundImage="/images/Nym-Rasha2.png"
      >
<div className={styles.cityHeader}>
  <h1 className={styles.cityName}>Nym’Rasha</h1>
  <p className={styles.cityDescription}>
    Shrouded in the mists of Verdanthollow, Nym’Rasha breathes with ancient spirits. The Felarii move like shadows—silent, swift, and ever watchful.
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
          <MarketModal city="NymRasha" onClose={handleMarketClose} />
        )}
      </CityLayout>
    </>
  );
};

export default NymRasha;
