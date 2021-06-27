const {
    MessageEmbed,
    MessageManager
} = require("discord.js")

module.exports = {
    name: 'pause',
    description: "Pause Music",
    usage: "?pause",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if(!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError2] })
        }

        if (queue.paused) {
            const pauseError3 = new MessageEmbed()
                .setDescription('The Music is Already Paused!')
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError3] })
        }
        client.distube.pause(message)
        const embed = new MessageEmbed()
            .setDescription('Paused!')
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })
    }
}