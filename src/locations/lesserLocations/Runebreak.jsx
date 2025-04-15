import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './Runebreak.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal'

const Runebreak = () => {
  return (
    <CityLayout
      cityName="Runebreak"
      description="Placeholder for Runebreak"
      backgroundImage="/images/settlements/runebreak.png"
    >
      <div className={styles.cityHeader}>
        <h1 className={styles.cityName}>Runebreak</h1>
        <p className={styles.cityDescription}>Cracked paths and ancient ruins lie ahead.</p>
      </div>
    </CityLayout>
  );
};

export default Runebreak;
