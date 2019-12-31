const Discord = require('discord.js');
class Analytics {

    /**
     * Analytics class provides keeping track of the bot stats for devs.
     * @param {string} channelId
     *  The ID of the Discord channel in which to send analytics data. 
     * @param {Object} client
     *  The logged in Discord.JS client object.
     */
    constructor(client, channelId) {
        this._channelId = channelId;
        this._client = client;
    }

    /**
     * Starts sending analytics data to the channel at the given interval.
     * @param {int} interval 
     *  The time between each message in ms. Default is 1 hour.
     * @returns {boolean}
     *  Confirmation that channel has been found.
     */
    start(interval = 1000 * 60 * 60) {
        if (this._client.channels.get(this._channelId)) {
            this._botInterval();
            setInterval(() => {
                this._botInterval();
            }, interval);
            return true;
        } else return false;
    }

    _botInterval(){
        let svnum = this._client.guilds.array().length;
        let chnum = this._client.channels.array().length;
        let usnum = 0;
        this._client.guilds.array().forEach(element => {
            usnum += element.memberCount;
        });

        //TODO: list number of clever channels.
        //must upgrade CleverHandler.js and db.js first to add required functionality.
        let statsMsg = 
        `Servers: ${svnum}
        Channels: ${chnum}
        Users: ${usnum}`;
        const embed = new Discord.RichEmbed()
            .setTitle("Bot Stats")
            .addField("Stats",
                statsMsg
            )
            .addField("Version",
            "v" + this._client.ver.num + "." + this._client.ver.build)
            .setTimestamp();

            console.log(statsMsg);

        this._client.channels.get(this._channelId).send({
            embed
        });
        
    }


}

module.exports = Analytics;