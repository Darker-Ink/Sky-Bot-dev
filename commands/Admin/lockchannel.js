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

            message.channel.send(embed)

        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}