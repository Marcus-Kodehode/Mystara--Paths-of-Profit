import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './QuickfangHollow.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';
import TravelChoiceModal from '../../components/travel/TravelChoiceModal';
import EventModal from '../../components/travel/EventModal';

import travelRoutes from '../../data/travel/travelRoutes';
import safeEvents from '../../data/travel/events/safeEvents';
import riskyBadEvents from '../../data/travel/events/riskyBadEvents';
import riskyGoodEvents from '../../data/travel/events/riskyGoodEvents';

const QuickfangHollow = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [isMarketOpen, setMarketOpen] = useState(false);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [travelOpen, setTravelOpen] = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [showIntro, setShowIntro] = useState(false);

  const nickname = localStorage.getItem('playerNickname');
  const health = Number(localStorage.getItem('playerHealth'));
  const stamina = Number(localStorage.getItem('playerStamina'));
  const coins = Number(localStorage.getItem('playerCoins'));
  const items = JSON.parse(localStorage.getItem('playerInventory')) || {};
  const MAX_HP = 100, MAX_ST = 100;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(err => console.warn('Autoplay failed:', err));
    }

    if (!localStorage.getItem('visitedQuickfangHollow')) {
      setShowIntro(true);
      localStorage.setItem('visitedQuickfangHollow', 'true');
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  function handleRouteSelect(route) {
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  }

  function handleChoice(choice) {
    let pool;
    if (choice === 'safe') {
      pool = safeEvents;
    } else if (choice === 'risky') {
      pool = Math.random() < 0.5 ? riskyGoodEvents : riskyBadEvents;
    } else {
      pool = [{
        title: 'Make Camp',
        description: 'You rest and fully recover health and stamina, but it adds an extra day.',
        healthDelta: MAX_HP - health,
        staminaDelta: MAX_ST - stamina,
        goldDelta: 0,
        dayDelta: 1,
      }];
    }

    const ev = pool[Math.floor(Math.random() * pool.length)];
    setCurrentEvent(ev);
    setChoiceOpen(false);
    setEventOpen(true);
  }

  function handleContinue() {
    const ev = currentEvent;
    const newHP = Math.min(MAX_HP, health + (ev.healthDelta || 0));
    const newST = Math.min(MAX_ST, stamina + (ev.staminaDelta || 0));
    const newCoins = coins + (ev.goldDelta || 0);

    if (newHP <= 0) {
      localStorage.clear();
      navigate('/');
      return;
    }

    localStorage.setItem('playerHealth', String(newHP));
    localStorage.setItem('playerStamina', String(newST));
    localStorage.setItem('playerCoins', String(newCoins));

    const next = daysLeft - 1 + (ev.dayDelta || 0);
    setDaysLeft(next);
    setEventOpen(false);

    if (next > 0) {
      setChoiceOpen(true);
    } else {
      navigate(selectedRoute.path);
    }
  }

  return (
    <>
      <audio ref={audioRef} loop src="/sounds/felarii-city.mp3" />

      <GameHUD
        playerName={nickname}
        coins={coins}
        health={health}
        stamina={stamina}
        onInventoryToggle={() => setInventoryOpen(!isInventoryOpen)}
      />

      {isInventoryOpen && (
        <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />
      )}

      <CityLayout
        cityName="Quickfang Hollow"
        description="Hidden in the mists beyond Nym’Rasha lies Quickfang Hollow — a place where beasts outnumber men, and silence is the only warning."
        backgroundImage="/images/quickfang-hollow.webp"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Quickfang Hollow</h1>
          <p className={styles.cityDescription}>
            Hidden in the mists beyond Nym’Rasha lies Quickfang Hollow — a place where beasts outnumber men, and silence is the only warning.
          </p>
        </div>

        <div className={styles.marketHotspot} onClick={() => setMarketOpen(true)}>
          Enter Market
        </div>
        <div className={styles.travelHotspot} onClick={() => setTravelOpen(true)}>
          Begin Journey
        </div>
      </CityLayout>

      {isMarketOpen && (
        <MarketModal city="QuickfangHollow" onClose={() => setMarketOpen(false)} />
      )}

      {travelOpen && (
        <TravelModal
          city="QuickfangHollow"
          onClose={() => setTravelOpen(false)}
          onTravel={handleRouteSelect}
        />
      )}

      {choiceOpen && selectedRoute && (
        <TravelChoiceModal
          cityName={selectedRoute.name}
          daysLeft={daysLeft}
          health={health}
          stamina={stamina}
          coins={coins}
          items={items}
          isInventoryOpen={isInventoryOpen}
          onInventoryToggle={() => setInventoryOpen(o => !o)}
          onClose={() => setChoiceOpen(false)}
          onChoose={handleChoice}
        />
      )}

      {eventOpen && currentEvent && (
        <EventModal event={currentEvent} onContinue={handleContinue} />
      )}

      {showIntro && (
        <div className={styles.introModal}>
          <div className={styles.introContent}>
            <h2>Welcome to Quickfang Hollow</h2>
            <p>
              Cloaked in thick jungle fog and known only to the Felarii and fools, Quickfang Hollow is a treacherous passage.
              Its name comes from the predator packs that stalk its narrow paths and the eerie silence that haunts its glades.
              Those who survive speak of hidden shrines, old curses, and beasts shaped by forgotten magics.
            </p>
            <button className={styles.closeButton} onClick={() => setShowIntro(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickfangHollow;
