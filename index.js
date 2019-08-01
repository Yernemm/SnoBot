const Discord = require('discord.js');
const config = require('./config.json');
const io = require('socket.io');
const path = require('path');
const fs = require('fs');
const Enmap = require("enmap");

const express = require('express')
const app = express()

const client = new Discord.Client();



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/web/index.html'));
});

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


//Start Discord and web server
client.login(config.discordToken);
app.listen(config.webPort, () =>{
    console.log(`Listening on ${config.webPort}`)
});