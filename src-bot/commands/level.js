const Discord = require('discord.js');
const lvl = require('./../modules/levels.js');
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'level',
            aliases: ["exp", "xp", "rank"],
            description: 'Shows your current experience value and level.',
            usage: '',
            category: 'core',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg = "";
        lvl.getStats(sno.message.author.id, sno.message.guild.id)
        .then(res => {
            msg += '__Global Stats:__\n'
            msg += `> Level: ${res.global.level}\n> Total exp: ${res.global.expTotal}\n\n`
            msg += `__${sno.message.guild.name} Server Stats:__\n`
            msg += `> Level: ${res.server.level}\n> Total exp: ${res.server.expTotal}\n\n`
            sno.respond(msg);
        })
        .catch(() => {sno.respond("Error");})


    }
}
