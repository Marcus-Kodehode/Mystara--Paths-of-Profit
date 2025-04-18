// src/hooks/useTravelEvents.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import safeEvents      from '../data/travel/events/safeEvents';
import riskyBadEvents  from '../data/travel/events/riskyBadEvents';
import riskyGoodEvents from '../data/travel/events/riskyGoodEvents';

export function useTravelEvents() {
  const navigate = useNavigate();

  // modal‐states
  const [travelOpen, setTravelOpen] = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [eventOpen, setEventOpen]   = useState(false);

  // reise‐data
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [daysLeft, setDaysLeft]           = useState(0);
  const [currentEvent, setCurrentEvent]   = useState(null);

  const maxHealth  = 100;
  const maxStamina = 100;

  function openTravelModal() {
    setTravelOpen(true);
  }
  function closeTravelModal() {
    setTravelOpen(false);
  }
  function closeChoiceModal() {
    setChoiceOpen(false);
  }

  // Starter reisen, sjekker total‐stamina mot antall dager
  function startTravel(route, stats) {
    if (stats.stamina < route.travelDays * 5) {
      // hvis du vil kreve 5 stamina/dag * dag‐antall
      setCurrentEvent({
        title: 'Too Tired',
        description: `You need ${route.travelDays * 5} stamina to make this journey but have only ${stats.stamina}.`,
        healthDelta: 0,
        staminaDelta: 0,
        goldDelta: 0,
        dayDelta: 0,
      });
      setEventOpen(true);
      return;
    }
    setSelectedRoute(route);
    setDaysLeft(route.travelDays);
    setTravelOpen(false);
    setChoiceOpen(true);
  }

  // Håndterer Safe / Risky / Camp
  function chooseTravel(choice, stats) {
    let ev;
    if (choice === 'safe') {
      ev = safeEvents[Math.floor(Math.random() * safeEvents.length)];
    } else if (choice === 'risky') {
      const pool = Math.random() < 0.5 ? riskyGoodEvents : riskyBadEvents;
      ev = pool[Math.floor(Math.random() * pool.length)];
    } else {
      // Camp
      ev = {
        title: 'You Make Camp',
        description: 'You recover fully—but it adds an extra travel day.',
        healthDelta: maxHealth - stats.health,
        staminaDelta: maxStamina - stats.stamina,
        goldDelta: 0,
        dayDelta: 1,
      };
    }

    // *** Her trekker vi alltid fra 5 stamina per dag ***
    ev.staminaDelta = (ev.staminaDelta || 0) - 5;

    setCurrentEvent(ev);
    setChoiceOpen(false);
    setEventOpen(true);
  }

  // Når spiller trykker Continue i EventModal
  function handleEventContinue(stats) {
    const ev = currentEvent;
    const newHealth  = Math.min(maxHealth,  stats.health + ev.healthDelta);
    const newStamina = Math.min(maxStamina, stats.stamina + ev.staminaDelta);
    const newCoins   = stats.coins + ev.goldDelta;

    // Game over?
    if (newHealth <= 0) {
      localStorage.setItem('playerHealth',  '100');
      localStorage.setItem('playerStamina', '100');
      localStorage.setItem('playerCoins',   '500');
      localStorage.setItem(
        'playerInventory',
        JSON.stringify({
          items: [{ name: 'Rusty Sword', type: 'weapon' }],
          consumables: [],
          special: [],
        })
      );
      navigate('/');
      return;
    }

    // Lagre stats
    localStorage.setItem('playerHealth',  String(newHealth));
    localStorage.setItem('playerStamina', String(newStamina));
    localStorage.setItem('playerCoins',   String(newCoins));

    // Reduser dager igjen og eventuelle camp‐dager
    const next = daysLeft - 1 + (ev.dayDelta || 0);
    setDaysLeft(next);
    setEventOpen(false);

    if (next > 0) {
      setChoiceOpen(true);
    } else {
      navigate(selectedRoute.path);
    }
  }

  return {
    // states
    travelOpen,
    choiceOpen,
    eventOpen,
    daysLeft,
    currentEvent,
    selectedRoute,
    // actions
    openTravelModal,
    closeTravelModal,
    closeChoiceModal,
    startTravel,
    chooseTravel,
    handleEventContinue,
  };
}
