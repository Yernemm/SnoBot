
class Ready
{
    constructor(bot){
      this.bot = bot;
    }

    run(client){
        console.log(`Logged in as ${client.user.tag}`);
        console.log(this.bot.commandHandler.commands.keyArray());
    }


}
module.exports = Ready;