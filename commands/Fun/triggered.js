const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {  MessageAttachment } = require('discord.js');

module.exports = {
    name: 'triggered',
    description: "Trigger Yourself",
    run: async(client, message, args) => {
      const member = message.mentions.users.first()
      const mentionedMemberAvatar = member.displayAvatarURL({dynamic: false, format: "png"})

        let image = await Canvacord.trigger(mentionedMemberAvatar)

        let triggered = new MessageAttachment(image, "triggered.gif")

        message.channel.send(triggered)
    }
}