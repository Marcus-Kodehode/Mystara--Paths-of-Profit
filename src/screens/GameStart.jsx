import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Routing
import styles from './GameStart.module.css';
import GameHUD from '../components/GameHUD';
import InventoryModal from '../components/InventoryModal';

const raceCityBackgrounds = {
  Kavari: '/images/Thalmoor3.png',
  Dhurak: '/images/Grumhollow3.png',
  Elarin: '/images/Sylvarin3.png',
  Felarii: "/images/Nym-Rasha2.png",
};

const raceIntroductions = {
  Kavari: `Beneath the blazing sun of Thalmoor, the Kavari thrive amidst spice-laden markets and golden domes. Their caravans cross endless dunes, their tongues fluent in coin and contract alike. Welcome to the cradle of desert trade.`,
  Dhurak: `Among the smoky forges and jagged peaks of Grumhollow, the Dhurak shape both steel and destiny. Their strength is legend, their loyalty unyielding. Your journey begins where stone meets fire.`,
  Elarin: `Deep within the shimmering Sylvarin woods, the Elarin walk the veil between nature and magic. Enchanted groves hum with secrets, and the spirits of the forest stir. With grace and cunning, your journey begins.`,
  Felarii: `In the dense jungles of Nym’Rasha, the Felarii move unseen, swift as shadows. Smugglers, spies, and survivors—your kind always finds a way. The law is distant, and your wit is your greatest weapon.`
};

function GameStart() {
  const [showIntro, setShowIntro] = useState(true);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const navigate = useNavigate(); // 👈 For å navigere til by

  const nickname = localStorage.getItem('playerNickname');
  const selectedRace = localStorage.getItem('selectedRace');

  // Init default stats and inventory on load
  useEffect(() => {
    localStorage.setItem('playerHealth', '100');
    localStorage.setItem('playerStamina', '100');
    localStorage.setItem('playerCoins', '500');
    localStorage.setItem('playerInventory', JSON.stringify({
      items: [
        { name: "Rusty Sword", type: "weapon" },
        { name: "Leather Tunic", type: "armor" }
      ],
      consumables: [
        { name: "Health Potion", type: "consumable" },
        { name: "Stamina Potion", type: "consumable" }
      ],
      special: [
        {
          name:
            selectedRace === 'Kavari'
              ? 'Spice Pack'
              : selectedRace === 'Dhurak'
              ? 'Helm of Vitality'
              : selectedRace === 'Elarin'
              ? 'Forest Amulet'
              : 'Jungle Medallion',
          type: "special"
        }
      ]
    }));
  }, [selectedRace]);

  const handleEnterCity = () => {
    // Ruter spilleren til riktig startby basert på valgt rase
    if (selectedRace === 'Kavari') {
      navigate('/city/thalmoor');
    } else if (selectedRace === 'Dhurak') {
      navigate('/city/grumhollow');
    } else if (selectedRace === 'Elarin') {
      navigate('/city/sylvarin');
    } else if (selectedRace === 'Felarii') {
      navigate('/city/nymrasha');
    }
  };

  const backgroundImage = raceCityBackgrounds[selectedRace] || '';
  const introText = raceIntroductions[selectedRace] || '';

  const handleInventoryToggle = () => {
    setInventoryOpen(!isInventoryOpen);
  };

  const items = JSON.parse(localStorage.getItem('playerInventory')) || {};

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <GameHUD
        playerName={nickname}
        coins={localStorage.getItem('playerCoins')}
        health={localStorage.getItem('playerHealth')}
        stamina={localStorage.getItem('playerStamina')}
        onInventoryToggle={handleInventoryToggle}
      />

      {showIntro && (
        <div className={styles.overlay}>
          <h1>Welcome, {nickname}</h1>
          <p className={styles.intro}>{introText}</p>
          <button className={styles.continueButton} onClick={handleEnterCity}>
            Enter City
          </button>
        </div>
      )}

      {isInventoryOpen && (
        <InventoryModal items={items} onClose={handleInventoryToggle} />
      )}
    </div>
  );
}

export default GameStart;
