import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import StartScreen from './screens/StartScreen';
import RaceSelect from './screens/RaceSelect';
import GameStart from './screens/GameStart';
import Thalmoor from './locations/mainCities/Thalmoor';
import AudioContext from './locations/shared/AudioContext';

function AudioProvider({ children }) {
  const audioRef = useRef(new Audio('/sounds/theme.mp3'));
  const location = useLocation();

  const shouldPlay =
    location.pathname === '/select-race' || location.pathname === '/start';

  useEffect(() => {
    const audio = audioRef.current;
    if (shouldPlay) {
      audio.volume = 0.5;
      audio.loop = true;
      audio.play().catch((err) =>
        console.warn('Theme music play failed:', err)
      );
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [shouldPlay]);

  const contextValue = {
    playTheme: () => audioRef.current.play(),
    stopTheme: () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    },
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/select-race" element={<RaceSelect />} />
      <Route path="/start" element={<GameStart />} />
      <Route path="/city/thalmoor" element={<Thalmoor />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <AppRoutes />
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
