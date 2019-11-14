const db = require('./db.js');
const Discord = require("discord.js");
const fetchVideoInfo = require('youtube-info');
class YouTubeEmbedFixer {

    triggerDesc = "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.";

    /**
     * Instantiate on bot creation.
     * @param {bool} debugMode
     * if true, will send debug info when checking.
     */
    constructor(debugMode = false) {
        this.debugMode = debugMode;
    }

    /**
     * Run this in message event. Will check if message needs fixing and send the fixed embed.
     * @param {DiscordMessage} message
     * Message to check and fix. 
     */
    runFix(message) {
        if (message.guild.available) {
            this.checkIfEnabled(message, (res) => {
                if (res) {

                    let rg = /(((?<=youtu.be\/).*)|((?<=youtube.com\/watch\?v=).*))/g

                    let ids = message.content.match(rg)

                    if (ids) {
                        this.sendDebug(message.channel, id);
                        if (message.embeds && message.embeds[0].description.startsWith(this.triggerDesc))
                            ids.forEach(id => {
                                this.sendDebug(message.channel, id);
                                this.generateEmbed(id, embed => {
                                    if (embed !== false)
                                        message.channel.send(embed)
                                    else
                                        this.sendDebug(message.channel, "fail")
                                })

                            })
                    }

                }

            })
        }
    }

    /**
     * Async - Checks if fix is enabled in this server. Callback returned with boolean response.
     * @param {function} callback
     *  The function to call after the check is done. 
     */
    checkIfEnabled(message, callback) {
        db.getFrom("YouTubeEmbedFixerServers", message.guild.id)
            .then(val => {
                if (val === false || val.enabled == false)
                    callback(false)
                else
                    callback(true)
            })
            .catch(() => callback(false))
    }

    /**
     * Generates Discord embed for video from id.
     * @param {string} ytId 
     *  ID of YouTube video.
     * @param {function} callback 
     *  returns embed. Returns false if failed.
     */
    generateEmbed(ytId, callback) {

        fetchVideoInfo(ytId).then(function (videoInfo) {
                console.log(videoInfo);
                let ytEmbed = new Discord.RichEmbed()
                    .setColor('ff0000')
                    .setTitle(videoInfo.title)
                    .setURL(videoInfo.url)
                    .setAuthor(videoInfo.owner)
                    .setImage(videoInfo.thumbnailUrl)
                    .setTimestamp()

                callback(ytEmbed);
            })
            .catch(() => callback(false));
    }

    sendDebug(channel, msg) {
        if (this.debugMode)
            channel.send(msg);
        console.log(msg);
    }

    /**
     * Adds server to list of ytfixed servers.
     * @param {string} serverId 
     * ID of the server.
     */
    addServer(serverId) {
        db.setTo("CleverChannels", channelId, {
                "clever": true
            })
            .then()
            .catch()
    }

    /**
     * Removes server from list of ytfixed servers.
     * @param {string} serverId 
     * ID of the server.
     */
    removeServer(serverId) {
        db.setTo("CleverChannels", channelId, {
                "clever": false
            })
            .then()
            .catch()
    }

}
module.exports = YouTubeEmbedFixer;