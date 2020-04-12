//This module contains the procedures for setting and loading clever channels.
//It connects CleverChannel.js with the bot and saves data with db.js
const CleverChannel = require('./CleverChannel.js');
const db = require('./db.js');

var cleverSessions = {};

module.exports = {
    messageEventClever,
    addCleverChannel,
    removeCleverChannel,
    checkCleverChannel
}

//TO-DO: Store the clever channel states in memory to avoid reading from disk every message.

/*
Run this on every message in the message event.
Checks if the channel is clever and sends message from correct session.
messageChannel: the discord channel object, e.g. message.channel
messageTxt: the contents of the message to send.
*/
function messageEventClever(messageChannel, messageTxt)
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
function addCleverChannel(channelId)
{
    db.setTo("CleverChannels", channelId, {"clever" : true})
    .then()
    .catch()
}

//Remove a clever channel from database.
function removeCleverChannel(channelId)
{
    db.setTo("CleverChannels", channelId, {"clever" : false})
    .then()
    .catch()
}

//Check if a channel is clever.
function checkCleverChannel(channelId, callback)
{
    db.getFrom("CleverChannels", channelId)
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
function getChannelSession(channelId)
{
    if(cleverSessions[channelId] === undefined)
    cleverSessions[channelId] = new CleverChannel();

    return cleverSessions[channelId];   
}


