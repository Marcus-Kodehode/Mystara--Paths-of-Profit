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
}) {
  const cardClass = [
    styles.card,
    styles[context],
    isFlashing ? styles.flash : ''
  ].filter(Boolean).join(' ');

  const name = item.name;
  const effect      = itemData.effect      || '';
  const description = itemData.description || '';
  const imageSrc    = itemData.image       || '';

  const basePrice = itemData.price ?? item.price ?? 0;
  const price = isSell
    ? (name === 'Rusty Sword' || name === 'Leather Tunic'
        ? 5
        : Math.floor(basePrice / 2))
    : basePrice;

  const label = actionLabel || (isSell ? 'Sell' : 'Use');

  return (
    <div className={cardClass}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={name}
          className={styles.itemImage}
        />
      )}

      <div className={styles.name}>{name}</div>
      {effect && <div className={styles.effect}>{effect}</div>}
      {description && <div className={styles.description}>{description}</div>}
      {price > 0 && (
        <div className={styles.price}>
          {isSell ? `Sell for ${price} coins` : `${price} coins`}
        </div>
      )}

      {onAction && (
        <button
          className={styles.actionButton}
          onClick={() => {
            console.log('[ItemCard] onAction click for:', name);
            onAction(item);
          }}
          disabled={actionLabel === 'Used!'}
        >
          {label}
        </button>
      )}
    </div>
  );
}
