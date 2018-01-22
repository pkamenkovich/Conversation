const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    let jsFiles = [];

    fs.readdir("./cmds", (err, files) => {
        if(err) console.error(err);
    
        jsFiles = files.filter(f => f.split(".").pop() === "js");

        jsFiles.forEach(element => {
            message.channel.send(`\`${element}\``);
        });
    });

}

module.exports.help = {
    name: "commands"
}