// src/locations/lesserLocations/IrvathGlade.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './IrvathGlade.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';
import TravelChoiceModal from '../../components/travel/TravelChoiceModal';
import EventModal from '../../components/travel/EventModal';

import travelRoutes    from '../../data/travel/travelRoutes';
import safeEvents      from '../../data/travel/events/safeEvents';
import riskyBadEvents  from '../../data/travel/events/riskyBadEvents';
import riskyGoodEvents from '../../data/travel/events/riskyGoodEvents';

export default function IrvathGlade() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // === HUD / Inventory / Intro ===
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isMarketOpen,    setMarketOpen]    = useState(false);
  const [showIntro,       setShowIntro]      = useState(false);

  // === Reise‐flow ===
  const [travelOpen,    setTravelOpen]    = useState(false);
  const [choiceOpen,    setChoiceOpen]    = useState(false);
  const [eventOpen,     setEventOpen]     = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [daysLeft,      setDaysLeft]      = useState(0);
  const [currentEvent,  setCurrentEvent]  = useState(null);

  // === Stats & Inventory ===
  const nickname = localStorage.getItem('playerNickname');
  const health   = Number(localStorage.getItem('playerHealth'));
  const stamina  = Number(localStorage.getItem('playerStamina'));
  const coins    = Number(localStorage.getItem('playerCoins'));
  const items    = JSON.parse(localStorage.getItem('playerInventory') || '{}');

  const MAX_HP = 100, MAX_ST = 100;

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
    if (!localStorage.getItem('visitedIrvathGlade')) {
      setShowIntro(true);
      localStorage.setItem('visitedIrvathGlade', 'true');
    }
    return () => audioRef.current?.pause();
  }, []);

  function handleRouteSelect(route) {
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  }

  function handleTravelChoice(choice) {
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

  function handleEventContinue() {
    const ev = currentEvent;
    const newHP   = Math.min(MAX_HP,   health + (ev.healthDelta || 0));
    const newST   = Math.min(MAX_ST,   stamina + (ev.staminaDelta || 0));
    const newGold = coins + (ev.goldDelta || 0);

    if (newHP <= 0) {
      navigate('/game-over'); // 👈 sender til ny GameOver-skjerm
      return;
    }
    

    localStorage.setItem('playerHealth',  String(newHP));
    localStorage.setItem('playerStamina', String(newST));
    localStorage.setItem('playerCoins',   String(newGold));

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
      <audio ref={audioRef} loop src="/sounds/elarin-city.mp3" />

      <GameHUD
        playerName={nickname}
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInventoryOpen(o => !o)}
      />
      {isInventoryOpen && <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />}

      <CityLayout
        cityName="Irvath Glade"
        description="A tranquil haven where nature and magic intertwine, hidden deep within ancient woods."
        backgroundImage="/images/irvath-glade.webp"
      >
        <div className={styles.marketHotspot} onClick={() => setMarketOpen(true)}>
          Enter Market
        </div>
        <div className={styles.travelHotspot} onClick={() => setTravelOpen(true)}>
          Begin Journey
        </div>
      </CityLayout>

      {isMarketOpen && <MarketModal city="IrvathGlade" onClose={() => setMarketOpen(false)} />}

      {travelOpen && (
        <TravelModal
          city="IrvathGlade"
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
          onChoose={handleTravelChoice}
        />
      )}

      {eventOpen && currentEvent && (
        <EventModal event={currentEvent} onContinue={handleEventContinue} />
      )}

      {showIntro && (
        <div className={styles.introModal}>
          <div className={styles.introContent}>
            <h2>Welcome to Irvath Glade</h2>
            <p>
              The glade whispers tales of old, where every leaf and breeze carries the essence of ancient magic.
            </p>
            <button className={styles.closeButton} onClick={() => setShowIntro(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
