import React from 'react';
import './App.css';
import Main from './landing/Main';
import Game from './game/Game';

function App() {
  return (
    <div className='main-wrapper-app'>
      <div className='component-wrapper'>
        {localStorage.getItem('token') ? <Game /> : <Main />}
      </div>
    </div>
  );
}

export default App;
