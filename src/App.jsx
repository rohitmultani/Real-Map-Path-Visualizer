import React from 'react';
import Map from './components/Map.jsx';
import './App.css';
import NavBar from './components/NavBar.jsx';
import { VisualizerProvider } from './context/VisualizerContext';

const App = () => {
  return (
    <VisualizerProvider>
      {/* <NavBar/> */}
      <Map/>
    </VisualizerProvider>
  );
};

export default App;