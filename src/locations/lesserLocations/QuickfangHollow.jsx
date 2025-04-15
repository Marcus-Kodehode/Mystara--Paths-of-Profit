import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './QuickfangHollow.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';

const QuickfangHollow = () => {
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
      audio.play().catch(err => console.warn('Autoplay failed:', err));
    }

    const hasVisited = localStorage.getItem('visitedQuickfangHollow');
    if (!hasVisited) {
      setShowIntro(true);
      localStorage.setItem('visitedQuickfangHollow', 'true');
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

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
        onInventoryToggle={() => setInventoryOpen(!isInventoryOpen)}
      />

      <CityLayout
        cityName=""
        description=""
        backgroundImage="/images/quickfang-hollow.webp"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Quickfang Hollow</h1>
          <p className={styles.cityDescription}>
            Hidden in the mists beyond Nym’Rasha lies Quickfang Hollow — a place where beasts outnumber men, and silence is the only warning.
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
          <MarketModal city="QuickfangHollow" onClose={() => setMarketOpen(false)} />
        )}

        {isInventoryOpen && (
          <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />
        )}

        {isTravelOpen && (
          <TravelModal
            city="QuickfangHollow"
            onClose={() => setTravelOpen(false)}
            onTravel={(path) => navigate(path)}
          />
        )}

        {showIntro && (
          <div className={styles.introModal}>
            <div className={styles.introContent}>
              <h2>Welcome to Quickfang Hollow</h2>
              <p>
                Cloaked in thick jungle fog and known only to the Felarii and fools, Quickfang Hollow is a treacherous passage. Its name comes from the predator packs that stalk its narrow paths and the eerie silence that haunts its glades. Those who survive speak of hidden shrines, old curses, and beasts shaped by forgotten magics.
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

export default QuickfangHollow;
