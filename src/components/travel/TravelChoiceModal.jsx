// src/components/travel/TravelChoiceModal.jsx
import React from 'react';
import styles from './TravelChoiceModal.module.css';

const TravelChoiceModal = ({
  cityName,
  daysLeft,
  onClose,
  onChoose
}) => (
  <div className={styles.modalOverlay}>
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
