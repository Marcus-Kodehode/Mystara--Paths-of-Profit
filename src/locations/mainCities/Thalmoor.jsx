import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityLayout from '../shared/CityLayout';
import styles from './Thalmoor.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal';
import TravelModal from '../../components/travel/TravelModal';
import TravelChoiceModal from '../../components/travel/TravelChoiceModal';
import EventModal from '../../components/travel/EventModal';

import travelRoutes from '../../data/travel/travelRoutes';
import { useTravelEvents } from '../../hooks/useTravelEvents';

export default function Thalmoor() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // HUD/inventory
  const [invOpen, setInvOpen]     = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);

  // travel‑hook
  const {
    travelOpen,
    choiceOpen,
    eventOpen,
    daysLeft,
    currentEvent,
    selectedRoute,
    openTravelModal,
    closeTravelModal,
    closeChoiceModal,
    startTravel,
    chooseTravel,
    handleEventContinue,
  } = useTravelEvents();

  // Spill‑stats
  const health  = Number(localStorage.getItem('playerHealth'));
  const stamina = Number(localStorage.getItem('playerStamina'));
  const coins   = Number(localStorage.getItem('playerCoins'));
  const items   = JSON.parse(localStorage.getItem('playerInventory') || '{}');

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
    if (!localStorage.getItem('visitedThalmoor')) {
      localStorage.setItem('visitedThalmoor', 'true');
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} loop src="/sounds/kavari-city.mp3" />

      {/* HUD + inventar */}
      <GameHUD
        health={health}
        stamina={stamina}
        coins={coins}
        onInventoryToggle={() => setInvOpen((o) => !o)}
      />
      {invOpen && <InventoryModal items={items} onClose={() => setInvOpen(false)} />}

      <CityLayout
        cityName="Thalmoor"
        description="The desert jewel of the Kavari—a place where coins speak louder than swords."
        backgroundImage="/images/Thalmoor3.png"
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

      {/* MarketModal */}
      {marketOpen && (
        <MarketModal city="Thalmoor" onClose={() => setMarketOpen(false)} />
      )}

      {/* TravelModal */}
      {travelOpen && (
        <TravelModal
          city="Thalmoor"
          onClose={closeTravelModal}
          onTravel={(route) => startTravel(route, { stamina })}
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
          isInventoryOpen={invOpen}
          onInventoryToggle={() => setInvOpen((o) => !o)}
          onClose={closeChoiceModal}
          onChoose={(choice) =>
            chooseTravel(choice, { health, stamina, coins })
          }
        />
      )}

      {/* EventModal */}
      {eventOpen && currentEvent && (
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
