const Discord = require('discord.js');
const SnoCord = require('snocord');
const SnoDB = require('snodb');
const config = require('./config.json');
const CleverResponse = require('./src-bot/modules/CleverResponse.js');
const ytf = require('./src-bot/modules/YouTubeEmbedFixer.js');

function run(ver){

    let bot = new SnoCord.Bot();

    bot.setConfig(config);
    bot.addCoreCommands();
    bot.addCommandHandler('./src-bot/commands/');
    bot.setPresence({ activity: { name: `snobot.xyz | v${ver.num}.${ver.build}` }, status: 'online' });
    bot.addCustomResponse(new CleverResponse(bot));

    bot.client.youTubeEmbedFixer = new ytf((ver.branch == "dev"))
    bot.client.on('message', (message)=>bot.client.youTubeEmbedFixer.runFix(message));

    bot.init();
    bot.client.options.disableMentions = 'everyone';

};

module.exports = {run};