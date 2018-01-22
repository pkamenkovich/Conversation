const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

    let toKick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toKick){
        return message.channel.send("Invalid user");
    }

    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")){
        return message.channel.send("You do not have the correct permissions to perform this action.");
    }

    toKick.kick();
}

module.exports.help = {
    name: "kick"
}