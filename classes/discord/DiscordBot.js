const Bot = require("./../bot/Bot.js");

class DiscordBot
{

    constructor()
    {
        this.bot = new Bot();
    }
}
module.exports = DiscordBot;