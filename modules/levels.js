const db = require("./db.js");

const cooldown = 60 * 1000;  //Cooldown per exp drop, in milliseconds.
const expMin = 10;  //Min exp drop.
const expMax = 30;  //Max exp drop.
const lenBonus = 10; // Max bonus exp for message length.
const maxMsgLength = 20000 //Max Discord msg length.

var cooldownMap = {};

module.exports = {
    calcLevel: calcLevel,
    calcExpToGive: calcExpToGive
 }

//Store global and per-server rankings.

function calcExpToGive(id, length){
    console.log(cooldownMap)
    if (checkCooldown(id).bool)
    return calcExpToGiveBeforeCooldown(length)
    else
    return 0;
}

function calcExpToGiveBeforeCooldown(length){
    let expToGive = Math.floor(Math.random() * (expMax - expMin)) + expMin;
    if (length > maxMsgLength)
    length = maxMsgLength;
    expToGive += Math.round(length * lenBonus / maxMsgLength);

    return expToGive;
}

function checkCooldown(id){
    let time = Date.now();
    if(cooldownMap[id]){
        if((time - cooldownMap[id]) >= cooldown)
        {
            cooldownMap[id] = time;
            return {bool: true};
        }else{
            return {bool: false, left: (cooldown - time + cooldownMap[id])};
        }
    }else{
        //User not found in dict.
        //Means that they have not used a command this session so no cooldown.
        cooldownMap[id] = time;
        return {bool: true};
    }
}

function calcExpRequirement(level){
    level = Math.floor(level)
    if(level < 1)
    return 0
    else
        return (5 * Math.floor(20 * Math.pow(level, 2/3))) + calcExpRequirement(level - 1)    
}

function calcLevel(exp){
    let level = 0
    while(exp > calcExpRequirement(level))
        level++
    return level <= 0 ? 0 : level - 1;
}