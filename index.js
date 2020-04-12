let fs = require('fs');
const exec = require('child_process').exec;
let ver = JSON.parse(fs.readFileSync('./src/ver.json')).ver

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
  };
  

execute("git rev-list --count HEAD", (build) => {ver.build = build.split("\n")[0].split("\r")[0]});
execute("git rev-parse --abbrev-ref HEAD", (branch) => {ver.branch = branch.split("\n")[0].split("\r")[0]});

require('./index-web.js');
require('./index-bot.js');