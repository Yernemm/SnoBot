const CleverChannel = require('./CleverChannel.js');
class CleverHandler
{

//TO-DO: Store the clever channel states in memory to avoid reading from disk every message.

/*
Run this on every message in the message event.
Checks if the channel is clever and sends message from correct session.
messageChannel: the discord channel object, e.g. message.channel
messageTxt: the contents of the message to send.
*/

constructor(bot)
{
    this.cleverSessions = {};
    this.db = bot.db;
}

messageEventClever(messageChannel, messageTxt)
{
    
    checkCleverChannel(messageChannel.id, res => {
        if(res){
            messageChannel.startTyping();
            let session = getChannelSession(messageChannel.id)
            
            session.queue(messageTxt).then(resp => {
                messageChannel.send(resp)
                .finally(messageChannel.stopTyping());
            })
            
        }
    })
    
}

//Add a clever channel to database.
addCleverChannel(channelId)
{
    this.db.setTo("CleverChannels", channelId, {"clever" : true})
    .then()
    .catch()
}

//Remove a clever channel from database.
removeCleverChannel(channelId)
{
    this.db.setTo("CleverChannels", channelId, {"clever" : false})
    .then()
    .catch()
}

//Check if a channel is clever.
checkCleverChannel(channelId, callback)
{
    this.db.getFrom("CleverChannels", channelId)
    .then(val => {
        if(val === false || val.clever == false)
        callback(false)
        else
        callback(true)
    })
    .catch(() => callback(false))
}

/*  
Check if a channel has a session
if yes, return it
if not, create one
*/
getChannelSession(channelId)
{
    if(cleverSessions[channelId] === undefined)
    cleverSessions[channelId] = new CleverChannel();

    return cleverSessions[channelId];   
}
}
module.exports = CleverHandler;