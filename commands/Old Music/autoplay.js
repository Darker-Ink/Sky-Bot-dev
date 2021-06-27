const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'autoplay',
    description: "Toggles Autoplay to ON/OFF",
    usage: "?autoplay",
    aliases: ['autop', 'a'],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if(!queue) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({ embeds: [pauseError2] })
        }

        let mode = client.distube.toggleAutoplay(message)
        const embed = new MessageEmbed()
            .setDescription(`Autoplay Mode Set to:\`` + (mode ? "On" : "Off") + "\`")
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })
    }
}