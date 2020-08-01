const Discord = require('discord.js');
const m = require("./../../shared/methods.js");

const answers = [
  'Yes.', 'No.', 'Most likely.', 'Unlikely.', 'Maybe.', 'My reply is no.', 'My reply is yes.', 'Definitely yes.', 'Absolutely not.', 'Impossible to say right now.', 'Maybe not right now.', 'My sources tell me yes.', 'My sources say no.', 'Without a doubt.', 'Probably.', 'It is certain.', 'Don\'t count on it.'
];

module.exports =
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: '8ball',
            aliases: ['8b'],
            description: 'Magic 8-Ball: Ask it a question and it will give you a yes or no response.',
            usage: '[question]',
            category: 'fun',
            permissions: [],
            ownerOnly: false
        };
    }



    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }

    let msg = ""
    if(argsText.length > 0){
      msg += '> "' + sno.argsText + '"\n';
    }
    msg += answers[Math.floor(Math.random() * answers.length)];


    sno.respond(msg);

    }
}
