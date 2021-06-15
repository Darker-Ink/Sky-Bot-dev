const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'lockchannel',
    description: "Locks a channels and disallows everyone to send messages!",
    usage: "?lockchannel <#channel> <reason>",
    aliases: ['lock'],
    category: "Admin",
    perms: ["MANAGE_CHANNELS"],
    botperms: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        try {
            let channel = message.mentions.channels.first();
            let reason = args.join(" ") || 'Not Specified'

            if (channel) {
                reason = args.join(" ").slice(22) || 'Not Specified'
            } else(
                channel = message.channel
            )

            if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
                const lockchannelError2 = new MessageEmbed()
                    .setDescription(`${channel} is already locked!`)
                    .setColor("RED")

                return message.channel.send(lockchannelError2)
            }

            channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            })

            const embed = new MessageEmbed()
                .setTitle(`Channel Locked!`)
                .setDescription(`**Channel:** ${channel} \n **Reason:** ${reason}`)
                .setColor("BLUE")

            message.channel.send({ embeds: [embed] })

        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    }
}