module.exports = (client) => {
  
    console.log(`Logged in as ${client.user.tag}`);
    let presence = ""
    if(client.ver.branch == "dev")
    presence += "[DEV] ";
    presence += `snobot.xyz  |  ${"v" + client.ver.num + "." + client.ver.build}`
    client.user.setPresence({ status: 'online', game: { name: presence } });
  };