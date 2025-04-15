import React from 'react';
import styles from './TravelModal.module.css';
import travelRoutes from '../../data/travel/travelRoutes';

const TravelModal = ({ city, onClose, onTravel }) => {
  const routes = travelRoutes[city] || [];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Choose Destination</h2>
        {routes.length === 0 ? (
          <p>No destinations available from {city} yet.</p>
        ) : (
          <div className={styles.grid}>
            {routes.map((route, index) => (
              <div key={index} className={styles.card}>
                {route.image && (
                  <div className={styles.imageWrapper}>
                    <img
                      src={route.image}
                      alt={route.name}
                      className={styles.locationImage}
                    />
                  </div>
                )}
                <div className={styles.name}>{route.name}</div>
                <div className={styles.description}>{route.description}</div>
                <div className={styles.danger}><strong>Danger Level:</strong> {route.danger}</div>
                <button className={styles.travelButton} onClick={() => onTravel(route.path)}>
                  Travel
                </button>
              </div>
            ))}
          </div>
        )}
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TravelModal;
