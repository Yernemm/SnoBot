const CommandHandler = require('./CommandHandler.js');
const Discord = require('discord.js');
const config = require('./../../config.json');
const fs = require('fs');
const Db = require('./../Db.js');
class Bot
{
  
    constructor()
    {
        this._client = new Discord.Client();
        this._clientEventHandler();
        this.logIn(config.discordToken);
        this.commandHandler = new CommandHandler();
        this.db = new Db(this);
    }

    logIn(token)
    {
        this._client.login(token);
    }

    getClient()
    {
        return this._client;
    }

    /**
     * Handles all events in the /events dir.
     */
    _clientEventHandler()
    {
        fs.readdir("./classes/events/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
              const eventClass = require(`./../events/${file}`);
              const event = new eventClass(this);
              let eventName = file.split(".")[0];
              this._client.on(eventName, (msg) => event.run(this._client, msg));
            });
          });
    }


}
module.exports = Bot;