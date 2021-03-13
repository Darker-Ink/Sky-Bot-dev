const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'weekly',
    description: "Gives You Your weekly Cash Bonus",
    usage: "?weekly",
    category: "Economy",
    run: async(client, message, args) => {
      let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;
        let timeout = 6.048e+8;
        let amount = 5000;
        let user = message.author

        let weekly =  await db.fetch(`weekly_${message.guild.id}_${user.id}`)
        if(weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly))

            const weeklyEmbed = new MessageEmbed()
            .setDescription(`You\'ve Already Collected your Weekly Bonus. \n Come Back in ${time.days}d, ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
            .setColor("#f56c42")

            return message.channel.send(weeklyEmbed)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())

            const weeklySuccess = new MessageEmbed()
            .setDescription(`Here, Take \$${amount} as Your Weekly Cash Bonus!`)
            .setColor("BLUE")

            message.channel.send(weeklySuccess)
        }
    }
}