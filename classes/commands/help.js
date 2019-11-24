var bot;
class Help {
    constructor(botPass) {
        this.desc = "h"; //Short description of what the command does.
        this.usage = ""; //Any parameters required for command.
        this.cmdtype = "core"; //Type of command.
        this.alias = []; //Aliases for the command.
        bot = botPass;
        console.log(bot.commandHandler.commands.keyArray())
    }

    run(data) {
        console.log(bot.commandHandler.commands.keyArray())
        let config = data.config;
        let client = data.client;
        let message = data.message;
        let argsTxt = data.argsTxt;

    
      

        var msg = ""; //Put response message to be logged here.
        //--------------------------------------------------------------------

        //COMMAND LOGIC HERE:


        //PREPARE FILESYSTEM

        const dir = './commands/';
        const fs = require('fs');


        //--FETCH ALL COMMAND INFO--


        var cmdObj = [];

        //INSTANTIATE CMD OBJECTS
        //--------------------------------
        
        let cmdCount = bot.commandHandler.commandsNoAlias.keyArray().length;
        console.log(cmdCount)
        bot.commandHandler.commandsNoAlias.array().forEach(c => {
            console.log("e")

            bot.commandHandler.permissions.checkPerms(data, c, res => {
                if (res) {
                    console.log("ebgames")
                    let newCmdObj = {};
                    let theCmd = c;
                    newCmdObj.name = c.constructor.name;
                    newCmdObj.desc = theCmd.desc;
                    newCmdObj.usage = theCmd.usage;
                    newCmdObj.type = theCmd.cmdtype;
                    theCmd.alias ? newCmdObj.alias = theCmd.alias : undefined;
                    cmdObj.push(newCmdObj);
                    ///////////////////////////////////////////console.log(cmdObj)
                }
                cmdCount--;
                if (cmdCount === 0) start()
            })

        })

        
        //--------------------------------

        //CMD CLASS FUNCTIONS AND METHODS:

        function getAllTypes() {
            var types = [];

            cmdObj.forEach((thisCmd) => {
                types.push(thisCmd.type);
            });
            console.log(types)
            console.log(types.filter(onlyUnique).sort())
            return types.filter(onlyUnique).sort();
        }

        function getAllCmdByType(type) {
            var cmds = [];
            cmdObj.forEach((thisCmd) => {
                if (thisCmd.type == type)
                    cmds.push(thisCmd);
            });
            console.log(cmds)
            return cmds;
        }

        function findCmdByName(cmdName) {
            //message.channel.send("`2|" + cmdName + "|`");
            let toReturn = false;
            cmdObj.forEach((thisCmd) => {
                console.log("a")
                if (thisCmd.name == cmdName) {
                    //message.channel.send("`3|" + thisCmd.name + "|`");
                    console.log(thisCmd)
                    toReturn = thisCmd;
                }
            });
            console.log("escaped")
            //message.channel.send("`4| escaped`");
            return toReturn;
        }


        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }



        //-----------------



        function start() {

            console.log("starting help")
            var msg = "error";
            switch (argsTxt) {
                case null:
                case "":
                case " ":




                    msg = `**SnoBot, Made by the SnoBot Team. https://snobot.xyz**\r\nCommunity and Help server: https://discordapp.com/invite/Jee9UQw\r\nv${bot.ver.num + "." + bot.ver.build} \r\nTo get help for a specific command, do ${config.prefix}help [command]\r\n\r\n`;
                    //Line below will be re-added when help command is finished for each command.
                    //TO-DO: finish this.
                    // msg += "__Use **>help [command]** to view specific help for that command.__\r\n";

                    msg += "Commands:\r\n"


                    var cmdInfoMsg = "";
                    console.log(getAllTypes());
                    getAllTypes().forEach((type) => {
                        cmdInfoMsg += "**" + capitalizeFirstLetter(type) + "**\r\n> ";
                        getAllCmdByType(type).forEach((tcmd) => {
                            cmdInfoMsg += `${tcmd.name}   `;
                        });
                        cmdInfoMsg += "\r\n";

                    });

                    msg += "\r\n" + cmdInfoMsg;




                    break;
                default:

                    let cmd = argsTxt;
                    try {
                        /*let file = require(`./${cmd}.js`);
    
                    let de = file.desc();
                    let us = file.use();
                    msg = `**Help for ${config.prefix}${cmd}**\r\n${de}\r\nUsage: ${config.prefix}${cmd} ${us}`;
                    */
                        let c = findCmdByName(cmd)
                        console.log(c)
                        if (c) {
                            msg = `**Help for ${config.prefix}${c.name}**\r\n> ${c.desc}\r\nUsage: \n> \`${config.prefix}${c.name} ${c.usage}\``;
                            if (c.alias && c.alias.length > 0) {
                                msg += "\nAliases:\n> `"
                                c.alias.forEach(a => msg += a + " ")
                                msg = msg.substring(0, msg.length - 1);
                                msg += "`"
                            }
                        } else {
                            msg = `Command \"${argsTxt}\" not found.\r\nUse **${config.prefix}help** to see available commands.`
                        }
                    } catch (err) {
                        msg = `Error`
                    }

                    break;


            }


            message.channel.send(msg);
        }
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
    }

    
}
module.exports = Help;