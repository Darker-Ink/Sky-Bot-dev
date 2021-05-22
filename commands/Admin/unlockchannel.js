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

            message.channel.send(embed)
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}