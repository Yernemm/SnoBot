const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
const parseMultiple = require('google-translate-open-api').parseMultiple;
const trColour = 0x47bae0;
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'translate',
            aliases: ['tr'],
            description: "Translates the message between two languages. Specify the languages first and then the message. The language is a two-letter code (e.g. 'en' for English). Alternatively, use 'auto' to detect the language to translate from. You can also simply use 'a' which will detect the language and then translate to English.",
            usage: '<lang from> <lang to> <message> OR a <message>',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg = 'error';

        const translate = require('google-translate-open-api').default;
	if(sno.args.length < 2){
		//error
		//m.logSend(data, "Specify the correct information. Use 'help translate' for more info.");
	}else{
		var tfr = sno.args[0];
		var tto = sno.args[1];
		var tra = sno.args.slice(2).join(" ");
		if(sno.args[0] == "a"){
			tfr = "auto";
			tto = "en";
			tra = sno.args.slice(1).join(" ");
		}
 
translate(prepTrans(tra), {from: tfr, to: tto}).then(res => {
	
    //console.log(res.text);
    //=> I speak English
    //console.log(res.from.language.iso);
	
    //=> nl
	msg = decodeEntities(dePrepTrans(res.data));
	if(msg.length >2048){
		msg = msg.slice(0,2044) + "...";
	}
	
	const embed = new Discord.MessageEmbed()
	.setColor(trColour)
	.setAuthor(sno.message.guild.member(sno.message.author).displayName, sno.message.author.avatarURL)
	.setTitle("Translated from " + dePrepLang(res.data) + " to " + tto)
	.setDescription(msg);
	sno.respond('', {embed});
	//m.log(data, msg);
}).catch(err => {
	sno.respond(err.toString());
	//m.log(data, err);
});

	};

    }
}


function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

function prepTrans(text){
    return text.split("\n")
}

function dePrepTrans(data){
    if(typeof data[0] != "string")   
    return parseMultiple(data[0]).join("\n")
    else if(typeof data == "string")
    return data
    else
    return data[0]
}

function dePrepLang(data){
    if(typeof data[1] == "string")
        return data[1]
    else
        return data[0][0][2]
    
}