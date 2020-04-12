const Discord = require('discord.js');
const request = require('request');
module.exports =
    class Command {
        constructor() {
            this.metadata = {
                commandWord: 'inspirobot',
                aliases: ['inspire'],
                description: 'Returns an image from <https://inspirobot.me>\nOptionally put `xmas` after the command to view xmas images.',
                usage: '[xmas]',
                category: 'fun',
                permissions: [],
                ownerOnly: false
            };
        }

        run(sno) {
            //sno contains { bot, message, command, args, argsText, respond }

            let apiLink = "http://inspirobot.me/api?generate=true";

            if (sno.args[0] == "xmas")
                apiLink += "&season=xmas";

            request(apiLink, function (error, response, body) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Get inspired...")
                    .setColor(sno.args[0] === "xmas" ? 0x5b0609 : 0x229c18)
                    .setImage(body);
                sno.respond('',{embed});
            });


        }
    }