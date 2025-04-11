import React from 'react';
import styles from './InventoryModal.module.css';

const InventoryModal = ({ items, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} inventoryScroll`}>
        <h2>Inventory</h2>

        {/* Items Category */}
        <div className={styles.category}>
          <h3>ITEMS</h3>
          <div className={styles.itemsContainer}>
            {items.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemEffect}>
                  {item.name === 'Rusty Sword'
                    ? 'Deals 10 damage'
                    : item.name === 'Leather Tunic'
                    ? 'Provides basic protection'
                    : null}
                </div>
                <div className={styles.itemDescription}>
                  {item.name === 'Rusty Sword'
                    ? 'This is a very dull blade, could hardly hurt anyone.'
                    : item.name === 'Leather Tunic'
                    ? 'A simple piece of armor that offers minimal protection.'
                    : null}
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
                  {item.name === 'Health Potion'
                    ? 'Restores 50 health'
                    : item.name === 'Stamina Potion'
                    ? 'Restores 50 stamina'
                    : null}
                </div>
                <div className={styles.itemDescription}>
                  {item.name === 'Health Potion'
                    ? 'A lifeline in battle, restores health.'
                    : item.name === 'Stamina Potion'
                    ? 'Helps you move faster, restores stamina.'
                    : null}
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
          {item.name === 'Spice Pack' ? 'Can be sold for double its value in Kavari settlements.' :
           item.name === 'Helm of Vitality' ? 'Restores 25–50 health upon arriving in a new settlement.' :
           item.name === 'Forest Amulet' ? 'Increases both stamina and health by 25.' :
           item.name === 'Jungle Medallion' ? 'Effect unknown.' :
           null}
        </div>
        <div className={styles.itemDescription}>
          {item.name === 'Spice Pack'
            ? 'A fragrant collection of rare desert spices, cherished by merchants across the dunes. In Kavari markets, these scents awaken memories—and open purses.'
            : item.name === 'Helm of Vitality'
            ? 'A relic of the forge-kin, this helm pulses with ancestral strength. Those who wear it feel a warm surge of resilience each time they reach safety.'
            : item.name === 'Forest Amulet'
            ? 'Woven from enchanted ivy and silver blessed under starlight, this amulet radiates calm and vitality. It strengthens the bond between body and nature.'
            : item.name === 'Jungle Medallion'
            ? 'An old Felarii token etched with forgotten symbols. Traders speak in hushed tones of those who carry it returning safely from treacherous journeys... but none know exactly why.'
            : null}
        </div>
      </div>
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
