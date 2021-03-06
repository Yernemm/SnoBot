'use strict';
const Response = require('snocord').Response;
const utils = require('snocord').utils;
const CleverHandler = require('./CleverHandler.js');

class CleverResponse extends Response {

    constructor(bot) {
      let testobj = {
        promise: (message,bot)=>{
            return CleverHandler.checkCleverChannelCache(message.channel.id);
        }
      };
      console.log(typeof testobj);
        super(testobj,sno=>this.cleverfunct(sno),2,1000)
    }

    cleverfunct(sno){
        console.log(`CLEVER REQUEST: |${sno.message.guild.name} (${sno.message.guild.id})| ${sno.message.content}`);
        CleverHandler.messageEventClever(sno.message.channel, sno.message.content);
        
    }

    /**
     * Send message if user on cooldown
     * @param {Discord#message} message message
     * @param {Bot} bot bot
     * @param {number} cooldownStamp stamp of time after cooldown is over
     */
    runCooldown(message, bot, cooldownStamp)
    {
        /*
        message.reply(`Please wait **${utils.msToTime(cooldownStamp - Date.now())}** before sending another message.`)
        .then((msg)=>{
            msg.delete({timeout: 5000})
            .then(()=>{}).catch(()=>{});
            message.react('🚫')
            .then(()=>{}).catch(()=>{});
        });;
        */

       //Temporarily disabled due to a bug which triggered this block at random times outside of clever channels.
    }


}

module.exports = CleverResponse;
