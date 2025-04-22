import React, { useState, useEffect } from 'react';
import styles from './MarketModal.module.css';
import marketData from './marketData';
import allItems from '../../data/items';
import ItemCard from '../../components/ItemCard';
import { generateMarketPrices } from '../../utils/priceUtils';

const MarketModal = ({ onClose, city }) => {
  const [coins, setCoins] = useState(parseInt(localStorage.getItem('playerCoins')) || 0);
  const [flashItemId, setFlashItemId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [marketPrices, setMarketPrices] = useState({});

  const inventory = JSON.parse(localStorage.getItem('playerInventory')) || {
    items: [],
    consumables: [],
    special: [],
  };

  const cityMarket = marketData[city] || {};
  const { specialItem } = cityMarket;

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    const storedPrices = JSON.parse(localStorage.getItem('marketPrices') || '{}');
    if (!storedPrices[city]) {
      const newPrices = generateMarketPrices(city);
      const updated = { ...storedPrices, [city]: newPrices };
      localStorage.setItem('marketPrices', JSON.stringify(updated));
      setMarketPrices(updated[city]);
    } else {
      setMarketPrices(storedPrices[city]);
    }
  }, [city]);

  const handleBuy = (item) => {
    const price = marketPrices[item.name]?.price || item.price;
    if (price > coins) return showError('Not enough coins.');

    const updatedInventory = { ...inventory };
    const boughtItem = {
      ...item,
      price,
      boughtAt: city,
      origin: item.origin || (marketData[city]?.tradeGoods || []).find(i => i.name === item.name)?.origin,
    };

    if (item.name.toLowerCase().includes('potion')) {
      updatedInventory.consumables.push(boughtItem);
    } else if (item.name.toLowerCase().includes('sword') || item.name.toLowerCase().includes('armor')) {
      updatedInventory.items.push(boughtItem);
    } else {
      updatedInventory.special.push(boughtItem);
    }

    localStorage.setItem('playerInventory', JSON.stringify(updatedInventory));
    localStorage.setItem('playerCoins', coins - price);
    setCoins(coins - price);
    window.dispatchEvent(new Event('statsChanged'));
    triggerFlash(item.name);
  };

  const handleSell = (item, category) => {
    const updatedInventory = { ...inventory };
    updatedInventory[category] = updatedInventory[category].filter(i => i !== item);
    const currentCoins = parseInt(localStorage.getItem('playerCoins'), 10) || 0;

    let sellPrice = 0;

    if (item.name === 'Rusty Sword' || item.name === 'Leather Tunic') {
      sellPrice = 5;
    } else if (category === 'special' && item.boughtAt) {
      const isLocal = (marketData[city]?.tradeGoods || []).some(i => i.name === item.name);
      sellPrice = Math.floor((item.price || 0) * (isLocal ? 2 : 4));
    } else {
      sellPrice = Math.floor((item.price || guessPrice(item.name)) / 2);
    }

    localStorage.setItem('playerInventory', JSON.stringify(updatedInventory));
    localStorage.setItem('playerCoins', currentCoins + sellPrice);
    setCoins(currentCoins + sellPrice);
    window.dispatchEvent(new Event('statsChanged'));
    triggerFlash(item.name);
  };

  const guessPrice = (name) => {
    const item = allItems[name];
    return item?.price || 0;
  };

  const triggerFlash = (id) => {
    setFlashItemId(id);
    setTimeout(() => setFlashItemId(null), 300);
  };

  const buildItems = (type) => {
    const base = marketData.standard?.[type] || [];
    return base.map(item => ({
      ...item,
      price: marketPrices[item.name]?.price || item.price,
      suggestedSell: marketPrices[item.name]?.suggestedSell || (item.price * 2),
    }));
  };

  const tradeGoods = (marketData[city]?.tradeGoods || []).map(item => ({
    ...item,
    price: marketPrices[item.name]?.price || item.price,
    suggestedSell: marketPrices[item.name]?.suggestedSell || (item.price * 2),
  }));

  return (
    <div className={styles.modalOverlay}>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <div className={`${styles.modalContent} marketScroll`}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2 className={styles.title}>{city} Market</h2>

        <div className={styles.contentLayout}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Shop</h3>
            <div className={styles.section}>
              <Category title="Standard Items" items={buildItems('items')} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} city={city} />
              <Category title="Consumables" items={buildItems('consumables')} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} city={city} />
              <Category title="Trade Goods" items={tradeGoods} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} city={city} />
              {specialItem && (
                <Category title="Special Item" items={[specialItem]} onAction={handleBuy} actionLabel="Buy" flashItemId={flashItemId} city={city} />
              )}
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Your Inventory</h3>
              <div className={styles.coinsDisplay}>💰 {coins} coins</div>
            </div>
            <div className={styles.section}>
              <Category title="Items" items={inventory.items} onAction={(i) => handleSell(i, 'items')} actionLabel="Sell" isSell flashItemId={flashItemId} city={city} />
              <Category title="Consumables" items={inventory.consumables} onAction={(i) => handleSell(i, 'consumables')} actionLabel="Sell" isSell flashItemId={flashItemId} city={city} />
              <Category title="Special Items" items={inventory.special} onAction={(i) => handleSell(i, 'special')} actionLabel="Sell" isSell flashItemId={flashItemId} city={city} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = ({ title, items, onAction, actionLabel, isSell = false, flashItemId, city }) => (
  <div className={styles.category}>
    <h3>{title}</h3>
    <div className={styles.grid}>
      {items.map((item, index) => {
        const itemData = allItems[item.name] || {};
        let priceOverride = null;

        if (isSell) {
          if (item.name === 'Rusty Sword' || item.name === 'Leather Tunic') {
            priceOverride = 5;
          } else if (title === 'Special Items' && item.boughtAt) {
            const isLocal = (marketData[city]?.tradeGoods || []).some(i => i.name === item.name);
            const multiplier = isLocal ? 2 : 4;
            priceOverride = Math.floor(item.price * multiplier);
          } else {
            priceOverride = Math.floor((item.price || itemData.price || 0) / 2);
          }
        }

        return (
          <ItemCard
            key={index}
            item={item}
            itemData={itemData}
            isSell={isSell}
            onAction={onAction}
            actionLabel={actionLabel}
            isFlashing={flashItemId === item.name}
            context="market"
            priceOverride={priceOverride}
          />
        );
      })}
    </div>
  </div>
);

export default MarketModal;
