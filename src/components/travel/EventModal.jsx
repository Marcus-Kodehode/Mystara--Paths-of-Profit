// src/components/travel/EventModal.jsx
import React from 'react';
import styles from './EventModal.module.css';

const EventModal = ({ event, onContinue }) => {
  const effects = [];
  if (event.healthDelta) {
    effects.push({
      label: 'Health',
      delta: event.healthDelta,
      className: event.healthDelta > 0 ? styles.pos : styles.neg,
    });
  }
  if (event.staminaDelta) {
    effects.push({
      label: 'Stamina',
      delta: event.staminaDelta,
      className: event.staminaDelta > 0 ? styles.pos : styles.neg,
    });
  }
  if (event.goldDelta) {
    effects.push({
      label: 'Gold',
      delta: event.goldDelta,
      className: event.goldDelta > 0 ? styles.pos : styles.neg,
    });
  }
  if (event.dayDelta) {
    effects.push({
      label: 'Days',
      delta: event.dayDelta,
      className: event.dayDelta > 0 ? styles.neg : styles.pos,
    });
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {event.image && (
          <div className={styles.imageWrapper}>
            <img
              src={event.image}
              alt={event.title}
              className={styles.image}
            />
          </div>
        )}
        <h2 className={styles.title}>{event.title}</h2>
        <p className={styles.description}>{event.description}</p>

        {effects.length > 0 && (
          <div className={styles.stats}>
            {effects.map((e, i) => (
              <div key={i} className={`${styles.effect} ${e.className}`}>
                {e.delta > 0 ? '+' : ''}
                {e.delta} {e.label}
              </div>
            ))}
          </div>
        )}

        <button
          className={styles.continueButton}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EventModal;
