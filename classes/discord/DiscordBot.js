const SnoCord = require('snocord');
const SnoDB = require('snodb');
module.exports = class DiscordBot{
    constructor(){
        let bot = new SnoCord();
        bot.setConfig(require('./../../config.js'));
        bot.addCommandHandler('./commands/');

        this.bot = bot;
        bot.init();
    }
};