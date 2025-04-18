import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './NymRasha.module.css';
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

const NymRasha = () => {
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

    if (!localStorage.getItem('visitedNymRasha')) {
      setShowIntro(true);
      localStorage.setItem('visitedNymRasha', 'true');
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
        description: 'You rest fully but lose an extra day.',
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
        cityName="Nym'Rasha"
        description="A mystical desert city with ancient secrets."
        backgroundImage="/images/Nym-Rasha2.png"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Nym'Rasha</h1>
          <p className={styles.cityDescription}>
            A mystical desert city with ancient secrets.
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
        <MarketModal city="NymRasha" onClose={() => setMarketOpen(false)} />
      )}

      {travelOpen && (
        <TravelModal
          city="NymRasha"
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
            <h2>Welcome to Nym'Rasha</h2>
            <p>
              Shrouded in whispers and sand, Nym'Rasha is a city of illusion and echoes.
              It stands where the jungle fades into red stone, its walls carved with runes older than kings.
              The Felarii say it listens — and remembers. Magic runs through its roots, old magic, wild and watching.
              Travelers here speak in hushed tones, for the city knows its own secrets... and protects them.
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

export default NymRasha;
