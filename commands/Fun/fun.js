const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {
    MessageAttachment
} = require('discord.js');

module.exports = {
    name: 'fun',
    aliases: ['f'],
    description: "fun tests",
    category: "Fun",
    disabled: true,
    run: async (client, message, args) => {
        try {
            const member = message.mentions.users.first() || message.author;
            const avatar = member.displayAvatarURL({
                dynamic: false,
                format: 'png'
            })

            let image = await Canvacord.wanted(avatar)

            let triggered = new MessageAttachment(image, "fun.png")

            message.channel.send(triggered)
        } catch (err) {
            console.log('fuck a error');
            message.reply(`${err.stack}`);
        }
    }
}