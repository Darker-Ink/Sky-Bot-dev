const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {
    MessageAttachment
} = require('discord.js');

module.exports = {
    name: 'jail',
    aliases: [],
    description: "jail that person",
    category: "Fun",
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        const avatar = member.displayAvatarURL({
            dynamic: false,
            format: 'png'
        })

        let image = await Canvacord.jail(avatar)

        let triggered = new MessageAttachment(image, "fun.png")

        message.channel.send(triggered)
    }
}