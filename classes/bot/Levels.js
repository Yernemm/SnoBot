const cooldown = 60 * 1000;  //Cooldown per exp drop, in milliseconds.
const expMin = 10;  //Min exp drop.
const expMax = 30;  //Max exp drop.
const lenBonus = 10; // Max bonus exp for message length.
const maxMsgLength = 20000 //Max Discord msg length.
class Levels
{
    constructor(bot)
    {
        this.db = bot.db;
    }
}
module.exports = Levels;