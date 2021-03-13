const { MessageEmbed } = require('discord.js')
const fetch  = require('node-fetch')

module.exports = {
    name: 'compliment',
    description: "Gives you a compliment",
    usage: "?compliment",
    aliases: [],
    category: "Fun",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;


        const { compliment } = await fetch("https://complimentr.com/api").then((res) => res.json())

        const embed = new MessageEmbed()
        .setDescription(compliment)
        .setColor("BLUE")

        message.channel.send(embed)
    }
}