import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Main from './pages/MainPage';

function App() {
  return (
    <PlanetProvider>
      <Main />
    </PlanetProvider>
  );
}

export default App;
