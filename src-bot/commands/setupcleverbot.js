const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'setupcleverbot',
            aliases: [],
            description: 'Select whether this channel is a CleverBot channel. Leaving parameters empty will show wheter this channel is a CleverBot channel.',
            usage: 'true/false',
            category: 'config',
            permissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

        let msg = "";

        const ch = require("./../modules/CleverHandler.js");

        switch(sno.args[0]){
            case "true":
            case "t":
            case "yes":
                ch.addCleverChannel(sno.message.channel.id);
                msg = "You can now talk with CleverBot in this channel.";
                break;
            case "false":
            case "f":
            case "no":
                ch.removeCleverChannel(sno.message.channel.id);
                msg = "You may no longer talk with CleverBot in this channel."
                break;
            case undefined:
                msg = "checking..."
                ch.checkCleverChannel(sno.message.channel.id, res => 
                    sno.respond(
                        res ? 
                        "You can talk with CleverBot in this channel.\nUse `setupcleverbot false` to disable."
                        :
                        "CleverBot is not enabled in this channel.\nUse `setupcleverbot true` to enable."
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