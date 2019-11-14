const db = require('./db.js');
const Discord = require("discord.js");
const fetchVideoInfo = require('youtube-info');
class YouTubeEmbedFixer {


   /**
    * Instantiate on message sent.
    * @param {DiscordMessage} message 
    * The message object to check
    */
    constructor(message){
        if(message.guild.available){
        this.message = message;
        }
    }

    /**
     * Async - Checks if fix is enabled in this server. Callback returned with boolean response.
     * @param {function} callback
     *  The function to call after the check is done. 
     */
    checkIfEnabled(callback){
        db.getFrom("YouTubeEmbedFixerServers", this.message.guild.id)
    .then(val => {
        if(val === false || val.enabled == false)
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
    generateEmbed(ytId, callback){

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
            .catch(()=>callback(false));
           
    }


    
}
module.exports = YouTubeEmbedFixer;