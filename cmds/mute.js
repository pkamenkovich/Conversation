const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MUTE_MEMBERS"))
        return message.channel.send("You don't have mute permissions.")

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send("Invalid User");

    if (toMute.id === message.author.id)
        return message.channel.send(`${message.member}, You cannot mute yourself.`);
    if (toMute.highestRole.position >= message.member.highestRole.postion)
        return message.channel.send(`You cannot mute a member who is a ${message.member.highestRole}`);

    let role = await message.guild.roles.find(r => r.name === "Muted");
    if (!role) {
        try {
            role = await message.guild.createRole({
                name: "Muted",
                color: "#000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                })
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (toMute.roles.has(role.id)) return message.channel.send("User is already muted.");
    

    bot.mutes[toMute.id] = {
        guild: message.guild.id,
        time: Date.now() + parseInt(args[1]) * 1000
    }
    

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
        if(err) throw err;
        if(isNaN(parseInt(args[1])))
            message.channel.send(`${toMute} has been muted by ${message.member}`);
        else
            message.channel.send(`${toMute} has been muted by ${message.member} for ${args[1]}s`);
        
    });
    
    await toMute.addRole(role);

    return;
}

module.exports.help = {
    name: "mute"
}