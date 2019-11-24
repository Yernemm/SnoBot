
class Ready
{
    constructor(){
      
    }

    run(client){
        console.log(`Logged in as ${client.user.tag}`);
    }


}
module.exports = Ready;