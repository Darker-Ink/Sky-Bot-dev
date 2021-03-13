const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'wouldyourather',
    description: "Sends a Would You Rather question",
    usage: "?wouldyourather",
    aliases: ['wyr'],
    category: "Fun",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;

        const replies = require('../../data/wouldyourather.json')
        const reply = replies[Math.floor(Math.random() * replies.length)]

        const embed = new MessageEmbed()
        .setTitle('Would you rather?')
        .setDescription(reply)
        .setColor("BLUE")

        message.channel.send(embed)

    }
}