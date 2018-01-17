const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    let userCheck = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //If not mentioned / ID'd, display own or say invalid if get() == null
    if (!userCheck) {
        if (message.guild.members.get(args[0])) {
            return message.channel.send(`${message.author}, this is not a valid user. Try again.`);
        }
        userCheck = message.author;
    }

    message.channel.send(`Fetching profile of ${userCheck}`);

    if (!bot.profiles[userCheck.id]) {

        bot.profiles[userCheck.id] = {
            fName: "N/A",
            lName: "N/A",
            gender: "N/A",
            age: "N/A",
            about: "N/A"
        }
    }
    fs.writeFile("./profiles.json", JSON.stringify(bot.profiles, null, 4), err => {
        if (err) throw err;
    });

    let embed = await new Discord.RichEmbed()
        //.setAuthor(message.author.username)
        //.setDescription("User Profile:")
        .setThumbnail(message.author.avatarURL)
        .setColor("#0066cc")
        .addField("First Name:", `${bot.profiles[userCheck.id].fName}`, true)
        .addField("Last Name:", `${bot.profiles[userCheck.id].lName}`, true)
        .addField("Gender:", `${bot.profiles[userCheck.id].gender}`, true)
        .addField("Age:", `${bot.profiles[userCheck.id].age}`, true)
        .addField("About Me:", `${bot.profiles[userCheck.id].about}`)
        .setFooter(`${bot.user.username}'s profile of ${message.author.username}`);

    message.channel.send({ embed: embed })

    return;
}

module.exports.help = {
    name: "userinfo"
}