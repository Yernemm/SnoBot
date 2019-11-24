const Db= require('./../Db.js');
class Permissions
{
    constructor()
    {
        this.db = new Db();
    }

    get defaultPermissions(){
        return {
            "mod": "admin",
            "admin": "admin",
            "core": "everyone",
            "fun": "everyone",
            "utility": "everyone",
            "test": "everyone"
        };
    }

    checkPerms(data, cmdObj, callback) {
        let guildId = data.message.guild.id; //The ID of the guild this cmd is in
       // let cmdObj =  //The actual command object
    
        if (cmdObj.cmdtype == "core") {
            callback(true);
            return;
        }
    
        //Owner only command
        if (cmdObj.cmdtype === "owner") {
            if (data.message.author.id == data.client.config.ownerId)
                callback(true);
            else
                callback(false);
            return;
        }
    
        this.db.getFrom("guildPerms", guildId)
            .then(obj => {
                let cmdPerm; //The command permission entry for this cmd type
                if (obj) {
                    cmdPerm = obj[cmdObj.cmdtype]; //The command permission entry for this cmd type
                    if (!cmdPerm) {
                        //Permission empty
                        //Get default perms.
    
                        cmdPerm = this.defaultPermissions[cmdObj.cmdtype];
                    }
                } else {
                    //Permission not found in this.db
                    //Get default perms.
                    cmdPerm = this.defaultPermissions[cmdObj.cmdtype];
                }
    
    
                let res = false;
                switch (cmdPerm) {
    
                    case "everyone":
                        res = true;
                        break;
                    case "off":
                        res = false;
                        break;
                    case "admin":
                        if (data.message.member.hasPermission('ADMINISTRATOR', false, true, true)) {
                            res = true;
                        } else {
                            res = false;
                        }
                        break;
                    default:
                        let flag = false;
                        data.message.member.roles.forEach(role => {
                            if (role.id == cmdPerm)
                                flag = true;
                        });
                        res = flag;
                        break;
                }
                callback(res);
            })
            .catch(err => {
                console.log(err);
                callback(false);
            });
    
    }
    
}
module.exports = Permissions;