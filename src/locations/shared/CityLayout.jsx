import React from 'react';
import styles from './CityLayout.module.css';

const CityLayout = ({ cityName, description, backgroundImage, children }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>{cityName}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CityLayout;
