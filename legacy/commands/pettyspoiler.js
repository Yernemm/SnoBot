//METADATA
const desc = "Converts the message such that each character is surrounded by a spoier tag."; //Short description of what the command does.
const usage = "<message>"; //Any parameters required for command.
const cmdtype = "fun"; //Type of command
const alias = ["psp"]; //Aliases for the command.
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

    var msgArray = ["`"]

    var i = 1;
    var arrPos = 0;

    argsTxt.split("").forEach(e=>{
        if(i<=398){
        
        }else{
            msgArray[arrPos]+="`"
            arrPos++;
            msgArray[arrPos]="`"
            i = 1;
        }
        msgArray[arrPos]+="||"+e+"||";
        i++;
    })
    msgArray[arrPos]+="`"

    msgArray.forEach(a=>{
        m.logSend(data, a);
    })



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
