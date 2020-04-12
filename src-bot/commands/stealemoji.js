const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'stealemoji',
            aliases: [],
            description: 'Sends an image file for the sent custom emoji.',
            usage: '<emoji>',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg = "";
        let rgx = /<a?:.+?:([0-9]+?)>/g;
    let rgxAnim = /<a:.+?:([0-9]+?)>/;
    let url = "https://cdn.discordapp.com/emojis/";
    let emojis = [];
    let matches = sno.argsText.match(rgx)
    if(matches){
        matches.forEach(e=>{
           
        let emojiLink = url + rgx.exec(e)[1];
        rgx.exec(e);
       
        if(rgxAnim.test(e))
        emojiLink += ".gif";
        else
        emojiLink += ".png";

       emojis.push(emojiLink);
    })
  
    sno.respond(msg,{
        files: emojis
    })
}else{
    msg="No custom emoji found in message."
    sno.respond(msg);
}

    }
}
