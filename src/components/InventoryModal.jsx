import React from 'react';
import styles from './InventoryModal.module.css';

const InventoryModal = ({ items, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Inventory</h2>

        {/* Items Category */}
        <div className={styles.category}>
          <h3>ITEMS</h3>
          <div className={styles.itemsContainer}>
            {items.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemEffect}>
                  {item.name === 'Rusty Sword' ? 'Deals 10 damage' :
                  item.name === 'Leather Tunic' ? 'Provides basic protection' : null}
                </div>
                <div className={styles.itemDescription}>
                  {item.name === 'Rusty Sword' ? 'This is a very dull blade, could hardly hurt anyone.' :
                  item.name === 'Leather Tunic' ? 'A simple piece of armor that offers minimal protection.' : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumables Category */}
        <div className={styles.category}>
          <h3>CONSUMABLES</h3>
          <div className={styles.itemsContainer}>
            {items.consumables.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemEffect}>
                  {item.name === 'Health Potion' ? 'Restores 50 health' :
                  item.name === 'Stamina Potion' ? 'Restores 50 stamina' : null}
                </div>
                <div className={styles.itemDescription}>
                  {item.name === 'Health Potion' ? 'A lifeline in battle, restores health.' :
                  item.name === 'Stamina Potion' ? 'Helps you move faster, restores stamina.' : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Items Category */}
        <div className={styles.category}>
          <h3>SPECIAL ITEMS</h3>
          <div className={styles.itemsContainer}>
            {items.special.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemEffect}>
                  {item.name === 'Forest Amulet' ? 'Increases stamina by 25' : null}
                </div>
                <div className={styles.itemDescription}>
                  {item.name === 'Forest Amulet' ? 'A magical amulet that enhances stamina.' : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InventoryModal;
