// src/data/travel/events/riskyBadEvents.js
// Risky travel events with negative outcome – lore-infused, general use

export default [
    {
      id: 'riskyBad1',
      title: 'Ambushed at Dusk',
      description: 'Shadows move too fast to track. Bandits strike just before nightfall, taking coin and leaving bruises.',
      healthDelta: -15,
      staminaDelta: -10,
      goldDelta: -5,
      dayDelta: 0,
    },
    {
      id: 'riskyBad2',
      title: 'Cracked Ledge',
      description: 'A steep climb turns treacherous. Loose stone, a bad step—you fall hard and have to make camp early to recover.',
      healthDelta: -20,
      staminaDelta: -15,
      goldDelta: 0,
      dayDelta: 1,
    },
    {
      id: 'riskyBad3',
      title: 'Swallowed by Fog',
      description: 'A sudden wall of fog blinds your path. You lose your bearings and wander far off course before night falls.',
      healthDelta: 0,
      staminaDelta: -20,
      goldDelta: 0,
      dayDelta: 1,
    },
    {
      id: 'riskyBad4',
      title: 'Rotten Stores',
      description: 'Your provisions spoil overnight—leaking oil, sour bread, soaked spices. Little nourishment, and less morale.',
      healthDelta: -5,
      staminaDelta: -10,
      goldDelta: 0,
      dayDelta: 0,
    },
    {
      id: 'riskyBad5',
      title: 'Slide of Stone',
      description: 'A sudden rumble. Stones tumble from the ridge above—you dodge most, but not all.',
      healthDelta: -25,
      staminaDelta: -5,
      goldDelta: 0,
      dayDelta: 0,
    },
  ];
  