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
    <p>This is a bot. </p>
    </div>
    </div>
    
    </div>
    )
    