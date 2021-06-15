const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'unlockchannel',
    description: "Unlocks Channel that were locked!",
    usage: '?unlockchannel <#channel>',
    aliases: ['unlock'],
    category: "Admin",
    perms: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        try {
            let channel = message.mentions.channels.first() || message.channel;

            if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
                const unlockchannelError2 = new MessageEmbed()
                    .setDescription(`${channel} is not locked!`)
                    .setColor("RED")

                return message.channel.send(unlockchannelError2)
            }

            channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: true
            })

            const embed = new MessageEmbed()
                .setTitle(`Channel Unlocked!`)
                .setDescription(`${channel} is now unlocked. Everyone can speak now.`)
                .setColor("BLUE")

            message.channel.send({ embeds: [embed] })
        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    }
}