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
    <code style={{color:"#fff", float:"right"}}>- 0.0.0.55 -</code>
</div>
      <header className="App-header">
        
      <Switch>
        <Route exact={true} path="/" component={infoPage}/>
        <Route path="/start"/>
        <Route path="/panel"/>
        <Route component={NoMatch} />
        </Switch>
        
      </header>
      <Switch>
        <Route path="/start" component={startPage}/>
        <Route path="/panel" component={panel}/>
        </Switch>
    </div>
    </Router>
  );
}

const infoPage = () => (
<div>
  <h1>SnoBot</h1>
  <header className="App-header">
        <div className="App-logo-container">
        <img class="w3-circle App-logo" src={logo} alt="logo" />
        </div>
        </header>
        <h2>Bot - Startpage - Ecosystem</h2>
        <p>This is a bot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Cursus vitae congue mauris rhoncus aenean. Duis tristique sollicitudin nibh sit amet. Scelerisque fermentum dui faucibus in. Dictum fusce ut placerat orci. Justo nec ultrices dui sapien eget mi proin. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Quisque egestas diam in arcu. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Id aliquet risus feugiat in ante.

Mattis aliquam faucibus purus in massa tempor nec. Urna duis convallis convallis tellus id interdum. Aliquet risus feugiat in ante metus dictum at tempor commodo. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Placerat duis ultricies lacus sed turpis tincidunt id. Bibendum at varius vel pharetra vel turpis nunc eget. Id nibh tortor id aliquet. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Amet purus gravida quis blandit. Rutrum tellus pellentesque eu tincidunt tortor. Amet luctus venenatis lectus magna fringilla.

Consectetur adipiscing elit pellentesque habitant. Duis ut diam quam nulla porttitor massa id neque. Nisi quis eleifend quam adipiscing. Ut consequat semper viverra nam libero justo laoreet. In arcu cursus euismod quis. Id venenatis a condimentum vitae sapien pellentesque habitant. Lectus urna duis convallis convallis tellus. In vitae turpis massa sed. Suspendisse ultrices gravida dictum fusce. Velit scelerisque in dictum non consectetur a. Sit amet facilisis magna etiam tempor. Nisl nunc mi ipsum faucibus vitae aliquet. Sed blandit libero volutpat sed cras ornare arcu. Sapien et ligula ullamcorper malesuada. Sed faucibus turpis in eu mi bibendum neque egestas congue. Sagittis vitae et leo duis.

Quisque non tellus orci ac auctor augue mauris augue. Purus non enim praesent elementum facilisis. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nullam eget felis eget nunc lobortis mattis. Massa massa ultricies mi quis hendrerit dolor. Id semper risus in hendrerit. Eget aliquet nibh praesent tristique magna sit amet purus. Cursus in hac habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing. Cursus vitae congue mauris rhoncus. Congue quisque egestas diam in arcu. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Sit amet tellus cras adipiscing. Nam at lectus urna duis convallis. Vel pretium lectus quam id leo in vitae turpis. Habitasse platea dictumst quisque sagittis purus. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Nibh tortor id aliquet lectus.

Ullamcorper eget nulla facilisi etiam dignissim diam. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Sed arcu non odio euismod lacinia at quis risus. Donec ac odio tempor orci dapibus ultrices in. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nisl purus in mollis nunc sed id semper risus. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Facilisis leo vel fringilla est ullamcorper eget. Tempus iaculis urna id volutpat lacus laoreet non. Volutpat sed cras ornare arcu dui vivamus arcu. Porta non pulvinar neque laoreet suspendisse. Interdum velit laoreet id donec. Ornare suspendisse sed nisi lacus sed viverra tellus in hac.</p>
<p>Log into the web panel:</p>

<p>
<DiscordLoginBtn />
</p>
</div>
)

const startPage = () => (
  <div>
        <div class="search-box">
       <input type="text" name="" class="search-txt" placeholder="Search Google..."/>
      <div class="search-btn">
       <i class="fas fa-search"></i>
       </div>
     </div>
  </div>
)


function panel() {
if(!window.discordUserData.loaded && !window.location.hostname.startsWith("localhost")){
  //Not logged in.
return(
  <div>
    <p>You are not logged in.</p>
    <DiscordLoginBtn />
  </div>
)
}else{
//Logged in
return(

  <div style={{"text-align": "left"}}> 
    
    <nav class="w3-sidebar w3-white w3-animate-left" style={{"z-index":3,"width":"300px"}} id="mySidebar">
  <br />
  <div class="w3-container w3-row">
    <div class="w3-col s4">
      <img src={"https://cdn.discordapp.com/avatars/" + window.discordUserData.id + "/" + window.discordUserData.avatar} class="w3-circle w3-margin-right" style={{"width":"46px"}} />
    </div>
    <div class="w3-col s8 w3-bar">
      <span>Welcome, <strong>{window.discordUserData.username}</strong></span><br />
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
  </div>
  <hr />
  <div class="w3-container">
    <h5>Dashboard</h5>
  </div>
  <div class="w3-bar-block">
    <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
    <a href="#" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-users fa-fw"></i>  Overview</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-eye fa-fw"></i>  Views</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  Traffic</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bullseye fa-fw"></i>  Geo</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-diamond fa-fw"></i>  Orders</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bell fa-fw"></i>  News</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bank fa-fw"></i>  General</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-history fa-fw"></i>  History</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cog fa-fw"></i>  Settings</a><br /><br />
  </div>
    </nav>
    
  </div>
)
}
}

const DiscordLoginBtn = () => (
  <div class="discordLoginBtn">
  <a href="/api/discord/login">Login through Discord</a>
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


function nav({ location }){
  let linkClasses = ["", ""];
  switch(location.pathname){
    case "/": linkClasses[0] = "active"; break;
    case "/start": linkClasses[1] = "active"; break;
    case "/panel": linkClasses[2] = "active"; break;
    default: break;
  }


 
  return(
    <div>
    <Link class={linkClasses[0]} to="/">Info</Link>
    <Link class={linkClasses[1]} to="/start">Start Page</Link>
    <Link class={linkClasses[2]} to="/panel">Bot Panel</Link>
    </div>
  )
}

export default App;
