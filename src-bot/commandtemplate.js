const Discord = require('discord.js');
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'cmd',
            aliases: [''],
            description: '',
            usage: '',
            category: '',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        


    }
}
