import React from 'react';
import './App.scss';
import LocationSelect from './components/LocationSelect/LocationSelect';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <LocationSelect />
      </div>
    </div>
  );
}

export default App;
