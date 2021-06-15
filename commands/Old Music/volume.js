const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'volume',
    description: "Changes Volume of the currently playing Music!",
    usage: "?volume <number from 1 to 100>",
    aliases: ['vol', 'v'],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [queueError] })
        }
        let cursong = queue.songs[0];
        if(cursong.playing) {
            const resumeError2 = new MessageEmbed()
             .setDescription("There is Nothing Playing")
             .setColor("RED")
             return message.channel.send({ embeds: [resumeError2] })
        }
        let volume = parseInt(args[0])
        if (isNaN(args[0])) {
            const volumeError3 = new MessageEmbed()
                .setDescription('Please Enter a Valid Number Between 1 and 100')
                .setColor("RED")
            return message.channel.send({ embeds: [volumeError3] })
        }
        if (args[0] > 250) {
            const volumeError4 = new MessageEmbed()
                .setDescription('Please Enter a Valid Number Between 1 and 100')
                .setColor("RED")
            return message.channel.send({ embeds: [volumeError4] })
        }

        client.distube.setVolume(message, volume)
        const embed = new MessageEmbed()
            .setDescription(`Volume has been set to \`${volume}%\``)
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })

    }
}