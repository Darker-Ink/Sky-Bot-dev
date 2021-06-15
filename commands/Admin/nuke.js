const {
    MessageEmbed
} = require('discord.js')
const Discord = require('discord.js')
const NUKE_PERM = ('MANAGE_CHANNELS')
module.exports = {
    name: 'nuke',
    description: "nukes that channel ;)",
    usage: "?nuke",
    category: "Admin",
    perms: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
    botperms: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
    run: async (client, message, args) => {
        try {
            const embed = new Discord.MessageEmbed()
                .setTitle('Are you sure?')
                .setDescription('Do you really want to nuke #' + message.channel.name + '?\n**This will delete __all__ the channel content!**')
                .setColor('#e74c3c')
                .setImage('https://d2skuhm0vrry40.cloudfront.net/2015/articles/1/8/5/4/3/9/0/the-dark-romance-of-cars-and-nukes-in-fallout-4-1473078789571.jpg/EG11/resize/1200x-1/the-dark-romance-of-cars-and-nukes-in-fallout-4-1473078789571.jpg')
                .setTimestamp()
                .setFooter('You have 60s to react')

            em = await message.channel.send(embed)
            await em.react('✅')
            await em.react('❌')

            em.awaitReactions(r => ['✅', '❌'].includes(r.emoji.name), {
                max: 1,
                time: 60000
            }).then(async (collected) => {
                r = collected.first()

                if (r.emoji.name === '✅') {
                    message.channel.clone().then(channel => {
                        channel.setPosition(message.channel.position)
                        r = Math.random()
                        if (r < 0.8 && r > 0.7) {
                            channel.send('Someone Hiroshima\'d The Channel Watch out....! \nhttps://imgur.com/LIyGeCR')
                        } else {
                            channel.send('Someone Nuked The Channel Watch out....! \nhttps://imgur.com/LIyGeCR')
                        }

                    })
                    message.channel.delete()
                } else {
                    message.channel.send('Canceled')
                }
            })

        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    }
}