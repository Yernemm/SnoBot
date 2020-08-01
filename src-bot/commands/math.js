const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
const mathjs = require('mathjs');
module.exports =
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'math',
            aliases: ['maths', 'calc', 'calculate', 'calculator'],
            description: 'Evaluates a mathematical expression using Math.JS. More usage examples and docs here: https://mathjs.org/index.html',
            usage: '<expression>',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

      let msg = "";

      try{
        msg = mathjs.evaluate(sno.argsText).toString();
      }catch(err){
        msg = err.toString();
      }

    sno.respond(msg);

    }
}
