import React from 'react';
import Map from './components/Map.jsx';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
import { VisualizerProvider } from './context/VisualizerContext';

const App = () => {
  return (
    <VisualizerProvider>
      <Analytics/>
      <Map/>
    </VisualizerProvider>
  );
};

export default App;