// src/utils/playerUtils.js
export function updatePlayerStats({ healthDelta = 0, staminaDelta = 0, goldDelta = 0 }) {
    const maxHealth  = 100;
    const maxStamina = 100;
  
    let health  = parseInt(localStorage.getItem('playerHealth')  || '0', 10);
    let stamina = parseInt(localStorage.getItem('playerStamina') || '0', 10);
    let coins   = parseInt(localStorage.getItem('playerCoins')   || '0', 10);
  
    health  = Math.min(maxHealth,  health + healthDelta);
    stamina = Math.min(maxStamina, stamina + staminaDelta);
    coins   = coins + goldDelta;
  
    localStorage.setItem('playerHealth',  String(health));
    localStorage.setItem('playerStamina', String(stamina));
    localStorage.setItem('playerCoins',   String(coins));
  
    // **NYTT** – fortell alle som lytter at stats er endret
    window.dispatchEvent(new Event('statsChanged'));
  }
  