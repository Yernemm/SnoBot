class SampleCommand
{
    constructor(){
        this.desc = "This is a sample command"; //Short description of what the command does.
        this.usage = ""; //Any parameters required for command.
        this.cmdtype = "test"; //Type of command.
        this.alias = ["sample", "scmd"]; //Aliases for the command.
    }

    run(data){
        data.message.channel.send("You have been memed.");
    }
}
module.exports = SampleCommand;