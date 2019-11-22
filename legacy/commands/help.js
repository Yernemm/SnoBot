
//METADATA
exports.cmdtype = () => {
    return "core";
}
const desc = "Displays help and info about SnoBot."; //Short description of what the command does.
const usage = "[command]"; //Any parameters required for command.
const db = require('./../modules/db.js')
const Enmap = require("enmap");
exports.run = (data) => {
    let config = data.config;
    let client = data.client;
    let message = data.message;
    let argsTxt = data.argsTxt;

    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:


    //PREPARE FILESYSTEM

    const dir = './commands/';
    const fs = require('fs');


    //--FETCH ALL COMMAND INFO--

    //DEFINE CMD CLASS
    function cmdClass(id) {
        this.id = id;
        this.name = "";
        this.desc = "";
        this.usage = "";
        this.type = "";


    }
    var cmdObj = [];
    let count = 0;

    //INSTANTIATE CMD OBJECTS
    //--------------------------------
    let cmdCount = client.commandsNoAlias.keyArray().length;
    client.commandsNoAlias.keyArray().forEach(c =>{
        

       db.checkPerms(data, c, res =>{
        if(res){

            let newCmdObj = {};
            theCmd = client.commandsNoAlias.get(c);
            newCmdObj.name = c;
            newCmdObj.desc = theCmd.desc();
            newCmdObj.usage = theCmd.use();
            newCmdObj.type = theCmd.cmdtype();
            theCmd.alias ? newCmdObj.alias = theCmd.alias() : undefined ;
            cmdObj.push(newCmdObj);
            ///////////////////////////////////////////console.log(cmdObj)
        }
        cmdCount--;
        if(cmdCount === 0) start()
       })
       
    })
    //--------------------------------

    //CMD CLASS FUNCTIONS AND METHODS:

    function getAllTypes(){
        var types = [];

        cmdObj.forEach( (thisCmd) => {
            types.push(thisCmd.type);
        });
        return types.filter(onlyUnique).sort();
    }

    function getAllCmdByType(type){
        var cmds = [];
        cmdObj.forEach( (thisCmd) => {
            if (thisCmd.type == type)
                cmds.push(thisCmd);
        });
        return cmds;
    }

    function findCmdByName(cmdName){
        //message.channel.send("`2|" + cmdName + "|`");
        let toReturn = false;
        cmdObj.forEach( (thisCmd) => {
            console.log("a")
            if (thisCmd.name == cmdName)
            {
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



    function start(){


        var msg = "error";
        switch (argsTxt) {
            case null:
            case "":
            case " ":
    
    
    
    
                msg = `**SnoBot, Made by the SnoBot Team. https://snobot.xyz**\r\nCommunity and Help server: https://discordapp.com/invite/Jee9UQw\r\nv${client.ver.num + "." + client.ver.build} \r\nTo get help for a specific command, do ${config.prefix}help [command]\r\n\r\n`;
                //Line below will be re-added when help command is finished for each command.
                //TO-DO: finish this.
                // msg += "__Use **>help [command]** to view specific help for that command.__\r\n";
    
                msg += "Commands:\r\n"
    
    
                var cmdInfoMsg = "";
                //console.log(getAllTypes());
                getAllTypes().forEach( (type)=>{
                    cmdInfoMsg+= "**" + capitalizeFirstLetter(type) + "**\r\n> ";
                    getAllCmdByType(type).forEach( (tcmd) =>{
                        cmdInfoMsg += `${tcmd.name}   `;
                    });
                    cmdInfoMsg+= "\r\n";
    
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
                    if(c){       
                        msg = `**Help for ${config.prefix}${c.name}**\r\n> ${c.desc}\r\nUsage: \n> \`${config.prefix}${c.name} ${c.usage}\``;
                        if(c.alias && c.alias.length > 0)
                        {
                            msg+="\nAliases:\n> `"
                            c.alias.forEach(a => msg+= a + " ")
                            msg = msg.substring(0, msg.length - 1);
                            msg+="`"
                        }
                    }else{
                        msg = `Command \"${argsTxt}\" not found.\r\nUse **${config.prefix}help** to see available commands.`
                    }
                } catch (err) {
                    msg = `Error`
                }
    
                break;
    
    
        }





        m.logSend(data, msg); //Method will send msg to user, and also log it in both console AND log channel.
    }







   


    //--------------------------------------------------------------------

    //m.log(config, client, message, msg); //Alternative will log msg without sending msg.
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
exports.desc = () => {
    return desc;
}
exports.use = () => {
    return usage;
}