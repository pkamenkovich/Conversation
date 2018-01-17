const Discord = module.require('discord.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {

    fs.readdir("./cmds", (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
    });

    
}

module.exports.help = {
    name: "commands"
}