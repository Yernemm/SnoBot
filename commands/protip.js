//METADATA
const desc = "Gives a random joke pro tip"; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = "fun"; //Type of command
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
    var msg = "Pro tip: "; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    const fs = require('fs');
    var p1 = m.randArr(fs.readFileSync('./data/protip/adve1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");
    var p2 = m.randArr(fs.readFileSync('./data/protip/verb1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");
    var p3 = m.randArr(fs.readFileSync('./data/protip/noun1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");
    var p4 = m.randArr(fs.readFileSync('./data/protip/rest1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");


    msg += `${p1} ${p2} ${p3}${p4}`;



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
