import React from 'react';
import { all } from 'q';

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
    constructor(props) {
        super(props);

      }

      allLinks = [];

      addAllLinks(){
        this.allLinks = [];
        this.addLink("Social", "Twitter", "https://twitter.com/home", "For tweeting.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Social", "Reddit", "https://www.reddit.com", "The front page of the internet.")
        this.addLink("Tools", "TiddlyWiki", "https://tiddlywiki.com/")
        this.addLink("Dev", "Enjoy CSS", "https://enjoycss.com")
        this.addLink("Tools", "Fake Name Generator", "https://www.fakenamegenerator.com")
        this.addLink("Tools", "JXlate", "http://otp22.com/xlate/")

      }

      addLink(category, name, url, description = ""){
          this.allLinks.push({
              "category": category,
              "name": name,
              "url": url,
              "description": description
          })
      }

      generateLinkHtml(){
          this.addAllLinks()
          let cards = [];
          let categories = [];
        this.allLinks.forEach(link => {
            if(!categories.includes(link.category))
            categories.push(link.category)
        })

        categories.forEach(cat => {
            let links = [];
            this.allLinks.forEach(link => {
                if(link.category === cat)
                links.push(<div class="tooltip"><a href={link.url} target="_blank">{link.name}</a><div class="tooltiptext">{link.description}</div><br /></div>)
            })
            cards.push(<td ><div class="start-card w3-card"><div class="linksWrapper"><h5>{cat}</h5>
            <div class="scrollbar-start-list">
           <div class="overflow">
           {links}
         </div></div></div></div></td>)
        })


        let linksWrapper = <div class="table">
          <table class="start-page-table">
            <tr>{cards}</tr></table></div>

            return linksWrapper
      }


    


    render(){
      return <div>{this.generateLinkHtml()}</div>
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
  