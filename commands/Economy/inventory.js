const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'inventory',
    description: "View Your Inventory",
    aliases: ['inven', 'int'],
    usage: "?inventory",
    category: "Economy",
    run: async(client, message, args) => {
      let user1 = db.get(`blacklist_${message.author.id}`);
    if(user1 == true) return;

        let items = db.fetch(`items_${message.guild.id}_${message.author.id}`)
        if(items === null) items = "Nothing";

        const Embed = new MessageEmbed()
        .addField('Inventory', items)
        .setColor("BLUE")

        message.channel.send(Embed)
    }
}