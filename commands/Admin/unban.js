const {
    MessageEmbed,
    Message
} = require("discord.js")

//const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'unban',
    description: "Unbans a previously banned member",
    category: "Admin",
    perms: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        try {
            //const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
            if (!args[0] > 0) return message.channel.send('You need to provide a ID of someone you want to unban');
            const mentionedUser = message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0])
            if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
                const unbanerror2 = new MessageEmbed()
                    .setDescription("I Don\'t Have Permissions To Unban Members. Make Sure You Have Given Me Appropriate Permissions")
                    .setColor('#34ebe5')

                return message.channel.send(unbanerror2)
            }
            /**else if(!args[0]) {
                       const unbanerror3 = new MessageEmbed()
                       .setDescription("You need to provide a ID of someone you want to unban")
                       .setColor('#34ebe5')

                       return message.channel.send(unbanerror3)
                   } */

            const allBans = await message.guild.fetchBans()
            const bannedUser = allBans.get(mentionedUser.id)

            if (!bannedUser) {
                const unbanerr = new MessageEmbed()
                    .setDescription("This Member is Not Banned")
                    .setColor('#34ebe5')

                return message.channel.send(unbanerr)
            }

            const reason = args.slice(1).join(' ')

            message.guild.members.unban(mentionedUser.id, [reason]).catch(err => console.log(err))

            const unbanSuccess = new MessageEmbed()
                .setTitle('Success!')
                .setDescription(`Unbanned ${mentionedUser} ${reason ? `for **${reason}**` : ''}`)
                .setColor('#34ebe5')


            message.channel.send(unbanSuccess)



        } catch (err) {
            message.reply(errorMessage)
            errorhook.send('```\n' + err.stack + '\n```')
        }
    }
}