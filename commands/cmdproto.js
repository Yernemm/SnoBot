//METADATA
const desc = ""; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = "owner"; //Type of command.
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
    var msg = ">>> "; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    try{
             eval(argsTxt);
     }catch(err){
         msg += err;
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
