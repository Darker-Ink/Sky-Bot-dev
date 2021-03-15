const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'monthly',
    description: "Gives You Your monthly Cash Bonus",
    usage: "?monthly",
    category: "Economy",
    run: async(client, message, args) => {
      let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        let timeout = 2.628e+9;
        let amount = 10000;
        let user = message.author

        let monthly =  await db.fetch(`monthly_${message.guild.id}_${user.id}`)
        if(monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly))

            const monthlyEmbed = new MessageEmbed()
            .setDescription(`You\'ve Already Collected your monthly Bonus. \n Come Back in ${time.days}d, ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
            .setColor("#f56c42")

            return message.channel.send(monthlyEmbed)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`monthly_${message.guild.id}_${user.id}`, Date.now())

            const monthlySuccess = new MessageEmbed()
            .setDescription(`Here, Take \$${amount} as Your monthly Cash Bonus!`)
            .setColor("BLUE")

            message.channel.send(monthlySuccess)
        }
    }
}