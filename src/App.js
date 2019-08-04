import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Route exact={true} path="/" render={()=>(
          <div>
          <p>Log into the web panel:</p>

                  <p>
                  <div class="discordLoginBtn">
                    <a href="/api/discord/login">Login through discord</a>
                  </div>
                  </p>
                  </div>
        )}/>
        <Route path="/panel" render={()=>(
          <p>    <ul id="login"></ul></p>
          
        )}/>
        
        
        
        
      </header>
    </div>
    </Router>
  );
}

export default App;
