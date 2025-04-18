// src/locations/mainCities/Sylvarin.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './Sylvarin.module.css';
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

export default function Sylvarin() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // === HUD / Inventory / Intro ===
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isMarketOpen,    setMarketOpen]    = useState(false);
  const [showIntro,       setShowIntro]      = useState(false);

  // === Reise‑flow ===
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
    // Spill elarin-musikk
    audioRef.current?.play().catch(() => {});
    // Vis intro én gang
    if (!localStorage.getItem('visitedSylvarin')) {
      setShowIntro(true);
      localStorage.setItem('visitedSylvarin', 'true');
    }
    return () => audioRef.current?.pause();
  }, []);

  // 1) Spilleren velger rute
  function handleRouteSelect(route) {
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  }

  // 2) Spilleren velger safe / risky / camp
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

  // 3) Når spilleren trykker Continue etter event
  function handleEventContinue() {
    const ev = currentEvent;
    const newHP   = Math.min(MAX_HP,   health + (ev.healthDelta || 0));
    const newST   = Math.min(MAX_ST,   stamina + (ev.staminaDelta || 0));
    const newGold = coins + (ev.goldDelta || 0);

    // Game over?
    if (newHP <= 0) {
      navigate('/game-over'); // 👈 sender til ny GameOver-skjerm
      return;
    }
    

    // Lagre stats
    localStorage.setItem('playerHealth',  String(newHP));
    localStorage.setItem('playerStamina', String(newST));
    localStorage.setItem('playerCoins',   String(newGold));

    // Oppdater dager igjen
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
      {/* Musikk */}
      <audio ref={audioRef} loop src="/sounds/elarin-city.mp3" />

      {/* HUD + inventar */}
      <GameHUD
        playerName={nickname}
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInventoryOpen(o => !o)}
      />
      {isInventoryOpen && <InventoryModal items={items} onClose={() => setInventoryOpen(false)} />}

      {/* By‐layout */}
      <CityLayout
        cityName="Sylvarin"
        description="Among the whispering trees and glowing flora, Sylvarin stands as a beacon of harmony between nature and magic."
        backgroundImage="/images/Sylvarin3.png"
      >
        <div className={styles.marketHotspot} onClick={() => setMarketOpen(true)}>
          Enter Market
        </div>
        <div className={styles.travelHotspot} onClick={() => setTravelOpen(true)}>
          Begin Journey
        </div>
      </CityLayout>

      {/* MarketModal */}
      {isMarketOpen && <MarketModal city="Sylvarin" onClose={() => setMarketOpen(false)} />}

      {/* TravelModal */}
      {travelOpen && (
        <TravelModal
          city="Sylvarin"
          onClose={() => setTravelOpen(false)}
          onTravel={handleRouteSelect}
        />
      )}

      {/* TravelChoiceModal */}
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

      {/* EventModal */}
      {eventOpen && currentEvent && (
        <EventModal event={currentEvent} onContinue={handleEventContinue} />
      )}

      {/* IntroModal */}
      {showIntro && (
        <div className={styles.introModal}>
          <div className={styles.introContent}>
            <h2>Welcome to Sylvarin</h2>
            <p>
              Nestled within the heart of the ancient forest, Sylvarin is a sanctuary where elves and mystical creatures coexist, preserving the balance of nature and arcane arts.
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
