import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './Thalmoor.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';

const Thalmoor = () => {
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

  const handleMarketOpen = () => setMarketOpen(true);
  const handleMarketClose = () => setMarketOpen(false);
  const handleInventoryToggle = () => setInventoryOpen(!isInventoryOpen);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/sounds/kavari-city.mp3" type="audio/mpeg" />
      </audio>

      {/* Plasser GameHUD utenfor CityLayout for korrekt posisjonering */}
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
        backgroundImage="/images/Thalmoor3.png"
      >
        {/* Byens tittel og beskrivelse */}
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Thalmoor</h1>
          <p className={styles.cityDescription}>
            The desert jewel of the Kavari—a place where coins speak louder than swords.
          </p>
        </div>

        {/* Marked-hotspot */}
        <div
          className={styles.marketHotspot}
          onClick={handleMarketOpen}
          title="Enter Market"
        >
          Enter Market
        </div>

        {/* Inventory modal */}
        {isInventoryOpen && (
          <InventoryModal items={items} onClose={handleInventoryToggle} />
        )}

        {/* Market modal */}
        {isMarketOpen && <MarketModal city="Thalmoor" onClose={handleMarketClose} />}
      </CityLayout>
    </>
  );
};

export default Thalmoor;
