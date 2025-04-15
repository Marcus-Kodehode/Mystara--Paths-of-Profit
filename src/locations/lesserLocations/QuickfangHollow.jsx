import React, { useEffect, useRef, useState } from 'react';
import CityLayout from '../shared/CityLayout';
import styles from './QuickfangHollow.module.css';
import GameHUD from '../../components/GameHUD';
import InventoryModal from '../../components/InventoryModal';
import MarketModal from '../market/MarketModal'

const QuickfangHollow = () => {
  return (
    <div style={{ padding: '2rem', color: '#fbeec1', fontFamily: 'Cinzel Decorative, serif' }}>
      <h1>Quickfang Hollow</h1>
      <p>This is a temporary view for Quickfang Hollow.</p>
    </div>
  );
};

export default QuickfangHollow;
