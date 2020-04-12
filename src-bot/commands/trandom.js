const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
const trColour = 0xce5c5c;
const translate = require('google-translate-open-api').default;
const parseMultiple = require('google-translate-open-api').parseMultiple;
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'trandom',
            aliases: ['trand'],
            description: "Translates the message between two languages. Specify the languages first and then the message. The language is a two-letter code (e.g. 'en' for English). Alternatively, use 'auto' to detect the language to translate from. You can also simply use 'a' which will detect the language and then translate to English.",
            usage: '<lang from> <lang to> <message> OR a <message>',
            category: 'fun',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let 
        config = sno.bot.config,
        client = sno.bot.client, 
        message = sno.message, 
        argsArr = sno.args, 
        argsTxt = sno.argsText
    
           
        
            sno.respond("Translating...");
    
            var langs = [];
            trand(argsTxt, 0, langs, m.getLangs(), config, client, message, argsArr, sno);

    }
}

function trand(argsTxt, index, langs, allLangs, config, client, message, argsArr, sno)
{
	////console.log("a");
	if (index < 10){
		////console.log("b");
		var currLang = randLang();
		translate(prepTrans(decodeEntities(argsTxt)), {from: "auto", to: currLang}).then(res => {
	////console.log("e");
	if(index == 0){
		langs.push(dePrepLang(res.data));
	}
	var outMsg = dePrepTrans(res.data);
	////console.log(outMsg);
	index++;
	langs.push(currLang);
	trand(outMsg, index, langs, allLangs, config, client, message, argsArr, sno);
	
	
}).catch(err => {
	////console.log("c " + err.toString());
	sno.respond(err.toString());
	//m.log(config, client, argsTxt, err);
	err.toString();
});
		
	}else{
		
		
		

		
		
		translate(prepTrans(decodeEntities(argsTxt)), {from: "auto", to: "en"}).then(res => {
	////console.log("e");

	var outMsg = dePrepTrans(res.data);
	////console.log(outMsg);
	
	
	
	////console.log("d");
		//console.log(outMsg);
		finish(decodeEntities(outMsg), langs, config, client, message, argsArr, sno, allLangs);
	
}).catch(err => {
	////console.log("c " + err.toString());
	sno.respond(err.toString());
	//m.log(config, client, argsTxt, err);
	err.toString();
});
		
		
	
	}

}
function randLang()
{
	var result;
    var count = 0;
    for (var prop in m.getLangs())
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}
function finish(argsTxt, langs, config, client, message, argsArr, sno, allLangs){
		//console.log(argsTxt)
		var langslist = "";
		langs.forEach(lang =>{
			langslist += allLangs[lang] + " to "
		});
		langslist += "English"
	
		////console.log(argsTxt);
		//var translation = randLang()
		var msg = argsTxt;
		if(msg.length >2048){
		msg = msg.slice(0,2044) + "...";
		}
const embed = new Discord.MessageEmbed()
	.setColor(trColour)
	.setAuthor(message.guild.member(message.author).displayName, message.author.avatarURL)
	.setTitle("Random translation:")
	.setDescription(msg)
	.addField("Languages:",
    langslist);
	sno.respond('',{embed});
	//m.log(config, client, message, msg);
	
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
	