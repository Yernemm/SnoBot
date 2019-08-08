import React from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
    <div class="topnav">
    <Route component={nav} />
</div>
      <header className="App-header">
        <div className="App-logo-container">
        <img class="w3-circle App-logo" src={logo} alt="logo" />
        </div>
        <Switch>
        <Route exact={true} path="/" component={startPage}/>
        <Route path="/panel" component={panel}/>
        <Route component={NoMatch} />
        </Switch>
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

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <Link class="active" to="/">Start Page</Link>
    </div>
  );
}

const navStart = () => (
  <div>
  <Link class="active" to="/">Start Page</Link>
  <Link to="/panel">Bot Panel</Link>
  </div>
)

const navPanel = () => (
  <div>
  <Link  to="/">Start Page</Link>
  <Link class="active" to="/panel">Bot Panel</Link>
  </div>
)

function nav({ location }){
  let linkClasses = ["", ""];
  switch(location.pathname){
    case "/": linkClasses[0] = "active"; break;
    case "/panel": linkClasses[1] = "active"; break;
  }


 
  return(
    <div>
    <Link class={linkClasses[0]} to="/">Start Page</Link>
    <Link class={linkClasses[1]} to="/panel">Bot Panel</Link>
    </div>
  )
}

export default App;
