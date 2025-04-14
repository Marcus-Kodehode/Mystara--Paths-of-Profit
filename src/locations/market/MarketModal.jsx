import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MarketModal.module.css';
import marketData from './marketData';
import allItems from '../../data/items';
import ItemCard from '../../components/ItemCard';

const MarketModal = ({ onClose, city }) => {
  const [coins, setCoins] = useState(parseInt(localStorage.getItem('playerCoins')) || 0);
  const [flashItemId, setFlashItemId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const standardItems = marketData.standard?.items || [];
  const consumables = marketData.standard?.consumables || [];
  const cityMarket = marketData[city] || {};
  const { tradeGoods = [], specialItem } = cityMarket;

  const inventory = JSON.parse(localStorage.getItem('playerInventory')) || {
    items: [],
    consumables: [],
    special: [],
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleBuy = (item) => {
    const currentCoins = parseInt(localStorage.getItem('playerCoins'), 10) || 0;
    if (item.price > currentCoins) {
      showError('You do not have enough coins!');
      return;
    }

    const updatedInventory = { ...inventory };
    const itemWithPrice = { ...item };

    if (item.name.toLowerCase().includes('potion')) {
      updatedInventory.consumables.push(itemWithPrice);
    } else if (item.name.toLowerCase().includes('armor') || item.name.toLowerCase().includes('sword') || item.type === 'armor' || item.type === 'weapon') {
      updatedInventory.items.push(itemWithPrice);
    } else {
      updatedInventory.special.push(itemWithPrice);
    }

    localStorage.setItem('playerInventory', JSON.stringify(updatedInventory));
    localStorage.setItem('playerCoins', currentCoins - item.price);
    setCoins(currentCoins - item.price);
    triggerFlash(item.name);
  };

  const handleSell = (item, category) => {
    const updatedInventory = { ...inventory };
    updatedInventory[category] = updatedInventory[category].filter(i => i !== item);

    const currentCoins = parseInt(localStorage.getItem('playerCoins'), 10) || 0;
    const sellPrice = item.name === 'Rusty Sword' || item.name === 'Leather Tunic'
      ? 5
      : Math.floor((item.price || guessPrice(item.name)) / 2);

    localStorage.setItem('playerInventory', JSON.stringify(updatedInventory));
    localStorage.setItem('playerCoins', currentCoins + sellPrice);
    setCoins(currentCoins + sellPrice);
    triggerFlash(item.name);
  };

  const guessPrice = (name) => {
    const found = allItems[name];
    return found?.price || 0;
  };

  const triggerFlash = (name) => {
    setFlashItemId(name);
    setTimeout(() => setFlashItemId(null), 300);
  };

  return (
    <div className={styles.modalOverlay}>
      {errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
      <div className={`${styles.modalContent} marketScroll`}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2 className={styles.title}>{city} Market</h2>

        <div className={styles.contentLayout}>
          {/* SHOP */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Shop</h3>
            <div className={styles.section}>
              <Category title="Standard Items" items={standardItems} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} />
              <Category title="Consumables" items={consumables} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} />
              <Category title="Trade Goods" items={tradeGoods} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} />
              {specialItem && (
                <Category title="Special Item" items={[specialItem]} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} />
              )}
            </div>
          </div>

          {/* INVENTORY */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Your Inventory</h3>
              <div className={styles.coinsDisplay}>💰 {coins} coins</div>
            </div>

            <div className={styles.section}>
              <Category
                title="Items"
                items={inventory.items}
                onAction={(item) => handleSell(item, 'items')}
                actionLabel="Sell"
                isSell
                flashItemId={flashItemId}
                guessPrice={guessPrice}
              />
              <Category
                title="Consumables"
                items={inventory.consumables}
                onAction={(item) => handleSell(item, 'consumables')}
                actionLabel="Sell"
                isSell
                flashItemId={flashItemId}
                guessPrice={guessPrice}
              />
              <Category
                title="Special Items"
                items={inventory.special}
                onAction={(item) => handleSell(item, 'special')}
                actionLabel="Sell"
                isSell
                flashItemId={flashItemId}
                guessPrice={guessPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = ({ title, items, onAction, actionLabel, isSell = false, flashItemId, guessPrice = () => 0 }) => (
  <div className={styles.category}>
    <h3>{title}</h3>
    <div className={styles.grid}>
      {items.map((item, index) => {
        const price = isSell
          ? item.name === 'Rusty Sword' || item.name === 'Leather Tunic'
            ? 5
            : Math.floor((item.price || guessPrice(item.name)) / 2)
          : item.price;

        const itemData = allItems[item.name] || item;

        return (
          <ItemCard
            key={index}
            item={item}
            itemData={itemData}
            isSell={isSell}
            onAction={() => onAction(item)}
            actionLabel={actionLabel}
            isFlashing={flashItemId === item.name}
            priceOverride={price}
          />
        );
      })}
    </div>
  </div>
);

export default MarketModal;
