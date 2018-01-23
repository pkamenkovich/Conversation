const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

    let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toBan){
        return message.channel.send("Invalid user");
    }

    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")){
        return message.channel.send("You do not have the correct permissions to perform this action.");
    }

    toBan.ban(args[1]);
}

module.exports.help = {
    name: "ban"
}