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

    expDrop(userId, serverId, message){
        let globalExp = 0
        let serverExp = 0
        //console.log(1)
        this.db.getFrom("exp-global", userId)
        .then(val => globalExp = val * 1)
        .catch(err => {console.error("1e " + err)})
        .finally(()=>{
            //console.log(2)
            this.db.getFrom("exp-server-" + serverId, userId)
            .then(val => serverExp = val * 1)
            .catch(err => {console.error("2e " + err)})
            .finally(()=>{
                //console.log(3)
                let expDropValue = calcExpToGive(userId, message.length);
                globalExp += expDropValue;
                serverExp += expDropValue;
                this.db.setTo("exp-global", userId, globalExp).then(()=>{}).catch(err=>console.log(err))
                this.db.setTo("exp-server-" + serverId, userId, serverExp).then(()=>{}).catch(err=>console.log(err))
            })
        })
    } 
    
    
    getStats(userId, serverId){
        return new Promise((resolve, reject) => {
            let globalExp = 0
        let serverExp = 0
            this.db.getFrom("exp-global", userId)
        .then(val => globalExp = val * 1)
        .catch(err => {console.error("1e " + err)})
        .finally(()=>{
            this.db.getFrom("exp-server-" + serverId, userId)
            .then(val => serverExp = val * 1)
            .catch(err => {console.error("2e " + err)})
            .finally(()=>{
                resolve({
                    global: {
                        expTotal: globalExp,
                        level: calcLevel(globalExp)
                    },
                    server:{
                        expTotal: serverExp,
                        level: calcLevel(serverExp)
                    }
                })
            })
        })
        })
    }
    
    calcExpToGive(id, length){
        //console.log(cooldownMap)
        if (checkCooldown(id).bool)
        return calcExpToGiveBeforeCooldown(length)
        else
        return 0;
    }
    
    calcExpToGiveBeforeCooldown(length){
        let expToGive = Math.floor(Math.random() * (expMax - expMin)) + expMin;
        if (length > maxMsgLength)
        length = maxMsgLength;
        expToGive += Math.round(length * lenBonus / maxMsgLength);
    
        return expToGive;
    }
    
    checkCooldown(id){
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
    
    calcExpRequirement(level){
        level = Math.floor(level)
        if(level < 1)
        return 0
        else
            return (5 * Math.floor(20 * Math.pow(level, 2/3))) + calcExpRequirement(level - 1)    
    }
    
    calcLevel(exp){
        let level = 0
        while(exp > calcExpRequirement(level))
            level++
        return level <= 0 ? 0 : level - 1;
    }
}
module.exports = Levels;