const Discord = require('discord.js');
module.exports = 
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'ow',
            aliases: [''],
            description: 'Gets Overwatch stats and user information. Use ow help for more info.',
            usage: 'help',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }


    const m = require('./../../shared/methods.js');
    const sqlite = require("sqlite");
    const request = require("request");

    const msgNotFound = "User not found.";
    const msgPrivate = "Profile set to private. Open Overwatch and set your career profile to public in the social settings.";
    const msgStatNotFound = "No stats found.";

    const fetchMsg = "Fetching stats. This might take a couple seconds...";

    const mainColour = 0xfa9c1e;
    const owLogoImg = "https://yernemm.xyz/media/image/owLogo.png";

    switch (sno.args[0]) {
        case "help":


            const embed = new Discord.MessageEmbed()
                .setTitle("Overwatch Command Help")
                .addField("Linking", "You can link an account using `ow link <platform> <region> <username>`. For rexample, `ow link pc us Player#1234`. \nPlatforms include: `pc, xbl, psn`\nRegions include: `us, eu, kr`\n\nIf you made a mistake or you have a new account, use `ow unlink` to unlink your account and then `ow link` again to link it to the new one.", true)
                .addField("Modes", "You can get Overwatch stats by using `ow <mode>`.\nCurrent modes are: `stats, playtime`.", true)
                .addField("Other Players", "You can get stats for other players by appending either their discord ID or mention, or putting their own Overwatch details. For example `ow stats @MyDiscordFriend` or `ow stats pc eu MyOverwatchFriend#1234`", true)
                .setDescription("This command will get information and stats about your overwatch account.")
                .setThumbnail(owLogoImg)
                .setColor(mainColour);


            sno.respond('',{embed});

            //m.log(data, "Overwatch Command Help");



            break;

        default:

            if (validatePlatform() && sno.args[0] != "link") {
                if (validateLink(0)) {

                    var user = sno.argsText.slice(sno.args[0].length + sno.args[1].length + sno.args[2].length + 3);
                    var plat = sno.args[1].toLowerCase();
                    var regi = sno.args[2].toLowerCase();



                    if (plat == "pc" && user.includes("#")) {
                        user = user.split('#')[0] + "-" + user.split('#')[1];
                    }

                    //console.log(user);
                    //console.log(plat);
                    //console.log(regi);

                    switch (sno.args[0]) {
                        case "stats":
                            statsCmd(plat, regi, user);
                            break;
                        case "playtime":
                            playtimeCmd(plat, regi, user);
                            break;
                    }
                } else {
                    sno.respond("Invalid user details.");
                }

            } else {


                const dbp = sqlite.open("./data/db/owUsers.sqlite")
                    .then(sql => {



                        //Get user info


                        var usr = sno.message.author.id;

                        if (sno.args[1]) {
                            usr = sno.args[1].replace("<", "").replace("@", "").replace("!", "").replace(">", "");
                        }

                        sql.get(`SELECT * FROM owAcc WHERE userId ="${usr}"`)
                            .then(row => {




                                switch (sno.args[0]) {

                                    case "link":


                                        sno.respond(`Account already linked to "${row.username} ${row.platform} ${row.region}". Consider unlinking with _'ow unlink'_.`);




                                        break;

                                    case "unlink":

                                        sql.get(`SELECT * FROM owAcc WHERE userId ="${sno.message.author.id}"`)
                                            .then(row => {


                                                let username = row.username;
                                                sql.run(`DELETE FROM owAcc WHERE userId ="${sno.message.author.id}"`)
                                                    .then(() => {
                                                        sno.respond(`Overwatch user "${username}" has been unlinked.`);
                                                    })
                                                    .catch(err => {
                                                        sno.respond(`Error unlinking "${username}".`);
                                                    });
                                            });




                                        break;

                                    case "stats":
                                        statsCmd(row.platform, row.region, row.username);

                                        break;

                                    case "playtime":

                                        playtimeCmd(row.platform, row.region, row.username);



                                        break;

                                    default:

                                        break;


                                }



                            })
                            .catch(err => {
                                if (sno.args[0] != "help" && sno.args[0] != "link" && sno.args[0] != "unlink") {
                                    let errmsg = "Linked account not found. Consider using _'ow link'_."
                                    sno.message.channel.send(errmsg);
                                    //m.log(data, errmsg + "\r\n\r\n" + err);
                                }

                                switch (sno.args[0]) {


                                    case "link":

                                        //platform region username

                                        if (validateLink() != false) {

                                            var user = sno.argsText.slice("link ".length + sno.args[1].length + sno.args[2].length + 2);
                                            var plat = sno.args[1].toLowerCase();
                                            var regi = sno.args[2].toLowerCase();

                                            if (plat == "pc" && user.includes("#")) {
                                                user = user.split('#')[0] + "-" + user.split('#')[1];
                                            }

                                            sql.get(`SELECT * FROM owAcc WHERE userId ="${sno.message.author.id}"`)
                                                .then(row => {
                                                    msg = `Account already linked to "${row.username} ${row.platform} ${row.region.toLowerCase()}". Consider unlinking with _'ow unlink'_.`
                                                    sno.respond(msg);
                                                })
                                                .catch(err => {
                                                    //m.log(data, err + " -1 ");
                                                    sql.run(`CREATE TABLE IF NOT EXISTS owAcc (userId TEXT, username TEXT, platform TEXT, region TEXT)`)
                                                        .then(() => {
                                                            sql.run(`INSERT INTO owAcc (userId, username, platform, region) VALUES (?, ?, ?, ?)`, [sno.message.author.id, user, plat, regi])
                                                                .then(() => {
                                                                    sno.respond(`Discord account linked to: \r\n    Username: "${user}"\r\n    Platform: "${plat}"\r\n    Region: "${regi}"`);
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
                                            sno.respond("Invalid linking parameters.");
                                        }


                                        break;
                                }

                            });



                    });
            }
            break;


    }

    //--------------------------------------------------------------------
    ////m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    ////m.log(config, client, message, msg); //Alternative will log msg without sending msg.


    function validateLink(offset = 0) {
        //platform region username
        //TO-DO: FINISH VALIDATION
        if (sno.args[1 + offset] != null && sno.args[2 + offset] != null && sno.args[3 + offset] != null) {
            var flag = true;
            var user = sno.argsText.slice(sno.args[1 + offset].length + sno.args[2 + offset].length + 2);
            var plat = sno.args[1 + offset];
            var regi = sno.args[2 + offset];

            switch (plat.toLowerCase()) {
                case "pc":
                case "xbl":
                case "psn":
                    break;
                default:
                    flag = false;
                    break;
            }

            switch (regi.toLowerCase()) {
                case "eu":
                case "us":
                case "kr":
                    break;
                default:
                    flag = false;
                    break;
            }
            return flag;

        } else {
            return false;
        }
    }

    function validatePlatform(offset = 0) {
        var flag = true;
        var plat = sno.args[1 + offset];
        if (plat) {
            switch (plat.toLowerCase()) {
                case "pc":
                case "xbl":
                case "psn":
                    break;
                default:
                    flag = false;
                    break;
            }
            return flag;
        } else return false;
    }


    function getOwApiLink(user, platform, type) {
        //types include blob stats achievements heroes
        return `https://owapi.net/api/v3/u/${user}/${type}?platform=${platform}`;
    }




    function round2dp(number) {
        return Math.round(number * 100) / 100
    }

    function sHeroes(heroes) {
        var sortedHeroes = [];

        for (var hero in heroes) {
            sortedHeroes.push([hero, heroes[hero]]);
        }

        sortedHeroes.sort(function (a, b) {
            return a[1] - b[1];
        });
        sortedHeroes.reverse();

        //console.log(sortedHeroes);

        var heroS = [];

        var counter = 1;
        sortedHeroes.forEach(h => {
            heroS.push(`${counter}) **${m.capitalizeFirstLetter(h[0])}** (${round2dp(h[1])}h)`)
            counter++;
        });

        return heroS;

    }

    function statsCmd(platform, region, username) {

        sno.message.channel.send(fetchMsg).then(initmsg => {
            var options = {
                url: getOwApiLink(username, platform, "blob"),
                headers: {
                    'User-Agent': 'request'
                }
            };
            request(options, function (error, response, body) {
                //console.log(body)
                var parsed = JSON.parse(body);
                if (parsed.error == 404) {
                    sno.respond(msgNotFound);
                } else if (parsed.error == "Private") {
                    sno.respond(msgPrivate);
                } else {
                    //console.log(body);

                    //Do stuff for console players:

                    if (parsed[region.toLowerCase()] == null) {
                        sno.respond("No data found for region " + region.toLowerCase());
                    } else {
                        var userStats = parsed[region.toLowerCase()].stats;
                        var heroStats = parsed[region.toLowerCase()].heroes;

                        var statsFlag = true;
                        let mainStats;
                        if (userStats.quickplay) { mainStats = userStats.quickplay; }
                        else if (userStats.competitive) { mainStats = userStats.competitive; }
                        else {
                            sno.respond(msgStatNotFound);
                            statsFlag = false;
                        }
                        if (statsFlag) {
                            var statsPage = "";
                            statsPage +=
                                `Level: **${(userStats.quickplay.overall_stats.prestige * 100) + userStats.quickplay.overall_stats.level}**\r\n`;

                            var qpStats = msgStatNotFound;

                            //Sort heroes.
                            if (userStats.quickplay) {
                                var heroes = heroStats.playtime.quickplay;


                                var heroS = sHeroes(heroes);


                                qpStats = "" +
                                    `Time played: **${round2dp(userStats.quickplay.game_stats.time_played)}h**\r\n` +
                                    `Most played:\r\n${heroS[0]}\r\n${heroS[1]}\r\n${heroS[2]}`
                            }

                            var corank = "Unranked"
                            var coStats = msgStatNotFound;
                            if (userStats.competitive) {



                                var heroes = heroStats.playtime.competitive;

                                var heroS = sHeroes(heroes);


                                coStats = "" +
                                    `Time played: **${round2dp(userStats.competitive.game_stats.time_played)}h**\r\n` +
                                    `Most played:\r\n${heroS[0]}\r\n${heroS[1]}\r\n${heroS[2]}`;

                                if (userStats.competitive.overall_stats.comprank != null) {
                                    corank = m.capitalizeFirstLetter(userStats.competitive.overall_stats.tier) + ` (${userStats.competitive.overall_stats.comprank} SR)`;
                                }
                            }


                            statsPage += `Competitive rank: **${corank}**`;


                            const embed = new Discord.MessageEmbed()
                                .setTitle("Overwatch Stats for " + username)
                                .setDescription(statsPage)
                                .setThumbnail(userStats.quickplay.overall_stats.avatar)
                                .addField("Quickplay", qpStats, true)
                                .addField("Competitive", coStats, true)
                                .setColor(mainColour);




                            sno.respond('',{embed});
                            initmsg.delete();
                            //m.log(data, statsPage);
                        }
                    }
                }
            });
        });



    }


    function playtimeCmd(platform, region, username) {
        sno.message.channel.send(fetchMsg).then(initmsg => {
            var options = {
                url: getOwApiLink(username, platform, "blob"),
                headers: {
                    'User-Agent': 'request'
                }
            };
            request(options, function (error, response, body) {
                var parsed = JSON.parse(body);
                if (parsed.error == 404) {
                    sno.respond(msgNotFound);
                } else if (parsed.error == "Private") {
                    sno.respond(msgPrivate);
                } else {
                    //console.log(body);

                    //Do stuff for console players:

                    if (parsed[region.toLowerCase()] == null) {
                        sno.respond("No data found for region " + region.toLowerCase());
                    } else {

                        var heroStats = parsed[region.toLowerCase()].heroes;
                        var userStats = parsed[region.toLowerCase()].stats;





                        //Sort heroes.
                        var qpStats = msgStatNotFound;

                        if (userStats.quickplay) {
                            var heroes = heroStats.playtime.quickplay;


                            var heroS = sHeroes(heroes);
                            qpStats = "";
                            heroS.forEach(h => {
                                qpStats += h + "\r\n";
                            });
                        }




                        var coStats = msgStatNotFound;
                        if (userStats.competitive) {


                            var heroes = heroStats.playtime.competitive;

                            var heroS = sHeroes(heroes);

                            coStats = "";
                            heroS.forEach(h => {
                                coStats += h + "\r\n";
                            });
                        }



                        const embed = new Discord.MessageEmbed()
                            .setTitle("Overwatch Stats for " + username)
                            .setDescription("Play time stats for all heroes:")
                            .setThumbnail(userStats.quickplay.overall_stats.avatar)
                            .addField("Quickplay", qpStats, true)
                            .addField("Competitive", coStats, true)
                            .setColor(mainColour);




                        sno.respond('',{embed});
                        initmsg.delete();
                        //m.log(data, "Play time stats for all heroes");

                    }
                }
            });
        });



    }
        


    }
}
