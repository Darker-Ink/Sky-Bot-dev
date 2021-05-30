const {
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'ban',
    usage: '',
    description: "Bans a mentioned member",
    category: "Admin",
    perms: ["BAN_MEMBERS"],
    botperms: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.channel.send('Please Use a ID or Mention someone');
            let person = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		if(!person) return message.channel.send('Hey please mention someone ty')
            const allBans = await message.guild.fetchBans()

            if (allBans.get(person.id)) {
                const banerr = new MessageEmbed()
                    .setDescription("The User is Already Banned")
                    .setColor('#34ebe5')

                return message.channel.send(banerr)
            }
            if (message.guild.members.cache.get(`${person.id}`)) {
                if (person) {
                    const mentionedPosition = person.roles.highest.position
                    const memberPosition = message.member.roles.highest.position
                    const botPosition = message.guild.me.roles.highest.position

                    if (memberPosition <= mentionedPosition) {
                        const banerr2 = new MessageEmbed()
                            .setDescription("You Can Not Ban This Member Because their role is higher/equal to yours")
                            .setColor('RANDOM')

                        return message.channel.send(banerr2)
                    } else if (botPosition <= mentionedPosition) {
                        const banerr3 = new MessageEmbed()
                            .setDescription("I Can Not Ban This Member Because their role is higher/equal to mine")
                            .setColor('RANDOM')

                        return message.channel.send(banerr3)
                    }
                }

                if (message.guild.members.cache.has(person.id)) {
                    let reason = `Banned by ${message.author.tag}`
                    if (args[1]) reason = args.splice(1).join(" ")
                    if (person.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) return message.channel.send('You are not high enough in the role hierachy to ban this person.')
                    message.guild.members.ban(person, {
                        reason: reason
                    })
                    message.channel.send(`**${person.user.tag}** was banned`)

                } else {
                    let reason = `Banned by ${message.author.tag}`
                    if (args[1]) reason = args.splice(1).join(" ")
                    message.guild.members.ban(person, {
                        reason: reason
                    })
                    message.channel.send(`**${person.tag}** was banned`)

                }
            } else {
                if (message.guild.members.cache.has(person.id)) {
                    let reason = `Banned by ${message.author.tag}`
                    if (args[1]) reason = args.splice(1).join(" ")
                    if (person.roles.highest.position >= message.members.roles.highest.position && message.author.id !== message.guild.ownerID) return message.channel.send('You are not high enough in the role hierachy to ban this person.')
                    message.guild.members.ban(person, {
                        reason: reason
                    })
                    message.channel.send(`**${person.user.tag}** was banned`)

                } else {
                    let reason = `Banned by ${message.author.tag}`
                    if (args[1]) reason = args.splice(1).join(" ")
                    message.guild.members.ban(person, {
                        reason: reason
                    })
                    message.channel.send(`**${person.tag}** was banned`)

                }
            }
        } catch (err) {
            console.log('fuck a error');
			message.reply(`Hey It seems like you got a error, This is not good Please Join https://discord.gg/jKeEgwrrbu and report it, Or if you don't want to join the server just do \n\`<prefix>report-command <command name> <bug>\``)
            client.channels.cache.get("827716948087013406").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
        }
    }
}
