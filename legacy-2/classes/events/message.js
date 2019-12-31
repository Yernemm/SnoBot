const CommandHandler = require('./../bot/CommandHandler.js');
class Message
{
    constructor(bot){
        console.log("Loading message handler...");
        this.commandHandler = bot.commandHandler;
    }

    run(client, message){
        this.commandHandler.handleCommand(message, client);
    }


}
module.exports = Message;