const Discord = require('discord.js');
const m = require("./../../shared/methods.js");
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'lastfm',
            aliases: ['lf'],
            description: "Command for checking Last.FM info. Do 'lf help' for more info.",
            usage: '<mode> [arguments]',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }
        
        let msg = "";
        const lfColor = "#BA0000";

        const sqlite = require("sqlite");
        var LastfmAPI = require('lastfmapi');
        var lfm = new LastfmAPI({
            'api_key': sno.bot.config.lfmApiKey,
            'secret': sno.bot.config.lfmSecret
        });
    
    
        const dbp = sqlite.open("./data/db/lf.sqlite")
            .then(sql => {
                ////m.log(data, "Opened");
    
    
    
    
                switch (sno.args[0] ? sno.args[0].toLowerCase() : null) {
                    case "help":
                        msg = "This command will get music data from Last.FM. Some commands require you to link your account in order to access personalised data.\r\n\r\nUse **lf link <Last.FM account name>** to link your Discord account to your Last.FM account. This does not require your password as only publicly visible data is used at the moment.\r\n\r\nIf you link the wrong account. You can use **lf unlink** and then link again.\r\n\r\nUse **lf <mode> [discord user]** to display information from Last.FM. Leaving the discord user empty will get your stats. Mentioning a Discord user or using a Discord user ID of a linked user will get their stats.\r\nAvailable modes:\r\n\r\n**tracks** - Gets top 10 tracks listened by the user.\r\n**artists** - Gets top 10 artists listened by the user.\r\n**albums** - Gets top 10 albums listened by the user.\r\n**last** - Gets last 10 tracks listened by the user."
                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`__LF command help__`)
                                                            .setDescription(msg)
                                                            .setColor(lfColor);
                                                        sno.respond('', {embed});
                        //m.log(data, msg);
                        
                        break;
                    case "link":
    
                        if (sno.args[1]) {
                            if (sno.args[1].length >= 2 && sno.args[1].length <= 15) {
    
                                sql.get(`SELECT * FROM lfAcc WHERE userId ="${sno.message.author.id}"`)
                                    .then(row => {
                                        msg = `Account already linked to "${row.lfUser}". Consider unlinking with _'lf unlink'_.`
                                        sno.respond(msg);
                                    })
                                    .catch(err => {
                                        //sno.respond(err + " -1 ");
                                        sql.run(`CREATE TABLE IF NOT EXISTS lfAcc (userId TEXT, lfUser TEXT)`)
                                            .then(() => {
                                                sql.run(`INSERT INTO lfAcc (userId, lfUser) VALUES (?, ?)`, [sno.message.author.id, sno.args[1]])
                                                    .then(() => {
                                                        sno.respond(`Discord account linked to "${sno.args[1]}"`);
                                                    })
                                                    .catch(err => {
                                                        //Failed to add account.
                                                        //m.log(data, err + " -2 ");
                                                    });
                                            })
                                            .catch(err => {
                                                //Failed to create table.
                                                //m.log(data, err + " -3 ");
    
                                            });
                                    });
    
    
                            } else {
                                sno.respond(`Specify a valid Last.FM account name.`);
                            }
                        } else {
                            sno.respond(`Specify a Last.FM account name.`);
                        }
    
                        break;
    
    
                    case "unlink":
                        sql.get(`SELECT * FROM lfAcc WHERE userId ="${sno.message.author.id}"`)
                            .then(row => {
                                var lfu = row.lfUser;
    
                                let username = row.lfUser
                                sql.run(`DELETE FROM lfAcc WHERE userId ="${sno.message.author.id}"`)
                                    .then(() => {
                                        sno.respond(`LF user "${username}" has been unlinked.`);
                                    })
                                    .catch(err => {
                                        sno.respond(`Error unlinking "${username}".`);
                                    });
                            });
    
    
    
                        break;
    
    
                    case "tracks":
                    case "last":
                    case "artists":
                    case "albums":
                    case "now":
                        //Same switch used here but this time it checks is user acc exists at the start.
    
                        var usr = sno.message.author.id;
    
                        if (sno.args[1]) {
                            usr = sno.args[1].replace("<", "").replace("@", "").replace("!", "").replace(">", "");
                        }
    
                        sql.get(`SELECT * FROM lfAcc WHERE userId ="${usr}"`)
                            .then(row => {
                                var lfu = row.lfUser;
                                switch (sno.args[0]) {
    
    
                                    case "tracks":
                                        lfm.user.getTopTracks({
                                            'user': lfu,
                                            'limit': 10
                                        }, (err, topTracks) => {
                                            if (err) {
                                                sno.respond("Error " + err);console.log(err)
                                            } else {
                                                let resp = "Errrrr"
                                                try {
                                                    //  var objArr = Object.keys(topTracks)
                                                    //  resp = "Tracks:\r\n" + objArr[1];
                                                    // for(i=0;i<=1;i++){
                                                    //      resp += "\r\n" + objArr[i].name;
                                                    //   }
    
                                                    // resp = "```" + JSON.stringify(topTracks) + "```";
                                                    resp = ""
    
                                                    for (let i = 0; i < 10; i++) {
                                                        let tr = topTracks.track[i];
                                                        resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) by **${tr.artist.name}** (${tr.playcount} plays)`;
                                                    }
                                                    //m.log(data, `\`\`\`${resp}\`\`\``);
    
                                                   
                                                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${row.lfUser}'s top 10 Tracks:`)
                                                            .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                            .setDescription(resp)
                                                            .setColor(lfColor);
    
                                                            
    
                                                        sno.respond('', {embed});
                                                   
                                                    //resp = "Tracks:\r\n" + objArr[1];
                                                    //sno.respond("Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
                                                } catch (err2) {
                                                    console.log(err2)
                                                }
    
                                            }
                                        })
    
                                        break;
                                    case "last":
    
    
    
    
    
    
    
    
                                        lfm.user.getRecentTracks({
                                            'user': lfu,
                                            'limit': 10
                                        }, (err, recentTracks) => {
                                            if (err) {
                                                sno.respond("Error " + err);console.log(err)
                                            } else {
                                                let resp = "Errrrr"
                                                try {
                                                    //  var objArr = Object.keys(topTracks)
                                                    //  resp = "Tracks:\r\n" + objArr[1];
                                                    // for(i=0;i<=1;i++){
                                                    //      resp += "\r\n" + objArr[i].name;
                                                    //   }
    
                                                    // resp = "```" + JSON.stringify(topTracks) + "```";
                                                    resp = ""
    
                                                    for (let i = 0; i < 10; i++) {
                                                        let tr = recentTracks.track[i];
                                                        resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) by **${tr.artist['#text']}**`;
                                                    }
                                                    //m.log(data, `\`\`\`${resp}\`\`\``);
    
                                                    try {
                                                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${row.lfUser}'s last 10 Tracks:`)
                                                            .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                            .setDescription(resp)
                                                            .setColor(lfColor);
                                                           
    
                                                        sno.respond('', {embed});
    
    
                                                        // console.log(JSON.stringify(recentTracks));
    
                                                    } catch (eg1) {
                                                        //m.log(data, eg1);
                                                    }
    
    
    
    
    
    
    
                                                    //resp = "Tracks:\r\n" + objArr[1];
                                                    //sno.respond("Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
                                                } catch (err2) {
                                                    resp = err2;
                                                }
    
                                            }
                                        })
    
    
    
                                        break;
    
    
    
    
    
    
    
    
    
    
    
                                    case "artists":
    
    
                                        lfm.user.getTopArtists({
                                            'user': lfu,
                                            'limit': 10
                                        }, (err, topArtists) => {
                                            if (err) {
                                                sno.respond("Error " + err);console.log(err)
                                            } else {
                                                let resp = "Errrrr"
                                                try {
                                                    //  var objArr = Object.keys(topTracks)
                                                    //  resp = "Tracks:\r\n" + objArr[1];
                                                    // for(i=0;i<=1;i++){
                                                    //      resp += "\r\n" + objArr[i].name;
                                                    //   }
    
                                                    // resp = "```" + JSON.stringify(topTracks) + "```";
                                                    resp = ""
    
                                                    for (let i = 0; i < 10; i++) {
                                                        let tr = topArtists.artist[i];
                                                        resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) (${tr.playcount} plays)`;
                                                    }
                                                    //m.log(data, `\`\`\`${resp}\`\`\``);
    
                                                    try {
                                                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${row.lfUser}'s top 10 Artists:`)
                                                            .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                            .setDescription(resp)
                                                            .setColor(lfColor);
    
                                                        sno.respond('', {embed});
                                                    } catch (eg1) {
                                                        //m.log(data, eg1);
                                                    }
                                                    //resp = "Tracks:\r\n" + objArr[1];
                                                    //sno.respond("Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
                                                } catch (err2) {
                                                    resp = err2;
                                                }
    
                                            }
                                        })
    
                                        break;
    
    
    
    
    
    
                                    case "albums":
                                        lfm.user.getTopAlbums({
                                            'user': lfu,
                                            'limit': 10
                                        }, (err, topAlbums) => {
                                            if (err) {
                                                sno.respond("Error " + err);console.log(err)
                                            } else {
                                                let resp = "Errrrr"
                                                try {
                                                    //  var objArr = Object.keys(topTracks)
                                                    //  resp = "Tracks:\r\n" + objArr[1];
                                                    // for(i=0;i<=1;i++){
                                                    //      resp += "\r\n" + objArr[i].name;
                                                    //   }
    
                                                    // resp = "```" + JSON.stringify(topTracks) + "```";
                                                    resp = ""
    
                                                    for (let i = 0; i < 10; i++) {
                                                        let tr = topAlbums.album[i];
                                                        resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) by **${tr.artist.name}** (${tr.playcount} plays)`;
                                                    }
                                                    //m.log(data, `\`\`\`${resp}\`\`\``);
    
                                                    try {
                                                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${row.lfUser}'s top 10 Albums:`)
                                                            .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                            .setDescription(resp)
                                                            .setColor(lfColor);
    
                                                        sno.respond('', {embed});
                                                    } catch (eg1) {
                                                        //m.log(data, eg1);
                                                    }
                                                    //resp = "Tracks:\r\n" + objArr[1];
                                                    //sno.respond("Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
                                                } catch (err2) {
                                                    resp = err2;
                                                }
    
                                            }
                                        })
                                        break;
    
    
    
    
    
    
    
    
    
    
    
                                        case "now":
    
    
    
    
    
    
    
    
                                        lfm.user.getRecentTracks({
                                            'user': lfu,
                                            'limit': 1
                                        }, (err, recentTracks) => {
                                            if (err) {
                                                sno.respond("Error " + err);console.log(err)
                                            } else {
                                                let resp = "Errrrr"
                                                try {
                                                    //  var objArr = Object.keys(topTracks)
                                                    //  resp = "Tracks:\r\n" + objArr[1];
                                                    // for(i=0;i<=1;i++){
                                                    //      resp += "\r\n" + objArr[i].name;
                                                    //   }
    
                                                    // resp = "```" + JSON.stringify(topTracks) + "```";
                                                    resp = ""
    
                                                    try{
                                                    if(recentTracks.track[0]['@attr'].nowplaying == "true"){
                                                        resp += "Now playing:\r\n"
                                                    }else{
                                                        resp += "NOTHING PLAYING RIGHT NOW. Most recent track:\r\n"
                                                    }
                                                }catch(errroooorrrr){
                                                    console.log(errroooorrrr);
                                                }
    
                                                        let tr = recentTracks.track[0];
                                                        resp += `\r\n\`${1}\`\t[${tr.name}](${tr.url}) by **${tr.artist['#text']}**`;
                                                  
                                                    //m.log(data, `\`\`\`${resp}\`\`\``);
    
                                                   
    
                                                    try {
                                                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${row.lfUser}'s last 10 Tracks:`)
                                                            .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                            .setDescription(resp)
                                                            .setColor(lfColor);
    
    
                                                        sno.respond('', {embed});
    
    
                                                         //console.log(JSON.stringify(recentTracks));
    
                                                    } catch (eg1) {
                                                        //m.log(data, eg1);
                                                    }
    
    
    
    
    
    
    
                                                    //resp = "Tracks:\r\n" + objArr[1];
                                                    //sno.respond("Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
                                                } catch (err2) {
                                                    resp = err2;
                                                }
    
                                            }
                                        })
    
    
    
    
    
                                        break;

    
    
    
    
    
                                    //.{'rank' : 1}
    
    
                                }
                            })
                            .catch(err => {
                                let errmsg = "Linked account not found. Consider using _'lf link'_."
                                sno.message.channel.send(errmsg);
                                //m.log(data, errmsg + "\r\n\r\n" + err);
                            });
    
    
                        break;
                        default:
                                sno.bot.getPrefix(sno.message.guild.id).then(prefix=>{
                                    sno.respond(`Mode not found. Use \`${prefix}lf help\` for more info.`);
                                });
                                
                            break;
    
    
    
                }
    
    
    
                //sql.close("./yerFiles/db/lf.sqlite");
    
    
            })
            .catch(err => {
                sno.respond("Not opened");
                console.error(err);
            });


    }
}
