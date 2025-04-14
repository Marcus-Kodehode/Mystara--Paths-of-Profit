import { createContext } from 'react';

const AudioContext = createContext({
  playTheme: () => {},
  stopTheme: () => {},
});

export default AudioContext;
