const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {
    MessageAttachment
} = require('discord.js');

module.exports = {
    name: 'triggered',
    aliases: ['trig'],
    description: "Trigger Yourself",
    category: "Fun",
    run: async (client, message, args) => {
        let avatar = message.author.displayAvatarURL({
            dynamic: false,
            format: "png"
        })

        let image = await Canvacord.trigger(avatar)

        let triggered = new MessageAttachment(image, "triggered.gif")

        message.channel.send(triggered)
    }
}