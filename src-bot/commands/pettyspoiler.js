const Discord = require('discord.js');
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'pettyspoiler',
            aliases: ['psp'],
            description: 'Converts the message such that each character is surrounded by a spoier tag.',
            usage: '<message>',
            category: 'fun',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msgArray = ["`"]

    let i = 1;
    let arrPos = 0;

    sno.argsText.split("").forEach(e=>{
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
        sno.respond(a);
    })

    }
}
