//METADATA
const desc = "Translates the message between two languages. Specify the languages first and then the message. The language is a two-letter code (e.g. 'en' for English). Alternatively, use 'auto' to detect the language to translate from. You can also simply use 'a' which will detect the language and then translate to English."; //Short description of what the command does.
const usage = "<lang from> <lang to> <message> OR a <message> "; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
//Command
exports.run = (data) => {
    let message = data.message;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Error."; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:


    const Discord = require("discord.js");
	const trColour = 0x47bae0;
	
	const translate = require('google-translate-open-api').default;
	if(data.argsArr.length < 2){
		//error
		m.logSend(data, "Specify the correct information. Use 'help translate' for more info.");
	}else{
		var tfr = data.argsArr[0];
		var tto = data.argsArr[1];
		var tra = data.argsArr.slice(2).join(" ");
		if(data.argsArr[0] == "a"){
			tfr = "auto";
			tto = "en";
			tra = data.argsArr.slice(1).join(" ");
		}
 
translate(tra, {from: tfr, to: tto}).then(res => {
	
    //console.log(res.text);
    //=> I speak English
    //console.log(res.from.language.iso);
	
    //=> nl
	msg = (tfr === "auto" ? res.data[0] : res.data);
	if(msg.length >2048){
		msg = msg.slice(0,2044) + "...";
	}
	
	const embed = new Discord.RichEmbed()
	.setColor(trColour)
	.setAuthor(message.guild.member(message.author).displayName, message.author.avatarURL)
	.setTitle("Translated from " + (tfr === "auto" ? res.data[1] : tfr.toLowerCase()) + " to " + tto)
	.setDescription(msg);
	message.channel.send({embed});
	m.log(data, msg);
}).catch(err => {
	data.message.channel.send(err.toString());
	m.log(data, err);
});

	};
    //--------------------------------------------------------------------
    //m.logSend(data, msg); //Method will send msg to user, and also log it in both console AND log channel.
    m.log(data, msg); //Alternative will log msg without sending msg.
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