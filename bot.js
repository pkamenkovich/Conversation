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

bot.on("ready", async ()=> {
    console.log(`Bot ${bot.user.username} is ready. Let the conversation begin`);
    console.log(bot.commands);
    bot.user.setStatus('dnd');
    bot.user.setPresence({
        game: {
            name: 'the server',
            type: 'LISTENING'
        }
    });
    //console.log(bot.guilds);
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
                    console.log(`${member.user} has been unmuted.`);
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
    if(command.endsWith('commands')) return message.channel.send("If you need to see the commands, take a gander at the 'conversation' text channel!");

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);

});

bot.on("guildCreate", async (member) => {

    let latest = 0;

    //Loop through all the guilds, find the guild that was just joined.
    bot.guilds.forEach(async (guild, id)=>{
        let membership = guild.members.find('id', botsettings.id);
        if(membership.joinedAt > latest){
            latest = membership.joinedAt;
            botsettings.lastJoined = membership.guild.id;
        }
    });

    let joinedGuild = bot.guilds.find('id', botsettings.lastJoined);
    //If the bot does not find the channel 'conversation' in the new guild
    //create the new channel, then send a message through that channel to display commands
    let createdChannel = null;
    if(!joinedGuild.channels.find('name','conversation')){
        createdChannel = await joinedGuild.createChannel('conversation','text');
    }
    else {
        createdChannel = joinedGuild.channels.find('name','conversation');
    }
    bot.commands.get('commands').run(bot,createdChannel);

    //Alter permissions to be read-only for everyone.
    // member.channel.overwritePermissions('everyone',{
    //     SEND_MESSAGES: false, 
    //     MANAGE_MESSAGES: false, 
    //     ATTACH_FILES: false
    // });
});

bot.login(botsettings.token);