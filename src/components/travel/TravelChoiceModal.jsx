import React from 'react';
import styles from './TravelChoiceModal.module.css';
import GameHUD from '../GameHUD';
import InventoryModal from '../InventoryModal';

const TravelChoiceModal = ({
  cityName,
  daysLeft,
  health, stamina, coins,
  items,
  isInventoryOpen,
  onInventoryToggle,
  onClose,
  onChoose
}) => (
  <div className={styles.modalOverlay}>
    {/* HUD + toggle inventar */}
    <GameHUD
      health={health}
      stamina={stamina}
      coins={coins}
      onInventoryToggle={onInventoryToggle}
    />
    {isInventoryOpen && <InventoryModal items={items} onClose={onInventoryToggle} />}

    <div className={styles.modalContent}>
      <h2 className={styles.title}>Traveling to {cityName}</h2>
      <p className={styles.days}>Days remaining: {daysLeft}</p>

      <div className={styles.buttonGroup}>
        <button
          className={styles.choiceButton}
          onClick={() => onChoose('safe')}
        >
          Safe Route
        </button>
        <button
          className={styles.choiceButton}
          onClick={() => onChoose('risky')}
        >
          Risky Route
        </button>
        <button
          className={styles.choiceButton}
          onClick={() => onChoose('camp')}
        >
          Make Camp
        </button>
      </div>

      <button className={styles.closeButton} onClick={onClose}>
        Cancel
      </button>
    </div>
  </div>
);

export default TravelChoiceModal;
