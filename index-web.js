const config = require('./config.json');
var express = require('express');
var http = require('http');
var io = require('socket.io');
const path = require('path');
const axios = require("axios");
const cookie = require("cookie")
var app = express()
var server = http.createServer(app);
var io = require('socket.io').listen(server);


//=============================================

// Pages

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
  });
  
  app.get('/panel', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/panel.html'));
    console.log(req.url)
    console.log(req.cookies)
    var url = require('url');
  
  });
  
  
  // ---------
  // Routes
  app.use('/api/discord', require('./web/api/discord'));
  
  
  
  
  //Err handling for express
  app.use((err, req, res, next) => {
    switch (err.message) {
      case 'NoCodeProvided':
        return res.status(400).send({
          status: 'ERROR',
          error: err.message,
        });
      default:
        return res.status(500).send({
          status: 'ERROR',
          error: err.message,
        });
    }
  });
  
  //User connected to websocket when page opened.
  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  
    if (typeof socket.handshake.headers.cookie !== 'string')
      return;
  
    let cookies = cookie.parse(socket.handshake.headers.cookie);
  
    //Send axios request to discord API to verify the access token.
    axios.get(
        `https://discordapp.com/api/users/@me`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`
          }
        }
      ).then(function (response) {
        console.log("emit");
  
        socket.emit('login', "Logged in as " + response.data.username)
         //User logged in.
         let discordUserData = response.data;
         discordUserData.loaded = true;
         discordUserData.loggedIn = true;
  
         socket.emit('userData', discordUserData)
        /*
        client.fetchUser(response.data.id).then(logged => {
  
          //User logged in and found by bot.
            let discordUserData = logged;
            discordUserData.loaded = true;
            discordUserData.loggedIn = true;
  
            socket.emit('userData', discordUserData)
  
          })
          .catch(err => {
            //User logged in but bot cannot find it.
            let discordUserData = 
            {
              "loaded": true,
              "loggedIn": false,
              "loginMessage": "You do not share a server with the bot."
            };
            socket.emit('userData', discordUserData)
          })
          */
  
      })
      .catch(function (error) {
        console.log(error);
        //Authorisation failed.
        socket.emit('userData', 
        {
          "loaded": true,
          "loggedIn": false,
          "loginMessage": "Invalid Discord login details."
        })
  
      })
      .then(function () {
        // always executed
      });
  
  });
  
  //Start web server
  server.listen(config.webPort, () => {
    console.log(`Listening on ${config.webPort}`)
  });