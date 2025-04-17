// src/data/travel/travelRoutes.js

const travelRoutes = {
  Thalmoor: [
    {
      name: 'Red Basin',
      path: '/lesser/redbasin',
      description: 'A sun‑scorched basin dotted with caves and ancient bones.',
      danger: 'Easy',
      image: '/images/travel/red-basin-header.webp',
      travelDays: 5,
    },
    // legg til flere destinasjoner her om ønskelig...
  ],
  RedBasin: [
    {
      name: 'Thalmoor',
      path: '/city/thalmoor',
      description: 'The desert jewel of the Kavari—a place where coins speak louder than swords.',
      danger: 'Easy',
      image: '/images/travel/thalmoor-header.webp',
      travelDays: 5,
    },
    // evt. flere destinasjoner ut fra Red Basin
  ],
  Grumhollow: [ /* ... travelDays:5 ... */ ],
  Runebreak: [ /* ... travelDays:5 ... */ ],
  Sylvarin:  [ /* ... */ ],
  IrvathGlade: [ /* ... */ ],
  NymRasha:  [ /* ... */ ],
  QuickfangHollow: [ /* ... */ ],
};

export default travelRoutes;
