import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import StartScreen from './screens/StartScreen';
import RaceSelect from './screens/RaceSelect';
import GameStart from './screens/GameStart';
import GameOver from './components/GameOver';
import Thalmoor from './locations/mainCities/Thalmoor';
import Grumhollow from './locations/mainCities/Grumhollow';
import Sylvarin from './locations/mainCities/Sylvarin';
import NymRasha from './locations/mainCities/NymRasha';
import AudioContext from './locations/shared/AudioContext';
import RedBasin from './locations/lesserLocations/RedBasin';
import Runebreak from './locations/lesserLocations/Runebreak';
import IrvathGlade from './locations/lesserLocations/IrvathGlade';
import QuickfangHollow from './locations/lesserLocations/QuickfangHollow';


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
      <Route path="/game-over" element={<GameOver />} />
      <Route path="/city/thalmoor" element={<Thalmoor />} />
      <Route path="/city/grumhollow" element={<Grumhollow />} />
      <Route path="/city/sylvarin" element={<Sylvarin />} />
      <Route path="/city/nymrasha" element={<NymRasha />} />
      <Route path="/lesserLocations/redbasin" element={<RedBasin />} />
      <Route path="/lesserLocations/runebreak" element={<Runebreak />} />
      <Route path="/lesserLocations/irvathglade" element={<IrvathGlade />} />
      <Route path="/lesserLocations/quickfanghollow" element={<QuickfangHollow />} />
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
