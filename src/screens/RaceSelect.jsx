import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RaceSelect.module.css';

const races = [
  {
    name: 'Kavari',
    description: 'A cosmopolitan desert people known for trade and culture.',
    traits: [
      { type: 'positive', text: 'Higher chance of positive travel events' },
      { type: 'positive', text: 'Sells for higher prices outside Thalmoor' },
      { type: 'negative', text: 'Consumes more resources while traveling' }
    ]
  },
  {
    name: 'Dhurak',
    description: 'Mountain dwellers with unmatched strength and craftsmanship.',
    traits: [
      { type: 'positive', text: 'Better prices for metal and weapon items' },
      { type: 'positive', text: 'Increased health' },
      { type: 'negative', text: 'Slower travel speed between towns' }
    ]
  },
  {
    name: 'Elarin',
    description: 'Mystical elves in harmony with the forest and magic.',
    traits: [
      { type: 'positive', text: 'Better chance for positive travel events' },
      { type: 'positive', text: 'Increased travel speed between towns' },
      { type: 'negative', text: 'Worse prices outside Elarin regions' }
    ]
  },
  {
    name: 'Felarii',
    description: 'Cat-like nomads and smugglers, quick and clever.',
    traits: [
      { type: 'positive', text: 'Can trade unique smuggler goods' },
      { type: 'positive', text: 'Higher chance of positive events' },
      { type: 'negative', text: 'Higher prices in most towns' }
    ]
  }
];

function RaceSelect() {
  const [selectedRace, setSelectedRace] = useState(null);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Start temamusikk når RaceSelect mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio
        .play()
        .then(() => console.log('Theme music started in RaceSelect'))
        .catch((err) => console.warn('Audio play error in RaceSelect:', err));
    }
  }, []);

  const handleRaceSelect = (raceName) => {
    setSelectedRace(raceName);
    setNickname(''); // Tømmer tidligere input ved nytt valg
  };

  const handleConfirm = () => {
    if (!nickname.trim()) return;
    localStorage.setItem('selectedRace', selectedRace);
    localStorage.setItem('playerNickname', nickname);
    // Naviger videre til GameStart (musikk stoppes eventuelt i GameStart, avhengig av implementasjon)
    navigate('/start');
  };

  return (
    <div className={styles.container}>
      {/* Global temamusikk for RaceSelect */}
      <audio ref={audioRef} loop>
        <source src="/sounds/theme.mp3" type="audio/mpeg" />
      </audio>

      <div className={styles.coinsContainer}>
        {[...Array(25)].map((_, i) => (
          <img
            key={`set1-${i}`}
            src="/images/coin.png"
            alt="coin"
            className={styles.coin}
            style={{
              top: '100%',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        {[...Array(25)].map((_, i) => (
          <img
            key={`set2-${i}`}
            src="/images/coin.png"
            alt="coin"
            className={styles.coin}
            style={{
              top: '100%',
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5 + 5}s`
            }}
          />
        ))}
      </div>

      <h1 className={styles.title}>Choose Your Race</h1>

      <div className={styles.grid}>
        {races.map((race) => (
          <div key={race.name} className={styles.card}>
            <h2>{race.name}</h2>
            <img
              src={`/images/${race.name}.webp`}
              alt={race.name}
              className={styles.raceImage}
            />
            <p className={styles.description}>{race.description}</p>
            <ul className={styles.traits}>
              {race.traits.map((trait, i) => (
                <li key={i} className={styles[trait.type]}>
                  {trait.type === 'positive' ? '🟢' : '🔴'} {trait.text}
                </li>
              ))}
            </ul>

            {selectedRace === race.name ? (
              <div className={styles.confirmBox}>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  placeholder="Enter nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={styles.input}
                />
                <button
                  className={styles.selectButton}
                  onClick={handleConfirm}
                  disabled={!nickname.trim()}
                >
                  Continue
                </button>
              </div>
            ) : (
              <button
                className={styles.selectButton}
                onClick={() => handleRaceSelect(race.name)}
              >
                Select
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RaceSelect;
