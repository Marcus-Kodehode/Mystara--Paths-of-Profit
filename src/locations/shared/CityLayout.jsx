import React from 'react';
import styles from './CityLayout.module.css';

const CityLayout = ({ backgroundImage, children }) => {
  return (
    <div
      className={styles.cityContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

export default CityLayout;
