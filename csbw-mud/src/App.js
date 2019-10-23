import React from 'react';
import './App.css';
import Landing from './components/landing/Landing';
import Game from './components/game/Game';

function App() {
  return (
    <div className='main-wrapper-app'>
      <div className='component-wrapper'>
        {localStorage.getItem('token') ? <Game /> : <Landing />}
      </div>
    </div>
  );
}

export default App;
