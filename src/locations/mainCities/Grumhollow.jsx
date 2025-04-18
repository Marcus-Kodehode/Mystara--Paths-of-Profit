import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './Grumhollow.module.css';
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

export default function Grumhollow() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // HUD / Inventory / Intro
  const [invOpen,    setInvOpen]    = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [showIntro,  setShowIntro]  = useState(false);

  // travel flow
  const [travelOpen, setTravelOpen] = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [eventOpen,  setEventOpen]  = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [daysLeft,      setDaysLeft]      = useState(0);
  const [currentEvent,  setCurrentEvent]  = useState(null);

  // player stats
  const nickname = localStorage.getItem('playerNickname');
  const health   = Number(localStorage.getItem('playerHealth'));
  const stamina  = Number(localStorage.getItem('playerStamina'));
  const coins    = Number(localStorage.getItem('playerCoins'));
  const items    = JSON.parse(localStorage.getItem('playerInventory') || '{}');

  const MAX_HP = 100;
  const MAX_ST = 100;

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
    if (!localStorage.getItem('visitedGrumhollow')) {
      setShowIntro(true);
      localStorage.setItem('visitedGrumhollow', 'true');
    }
    return () => audioRef.current?.pause();
  }, []);

  // 1) from TravelModal
  function handleRouteSelect(route) {
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  }

  // 2) from TravelChoiceModal
  function handleChoice(choice) {
    let pool;
    if (choice === 'safe') {
      pool = safeEvents;
    } else if (choice === 'risky') {
      pool = Math.random() < 0.5 ? riskyGoodEvents : riskyBadEvents;
    } else {
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
    }
    const ev = pool[Math.floor(Math.random() * pool.length)];
    setCurrentEvent(ev);
    setChoiceOpen(false);
    setEventOpen(true);
  }

  // 3) from EventModal
  function handleContinue() {
    const ev = currentEvent;
    const newHP   = Math.min(MAX_HP,  health + (ev.healthDelta || 0));
    const newST   = Math.min(MAX_ST,  stamina + (ev.staminaDelta || 0));
    const newCoins= coins + (ev.goldDelta   || 0);

    // game over?
    if (newHP <= 0) {
      localStorage.clear();
      navigate('/');
      return;
    }

    localStorage.setItem('playerHealth',  String(newHP));
    localStorage.setItem('playerStamina', String(newST));
    localStorage.setItem('playerCoins',   String(newCoins));

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
      <audio ref={audioRef} loop src="/sounds/dhurak-city.mp3" />

      {/* HUD + Inventory */}
      <GameHUD
        playerName={nickname}
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInvOpen(o => !o)}
      />
      {invOpen && <InventoryModal items={items} onClose={() => setInvOpen(false)} />}

      {/* City layout */}
      <CityLayout
        cityName="Grumhollow"
        description="Deep within the Drakthar Peaks lies Grumhollow—a dwarven bastion of stone, steam, and stubborn pride."
        backgroundImage="/images/Grumhollow3.png"
      >
        <div className={styles.marketHotspot} onClick={() => setMarketOpen(true)}>
          Enter Market
        </div>
        <div className={styles.travelHotspot} onClick={() => setTravelOpen(true)}>
          Begin Journey
        </div>
      </CityLayout>

      {/* Market */}
      {marketOpen && <MarketModal city="Grumhollow" onClose={() => setMarketOpen(false)} />}

      {/* Travel → Choice → Event */}
      {travelOpen && (
        <TravelModal
          city="Grumhollow"
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
          isInventoryOpen={invOpen}
          onInventoryToggle={() => setInvOpen(o => !o)}
          onClose={() => setChoiceOpen(false)}
          onChoose={handleChoice}
        />
      )}
      {eventOpen && currentEvent && (
        <EventModal event={currentEvent} onContinue={handleContinue} />
      )}

      {/* Intro */}
      {showIntro && (
        <div className={styles.introModal}>
          <div className={styles.introContent}>
            <h2>Welcome to Grumhollow</h2>
            <p>
              Beneath mountains carved by time and fire, the Dhurak dwarves mine,
              forge, and defend their legacy. Grumhollow echoes with hammers and old grudges.
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
