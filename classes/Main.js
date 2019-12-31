const DiscordBot = require('./discord/DiscordBot.js');
module.exports = class Main{
    constructor(){ 
        new DiscordBot();
    }
};