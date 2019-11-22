const Analytics  = require('./../modules/Analytics.js')
const DBL = require("dblapi.js");

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}`);
    let presence = ""
    if(client.ver.branch == "dev")
    presence += "[DEV] ";
    presence += `snobot.xyz  |  ${"v" + client.ver.num + "." + client.ver.build}`
    client.user.setPresence({ status: 'online', game: { name: presence } });

    //dblapi
if(client.ver.branch == "master")
{
  console.log("Attempting to send dblapi stats...")
  const dbl = new DBL(client.config.dblapiKey, client);  

  dbl.postStats(client.guilds.size);
  setInterval(() => {
    dbl.postStats(client.guilds.size);
}, 1800000);

  // Optional events
dbl.on('posted', () => {
console.log('Server count posted!');
})

dbl.on('error', e => {
console.log(`Oops! ${e}`);
})

}



    console.log("Servers: " + client.guilds.size)

    let analytics = new Analytics(client, client.config.analyticsChannel)
    analytics.start();    
  };