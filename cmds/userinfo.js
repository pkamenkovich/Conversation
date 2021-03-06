const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    let userCheck = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if (!userCheck) {
        if (message.guild.members.get(args[0])) {
            return message.channel.send(`Not a valid user. Try again.`);
        }
        userCheck = message.author;
    }

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

    if(args[0] === 'edit'){
        switch(args[1]){
            case('first'):
                bot.profiles[userCheck.id].fName = args[2];
            break;
            case('last'):
                bot.profiles[userCheck.id].lName = args[2];
            break;
            case('gender'):
                bot.profiles[userCheck.id].gender = args[2];
            break;
            case('age'):
                if(!parseInt(args[2])) return message.channel.send("Age is a number");
                bot.profiles[userCheck.id].age = args[2];
            break;
            case('about'):
                bot.profiles[userCheck.id].about = stringify(args[2]);
            break;
            default:
                return message.channel.send("Invalid option, try again");
            break;
        }
    }
    else{

        message.channel.send(`Fetching profile of ${userCheck}`);

        let embed = await new Discord.RichEmbed()
            .setThumbnail(userCheck.avatarURL)
            .setColor("#0066cc")
            .addField("First Name:", `${bot.profiles[userCheck.id].fName}`, true)
            .addField("Last Name:", `${bot.profiles[userCheck.id].lName}`, true)
            .addField("Gender:", `${bot.profiles[userCheck.id].gender}`, true)
            .addField("Age:", `${bot.profiles[userCheck.id].age}`, true)
            .addField("About Me:", `${bot.profiles[userCheck.id].about}`)
            .setFooter(`${bot.user.username}'s profile of ${userCheck.username}`);

        message.channel.send({ embed: embed });
    }
    return;
}

module.exports.help = {
    name: "userinfo"
}