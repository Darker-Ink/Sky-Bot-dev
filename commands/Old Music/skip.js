const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'skip',
    description: "Skips Music in a Queue",
    usage: "?skip",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        const channel = message.member?.voice.channel;
        if(!channel) return message.reply('Please Join a VC to use this command')
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
                return message.channel.send({ embeds: [queueError] })
        }
        client.distube.skip(message)

        const embed = new MessageEmbed()
            .setDescription(`Skipped!`)
            .setColor("BLUE")

        message.channel.send({ embeds: [embed] })
    }
}