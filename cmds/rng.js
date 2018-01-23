const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
    let max = args[0];
    let solution = 0;

    if(!parseInt(max))
        return message.channel.send("Error, try again.");

    solution = Math.floor(Math.random() * max);
    message.channel.send(`A random number was generated from 0 to ${max}, the result is ${solution}`);
}

module.exports.help = {
    name: "rng"
}