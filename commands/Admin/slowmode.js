const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    description: "enable/disable slowmode, time units - h(hour), m(minute), s(seconds)",
    usage: "?slowmode <time>",
    aliases: ["s"],
    category: "Admin",
    run: async (client, message, args) => {
        try {
      const db = require('quick.db')
    let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        if (!message.member.hasPermission(('MANAGE_CHANNELS'))) {
            const slowmodeError = new MessageEmbed()
                .setDescription(`You do not have permissions to enable/disable slowmode.`)
                .setColor('RED')
            return message.channel.send(slowmodeError)
        }
        if (!args[0]) {
            const slowmodeError2 = new MessageEmbed()
                .setDescription(`You did not provide a time. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - ?slowmode 5s)`)
                .setColor('RED')
            return message.channel.send(slowmodeError2)
        }
        const currentSlowmode = message.channel.rateLimitPerUser
        const reason = args[1] ? args.slice(1).join(" ") : 'Not Specified'

        if (args[0] === 'off') {
            if (currentSlowmode === 0) {
                const slowmodeOfferror = new MessageEmbed()
                    .setDescription(`Slowmode is already off`)
                    .setColor('RED')
                return message.channel.send(slowmodeOfferror)
            }
            message.channel.setRateLimitPerUser(0, reason)
            const slowmodeOff = new MessageEmbed()
                .setDescription(`Slowmode Disabled`)
                .setColor('BLUE')

            return message.channel.send(slowmodeOff)
        }

        const time = ms(args[0]) / 1000
        const slowmodeError3 = new MessageEmbed()
            .setDescription(`This is not a valid time. Please write the time in the units mentioned. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - ?slowmode 5s)`)
            .setColor('RED')
        if (isNaN(time)) {
            return message.channel.send(slowmodeError3)
        }

        if (time > 21600000) {
            const slowmodeError4 = new MessageEmbed()
                .setDescription(`Time is too high. Make sure its below 6 hours.`)
                .setColor('RED')

            return message.channel.send(slowmodeError4)
        }

        if (currentSlowmode === time) {
            const slowmodeError5 = new MessageEmbed()
                .setDescription(`Slowmode is already set to ${args[0]}`)
                .setColor('RED')
            return message.channel.send(slowmodeError5)
        }
        
        let slowmode = await message.channel.setRateLimitPerUser(time, reason)
        let afterSlowmode = message.channel.rateLimitPerUser
        if(afterSlowmode > 0) {
            const embed = new MessageEmbed()
            .setTitle(`Slowmode Enabled`)
            .addField(`Slowmode Duration`, args[0])
            .addField(`Reason`, reason)
            .setColor('BLUE')
            
            return message.channel.send(embed)
        } else if(afterSlowmode === 0) {
            return message.channel.send(slowmodeError3)
        }
    }catch (err) {
      console.log('fuck a error');
      message.reply(`There was a error Owner Has been alerted, you can try the command again.. Maybe it was a mistake Try again, If you get this message again **__DO NOT__** Use the command again, Thank you!`);
      client.channels.cache.get("820052885081423872").send(`<@791741154999140374> Someone got a error\`\`\`${err.stack}\`\`\` `)
    }   
}}