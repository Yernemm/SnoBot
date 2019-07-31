exports.run = (client, message, args) => {
    message.channel.send(`Hello, World! Hello, ${message.member.displayName}.`).catch(console.error);
}