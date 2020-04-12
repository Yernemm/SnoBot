const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'ytfixer',
            aliases: ['ytf'],
            description: "Select whether this bot will fix YouTube previews in this server. Leaving parameters empty will show wheter this server will receive fixes.",
            usage: 'true/false',
            category: 'config',
            permissions: [Discord.Permissions.FLAGS.MANAGE_GUILD],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg= "";

        switch(sno.args[0]){
            case "true":
            case "t":
            case "yes":
                sno.bot.client.youTubeEmbedFixer.addServer(sno.message.guild.id);
                msg = "The bot will now fix YouTube previews in this server.";
                break;
            case "false":
            case "f":
            case "no":
                sno.bot.client.youTubeEmbedFixer.removeServer(sno.message.guild.id);
                msg = "The bot will no longer fix YouTube previews in this server."
                break;
            case undefined:
                msg = "checking..."
                sno.bot.client.youTubeEmbedFixer.checkIfEnabled(sno.message, res => 
                    sno.respond(
                        res ? 
                        "YouTube Embed Fixer is enabled in this server.\nUse `ytfixer false` to disable."
                        :
                        "YouTube Embed Fixer is disabled in this server.\nUse `ytfixer true` to enable."
                        )
                    )
                break;
            default:
                msg="Run this command with either 'true' or 'false' afterwards."
                break;
        }

        sno.respond(msg);


    }
}
