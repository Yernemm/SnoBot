const Discord = require('discord.js');
const m = require("../../shared/methods.js");
const { DiceRoll } = require('rpg-dice-roller/lib/umd/bundle.js');
module.exports =
class Command
{
    constructor()
    {
        this.metadata = {
            commandWord: 'roll',
            aliases: ['r'],
            description: 'Roll a die for an RPG game like D&D. Interacts with the RPG Dice Roller module. More usage info at https://greenimp.github.io/rpg-dice-roller/ \n\n Usage examples include\nroll 1d6\nroll 2d6 + 1d4\netc.\n\nNote: This command is more restricted than the module due to some operations or modifiers having the possibility to cause an endless loop, which would break the bot.',
            usage: '<roll code>',
            category: 'utility',
            permissions: [],
            ownerOnly: false
        };
    }

    run(sno)
    {
        //sno contains { bot, message, command, args, argsText, respond }



        let res;

        if(sno.argsText.length <= 0){
            sno.respond("Enter the dice roll.");
        }else if (/([0-9][0-9][0-9][0-9])/g.test(sno.argsText)){
            sno.respond("Entered numbers are too large.");
        }else{

            //let bannedCombos = ['!>=0', '!p>=0', '!p>0', '!>=-', '!p>=-', '!p>-', '!>0', '!>-'];

            //let bannedCombos = ['>', '<', '!', "r", "exp", "log", "max", "min", "pow", "sign"];
            let bannedCombos = ['!', "r"];
            let flag = true;
            let bannedOps = "";
            bannedCombos.forEach(c=>{
                if (sno.argsText.includes(c)){
                    flag = false;
                    bannedOps += c + " ";
                }
            });

            if(flag){
                try {
                    res = new DiceRoll(sno.argsText);
                } catch (error) {
                    res = "Some error has occurred."
                    if(error.name == "SyntaxError"){
                        res = "The roll is incorrect. Please use 'help roll' for more info about this command.\n\n"
                        //res += "*" + error.message +"*";
                    }
                } finally {
                    sno.respond(res.toString().length <= 2000 ? res : "... " + res.toString().substr(-1996, 1996));
                }

            } else {
                sno.respond("Dice roll contains a banned operation or modifier: " + bannedOps);
            }


        }

    }
}
