import React from 'react';
import styles from './MarketModal.module.css';
import marketData from './marketData';

const MarketModal = ({ onClose, city }) => {
  const standardItems = marketData.standard?.items || [];
  const consumables = marketData.standard?.consumables || [];

  const cityMarket = marketData[city] || {};
  const { tradeGoods = [], specialItem } = cityMarket;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} marketScroll`}>
        <h2 className={styles.title}>{city} Market</h2>

        {/* Standard Items */}
        <div className={styles.category}>
          <h3>Standard Items</h3>
          <div className={styles.grid}>
            {standardItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>{item.price} coins</div>
                <button className={styles.buyButton}>Buy</button>
              </div>
            ))}
          </div>
        </div>

        {/* Consumables */}
        <div className={styles.category}>
          <h3>Consumables</h3>
          <div className={styles.grid}>
            {consumables.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>{item.price} coins</div>
                <button className={styles.buyButton}>Buy</button>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Goods */}
        <div className={styles.category}>
          <h3>Trade Goods</h3>
          <div className={styles.grid}>
            {tradeGoods.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>{item.price} coins</div>
                <button className={styles.buyButton}>Buy</button>
              </div>
            ))}
          </div>
        </div>

        {/* Special Item */}
        {specialItem && (
          <div className={styles.category}>
            <h3>Special Item</h3>
            <div className={styles.grid}>
              <div className={styles.item}>
                <div className={styles.itemName}>{specialItem.name}</div>
                <div className={styles.itemPrice}>{specialItem.price} coins</div>
                <button className={styles.buyButton}>Buy</button>
              </div>
            </div>
          </div>
        )}

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MarketModal;
