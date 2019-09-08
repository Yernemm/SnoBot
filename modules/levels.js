const db = require("./db.js");

const cooldown = 60;  //Cooldown per exp drop, in seconds.
const expMin = 10;  //Min exp drop.
const expMax = 30;  //Max exp drop.

var cooldownMap = {};

module.exports = {

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