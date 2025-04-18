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
    // … ev. flere ut fra Thalmoor
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
  ],

  Grumhollow: [
    {
      name: 'Runebreak',
      path: '/lesser/runebreak',
      description: 'Cracked paths and ancient ruins lie ahead. Dwarves say the stones still hum with forgotten power.',
      danger: 'Easy',
      image: '/images/travel/runebreak-header.webp',
      travelDays: 5,
    },
  ],

  Runebreak: [
    {
      name: 'Grumhollow',
      path: '/city/grumhollow',
      description: 'Deep within the Drakthar Peaks lies Grumhollow—a dwarven bastion of stone, steam, and stubborn pride.',
      danger: 'Easy',
      image: '/images/travel/grumhollow-header.webp',
      travelDays: 5,
    },
  ],

  Sylvarin: [
    {
      name: 'Irvath Glade',
      path: '/lesserLocations/irvathglade',
      description:
        'A tranquil haven where nature and magic intertwine, hidden deep within ancient woods.',
      danger: 'Easy',
      image: '/images/travel/irvath-glade-header.webp',
      travelDays: 5,
    }
  ],
  IrvathGlade: [
    {
      name: 'Sylvarin',
      path: '/city/sylvarin',
      description:
        'Among the whispering trees and glowing flora, Sylvarin stands as a beacon of harmony between nature and magic.',
      danger: 'Easy',
      image: '/images/travel/sylvarin-header.webp',
      travelDays: 5,
    }
  ],

    // De andre byene kan stå tomme eller være fylt ut etterhvert:
  NymRasha:  [
    {
      name: 'Quickfang Hollow',
      path: '/lesserLocations/quickfanghollow',
      description: 'A hidden jungle path, dangerous and silent — few return.',
      danger: 'Medium',
      image: '/images/travel/quickfang-hollow-header.webp',
      travelDays: 5,
    },
  ],
  QuickfangHollow: [
    {
      name: "Nym'Rasha",
      path: '/city/nymrasha',
      description: 'A mystical desert city with ancient secrets.',
      danger: 'Medium',
      image: '/images/travel/Nym-Rasha-header.webp',
      travelDays: 5,
    },
  ],
};

export default travelRoutes;
