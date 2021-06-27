const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'resume',
    description: "Resume Music",
    usage: '?resume',
    aliases: ['res'],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if(!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError2] })
        }

        if (!queue.paused) {
            const pauseError3 = new MessageEmbed()
                .setDescription('The Music is Already playing!')
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError3] })
        }

        client.distube.resume(message)
        const embed = new MessageEmbed()
            .setDescription('Resumed!')
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })
    }
}