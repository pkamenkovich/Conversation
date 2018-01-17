module.exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating avatar...");

    await message.channel.send({files: [
        {
            attachment: message.author.displayAvatarURL,
            name: "avatar.png"
        }
    ]});

}

module.exports.help = {
    name: "avatar"
}