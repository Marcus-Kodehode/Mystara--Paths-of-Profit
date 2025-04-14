import React from 'react';
import styles from './ItemCard.module.css';

const ItemCard = ({
  item,
  itemData = {},
  isSell = false,
  context = 'inventory', // 'market' or 'inventory'
  onAction,
  actionLabel = '',
  isFlashing = false,
}) => {
  const cardStyle = `${styles.card} ${styles[context]} ${isFlashing ? styles.flash : ''}`;

  const displayEffect = itemData.effect || '';
  const displayDescription = itemData.description || '';
  const imageSrc = itemData.image || '';

  const price = isSell
    ? item.name === 'Rusty Sword' || item.name === 'Leather Tunic'
      ? 5
      : Math.floor((item.price || itemData.price || 0) / 2)
    : item.price || itemData.price;

  return (
    <div className={cardStyle}>
      {imageSrc && <img src={imageSrc} alt={item.name} className={styles.itemImage} />}

      <div className={styles.name}>{item.name}</div>

      {displayEffect && <div className={styles.effect}>{displayEffect}</div>}
      {displayDescription && <div className={styles.description}>{displayDescription}</div>}

      {price && (
        <div className={styles.price}>
          {isSell ? `Sell for ${price} coins` : `${price} coins`}
        </div>
      )}

      {onAction && (
        <button
          className={styles.actionButton}
          onClick={() => onAction(item)}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ItemCard;
