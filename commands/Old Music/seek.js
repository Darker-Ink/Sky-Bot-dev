const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'seek',
    description: "Set the playing time to another position",
    usage: "?seek <amount in seconds>",
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
        if (isNaN(args[0])) {
            const seekError3 = new MessageEmbed()
                .setDescription('Please Enter a Valid Number of second(s) to Seek!')
                .setColor("RED")
            return message.channel.send(seekError3)
        }

        const seekAmount = args[0] * 1000

        client.distube.seek(message, seekAmount)
        message.react('✅')
    }
}