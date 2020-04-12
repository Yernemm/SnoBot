const Discord = require('discord.js');
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'cmdproto',
            aliases: [''],
            description: '',
            usage: '',
            category: 'debug',
            ownerOnly: true
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg = "> ";

        try{
            eval(sno.argsText);
        }catch(err){
            msg += err;
        }

        sno.respond(msg);

    }
}
