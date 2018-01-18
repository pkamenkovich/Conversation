const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    let roll = args[0].split("d");
    let numDice = parseInt(roll[0]);
    let typeDice = parseInt(roll[1]);
    let result = 0;
    let resultSet = [""];
    let finalString = "";
    let total = 0;

    for (i = 0; i < numDice; i++) {
        switch (typeDice) {
            case 2:
                result = Math.floor(Math.random() * 2) + 1;
                break;
            case 4:
                result = Math.floor(Math.random() * 4) + 1;
                break;
            case 6:
                result = Math.floor(Math.random() * 6) + 1;
                break;
            case 8:
                result = Math.floor(Math.random() * 8) + 1;
                break;
            case 10:
                result = Math.floor(Math.random() * 10) + 1;
                break;
            case 12:
                result = Math.floor(Math.random() * 12) + 1;
                break;
            case 20:
                result = Math.floor(Math.random() * 20) + 1;
                break;
            case 100:
                result = Math.floor(Math.random() * 100) + 1;
                break;
        }
        resultSet[i] = result;
    }
    
    for (i = 0; i < resultSet.length; i++) {
        finalString += resultSet[i] + " ";
        total += resultSet[i];
    }

    let embed = await new Discord.RichEmbed()
        .setColor("#0066cc")
        .addField("User:", `${message.member}`, true)
        .addField("Roll Used:", `${message.content}`, true)
        .addField("Rolls:", `${finalString}`, true)
        .addField("Total:", `${total}`, true)
        .setFooter(`${bot.user.username} generation of ${message.author.username}'s roll.`);

    message.channel.send({ embed: embed });
}

module.exports.help = {
    name: "roll"
}