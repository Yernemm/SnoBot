const sqlite = require("sqlite");
const dbpath = "./db/db.sqlite";
module.exports = {

}


function getFrom(table, key){
    return new Promise((resolve, reject) =>{
        sqlite.open(dbpath)
        .then(sql=>{
            sql.get(`SELECT data FROM ${table.replace(/\W/g, '')} WHERE key = ?`, key)
            .then(data =>{
                resolve(JSON.parse(data.data))
            })
            .catch(err =>{
                reject(err)
            })
        })
        .catch(err =>{
            reject(err);
        })
    })
}

function setTo(table, key, data){
    return new Promise((resolve, reject) =>{
        sqlite.open(dbpath)
        .then(sql=>{
            sql.run(`CREATE TABLE IF NOT EXISTS ${table.replace(/\W/g, '')} (key TEXT PRIMARY KEY, data TEXT)`)
            //insert or update
            .then(() =>{
                sql.run(`INSERT INTO ${table.replace(/\W/g, '')} (key, data)
                VALUES(?, ?) 
                ON CONFLICT(key) 
                DO UPDATE SET data=excluded.data;`, key, JSON.stringify(data))
                .then(()=>{
                    resolve
                })
                .catch(err => reject(err))
                
            })
            .catch(err =>{
                reject(err)
            })
        })
        .catch(err =>{
            reject(err);
        })
    })
}