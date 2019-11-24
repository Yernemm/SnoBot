const sqlite = require('sqlite');
const dbpath = "./data/db/db.sqlite";
class Db
{
    constructor()
    {

    }

    /*
        Get data from table / key combo
        table: name of table
        key: name of key for the data 
        returns:
            if data found: the parsed JSON data
            if not found: boolean false
    */
    getFrom(table, key) {
        return new Promise((resolve, reject) => {
            sqlite.open(dbpath)
                .then(sql => {
                    sql.get(`SELECT data FROM ${table.replace(/\W/g, '')} WHERE key = ?`, key)
                        .then(data => {
                            if (data)
                                data.data ? resolve(JSON.parse(data.data)) : resolve(false);
                            else
                                resolve(false);
                        })
                        .catch(err => {
                            if ((err + "").startsWith("Error: SQLITE_ERROR: no such table:")) {
                                resolve(false);
                            } else {
                                console.log(err);
                                reject(err);
                            }
    
    
                        });
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
    
    //TO-DO
    getAllKeys(table){
    //return all keys in table
    }
    
    /*
    Set data to a table and key combo in the main database.
    table: table name 
    key: an key / identifier for this data
    data: the JSON data to set to this key (Must be a JS object / parsed JSON)
    */
    setTo(table, key, data) {
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
                                    resolve();
                                })
                                .catch(err => reject(err));
    
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
module.exports = Db;