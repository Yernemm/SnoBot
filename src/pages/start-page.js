import React from 'react';

export class StartPage extends React.Component {
    constructor(props) {
      super(props);
  
    }
  
    render () {
    return <div class="start-page-wrapper">
        {WelcomeText(this.props)}
        <BigClock />
        <SearchBar />
        <LinksList />    
    </div>
    }
}
  
  const BigClock = () =>{
    return <h1 class="big-clock"><Clock /></h1>
  }
  
  class SearchBar extends React.Component {
  render(){
    return <div>
      <div class="search-box w3-card">
         <input id="SP-searchBox" type="text" name="" class="search-txt" onKeyPress={(event) => searchEnter(event)} placeholder="Search Google..."/>
        <div class="search-btn" onClick={startSearch} >
         <i class="fas fa-search"></i>
  
         </div>
         
       </div>
    </div>
  }
  }
  
  class LinksList extends React.Component {
    render(){
      return <div>
  <div class="table">
         <table class="start-page-table">
           <tr>
             <td ><div class="start-card w3-card"><h5>Tools</h5></div></td>
             <td ><div class="start-card w3-card"><h5>Fun</h5></div></td>
             <td ><div class="start-card w3-card"><h5>Downloads</h5></div></td>
             <td ><div class="start-card w3-card"><h5>Discord</h5></div></td>
             <td ><div class="start-card w3-card"><h5>Social</h5></div></td>
             <td ><div class="start-card w3-card"><h5>Dev</h5></div></td>
             <td ><div class="start-card w3-card"><h5>News</h5></div></td>
           </tr>
         </table>
         </div>
      </div>
    }
  }
  
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

  function FormattedDate(props) {
    return <span>{props.date.toLocaleTimeString()}</span>;
  }
  
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <FormattedDate date={this.state.date} />
        </div>
      );
    }
  }

  const WelcomeText = (props) => {

        if(props.state.loggedIn)
        return <h1>Welcome, {props.state.discordUserData.username}.</h1>
        else
        return <h1>Welcome.</h1>
      
  }
  