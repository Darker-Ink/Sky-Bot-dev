const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {
    MessageAttachment
} = require('discord.js');

module.exports = {
    name: 'facepalm',
    aliases: [],
    description: "did someone say something dumb",
    category: "Fun",
    run: async (client, message, args) => {
        const member = message.author;
        const avatar = member.displayAvatarURL({
            dynamic: false,
            format: 'png'
        })

        let image = await Canvacord.facepalm(avatar)

        let triggered = new MessageAttachment(image, "fun.png")

        message.channel.send(triggered)
    }
}