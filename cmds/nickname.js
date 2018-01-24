const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

    let userCheck = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(!userCheck && message.guild.member(message.author)){
        
    }
    
    userCheck.setNickname(userCheck,"Conversation changed");

    return;
}

module.exports.help = {
    name: "nickname"
}