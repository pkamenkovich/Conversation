const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    let iterations = args[0] || 1;
    let resultSet = [];

    for(i = 0; i < iterations; i ++){
        var result = Math.random();
        if(result < 0.5){
            message.channel.send("Heads");
        }
        else if(result >= 0.5){
            message.channel.send("Tails");
        }
        else {
            return message.channel.send("Error!");
        }
    }
}

module.exports.help = {
    name: "coinflip"
}