import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import RaceSelect from './screens/RaceSelect';
import GameStart from './screens/GameStart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/select-race" element={<RaceSelect />} />
        <Route path="/start" element={<GameStart />} /> {/* <-- Flyttet inn her */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
