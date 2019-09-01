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
let ver = JSON.parse(fs.readFileSync('./src/ver.json')).ver
var exec = require('child_process').exec;
var app = express()
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const client = new Discord.Client();
app.use(cookieParser());

function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};
client.ver = ver;

execute("git rev-list --count HEAD", (build) => {client.ver.build = build.split("\n")[0].split("\r")[0]})
execute("git rev-parse --abbrev-ref HEAD", (branch) => {client.ver.branch = branch.split("\n")[0].split("\r")[0]})

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
client.commandsNoAlias = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    client.commandsNoAlias.set(commandName, props);
    if(props.alias){
      props.alias().forEach(alias => {
        console.log(`Attempting to load alias ${alias}`);
        client.commands.set(alias, props);
      })
    }
  });
});
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

  let cookief = socket.handshake.headers.cookie;
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

//Start Discord and web server
client.login(config.discordToken);
server.listen(config.webPort, () => {
  console.log(`Listening on ${config.webPort}`)
});