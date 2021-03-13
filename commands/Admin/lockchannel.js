const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'lockchannel',
    description: "Locks a channels and disallows everyone to send messages!",
    usage: "?lockchannel <#channel> <reason>",
    aliases: ['lock'],
    category: "Admin",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;

        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            const lockchannelError = new MessageEmbed()
            .setDescription('You don\'t have permission to lock channels!')
            .setColor("RED")

            return message.channel.send(lockchannelError)
        }

        let channel = message.mentions.channels.first();
        let reason = args.join(" ") || 'Not Specified'

        if(channel) {
            reason = args.join(" ").slice(22) || 'Not Specified'
        } else (
            channel = message.channel
        )

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
            const lockchannelError2 = new MessageEmbed()
            .setDescription(`${channel} is already locked!`)
            .setColor("RED")

            return message.channel.send(lockchannelError2)
        }

        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false })

        const embed = new MessageEmbed()
        .setTitle(`Channel Locked!`)
        .setDescription(`**Channel:** ${channel} \n **Reason:** ${reason}`)
        .setColor("BLUE")

        message.channel.send(embed)

    }
}