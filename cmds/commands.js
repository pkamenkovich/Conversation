const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {
    let embed = await new Discord.RichEmbed()
            .setThumbnail(bot.user.avatarURL)
            .setColor("#0066cc")
            .addField("Moderation:", `List of all functions pertaining to Moderation.`)
            .addBlankField()
            .addField("ban @mention reason", `Bans the user mentioned.`)
            .addField("kick @mention reason", `Kicks the user mentioned.`)
            .addField("mute @mention time(seconds)", `Mutes the user mentioned for duration provided, or indefinite if time is empty.`)
            .addField("unmute @mention", `Unmutes the user mentioned.`)
            .setTitle("Conversation Commands")
            .setDescription("Use the prefix c! before each command to trigger the bot.")
            .setFooter(`${bot.user.username}'s list of commands.`);

        message.channel.send({ embed: embed });
}

module.exports.help = {
    name: "commands"
}