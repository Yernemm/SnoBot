const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'rng',
            aliases: [],
            description: 'Returns a random number between integers num1 and num2, which can be specified.\n\nWithout specifying numbers, it will return a random number between 1 and 100.',
            usage: '[num1 = 100] [num2 = 1]',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg = "Error.";
        
        
    let num1 = 100;
    let num2 = 1;

    if (sno.args[0] != null && sno.args[0] <= Number.MAX_SAFE_INTEGER) num1 = parseInt(sno.args[0]);
    if (sno.args[1] != null && sno.args[1] <= Number.MAX_SAFE_INTEGER) num2 = parseInt(sno.args[1]);

    let lower;
    let higher;

    if (num1 > num2) {
        lower = num2;
        higher = num1;

    } else {
        lower = num1;
        higher = num2;
    }



    msg = Math.floor(Math.random() * (higher - lower + 1) + lower);

    sno.respond(msg);

    }
}
