const Discord = require('discord.js');
const { string } = require('mathjs');
const m = require("./../../shared/methods.js");

const faces=["(・`ω´・)",";;w;;","owo","UwU",">w<","^w^"];
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'owoify',
            aliases: ['owoifier', 'uwuify', 'uwuifier'],
            description: 'Owofies a message.',
            usage: '<message>',
            category: 'fun',
            permissions: [],
            ownerOnly: false
        };
    }

    

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

        //Some code taken from https://repl.it/@Black_is_Back/OWOifier#index.js

        let v = sno.argsText;

        v = v.replace(/(?:r|l)/g, "w");
        v = v.replace(/(?:R|L)/g, "W");
        v = v.replace(/n([aeiou])/g, 'ny$1');
        v = v.replace(/N([aeiou])/g, 'Ny$1');
        v = v.replace(/N([AEIOU])/g, 'Ny$1');
        v = v.replace(/ove/g, "uv");

        let exclamationPointCount = 0;
        let i;
        let stringsearch = "!";
        //for loop counts the # of individual exclamation points
        for(let i=0; i < v.length; i++) {
            stringsearch===v[exclamationPointCount++]
        };
        for (i = 0; i < exclamationPointCount; i++) {
                v = v.replace("!", " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");
        }


        sno.respond(v);
        


    }
}
