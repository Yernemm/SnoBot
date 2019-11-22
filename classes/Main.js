const DiscordBot = require("./discord/DiscordBot.js");
class Main
{
    constructor()
    {
        console.log("Starting...");   
        this.discordBot = new DiscordBot();
    }
}
module.exports = Main;