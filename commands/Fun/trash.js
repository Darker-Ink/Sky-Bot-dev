const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {
    MessageAttachment
} = require('discord.js');

module.exports = {
    name: 'trash',
    aliases: ['f'],
    description: "Who is trash?",
    category: "Fun",
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        const avatar = member.displayAvatarURL({
            dynamic: false,
            format: 'png'
        })

        let image = await Canvacord.trash(avatar)

        let triggered = new MessageAttachment(image, "trash.png")

        message.channel.send(triggered)
    }
}