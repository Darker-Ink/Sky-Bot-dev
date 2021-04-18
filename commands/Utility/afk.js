const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: 'afk',
    description: "Go Afk And let people know why",
    usage: "?afk I went to get some food",
    aliases: ['brb'],
    category: "Utility",
    run: async (client, message, args) => {

        try {

            const member = message.author.username
            const no1 = new Discord.MessageEmbed()
                .setDescription("Sorry AFK Command Can\'t use links due to a bug SORRY")
                .setColor("RED")
            let text = args.join(" ")
            if (text.includes("www") || text.includes("discord.gg") || text.includes("discordapp") || text.startsWith("https://")) return message.channel.send(no1)



            const status = new db.table("AFKs");
            let afk = await status.fetch(message.author.id);
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")

            if (!text) {
                text = "I'm afk I will be back when I get back"

            } else {
                text = text
            }


            if (!afk) {
                embed.setTitle(`${message.author.tag} AFK SET`)
                embed.setDescription(`${text}`)
                    .setTimestamp(message.createdAt)
                status.set(`${message.author.id}_${message.guild.id}`, text)
                message.channel.send(embed)

                message.member.setNickname(`\[AFK\] ${member}`)
            }
        } catch (err) {
            message.reply(`${err}`)
            console.log('fuck a error');
        }
    }
}