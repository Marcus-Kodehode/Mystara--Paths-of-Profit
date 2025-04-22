export function generateMarketPrices(city) {
    const rangeMap = {
      'Iron Sword': [100, 300],
      'Leather Armor': [100, 300],
      'Health Potion': [50, 100],
      'Stamina Potion': [50, 100],
      'Spice Pack': [200, 400],
      'Silk Bundle': [200, 400],
      'Iron Ore': [200, 400],
      'Forged Blade': [200, 400],
      'Enchanted Leaf': [200, 400],
      'Moonblossom': [200, 400],
      'Shadow Fern': [200, 400],
      'Beast Fang': [200, 400],
    };
  
    const prices = {};
    Object.entries(rangeMap).forEach(([name, [min, max]]) => {
      const price = Math.floor(Math.random() * (max - min + 1)) + min;
      prices[name] = {
        price,
        suggestedSell: price * 2,
        boughtAt: city
      };
    });
  
    return prices;
  }
  