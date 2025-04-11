import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import RaceSelect from './screens/RaceSelect';
import GameStart from './screens/GameStart';
import Thalmoor from './locations/mainCities/Thalmoor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/select-race" element={<RaceSelect />} />
        <Route path="/start" element={<GameStart />} /> {/* <-- Flyttet inn her */}
        <Route path="/city/thalmoor" element={<Thalmoor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
