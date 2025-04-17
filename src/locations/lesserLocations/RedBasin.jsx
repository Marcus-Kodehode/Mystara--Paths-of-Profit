// src/locations/lesserLocations/RedBasin.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './RedBasin.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';
import TravelChoiceModal from '../../components/travel/TravelChoiceModal';
import EventModal from '../../components/travel/EventModal';

import travelRoutes from '../../data/travel/travelRoutes';
import { useTravelEvents } from '../../hooks/useTravelEvents';

export default function RedBasin() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [invOpen, setInvOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);

  const {
    travelOpen,
    choiceOpen,
    eventOpen,
    daysLeft,
    currentEvent,
    openTravelModal,
    closeTravelModal,
    closeChoiceModal,
    startTravel,
    chooseTravel,
    handleEventContinue,
  } = useTravelEvents();

  const health  = Number(localStorage.getItem('playerHealth'));
  const stamina = Number(localStorage.getItem('playerStamina'));
  const coins   = Number(localStorage.getItem('playerCoins'));
  const items   = JSON.parse(localStorage.getItem('playerInventory') || '{}');

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
    if (!localStorage.getItem('visitedRedBasin')) {
      localStorage.setItem('visitedRedBasin', 'true');
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} loop src="/sounds/desert-wind.mp3" />

      <GameHUD
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInvOpen((o) => !o)}
      />
      {invOpen && <InventoryModal items={items} onClose={() => setInvOpen(false)} />}

      <CityLayout
        cityName="Red Basin"
        description="A sun‑scorched basin dotted with caves and ancient bones."
        backgroundImage="/images/red-basin.webp"
      >
        <div
          className={styles.marketHotspot}
          onClick={() => setMarketOpen(true)}
        >
          Enter Market
        </div>

        <div
          className={styles.travelHotspot}
          onClick={openTravelModal}
        >
          Begin Journey
        </div>
      </CityLayout>

      {marketOpen && (
        <MarketModal city="RedBasin" onClose={() => setMarketOpen(false)} />
      )}

      {travelOpen && (
        <TravelModal
          city="RedBasin"
          onClose={closeTravelModal}
          onTravel={(route) =>
            startTravel(route, { stamina })
          }
        />
      )}

      {choiceOpen && (
        <TravelChoiceModal
          cityName={currentEvent ? '' : ''}
          daysLeft={daysLeft}
          health={health}
          stamina={stamina}
          coins={coins}
          items={items}
          isInventoryOpen={invOpen}
          onInventoryToggle={() => setInvOpen((o) => !o)}
          onClose={closeChoiceModal}
          onChoose={(choice) =>
            chooseTravel(choice, { health, stamina, coins })
          }
        />
      )}

      {eventOpen && (
        <EventModal
          event={currentEvent}
          onContinue={() =>
            handleEventContinue({ health, stamina, coins })
          }
        />
      )}
    </>
  );
}
