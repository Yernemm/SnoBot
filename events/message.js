const db = require('./../modules/db.js')
module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (
      message.content.indexOf(client.config.prefix) !== 0
      ||
      message.content.startsWith(`<@${client.user.id}>`)
      ) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const argsTxt = message.content.slice(client.config.prefix.length + command.length).trim();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    let data = {};

    data.config = client.config
    data.client = client
    data.message = message
    data.argsArr = args
    data.argsTxt = argsTxt
    data.cmd = cmd
  
    // Run the command
    db.checkPerms(data, command, res =>{
      if (res)
      cmd.run(data);
      else
      data.message.channel.send("You do not have permission to use this command.")
    })

  };