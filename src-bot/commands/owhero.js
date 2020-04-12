const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'owhero',
            aliases: ['hero'],
            description: 'Gives a random Overwatch hero to play.',
            usage: '',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        

        let allHeroes = m.getAllHeroes();

        let msg = "Play **" + allHeroes[Math.floor(Math.random() * allHeroes.length)] + "**!";

        sno.respond(msg);

    }
}
