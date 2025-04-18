// src/locations/lesserLocations/RedBasin.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './RedBasin.module.css';
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

export default function RedBasin() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // HUD / Inventory / Intro
  const [isInvOpen,   setInvOpen]   = useState(false);
  const [isMarket,    setMarket]    = useState(false);
  const [showIntro,   setShowIntro] = useState(false);

  // Reise‐flow
  const [isTravelOpen, setTravelOpen] = useState(false);
  const [isChoiceOpen, setChoiceOpen] = useState(false);
  const [isEventOpen,  setEventOpen]  = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [daysLeft,      setDaysLeft]      = useState(0);
  const [currentEvent,  setCurrentEvent]  = useState(null);

  // Spill‐stats
  const nickname = localStorage.getItem('playerNickname');
  const health   = Number(localStorage.getItem('playerHealth'));
  const stamina  = Number(localStorage.getItem('playerStamina'));
  const coins    = Number(localStorage.getItem('playerCoins'));
  const items    = JSON.parse(localStorage.getItem('playerInventory') || '{}');

  const MAX_HP = 100;
  const MAX_ST = 100;

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
    if (!localStorage.getItem('visitedRedBasin')) {
      setShowIntro(true);
      localStorage.setItem('visitedRedBasin', 'true');
    }
    return () => audioRef.current?.pause();
  }, []);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  };

  const handleChoice = (choice) => {
    let pool;
    if (choice === 'safe') pool = safeEvents;
    else if (choice === 'risky')
      pool = Math.random() < 0.5 ? riskyGoodEvents : riskyBadEvents;
    else
      pool = [{
        title: 'Make Camp',
        description:
          'You rest and fully recover health and stamina, but it adds an extra travel day.',
        healthDelta: MAX_HP - health,
        staminaDelta: MAX_ST - stamina,
        goldDelta: 0,
        dayDelta: 1,
        image: '/images/event/Helping-Hands.webp',
      }];
    const ev = pool[Math.floor(Math.random() * pool.length)];
    setCurrentEvent(ev);
    setChoiceOpen(false);
    setEventOpen(true);
  };

  const handleContinue = () => {
    // Oppdater stats
    const newHP   = Math.min(MAX_HP,  health + (currentEvent.healthDelta || 0));
    const newST   = Math.min(MAX_ST,  stamina + (currentEvent.staminaDelta || 0));
    const newGold = coins + (currentEvent.goldDelta || 0);
    if (newHP <= 0) {
      localStorage.clear();
      navigate('/');
      return;
    }
    localStorage.setItem('playerHealth',  String(newHP));
    localStorage.setItem('playerStamina', String(newST));
    localStorage.setItem('playerCoins',   String(newGold));

    // Reduser dager
    const next = daysLeft - 1 + (currentEvent.dayDelta || 0);
    setDaysLeft(next);
    setEventOpen(false);

    if (next > 0) {
      setChoiceOpen(true);
    } else {
      navigate(selectedRoute.path);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/sounds/red-basin.mp3" />

      <GameHUD
        playerName={nickname}
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInvOpen(o => !o)}
      />
      {isInvOpen && <InventoryModal items={items} onClose={() => setInvOpen(false)} />}

      <CityLayout
        cityName="Red Basin"
        description="A sun‑scorched basin dotted with caves and ancient bones."
        backgroundImage="/images/red-basin.webp"
      >
        <div className={styles.marketHotspot} onClick={() => setMarket(true)}>
          Enter Market
        </div>
        <div className={styles.travelHotspot} onClick={() => setTravelOpen(true)}>
          Begin Journey
        </div>
      </CityLayout>

      {isMarket && <MarketModal city="RedBasin" onClose={() => setMarket(false)} />}

      {isTravelOpen && (
        <TravelModal
          city="RedBasin"
          onClose={() => setTravelOpen(false)}
          onTravel={handleRouteSelect}
        />
      )}

      {isChoiceOpen && selectedRoute && (
        <TravelChoiceModal
          cityName={selectedRoute.name}
          daysLeft={daysLeft}
          health={health}
          stamina={stamina}
          coins={coins}
          items={items}
          isInventoryOpen={isInvOpen}
          onInventoryToggle={() => setInvOpen(o => !o)}
          onClose={() => setChoiceOpen(false)}
          onChoose={handleChoice}
        />
      )}

      {isEventOpen && currentEvent && (
        <EventModal event={currentEvent} onContinue={handleContinue} />
      )}

      {showIntro && (
        <div className={styles.introModal}>
          <div className={styles.introContent}>
            <h2>Welcome to Red Basin</h2>
            <p>
              Beneath the blazing sun and blood‑colored dunes lies Red Basin — once a thriving oasis, now home to nomads, relic hunters, and whispers of buried cities.
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
