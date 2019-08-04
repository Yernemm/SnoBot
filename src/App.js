import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <div class="discordLoginBtn">
          <a href="/api/discord/login">Login through discord</a>
        </div>
        </p>
        
      </header>
    </div>
  );
}

export default App;
