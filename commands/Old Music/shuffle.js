const {
    MessageEmbed,
    MessageManager
} = require("discord.js")
const Discord = require("discord.js")
module.exports = {
    name: 'shuffle',
    description: "Pause Music",
    usage: "?pause",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!message.member.voice.channel) {
            const pauseError = new MessageEmbed()
                .setDescription("You Need to be in a Voice Channel to pause Music!")
                .setColor("RED")
            return message.channel.send(pauseError)
        }
        if (!client.distube.isPlaying(message)) {
            const pauseError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send(pauseError2)
        }

        client.distube.shuffle(message)
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");
	 const embed = new Discord.MessageEmbed()
	.setTitle(`${client.emotes.success} Queue Shuffled!`)
    .setDescription(`New Queue:\n ${q}`)
     .setColor("GREEN")
     message.channel.send({ embeds: [embed] })
    }
}