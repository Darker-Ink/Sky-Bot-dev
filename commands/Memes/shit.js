const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shit',
    description: "\"Eww. I stepped on shit.\" You get it now?",
    usage: "?shit <mention>",
    category: "Fun",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;
        const member = message.mentions.users.first()

        if(!member) {
            const shitError = new MessageEmbed()
            .setDescription(`You Need to mention Someone XD Just Mention That Dumb Bot ||like mee6 😳||`)
            .setColor("RED")
            message.channel.send(shitError)
        }

        const mentionedMemberAvatar = member.displayAvatarURL({dynamic: false, format: "png"})

        let image = await Canvacord.shit(mentionedMemberAvatar)

        let shit = new MessageAttachment(image, "shit.png")

        message.channel.send(shit)
    }
}