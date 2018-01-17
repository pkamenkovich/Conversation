const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

    let created = message.guild.createdAt.toString().split(" ");
    let newCreated = "";
    for(i = 1; i < 5; i++){
        newCreated += `${created[i]} `;
    }

    let embed = new Discord.RichEmbed()
        .setDescription("Server Information:")
        .setThumbnail(message.guild.iconURL)
        .setColor("#0066cc")
        .addField("Server Name:", `${message.guild.name}`, true)
        .addField("Member Count:", `${message.guild.memberCount}`, true)
        .addField("Server Location:", `${message.guild.region.toUpperCase()}`, true)
        .addField("Created:", `${newCreated}`, true)
        .setFooter(`${bot.user.username}'s profile of ${message.guild.name}`);

message.channel.send({embed: embed});
}

module.exports.help = {
    name: "serverinfo"
}