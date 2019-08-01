exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const m = require("./../../shared/methods.js");
    //--------------------------------------------------------------------



    
    //PUT THE ACTUAL COMMAND THIS POINTS TO HERE:
    var mainCmd = "";





    //--------------------------------------------------------------------
    let commandFile = require(`./../${mainCmd}.js`);
    commandFile.run(config, client, message, argsArr, argsTxt, extraData);
}