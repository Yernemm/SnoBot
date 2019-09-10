const db = require("./db.js");

const cooldown = 60;  //Cooldown per exp drop, in seconds.
const expMin = 10;  //Min exp drop.
const expMax = 30;  //Max exp drop.

var cooldownMap = {};

module.exports = {
    calcLevel: calcLevel
 }

//Store global and per-server rankings.

function addExpGlobal(data){
    let expToGive = Math.floor(Math.random() * (expMax - expMin)) + expMax;
}

function checkCooldown(id){
    let time = Date.now();
    if(cooldown[id]){
        if((time - cooldown[id]) >= cooldown)
        {
            cooldown[id] = time;
            return {bool: true};
        }else{
            return {bool: false, left: (cooldown - time + cooldown[id])};
        }
    }else{
        //User not found in dict.
        //Means that they have not used a command this session so no cooldown.
        cooldown[id] = time;
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