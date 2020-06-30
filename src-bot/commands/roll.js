const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
const { DiceRoll } = require('rpg-dice-roller');
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'roll',
            aliases: ['r'],
            description: 'Roll a die for an RPG game like D&D. Interacts with the RPG Dice Roller module. More usage info at https://greenimp.github.io/rpg-dice-roller/ \n\n Usage examples include\nroll 1d6\nroll 2d6 + 1d4\netc.',
            usage: '<roll code>',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
            sno.respond(DiceRoll.roll(sno.message.content));

    }
}
