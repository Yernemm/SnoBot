const Discord = require('discord.js');
const config = require('./config.json');
const db = require('./modules/db.js')
const m = require('./shared/methods.js')
var express = require('express');
var http = require('http');
var io = require('socket.io');
const path = require('path');
const fs = require('fs');
const Enmap = require("enmap");
const axios = require("axios");
const cookie = require("cookie")
var cookieParser = require('cookie-parser')


var app = express()
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const client = new Discord.Client();
app.use(cookieParser());



//Discord Command and Event handler
//=============================================
client.config = config;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  
  client.commands = new Enmap();
  
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });
//=============================================

// Pages

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
});

app.get('/panel', function(req, res) {
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

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    var cookief =socket.handshake.headers.cookie; 

var cookies = cookie.parse(socket.handshake.headers.cookie);



    
   axios.get(
          `https://discordapp.com/api/users/@me`,
          {headers: {Authorization: `Bearer ${cookies.access_token}`}}
        ).then(function (response) {
            console.log("emit");
            socket.emit('login', "Logged in as " + response.data.username)
            client.fetchUser(response.data.id).then(logged=>{

              let discordUserData = {
                "loaded": true
              };

              //socket.emit('login', `<img src="${logged.avatarURL}">`)
              //socket.emit('login', "Guilds:")
              //m.getGuildsByUser(client, logged).forEach(g =>{
                //socket.emit('login', g.name)
              //})
              socket.emit('userData', logged)
              
            })
            
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
    
  });


//Start Discord and web server
client.login(config.discordToken);
server.listen(config.webPort, () =>{
    console.log(`Listening on ${config.webPort}`)
});