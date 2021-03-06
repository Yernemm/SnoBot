const sqlite = require("sqlite");
const discord = require("discord.js");
const dbpath = "./data/db/db.sqlite";
module.exports = {
    checkPerms: checkPerms,
    getFrom: getFrom,
    setTo: setTo
}

const defaultPermissions = {
    "mod": "admin",
    "admin": "admin",
    "core": "everyone",
    "fun": "everyone",
    "utility": "everyone"
}

function checkPerms(data, cmdString, callback) {
    let guildId = data.message.guild.id //The ID of the guild this cmd is in
    let cmdObj = data.client.commands.get(cmdString); //The actual command object

    if (cmdObj.cmdtype() == "core") {
        callback(true);
        return;
    };

    //Owner only command
    if (cmdObj.cmdtype() === "owner") {
        if (data.message.author.id == data.client.config.ownerId)
            callback(true);
        else
            callback(false);
        return;
    }

    getFrom("guildPerms", guildId)
        .then(obj => {
            let cmdPerm; //The command permission entry for this cmd type
            if (obj) {
                cmdPerm = obj[cmdObj.cmdtype()] //The command permission entry for this cmd type
                if (!cmdPerm) {
                    //Permission empty
                    //Get default perms.

                    cmdPerm = defaultPermissions[cmdObj.cmdtype()]
                }
            } else {
                //Permission not found in db
                //Get default perms.
                cmdPerm = defaultPermissions[cmdObj.cmdtype()]
            }


            let res = false;
            switch (cmdPerm) {

                case "everyone":
                    res = true
                    break;
                case "off":
                    res = false;
                    break;
                case "admin":
                    if (data.message.member.hasPermission('ADMINISTRATOR', false, true, true)) {
                        res = true
                    } else {
                        res = false
                    }
                    break;
                default:
                    let flag = false;
                    data.message.member.roles.forEach(role => {
                        if (role.id == cmdPerm)
                            flag = true
                    })
                    res = flag
                    break;
            }
            callback(res);
        })
        .catch(err => {
            console.log(err)
            callback(false);
        })

}

/*
    Get data from table / key combo
    table: name of table
    key: name of key for the data 
    returns:
        if data found: the parsed JSON data
        if not found: boolean false
*/
function getFrom(table, key) {
    return new Promise((resolve, reject) => {
        sqlite.open(dbpath)
            .then(sql => {
                sql.get(`SELECT data FROM ${table.replace(/\W/g, '')} WHERE key = ?`, key)
                    .then(data => {
                        if (data)
                            data.data ? resolve(JSON.parse(data.data)) : resolve(false)
                        else
                            resolve(false)
                    })
                    .catch(err => {
                        if ((err + "").startsWith("Error: SQLITE_ERROR: no such table:")) {
                            resolve(false)
                        } else {
                            console.log(err)
                            reject(err)
                        }


                    })
            })
            .catch(err => {
                console.log(err)
                reject(err);
            })
    })
}

//TO-DO
function getAllKeys(table){
//return all keys in table
}

/*
Set data to a table and key combo in the main database.
table: table name 
key: an key / identifier for this data
data: the JSON data to set to this key (Must be a JS object / parsed JSON)
*/
function setTo(table, key, data) {
    return new Promise((resolve, reject) => {
        sqlite.open(dbpath)
            .then(sql => {
                sql.run(`CREATE TABLE IF NOT EXISTS ${table.replace(/\W/g, '')} (key TEXT PRIMARY KEY, data TEXT)`)
                    //insert or update
                    .then(() => {
                        sql.run(`INSERT INTO ${table.replace(/\W/g, '')} (key, data)
                VALUES(?, ?) 
                ON CONFLICT(key) 
                DO UPDATE SET data=excluded.data;`, key, JSON.stringify(data))
                            .then(() => {
                                resolve()
                            })
                            .catch(err => reject(err))

                    })
                    .catch(err => {
                        reject(err)
                    })
            })
            .catch(err => {
                reject(err);
            })
    })
}