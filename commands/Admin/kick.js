const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'kick',
    description: "Kicks The Mentioned Member",
    category: "Admin",
    perms: ["KICK_MEMBERS"],
    botperms: ["KICK_MEMBERS"],
    run: async (client, message, args) => {
        try {
            const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!mentionedMember) {
                const kickerror3 = new MessageEmbed()
                    .setDescription("You Need To Mentioned a Member That You Want to Kick")
                    .setColor('#34ebe5')

                return message.channel.send(kickerror3)
            }

            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position

            if (memberPosition <= mentionedPosition) {
                const kickerr = new MessageEmbed()
                    .setDescription("You Can Not Kick This Member Because their role is higher/equal to yours")
                    .setColor('#34ebe5')

                return message.channel.send(kickerr)
            } else if (botPosition <= mentionedPosition) {
                const kickerr2 = new MessageEmbed()
                    .setDescription("I Can Not Kick This Member Because their role is higher/equal to mine")
                    .setColor('#34ebe5')

                return message.channel.send(kickerr2)
            }

            const reason = args.slice(1).join(' ')

            try {
                await mentionedMember.kick([reason])

                const kickSuccess = new MessageEmbed()
                    .setTitle('Successful!')
                    .setDescription(`Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ''}`)
                    .setColor('#34ebe5')

                message.channel.send(kickSuccess)

            } catch (error) {
                console.log(error)
                const errorEmbed = new MessageEmbed()
                    .setDescription("There Was an Unexpected Error Kicking This Member")
                    .setColor('#34ebe5')

                message.channel.send(errorEmbed)
            }
        } catch (err) {
            console.log('fuck a error');
            message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
            errorHook.send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}