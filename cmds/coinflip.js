const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    let iterations = args[0] || 1;
    let resultSet = [];

    for(i = 0; i < iterations; i ++){
        var result = Math.random();
        if(result < 0.5){
            resultSet[i] = "Heads";
        }
        else if(result >= 0.5){
            resultSet[i] = "Tails";
        }
        else {
            return message.channel.send("Error!");
        }
    }

    var heads = resultSet.filter(flip => flip === 'Heads');
    var tails = resultSet.filter(flip => flip === 'Tails');

    let totals = await new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coinflip results")
        .addField("Heads:",`${heads.length}`)
        .addField("Tails:",`${tails.length}`)
        .addField("Total:", `${iterations}`);
    
    message.channel.send({ embed: totals});
}

module.exports.help = {
    name: "coinflip"
}