const Discord = require('discord.js');
const SnoCord = require('snocord');
const SnoDB = require('snodb');
const config = require('./config.json');
const CleverResponse = require('./src-bot/modules/CleverResponse.js');
const ytf = require('./src-bot/modules/YouTubeEmbedFixer.js');
const readyEvent = require('./events/ready.js');

function run(ver){

    let bot = new SnoCord.Bot();

    bot.setConfig(config);
    bot.addCoreCommands();
    bot.addCommandHandler('./src-bot/commands/');

    let presence = ""
    if(ver.branch == "dev")
    presence += "[DEV] ";
    presence += `snobot.xyz | v${ver.num}.${ver.build}`;
    bot.setPresence({ activity: { name: presence }, status: 'online' });


    bot.addCustomResponse(new CleverResponse(bot));

    bot.client.youTubeEmbedFixer = new ytf((ver.branch == "dev"))
    bot.client.ver = ver;
    bot.client.config = bot.config;
    bot.client.on('message', (message)=>bot.client.youTubeEmbedFixer.runFix(message));
    bot.client.on('ready', ()=>{readyEvent(bot.client)})

    bot.init();
    bot.client.options.disableMentions = 'everyone';

};

module.exports = {run};