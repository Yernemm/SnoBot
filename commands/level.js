//METADATA
const desc = "Shows your current experience value and level."; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = "core"; //Type of command.
const alias = ["exp", "xp", "rank"]; //Aliases for the command.

const lvl = require('./../modules/levels.js')
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

    lvl.getStats(message.author.id, message.guild.id)
    .then(res => {
        msg += '__Global Stats:__\n'
        msg += `> Level: ${res.global.level}\n> Total exp: ${res.global.expTotal}\n\n`
        msg += `__${message.guild.name} Server Stats:__\n`
        msg += `> Level: ${res.server.level}\n> Total exp: ${res.server.expTotal}\n\n`
        m.logSend(data, msg);
    })
    .catch(() => {m.logSend(data, "Error");})


    //--------------------------------------------------------------------
    //m.logSend(data, msg); //Method will send msg to user, and also log it in both console AND log channel.
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
