import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
    <div class="topnav">
    <Route exact={true} path="/" render={()=>(
      <div>
  <Link class="active" to="/">Start Page</Link>
  <Link to="/panel">Bot Panel</Link>
  </div>
    )}/>
    <Route exact={true} path="/panel" render={()=>(
      <div>
  <Link  to="/">Start Page</Link>
  <Link class="active" to="/panel">Bot Panel</Link>
  </div>
    )}/>
</div>
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />

        <Route exact={true} path="/" component={startPage}/>
        <Route path="/panel" component={panel}/>
        
        
        <code>version 0</code>
        
      </header>
    </div>
    </Router>
  );
}

const startPage = () => (
  <div>
 <p>Log into the web panel:</p>

<p>
<div class="discordLoginBtn">
  <a href="/api/discord/login">Login through discord</a>
</div>
</p>
  </div>
)

const panel = () => (
  <div>
<p>    <ul id="login"></ul></p>
  </div>
)

export default App;
