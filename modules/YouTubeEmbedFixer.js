const db = require('./db.js');
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


    
}
module.exports = YouTubeEmbedFixer;