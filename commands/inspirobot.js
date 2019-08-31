//METADATA
const desc = "Returns an image from <https://inspirobot.me>/\nOptionally put `xmas` after the command to view xmas images."; //Short description of what the command does.
const usage = "[xmas]"; //Any parameters required for command.
const cmdtype = "fun"; //Type of command.
const alias = ["inspire"]; //Aliases for the command.
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
    const Discord = require("discord.js");
    var http = require('http');

    var apiLink = "http://inspirobot.me/api?generate=true";
    if(argsArr[0] == "xmas")
    apiLink += "&season=xmas";
  
    var request = require('request');
request(apiLink, function (error, response, body) {
  const embed = new Discord.RichEmbed()
  .setTitle("Get inspired...")
  .setColor(argsArr[0] === "xmas" ? 0x5b0609 : 0x229c18)
  .setImage(body);

  message.channel.send({embed});
  m.log(config, client, message, body);
});


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
