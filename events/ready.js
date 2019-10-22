const DBL = require("dblapi.js");

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}`);
    let presence = ""
    if(client.ver.branch == "dev")
    presence += "[DEV] ";
    presence += `snobot.xyz  |  ${"v" + client.ver.num + "." + client.ver.build}`
    client.user.setPresence({ status: 'online', game: { name: presence } });

    //dblapi

    console.log("Servers: " + client.guilds.size)
    if(client.ver.branch !== "dev")
    {
      const dbl = new DBL(client.config.dblapiKey, client);  

      // Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

    }
  };