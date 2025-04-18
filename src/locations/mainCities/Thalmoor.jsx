// src/locations/mainCities/Thalmoor.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './Thalmoor.module.css';
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

export default function Thalmoor() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // HUD / Inventory / Intro
  const [isInvOpen,    setInvOpen]    = useState(false);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [showIntro,    setShowIntro]  = useState(false);

  // Reise‑flow
  const [travelOpen, setTravelOpen] = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [eventOpen,  setEventOpen]  = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [daysLeft,      setDaysLeft]      = useState(0);
  const [currentEvent,  setCurrentEvent]  = useState(null);

  // Spill‑stats
  const nickname = localStorage.getItem('playerNickname');
  const health   = Number(localStorage.getItem('playerHealth'));
  const stamina  = Number(localStorage.getItem('playerStamina'));
  const coins    = Number(localStorage.getItem('playerCoins'));
  const items    = JSON.parse(localStorage.getItem('playerInventory') || '{}');

  const MAX_HP = 100;
  const MAX_ST = 100;

  useEffect(() => {
    // spill bakgrunnsmusikk
    audioRef.current?.play().catch(() => {});
    // vis intro én gang
    if (!localStorage.getItem('visitedThalmoor')) {
      setShowIntro(true);
      localStorage.setItem('visitedThalmoor', 'true');
    }
    return () => audioRef.current?.pause();
  }, []);

  // 1) Velg rute i TravelModal
  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  };

  // 2) Velg safe / risky / camp
  const handleChoice = (choice) => {
    let pool;
    if (choice === 'safe') {
      pool = safeEvents;
    } else if (choice === 'risky') {
      pool = Math.random() < 0.5
        ? riskyGoodEvents
        : riskyBadEvents;
    } else {
      // camp
      pool = [{
        title: 'Make Camp',
        description: 'You rest and fully recover health and stamina, but it adds an extra travel day.',
        healthDelta: MAX_HP - health,
        staminaDelta: MAX_ST - stamina,
        goldDelta: 0,
        dayDelta: 1,
        image: '/images/event/Helping-Hands.webp',
      }];
    }
    const ev = pool[Math.floor(Math.random() * pool.length)];
    setCurrentEvent(ev);
    setChoiceOpen(false);
    setEventOpen(true);
  };

  // 3) Etter event: oppdater stats, reduser dager, loop eller naviger
  const handleContinue = () => {
    // oppdater stats i localStorage
    const newHP   = Math.min(MAX_HP,  health + (currentEvent.healthDelta || 0));
    const newST   = Math.min(MAX_ST,  stamina + (currentEvent.staminaDelta || 0));
    const newGold = coins + (currentEvent.goldDelta || 0);

    if (newHP <= 0) {
      // Game over → restart
      localStorage.clear();
      navigate('/');
      return;
    }

    localStorage.setItem('playerHealth',  String(newHP));
    localStorage.setItem('playerStamina', String(newST));
    localStorage.setItem('playerCoins',   String(newGold));

    // reduser dager igjen
    const next = daysLeft - 1 + (currentEvent.dayDelta || 0);
    setDaysLeft(next);
    setEventOpen(false);

    if (next > 0) {
      setChoiceOpen(true);   // ny dag = nytt valg
    } else {
      navigate(selectedRoute.path);  // ankomst
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/sounds/kavari-city.mp3" />

      {/* HUD + Inventory */}
      <GameHUD
        playerName={nickname}
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInvOpen(o => !o)}
      />
      {isInvOpen && (
        <InventoryModal items={items} onClose={() => setInvOpen(false)} />
      )}

      {/* CityLayout med header og hotspots */}
      <CityLayout
        cityName="Thalmoor"
        description="The desert jewel of the Kavari—a place where coins speak louder than swords."
        backgroundImage="/images/Thalmoor3.png"
      >
        <div className={styles.cityHeader}>
          <h1 className={styles.cityName}>Thalmoor</h1>
          <p className={styles.cityDescription}>
            Nestled between golden dunes and oasis markets, Thalmoor thrives on trade, whispers, and opportunity.
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
      </CityLayout>

      {/* MarketModal */}
      {isMarketOpen && (
        <MarketModal city="Thalmoor" onClose={() => setMarketOpen(false)} />
      )}

      {/* TravelModal */}
      {travelOpen && (
        <TravelModal
          city="Thalmoor"
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
          isInventoryOpen={isInvOpen}
          onInventoryToggle={() => setInvOpen(o => !o)}
          onClose={() => setChoiceOpen(false)}
          onChoose={handleChoice}
        />
      )}

      {/* EventModal */}
      {eventOpen && currentEvent && (
        <EventModal event={currentEvent} onContinue={handleContinue} />
      )}

      {/* IntroModal */}
      {showIntro && (
        <div className={styles.introModal}>
          <div className={styles.introContent}>
            <h2>Welcome to Thalmoor</h2>
            <p>
              Beneath the blazing sun of the desert city, caravans laden with silk and spice
              wind through the streets. Here, every deal is a dance of wit, and fortune favors the bold.
            </p>
            <button
              className={styles.closeButton}
              onClick={() => setShowIntro(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
