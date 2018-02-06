const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

    let toChange = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let newNickname = args[1];

    if(!toChange){
        return message.channel.send("Invalid user");
    }

    if(!message.guild.member(message.author).hasPermission("MANAGE_NICKNAMES")){
        return message.channel.send("You do not have the correct permissions to perform this action.");
    }

    toChange.setNickname(args[1]);
}

module.exports.help = {
    name: "nickname"
}