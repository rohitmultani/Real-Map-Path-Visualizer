import React from 'react';
import Map from './components/Map.jsx';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
import { VisualizerProvider } from './context/VisualizerContext';
import Intro from './components/Intro.jsx';
const App = () => {
  return (
    <VisualizerProvider>
      <Analytics/>
      <Intro />
      <Map id = "#map"/>
    </VisualizerProvider>
  );
};

export default App;