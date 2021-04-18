const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {
    MessageAttachment
} = require('discord.js');

module.exports = {
    name: 'worse',
    aliases: ['f'],
    description: "is that person worse then hitler?",
    category: "Fun",
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        const avatar = member.displayAvatarURL({
            dynamic: false,
            format: 'png'
        })

        let image = await Canvacord.hitler(avatar)

        let triggered = new MessageAttachment(image, "fun.png")

        message.channel.send(triggered)
    }
}