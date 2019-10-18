//METADATA
const desc = "Cryptography and base shifts. [THIS COMMAND IS NOT FULLY COMPLETE]"; //Short description of what the command does.
const usage = `<mode> <input>
currently available modes:
-shift, rot, caesar
--<mode> <shift amount> <string input>
--e.g. shift 13 hello`; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
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
    const alphaCap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alpha = "abcdefghijklmnopqrstuvwxyz";

    switch (argsArr[0]){
        case "shift":
        case "rot":
        case "caesar":
            //rewrite this to be a separte function
        if (Number.isInteger(argsArr[1] * 1))
        {
            message.channel.send(argsArr)
            var shift = argsArr[1];
            var msgBefore = argsTxt.substring(argsArr[0].length + argsArr[1].length + 2);
            var msgNew = "";
            msgBefore.split('').forEach(c =>{
                var upper = (c == c.toUpperCase());
                var pos = alpha.indexOf(c.toLowerCase());
                if (pos == -1){
                    msgNew += c;
                }else{
                    pos = (pos + shift) % alpha.length;
                    var newChar = alpha[pos];
                    if(upper)
                    newChar = newChar.toLocaleUpperCase();
                    msgNew += newChar;
                }
            });
            msg = msgNew;

        }else
        {
            msg="Error: Shift is not an integer."
        }

        break;
        default:
        msg = "Error: Invalid crypto mode. Use 'help crypto' for more information."
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
