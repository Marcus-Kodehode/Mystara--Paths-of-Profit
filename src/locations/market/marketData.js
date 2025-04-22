const marketData = {
  standard: {
    items: [
      { name: 'Iron Sword', minPrice: 100, maxPrice: 300 },
      { name: 'Leather Armor', minPrice: 80, maxPrice: 200 }
    ],
    consumables: [
      { name: 'Health Potion', minPrice: 50, maxPrice: 100 },
      { name: 'Stamina Potion', minPrice: 50, maxPrice: 100 }
    ]
  },

  Thalmoor: {
    tradeGoods: [
      { name: 'Spice Pack', minPrice: 200, maxPrice: 400, origin: 'Thalmoor' },
      { name: 'Silk Bundle', minPrice: 200, maxPrice: 400, origin: 'Thalmoor' }
    ],
    specialItem: { name: 'Desert Compass', price: 2500 }
  },

  Grumhollow: {
    tradeGoods: [
      { name: 'Iron Ore', minPrice: 200, maxPrice: 400, origin: 'Grumhollow' },
      { name: 'Forged Blade', minPrice: 200, maxPrice: 400, origin: 'Grumhollow' }
    ],
    specialItem: { name: 'Runed Pickaxe', price: 3000 }
  },

  Sylvarin: {
    tradeGoods: [
      { name: 'Enchanted Leaf', minPrice: 200, maxPrice: 400, origin: 'Sylvarin' },
      { name: 'Moonblossom', minPrice: 200, maxPrice: 400, origin: 'Sylvarin' }
    ],
    specialItem: { name: 'Elven Songstone', price: 2750 }
  },

  NymRasha: {
    tradeGoods: [
      { name: 'Shadow Fern', minPrice: 200, maxPrice: 400, origin: 'NymRasha' },
      { name: 'Beast Fang', minPrice: 200, maxPrice: 400, origin: 'NymRasha' }
    ],
    specialItem: { name: 'Felarii Talisman', price: 2800 }
  }
};

export default marketData;
