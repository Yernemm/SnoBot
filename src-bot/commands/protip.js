const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'protip',
            aliases: [],
            description: 'Gives a random joke pro tip',
            usage: '',
            category: 'fun',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

        let msg = "Pro tip: ";
        
        const fs = require('fs');
    var p1 = m.randArr(fs.readFileSync('./data/protip/adve1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");
    var p2 = m.randArr(fs.readFileSync('./data/protip/verb1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");
    var p3 = m.randArr(fs.readFileSync('./data/protip/noun1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");
    var p4 = m.randArr(fs.readFileSync('./data/protip/rest1.txt', 'utf8').split(m.nl())).replace("\r", "").replace("\n", "");


    msg += `${p1} ${p2} ${p3}${p4}`;

    sno.respond(msg);

    }
}
