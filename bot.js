const botsettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix;
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
bot.profiles = require("./profiles.json");

fs.readdir("./cmds", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) {
        console.log("No commands found in ./cmd");
        return;
    }

    console.log(`Loading ${jsFiles.length} commands. Standby.`);

    jsFiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        bot.commands.set(props.help.name,props);
    });
});

bot.on("ready", async () => {
    console.log(`Bot ${bot.user.username} is ready. Let the conversation begin`);
    console.log(bot.commands);

    //TIMED UNMUTE
    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildID = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildID);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "Muted");

            if(!mutedRole || !guild) continue;

            if(Date.now() > time){
                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw err;
                    console.log(`${member.user} has been unmuted.`)
                });
            }
        }
    }, 3000);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);

});

bot.login(botsettings.token);