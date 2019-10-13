//METADATA
const desc = "kicks the user."; //Short description of what the command does.
const usage = "<user>"; //Any parameters required for command.
const cmdtype = "mod"; //Type of command
//Command
exports.run = (data) => {
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Command not implemented."; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:




    //--------------------------------------------------------------------
    m.logSend(data, msg); //Method will send msg to user, and also log it in both console AND log channel.
    //m.log(config, client, message, msg); //Alternative will log msg without sending msg.
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