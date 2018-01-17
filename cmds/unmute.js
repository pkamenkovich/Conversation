const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MUTE_MEMBERS"))
        return message.channel.send("You don't have unmute permissions.")

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send("Invalid User");

    if (toMute.id === message.author.id)
        return message.channel.send(`${message.member.username}, You cannot ummute yourself.`);
    if (toMute.highestRole.position >= message.member.highestRole.postion)
        return message.channel.send(`You cannot unmute a member who is a ${message.member.highestRole}`);

    let role = message.guild.roles.find(r => r.name === "Muted");

    if (!role || !toMute.roles.has(role.id)) return message.channel.send("User is not muted.");

    await toMute.removeRole(role);

    delete bot.mutes[toMute.id];
    
    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw err;
        message.channel.send(`${toMute} has been unmuted by ${message.member}`);
    });

    

    return;
}

module.exports.help = {
    name: "unmute"
}