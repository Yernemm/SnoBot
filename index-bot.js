const Discord = require('discord.js');
const SnoCord = require('snocord');
const SnoDB = require('snodb');
const config = require('./config.json');

function run(ver){

    let bot = new SnoCord.Bot();

    bot.setConfig(config);
    bot.addCoreCommands();
    bot.addCommandHandler('./src-bot/commands/');
    bot.setPresence({ activity: { name: `snobot.xyz | v${ver.num}.${ver.build}` }, status: 'online' });

    bot.init();
    bot.client.options.disableMentions = 'everyone';

};

module.exports = {run};