import React from 'react';
import {DiscordLoginBtn, NoMatch, ComingSoon} from '../common.js'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

export class Panel extends React.Component {
    constructor(props) {
      super(props);
  
    }
  
    render () {
      if(!this.props.state.discordUserData)this.props.state.discordUserData = "none";
    return (
  <div>
  {
          
  
  
          (this.props.state.loggedIn)?
          
          
          panelLogged(this.props.state)
          
          :
          
          this.props.state.authChecked?
          panelNotLogged(this.props.state)
          :
          <div class="infoBodyContainer w3-card card">
    <div class="infoBody">
          <h2>Checking authentication...</h2>
          <hr />
          <p>If this takes too long, try logging in.</p>
          <DiscordLoginBtn />
          </div>
    </div>
          }
  </div>
    )
  }}
  
  const panelNotLogged = (data) =>(
    <div>
      <div class="infoBodyContainer w3-card card">
    <div class="infoBody">
      <h2>You are not logged in.</h2>
      <p>
        <code>Reason: {data.discordUserData.loginMessage}</code>
      </p>
      <DiscordLoginBtn />
      </div>
    </div>
    </div>
  )
  
  const panelLogged = (data) => (
    <div>
    <div style={{"text-align": "left"}}> 
      
      <nav class="panel-sidebar w3-card card" id="mySidebar">
    <div class="panel-sidebar-welcome">
    <div class="w3-container w3-row">
      <br />
      <div class="w3-col s4">
        <img src={"https://cdn.discordapp.com/avatars/" + data.discordUserData.id + "/" + data.discordUserData.avatar + ".png"} class="w3-circle w3-margin-right" style={{"width":"46px"}} />
      </div>
      <div class="w3-col s8 w3-bar">
        <span>Welcome, <strong>{data.discordUserData.username}</strong></span>
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
    <div class="panel-contents card w3-card">    
    <div class="scrollbar-panel-content">
      <div class="overflow">
    <Switch>
        <Route exact={true} path="/panel" component={ComingSoon}/>
        <Route exact={true} path="/panel/user/leaderboard" component={ComingSoon}/>
        <Route exact={true} path="/panel/user/stats" component={ComingSoon}/>
        <Route component={NoMatch} />
          </Switch>
          </div>
          </div>
          </div>
    </div>
  )

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
   // addSeparator("Manage Servers");
   // for(let i = 0;i<50;i++)addLinkData("/server/sampleserver" + i, "Sample Server " + i, "fas fa-vials")
  
  
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
  
  
  
