const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {

    let roll = args[0].split("d");
    let numDice = parseInt(roll[0]);
    let typeDice = parseInt(roll[1]);
    let result = 0;
    let resultSet = [];
    let resultSetSet = [];
    let finalString = "";
    let total = 0;

    if ((!numDice || !typeDice || !roll) && args[0] != 'stats') {
        let embed = await new Discord.RichEmbed()
        .setColor("#0066cc")
        .addField('Error', 'Invalid roll, try again!');

        message.channel.send({ embed: embed });
        return;
    }

    if (args[0] === 'stats') {

        let totalSet = [];

        for (i = 0; i < 6; i++) {
            for (j = 0; j < 4; j++) {
                result = Math.floor(Math.random() * 6) + 1;
                resultSet[j] = result;
            }

            resultSetSet[i] = resultSet;
            resultSet.sort();
            resultSet.reverse();
            resultSet.pop();


            for (k = 0; k < resultSet.length; k++) {
                total += resultSet[k];
            }

            totalSet[i] = total;
            total = 0;

            resultSet = [];
        }

        let embed = new Discord.RichEmbed()
            .setColor("#990000")
            .addField(`User`, `**${message.member.user.username}**`,true)
            .addField("Description","Bot generated rolls using 4d6's with the rule to drop lowest.")
            .addField("Roll Used:", `4d6`, true)
            .addField("Rolls (Lowest dropped):", `${resultSetSet[0].toString()}`, true)
            .addField("Total:", `${totalSet[0]}`)
            .addField("Roll Used:", `4d6`, true)
            .addField("Rolls (Lowest dropped):", `${resultSetSet[1].toString()}`, true)
            .addField("Total:", `${totalSet[1]}`)
            .addField("Roll Used:", `4d6`, true)
            .addField("Rolls (Lowest dropped):", `${resultSetSet[2].toString()}`, true)
            .addField("Total:", `${totalSet[2]}`)
            .addField("Roll Used:", `4d6`, true)
            .addField("Rolls (Lowest dropped):", `${resultSetSet[3].toString()}`, true)
            .addField("Total:", `${totalSet[3]}`)
            .addField("Roll Used:", `4d6`, true)
            .addField("Rolls (Lowest dropped):", `${resultSetSet[4].toString()}`, true)
            .addField("Total:", `${totalSet[4]}`)
            .addField("Roll Used:", `4d6`, true)
            .addField("Rolls (Lowest dropped):", `${resultSetSet[5].toString()}`, true)
            .addField("Total:", `${totalSet[5]}`)
            .setFooter(`${bot.user.username}'s generation of ${message.author.username}'s roll.`);

            message.channel.send({ embed: embed });
    }
    else {
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
        .addField("Roll Used:", `${args[0]}`, true)
        .addField("Rolls:", `${finalString}`, true)
        .addField("Total:", `${total}`)
        .setFooter(`${bot.user.username}'s generation of ${message.author.username}'s roll.`);

        message.channel.send({ embed: embed });

    }

}

module.exports.help = {
    name: "roll"
}