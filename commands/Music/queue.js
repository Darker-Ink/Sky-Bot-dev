const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    description: "Gives you the server queue list!",
    usage: "?queue",
    aliases: [],
    category: "Music",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(queueError)
        }
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");

        const embed = new MessageEmbed()
        .setDescription(`**Server Queue: ** \n\n  ${q}`)
        .setColor("BLUE")

        message.channel.send(embed)
    }
}