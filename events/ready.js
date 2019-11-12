const Analytics  = require('./../modules/Analytics.js')

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}`);
    let presence = ""
    if(client.ver.branch == "dev")
    presence += "[DEV] ";
    presence += `snobot.xyz  |  ${"v" + client.ver.num + "." + client.ver.build}`
    client.user.setPresence({ status: 'online', game: { name: presence } });



    console.log("Servers: " + client.guilds.size)

    let analytics = new Analytics(client, client.config.analyticsChannel)
    analytics.start();    
  };