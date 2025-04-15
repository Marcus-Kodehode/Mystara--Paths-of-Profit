import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './IrvathGlade.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal'

const IrvathGlade = () => {
  return (
    <div style={{ padding: '2rem', color: '#fbeec1', fontFamily: 'Cinzel Decorative, serif' }}>
      <h1>Irvath Glade</h1>
      <p>This is a temporary view for Irvath Glade.</p>
    </div>
  );
};

export default IrvathGlade;
