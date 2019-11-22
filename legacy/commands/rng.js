//METADATA
const desc = "Returns a random number between integers num1 and num2, which can be specified.\n\nWithout specifying numbers, it will return a random number between 1 and 100."; //Short description of what the command does.
const usage = "[num1 = 100] [num2 = 1]"; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
//Command
exports.run = (data) => {
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Error."; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:


    var num1 = 100;
    var num2 = 1;

    if (data.argsArr[0] != null && data.argsArr[0] <= Number.MAX_SAFE_INTEGER) num1 = parseInt(data.argsArr[0]);
    if (data.argsArr[1] != null && data.argsArr[1] <= Number.MAX_SAFE_INTEGER) num2 = parseInt(data.argsArr[1]);

    var lower;
    var higher;

    if (num1 > num2) {
        lower = num2;
        higher = num1;

    } else {
        lower = num1;
        higher = num2;
    }



    msg = Math.floor(Math.random() * (higher - lower + 1) + lower);

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