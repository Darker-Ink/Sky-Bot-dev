const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");
const Jwork = require('../../data/work.json');
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];

module.exports = {
    name: 'work',
    description: "Work and Get Money. That's how the World Works.",
    usage: "?work",
    category: "Economy",
    run: async(client, message, args) => {

        let user = message.author;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`)
        let timeout = 600000

        if(author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
            const workEmbed = new MessageEmbed()
            .setDescription(`You Cannot work for another ${time.hours}h , ${time.minutes}m and ${time.seconds}s`)
            .setColor("BLUE")

            return message.channel.send(workEmbed)
        } else {
            let amount = Math.floor(Math.random() * 200) + 1
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

            const workSuccess = new MessageEmbed()
            .setDescription(`${JworkR} \$${amount}`)
            .setColor("BLUE")

            message.channel.send(workSuccess)
        }
    }
}