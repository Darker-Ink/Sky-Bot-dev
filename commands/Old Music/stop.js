const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'stop',
    description: "Stops the Music & clears the queue",
    usage: "?stop",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        const channel = message.member?.voice.channel;
        if(!channel) return message.reply('Please Join a VC to use this command')
        let queue = client.distube.getQueue(message);
        if(!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError2] })
        }
        client.distube.stop(message);
        const embed = new MessageEmbed()
            .setDescription('Stopped!')
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })

    }
}