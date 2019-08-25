module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ status: 'online', game: { name: `snobot.yernemm.xyz` } });
    client.channels.get("388133568863535106").send("bruh moment")
  };