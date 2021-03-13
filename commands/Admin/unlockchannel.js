const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unlockchannel',
    description: "Unlocks Channel that were locked!",
    usage: '?unlockchannel <#channel>',
    aliases: ['unlock'],
    category: "Admin",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        
        if(!message.member.hasPermission('MANAGE_CHANNELS')) {
            const unlockchannelError = new MessageEmbed()
            .setDescription('You don\'t have permission to unlock channels!')
            .setColor("RED")

            return message.channel.send(unlockchannelError)
        }

        let channel = message.mentions.channels.first() || message.channel;

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
            const unlockchannelError2 = new MessageEmbed()
            .setDescription(`${channel} is not locked!`)
            .setColor("RED")

            return message.channel.send(unlockchannelError2)
        }

        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true })

        const embed = new MessageEmbed()
        .setTitle(`Channel Unlocked!`)
        .setDescription(`${channel} is now unlocked. Everyone can speak now.`)
        .setColor("BLUE")

        message.channel.send(embed)
    }
}