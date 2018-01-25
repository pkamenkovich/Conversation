const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    let intro = await new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Conversation Commands")
        .setDescription("Use the prefix c! before each command to trigger the bot. There are currently two subsections.");
    
    message.channel.send({ embed: intro});

    //MODERATION COMMANDS
    let moderation = await new Discord.RichEmbed()
            .setThumbnail(bot.user.avatarURL)
            .setTitle("Moderation")
            .setColor("#0066cc")
            .addField("ban @mention reason", `Bans the user mentioned.`)
            .addField("kick @mention reason", `Kicks the user mentioned.`)
            .addField("mute @mention time(seconds)", `Mutes the user mentioned for duration provided, or indefinite if time is empty.`)
            .addField("unmute @mention", `Unmutes the user mentioned.`)
            .setFooter(`${bot.user.username}'s list of moderation commands.`);

    message.channel.send({ embed: moderation });

    //RNG COMMANDS
    let rng = await new Discord.RichEmbed()
            .setThumbnail(bot.user.avatarURL)
            .setTitle("Random Number Generators")
            .setColor("#0066cc")
            .addField("rng number", `Generates a number between 0 and the number mentioned.`)
            .addField("roll #d#", `Generates a dice roll, the first argument is the number of dice, the second number is how many sides the dice has.`)
            .addField("roll stats", `Creates a 4d6 dice roll, six times. Useful for character creation for DND campaigns.`)
            .addField("coinflip", `Flips a coin`)
            .setFooter(`${bot.user.username}'s list of moderation commands.`);

    message.channel.send({ embed: moderation });
}

module.exports.help = {
    name: "commands"
}