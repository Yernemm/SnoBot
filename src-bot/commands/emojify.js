const Discord = require('discord.js');
const { string } = require('mathjs');
const m = require("./../../shared/methods.js");

// JSON data taken from https://github.com/oldpepper12/emojibot2

const emojiMap = require('./../edb.prebuilt.json');

module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'emojify',
            aliases: ['emojifier'],
            description: 'Emojifies a message.',
            usage: '<message>',
            category: 'fun',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

        let tempText = sno.argsText.split(' ')
        let result = "";

        tempText.forEach(word => {
            let normalisedWord = word.replace(/[^0-9a-z]/gi, '');
            normalisedWord = normalisedWord.toLowerCase();

            let emojiArray = emojiMap[normalisedWord];
            if(emojiArray){
                word+= m.randArr(emojiArray);

                if(Math.random() > 0.5) word+= m.randArr(emojiArray);
                if(Math.random() > 0.8) word+= m.randArr(emojiArray);

            }

            result += word + " ";
            
        });

        sno.respond(result);
        


    }
}
