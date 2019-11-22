//METADATA
const desc = "Select whether this bot will fix YouTube previews in this server. Leaving parameters empty will show wheter this server will receive fixes."; //Short description of what the command does.
const usage = "true/false"; //Any parameters required for command.
const cmdtype = "admin"; //Type of command.
const alias = ["ytf"]; //Aliases for the command.
//Command
exports.run = (data) => {
    let bot = data.client,
    message = data.message,
    client = data.client,
    config = data.config,
    argsArr = data.argsArr,
    argsTxt = data.argsTxt
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    

    switch(argsArr[0]){
        case "true":
        case "t":
        case "yes":
            data.client.youTubeEmbedFixer.addServer(message.guild.id);
            msg = "The bot will now fix YouTube previews in this server.";
            break;
        case "false":
        case "f":
        case "no":
            data.client.youTubeEmbedFixer.removeServer(message.guild.id);
            msg = "The bot will no longer fix YouTube previews in this server."
            break;
        case undefined:
            msg = "checking..."
            data.client.youTubeEmbedFixer.checkIfEnabled(message, res => 
                message.channel.send(
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

    //--------------------------------------------------------------------
    m.logSend(data, msg); //Method will send msg to user, and also log it in both console AND log channel.
    //m.log(data, msg); //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
exports.cmdtype = () => {
    return cmdtype;
}
exports.alias = () => {
    return alias;
}
