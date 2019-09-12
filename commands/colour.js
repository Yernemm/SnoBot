//METADATA
const desc = "Shows the colour given by the code.\r\nModes and code examples:\r\ncolour hex ff0000\r\ncolour rgb 255 0 0\r\n\r\nAlso works with roles, for example:\r\ncolour role admin"; //Short description of what the command does.
const usage = "<mode> <code> OR role <role name>"; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
const alias = ["color"]; //Aliases for the command.
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


    var Color = require('color');
    //debug thing
    //message.channel.send(argsArr);

    switch (argsArr[0]) {
        case "hex":
            if (isHex(argsArr[1]) && argsArr[1].length <= 6) {
                var col = Color('#' + argsArr[1]);
                sendRGBCol(col, config, client, message, argsArr, argsTxt, extraData);
            } else {
                msg = "Invalid hex colour."
                message.channel.send(msg);
            }
            break;
        case "rgb":
            if (validateRGB(argsArr, message)) {
                var col = Color.rgb(parseInt(argsArr[1], 10), parseInt(argsArr[2], 10), parseInt(argsArr[3], 10));
                sendRGBCol(col, config, client, message, argsArr, argsTxt, extraData);
            } else {
                msg = "Invalid rgb colour."
                message.channel.send(msg);
            }
            break;
        case "role":
        //Used this fancy find notation instead of the standard one to make it case insensitive.
            var role = message.guild.roles.find(val => val.name.toLowerCase() === argsTxt.slice(argsArr[0].length + 1).toLowerCase());
            if(role!=null){

               var col =  Color('#' + m.lZero(role.color.toString(16), 6));
               sendRGBCol(col, config, client, message, argsArr, argsTxt, extraData);
               
            }else{
                msg = "Role '" + argsTxt.slice(argsArr[0].length + 1) + "' not found."
                message.channel.send(msg);
            }
        break;

            
        default:
            msg = "Invalid mode.\nUse `help colour` for more info."
            message.channel.send(msg);
            break;
    }

    //--------------------------------------------------------------------
    //m.logSend(data, msg); //Method will send msg to user, and also log it in both console AND log channel.
    m.log(data, msg); //Alternative will log msg without sending msg.
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
