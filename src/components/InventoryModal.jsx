// src/components/InventoryModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './InventoryModal.module.css';
import allItems from '../data/items';
import ItemCard from './ItemCard';
import { updatePlayerStats } from '../utils/playerUtils';

export default function InventoryModal({ items, onClose }) {
  // Lag en lokal kopi av inventaret slik at UI kan oppdateres umiddelbart
  const [localInv, setLocalInv] = useState({
    items:       [],
    consumables: [],
    special:     [],
  });
  const [usedItem, setUsedItem] = useState(null);

  // Når komponenten mountes, initialiser localInv fra props
  useEffect(() => {
    setLocalInv({
      items:       items.items || [],
      consumables: items.consumables || [],
      special:     items.special || [],
    });
  }, [items]);

  const handleUse = (item) => {
    console.log('[InventoryModal] handleUse called for:', item.name);

    // Bestem effekter
    let healthDelta = 0;
    let staminaDelta = 0;
    if (item.name === 'Health Potion') {
      healthDelta = 50;
    } else if (item.name === 'Stamina Potion') {
      staminaDelta = 50;
    }

    // Oppdater stats i localStorage
    console.log('[InventoryModal] Stats before:', {
      health: localStorage.getItem('playerHealth'),
      stamina: localStorage.getItem('playerStamina'),
    });
    updatePlayerStats({ healthDelta, staminaDelta, goldDelta: 0 });
    console.log('[InventoryModal] Stats after:', {
      health: localStorage.getItem('playerHealth'),
      stamina: localStorage.getItem('playerStamina'),
    });

    // Fjern potion fra localInv
    setLocalInv((prev) => {
      const newConsum = prev.consumables.filter((c) => c.name !== item.name);
      console.log('[InventoryModal] Removing from consumables:', item.name);
      return { ...prev, consumables: newConsum };
    });

    // Oppdater også localStorage-inventar
    const stored = JSON.parse(localStorage.getItem('playerInventory')) || {
      items: [], consumables: [], special: []
    };
    stored.consumables = stored.consumables.filter((c) => c.name !== item.name);
    localStorage.setItem('playerInventory', JSON.stringify(stored));

    // Flash knappen
    setUsedItem(item.name);
    setTimeout(() => setUsedItem(null), 1000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} inventoryScroll`}>
        <h2 className={styles.title}>Inventory</h2>

        {/* ITEMS */}
        <div className={styles.category}>
          <h3>Items</h3>
          <div className={styles.grid}>
            {localInv.items.map((itm, i) => (
              <ItemCard
                key={i}
                item={itm}
                itemData={allItems[itm.name]}
                isSell={false}
                context="inventory"
              />
            ))}
          </div>
        </div>

        {/* CONSUMABLES */}
        <div className={styles.category}>
          <h3>Consumables</h3>
          <div className={styles.grid}>
            {localInv.consumables.map((itm, i) => (
              <ItemCard
                key={i}
                item={itm}
                itemData={allItems[itm.name]}
                isSell={false}
                context="inventory"
                onAction={handleUse}
                actionLabel={usedItem === itm.name ? 'Used!' : 'Use'}
              />
            ))}
          </div>
        </div>

        {/* SPECIAL ITEMS */}
        <div className={styles.category}>
          <h3>Special Items</h3>
          <div className={styles.grid}>
            {localInv.special.map((itm, i) => (
              <ItemCard
                key={i}
                item={itm}
                itemData={allItems[itm.name]}
                isSell={false}
                context="inventory"
              />
            ))}
          </div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
