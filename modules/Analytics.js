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
        if (this.client.channels.get(this.channelId)) {
            setInterval(() => {
                const embed = new Discord.RichEmbed()
                    .setTitle("Bot Stats")
                    .addField("Stats",
                        `Servers: ${this.client.guilds.toArray().length}`
                    )
                    .setTimestamp();

                this.client.channels.get(this.channelId).send({
                    embed
                });
                return true;
            }, interval);
        } else return false;
    }


}

module.exports = Analytics;