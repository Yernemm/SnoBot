import React from 'react';
import logo from '../logo.png';

export const headerPage = () => (
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
    
export const infoPage = () => (
    <div>
    <div class="infoBodyContainer w3-card card">
      <div class="infoBody">
      <h2>Bot</h2>
      <p><a href="https://discordapp.com/oauth2/authorize?client_id=606167605165817856&permissions=0&scope=bot">Invite the bot.</a></p>
<p>A successor to YerBot, this bot offers a selection of both fun and useful commands:</p>
<ul>
<li>/translate -- Translate a message between any two languages.</li>
<li>/trandom -- Translate a message between 10 random languages and back to English.</li>
<li>/lastfm -- Get user music listening data from <a href="https://www.last.fm">last.fm</a></li>
<li>/ow -- Display a user's Overwatch playime statistics</li>
<li>/level -- Check your global and server exp and level.</li>
<li>And more! -- Use /help to get a full list of commands.</li>
</ul>
<h2>Start Page</h2>
<p>The start page shows the time, a Google search bar, and a set of useful website links for quick access.</p>
<p>Set it as your browser's homepage for easy access.</p>
<h2>More to come...</h2>
<p>This website and bot are still in development. More features will come, including:</p>
<ul>
<li>More commands</li>
<li>Configurable permission groups</li>
<li>Role rewards for levels</li>
<li>Moderation commands</li>
<li>Mod mail</li>
<li>Server spam detection and prevention</li>
<li>Cleverbot conversations</li>
</ul>
<p>For a full plan listing, check the <a href="https://trello.com/b/ic3OCNEa/snobot">Trello page.</a></p>
    </div>
    </div>
    
    </div>
    )
    