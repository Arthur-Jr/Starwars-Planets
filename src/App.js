import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Main from './pages/MainPage';
import './CSS/App.scss';

function App() {
  return (
    <PlanetProvider>
      <Main />
    </PlanetProvider>
  );
}

export default App;
