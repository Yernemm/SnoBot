const Enmap = require("enmap");
const Config = require('./../../config.json');
const fs = require('fs');
class CommandHandler {

    
    constructor() {
        this.commands = new Enmap(); //all commands with aliases
        this.commandsNoAlias = new Enmap(); //all unique commands
        this._loadCommands();
        this.config = Config;
    }

    /**
     * Gets command by name.
     * @param {string} cmdName 
     * The string name of the command.
     * @returns {class}
     * The command class.
     */
    getCommand(cmdName) {

    }

    /**
     * Loads all commands and aliases into class enmaps.
     */
    _loadCommands() {
        fs.readdir("./classes/commands/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let propsClass = require(`./../commands/${file}`);
                let props = new propsClass();
                let commandName = file.split(".")[0];
                console.log(`Attempting to load command ${commandName}`);
                this.commands.set(commandName, props);
                this.commandsNoAlias.set(commandName, props);
                if (props.alias) {
                    props.alias.forEach(alias => {
                        console.log(`Attempting to load alias ${alias}`);
                        this.commands.set(alias, props);
                    });
                }
            });
        });
    }

    handleCommand(message, client) {

        //Reject messages not starting with prefix.
        //Replace bot mentions with prefix.
        if (message.content.indexOf(this.config.prefix) === 0) {} else if (message.content.startsWith(`<@${client.user.id}>`))
            message.content = message.content.replace(`<@${client.user.id}>`, this.config.prefix);
        else if (message.content.startsWith(`<@!${client.user.id}>`))
            message.content = message.content.replace(`<@!${client.user.id}>`, this.config.prefix);
        else {

            // CleverHandler.messageEventClever(message.channel, message.content);
            return;
        }
        //Remove space after prefix.
        if (message.content[this.config.prefix.length] === " ")
            message.content = message.content.replace(this.config.prefix + " ", this.config.prefix);



        // Our standard argument/command name definition.
        const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const argsTxt = message.content.slice(this.config.prefix.length + command.length).trim();

        // Grab the command data from the this.commands Enmap
        const cmd = this.commands.get(command);

        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;

        let data = {};

        data.config = this.config;
        data.message = message;
        data.argsArr = args;
        data.argsTxt = argsTxt;
        data.cmd = cmd;

        // Run the command

        cmd.run(data);

        /*
        db.checkPerms(data, command, res => {
            if (res)
                cmd.run(data);
            else
                data.message.channel.send("You do not have permission to use this command.");
        });
        */
    }

}
module.exports = CommandHandler;