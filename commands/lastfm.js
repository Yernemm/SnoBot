//METADATA
const desc = "Command for checking Last.FM info. Do 'lf help' for more info."; //Short description of what the command does.
const usage = "<mode> [arguments]"; //Any parameters required for command.
const cmdtype = "utility"; //Type of command.
const alias = ["lf"]; //Aliases for the command.
//Command
exports.run = (data) => {
    let bot = data.client,
    message = data.message,
    client = data.client,
    config = data.config,
    argsArr = data.argsArr,
    argsTxt = data.argsTxt
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    const lfColor = "#BA0000";
    //COMMAND LOGIC HERE:



    const sqlite = require("sqlite");
    const Discord = require("discord.js");
    var LastfmAPI = require('lastfmapi');
    var lfm = new LastfmAPI({
        'api_key': config.lfmApiKey,
        'secret': config.lfmSecret
    });


    const dbp = sqlite.open("./data/db/lf.sqlite")
        .then(sql => {
            //m.log(data, "Opened");




            switch (argsArr[0].toLowerCase()) {
                case "help":
                    msg = "This command will get music data from Last.FM. Some commands require you to link your account in order to access personalised data.\r\n\r\nUse **lf link <Last.FM account name>** to link your Discord account to your Last.FM account. This does not require your password as only publicly visible data is used at the moment.\r\n\r\nIf you link the wrong account. You can use **lf unlink** and then link again.\r\n\r\nUse **lf <mode> [discord user]** to display information from Last.FM. Leaving the discord user empty will get your stats. Mentioning a Discord user or using a Discord user ID of a linked user will get their stats.\r\nAvailable modes:\r\n\r\n**tracks** - Gets top 10 tracks listened by the user.\r\n**artists** - Gets top 10 artists listened by the user.\r\n**albums** - Gets top 10 albums listened by the user.\r\n**last** - Gets last 10 tracks listened by the user."
                    const embed = new Discord.RichEmbed()
                                                        .setTitle(`__LF command help__`)
                                                        .setDescription(msg)
                                                        .setColor(lfColor);
                                                    message.channel.send({ embed });
                    m.log(data, msg);
                    
                    break;
                case "link":

                    if (argsArr[1]) {
                        if (argsArr[1].length >= 2 && argsArr[1].length <= 15) {

                            sql.get(`SELECT * FROM lfAcc WHERE userId ="${message.author.id}"`)
                                .then(row => {
                                    msg = `Account already linked to "${row.lfUser}". Consider unlinking with _'lf unlink'_.`
                                    m.logSend(data, msg);
                                })
                                .catch(err => {
                                    //m.logSend(data, err + " -1 ");
                                    sql.run(`CREATE TABLE IF NOT EXISTS lfAcc (userId TEXT, lfUser TEXT)`)
                                        .then(() => {
                                            sql.run(`INSERT INTO lfAcc (userId, lfUser) VALUES (?, ?)`, [message.author.id, argsArr[1]])
                                                .then(() => {
                                                    m.logSend(data, `Discord account linked to "${argsArr[1]}"`);
                                                })
                                                .catch(err => {
                                                    //Failed to add account.
                                                    m.log(data, err + " -2 ");
                                                });
                                        })
                                        .catch(err => {
                                            //Failed to create table.
                                            m.log(data, err + " -3 ");

                                        });
                                });


                        } else {
                            m.logSend(data, `Specify a valid Last.FM account name.`);
                        }
                    } else {
                        m.logSend(data, `Specify a Last.FM account name.`);
                    }

                    break;


                case "unlink":
                    sql.get(`SELECT * FROM lfAcc WHERE userId ="${message.author.id}"`)
                        .then(row => {
                            var lfu = row.lfUser;

                            let username = row.lfUser
                            sql.run(`DELETE FROM lfAcc WHERE userId ="${message.author.id}"`)
                                .then(() => {
                                    m.logSend(data, `LF user "${username}" has been unlinked.`);
                                })
                                .catch(err => {
                                    m.logSend(data, `Error unlinking "${username}".`);
                                });
                        });



                    break;


                case "tracks":
                case "last":
                case "artists":
                case "albums":
                case "now":
                    //Same switch used here but this time it checks is user acc exists at the start.

                    var usr = message.author.id;

                    if (argsArr[1]) {
                        usr = argsArr[1].replace("<", "").replace("@", "").replace("!", "").replace(">", "");
                    }

                    sql.get(`SELECT * FROM lfAcc WHERE userId ="${usr}"`)
                        .then(row => {
                            var lfu = row.lfUser;
                            switch (argsArr[0]) {


                                case "tracks":
                                    lfm.user.getTopTracks({
                                        'user': lfu,
                                        'limit': 10
                                    }, (err, topTracks) => {
                                        if (err) {
                                            m.logSend(data, "Error " + err);console.log(err)
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

                                                for (i = 0; i < 10; i++) {
                                                    let tr = topTracks.track[i];
                                                    resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) by **${tr.artist.name}** (${tr.playcount} plays)`;
                                                }
                                                m.log(data, `\`\`\`${resp}\`\`\``);

                                                try {
                                                    const embed = new Discord.RichEmbed()
                                                        .setTitle(`${row.lfUser}'s top 10 Tracks:`)
                                                        .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                        .setDescription(resp)
                                                        .setColor(lfColor);

                                                        

                                                    message.channel.send({ embed });
                                                } catch (eg1) {
                                                    m.log(data, eg1);
                                                }
                                                //resp = "Tracks:\r\n" + objArr[1];
                                                //m.logSend(data, "Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
                                            } catch (err2) {
                                                resp = err2;
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
                                            m.logSend(data, "Error " + err);console.log(err)
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

                                                for (i = 0; i < 10; i++) {
                                                    let tr = recentTracks.track[i];
                                                    resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) by **${tr.artist['#text']}**`;
                                                }
                                                m.log(data, `\`\`\`${resp}\`\`\``);

                                                try {
                                                    const embed = new Discord.RichEmbed()
                                                        .setTitle(`${row.lfUser}'s last 10 Tracks:`)
                                                        .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                        .setDescription(resp)
                                                        .setColor(lfColor);
                                                        console.log(resp)

                                                    message.channel.send({ embed });


                                                    // console.log(JSON.stringify(recentTracks));

                                                } catch (eg1) {
                                                    m.log(data, eg1);
                                                }







                                                //resp = "Tracks:\r\n" + objArr[1];
                                                //m.logSend(data, "Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
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
                                            m.logSend(data, "Error " + err);console.log(err)
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

                                                for (i = 0; i < 10; i++) {
                                                    let tr = topArtists.artist[i];
                                                    resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) (${tr.playcount} plays)`;
                                                }
                                                m.log(data, `\`\`\`${resp}\`\`\``);

                                                try {
                                                    const embed = new Discord.RichEmbed()
                                                        .setTitle(`${row.lfUser}'s top 10 Artists:`)
                                                        .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                        .setDescription(resp)
                                                        .setColor(lfColor);

                                                    message.channel.send({ embed });
                                                } catch (eg1) {
                                                    m.log(data, eg1);
                                                }
                                                //resp = "Tracks:\r\n" + objArr[1];
                                                //m.logSend(data, "Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
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
                                            m.logSend(data, "Error " + err);console.log(err)
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

                                                for (i = 0; i < 10; i++) {
                                                    let tr = topAlbums.album[i];
                                                    resp += `\r\n\`${i + 1}\`\t[${tr.name}](${tr.url}) by **${tr.artist.name}** (${tr.playcount} plays)`;
                                                }
                                                m.log(data, `\`\`\`${resp}\`\`\``);

                                                try {
                                                    const embed = new Discord.RichEmbed()
                                                        .setTitle(`${row.lfUser}'s top 10 Albums:`)
                                                        .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                        .setDescription(resp)
                                                        .setColor(lfColor);

                                                    message.channel.send({ embed });
                                                } catch (eg1) {
                                                    m.log(data, eg1);
                                                }
                                                //resp = "Tracks:\r\n" + objArr[1];
                                                //m.logSend(data, "Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
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
                                            m.logSend(data, "Error " + err);console.log(err)
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
                                              
                                                m.log(data, `\`\`\`${resp}\`\`\``);

                                               

                                                try {
                                                    const embed = new Discord.RichEmbed()
                                                        .setTitle(`${row.lfUser}'s last 10 Tracks:`)
                                                        .setURL(`https://www.last.fm/user/${row.lfUser}`)
                                                        .setDescription(resp)
                                                        .setColor(lfColor);


                                                    message.channel.send({ embed });


                                                     //console.log(JSON.stringify(recentTracks));

                                                } catch (eg1) {
                                                    m.log(data, eg1);
                                                }







                                                //resp = "Tracks:\r\n" + objArr[1];
                                                //m.logSend(data, "Tracks:\r\n" + topTracks[1].name);//({'rank' : 1}).name);
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
                            message.channel.send(errmsg);
                            m.log(data, errmsg + "\r\n\r\n" + err);
                        });


                    break;

                default:

                    break;



            }



            //sql.close("./yerFiles/db/lf.sqlite");


        })
        .catch(() => {
            m.logSend(data, "Not opened");
        });




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
exports.alias = () => {
    return alias;
}
