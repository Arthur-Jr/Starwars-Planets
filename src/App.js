import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlanetProvider from './context/PlanetProvider';
import Main from './pages/MainPage';
import './CSS/App.scss';

function App() {
  return (
    <PlanetProvider>
      <Switch>
        <Route path="/planetfinder" component={ Main } />
      </Switch>
    </PlanetProvider>
  );
}

export default App;
