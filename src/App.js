import React from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";



class App extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    loggedIn: false,
    authChecked: false
  }
  }

  componentDidMount() {
    const socket = socketIOClient();
    socket.on('userData', data => 
    {
      this.setState(
          {
           discordUserData: data,
           authChecked: data.loaded,
           loggedIn: data.loggedIn  
          }
        )
    });
    socket.on('login', function(msg){
      console.log(msg)
    });
  }

  render () {
  return (
    <Router>
    <div className="App">
    <div class="topnav w3-card">
    <Route component={nav} />
    <code style={{color:"#fff", float:"right"}}>- {
        

    
        this.state.loggedIn?
        
        "Logged in as " + this.state.discordUserData.username + "."
        
        :
        
        this.state.authChecked?
        "Not Logged in"
        :
        
        "hmmmmmm"
        
        } - 00 -</code>
</div>
      <header className="App-header">

        
      <Switch>
      <Route exact={true} path="/" component={headerPage}/>
        <Route path="/start"/>
        <Route path="/panel"/>
        <Route component={NoMatch} />
        </Switch>
        
      </header>
      <Switch>
      <Route exact={true} path="/" component={infoPage}/>
        <Route path="/start" component={startPage}/>
        <Route path="/panel" render={() => 
  (<Panel state={this.state}/>)
}/>
        </Switch>
    </div>
    </Router>
  );
}

}

const headerPage = () => (
<div>
  <h1>SnoBot</h1>
  <header className="App-header">
        <div className="App-logo-container">
        <img class="w3-circle App-logo" src={logo} alt="logo" />
        </div>
        </header>
        <h2>Bot - Startpage - Ecosystem</h2>
        <h5>Made by <a href="https://yernemm.xyz">Yernemm</a>.</h5>
        
</div>
)

const infoPage = () => (
<div>
<div class="infoBodyContainer w3-card">
  <div class="infoBody">
<p>This is a bot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et. Cursus vitae congue mauris rhoncus aenean. Duis tristique sollicitudin nibh sit amet. Scelerisque fermentum dui faucibus in. Dictum fusce ut placerat orci. Justo nec ultrices dui sapien eget mi proin. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Quisque egestas diam in arcu. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Id aliquet risus feugiat in ante.

Mattis aliquam faucibus purus in massa tempor nec. Urna duis convallis convallis tellus id interdum. Aliquet risus feugiat in ante metus dictum at tempor commodo. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Placerat duis ultricies lacus sed turpis tincidunt id. Bibendum at varius vel pharetra vel turpis nunc eget. Id nibh tortor id aliquet. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Amet purus gravida quis blandit. Rutrum tellus pellentesque eu tincidunt tortor. Amet luctus venenatis lectus magna fringilla.

Consectetur adipiscing elit pellentesque habitant. Duis ut diam quam nulla porttitor massa id neque. Nisi quis eleifend quam adipiscing. Ut consequat semper viverra nam libero justo laoreet. In arcu cursus euismod quis. Id venenatis a condimentum vitae sapien pellentesque habitant. Lectus urna duis convallis convallis tellus. In vitae turpis massa sed. Suspendisse ultrices gravida dictum fusce. Velit scelerisque in dictum non consectetur a. Sit amet facilisis magna etiam tempor. Nisl nunc mi ipsum faucibus vitae aliquet. Sed blandit libero volutpat sed cras ornare arcu. Sapien et ligula ullamcorper malesuada. Sed faucibus turpis in eu mi bibendum neque egestas congue. Sagittis vitae et leo duis.

Quisque non tellus orci ac auctor augue mauris augue. Purus non enim praesent elementum facilisis. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nullam eget felis eget nunc lobortis mattis. Massa massa ultricies mi quis hendrerit dolor. Id semper risus in hendrerit. Eget aliquet nibh praesent tristique magna sit amet purus. Cursus in hac habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing. Cursus vitae congue mauris rhoncus. Congue quisque egestas diam in arcu. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Sit amet tellus cras adipiscing. Nam at lectus urna duis convallis. Vel pretium lectus quam id leo in vitae turpis. Habitasse platea dictumst quisque sagittis purus. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Nibh tortor id aliquet lectus.

Ullamcorper eget nulla facilisi etiam dignissim diam. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Sed arcu non odio euismod lacinia at quis risus. Donec ac odio tempor orci dapibus ultrices in. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nisl purus in mollis nunc sed id semper risus. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Facilisis leo vel fringilla est ullamcorper eget. Tempus iaculis urna id volutpat lacus laoreet non. Volutpat sed cras ornare arcu dui vivamus arcu. Porta non pulvinar neque laoreet suspendisse. Interdum velit laoreet id donec. Ornare suspendisse sed nisi lacus sed viverra tellus in hac.</p>
</div>
</div>
<p>Log into the web panel:</p>


<p>
<DiscordLoginBtn />
</p>
</div>
)

const startPage = () => (
  <div>
        <div class="search-box w3-card">
       <input id="SP-searchBox" type="text" name="" class="search-txt" onKeyPress={(event) => searchEnter(event)} placeholder="Search Google..."/>
      <div class="search-btn" onClick={startSearch} >
       <i class="fas fa-search"></i>
       </div>
     </div>
  </div>
)


function encodeGoogleSearch(query) {
  let googleUrl = "https://www.google.com/search?q="
  return googleUrl + encodeURIComponent(query);
}

function googleSearch(query){
  window.open(encodeGoogleSearch(query), '_blank');
}

function startSearch(){
  googleSearch(document.getElementById('SP-searchBox').value);
}

function searchEnter(event) { 
  if(event.key === "Enter"){
    startSearch();
  }
}

class Panel extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
  return (
<p>
{
        

    
        this.props.state.loggedIn?
        
        "Logged in as " + this.state.discordUserData.username + "."
        
        :
        
        this.props.state.authChecked?
        "Not Logged in"
        :
        
        "hmmmmmm"
        
        }
</p>
  )
}}
/*
function panelOld() {
if(!window.discordUserData.loaded)
  setTimeout(() =>{console.log("waiting for server response");return panel();}, 100);
else{
  if(window.discordUserData.loggedIn)
  return panelLogged
  else
  return panelNotLogged
}
}
*/
const panelNotLogged = () =>(
  <div>
    <p>You are not logged in.</p>
    <DiscordLoginBtn />
  </div>
)

const panelLogged = () => (
  <div style={{"text-align": "left"}}> 
    
    <nav class="panel-sidebar w3-card" style={{"z-index":3,"width":"300px"}} id="mySidebar">
  <div class="panel-sidebar-welcome">
  <div class="w3-container w3-row">
    <br />
    <div class="w3-col s4">
      <img src={"https://cdn.discordapp.com/avatars/" + window.discordUserData.id + "/" + window.discordUserData.avatar + ".png"} class="w3-circle w3-margin-right" style={{"width":"46px"}} />
    </div>
    <div class="w3-col s8 w3-bar">
      <span>Welcome, <strong>{window.discordUserData.username}</strong></span><br />
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
    
    
  </div>
  <hr />
  </div>
  <div class="scrollbar">
    <div class="overflow">
  <div class="w3-bar-block">
  <Route component={panelNav} />
  </div>
    </div>
    </div>
    </nav>
    
  </div>
)

const DiscordLoginBtn = () => (
  <div class="discordLoginBtn">
  <a class="w3-card-4" href="/api/discord/login">Login through Discord</a>
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

  let linkData = [];

  function addLinkData(path, name){
    linkData.push({
      "name": name,
      "path": path
    })
  }
  

  addLinkData("/", "Info");
  addLinkData("/start", "Start Page");
  addLinkData("/panel", "Bot Panel");

  let links = [];

  linkData.forEach(d =>{
    let classes = ""
    if(d.path != "/"){
      if(location.pathname.startsWith(d.path)){
        classes += "active"
      }
    }else if(location.pathname === d.path){
      classes += "active"
    }
    links.push(<Link class={classes} to={d.path}>{d.name}</Link>);
  })
  
  return (
    <div>
      {links}
    </div>
  )
}

function panelNav({ location }){

  let linkData = [];

  function addLinkData(path, name, icon){
    linkData.push({
      "name": name,
      "path": path,
      "icon": icon
    })
  }

  function addSeparator(name){
    linkData.push({
      "isSeparator": true,
      "name": name
    })
  }

  addSeparator("Dashboard");
  addLinkData("", "Home", "fas fa-home");
  addSeparator("User");
  addLinkData("/user/leaderboard", "Leaderboard", "fas fa-trophy");
  addLinkData("/user/stats", "Statistics", "fas fa-chart-line")
  addSeparator("Manage Servers");
  for(let i = 0;i<50;i++)addLinkData("/sampleserver" + i, "Sample Server " + i, "fas fa-vials")


  let links = [];

  linkData.forEach(d =>{
    if(!d.isSeparator){

      let classes = "w3-bar-item w3-button w3-padding "
      d.path = "/panel" + d.path;
      if(d.path != "/panel"){
        if(location.pathname.startsWith(d.path)){
          classes += "panel-sidebar-btn-active"
        }
      }else if(location.pathname === d.path){
        classes += "panel-sidebar-btn-active"
      }
      links.push(<Link class={classes} to={d.path}><i class={d.icon}></i> {d.name}</Link>);

    } else {
      links.push(
        <div>
        
        <div class="w3-container">   
        <h5 style={{textAlign:"center"}}>{d.name}</h5>
      </div>
      </div>
      )
    }

  })
  
  return (
    <div>
      {links}
    </div>
  )
}


export default App;
