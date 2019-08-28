//METADATA
const desc = "Translates the message between two languages. Specify the languages first and then the message. The language is a two-letter code (e.g. 'en' for English). Alternatively, use 'auto' to detect the language to translate from. You can also simply use 'a' which will detect the language and then translate to English."; //Short description of what the command does.
const usage = "<lang from> <lang to> <message> OR a <message> "; //Any parameters required for command.
const cmdtype = "fun"; //Type of command
const Discord = require("discord.js");
const trColour = 0xce5c5c;
const translate = require('google-translate-open-api').default;
const m = require("./../shared/methods.js");
//Command
exports.run = (data) => {

	let 
	config = data.config,
	client = data.client, 
	message = data.message, 
	argsArr = data.argsArr, 
	argsTxt = data.argsTxt, 
	extraData = data.extraData

   	
	
		message.channel.send("Translating...");

		var langs = [];
		trand(argsTxt, 0, langs, m.getLangs(), config, client, message, argsArr, extraData);

	
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

function trand(argsTxt, index, langs, allLangs, config, client, message, argsArr, extraData)
{
	//console.log("a");
	if (index < 10){
		//console.log("b");
		var currLang = randLang();
		translate(argsTxt, {from: "auto", to: currLang}).then(res => {
	//console.log("e");
	if(index == 0){
		langs.push(res.data[1]);
	}
	var outMsg = res.data[0];
	//console.log(outMsg);
	index++;
	langs.push(currLang);
	trand(outMsg, index, langs, allLangs, config, client, message, argsArr, extraData);
	
	
}).catch(err => {
	//console.log("c " + err.toString());
	message.channel.send(err.toString());
	m.log(config, client, argsTxt, err);
	err.toString();
});
		
	}else{
		
		
		

		
		
		translate(argsTxt, {from: "auto", to: "en"}).then(res => {
	//console.log("e");

	var outMsg = res.data[0];
	//console.log(outMsg);
	
	
	
	//console.log("d");
		console.log(outMsg);
		finish(outMsg, langs, config, client, message, argsArr, extraData, allLangs);
	
}).catch(err => {
	//console.log("c " + err.toString());
	message.channel.send(err.toString());
	m.log(config, client, argsTxt, err);
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
function finish(argsTxt, langs, config, client, message, argsArr, extraData, allLangs){
		console.log(argsTxt)
		var langslist = "";
		langs.forEach(lang =>{
			langslist += allLangs[lang] + " to "
		});
		langslist += "English"
	
		//console.log(argsTxt);
		//var translation = randLang()
		var msg = argsTxt;
		if(msg.length >2048){
		msg = msg.slice(0,2044) + "...";
		}
const embed = new Discord.RichEmbed()
	.setColor(trColour)
	.setAuthor(message.guild.member(message.author).displayName, message.author.avatarURL)
	.setTitle("Random translation:")
	.setDescription(msg)
	.addField("Languages:",
    langslist);
	message.channel.send({embed});
	m.log(config, client, message, msg);
	
	}