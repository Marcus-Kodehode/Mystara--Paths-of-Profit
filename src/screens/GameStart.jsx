import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Kavari: `Beneath the blazing sun of Thalmoor, the Kavari have built a golden empire of trade, culture, and cunning. Their cities shimmer with silk and spice, their caravans whisper across the dunes, and every deal is a dance of wit. Born with sand in their veins and silver on their tongues, you begin your journey as a child of the desert—where fortune favors the bold, and every step is a negotiation.`,

  Dhurak: `High in the jagged peaks of Grumhollow, the Dhurak thrive in smoke and stone. Forged in fire and tempered by battle, these mountainfolk carve their destinies with hammers and runes. Their strength is legendary, their loyalty unshakable. You enter a world where might is currency, the anvil is sacred, and every clang of metal echoes a tale of endurance. Your journey begins where stone meets will.`,

  Elarin: `Hidden within the timeless glades of Sylvarin, the Elarin walk the line between beauty and power. Their cities grow from ancient trees, and magic flows through root and river alike. Attuned to the whispers of the forest and the pull of unseen forces, they see the world not as it is, but as it could be. You awaken among starlit groves, where spirits stir, and destiny is drawn in moonlight.`,

  Felarii: `In the tangled wilds of Nym’Rasha, the Felarii slip between shadow and sun. Agile, elusive, and steeped in mystery, these feline nomads make their homes atop beasts and among shifting roots. They trade in secrets and vanish without trace. You begin your journey not on roads, but across forgotten trails—where trust is rare, instincts rule, and freedom lies just beyond the next jungle bend.`
};


function GameStart({ audioRef }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const navigate = useNavigate();

  const nickname = localStorage.getItem('playerNickname');
  const selectedRace = localStorage.getItem('selectedRace');

  useEffect(() => {
    localStorage.setItem('playerHealth', '100');
    localStorage.setItem('playerStamina', '100');
    localStorage.setItem('playerCoins', '500');
  
    const baseInventory = {
      items: [
        { name: "Rusty Sword", type: "weapon", price: 10 },
        { name: "Leather Tunic", type: "armor", price: 10 }
      ],
      consumables: [
        { name: "Health Potion", type: "consumable", price: 50 },
        { name: "Stamina Potion", type: "consumable", price: 50 }
      ],
      special: []
    };
  
    // Legg til spesialgjenstand basert på rase
    if (selectedRace === 'Kavari') {
      baseInventory.special.push({
        name: 'Spice Pack',
        type: 'trade',
        price: 200,         // startpris (du kan bruke hva som helst her)
        origin: 'Thalmoor',
        boughtAt: 'Thalmoor'
      });
    } else if (selectedRace === 'Dhurak') {
      baseInventory.special.push({
        name: 'Helm of Vitality',
        type: 'special',
        price: 250
      });
    } else if (selectedRace === 'Elarin') {
      baseInventory.special.push({
        name: 'Forest Amulet',
        type: 'special',
        price: 250
      });
    } else if (selectedRace === 'Felarii') {
      baseInventory.special.push({
        name: 'Jungle Medallion',
        type: 'special',
        price: 250
      });
    }
  
    localStorage.setItem('playerInventory', JSON.stringify(baseInventory));
  }, [selectedRace]);
  

  const handleEnterCity = () => {
    if (audioRef?.current) {
      audioRef.current.pause(); // 🔇 Stop musikken når byen åpnes
    }

    if (selectedRace === 'Kavari') navigate('/city/thalmoor');
    else if (selectedRace === 'Dhurak') navigate('/city/grumhollow');
    else if (selectedRace === 'Elarin') navigate('/city/sylvarin');
    else if (selectedRace === 'Felarii') navigate('/city/nymrasha');
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
