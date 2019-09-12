//METADATA
const desc = ""; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = ""; //Type of command.
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
    var rgx = /<a?:.+?:([0-9]+?)>/g;
    var rgxAnim = /<a:.+?:([0-9]+?)>/;
    var url = "https://cdn.discordapp.com/emojis/";
    var emojis = [];
    var matches = argsTxt.match(rgx)
    if(matches){
        matches.forEach(e=>{
        console.log(e);        
        var emojiLink = url + rgx.exec(e)[1];
        rgx.exec(e);
        console.log(emojiLink);
        if(rgxAnim.test(e))
        emojiLink += ".gif";
        else
        emojiLink += ".png";
        console.log(emojiLink);
        console.log("---");
       emojis.push(emojiLink);
    })
    console.log(emojis);
    message.channel.send(msg,{
        files: emojis
    })
}else{
    msg="No custom emoji found in message."
    message.channel.send(msg);
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
