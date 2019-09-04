import React from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import ver from './ver.json'
import {headerPage, infoPage} from './pages/info.js'
import {StartPage} from './pages/start-page.js'
import {Panel} from './pages/bot-panel.js'
import {NoMatch} from './common.js'



class App extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    loggedIn: false,
    authChecked: false
  }
  this.signOutState = this.signOutState.bind(this);
  }

  

  componentDidMount() {
    const socket = socketIOClient();
    socket.on('userData', data => 
    {
      console.log(data)
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

  signOutState(){
    console.log("signing out...")
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.setState(
      {
       discordUserData: undefined,
       authChecked: true,
       loggedIn: false  
      }
    )
  }

  render () {
    if(!this.state.discordUserData)this.state.discordUserData = "test"
  return (
    <Router>
      
    <div className="App">
    <div id="particles-js" style={{ "top":0,"left":0,"position":"fixed",  "width": "100%", "height":"100%"}}></div>
<div style={{"position":"absolute", "z-index":1, "width": "100%", "height":"100%"}}>
    <div class="topnav w3-card">
    <Route component={nav} />
    <code style={{color:"#fff", float:"right"}}>| {
        
        this.state.loggedIn?
        
        <span> <SignOut signOutState={this.signOutState} /> | Logged in as {this.state.discordUserData.username}.</span>
        
        :
        
        this.state.authChecked?
        <span> <a href="/api/discord/login">[<i class="fab fa-discord"></i> Login through Discord]</a></span>
        :
        
        ""
        
        } | v{ver.ver.num}.{process.env.REACT_APP_GIT_VER} |</code>
</div>

<div class="scrollbar-app">
    <div class="overflow">
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

        <Route path="/start" render={(props) => 
  (<StartPage {...props} state={this.state}/>)
}/>

        <Route path="/panel" render={(props) => 
  (<Panel {...props} state={this.state}/>)
}/>
        </Switch>

        </div>
        </div>
        </div>
    </div>
  
    </Router>
  );
}

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
    let classes = "topnav-item "
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


class SignOut extends React.Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.signOutState()
  }
  
  render() {
    return <a onClick={this.handleClick}>[Sign Out]</a>;
  }
}




export default App;
