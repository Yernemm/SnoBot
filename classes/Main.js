const Bot = require("./bot/Bot.js");
class Main
{
    constructor()
    {
        console.log("Starting...");   
        this.discordBot = new Bot();
    }
}
module.exports = Main;