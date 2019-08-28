const Discord = require("discord.js");
const newLine = require('os').EOL;
module.exports = {
    log: function (data, msg, type ) {
        let config = data.config
        let bot = data.bot
        let message = data.message
        //logging(config, bot, message, msg, type);
    },
    logSend: function (data, msg, type) {
        let config = data.config
        let bot = data.bot
        let message = data.message
        data.message.channel.send(msg);
        //logging(config, bot, message, msg, type);
    },    
    logNoMsg: function (config, bot, msg, type) {
        //logging(config, bot, "NOMESSAGE", msg, type);
    },

    msToTime: function (ms) {
        return msToTime(ms);
    },
    lZero: function (num, digits) {
        return lZero(num, digits);
    },
    formDate: function () {
        return formDate();
    },
    formDateUTC: function () {
        return formDateUTC();
    },
    getAllHeroes: function () {
        var allHeroes = ["Genji", "McCree", "Pharah", "Reaper", "Soldier: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjorn", "Widowmaker", "D.Va",
            "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lucio", "Mercy", "Symmetra", "Zenyatta", "Sombra", "Orisa", "Doomfist", "Moira", "Brigitte"
        ];
        return allHeroes;
    },
    randArr: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
	nl: function (){
		return newLine;	
    },
    getGuildsByUser: getGuildsByUser,
	getLangs: function () {
		return {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};
	}

};









function logging(config, bot, message, msg, type = "d") {
    var d = new Date();
    var logMsg = "";
    var title = "";
    //var footer = "[" + d.getUTCDate() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds() + "] ";
    var footer = "[" + formDate() + "]";

    switch(message){
        case "NOMESSAGE":
title += "";
break;
        default:
        title +=  message.guild + " | " + message.channel.name + ": ";
        logMsg += "\r\n\t**" + message.author + "**\r\n\t" + message.author.username + "#" + message.author.discriminator + " : " + message.content + "\r\n\tResponse: ";
break;

    }

    logMsg += msg;


    if(logMsg.length > 2048)
        logMsg = logMsg.substring(0,2048 - 3) + "...";

    console.log(logMsg);

    let embed = new Discord.RichEmbed()
        .setDescription(logMsg)
        .setTitle(title);
        

        switch(message){
            case "NOMESSAGE":
            embed.setFooter(footer);
            break;
            default:
            embed
            .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
            .setFooter(footer, message.guild.iconURL);
            break;
        }

    switch (type) {
        case "e":
        embed.setColor(0xff0000)
        .setThumbnail("https://yernemm.xyz/media/image/error.png");
            break;

        case "s":
        embed.setColor(0x20b23a);

            break;

        default:
            embed.setColor(0x0070b7);
            break;
    }
   // <@${config.ownerID}>
    var logChannel = bot.channels.get(config.logChannelID);
    if(type=="e" || type=="s")
    logChannel.send( `<@${config.ownerID}>`, { embed });
    else
    logChannel.send({ embed });
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24)
        , days = parseInt((duration / (1000 * 60 * 60 * 24)));

    return days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + "." + milliseconds + " seconds.";
}

function lZero(num, digits) {
    var zeroes = "";
    for (i = 0; i < digits; i++) {
        zeroes += "0";
    }
    return (zeroes + num).slice(- digits);
}

function formDate() {
    var d = new Date();
    return d.getUTCFullYear() + "/" + lZero((d.getUTCMonth() + 1), 2) + "/" + lZero(d.getUTCDate(), 2) + " " + lZero(d.getUTCHours(), 2) + ":" + lZero(d.getUTCMinutes(), 2) + ":" + lZero(d.getUTCSeconds(), 2);
}

function formDateUTC() {
    var d = new Date();
    return d.getUTCFullYear() + "-" + lZero((d.getUTCMonth() + 1), 2) + "-" + lZero(d.getUTCDate(), 2) + "_" + lZero(d.getUTCHours(), 2) + "-" + lZero(d.getUTCMinutes(), 2) + "-" + lZero(d.getUTCSeconds(), 2);
}

function getGuildsByUser(client, user) {
    let sharedGuilds = [];
    client.guilds.forEach(g => {
        if(g.available){
            g.members.forEach(m =>{
                if(m.id === user.id)
                sharedGuilds.push(g);
            })
        }
    });
    return sharedGuilds;
}