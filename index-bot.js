const Discord = require('discord.js');
const SnoCord = require('snocord');
const SnoDB = require('snodb');
const config = require('./config.json');

let bot = new SnoCord.Bot();

bot.setConfig(config);
bot.addCoreCommands();
bot.addCommandHandler('./src-bot/commands/');

bot.init();