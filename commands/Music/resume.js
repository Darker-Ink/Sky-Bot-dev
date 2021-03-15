const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'resume',
    description: "Resume Music",
    usage: '?resume',
    aliases: [],
    category: "Music",
    run: async(client, message, args) => {
      const db = require('quick.db')
    let user = db.get(`blacklist_${message.author.id}`);
    if(user == true) return;
        if (!message.member.voice.channel) {
            const resumeError = new MessageEmbed()
              .setDescription("You Need to be in a Voice Channel to resume Music!")
              .setColor("RED")
            return message.channel.send(resumeError)
        }
        // if(!client.distube.isPlaying(message)) {
        //     const resumeError2 = new MessageEmbed()
        //     .setDescription("There is Nothing Playing")
        //     .setColor("RED")
        //     return message.channel.send(resumeError2)
        // }
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(queueError)
        }
        if(!client.distube.isPaused(message)) {
            const resumeError3 = new MessageEmbed()
            .setDescription('The Music is not Paused')
            .setColor("RED")
            return message.channel.send(resumeError3)
        }

        client.distube.resume(message)
        const embed = new MessageEmbed()
        .setDescription('Resumed!')
        .setColor("BLUE")
        message.channel.send(embed)
    }
}