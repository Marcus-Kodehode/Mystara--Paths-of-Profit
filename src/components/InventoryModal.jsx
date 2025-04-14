import React, { useState } from 'react';
import styles from './InventoryModal.module.css';
import allItems from '../data/items'; // ✅ Går ett nivå opp til data
import ItemCard from './ItemCard'; // ✅ Ligger i samme mappe (components)


const InventoryModal = ({ items, onClose }) => {
  const [usedItem, setUsedItem] = useState(null);

  const handleUse = (item) => {
    // Dummy-effekt nå – her kan du implementere effekter som +50 HP osv.
    setUsedItem(item.name);
    setTimeout(() => setUsedItem(null), 1000);

    // Fjern item etter bruk
    const currentInventory = JSON.parse(localStorage.getItem('playerInventory')) || {
      items: [],
      consumables: [],
      special: [],
    };

    const updatedConsumables = currentInventory.consumables.filter(i => i !== item);
    currentInventory.consumables = updatedConsumables;
    localStorage.setItem('playerInventory', JSON.stringify(currentInventory));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} inventoryScroll`}>
        <h2 className={styles.title}>Inventory</h2>

        {/* ITEMS */}
        <div className={styles.category}>
          <h3>Items</h3>
          <div className={styles.grid}>
            {items.items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                itemData={allItems[item.name]}
                isSell={false}
              />
            ))}
          </div>
        </div>

        {/* CONSUMABLES */}
        <div className={styles.category}>
          <h3>Consumables</h3>
          <div className={styles.grid}>
            {items.consumables.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                itemData={allItems[item.name]}
                isSell={false}
                onAction={handleUse}
                actionLabel={usedItem === item.name ? 'Used!' : 'Use'}
              />
            ))}
          </div>
        </div>

        {/* SPECIAL ITEMS */}
        <div className={styles.category}>
          <h3>Special Items</h3>
          <div className={styles.grid}>
            {items.special.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                itemData={allItems[item.name]}
                isSell={false}
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
};

export default InventoryModal;
