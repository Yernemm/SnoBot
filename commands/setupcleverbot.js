//METADATA
const desc = "Select whether this channel is a CleverBot channel. Leaving parameters empty will show wheter this channel is a CleverBot channel."; //Short description of what the command does.
const usage = "true/false"; //Any parameters required for command.
const cmdtype = "admin"; //Type of command.
const alias = []; //Aliases for the command.
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

    const ch = require("./../modules/CleverHandler.js");

    switch(argsArr[0]){
        case "true":
        case "t":
        case "yes":
            ch.addCleverChannel(message.channel.id);
            msg = "You can now talk with CleverBot in this channel.";
            break;
        case "false":
        case "f":
        case "no":
            ch.removeCleverChannel(message.channel.id);
            msg = "You may no longer talk with CleverBot in this channel."
            break;
        case undefined:
            msg = "checking..."
            ch.checkCleverChannel(message.channel.id, res => 
                message.channel.send(
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
