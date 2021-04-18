const Discord = require('discord.js');

module.exports = {
    name: 'ticket-close',
    usage: '',
    description: "",
    category: "Tickets",
    perms: [""],
    run: async (client, message, args) => {
        try {
            if (!message.channel.name.includes("ticket")) return message.channel.send('This is Not a Ticket Please use this command in a ticket');
            const embed = new Discord.MessageEmbed()
                .setTitle('Are you sure?')
                .setDescription('Do you really want to close #' + message.channel.name + '?\n**This will delete __all__ the channel content!**')
                .setColor('#e74c3c')
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
                    message.channel.delete()
                } else {
                    message.channel.send('Canceled')
                }
            })

        } catch (err) {
            console.log('crap a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}