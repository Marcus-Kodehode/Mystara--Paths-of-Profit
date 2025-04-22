import React from 'react';
import styles from './ItemCard.module.css';

export default function ItemCard({
  item,
  itemData = {},
  isSell = false,
  context = 'inventory',
  onAction,
  actionLabel = '',
  isFlashing = false,
  priceOverride = null,
}) {
  const cardClass = [
    styles.card,
    styles[context],
    isFlashing ? styles.flash : ''
  ].filter(Boolean).join(' ');

  const name        = item.name;
  const effect      = itemData.effect      || '';
  const description = itemData.description || '';
  const imageSrc    = itemData.image       || '';

  const basePrice = priceOverride ?? item.price ?? itemData.price ?? 0;
  const displayPrice = isSell ? basePrice : basePrice;
  const label = actionLabel || (isSell ? 'Sell' : 'Use');

  return (
    <div className={cardClass}>
      {imageSrc && <img src={imageSrc} alt={name} className={styles.itemImage} />}
      <div className={styles.name}>{name}</div>
      {effect && <div className={styles.effect}>{effect}</div>}
      {description && <div className={styles.description}>{description}</div>}

      {displayPrice > 0 && (
        <div className={styles.price}>
          {isSell ? `Sell for ${displayPrice} coins` : `${displayPrice} coins`}
        </div>
      )}

      {!isSell && item.suggestedSell && (
        <div className={styles.suggestedPrice}>
          Suggested resale: {item.suggestedSell} coins
        </div>
      )}

      {onAction && (
        <button
          className={styles.actionButton}
          onClick={() => onAction(item)}
          disabled={actionLabel === 'Used!'}
        >
          {label}
        </button>
      )}
    </div>
  );
}
