import styles from './GameHUD.module.css';

function GameHUD({ playerName, coins, health, stamina, onInventoryToggle }) {
  return (
    <div className={styles.hud}>
      <div className={styles.left}>
        <div className={styles.stat}>❤️ {health} / 100</div>
        <div className={styles.stat}>⚡ {stamina} / 100</div>
        <div className={styles.stat}>💰 {coins}</div>
      </div>
      <div className={styles.right}>
        <span className={styles.player}>Trader: {playerName}</span>
        <button className={styles.inventoryBtn} onClick={onInventoryToggle}>Inventory</button>
      </div>
    </div>
  );
}

export default GameHUD;
